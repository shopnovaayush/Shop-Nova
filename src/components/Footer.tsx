import { Mail, Phone, MapPin, ShoppingBag, Shield, Truck, RotateCcw, CreditCard, Award } from "lucide-react";
import { useAdminStore } from "../store/adminStore";

const FacebookIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
const TwitterIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.5" /></svg>;
const YoutubeIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
const WhatsappIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>;

export default function Footer() {
  const { contactInfo } = useAdminStore();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Trust Badges Strip */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-violet-600/10 flex items-center justify-center group-hover:bg-violet-600/20 transition-colors">
                <Truck size={22} className="text-violet-400" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">Free Delivery</p>
                <p className="text-xs text-gray-500">On orders above ₹199</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-pink-600/10 flex items-center justify-center group-hover:bg-pink-600/20 transition-colors">
                <RotateCcw size={22} className="text-pink-400" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">Easy Returns</p>
                <p className="text-xs text-gray-500">7-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-amber-600/10 flex items-center justify-center group-hover:bg-amber-600/20 transition-colors">
                <Shield size={22} className="text-amber-400" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">100% Secure</p>
                <p className="text-xs text-gray-500">Safe payments</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-emerald-600/10 flex items-center justify-center group-hover:bg-emerald-600/20 transition-colors">
                <Award size={22} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">Genuine Products</p>
                <p className="text-xs text-gray-500">Quality assured</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-gray-800 bg-gradient-to-r from-violet-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white text-xl font-bold flex items-center gap-2">
                Stay Updated with Apnikart ✦
              </h3>
              <p className="text-sm text-gray-400 mt-1">Subscribe & get exclusive deals, offers and 10% off on your first order!</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 md:w-80 px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-l-xl text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all" 
              />
              <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold rounded-r-xl hover:opacity-95 text-sm shadow-lg shadow-violet-900/50 transition-all">
                Subscribe →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Footer Brand Logo */}
        <div className="mb-10 pb-8 border-b border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-violet-900/50">
                  <ShoppingBag size={24} className="stroke-[2.5]" />
                </div>
                <h2 className="text-3xl font-black flex items-center">
                  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Apni</span>
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">kart</span>
                  <span className="text-pink-400 text-lg ml-0.5"> ✦</span>
                </h2>
              </div>
              <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                <span className="text-white font-semibold">Apni Pasand, Apna Kart!</span> India's most trusted online shopping destination. Discover the latest fashion, electronics, home essentials & beauty products at unbeatable prices with quality you can trust.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-3 rounded-xl border border-gray-700">
              <div className="text-3xl">🇮🇳</div>
              <div>
                <p className="text-white text-sm font-bold">Made in India</p>
                <p className="text-xs text-gray-500">Proudly Indian Brand</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Apnikart */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">About Apnikart</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Our Story</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Careers</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Press & Media</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Blog</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Investor Relations</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Help Center</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Track Your Order</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Cancellation</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">FAQs</a></li>
            </ul>
          </div>

          {/* Sell on Apnikart */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Sell on Apnikart</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Become a Seller</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Supplier Dashboard</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Seller Policies</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Apnikart for Business</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Bulk Orders</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors hover:translate-x-1 inline-block">Affiliate Program</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-violet-600/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-violet-400" />
                </div>
                <span className="leading-relaxed">{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-violet-600/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-violet-400" />
                </div>
                <a href={`tel:+91${contactInfo.whatsapp}`} className="hover:text-violet-400 transition-colors">+91 {contactInfo.whatsapp}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-violet-600/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-violet-400" />
                </div>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-violet-400 transition-colors break-all">{contactInfo.email}</a>
              </li>
            </ul>

            <div className="mt-5">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">Follow Us</p>
              <div className="flex items-center gap-2">
                <a href="#" aria-label="Facebook" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all hover:scale-110"><FacebookIcon /></a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all hover:scale-110"><InstagramIcon /></a>
                <a href="#" aria-label="Twitter" className="w-9 h-9 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all hover:scale-110"><TwitterIcon /></a>
                <a href="#" aria-label="YouTube" className="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all hover:scale-110"><YoutubeIcon /></a>
                <a href={`https://wa.me/91${contactInfo.whatsapp}`} aria-label="WhatsApp" className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-all hover:scale-110"><WhatsappIcon /></a>
              </div>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">📱 Download Apnikart App</h4>
              <p className="text-sm text-gray-400 mb-4">Get exclusive app-only deals & faster shopping experience</p>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-xl transition-colors border border-gray-700">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0001 0-.5511.4482-.9993.9993-.9993.5512 0 .9993.4482.9993.9993.0001.5515-.4481 1.0001-.9993 1.0001m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0001 0-.5511.4482-.9993.9993-.9993.5512 0 .9993.4482.9993.9993 0 .5515-.4481 1.0001-.9993 1.0001m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" /></svg>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400">GET IT ON</p>
                    <p className="text-white text-sm font-bold">Google Play</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-xl transition-colors border border-gray-700">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400">Download on the</p>
                    <p className="text-white text-sm font-bold">App Store</p>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="md:text-right">
              <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">💳 Secure Payments</h4>
              <p className="text-sm text-gray-400 mb-4">100% safe & secure transactions</p>
              <div className="flex flex-wrap gap-2 md:justify-end">
                <span className="bg-white text-blue-700 px-3 py-1.5 rounded-md text-xs font-bold">VISA</span>
                <span className="bg-white text-red-600 px-3 py-1.5 rounded-md text-xs font-bold">MasterCard</span>
                <span className="bg-white text-blue-800 px-3 py-1.5 rounded-md text-xs font-bold">RuPay</span>
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1.5 rounded-md text-xs font-bold">UPI</span>
                <span className="bg-white text-purple-700 px-3 py-1.5 rounded-md text-xs font-bold">PhonePe</span>
                <span className="bg-white text-blue-600 px-3 py-1.5 rounded-md text-xs font-bold">Paytm</span>
                <span className="bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-bold">COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-800 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p className="text-center md:text-left">
              © 2026 <span className="text-violet-400 font-semibold">Apnikart</span>. All rights reserved. | Made with ❤️ in India
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <a href="#" className="hover:text-violet-400 transition-colors">Terms of Service</a>
              <span className="text-gray-700">•</span>
              <a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a>
              <span className="text-gray-700">•</span>
              <a href="#" className="hover:text-violet-400 transition-colors">Cookie Policy</a>
              <span className="text-gray-700">•</span>
              <a href="#" className="hover:text-violet-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
