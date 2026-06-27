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
import ProductDetailModal from "./components/ProductDetailModal";
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDetailOpen, setProductDetailOpen] = useState(false);

  const { supabase } = useAdminStore();

  useEffect(() => {
    if (supabase.url && supabase.anonKey && supabase.connected) {
      initSupabase(supabase.url, supabase.anonKey);
    }
  }, [supabase]);

  useEffect(() => {
    window.history.pushState({ page: 'home' }, '', window.location.href);

    const handleBackButton = () => {
      if (productDetailOpen) {
        setProductDetailOpen(false);
        window.history.pushState({ page: 'home' }, '', window.location.href);
      } else if (checkoutOpen) {
        setCheckoutOpen(false);
        window.history.pushState({ page: 'home' }, '', window.location.href);
      } else if (cartOpen) {
        setCartOpen(false);
        window.history.pushState({ page: 'home' }, '', window.location.href);
      } else if (userLoginOpen) {
        setUserLoginOpen(false);
        window.history.pushState({ page: 'home' }, '', window.location.href);
      } else if (searchQuery || selectedCategory !== 'All') {
        setSearchQuery('');
        setSelectedCategory('All');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState({ page: 'home' }, '', window.location.href);
      } else {
        const confirmExit = window.confirm('Are you sure you want to leave Apnikart?');
        if (confirmExit) {
          window.history.back();
        } else {
          window.history.pushState({ page: 'home' }, '', window.location.href);
        }
      }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [productDetailOpen, checkoutOpen, cartOpen, userLoginOpen, searchQuery, selectedCategory]);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { product, quantity }];
      });
      showToast(`${product.name} added to cart!`);
    },
    [showToast]
  );

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setProductDetailOpen(true);
  }, []);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCategoryClick = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setSearchQuery("");
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
    showToast("Order placed successfully!");
  }, [clearCart, showToast]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
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

      <div id="products-section">
        <ProductGrid
          products={isFiltering ? filteredProducts : products}
          title={gridTitle}
          onAddToCart={addToCart}
          onProductClick={handleProductClick}
        />
      </div>

      {!isFiltering && (
        <>
          <FeaturesBanner />
          <ProductGrid
            products={trendingProducts}
            title="Trending Now"
            onAddToCart={addToCart}
            onProductClick={handleProductClick}
          />
          <SupplierCTA />
          <ProductGrid
            products={dealProducts}
            title="Best Deals For You"
            onAddToCart={addToCart}
            onProductClick={handleProductClick}
          />
          <AppDownload />
        </>
      )}

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        onSuccess={handleCheckoutSuccess}
      />

      <Toast
        message={toastMsg}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      <Chatbot />
      <AdminPanel />
      <UserLogin isOpen={userLoginOpen} onClose={() => setUserLoginOpen(false)} />
      <PromotionalPopup />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={productDetailOpen}
        onClose={() => setProductDetailOpen(false)}
        onAddToCart={addToCart}
      />
    </div>
  );
}
