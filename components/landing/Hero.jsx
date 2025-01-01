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
            href="/plans" 
            className="hero-button premium"
          >
            <Sparkles size={20} />
            <span>Upgrade to Premium</span>
            <div className="premium-shine"></div>
            <div className="premium-stars">
              {[...Array(3)].map((_, i) => (
                <svg key={i} className="premium-star" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1l3.22 6.979 7.78.533-5.785 5.112 1.944 7.376-7.159-4.035-7.159 4.035 1.944-7.376-5.785-5.112 7.78-.533z"/>
                </svg>
              ))}
            </div>
          </Link>
        </div>
      </div>
      <ScrollButtons />
    </section>
  );
}
