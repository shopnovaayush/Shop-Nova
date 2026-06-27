import { useState, useEffect } from 'react';
import { X, Gift, Copy, Check, Sparkles } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

export default function PromotionalPopup() {
  const { popup } = useAdminStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if user previously disabled popup
    const popupDisabled = localStorage.getItem('apnikart_popup_disabled');
    if (popupDisabled === 'true') {
      setIsClosed(true);
      return;
    }

    if (popup.enabled && popup.showOnLoad && !isClosed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, popup.delaySeconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [popup, isClosed]);

  // Auto-hide after 30 seconds
  useEffect(() => {
    if (isVisible) {
      const autoHideTimer = setTimeout(() => {
        handleClose();
      }, 30000);
      return () => clearTimeout(autoHideTimer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
    
    if (dontShowAgain) {
      localStorage.setItem('apnikart_popup_disabled', 'true');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('APNI15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!popup.enabled || isClosed || !isVisible) return null;

  return (
    <>
      {/* Light Backdrop - User can see background */}
      <div 
        className="fixed inset-0 bg-black/40 z-[95] animate-fade-in"
        onClick={handleClose}
      />

      {/* Popup Container - Bottom on Mobile, Center on Desktop */}
      <div className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-[96] pointer-events-none p-3 md:p-4">
        <div 
          className="bg-white rounded-t-3xl md:rounded-3xl max-w-lg w-full mx-auto shadow-2xl overflow-hidden pointer-events-auto animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Header with Gradient */}
          <div className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500 p-6 text-white text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Gift Icon */}
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
                <Gift size={32} className="text-white" />
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-black mb-2 flex items-center justify-center gap-2">
                <Sparkles size={20} className="text-yellow-300" />
                Welcome to Apnikart!
                <Sparkles size={20} className="text-yellow-300" />
              </h2>

              {/* Subtitle */}
              <p className="text-sm md:text-base text-white/95 font-medium">
                Get exclusive 15% OFF on your first order
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 md:p-6">
            {/* Discount Display */}
            <div className="bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-dashed border-violet-300 rounded-2xl p-4 mb-4 text-center">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">
                Your Special Code
              </p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent tracking-wider">
                  APNI15
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all active:scale-95 shadow-md"
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-600">
                💝 Min. order ₹499 | Valid for new users only
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-emerald-500 text-lg">✓</span>
                <span><strong>Free Delivery</strong> on orders above ₹199</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-emerald-500 text-lg">✓</span>
                <span><strong>Easy Returns</strong> within 7 days</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-emerald-500 text-lg">✓</span>
                <span><strong>COD Available</strong> on all orders</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleClose}
              className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white font-bold text-base rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Start Shopping Now
              <span>→</span>
            </button>

            {/* Skip Option */}
            <button
              onClick={handleClose}
              className="w-full text-center text-sm text-gray-500 mt-3 hover:text-gray-700 transition-colors font-medium"
            >
              Maybe Later
            </button>

            {/* Don't Show Again */}
            <label className="flex items-center justify-center gap-2 mt-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 accent-violet-600 cursor-pointer"
              />
              <span className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors">
                Don't show this again
              </span>
            </label>

            {/* Footer */}
            <p className="text-[10px] text-center text-gray-400 mt-3">
              ✨ Limited time offer | T&C apply
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
