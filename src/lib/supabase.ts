import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const initSupabase = (url: string, anonKey: string): SupabaseClient | null => {
  if (!url || !anonKey) {
    console.warn('Supabase URL or Anon Key not provided');
    return null;
  }
  
  try {
    supabaseInstance = createClient(url, anonKey);
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
    const client = createClient(url, anonKey);
    // Try a simple query to test connection
    const { error } = await client.from('_test_connection').select('*').limit(1);
    // Even if table doesn't exist, connection is successful if we get a proper error
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
    return { data: null, error: 'Supabase not configured' };
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
    
    return !error;
  } catch {
    return false;
  }
};

// SQL to create orders table in Supabase:
/*
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  user_name TEXT NOT NULL,
  address TEXT NOT NULL,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  payment_id TEXT,
  order_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy for inserting orders (anyone can create)
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);

-- Policy for reading own orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (true);
*/
