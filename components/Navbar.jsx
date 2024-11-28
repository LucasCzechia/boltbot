// components/Navbar.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const imageConfig = {
    botLogo: "https://cdn.discordapp.com/attachments/1309823577687851028/1311442603606282290/1000020718-removebg-preview.png?ex=6748df9a&is=67478e1a&hm=7a294c39ef68f629a3eb81d3b6354e263ddfa91c05a82012bdcc08e11a583857&"
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
