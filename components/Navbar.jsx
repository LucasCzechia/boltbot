// components/Navbar.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const imageConfig = {
    botLogo: "https://cdn.discordapp.com/avatars/1250114494081007697/1b9f4d6c5c2d4e9a8b4f4c1cddcfd6e5.webp"
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link href="/" className="logo">
          <img src={imageConfig.botLogo} alt="BoltBot Logo" />
          BoltBot⚡
        </Link>
        
        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link href="#features">Features</Link>
          <Link href="#tools">Tools</Link>
          <Link href="#statistics">Statistics</Link>
          <Link href="#developers">Developers</Link>
          <Link 
            href="https://discord.com/oauth2/authorize?client_id=1250114494081007697" 
            className="cta-button"
          >
            Add to Discord
          </Link>
        </div>
      </div>
    </nav>
  );
}
