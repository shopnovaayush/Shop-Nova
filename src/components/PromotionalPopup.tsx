import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

export default function PromotionalPopup() {
  const { popup } = useAdminStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (popup.enabled && popup.showOnLoad && !isClosed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, popup.delaySeconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [popup, isClosed]);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
  };

  if (!popup.enabled || isClosed || !isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[95] flex items-center justify-center p-4 animate-fade-in">
      <div className="relative max-w-lg w-full">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white text-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Popup Content */}
        <div className={`bg-gradient-to-br ${popup.backgroundColor} rounded-3xl p-8 text-center shadow-2xl`}>
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full" />
          <div className="absolute bottom-4 right-4 w-20 h-20 bg-white/10 rounded-full" />
          <div className="absolute top-1/2 left-2 w-8 h-8 bg-white/10 rounded-full" />
          <div className="absolute top-10 right-8 w-12 h-12 bg-white/10 rounded-full" />

          <div className="relative z-10">
            {/* Icon */}
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎉</span>
            </div>

            {/* Title */}
            <h2 
              className="text-2xl md:text-3xl font-extrabold mb-3"
              style={{ color: popup.textColor }}
            >
              {popup.title}
            </h2>

            {/* Message */}
            <p 
              className="text-base md:text-lg mb-6 opacity-90"
              style={{ color: popup.textColor }}
            >
              {popup.message}
            </p>

            {/* CTA Button */}
            {popup.buttonText && (
              <a
                href={popup.buttonLink || '#'}
                onClick={(e) => {
                  if (!popup.buttonLink) e.preventDefault();
                  handleClose();
                }}
                className="inline-block px-8 py-3.5 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
              >
                {popup.buttonText} →
              </a>
            )}

            {/* Additional info */}
            <p 
              className="text-xs mt-4 opacity-70"
              style={{ color: popup.textColor }}
            >
              ✨ Limited time offer | T&C apply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
