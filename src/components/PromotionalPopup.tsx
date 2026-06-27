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
    <div 
      className="fixed inset-0 bg-black/60 z-[95] flex items-center justify-center p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 w-10 h-10 bg-white text-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className={`bg-gradient-to-br ${popup.backgroundColor} rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden`}>
          <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full" />
          <div className="absolute bottom-4 right-4 w-20 h-20 bg-white/10 rounded-full" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">🎉</span>
            </div>

            <h2 
              className="text-2xl font-extrabold mb-2"
              style={{ color: popup.textColor }}
            >
              {popup.title}
            </h2>

            <p 
              className="text-sm md:text-base mb-5 opacity-90"
              style={{ color: popup.textColor }}
            >
              {popup.message}
            </p>

            {popup.buttonText && (
              <a
                href={popup.buttonLink || '#'}
                onClick={(e) => {
                  if (!popup.buttonLink) e.preventDefault();
                  handleClose();
                }}
                className="inline-block px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
              >
                {popup.buttonText} →
              </a>
            )}

            <p 
              className="text-xs mt-3 opacity-70"
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
