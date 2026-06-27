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

  const formatReviews = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const savings = product.originalPrice - product.price;
  const stockLeft = Math.floor(Math.random() * 10) + 1;
  const showLowStock = stockLeft <= 5;

  const getBadge = () => {
    if (product.rating >= 4.5) return { text: "BESTSELLER", color: "from-amber-500 to-orange-500", icon: <Award size={10} /> };
    if (product.discount >= 70) return { text: "MEGA DEAL", color: "from-red-500 to-pink-500", icon: <Zap size={10} /> };
    if (product.reviews >= 5000) return { text: "TRENDING", color: "from-violet-600 to-purple-600", icon: <TrendingUp size={10} /> };
    return null;
  };

  const badge = getBadge();

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1 relative">
      
      {/* Top Badges Container */}
      <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1.5 pointer-events-none">
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-[10px] md:text-xs font-black px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1">
          <Zap size={10} className="text-yellow-300" />
          {product.discount}% OFF
        </div>

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
        className="absolute top-2.5 right-2.5 z-20 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-xl transition-all hover:scale-110"
        aria-label="Add to Wishlist"
      >
        <Heart
          size={17}
          className={`transition-all duration-300 ${
            liked 
              ? "fill-pink-500 text-pink-500 scale-110" 
              : "text-gray-400"
          }`}
        />
      </button>

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* View Details Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
            <Eye size={14} />
            View Details
          </div>
        </div>

        {/* Stock Alert */}
        {showLowStock && (
          <div className="absolute bottom-2 left-2 right-2 bg-red-500/95 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md text-center shadow-lg animate-pulse z-10">
            🔥 Only {stockLeft} left!
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-3">
        {/* Category Tag */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-violet-600 font-semibold uppercase tracking-wider bg-violet-50 px-2 py-0.5 rounded-md">
            {product.category}
          </span>
          {product.rating >= 4.0 && (
            <span className="text-[9px] text-emerald-600 font-bold">
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
        </div>

        {/* Savings Badge */}
        <p className="text-xs font-bold text-emerald-600 bg-emerald-50 inline-block px-2 py-0.5 rounded mb-2">
          Save ₹{savings.toLocaleString()}
        </p>

        {/* Rating & Reviews */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
              <span>{product.rating.toFixed(1)}</span>
              <Star size={10} fill="white" className="text-white" />
            </div>
            <span className="text-xs text-gray-500 font-medium">
              ({formatReviews(product.reviews)})
            </span>
          </div>
        </div>

        {/* Delivery & Features Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {product.freeDelivery && (
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Free Delivery
            </span>
          )}
          <span className="text-[10px] text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
            COD ✓
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-md hover:shadow-lg"
        >
          
