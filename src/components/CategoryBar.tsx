import { categories } from "../data/products";

export default function CategoryBar({
  onCategoryClick,
}: {
  onCategoryClick: (cat: string) => void;
}) {
  return (
    <section className="bg-white py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-5">
          Shop by Category
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.name)}
              className="group flex flex-col items-center gap-2 transition-transform hover:scale-105"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-violet-400 transition-colors shadow-sm group-hover:shadow-md">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-xs md:text-sm text-gray-700 font-medium text-center leading-tight group-hover:text-violet-600 transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
