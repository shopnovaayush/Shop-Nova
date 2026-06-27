import { Truck, Shield, RefreshCw, CreditCard } from "lucide-react";

const features = [
  {
    icon: <Truck size={28} className="text-violet-600" />,
    title: "Free Delivery",
    desc: "On orders above ₹199",
  },
  {
    icon: <Shield size={28} className="text-violet-600" />,
    title: "100% Secure",
    desc: "Safe payment options",
  },
  {
    icon: <RefreshCw size={28} className="text-violet-600" />,
    title: "Easy Returns",
    desc: "7-day return policy",
  },
  {
    icon: <CreditCard size={28} className="text-violet-600" />,
    title: "COD Available",
    desc: "Cash on delivery",
  },
];

export default function FeaturesBanner() {
  return (
    <section className="bg-gradient-to-r from-violet-50 via-fuchsia-50 to-amber-50 py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-colors"
            >
              <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center">
                {feat.icon}
              </div>
              <h3 className="text-sm font-bold text-gray-800">{feat.title}</h3>
              <p className="text-xs text-gray-500">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
