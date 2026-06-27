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
    amount: orderDetails.amount * 100, // Razorpay expects amount in paise
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

// Cashfree payment (Client-side SDK)
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
  const loaded = await loadPaymentScript('cashfree');
  if (!loaded) {
    onFailure('Failed to load Cashfree SDK');
    return;
  }

  try {
    // Note: Cashfree requires server-side order creation for security
    // Client-side SDK needs payment_session_id from backend
    // For now, simulating payment flow
    
    // In production:
    // 1. Create order on your server using Cashfree API
    // 2. Get payment_session_id
    // 3. Initialize checkout with session ID
    
    console.log('Cashfree payment initiated:', {
      appId: gateway.keyId,
      amount: orderDetails.amount,
      orderId: orderDetails.orderId,
      mode: gateway.testMode ? 'TEST' : 'PRODUCTION',
    });

    // Simulate payment success for demo
    setTimeout(() => {
      onSuccess(`CF_${orderDetails.orderId}_${Date.now()}`);
    }, 1500);

  } catch (error) {
    onFailure((error as Error).message);
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
