import { useState } from 'react';
import {
  X,
  CreditCard,
  Truck,
  ShieldCheck,
  Loader2,
  CheckCircle,
  AlertCircle,
  Wallet,
  Banknote,
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { CartItem } from './CartDrawer';
import { processPayment, getActivePaymentGateway } from '../lib/payment';
import { createOrder, updateOrderPayment, Order } from '../lib/supabase';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onSuccess: () => void;
}

type PaymentMethod = 'online' | 'cod';
type CheckoutStep = 'details' | 'payment' | 'processing' | 'success' | 'error';

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  onSuccess,
}: CheckoutModalProps) {
  const { paymentGateways, supabase } = useAdminStore();
  const [step, setStep] = useState<CheckoutStep>('details');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [errorMessage, setErrorMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const savings = items.reduce(
    (sum, item) =>
      sum + (item.product.originalPrice - item.product.price) * item.quantity,
    0
  );
  const deliveryFee = total >= 199 ? 0 : 40;
  const finalTotal = total + deliveryFee;

  const activeGateway = getActivePaymentGateway(paymentGateways);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.pincode) {
      setErrorMessage('Please fill all required fields');
      return false;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setErrorMessage('Please enter valid 10-digit phone number');
      return false;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      setErrorMessage('Please enter valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setStep('payment');
  };

  const processOrder = async (paymentId?: string) => {
    // Create order
    const orderData: Order = {
      user_name: form.name,
      user_email: form.email,
      user_phone: form.phone,
      address: `${form.address}, ${form.city} - ${form.pincode}`,
      items: items.map((item) => ({
        product_id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      total: finalTotal,
      payment_method: paymentMethod === 'cod' ? 'COD' : activeGateway?.name || 'Online',
      payment_status: paymentMethod === 'cod' ? 'pending' : 'completed',
      payment_id: paymentId,
      order_status: paymentMethod === 'cod' ? 'confirmed' : 'confirmed',
    };

    if (supabase.connected) {
      const { data, error } = await createOrder(orderData);
      if (error) {
        console.error('Failed to save order:', error);
      } else if (data && paymentId) {
        await updateOrderPayment(data.id!, paymentId, 'completed');
      }
    }

    setStep('success');
    setTimeout(() => {
      onSuccess();
      onClose();
      setStep('details');
    }, 3000);
  };

  const handlePayment = async () => {
    if (paymentMethod === 'cod') {
      setStep('processing');
      await processOrder();
      return;
    }

    if (!activeGateway) {
      setErrorMessage('No payment gateway configured. Please use COD.');
      return;
    }

    setStep('processing');

    await processPayment(
      activeGateway,
      {
        amount: finalTotal,
        orderId: `ORD-${Date.now()}`,
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        description: `ShopNova Order - ${items.length} items`,
      },
      async (paymentId) => {
        await processOrder(paymentId);
      },
      (error) => {
        setErrorMessage(error);
        setStep('error');
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white p-4 flex items-center justify-between">
          <h2 className="font-bold text-lg">Checkout</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-64px)]">
          {/* Details Step */}
          {step === 'details' && (
            <div className="p-4 space-y-4">
              <h3 className="font-medium text-gray-800">Delivery Details</h3>

              {errorMessage && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  <AlertCircle size={16} />
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Full Name *"
                    className="w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-violet-300"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="Email *"
                  className="w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-violet-300"
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder="Phone (10 digits) *"
                  className="w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-violet-300"
                />
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  placeholder="Full Address *"
                  rows={2}
                  className="col-span-2 w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-violet-300 resize-none"
                />
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  placeholder="City *"
                  className="w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-violet-300"
                />
                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleInputChange}
                  placeholder="Pincode (6 digits) *"
                  className="w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.length} items)</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>You Save</span>
                  <span>-₹{savings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Payment Step */}
          {step === 'payment' && (
            <div className="p-4 space-y-4">
              <h3 className="font-medium text-gray-800">Select Payment Method</h3>

              {errorMessage && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  <AlertCircle size={16} />
                  {errorMessage}
                </div>
              )}

              <div className="space-y-3">
                {/* Online Payment */}
                <button
                  onClick={() => setPaymentMethod('online')}
                  className={`w-full p-4 border-2 rounded-xl flex items-center gap-3 transition-all ${
                    paymentMethod === 'online'
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-gray-200 hover:border-violet-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    paymentMethod === 'online' ? 'bg-violet-100' : 'bg-gray-100'
                  }`}>
                    <CreditCard className={paymentMethod === 'online' ? 'text-violet-600' : 'text-gray-500'} size={20} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-medium">Pay Online</p>
                    <p className="text-xs text-gray-500">UPI, Cards, Net Banking, Wallets</p>
                  </div>
                  {activeGateway && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      via {activeGateway.name}
                    </span>
                  )}
                </button>

                {/* COD */}
                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`w-full p-4 border-2 rounded-xl flex items-center gap-3 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-gray-200 hover:border-violet-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    paymentMethod === 'cod' ? 'bg-violet-100' : 'bg-gray-100'
                  }`}>
                    <Banknote className={paymentMethod === 'cod' ? 'text-violet-600' : 'text-gray-500'} size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">Pay when you receive</p>
                  </div>
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-green-500" /> 100% Secure
                </span>
                <span className="flex items-center gap-1">
                  <Truck size={14} className="text-blue-500" /> Fast Delivery
                </span>
                <span className="flex items-center gap-1">
                  <Wallet size={14} className="text-amber-500" /> Easy Returns
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setStep('details');
                    setErrorMessage('');
                  }}
                  className="flex-1 py-3 border rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  {paymentMethod === 'cod'
                    ? `Place Order ₹${finalTotal.toLocaleString()}`
                    : `Pay ₹${finalTotal.toLocaleString()}`}
                </button>
              </div>
            </div>
          )}

          {/* Processing Step */}
          {step === 'processing' && (
            <div className="p-8 text-center">
              <Loader2 size={48} className="mx-auto text-violet-600 animate-spin mb-4" />
              <h3 className="font-bold text-lg mb-2">Processing Your Order</h3>
              <p className="text-gray-500">Please wait, do not close this window...</p>
            </div>
          )}

          {/* Success Step */}
          {step === 'success' && (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-green-700">Order Placed Successfully! 🎉</h3>
              <p className="text-gray-500 mb-4">
                Thank you for shopping with ShopNova!
              </p>
              <p className="text-sm text-gray-400">
                You will receive order confirmation via email & SMS
              </p>
            </div>
          )}

          {/* Error Step */}
          {step === 'error' && (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={40} className="text-red-600" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-red-700">Payment Failed</h3>
              <p className="text-gray-500 mb-4">{errorMessage || 'Something went wrong'}</p>
              <button
                onClick={() => {
                  setStep('payment');
                  setErrorMessage('');
                }}
                className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
