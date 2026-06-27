import { Smartphone, Star } from "lucide-react";

export default function AppDownload() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Mockup */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-80 md:w-56 md:h-96 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-[2rem] p-2 shadow-2xl shadow-violet-500/20">
              <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden flex flex-col items-center justify-center">
                <Smartphone className="text-violet-500 mb-3" size={48} />
                <p className="text-lg font-extrabold">
                  <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">Shop</span>
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Nova</span>
                  <span className="text-amber-500 text-xs"> ✦</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  Discover · Shop · Shine
                </p>
                <div className="flex items-center gap-0.5 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill="#f59e0b"
                      className="text-amber-500"
                    />
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  4.8 Rating · 10M+ Downloads
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-white text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
              Download the ShopNova App
            </h2>
            <p className="text-gray-400 md:text-lg mb-6 max-w-lg">
              Get exclusive deals, faster checkout, and real-time order tracking.
              Shop on-the-go with India's trendiest shopping app.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start mb-6">
              <button className="flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                  <path d="M17.523 2.4l-5.478 5.559L6.589 2.4C5.6 1.4 3.85 1.788 3.327 3.117L1.262 8.797l-.027.071c-.516 1.332.078 2.832 1.352 3.395l11.42 5.04 11.42-5.04c1.274-.563 1.868-2.063 1.352-3.395l-.027-.071L24.717 3.117C24.194 1.788 22.444 1.4 21.455 2.4l-5.456 5.559L17.523 2.4z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500">Get it on</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500">Download on the</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-6 justify-center md:justify-start text-gray-400 text-sm">
              <div>
                <p className="text-white text-xl font-bold">10M+</p>
                <p>Downloads</p>
              </div>
              <div className="w-px h-10 bg-gray-700" />
              <div>
                <p className="text-white text-xl font-bold">4.8 ★</p>
                <p>Rating</p>
              </div>
              <div className="w-px h-10 bg-gray-700" />
              <div>
                <p className="text-white text-xl font-bold">190M+</p>
                <p>Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
