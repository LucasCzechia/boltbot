// components/landing/Hero.jsx
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Home, Sparkles } from 'lucide-react';
import ScrollButtons from './ScrollButtons';
import { useRef, useState, useEffect } from 'react';
import { useParticles } from 'react-particles-js';

export default function Hero() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const particlesRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useParticles(particlesRef, {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffcc00' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffcc00',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      }
    },
    retina_detect: true
  });

  const handlePremiumClick = () => {
    router.push('/plans');
  };

  return (
    <section className="hero">
      <div ref={particlesRef} className="particles"></div>
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
            <button
              className="hero-button premium"
              onClick={handlePremiumClick}
            >
              <div className="premium-content">
                <Sparkles size={16} className="sparkle-icon" />
                <span>Upgrade to Premium</span>
              </div>
              <div className="premium-shine"></div>
            </button>
          </div>
        </div>
      </div>
      <ScrollButtons />
    </section>
  );
}
