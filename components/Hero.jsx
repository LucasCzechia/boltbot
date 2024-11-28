// components/Hero.jsx
import Link from 'next/link';

export default function Hero() {
  const imageConfig = {
    botAvatar: "https://cdn.discordapp.com/avatars/1250114494081007697/1b9f4d6c5c2d4e9a8b4f4c1cddcfd6e5.webp"
  };

  return (
    <section className="hero">
      <div id="particles-js" className="particles"></div>
      <div className="hero-content">
        <img src={imageConfig.botAvatar} alt="BoltBot Avatar" className="bot-avatar" />
        <h1>Meet BoltBot⚡</h1>
        <p>Your advanced AI-powered Discord companion with powerful features including text generation, image creation, and real-time tools.</p>
        <Link 
          href="https://discord.com/oauth2/authorize?client_id=1250114494081007697" 
          className="cta-button"
        >
          Add to Your Server
        </Link>
      </div>
    </section>
  );
}
