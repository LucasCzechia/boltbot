// components/misc/Navigation.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Zap, 
  Wrench, 
  BarChart2, 
  Layout, 
  Users, 
  Bot, 
  ExternalLink,
  ChevronDown,
  Moon,
  Sun,
  LogOut
} from 'lucide-react';

const Navigation = ({ 
  config = {}, 
  isDashboard = false,
  userProfile = null,
  onThemeToggle = () => {},
  onSignOut = () => {},
  isDarkMode = true
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const defaultConfig = {
    logoText: 'BoltBot⚡',
    logoImage: '/images/boltbot.webp',
    items: [
      {
        name: 'Features',
        href: '#features',
        icon: Zap,
        description: 'Explore powerful AI capabilities'
      },
      {
        name: 'Tools',
        href: '#tools',
        icon: Wrench,
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
    ],
    ctaButton: {
      text: 'Add to Discord',
      href: 'https://discord.com/oauth2/authorize?client_id=1250114494081007697&permissions=8&scope=bot',
      icon: Zap
    }
  };

  const mergedConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        setIsMenuOpen(false);
      }
      if (showDropdown && !e.target.closest('.user-profile-wrapper')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen, showDropdown]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link href="/" className="logo">
          <Image
            src={mergedConfig.logoImage}
            alt="Logo"
            width={45}
            height={45}
            priority
            className="logo-image"
          />
          <span className="logo-text">{mergedConfig.logoText}</span>
        </Link>

        <div className="nav-controls-wrapper">
          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
            onClick={handleMenuClick}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {mergedConfig.items.map((item, index) => (
              <div key={item.name} className="nav-item-wrapper">
                <Link 
                  href={item.href}
                  className="nav-link"
                  target={item.external ? '_blank' : '_self'}
                  rel={item.external ? 'noopener noreferrer' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon size={18} className="nav-icon" />
                  <span>{item.name}</span>
                  {item.external && <ExternalLink size={14} className="external-icon" />}
                </Link>
              </div>
            ))}

            {mergedConfig.ctaButton && (
              <Link 
                href={mergedConfig.ctaButton.href}
                className="cta-button"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                <mergedConfig.ctaButton.icon size={18} />
                <span>{mergedConfig.ctaButton.text}</span>
              </Link>
            )}
          </div>

          <div className="nav-controls">
            <button 
              className="theme-toggle"
              onClick={onThemeToggle}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Moon className="theme-icon" />
              ) : (
                <Sun className="theme-icon" />
              )}
            </button>

            {userProfile && (
              <div className="user-profile-wrapper">
                <button 
                  className="user-profile-button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  aria-expanded={showDropdown}
                >
                  <Image 
                    src={userProfile.image || "https://cdn.discordapp.com/embed/avatars/0.png"}
                    alt="User Avatar"
                    width={48}
                    height={48}
                    className="user-avatar"
                    unoptimized
                  />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div 
                      className="user-dropdown"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={variants}
                    >
                      <div className="user-info">
                        <Image 
                          src={userProfile.image || "https://cdn.discordapp.com/embed/avatars/0.png"}
                          alt="User Avatar"
                          width={65}
                          height={65}
                          className="dropdown-avatar"
                          unoptimized
                        />
                        <div className="user-details">
                          <div className="user-name">{userProfile.name}</div>
                          <div className="user-handle">@{userProfile.handle}</div>
                        </div>
                      </div>
                      <button onClick={onSignOut} className="logout-button">
                        <LogOut size={20} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
