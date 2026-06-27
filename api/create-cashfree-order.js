// Cashfree Order Creation API
// File: api/create-cashfree-order.js

export default async function handler(req, res) {
  // ✅ CORS Headers - Browser ko allow karein
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Preflight request handle karein
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Sirf POST method allow karein
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed. Use POST.' 
    });
  }

  try {
    // Request body se data nikalein
    const { 
      orderId, 
      amount, 
      customerName, 
      customerEmail, 
      customerPhone,
      appId,
      secretKey,
      mode = 'TEST'
    } = req.body;

    console.log('📦 Order request received:', { 
      orderId, 
      amount, 
      customerEmail, 
      mode 
    });

    // ✅ Validation
    if (!orderId || !amount || !customerEmail || !customerPhone || !customerName) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields: orderId, amount, customerName, customerEmail, customerPhone' 
      });
    }

    if (!appId || !secretKey) {
      return res.status(400).json({ 
        success: false,
        error: 'Cashfree credentials missing. Please configure in admin panel.' 
      });
    }

    // Phone number ko clean karein (+91 remove karein)
    const cleanPhone = customerPhone.toString().replace(/\D/g, '').slice(-10);

    if (cleanPhone.length !== 10) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid phone number. Must be 10 digits.' 
      });
    }

    // ✅ Cashfree API URL - mode ke hisaab se
    const baseUrl = mode === 'PRODUCTION' 
      ? 'https://api.cashfree.com/pg/orders'
      : 'https://sandbox.cashfree.com/pg/orders';

    console.log('🌐 Calling Cashfree API:', baseUrl);

    // ✅ Cashfree par order create karein
    const cashfreeResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': appId,
        'x-client-secret': secretKey,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: parseFloat(amount),
        order_currency: 'INR',
        customer_details: {
          customer_id: `CUST_${cleanPhone}`,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: cleanPhone,
        },
        order_meta: {
          return_url: `https://shop-nova-liart.vercel.app/payment-success?order_id=${orderId}`,
          notify_url: `https://shop-nova-liart.vercel.app/api/cashfree-webhook`,
        },
        order_note: 'ShopNova Order',
      }),
    });

    const data = await cashfreeResponse.json();
    console.log('💳 Cashfree response:', data);

    // ✅ Error handling
    if (!cashfreeResponse.ok) {
      console.error('❌ Cashfree API error:', data);
      return res.status(cashfreeResponse.status).json({ 
        success: false,
        error: data.message || data.error_description || 'Failed to create order',
        details: data,
        code: data.code 
      });
    }

    // ✅ Success response
    return res.status(200).json({
      success: true,
      payment_session_id: data.payment_session_id,
      order_id: data.order_id,
      order_status: data.order_status,
      cf_order_id: data.cf_order_id,
    });

  } catch (error) {
    console.error('❌ Server error:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
