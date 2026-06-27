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
    badge: "🔥 HOT DEAL",
    badgeColor: "bg-yellow-400 text-gray-900",
    icon: <Zap className="text-yellow-300" size={20} />,
    image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    
