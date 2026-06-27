import { Mail, Phone, MapPin } from "lucide-react";
import { useAdminStore } from "../store/adminStore";

const FacebookIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
const TwitterIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.5" /></svg>;
const YoutubeIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;

export default function Footer() {
  const { contactInfo } = useAdminStore();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white text-lg font-bold">Stay in the Loop ✦</h3>
              <p className="text-sm text-gray-400">Subscribe & get exclusive ShopNova deals</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 md:w-72 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-l-lg text-sm outline-none focus:border-violet-500" />
              <button className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-medium rounded-r-lg hover:opacity-90 text-sm">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Footer logo */}
        <div className="mb-8 pb-6 border-b border-gray-800">
          <h2 className="text-2xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Shop</span>
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Nova</span>
            <span className="text-amber-400 text-sm"> ✦</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md">India's trendiest online shopping destination. Discover fashion, home, beauty & electronics at prices that shine.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-white font-bold mb-4">About ShopNova</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-violet-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white font-bold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-violet-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h4 className="text-white font-bold mb-4">Sell on ShopNova</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-violet-400 transition-colors">Become a Supplier</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Supplier Dashboard</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Seller Policies</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5 text-violet-400" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0 text-violet-400" />
                <a href={`tel:+91${contactInfo.whatsapp}`} className="hover:text-violet-400">+91 {contactInfo.whatsapp}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0 text-violet-400" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-violet-400">{contactInfo.email}</a>
              </li>
            </ul>

            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-violet-600 transition-colors"><FacebookIcon /></a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-violet-600 transition-colors"><TwitterIcon /></a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-violet-600 transition-colors"><InstagramIcon /></a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-violet-600 transition-colors"><YoutubeIcon /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© 2026 ShopNova. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-violet-400">Terms of Service</a>
              <a href="#" className="hover:text-violet-400">Privacy Policy</a>
              <a href="#" className="hover:text-violet-400">Cookie Policy</a>
            </div>
            <div className="flex items-center gap-2">
              <span>Pay using:</span>
              <span className="bg-gray-800 px-2 py-0.5 rounded">VISA</span>
              <span className="bg-gray-800 px-2 py-0.5 rounded">UPI</span>
              <span className="bg-gray-800 px-2 py-0.5 rounded">COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
