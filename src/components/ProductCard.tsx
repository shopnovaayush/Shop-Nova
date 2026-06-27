import { Heart, Star, ShoppingCart } from "lucide-react";
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
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
    >
      <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-xs font-bold px-2 py-1 rounded">
        {product.discount}% OFF
      </div>

      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
      >
        <Heart
          size={16}
          className={liked ? "fill-pink-500 text-pink-500" : "text-gray-400"}
        />
      </button>

      <div className="relative aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-3">
        <p className="text-xs text-violet-600 font-semibold uppercase mb-1">
          {product.category}
        </p>

        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{product.originalPrice}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
            <span>{product.rating}</span>
            <Star size={10} fill="white" />
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviews} reviews)
          </span>
        </div>

        {product.freeDelivery && (
          <p className="text-xs text-green-600 font-medium mb-2">
            Free Delivery
          </p>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold py-2 rounded-lg text-sm flex items-center justify-center gap-2"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
