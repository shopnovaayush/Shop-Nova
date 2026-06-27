import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Tag, Zap } from "lucide-react";

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  bgGradient: string;
  textColor: string;
  badge?: string;
  badgeColor?: string;
  icon?: React.ReactNode;
  image?: string;
}

const banners: BannerSlide[] = [
  {
    id: 1,
    title: "Mega Sale Live Now",
    subtitle: "Up to 80% OFF",
    description: "Shop the latest trends in fashion, electronics & more. Limited time offer!",
    cta: "Shop Now",
    bgGradient: "from-violet-600 via-fuchsia-600 to-pink-500",
    textColor: "text-white",
    badge: "HOT DEAL",
    badgeColor: "bg-yellow-400 text-gray-900",
    icon: <Zap className="text-yellow-300" size={20} />,
    image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "Prices That Shine",
    subtitle: "Starting at Rs 99",
    description: "Free Delivery on First Order. Discover amazing products at unbeatable prices!",
    cta: "Explore Deals",
    bgGradient: "from-amber-500 via-orange-500 to-red-500",
    textColor: "text-white",
    badge: "NEW ARRIVAL",
    badgeColor: "bg-white text-orange-600",
    icon: <Sparkles className="text-yellow-200" size={20} />,
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "Fashion Fiesta",
    subtitle: "Min. 70% OFF",
    description: "Trendy outfits for every occasion. Be the style icon you have always wanted to be!",
    cta: "Shop Fashion",
    bgGradient: "from-pink-500 via-rose-500 to-red-500",
    textColor: "text-white",
    badge: "TRENDING",
    badgeColor: "bg-white text-pink-600",
    icon: <Tag className="text-white" size={20} />,
    image: "https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function HeroBanner({ onCtaClick }: { onCtaClick?: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const banner = banners[currentSlide];

  return (
    <section className="relative w-full overflow-hidden">
      <div className={`relative bg-gradient-to-r ${banner.bgGradient} transition-all duration-700 ease-in-out`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[400px] lg:min-h-[450px] gap-8 py-10 lg:py-16">
            
            <div className={`flex-1 ${banner.textColor} z-10 text-center lg:text-left max-w-xl`}>
              {banner.badge && (
                <div className="flex justify-center lg:justify-start mb-4">
                  <span className={`${banner.badgeColor} px-4 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-lg animate-pulse`}>
                    {banner.icon}
                    {banner.badge}
                  </span>
                </div>
              )}

              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold mb-3 tracking-tight leading-tight">
                {banner.title}
              </h2>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-4 tracking-tighter drop-shadow-lg">
                {banner.subtitle}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg mb-6 opacity-95 leading-relaxed max-w-md mx-auto lg:mx-0">
                {banner.description}
              </p>

              <button
                onClick={onCtaClick}
                className="group inline-flex items-center gap-2 bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300"
              >
                {banner.cta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-4 mt-6 justify-center lg:justify-start text-xs sm:text-sm opacity-90">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
                  <span>COD Available</span>
                </div>
              </div>
            </div>

            <div className="flex-1 relative z-10 max-w-md w-full">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-300/30 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
                
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-3 shadow-2xl border border-white/20">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-64 lg:h-80 object-cover rounded-2xl"
                  />
                </div>

                <div className="absolute -top-3 -right-3 bg-yellow-400 text-gray-900 w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-2xl rotate-12 hover:rotate-0 transition-transform">
                  <span className="text-xs font-bold">UPTO</span>
                  <span className="text-2xl font-black leading-none">80%</span>
                  <span className="text-xs font-bold">OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all hover:scale-110 z-20 border border-white/30"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all hover:scale-110 z-20 border border-white/30"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-8 h-2.5 bg-white shadow-lg"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-4 lg:gap-8 overflow-x-auto">
            <div className="flex items-center gap-2 text-xs lg:text-sm whitespace-nowrap">
              <span className="text-yellow-400">⚡</span>
              <span className="font-medium">Lightning Deals - Save Big!</span>
            </div>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-2 text-xs lg:text-sm whitespace-nowrap">
              <span className="text-green-400">🚚</span>
              <span className="font-medium">Free Delivery Above Rs 199</span>
            </div>
            <span className="text-gray-600 hidden md:inline">|</span>
            <div className="hidden md:flex items-center gap-2 text-xs lg:text-sm whitespace-nowrap">
              <span className="text-pink-400">💝</span>
              <span className="font-medium">New User? Get 10% OFF</span>
            </div>
            <span className="text-gray-600 hidden lg:inline">|</span>
            <div className="hidden lg:flex items-center gap-2 text-xs lg:text-sm whitespace-nowrap">
              <span className="text-blue-400">💳</span>
              <span className="font-medium">Cashback on UPI Payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
