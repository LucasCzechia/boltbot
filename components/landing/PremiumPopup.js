// components/landing/PremiumPopup.js
import React, { useState, useEffect, useRef } from 'react';
import { Star, Crown, Zap, Bot, Lock, Sparkles, Check, Plus, ArrowRight, Gift } from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
  { icon: Star, text: "Unlimited AI Generations", new: true, highlight: true },
  { icon: Bot, text: "Custom AI Personalities", popular: true },
  { icon: Plus, text: "Higher Message Limits", comingSoon: true },
  { icon: Crown, text: "Priority Support Access" },
  { icon: Lock, text: "Advanced Security Features" },
  { icon: Gift, text: "Exclusive Discord Role", new: true },
  { icon: Sparkles, text: "Early Access Features" },
  { icon: Zap, text: "Faster Response Times" }
];

const PremiumPopup = ({ onClose, triggerRef }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const popupRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleClose = () => {
    setIsClosing(true);
    timeoutRef.current = setTimeout(() => {
      onClose?.();
    }, 200);
  };

  useEffect(() => {
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
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onClose, triggerRef]);

  return (
    <div className={`premium-popup-wrapper ${isClosing ? 'closing' : ''}`}>
      <div 
        className="premium-popup" 
        ref={popupRef}
        style={{
          '--feature-count': FEATURES.length,
        }}
      >
        <div className="premium-glow" />
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
              className={`premium-feature ${activeFeature === index ? 'active' : ''} 
                ${Feature.highlight ? 'highlight' : ''} 
                ${Feature.popular ? 'popular' : ''}`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
              }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <Check size={16} className="check-icon" />
              <Feature.icon size={16} className="feature-icon" />
              <span>{Feature.text}</span>
              {Feature.new && (
                <span className="feature-badge new">NEW</span>
              )}
              {Feature.comingSoon && (
                <span className="feature-badge soon">SOON</span>
              )}
              {Feature.popular && (
                <span className="feature-badge popular">POPULAR</span>
              )}
            </div>
          ))}
        </div>

        <Link href="/plans" className="upgrade-button">
          <span>Upgrade Now</span>
          <ArrowRight size={16} />
          <div className="upgrade-shine"></div>
        </Link>
      </div>
    </div>
  );
};

export default PremiumPopup;
