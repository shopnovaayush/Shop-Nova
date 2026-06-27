import { PaymentGateway } from '../store/adminStore';

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
    Cashfree?: any;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayInstance {
  open: () => void;
  close: () => void;
}

// Load payment gateway scripts
export const loadPaymentScript = (gateway: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const existingScript = document.getElementById(`${gateway}-script`);
    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.id = `${gateway}-script`;

    switch (gateway) {
      case 'razorpay':
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        break;
      case 'cashfree':
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        break;
      default:
        resolve(false);
        return;
    }

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Razorpay payment
export const initiateRazorpayPayment = async (
  gateway: PaymentGateway,
  orderDetails: {
    amount: number;
    orderId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    description: string;
  },
  onSuccess: (paymentId: string) => void,
  onFailure: (error: string) => void
): Promise<void> => {
  const loaded = await loadPaymentScript('razorpay');
  if (!loaded || !window.Razorpay) {
    onFailure('Failed to load Razorpay SDK');
    return;
  }

  const options: RazorpayOptions = {
    key: gateway.keyId,
    amount: orderDetails.amount * 100,
    currency: 'INR',
    name: 'ShopNova',
    description: orderDetails.description,
    handler: (response) => {
      onSuccess(response.razorpay_payment_id);
    },
    prefill: {
      name: orderDetails.customerName,
      email: orderDetails.customerEmail,
      contact: orderDetails.customerPhone,
    },
    theme: {
      color: '#7c3aed',
    },
    modal: {
      ondismiss: () => {
        onFailure('Payment cancelled by user');
      },
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};

// ✅ FIXED: Cashfree payment with REAL integration
export const initiateCashfreePayment = async (
  gateway: PaymentGateway,
  orderDetails: {
    amount: number;
    orderId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  },
  onSuccess: (paymentId: string) => void,
  onFailure: (error: string) => void
): Promise<void> => {
  // Step 1: Load Cashfree SDK
  const loaded = await loadPaymentScript('cashfree');
  if (!loaded || !window.Cashfree) {
    onFailure('Failed to load Cashfree SDK. Please refresh and try again.');
    return;
  }

  try {
    console.log('Cashfree payment initiated:', {
      appId: gateway.keyId,
      amount: orderDetails.amount,
      orderId: orderDetails.orderId,
      mode: gateway.testMode ? 'TEST' : 'PRODUCTION',
    });

    // Step 2: Clean phone number (10 digits only)
    const cleanPhone = orderDetails.customerPhone.toString().replace(/\D/g, '').slice(-10);

    // Step 3: Call backend API to create Cashfree order
    const response = await fetch('/api/create-cashfree-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: orderDetails.orderId,
        amount: orderDetails.amount,
        customerName: orderDetails.customerName,
        customerEmail: orderDetails.customerEmail,
        customerPhone: cleanPhone,
        appId: gateway.keyId,
        secretKey: gateway.keySecret,
        mode: gateway.testMode ? 'TEST' : 'PRODUCTION',
      }),
    });

    const data = await response.json();
    console.log('Cashfree order creation response:', data);

    // Step 4: Check if order created successfully
    if (!data.success || !data.payment_session_id) {
      onFailure(data.error || 'Failed to create payment order');
      return;
    }

    // Step 5: Initialize Cashfree SDK
    const cashfree = window.Cashfree({
      mode: gateway.testMode ? 'sandbox' : 'production',
    });

    // Step 6: Open Cashfree payment popup
    const checkoutOptions = {
      paymentSessionId: data.payment_session_id,
      redirectTarget: '_modal',
    };

    cashfree.checkout(checkoutOptions).then((result: any) => {
      console.log('Cashfree checkout result:', result);

      // Payment cancelled by user
      if (result.error) {
        console.error('Payment error:', result.error);
        onFailure(result.error.message || 'Payment was cancelled');
        return;
      }

      // Payment redirected (page redirect mode)
      if (result.redirect) {
        console.log('Payment redirected');
        return;
      }

      // Payment successful
      if (result.paymentDetails) {
        console.log('Payment successful:', result.paymentDetails);
        const paymentId = result.paymentDetails.paymentMessage || 
                         result.paymentDetails.transactionId || 
                         `CF_${orderDetails.orderId}_${Date.now()}`;
        onSuccess(paymentId);
      }
    }).catch((error: any) => {
      console.error('Cashfree checkout error:', error);
      onFailure(error.message || 'Payment failed');
    });

  } catch (error) {
    console.error('Cashfree payment error:', error);
    onFailure((error as Error).message || 'Payment processing failed');
  }
};

// Generic payment handler
export const processPayment = async (
  gateway: PaymentGateway,
  orderDetails: {
    amount: number;
    orderId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    description: string;
  },
  onSuccess: (paymentId: string) => void,
  onFailure: (error: string) => void
): Promise<void> => {
  if (!gateway.enabled) {
    onFailure('Payment gateway is not enabled');
    return;
  }

  if (!gateway.keyId) {
    onFailure('Payment gateway is not configured');
    return;
  }

  switch (gateway.id) {
    case 'razorpay':
      await initiateRazorpayPayment(gateway, orderDetails, onSuccess, onFailure);
      break;
    case 'cashfree':
      await initiateCashfreePayment(gateway, orderDetails, onSuccess, onFailure);
      break;
    default:
      onFailure(`Payment gateway ${gateway.name} is not supported yet`);
  }
};

// Get active payment gateway
export const getActivePaymentGateway = (gateways: PaymentGateway[]): PaymentGateway | null => {
  return gateways.find((gw) => gw.enabled && gw.keyId) || null;
};

// Get all active gateways
export const getActivePaymentGateways = (gateways: PaymentGateway[]): PaymentGateway[] => {
  return gateways.filter((gw) => gw.enabled && gw.keyId);
};
