import { useState, useEffect } from "react";
import { X, Heart, Star, ShoppingCart, Zap, Shield, Truck, RotateCcw, ArrowLeft } from "lucide-react";
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

  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
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

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-white min-h-screen">
        
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-3 py-3 flex items-center justify-between shadow-sm">
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <h2 className="font-bold text-base text-gray-900 flex-1 text-center">
            Product Details
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <X size={22} className="text-gray-700" />
          </button>
        </div>

        {/* Content - Single Column on Mobile, 2 columns on Desktop */}
        <div className="md:grid md:grid-cols-2 md:gap-6 md:p-6">
          
          {/* Image Section */}
          <div className="p-4 md:p-0">
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
                <Zap size={12} />
                {product.discount}% OFF
              </div>
              <button
                onClick={() => setLiked(!liked)}
                className="absolute top-3 right-3 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-md"
              >
                <Heart
                  size={20}
                  className={liked ? "fill-pink-500 text-pink-500" : "text-gray-400"}
                />
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 md:p-0">
            
            {/* Category */}
            <span className="inline-block text-xs text-violet-600 font-bold uppercase tracking-wider bg-violet-50 px-3 py-1 rounded-full mb-3">
              {product.category}
            </span>

            {/* Product Name */}
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-2.5 py-1 rounded-lg">
                <span className="font-bold text-sm">{product.rating.toFixed(1)}</span>
                <Star size={14} fill="white" className="text-white" />
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-violet-50 to-pink-50 p-4 rounded-2xl mb-4 border border-violet-100">
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <span className="text-3xl font-black text-gray-900">
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

            {/* Quantity */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Quantity:</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Total: <span className="font-bold text-gray-900">₹{(product.price * quantity).toLocaleString()}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={handleAddToCart}
                className="bg-white border-2 border-violet-600 text-violet-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <Zap size={18} />
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 mb-4">
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

            {/* Description */}
            <div className="bg-gray-50 p-4 rounded-xl mb-4">
              <h3 className="font-bold text-gray-900 mb-2">About this product</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Experience premium quality with our {product.name}. Made from the finest materials, this product offers exceptional value for money. Perfect for everyday use with a stylish design.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>Premium quality materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>Trending design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>Apnikart Assured</span>
                </li>
              </ul>
            </div>

            {/* Delivery Info */}
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl mb-4">
              <div className="flex items-start gap-2">
                <Truck className="text-emerald-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-bold text-emerald-900">Free Delivery by Tomorrow</p>
                  <p className="text-xs text-emerald-700">Order in next 2 hours 30 minutes</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
