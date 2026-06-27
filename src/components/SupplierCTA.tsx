import { Store, TrendingUp, Users, ArrowRight } from "lucide-react";

export default function SupplierCTA() {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
          </div>

          <div className="relative p-6 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-white text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
                Become a Supplier
              </h2>
              <p className="text-white/80 md:text-lg mb-6 max-w-lg">
                Sell to crores of customers on ShopNova with 0% commission.
                Start your online business with zero investment and reach
                millions of buyers across India.
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-purple-700 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform">
                Start Selling
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-4 max-w-md w-full">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center text-white border border-white/20">
                <Store className="mx-auto mb-2" size={28} />
                <p className="text-2xl font-bold">15L+</p>
                <p className="text-xs opacity-80">Suppliers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center text-white border border-white/20">
                <Users className="mx-auto mb-2" size={28} />
                <p className="text-2xl font-bold">190M+</p>
                <p className="text-xs opacity-80">Customers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center text-white border border-white/20">
                <TrendingUp className="mx-auto mb-2" size={28} />
                <p className="text-2xl font-bold">0%</p>
                <p className="text-xs opacity-80">Commission</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
