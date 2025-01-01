import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Zap, Tool, BarChart2, Layout, Users, Bot, ExternalLink, ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
  {
    name: 'Features',
    href: '#features',
    icon: Zap,
    description: 'Explore powerful AI capabilities'
  },
  {
    name: 'Tools',
    href: '#tools',
    icon: Tool,
    description: 'Discover utility features'
  },
  {
    name: 'Analytics',
    href: '#statistics',
    icon: BarChart2,
    description: 'View real-time statistics'
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Layout,
    description: 'Manage your servers'
  },
  {
    name: 'Community',
    href: 'https://discord.gg/bolt',
    icon: Users,
    description: 'Join our Discord server',
    external: true
  }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        setIsMenuOpen(false);
      }
      if (!e.target.closest('.nav-dropdown')) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <Link href="/" className="logo">
          <div className="logo-wrapper">
            <Image
              src="/images/boltbot.webp"
              alt="BoltBot Logo"
              width={40}
              height={40}
              priority
              className="logo-image"
            />
            <Bot className="logo-icon" size={24} />
          </div>
          <span className="logo-text">BoltBot<span className="logo-bolt">⚡</span></span>
        </Link>
        
        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={handleMenuClick}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {NAV_ITEMS.map((item, index) => (
            <div key={item.name} className="nav-item-wrapper">
              <Link 
                href={item.href}
                className={`nav-link ${activeDropdown === index ? 'active' : ''}`}
                target={item.external ? '_blank' : '_self'}
                rel={item.external ? 'noopener noreferrer' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon size={18} className="nav-icon" />
                <span>{item.name}</span>
                {item.external && <ExternalLink size={14} className="external-icon" />}
                {item.dropdown && (
                  <ChevronDown 
                    size={14} 
                    className={`dropdown-arrow ${activeDropdown === index ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDropdownClick(index);
                    }}
                  />
                )}
              </Link>
            </div>
          ))}
          
          <Link 
            href="https://discord.com/oauth2/authorize?client_id=1250114494081007697&permissions=8&scope=bot"
            className="cta-button"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            <Zap size={18} />
            <span>Add to Discord</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
