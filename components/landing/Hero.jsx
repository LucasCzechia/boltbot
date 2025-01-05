// components/landing/Hero.jsx
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Home, Sparkles } from 'lucide-react';
import ScrollButtons from './ScrollButtons';
import { useRef, useState, useEffect } from 'react';
import PremiumPopup from './PremiumPopup';

export default function Hero() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const premiumButtonRef = useRef();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(theme === 'dark');
  }, []);

  const handlePremiumClick = () => {
    setShowPremiumPopup(!showPremiumPopup);
  };

  return (
    <section className="hero">
      <div id="particles-js" className="particles"></div>
      <div className="hero-content">
        <div className="logo-wrapper">
          <Image
            src="/images/boltbot.webp"
            alt="BoltBot Logo"
            width={200}
            height={200}
            className="bot-avatar"
            priority={true}
            style={{ opacity: 1 }} 
          />
        </div>
        <h1>Meet BoltBot⚡</h1>
        <p>Your advanced AI-powered Discord companion with powerful features including text generation, image creation, and real-time tools.</p>
        
        <div className="hero-buttons">
          <Link 
            href="https://boltbot.app/dashboard" 
            className={`hero-button primary ${isDarkMode ? 'dark' : 'light'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Home size={20} />
            <span>Open Dashboard</span>
            <div className="button-glow"></div>
          </Link>
          
          <div className="premium-button-wrapper">
            <button
              ref={premiumButtonRef}
              className={`hero-button premium ${isDarkMode ? 'dark' : 'light'}`}
              onClick={handlePremiumClick}
            >
              <div className="premium-content">
                <Sparkles size={16} className={`sparkle-icon ${isDarkMode ? 'dark' : 'light'}`} />
                <span>Upgrade to Premium</span>
              </div>
              <div className={`premium-shine ${isDarkMode ? 'dark' : 'light'}`}></div>
              <div className="premium-particles">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className={`particle ${isDarkMode ? 'dark' : 'light'}`} />
                ))}
              </div>
            </button>

            {showPremiumPopup && (
              <PremiumPopup
                onClose={() => setShowPremiumPopup(false)}
                triggerRef={premiumButtonRef}
              />
            )}
          </div>
        </div>
      </div>
      <ScrollButtons />
    </section>
  );
}
