// components/landing/PremiumPopup.js
import React, { useState, useEffect, useRef } from 'react';
import { Star, Crown, Zap, Bot, Lock, Sparkles, Check, Plus } from 'lucide-react';

const FEATURES = [
  { icon: Star, text: "Unlimited AI Generations", new: true },
  { icon: Bot, text: "Custom AI Personalities" },
  { icon: Plus, text: "Higher Limits" }, 
  { icon: Crown, text: "Priority Support Access" },
  { icon: Lock, text: "Advanced Security Features" },
  { icon: Sparkles, text: "Early Access Features" }
];

const PremiumPopup = ({ onClose, triggerRef }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        onClose?.();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    const interval = setInterval(() => {
      setActiveFeature(prev => {
        if (prev === null || prev >= FEATURES.length - 1) return 0;
        return prev + 1;
      });
    }, 3000);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      clearInterval(interval);
    };
  }, [onClose, triggerRef]);

  return (
    <div className="premium-popup-wrapper">
      <div className="premium-popup" ref={popupRef}>
        <div className="premium-popup-header">
          <div className="premium-popup-title">
            <Crown size={24} />
            Premium Perks
          </div>
          <div className="premium-popup-subtitle">
            Unlock the full potential of BoltBot⚡
          </div>
        </div>

        <div className="premium-popup-content">
          {FEATURES.map((Feature, index) => (
            <div 
              key={index}
              className="premium-feature"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                borderColor: activeFeature === index ? 'rgba(255, 204, 0, 0.3)' : undefined,
                background: activeFeature === index ? 'rgba(255, 204, 0, 0.05)' : undefined
              }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <Check size={16} className="check-icon" />
              <Feature.icon size={16} className="feature-icon" />
              <span>{Feature.text}</span>
              {Feature.new && (
                <span className="feature-badge">NEW</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumPopup;
