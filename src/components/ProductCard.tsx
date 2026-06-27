import { Heart, Star, ShoppingCart } from "lucide-react";
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

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
      {/* Discount badge */}
      <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-md">
        {product.discount}% OFF
      </div>

      {/* Wishlist button */}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all"
      >
        <Heart
          size={16}
          className={`transition-colors ${
            liked ? "fill-fuchsia-500 text-fuchsia-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full flex items-center justify-center gap-2 bg-white text-violet-600 font-semibold py-2 rounded-lg text-sm hover:bg-violet-50 transition-colors"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-gray-500 mb-1 truncate">{product.category}</p>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{product.originalPrice}
          </span>
          <span className="text-xs font-semibold text-green-600">
            {product.discount}% off
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            <span>{product.rating}</span>
            <Star size={10} fill="white" />
          </div>
          <span className="text-xs text-gray-400">
            ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Free delivery */}
        {product.freeDelivery && (
          <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full" />
            Free Delivery
          </p>
        )}
      </div>
    </div>
  );
}
