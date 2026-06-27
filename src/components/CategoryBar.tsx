import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { categories } from "../data/products";

export default function CategoryBar({
  onCategoryClick,
}: {
  onCategoryClick: (cat: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Category colors mapping
  const getCategoryGradient = (index: number) => {
    const gradients = [
      "from-pink-500 to-rose-500",
      "from-purple-500 to-indigo-500",
      "from-blue-500 to-cyan-500",
      "from-emerald-500 to-teal-500",
      "from-amber-500 to-orange-500",
      "from-red-500 to-pink-500",
      "from-violet-500 to-purple-500",
      "from-fuchsia-500 to-pink-500",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-8 md:py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Shop by Category
              </h2>
              <span className="bg-gradient-to-r from-violet-600 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                NEW
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
              <TrendingUp size={12} className="text-violet-500" />
              Explore trending categories on Apnikart
            </p>
          </div>

          {/* Desktop Scroll Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll Left"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-violet-50 hover:border-violet-300 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
            >
              <ChevronLeft size={18} className="text-gray-700" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll Right"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-violet-50 hover:border-violet-300 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
            >
              <ChevronRight size={18} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Categories Grid - Desktop View */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.name)}
              onMouseEnter={() => setHoveredCategory(cat.name)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="group flex flex-col items-center gap-2.5 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Category Image Circle with Gradient Border */}
              <div className="relative">
                {/* Gradient border ring */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getCategoryGradient(index)} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}></div>
                
                {/* Main image container */}
                <div className={`relative w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 ${
                  hoveredCategory === cat.name 
                    ? 'border-transparent shadow-xl' 
                    : 'border-gray-100 shadow-md'
                } transition-all duration-300 bg-white`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(index)} opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10`}></div>
                  
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Hot badge for first 2 categories */}
                {index < 2 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg animate-pulse">
                    HOT
                  </span>
                )}
              </div>

              {/* Category Name */}
              <div className="text-center">
                <span className={`text-xs lg:text-sm font-semibold transition-colors duration-300 ${
                  hoveredCategory === cat.name 
                    ? 'text-violet-600' 
                    : 'text-gray-700'
                }`}>
                  {cat.name}
                </span>
                {/* Animated underline */}
                <div className={`h-0.5 bg-gradient-to-r ${getCategoryGradient(index)} mt-1 transition-all duration-300 ${
                  hoveredCategory === cat.name ? 'w-full' : 'w-0'
                } mx-auto`}></div>
              </div>
            </button>
          ))}
        </div>

        {/* Categories Scroll - Mobile View */}
        <div 
          ref={scrollRef}
          className="md:hidden flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.name)}
              className="group flex-shrink-0 flex flex-col items-center gap-2 w-20"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Mobile Image */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 shadow-md bg-white">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Hot badge */}
                {index < 2 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[7px] font-bold px-1 py-0.5 rounded-full shadow-md animate-pulse">
                    HOT
                  </span>
                )}
              </div>

              {/* Mobile Category Name */}
              <span className="text-[10px] text-gray-700 font-semibold text-center leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* Feature Highlights Below Categories */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-lg">⚡</span>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Lightning Deals</p>
                <p className="text-[10px] text-gray-500">Save up to 80%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-lg">🎁</span>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">New Arrivals</p>
                <p className="text-[10px] text-gray-500">Fresh styles daily</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-lg">🔥</span>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Best Sellers</p>
                <p className="text-[10px] text-gray-500">Top rated products</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-lg">💎</span>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Premium</p>
                <p className="text-[10px] text-gray-500">Luxury collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
