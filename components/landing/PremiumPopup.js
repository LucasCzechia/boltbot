// components/landing/PremiumPopup.js
import React, { useState, useEffect, useRef } from 'react';
import { Star, Crown, Zap, Bot, Lock, Sparkles, Check, Plus, ArrowRight, Gift, Flame, Clock } from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
  { icon: Star, text: "Unlimited AI Generations", new: true, highlight: true },
  { icon: Bot, text: "Advanced AI Personalities", popular: true },
  { icon: Plus, text: "100k Messages/Month", metric: "4x more" },
  { icon: Crown, text: "Priority Support (24/7)", metric: "2hr response" },
  { icon: Lock, text: "Enterprise Security", badge: "256-bit" },
  { icon: Gift, text: "Exclusive Discord Perks", new: true },
  { icon: Clock, text: "Faster Response Times", metric: "2x faster" },
  { icon: Flame, text: "Custom AI Training", popular: true }
];

const PremiumPopup = ({ onClose, triggerRef }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const popupRef = useRef(null);
  const [animatedFeatures, setAnimatedFeatures] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedFeatures(prev => {
        if (prev.length >= FEATURES.length) return [];
        return [...prev, prev.length];
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && 
          !popupRef.current.contains(event.target) && 
          !triggerRef.current?.contains(event.target)) {
        handleClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') handleClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="premium-popup-overlay">
      <div className="premium-popup-backdrop" onClick={handleClose} />
      <div 
        className={`premium-popup-wrapper ${isClosing ? 'closing' : ''}`}
        style={{ '--feature-count': FEATURES.length }}
      >
        <div className="premium-popup" ref={popupRef}>
          <div className="premium-popup-header">
            <div className="premium-popup-title">
              <Crown className="crown-icon" size={28} />
              <span>Premium Features</span>
            </div>
            <div className="premium-popup-subtitle">
              Unlock Enterprise-Grade AI Powers
            </div>
          </div>

          <div className="premium-features-grid">
            {FEATURES.map((Feature, index) => (
              <div 
                key={index}
                className={`premium-feature ${activeFeature === index ? 'active' : ''} 
                  ${Feature.highlight ? 'highlight' : ''}
                  ${animatedFeatures.includes(index) ? 'animate-in' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="feature-icon-wrapper">
                  <Feature.icon size={18} className="feature-icon" />
                  <Check size={12} className="check-icon" />
                </div>
                <div className="feature-content">
                  <span className="feature-text">{Feature.text}</span>
                  <div className="feature-badges">
                    {Feature.new && <span className="feature-badge new">NEW</span>}
                    {Feature.popular && <span className="feature-badge popular">POPULAR</span>}
                    {Feature.metric && <span className="feature-badge metric">{Feature.metric}</span>}
                    {Feature.badge && <span className="feature-badge spec">{Feature.badge}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="premium-actions">
            <Link href="/plans" className="upgrade-button">
              <span>Upgrade to Premium</span>
              <ArrowRight size={16} />
              <div className="button-shine" />
            </Link>
            <button onClick={handleClose} className="cancel-button">
              Remind me later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPopup;
