// components/landing/PremiumPopup.js
import React from 'react';
import { Star, Crown, Zap, Bot, Lock, Sparkles, Check, Plus } from 'lucide-react';

const FEATURES = [
  { icon: Star, text: "Unlimited AI Generations", new: true },
  { icon: Bot, text: "Custom AI Personalities" },
  { icon: Plus, text: "Higher Limits" }, 
  { icon: Crown, text: "Priority Support Access" },
  { icon: Lock, text: "Advanced Security Features" },
  { icon: Sparkles, text: "Early Access Features" }
];

const PremiumPopup = () => {
  return (
    <div className="premium-popup-wrapper">
      <div className="premium-popup">
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
