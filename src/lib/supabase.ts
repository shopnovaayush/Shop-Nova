import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;
let currentUrl: string | null = null;
let currentKey: string | null = null;

export const initSupabase = (url: string, anonKey: string): SupabaseClient | null => {
  if (!url || !anonKey) {
    console.warn('Supabase URL or Anon Key not provided');
    return null;
  }

  // ✅ Agar same credentials hain to existing instance return karo
  if (supabaseInstance && currentUrl === url && currentKey === anonKey) {
    return supabaseInstance;
  }
  
  try {
    // ✅ Singleton pattern with unique storage key
    supabaseInstance = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'shopnova-auth-token', // ✅ Unique storage key
      },
    });
    
    currentUrl = url;
    currentKey = anonKey;
    
    return supabaseInstance;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    return null;
  }
};

export const getSupabase = (): SupabaseClient | null => {
  return supabaseInstance;
};

export const testSupabaseConnection = async (url: string, anonKey: string): Promise<boolean> => {
  try {
    const client = createClient(url, anonKey, {
      auth: { storageKey: 'shopnova-test-token' }
    });
    const { error } = await client.from('orders').select('id').limit(1);
    return !error || error.code === 'PGRST116' || error.code === '42P01';
  } catch {
    return false;
  }
};

// Order management functions
export interface Order {
  id?: string;
  user_email: string;
  user_phone: string;
  user_name: string;
  address: string;
  items: Array<{
    product_id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  payment_method: string;
  payment_status: 'pending' | 'completed' | 'failed';
  payment_id?: string;
  order_status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at?: string;
}

export const createOrder = async (order: Order): Promise<{ data: Order | null; error: string | null }> => {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: 'Supabase not configured. Please add credentials in admin panel.' };
  }
  
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();
    
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Create order error:', err);
    return { data: null, error: (err as Error).message };
  }
};

export const updateOrderPayment = async (
  orderId: string,
  paymentId: string,
  status: 'completed' | 'failed'
): Promise<boolean> => {
  const supabase = getSupabase();
  if (!supabase) return false;
  
  try {
    const { error } = await supabase
      .from('orders')
      .update({
        payment_id: paymentId,
        payment_status: status,
        order_status: status === 'completed' ? 'confirmed' : 'pending',
      })
      .eq('id', orderId);
    
    if (error) console.error('Update payment error:', error);
    return !error;
  } catch (err) {
    console.error('Update payment exception:', err);
    return false;
  }
};

// ✅ NEW: Get all orders (admin ke liye)
export const getAllOrders = async (): Promise<{ data: Order[] | null; error: string | null }> => {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: 'Supabase not configured' };
  }
  
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
};

// ✅ NEW: Get orders by user email
export const getUserOrders = async (email: string): Promise<{ data: Order[] | null; error: string | null }> => {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: 'Supabase not configured' };
  }
  
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_email', email)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
};
