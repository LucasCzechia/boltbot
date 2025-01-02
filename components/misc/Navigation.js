// components/misc/Navigation.js
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react'
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
  ExternalLink,
  Moon,
  Sun,
  LogOut,
  Bot
} from 'lucide-react';

export default function Navigation({ 
  config = {}, 
  isDarkMode = true,
  setIsDarkMode = () => {},
  userProfile = null
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const displayName = userProfile?.user?.globalName || userProfile?.user?.name || 'Unknown User'
  const handle = userProfile?.user?.name ? `@${userProfile?.user?.name}` : '@unknown'
  
  const navigationItems = [
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
      href: '/dashboard/servers',
      icon: Layout,
      description: 'Manage your servers'
    },
    {
      name: 'Community',
      href: 'https://discord.gg/bolt',
      icon: Users,
      description: 'Join our Discord server',
      external: true
    },
    {
      name: 'Add to Discord',
      href: 'https://discord.com/oauth2/authorize?client_id=1250114494081007697&permissions=8&scope=bot',
      icon: Bot,
      description: 'Add BoltBot to your server',
      external: true,
      isPrimary: true
    }
  ];

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
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen, showDropdown]);

  const handleSignOut = async () => {
    try {
      await signOut({ 
        callbackUrl: '/auth/login',
        redirect: true
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleThemeToggle = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link href="/" className="logo">
          <Image
            src="/images/boltbot.webp"
            alt="BoltBot Logo"
            width={45}
            height={45}
            priority
            className="logo-image"
          />
          <span className="logo-text">BoltBot⚡</span>
        </Link>

        <div className="nav-controls-wrapper">
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="nav-links-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </AnimatePresence>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-item ${item.isPrimary ? 'primary' : ''}`}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon size={20} className="nav-icon" />
                <span className="nav-label">{item.name}</span>
                {item.external && <ExternalLink size={16} className="external-icon" />}
              </Link>
            ))}
          </div>

          <div className="nav-controls">
            <button 
              className="theme-toggle"
              onClick={handleThemeToggle}
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
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
                          <div className="user-name">{displayName}</div>
                          <div className="user-handle">{handle}</div>
                        </div>
                      </div>
                      <button onClick={handleSignOut} className="logout-button">
                        <LogOut size={20} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
