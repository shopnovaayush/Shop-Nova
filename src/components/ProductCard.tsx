import { Heart, Star, ShoppingCart, Zap, Eye, TrendingUp, Award } from "lucide-react";
import { Product } from "../data/products";
import { useState } from "react";

export default function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  // Format reviews count (1234 -> 1.2k)
  const formatReviews = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  // Calculate savings
  const savings = product.originalPrice - product.price;

  // Random stock for urgency (you can replace with actual stock from product)
  const stockLeft = Math.floor(Math.random() * 10) + 1;
  const showLowStock = stockLeft <= 5;

  // Badge logic based on product properties
  const getBadge = () => {
    if (product.rating >= 4.5) return { text: "BESTSELLER", color: "from-amber-500 to-orange-500", icon: <Award size={10} /> };
    if (product.discount >= 70) return { text: "MEGA DEAL", color: "from-red-500 to-pink-500", icon: <Zap size={10} /> };
    if (product.reviews >= 5000) return { text: "TRENDING", color: "from-violet-600 to-purple-600", icon: <TrendingUp size={10} /> };
    return null;
  };

  const badge = getBadge();

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-violet-200 transition-all duration-500 hover:-translate-y-2 relative cursor-pointer">
      
      {/* Top Badges Container */}
      <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1.5">
        {/* Discount Badge */}
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-[10px] md:text-xs font-black px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1">
          <Zap size={10} className="text-yellow-300" />
          {product.discount}% OFF
        </div>

        {/* Special Badge */}
        {badge && (
          <div className={`bg-gradient-to-r ${badge.color} text-white text-[9px] font-bold px-2 py-0.5 rounded-md shadow-md flex items-center gap-1 animate-pulse`}>
            {badge.icon}
            {badge.text}
          </div>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLiked(!liked);
        }}
        className="absolute top-2.5 right-2.5 z-20 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-xl transition-all hover:scale-110 group/wish"
        aria-label="Add to Wishlist"
      >
        <Heart
          size={17}
          className={`transition-all duration-300 ${
            liked 
              ? "fill-pink-500 text-pink-500 scale-110" 
              : "text-gray-400 group-hover/wish:text-pink-400"
          }`}
        />
      </button>

      {/* Image Container */}
      <div 
        className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100"
        onMouseEnter={() => setShowQuickView(true)}
        onMouseLeave={() => setShowQuickView(false)}
      >
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}
        
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Hover Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick View Button (on hover) */}
        <button
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl transition-all duration-300 ${
            showQuickView 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-75"
          }`}
        >
          <Eye size={14} />
          Quick View
        </button>

        {/* Stock Alert */}
        {showLowStock && (
          <div className="absolute bottom-16 left-2.5 right-2.5 bg-red-500/95 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md text-center shadow-lg animate-pulse">
            🔥 Only {stockLeft} left!
          </div>
        )}

        {/* Add to Cart Button (Slides up on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white font-bold py-2.5 rounded-xl text-sm shadow-2xl transition-all hover:scale-[1.02]"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-3.5">
        {/* Category Tag */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-violet-600 font-semibold uppercase tracking-wider bg-violet-50 px-2 py-0.5 rounded-md">
            {product.category}
          </span>
          {product.rating >= 4.0 && (
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
              ✓ Verified
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-2 min-h-[2.5rem] group-hover:text-violet-700 transition-colors">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-2 flex-wrap">
          <span className="text-xl font-black text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
            Save ₹{savings.toLocaleString()}
          </span>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            {/* Rating Box */}
            <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
              <span>{product.rating.toFixed(1)}</span>
              <Star size={10} fill="white" className="text-white" />
            </div>
            
            {/* Reviews Count */}
            <span className="text-xs text-gray-500 font-medium">
              ({formatReviews(product.reviews)})
            </span>
          </div>
        </div>

        {/* Delivery & Features Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.freeDelivery && (
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Free Delivery
            </span>
          )}
          <span className="text-[10px] text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
            COD ✓
          </span>
          {product.discount >= 50 && (
            <span className="text-[10px] text-amber-700 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              ⚡ Deal
            </span>
          )}
        </div>

        {/* Quick Add Button (Mobile - Always Visible) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="md:hidden mt-3 w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-md"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>

      {/* Bottom Trust Bar */}
      <div className="bg-gradient-to-r from-violet-50 to-pink-50 px-3 py-1.5 border-t border-gray-100">
        <p className="text-[9px] text-gray-600 text-center font-medium flex items-center justify-center gap-1">
          🛡️ <span className="text-violet-700 font-bold">Apnikart Assured</span> Quality
        </p>
      </div>
    </div>
  );
}
