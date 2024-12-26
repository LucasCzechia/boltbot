// components/landing/Hero.jsx
import Link from 'next/link';
import Image from 'next/image';
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
        <Link 
          href="https://boltbot.app/dashboard" 
          className="cta-button"
        >
          Open Dashboard
        </Link>
      </div>
      <ScrollButtons />
    </section>
  );
}
