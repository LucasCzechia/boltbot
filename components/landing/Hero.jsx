// components/landing/Hero.jsx
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Home, Sparkles } from 'lucide-react';
import ScrollButtons from './ScrollButtons';
import PremiumPopup from './PremiumPopup';
import { useRef, useState, useEffect } from 'react';

export default function Hero() {
  const [showPopup, setShowPopup] = useState(false);
  const premiumButtonRef = useRef(null);
  const popupContainerRef = useRef(null);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePremiumClick = () => {
    router.push('/plans');
  };

  const handlePremiumHover = (isHovering) => {
    if (!isMobile) {
      setShowPopup(isHovering);
    }
  };

  useEffect(() => {
    if (isMobile) {
      setShowPopup(true);
    }
  }, [isMobile]);

  return (
    <section className="hero">
      <div id="particles-js" className="particles"></div>
      <div className="hero-content">
        <Image
          src="/images/boltbot.webp"
          alt="BoltBot Avatar"
          width={200}
          height={200}
          className="bot-avatar"
          priority
        />
        <h1>Meet BoltBot⚡</h1>
        <p>Your advanced AI-powered Discord companion with powerful features including text generation, image creation, and real-time tools.</p>
        
        <div className="hero-buttons">
          <Link 
            href="https://boltbot.app/dashboard" 
            className="hero-button primary"
          >
            <Home size={20} />
            <span>Open Dashboard</span>
            <div className="button-glow"></div>
          </Link>
          
          <div className="premium-button-wrapper" ref={premiumButtonRef}>
            <button
              className="hero-button premium"
              onClick={handlePremiumClick}
              onMouseEnter={() => handlePremiumHover(true)}
              onMouseLeave={() => handlePremiumHover(false)}
              aria-expanded={showPopup}
            >
              <div className="premium-content">
                <Sparkles size={16} className="sparkle-icon" />
                <span>Upgrade to Premium</span>
              </div>
              <div className="premium-shine"></div>
            </button>
          </div>
        </div>

        <div className="premium-popup-container" ref={popupContainerRef}>
          {showPopup && (
            <PremiumPopup 
              onClose={() => !isMobile && setShowPopup(false)}
              triggerRef={premiumButtonRef}
              isMobile={isMobile}
            />
          )}
        </div>
      </div>
      <ScrollButtons />
    </section>
  );
}
