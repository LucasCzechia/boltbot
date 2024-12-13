// components/Navbar.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Image
            src="/images/boltbot.webp"
            alt="BoltBot Logo"
            width={40}
            height={40}
            priority
          />
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
