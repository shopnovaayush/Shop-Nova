import { useState, useCallback, useMemo, useEffect } from "react";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import CategoryBar from "./components/CategoryBar";
import DealsStrip from "./components/DealsStrip";
import ProductGrid from "./components/ProductGrid";
import FeaturesBanner from "./components/FeaturesBanner";
import SupplierCTA from "./components/SupplierCTA";
import AppDownload from "./components/AppDownload";
import Footer from "./components/Footer";
import CartDrawer, { CartItem } from "./components/CartDrawer";
import Toast from "./components/Toast";
import Chatbot from "./components/Chatbot";
import AdminPanel from "./components/AdminPanel";
import CheckoutModal from "./components/CheckoutModal";
import UserLogin from "./components/UserLogin";
import PromotionalPopup from "./components/PromotionalPopup";
import { products, Product } from "./data/products";
import { useAdminStore } from "./store/adminStore";
import { initSupabase } from "./lib/supabase";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userLoginOpen, setUserLoginOpen] = useState(false);

  const { supabase } = useAdminStore();

  // Initialize Supabase on app load if configured
  useEffect(() => {
    if (supabase.url && supabase.anonKey && supabase.connected) {
      initSupabase(supabase.url, supabase.anonKey);
    }
  }, [supabase]);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
  }, []);

  const addToCart = useCallback(
    (product: Product) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
      showToast(`${product.name} added to cart!`);
    },
    [showToast]
  );

  const updateQuantity = useCallback((id: number, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.product.id !== id));
    } else {
      setCart((prev) =>
        prev.map((i) =>
          i.product.id === id ? { ...i, quantity: qty } : i
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart]
  );

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    setSelectedCategory("All");
  }, []);

  const handleCategoryClick = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setSearchQuery("");
  }, []);

  const handleCheckout = useCallback(() => {
    setCartOpen(false);
    setCheckoutOpen(true);
  }, []);

  const handleCheckoutSuccess = useCallback(() => {
    clearCart();
    showToast("🎉 Order placed successfully!");
  }, [clearCart, showToast]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    return result;
  }, [searchQuery, selectedCategory]);

  const trendingProducts = useMemo(
    () => [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 10),
    []
  );

  const dealProducts = useMemo(
    () => [...products].sort((a, b) => b.discount - a.discount).slice(0, 10),
    []
  );

  const isFiltering = searchQuery.trim() !== "" || selectedCategory !== "All";

  const gridTitle = searchQuery.trim()
    ? `Search results for "${searchQuery}"`
    : selectedCategory !== "All"
    ? selectedCategory
    : "Products For You";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        cartCount={cartCount}
        onCategoryClick={handleCategoryClick}
        onCartClick={() => setCartOpen(true)}
        onUserLogin={() => setUserLoginOpen(true)}
      />

      {!isFiltering && <HeroBanner />}

      <CategoryBar onCategoryClick={handleCategoryClick} />

      {!isFiltering && <DealsStrip />}

      <ProductGrid
        products={isFiltering ? filteredProducts : products}
        title={gridTitle}
        onAddToCart={addToCart}
      />

      {!isFiltering && (
        <>
          <FeaturesBanner />

          <ProductGrid
            products={trendingProducts}
            title="Trending Now 🔥"
            onAddToCart={addToCart}
          />

          <SupplierCTA />

          <ProductGrid
            products={dealProducts}
            title="Best Deals For You 💰"
            onAddToCart={addToCart}
          />

          <AppDownload />
        </>
      )}

      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        onSuccess={handleCheckoutSuccess}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMsg}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      {/* Chatbot */}
      <Chatbot />

      {/* Admin Panel */}
      <AdminPanel />

      {/* User Login */}
      <UserLogin isOpen={userLoginOpen} onClose={() => setUserLoginOpen(false)} />

      {/* Promotional Popup */}
      <PromotionalPopup />

      {/* Floating cart button */}
      {cartCount > 0 && !cartOpen && !checkoutOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white w-14 h-14 rounded-full shadow-2xl shadow-violet-500/30 flex items-center justify-center hover:scale-110 transition-transform animate-pulse-glow"
        >
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-amber-400 text-gray-900 text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
