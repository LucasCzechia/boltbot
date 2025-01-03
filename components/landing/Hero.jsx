// components/landing/Hero.jsx
import Link from 'next/link';
import Image from 'next/image';
import { Home, Sparkles } from 'lucide-react';
import ScrollButtons from './ScrollButtons';
import PremiumPopup from './PremiumPopup';

export default function Hero() {
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
          
          <div className="premium-button-wrapper">
            <Link 
              href="/plans" 
              className="hero-button premium"
            >
              <div className="premium-content">
                <Sparkles size={16} className="sparkle-icon" />
                <span>Upgrade to Premium</span>
              </div>
              <div className="premium-shine"></div>
              <div className="premium-particles">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="particle"></div>
                ))}
              </div>
            </Link>
            <PremiumPopup />
          </div>
        </div>
      </div>
      <ScrollButtons />
    </section>
  );
}
