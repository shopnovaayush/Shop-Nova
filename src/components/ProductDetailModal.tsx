import { useState, useEffect } from "react";
import { 
  X, 
  Heart, 
  Share2, 
  Star, 
  ShoppingCart, 
  Zap, 
  Shield, 
  Truck, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  Minus,
  Plus,
  Check,
  Award,
  ArrowLeft
} from "lucide-react";
import { Product } from "../data/products";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomImage, setZoomImage] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');

  const productImages = product ? [
    product.image,
    product.image,
    product.image,
    product.image,
  ] : [];

  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
      setSelectedImage(0);
      setZoomImage(false);
      setActiveTab('description');
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const savings = product.originalPrice - product.price;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-white md:bg-black/60 md:backdrop-blur-sm overflow-y-auto modal-overlay animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div 
        className="bg-white w-full max-w-6xl mx-auto md:my-4 md:rounded-2xl shadow-2xl relative min-h-screen md:min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header - Mobile Friendly */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-3 py-3 flex items-center justify-between md:rounded-t-2xl shadow-sm">
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors -ml-2"
            aria-label="Back"
          >
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <h2 className="font-bold text-base text-gray-900 truncate flex-1 mx-2 text-center md:text-left">
            Product Details
          </h2>
          <div className="flex items-center gap-1">
            <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
              <Share2 size={20} className="text-gray-700" />
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <Heart
                size={20}
                className={liked ? "fill-pink-500 text-pink-500" : "text-gray-400"}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
          
          {/* LEFT - Image Gallery */}
          <div className="p-4 md:p-6">
            <div 
              className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group"
              onClick={() => setZoomImage(true)}
            >
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                draggable={false}
              />
              
              <div className="absolute top-3 left-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
                <Zap size={12} />
                {product.discount}% OFF
              </div>

              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                🔍 Tap to zoom
              </div>

              {productImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                  >
                    <ChevronLeft size={20} className="text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                  >
                    <ChevronRight size={20} className="text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-violet-600 shadow-md' 
                      : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" draggable={false} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT - Details */}
          <div className="p-4 md:p-6 pb-32 md:pb-6">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs text-violet-600 font-bold uppercase tracking-wider bg-violet-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              {product.rating >= 4.5 && (
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full flex items-center gap-1">
                  <Award size={12} />
                  BESTSELLER
                </span>
              )}
            </div>

            <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 flex-wrap">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-2.5 py-1 rounded-lg shadow-sm">
                <span className="font-bold text-sm">{product.rating.toFixed(1)}</span>
                <Star size={14} fill="white" className="text-white" />
              </div>
              <span className="text-sm text-gray-600 font-medium">
                ({product.reviews.toLocaleString()} reviews)
              </span>
              <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                <Check size={14} />
                Verified
              </span>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-pink-50 p-4 rounded-2xl mb-4 border border-violet-100">
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <span className="text-3xl md:text-4xl font-black text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                  {product.discount}% OFF
                </span>
              </div>
              <p className="text-sm text-emerald-700 font-bold">
                💰 You Save ₹{savings.toLocaleString()}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Quantity:</p>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-14 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Total: <span className="font-bold text-gray-900">₹{(product.price * quantity).toLocaleString()}</span>
                </span>
              </div>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="bg-white border-2 border-violet-600 text-violet-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-violet-50 active:scale-95 transition-all"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-lg"
              >
                <Zap size={18} />
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="bg-gray-50 p-3 rounded-xl text-center">
                <Truck className="mx-auto text-emerald-600 mb-1" size={20} />
                <p className="text-xs font-bold text-gray-700">Free Delivery</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl text-center">
                <RotateCcw className="mx-auto text-pink-600 mb-1" size={20} />
                <p className="text-xs font-bold text-gray-700">Easy Returns</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl text-center">
                <Shield className="mx-auto text-violet-600 mb-1" size={20} />
                <p className="text-xs font-bold text-gray-700">Secure</p>
              </div>
            </div>

            <div className="border-b border-gray-200 mb-4">
              <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                {(['description', 'reviews', 'shipping'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap capitalize ${
                      activeTab === tab
                        ? 'border-violet-600 text-violet-600'
                        : 'border-transparent text-gray-500'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm text-gray-700 leading-relaxed">
              {activeTab === 'description' && (
                <div className="space-y-3">
                  <p>Experience premium quality with our {product.name}. Made from the finest materials.</p>
                  <ul className="space-y-2 mt-3">
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Premium quality materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Apnikart Assured</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                      <span>5</span>
                      <Star size={10} fill="white" />
                    </div>
                    <span className="font-semibold">Excellent product!</span>
                  </div>
                  <p>Loved the quality and quick delivery!</p>
                </div>
              )}
              
              {activeTab === 'shipping' && (
                <div className="space-y-3">
                  <p><strong>🚚 Free Delivery:</strong> 3-5 days for orders above ₹199</p>
                  <p><strong>🔄 7-Day Returns:</strong> No questions asked</p>
                  <p><strong>🛡️ Secure Payment:</strong> UPI, Cards, COD</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 grid grid-cols-2 gap-2 md:hidden shadow-2xl z-10">
          <button
            onClick={handleAddToCart}
            className="bg-white border-2 border-violet-600 text-violet-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all text-sm"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all text-sm shadow-lg"
          >
            <Zap size={16} />
            Buy Now
          </button>
        </div>
      </div>

      {zoomImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setZoomImage(false)}
        >
          <button
            onClick={() => setZoomImage(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-10"
          >
            <X size={24} className="text-gray-900" />
          </button>
          <img
            src={productImages[selectedImage]}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
}
