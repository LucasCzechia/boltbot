// components/landing/PremiumPopup.js
import React, { useState, useEffect } from 'react';
import { Star, Crown, Zap, Bot, Lock, Sparkles, Check, Plus } from 'lucide-react';

const FEATURES = [
  { icon: Star, text: "Unlimited AI Generations", new: true },
  { icon: Crown, text: "Priority Support Access" },
  { icon: Bot, text: "Custom AI Personalities" },
  { icon: Lock, text: "Advanced Security Features" },
  { icon: Sparkles, text: "Early Access Features" },
  { icon: Plus, text: "Extended Message History" }
];

const PremiumPopup = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => {
        if (prev === null || prev >= FEATURES.length - 1) return 0;
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="premium-popup-wrapper">
      <div className="premium-popup">
        <div className="premium-popup-header">
          <div className="premium-popup-title">
            <Crown size={24} />
            Premium Perks
          </div>
          <div className="premium-popup-subtitle">
            Unlock the full potential of AI
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
