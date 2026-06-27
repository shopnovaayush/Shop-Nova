import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bannerSlides } from "../data/products";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((c) => (c === 0 ? bannerSlides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c + 1) % bannerSlides.length);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {bannerSlides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full relative"
          >
            <div
              className={`bg-gradient-to-r ${slide.bgGradient} relative overflow-hidden`}
            >
              <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row items-center gap-6 md:gap-12">
                <div className="flex-1 text-white z-10 text-center md:text-left">
                  <p className="text-sm md:text-base font-medium uppercase tracking-wider mb-2 opacity-90">
                    Limited Time Offer
                  </p>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl opacity-90 mb-6">
                    {slide.subtitle}
                  </p>
                  <button className="px-8 py-3 bg-white text-violet-600 rounded-full font-bold text-sm md:text-base hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                    {slide.cta} →
                  </button>
                </div>
                <div className="flex-1 max-w-md">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-48 md:h-72 object-cover rounded-2xl shadow-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
      >
        <ChevronLeft size={20} className="text-gray-700" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
      >
        <ChevronRight size={20} className="text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current
                ? "bg-white scale-110 shadow-md"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
