// components/landing/PremiumPopup.js
import React from 'react';
import { Sparkles, Check, Star, Zap, Bot, Lock } from 'lucide-react';

const PremiumPopup = () => {
  const features = [
    { icon: Star, text: "Unlimited AI conversations & image generation" },
    { icon: Bot, text: "Custom AI personality creation & training" },
    { icon: Zap, text: "Priority response time & processing" },
    { icon: Lock, text: "Advanced security & moderation features" },
    { icon: Sparkles, text: "Early access to new features" }
  ];

  return (
    <div className="premium-popup">
      <div className="premium-popup-content">
        {features.map((Feature, index) => (
          <div 
            key={index}
            className="premium-feature"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Check size={16} className="check-icon" />
            <Feature.icon size={16} className="feature-icon" />
            <span>{Feature.text}</span>
          </div>
        ))}
      </div>
      <div className="premium-glow"></div>
      <div className="premium-border"></div>
    </div>
  );
};

export default PremiumPopup;
