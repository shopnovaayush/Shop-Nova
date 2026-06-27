export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
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

    if (!orderId || !amount || !customerEmail || !customerPhone || !customerName) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    if (!appId || !secretKey) {
      return res.status(400).json({
        success: false,
        error: 'Cashfree credentials missing'
      });
    }

    const cleanPhone = customerPhone.toString().replace(/\D/g, '').slice(-10);

    const baseUrl = mode === 'PRODUCTION'
      ? 'https://api.cashfree.com/pg/orders'
      : 'https://sandbox.cashfree.com/pg/orders';

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
        },
        order_note: 'ShopNova Order',
      }),
    });

    const data = await cashfreeResponse.json();

    if (!cashfreeResponse.ok) {
      return res.status(cashfreeResponse.status).json({
        success: false,
        error: data.message || 'Failed to create order',
        details: data
      });
    }

    return res.status(200).json({
      success: true,
      payment_session_id: data.payment_session_id,
      order_id: data.order_id,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
