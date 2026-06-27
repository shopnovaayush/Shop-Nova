import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PaymentGateway {
  id: string;
  name: string;
  enabled: boolean;
  keyId: string;
  keySecret: string;
  webhookSecret?: string;
  testMode: boolean;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  connected: boolean;
}

export interface ChatbotConfig {
  enabled: boolean;
  useApi: boolean;
  apiProvider: 'openai' | 'gemini' | 'custom';
  apiKey: string;
  apiEndpoint?: string;
  welcomeMessage: string;
  botName: string;
}

export interface AppColors {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
}

export interface PopupConfig {
  enabled: boolean;
  title: string;
  message: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  textColor: string;
  showOnLoad: boolean;
  delaySeconds: number;
}

export interface ContactInfo {
  email: string;
  whatsapp: string;
  address: string;
  phone: string;
}

export interface Order {
  id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
}

interface AdminState {
  isAuthenticated: boolean;
  adminPassword: string;
  
  // Supabase
  supabase: SupabaseConfig;
  
  // Chatbot
  chatbot: ChatbotConfig;
  
  // Payment Gateways
  paymentGateways: PaymentGateway[];
  
  // App Customization
  appColors: AppColors;
  popup: PopupConfig;
  contactInfo: ContactInfo;
  
  // Orders (cached)
  orders: Order[];
  
  // Actions
  login: (password: string) => boolean;
  logout: () => void;
  setAdminPassword: (password: string) => void;
  
  updateSupabase: (config: Partial<SupabaseConfig>) => void;
  updateChatbot: (config: Partial<ChatbotConfig>) => void;
  updatePaymentGateway: (id: string, config: Partial<PaymentGateway>) => void;
  addPaymentGateway: (gateway: PaymentGateway) => void;
  removePaymentGateway: (id: string) => void;
  
  updateAppColors: (colors: Partial<AppColors>) => void;
  updatePopup: (popup: Partial<PopupConfig>) => void;
  updateContactInfo: (contact: Partial<ContactInfo>) => void;
  
  addOrder: (order: Order) => void;
  clearOrders: () => void;
}

const defaultPaymentGateways: PaymentGateway[] = [
  {
    id: 'razorpay',
    name: 'Razorpay',
    enabled: false,
    keyId: '',
    keySecret: '',
    webhookSecret: '',
    testMode: true,
  },
  {
    id: 'cashfree',
    name: 'Cashfree',
    enabled: false,
    keyId: '13027093ee54013453fbcb1eb089072031', // Default from screenshot
    keySecret: 'cfsk_ma_prod_23c0f05b2c2f34547eee4dc55405f3f1_50516b4a',
    webhookSecret: '',
    testMode: false,
  },
  {
    id: 'paytm',
    name: 'Paytm',
    enabled: false,
    keyId: '',
    keySecret: '',
    webhookSecret: '',
    testMode: true,
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    enabled: false,
    keyId: '',
    keySecret: '',
    webhookSecret: '',
    testMode: true,
  },
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      adminPassword: 'admin123',
      
      supabase: {
        url: '',
        anonKey: '',
        connected: false,
      },
      
      chatbot: {
        enabled: true,
        useApi: false,
        apiProvider: 'openai',
        apiKey: '',
        apiEndpoint: '',
        welcomeMessage: 'Namaste! 🙏 Main ShopNova ka assistant hoon. Aapki kya madad kar sakta hoon?',
        botName: 'Nova Assistant',
      },
      
      paymentGateways: defaultPaymentGateways,
      
      appColors: {
        primary: '#7c3aed', // Violet
        secondary: '#d946ef', // Fuchsia
        accent: '#f59e0b', // Amber
        gradient: 'from-violet-600 to-fuchsia-500',
      },
      
      popup: {
        enabled: true,
        title: '🎉 Welcome to ShopNova!',
        message: 'Get extra 15% OFF on your first order. Use code: WELCOME15',
        buttonText: 'Shop Now',
        buttonLink: '',
        backgroundColor: 'from-violet-600 via-fuchsia-600 to-pink-500',
        textColor: '#ffffff',
        showOnLoad: true,
        delaySeconds: 3,
      },
      
      contactInfo: {
        email: 'tipsactivelife@gmail.com',
        whatsapp: '7307493338',
        phone: '+91 73074 93338',
        address: 'FF Shop No. 6, Arohi Arcade, Munshipulia, Lucknow - 226016',
      },
      
      orders: [],
      
      login: (password) => {
        const isValid = password === get().adminPassword;
        if (isValid) {
          set({ isAuthenticated: true });
        }
        return isValid;
      },
      
      logout: () => set({ isAuthenticated: false }),
      
      setAdminPassword: (password) => set({ adminPassword: password }),
      
      updateSupabase: (config) =>
        set((state) => ({
          supabase: { ...state.supabase, ...config },
        })),
      
      updateChatbot: (config) =>
        set((state) => ({
          chatbot: { ...state.chatbot, ...config },
        })),
      
      updatePaymentGateway: (id, config) =>
        set((state) => ({
          paymentGateways: state.paymentGateways.map((gw) =>
            gw.id === id ? { ...gw, ...config } : gw
          ),
        })),
      
      addPaymentGateway: (gateway) =>
        set((state) => ({
          paymentGateways: [...state.paymentGateways, gateway],
        })),
      
      removePaymentGateway: (id) =>
        set((state) => ({
          paymentGateways: state.paymentGateways.filter((gw) => gw.id !== id),
        })),
      
      updateAppColors: (colors) =>
        set((state) => ({
          appColors: { ...state.appColors, ...colors },
        })),
      
      updatePopup: (popup) =>
        set((state) => ({
          popup: { ...state.popup, ...popup },
        })),
      
      updateContactInfo: (contact) =>
        set((state) => ({
          contactInfo: { ...state.contactInfo, ...contact },
        })),
      
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),
      
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: 'shopnova-admin-storage-v2',
    }
  )
);
