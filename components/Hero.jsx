// components/Hero.jsx
import Link from 'next/link';

export default function Hero() {
  const imageConfig = {
    botAvatar: "https://cdn.discordapp.com/attachments/1309823577687851028/1311442603606282290/1000020718-removebg-preview.png?ex=6748df9a&is=67478e1a&hm=7a294c39ef68f629a3eb81d3b6354e263ddfa91c05a82012bdcc08e11a583857&"
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
