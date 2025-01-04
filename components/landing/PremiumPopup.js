// components/landing/PremiumPopup.js
import React, { useState, useEffect, useRef } from 'react';
import { Star, Crown, Zap, Bot, Lock, Sparkles, Check, Plus, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
  { icon: Star, text: "Unlimited AI Generations", new: true },
  { icon: Bot, text: "Custom AI Personalities", highlight: true },
  { icon: Plus, text: "Higher Message Limits", pro: true }, 
  { icon: Crown, text: "Priority Support Access" },
  { icon: Lock, text: "Advanced Security Features", highlight: true },
  { icon: Sparkles, text: "Early Access Features", new: true }
];

const PremiumPopup = ({ onClose, triggerRef }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleClickOutside = (event) => {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        handleClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose();
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
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 200);
  };

  return (
    <div className={`premium-popup-wrapper ${isVisible ? 'visible' : ''}`}>
      <div className="premium-popup" ref={popupRef}>
        <div className="premium-popup-header">
          <div className="premium-popup-title">
            <Crown className="crown-icon" size={24} />
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
              className={`premium-feature ${activeFeature === index ? 'active' : ''} ${Feature.highlight ? 'highlight' : ''} ${Feature.pro ? 'pro' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <Check size={16} className="check-icon" />
              <Feature.icon size={16} className="feature-icon" />
              <span>{Feature.text}</span>
              {Feature.new && (
                <span className="feature-badge pulse">NEW</span>
              )}
              {Feature.pro && (
                <span className="feature-badge pro">PRO</span>
              )}
            </div>
          ))}
        </div>

        <Link href="/plans" className="upgrade-button">
          <span>Upgrade Now</span>
          <ChevronRight size={16} />
          <div className="upgrade-button-shine"></div>
        </Link>
      </div>
    </div>
  );
};

export default PremiumPopup;
