import { Heart, Star, ShoppingCart, Zap, Award } from "lucide-react";
import { Product } from "../data/products";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onProductClick?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onProductClick,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatReviews = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const savings = product.originalPrice - product.price;

  const getBadge = () => {
    if (product.rating >= 4.5) return { text: "BESTSELLER", color: "from-amber-500 to-orange-500", icon: <Award size={10} /> };
    if (product.discount >= 70) return { text: "MEGA DEAL", color: "from-red-500 to-pink-500", icon: <Zap size={10} /> };
    return null;
  };

  const badge = getBadge();

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-violet-200 transition-all duration-500 hover:-translate-y-2 relative cursor-pointer"
    >
      <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1.5">
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1">
          <Zap size={10} className="text-yellow-300" />
          {product.discount}% OFF
        </div>
        {badge && (
          <div className={`bg-gradient-to-r ${badge.color} text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-md flex items-center gap-1`}>
            {badge.icon}
            {badge.text}
          </div>
        )}
      </div>

      <button
        onClick={handleWishlist}
        className="absolute top-2.5 right-2.5 z-20 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-xl transition-all hover:scale-110"
        aria-label="Add to Wishlist"
      >
        <Heart
          size={17}
          className={liked ? "fill-pink-500 text-pink-500 scale-110" : "text-gray-400"}
        />
      </button>

      <div className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="p-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-violet-600 font-semibold uppercase tracking-wider bg-violet-50 px-2 py-0.5 rounded-md">
            {product.category}
          </span>
          {product.rating >= 4.0 && (
            <span className="text-xs text-emerald-600 font-bold">
              Verified
            </span>
          )}
        </div>

        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-2 min-h-[2.5rem] group-hover:text-violet-700 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-2 flex-wrap">
          <span className="text-xl font-black text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>

        <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mb-2">
          Save ₹{savings.toLocaleString()}
        </div>

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

        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {product.freeDelivery && (
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              Free Delivery
            </span>
          )}
          <span className="text-xs text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
            COD
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>

      <div className="bg-gradient-to-r from-violet-50 to-pink-50 px-3 py-1.5 border-t border-gray-100">
        <p className="text-xs text-gray-600 text-center font-medium">
          🛡️ <span className="text-violet-700 font-bold">Apnikart Assured</span>
        </p>
      </div>
    </div>
  );
}
