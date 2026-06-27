import ProductCard from "./ProductCard";
import { Product } from "../data/products";

export default function ProductGrid({
  products,
  title,
  onAddToCart,
  onProductClick,
}: {
  products: Product[];
  title: string;
  onAddToCart: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}) {
  if (products.length === 0) {
    return (
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-6">
            {title}
          </h2>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try searching for something else or browse our categories
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            {title}
          </h2>
          <button className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick && onProductClick(product)}
              className="cursor-pointer"
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
