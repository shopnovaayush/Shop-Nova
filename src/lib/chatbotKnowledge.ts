// ShopNova Website Knowledge Base for Basic Chatbot

export interface KnowledgeItem {
  keywords: string[];
  response: string;
  priority: number;
}

export const websiteKnowledge: KnowledgeItem[] = [
  // Greetings
  {
    keywords: ['hi', 'hello', 'hey', 'hii', 'namaste', 'namaskar', 'hlo'],
    response: 'Namaste! 🙏 ShopNova mein aapka swagat hai! Main aapki kya madad kar sakta hoon? Aap products, orders, payment, ya delivery ke baare mein pooch sakte hain.',
    priority: 10,
  },
  {
    keywords: ['bye', 'goodbye', 'alvida', 'tata', 'thank', 'thanks', 'dhanyavaad', 'shukriya'],
    response: 'Dhanyavaad ShopNova choose karne ke liye! 🙏 Agar aur koi sawal ho toh zaroor poochiyega. Happy Shopping! ✨',
    priority: 10,
  },

  // About ShopNova
  {
    keywords: ['shopnova', 'kya hai', 'what is', 'about', 'company', 'kaun'],
    response: 'ShopNova India ka trendiest online shopping destination hai! ✦ Hum fashion, home decor, beauty, electronics aur bahut kuch offer karte hain - wo bhi best prices par! 190M+ customers hampe trust karte hain.',
    priority: 9,
  },

  // Categories
  {
    keywords: ['category', 'categories', 'kya milta', 'products', 'items', 'cheezein'],
    response: '🛍️ ShopNova par milne wali categories:\n\n👗 Women Ethnic (Saree, Kurti, Suits)\n👚 Women Western\n👔 Men (T-shirts, Shirts, Jeans)\n👶 Kids Wear\n🏠 Home & Kitchen\n💄 Beauty Products\n📱 Electronics\n💍 Jewellery\n\nKaunsi category mein dekhna hai?',
    priority: 8,
  },

  // Saree & Women Ethnic
  {
    keywords: ['saree', 'sari', 'kurti', 'suit', 'ethnic', 'lehenga', 'salwar'],
    response: '👗 Women Ethnic collection mein:\n• Designer Silk Sarees - ₹399 se\n• Cotton Kurtis - ₹299 se\n• Anarkali Suits - ₹499 se\n• Party Wear - 80% tak OFF!\n\nFree delivery available hai! Kya aap order karna chahenge?',
    priority: 8,
  },

  // Men's Fashion
  {
    keywords: ['men', 'gents', 'shirt', 'tshirt', 't-shirt', 'jeans', 'pant'],
    response: '👔 Men\'s Collection:\n• Casual T-shirts - ₹199 se\n• Denim Shirts - ₹399 se\n• Formal Shirts - ₹449 se\n• Jeans - ₹499 se\n\nSab par 70-80% discount! Free delivery bhi milegi.',
    priority: 8,
  },

  // Electronics
  {
    keywords: ['electronics', 'phone', 'mobile', 'earphone', 'headphone', 'watch', 'smartwatch', 'gadget'],
    response: '📱 Electronics & Gadgets:\n• Wireless Headphones - ₹549 se\n• Smartwatches - ₹799 se\n• Phone Accessories - ₹99 se\n• Tech Essentials - ₹299 se\n\nOriginal products with warranty! Kya chahiye aapko?',
    priority: 8,
  },

  // Beauty
  {
    keywords: ['beauty', 'makeup', 'lipstick', 'skincare', 'cosmetic', 'cream', 'face'],
    response: '💄 Beauty & Skincare:\n• Lipstick Sets - ₹279 se\n• Skincare Kits - ₹449 se\n• Organic Products available\n• Top brands at best prices!\n\n100% genuine products guaranteed.',
    priority: 8,
  },

  // Home & Kitchen
  {
    keywords: ['home', 'kitchen', 'decor', 'container', 'furniture', 'bedsheet', 'curtain'],
    response: '🏠 Home & Kitchen:\n• Storage Containers - ₹299 se\n• Home Decor Items - ₹199 se\n• Kitchen Accessories - ₹149 se\n• Bedsheets & Curtains available\n\nApna ghar sajao! 70% tak discount.',
    priority: 8,
  },

  // Pricing & Discounts
  {
    keywords: ['price', 'cost', 'kitna', 'rate', 'discount', 'offer', 'sale', 'cheap', 'sasta'],
    response: '💰 ShopNova par best prices milte hain!\n\n🔥 70-90% tak discount\n✨ Products starting ₹99\n🎁 First order par extra 15% OFF\n💵 COD available\n\nAbhi shopping karo aur bachao!',
    priority: 7,
  },

  // Delivery
  {
    keywords: ['delivery', 'shipping', 'kab milega', 'time', 'days', 'din', 'courier', 'track'],
    response: '🚚 Delivery Information:\n\n• Free delivery on orders ₹199+\n• Delivery time: 5-7 working days\n• Pan India delivery available\n• Order tracking available\n• Safe & secure packaging\n\nOrder karne ke baad tracking link milega!',
    priority: 7,
  },

  // Returns & Refund
  {
    keywords: ['return', 'refund', 'exchange', 'cancel', 'wapas', 'badalna', 'replace'],
    response: '🔄 Easy Returns Policy:\n\n• 7-day return policy\n• Free returns on most items\n• Refund in 5-7 days\n• Exchange bhi available\n• Quality guaranteed\n\nKoi problem ho toh hum help karenge!',
    priority: 7,
  },

  // Payment
  {
    keywords: ['payment', 'pay', 'cod', 'upi', 'card', 'paytm', 'phonepe', 'razorpay', 'online'],
    response: '💳 Payment Options:\n\n• COD (Cash on Delivery) ✅\n• UPI (GPay, PhonePe, Paytm)\n• Credit/Debit Cards\n• Net Banking\n• Wallets\n\n100% secure payment! Kaunsa method use karna hai?',
    priority: 7,
  },

  // Order Status
  {
    keywords: ['order', 'status', 'kahan', 'where', 'tracking', 'dispatch'],
    response: '📦 Order track karne ke liye:\n\n1. Profile section mein jaiye\n2. "My Orders" click karein\n3. Order ID se track karein\n\nYa aap Order ID batao, main help karta hoon!',
    priority: 7,
  },

  // Contact & Support
  {
    keywords: ['contact', 'support', 'help', 'problem', 'issue', 'complaint', 'call', 'email'],
    response: '📞 Customer Support:\n\n• Email: support@shopnova.in\n• Phone: 1800-123-4567 (Toll Free)\n• Working Hours: 9 AM - 9 PM\n• Response time: Within 24 hours\n\nHum hamesha aapki help ke liye ready hain!',
    priority: 7,
  },

  // Seller/Supplier
  {
    keywords: ['seller', 'supplier', 'sell', 'business', 'bechna', 'dukan'],
    response: '🏪 ShopNova par Seller bane!\n\n• 0% Commission\n• 15 Lakh+ Suppliers\n• 190M+ Customers reach\n• Zero investment start\n• Easy dashboard\n\n"Become a Supplier" par click karein!',
    priority: 6,
  },

  // App Download
  {
    keywords: ['app', 'download', 'mobile', 'android', 'ios', 'install'],
    response: '📲 ShopNova App Download karein!\n\n• Extra 15% OFF on first app order\n• Faster checkout\n• Exclusive app deals\n• Easy tracking\n\nGoogle Play ya App Store se download karein!',
    priority: 6,
  },

  // Size & Fitting
  {
    keywords: ['size', 'fitting', 'measurement', 'naap', 'chart'],
    response: '📏 Size Guide:\n\n• Har product par size chart available hai\n• Product page par "Size Chart" button dabayein\n• Measurements carefully check karein\n• Doubt ho toh ek size bada lein\n\nKisi specific product ka size chahiye?',
    priority: 6,
  },

  // Quality
  {
    keywords: ['quality', 'original', 'genuine', 'fake', 'nakli', 'asli', 'real'],
    response: '✅ Quality Assurance:\n\n• 100% genuine products\n• Quality checked before dispatch\n• Branded items with tags\n• Customer reviews dekh sakte hain\n• Not satisfied? Easy returns!\n\nShopNova par trust karein! ✦',
    priority: 6,
  },

  // Default fallback - must be last with lowest priority
  {
    keywords: [],
    response: 'Main samajh nahi paaya 🤔 Kya aap thoda aur detail mein bata sakte hain?\n\nAap pooch sakte hain:\n• Products ke baare mein\n• Delivery & Returns\n• Payment options\n• Order tracking\n• Any other help',
    priority: 0,
  },
];

export const findBestResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase().trim();
  
  let bestMatch: KnowledgeItem | null = null;
  let maxMatches = 0;

  for (const item of websiteKnowledge) {
    if (item.keywords.length === 0) continue; // Skip fallback
    
    const matches = item.keywords.filter((keyword) =>
      message.includes(keyword.toLowerCase())
    ).length;

    if (matches > maxMatches || (matches === maxMatches && item.priority > (bestMatch?.priority || 0))) {
      maxMatches = matches;
      bestMatch = item;
    }
  }

  // Return best match or fallback
  return bestMatch?.response || websiteKnowledge[websiteKnowledge.length - 1].response;
};

// API-based chat function
export const getAIResponse = async (
  message: string,
  apiProvider: 'openai' | 'gemini' | 'custom',
  apiKey: string,
  apiEndpoint?: string
): Promise<string> => {
  const systemPrompt = `You are Nova Assistant, the helpful AI chatbot for ShopNova - India's trendiest online shopping destination. 

About ShopNova:
- E-commerce platform selling Fashion, Home & Kitchen, Beauty, Electronics, Jewellery
- Categories: Women Ethnic, Women Western, Men, Kids, Home & Kitchen, Beauty, Electronics, Jewellery
- USP: 70-90% discounts, Free delivery on ₹199+, 7-day returns, COD available
- 190M+ customers, 15L+ suppliers, 0% commission for sellers
- Contact: support@shopnova.in, 1800-123-4567

Guidelines:
- Respond in Hinglish (mix of Hindi and English) if user speaks Hindi
- Be friendly, helpful and concise
- Help with products, orders, payments, delivery, returns
- Recommend products when appropriate
- If you don't know something, politely say so and suggest contacting support`;

  try {
    if (apiProvider === 'openai') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      return data.choices[0].message.content;
    } 
    
    else if (apiProvider === 'gemini') {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `${systemPrompt}\n\nUser: ${message}\nAssistant:` }]
            }],
            generationConfig: {
              maxOutputTokens: 300,
              temperature: 0.7,
            },
          }),
        }
      );

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      return data.candidates[0].content.parts[0].text;
    }
    
    else if (apiProvider === 'custom' && apiEndpoint) {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          message,
          systemPrompt,
        }),
      });

      const data = await response.json();
      return data.response || data.message || data.text;
    }

    throw new Error('Invalid API provider');
  } catch (error) {
    console.error('AI API Error:', error);
    throw error;
  }
};
