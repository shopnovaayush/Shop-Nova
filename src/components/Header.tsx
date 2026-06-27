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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top strip */}
      <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone size={12} />
            <span>Download the ShopNova App & Get Extra 15% Off 🎉</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="cursor-pointer hover:underline">Become a Supplier</span>
            <span>|</span>
            <span className="cursor-pointer hover:underline">Help Center</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onCategoryClick("All")}>
            <h1 className="text-2xl lg:text-3xl font-extrabold flex items-center gap-1.5">
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                Shop
              </span>
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Nova
              </span>
              <span className="text-amber-500 text-lg">✦</span>
            </h1>
          </div>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 hidden md:flex items-center"
          >
            <div className="relative w-full max-w-2xl">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search for Saree, Kurti, T-shirts, Electronics & more..."
                className="w-full pl-10 pr-24 py-2.5 rounded-full border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none text-sm bg-gray-50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-5 py-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Search
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-3 ml-auto">
            <button className="hidden sm:flex flex-col items-center text-gray-600 hover:text-violet-600 transition-colors p-2">
              <Heart size={20} />
              <span className="text-[10px] mt-0.5">Wishlist</span>
            </button>
            <button onClick={onCartClick} className="relative flex flex-col items-center text-gray-600 hover:text-violet-600 transition-colors p-2">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 right-0 w-5 h-5 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="text-[10px] mt-0.5">Cart</span>
            </button>
            <button onClick={onUserLogin} className="flex flex-col items-center text-gray-600 hover:text-violet-600 transition-colors p-2">
              <User size={20} />
              <span className="text-[10px] mt-0.5">Login</span>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden mt-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:border-violet-500 outline-none text-sm bg-gray-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Desktop nav categories */}
      <nav className="hidden lg:block border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-0">
            {navLinks.map((link) => (
              <li key={link}>
                <button
                  onClick={() => onCategoryClick(link)}
                  className="group flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-violet-600 border-b-2 border-transparent hover:border-violet-600 transition-all"
                >
                  {link}
                  <ChevronDown
                    size={14}
                    className="text-gray-400 group-hover:text-violet-600 transition-colors"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[120px] bg-white z-40 overflow-y-auto">
          <ul className="p-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link}>
                <button
                  onClick={() => {
                    onCategoryClick(link);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-lg transition-colors font-medium"
                >
                  {link}
                </button>
              </li>
            ))}
            <li className="pt-4 border-t">
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-violet-50 rounded-lg font-medium">
                Become a Supplier
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-violet-50 rounded-lg font-medium">
                Help Center
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
