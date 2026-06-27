import { Zap, Clock, TrendingUp, Gift } from "lucide-react";

const deals = [
  {
    icon: <Zap className="text-yellow-500" size={24} />,
    title: "Flash Sale",
    subtitle: "Up to 90% Off",
    bg: "bg-gradient-to-br from-yellow-50 to-orange-50",
    border: "border-yellow-200",
  },
  {
    icon: <Clock className="text-blue-500" size={24} />,
    title: "Deal of the Day",
    subtitle: "Ends in 05:32:10",
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    border: "border-blue-200",
  },
  {
    icon: <TrendingUp className="text-green-500" size={24} />,
    title: "Trending Now",
    subtitle: "Most Popular Items",
    bg: "bg-gradient-to-br from-green-50 to-emerald-50",
    border: "border-green-200",
  },
  {
    icon: <Gift className="text-fuchsia-500" size={24} />,
    title: "New Arrivals",
    subtitle: "Just Launched Today",
    bg: "bg-gradient-to-br from-fuchsia-50 to-violet-50",
    border: "border-fuchsia-200",
  },
];

export default function DealsStrip() {
  return (
    <section className="py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {deals.map((deal, i) => (
            <button
              key={i}
              className={`${deal.bg} ${deal.border} border rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]`}
            >
              <div className="flex-shrink-0">{deal.icon}</div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-800">{deal.title}</p>
                <p className="text-xs text-gray-500">{deal.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
