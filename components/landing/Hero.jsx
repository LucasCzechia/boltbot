// components/landing/Hero.jsx
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Sparkles } from 'lucide-react';
import ScrollButtons from './ScrollButtons';

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
            <LayoutDashboard size={20} />
            <span>Open Dashboard</span>
            <div className="button-glow"></div>
          </Link>
          
          <Link 
            href="/premium" 
            className="hero-button premium"
          >
            <div className="premium-content">
              <Sparkles size={16} className="sparkle-icon" />
              <span>Premium</span>
            </div>
            <div className="premium-shine"></div>
            <div className="premium-particles">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="particle"></div>
              ))}
            </div>
          </Link>
        </div>
      </div>
      <ScrollButtons />
    </section>
  );
}
