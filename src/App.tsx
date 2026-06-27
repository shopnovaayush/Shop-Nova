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

  // ✅ Prevent body scroll when modals are open
  useEffect(() => {
    if (cartOpen || checkoutOpen || userLoginOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [cartOpen, checkoutOpen, userLoginOpen]);

  // ✅ Prevent zoom on double tap (iOS Safari)
  useEffect(() => {
    let lastTouchEnd = 0;
    const preventDoubleTabZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };
    document.addEventListener('touchend', preventDoubleTabZoom, { passive: false });
    return () => {
      document.removeEventListener('touchend', preventDoubleTabZoom);
    };
  }, []);

  // ✅ Prevent pinch zoom
  useEffect(() => {
    const preventPinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventPinchZoom, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventPinchZoom);
    };
  }, []);

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
    // ✅ Scroll to top on search
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCategoryClick = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setSearchQuery("");
    // ✅ Scroll to products on category click
    setTimeout(() => {
      const productsSection = document.getElementById('products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
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
    <div className="min-h-screen bg-gray-50 w-full max-w-full overflow-x-hidden">
      <Header
        onSearch={handleSearch}
        cartCount={cartCount}
        onCategoryClick={handleCategoryClick}
        onCartClick={() => setCartOpen(true)}
        onUserLogin={() => setUserLoginOpen(true)}
      />

      <main className="w-full max-w-full overflow-x-hidden">
        {!isFiltering && <HeroBanner />}

        <CategoryBar onCategoryClick={handleCategoryClick} />

        {!isFiltering && <DealsStrip />}

        <div id="products-section" className="w-full">
          <ProductGrid
            products={isFiltering ? filteredProducts : products}
            title={gridTitle}
            onAddToCart={addToCart}
          />
        </div>

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
      </main>

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

      {/* ✅ Floating Cart Button - Better mobile UX */}
      {cartCount > 0 && !cartOpen && !checkoutOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-4 md:right-6 z-40 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl shadow-violet-500/40 flex items-center justify-center active:scale-95 transition-transform"
          aria-label="View Cart"
          style={{ touchAction: 'manipulation' }}
        >
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="w-6 h-6 md:w-7 md:h-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="absolute -top-3 -right-3 min-w-[22px] h-[22px] px-1 bg-amber-400 text-gray-900 text-[11px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
