import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  Phone,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

const navLinks = [
  "Women Ethnic",
  "Women Western",
  "Men",
  "Kids",
  "Home & Kitchen",
  "Beauty",
  "Electronics",
  "Jewellery",
];

export default function Header({
  onSearch,
  cartCount,
  onCategoryClick,
  onCartClick,
  onUserLogin,
}: {
  onSearch: (q: string) => void;
  cartCount: number;
  onCategoryClick: (cat: string) => void;
  onCartClick: () => void;
  onUserLogin: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm transition-all duration-300">
      {/* Top bar strip */}
      <div className="bg-gradient-to-r from-violet-700 via-fuchsia-600 to-pink-500 text-white text-xs py-2 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 animate-pulse">
            <Phone size={12} />
            <span>Download Apnikart App & Get Extra 15% Off + Free Delivery! 🎉</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[11px] tracking-wide">
            <span className="cursor-pointer hover:text-amber-300 transition-colors flex items-center gap-1">
              <Sparkles size={11} /> Become a Supplier
            </span>
            <span className="text-white/40">|</span>
            <span className="cursor-pointer hover:text-amber-300 transition-colors">Help Center</span>
            <span className="text-white/40">|</span>
            <span className="cursor-pointer hover:text-amber-300 transition-colors">Track Order</span>
          </div>
        </div>
      </div>

      {/* Main header body */}
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Mobile menu icon */}
          <button
            className="lg:hidden text-gray-700 hover:text-violet-600 p-1.5 rounded-lg hover:bg-gray-100 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo with Indian Bag Graphic */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center gap-2 group" 
            onClick={() => onCategoryClick("All")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white shadow-md shadow-violet-200 group-hover:scale-105 transition-transform duration-200">
              <ShoppingBag size={20} className="stroke-[2.5]" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-black flex items-center tracking-tight select-none">
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent">
                Apni
              </span>
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent font-extrabold">
                kart
              </span>
              <span className="text-pink-500 text-lg ml-0.5 animate-bounce">✦</span>
            </h1>
          </div>

          {/* Search bar wrapper */}
          <form
            onSubmit={handleSearch}
            className="flex-1 hidden md:flex items-center"
          >
            <div className="relative w-full max-w-2xl group">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-600 transition-colors"
              />
              <input
                type="text"
                placeholder="Search for Kurtis, Sarees, T-shirts, Electronics, Makeup & more..."
                className="w-full pl-11 pr-28 py-2.5 rounded-full border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none text-sm bg-gray-50 focus:bg-white transition-all shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-6 py-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-full text-xs font-semibold hover:opacity-95 transition-opacity shadow-md shadow-violet-200"
              >
                Search
              </button>
            </div>
          </form>

          {/* Action buttons (Wishlist, Cart, User) */}
          <div className="flex items-center gap-1 sm:gap-4 ml-auto">
            {/* Wishlist */}
            <button className="hidden sm:flex flex-col items-center text-gray-600 hover:text-violet-600 transition-colors p-1.5 rounded-xl hover:bg-gray-50 group">
              <Heart size={20} className="group-hover:scale-110 transition-transform duration-150" />
              <span className="text-[10px] font-semibold mt-1">Wishlist</span>
            </button>

            {/* Cart with count badge */}
            <button 
              onClick={onCartClick} 
              className="relative flex flex-col items-center text-gray-600 hover:text-violet-600 transition-colors p-1.5 rounded-xl hover:bg-gray-50 group"
            >
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform duration-150" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-pink-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
              <span className="text-[10px] font-semibold mt-1">Cart</span>
            </button>

            {/* User Login */}
            <button 
              onClick={onUserLogin} 
              className="flex flex-col items-center text-gray-600 hover:text-violet-600 transition-colors p-1.5 rounded-xl hover:bg-gray-50 group"
            >
              <User size={20} className="group-hover:scale-110 transition-transform duration-150" />
              <span className="text-[10px] font-semibold mt-1">Profile</span>
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <form onSubmit={handleSearch} className="md:hidden mt-3">
          <div className="relative group">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-600"
            />
            <input
              type="text"
              placeholder="Search products on Apnikart..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-violet-500 outline-none text-sm bg-gray-50 focus:bg-white focus:ring-4 focus:ring-violet-100 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Desktop categories Navigation menu bar */}
      <nav className="hidden lg:block border-t border-gray-100 shadow-sm bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-between gap-1">
            {navLinks.map((link) => (
              <li key={link} className="flex-1 text-center">
                <button
                  onClick={() => onCategoryClick(link)}
                  className="group w-full flex items-center justify-center gap-1 py-3 text-xs lg:text-sm font-semibold text-gray-600 hover:text-violet-600 border-b-2 border-transparent hover:border-violet-600 transition-all"
                >
                  {link}
                  <ChevronDown
                    size={14}
                    className="text-gray-400 group-hover:text-violet-600 group-hover:rotate-180 transition-all duration-300"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer menu list */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[125px] bg-white z-40 overflow-y-auto animate-fade-in border-t border-gray-100">
          <ul className="p-4 space-y-1">
            <li className="text-xs font-bold text-gray-400 px-4 py-2 tracking-wider uppercase">
              Shop Categories
            </li>
            {navLinks.map((link) => (
              <li key={link}>
                <button
                  onClick={() => {
                    onCategoryClick(link);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-xl transition-colors font-semibold text-sm flex items-center justify-between"
                >
                  <span>{link}</span>
                  <ChevronDown size={14} className="-rotate-90 text-gray-400" />
                </button>
              </li>
            ))}
            <li className="pt-4 mt-4 border-t border-gray-100">
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-violet-50 rounded-xl font-semibold text-sm flex items-center gap-2">
                <Sparkles size={16} className="text-violet-600" />
                <span>Become a Supplier</span>
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-violet-50 rounded-xl font-semibold text-sm">
                Help Center
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
