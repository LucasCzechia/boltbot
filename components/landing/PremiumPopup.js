// components/landing/PremiumPopup.js
import React from 'react';
import { Sparkles, Check, Star, Zap, Bot, Lock } from 'lucide-react';

const PremiumPopup = () => {
  const features = [
    { icon: Star, text: "Unlimited AI" },
    { icon: Bot, text: "Custom AI" },
    { icon: Zap, text: "Priority Access" },
    { icon: Lock, text: "Enhanced Security" },
    { icon: Sparkles, text: "Early Features" }
  ];

  return (
    <div className="premium-popup">
      <div className="premium-popup-content">
        {features.map((Feature, index) => (
          <div 
            key={index}
            className="premium-feature"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <Check size={16} className="check-icon" />
            <Feature.icon size={16} className="feature-icon" />
            <span>{Feature.text}</span>
            <div className="feature-shine"></div>
          </div>
        ))}
      </div>
      <div className="premium-glow"></div>
      <div className="premium-border"></div>
    </div>
  );
};

export default PremiumPopup;
