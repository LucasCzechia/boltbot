// components/misc/Navigation.js
import { useState, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router';
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

export default function Navigation({ isDarkMode = true, setIsDarkMode = () => {} }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const displayName = session?.user?.global_name || 
                     session?.user?.name || 
                     session?.user?.username ||
                     'Unknown User';

  const handle = session?.user?.name ? 
                 `@${session.user.name}` : 
                 session?.user?.id ? 
                 `@${session.user.id}` : 
                 '@unknown';

  const navigationItems = [
    {
      name: 'Features',
      href: '/#features',
      icon: Zap,
      description: 'Explore powerful AI capabilities'
    },
    {
      name: 'Tools',
      href: '/#tools',
      icon: Wrench,
      description: 'Discover utility features'
    },
    {
      name: 'Statistics',
      href: '/#statistics',
      icon: BarChart2,
      description: 'View real-time statistics'
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

  const closeMenus = useCallback(() => {
    setIsMenuOpen(false);
    setShowDropdown(false);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      closeMenus();
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, closeMenus]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isNavLink = e.target.closest('.nav-item');
      const isMenuBtn = e.target.closest('.mobile-menu-btn');
      const isProfileBtn = e.target.closest('.user-profile-button');
      
      if (!isNavLink && !isMenuBtn && isMenuOpen) {
        setIsMenuOpen(false);
      }
      
      if (!isProfileBtn && showDropdown) {
        setShowDropdown(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeMenus();
      }
    };

    const handleTouchStart = (e) => {
      const isNavLink = e.target.closest('.nav-item');
      if (isNavLink) {
        e.preventDefault();
        isNavLink.click();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isMenuOpen, showDropdown, closeMenus]);

  const handleSignOut = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      closeMenus();
      await signOut({ 
        callbackUrl: '/auth/login',
        redirect: true
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark'
    setIsDarkMode(theme === 'dark')
    document.documentElement.classList.remove('light-mode', 'dark-mode')
    document.documentElement.classList.add(`${theme}-mode`)
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.remove('light-mode', 'dark-mode')
    document.documentElement.classList.add(`${newTheme}-mode`)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const handleNavigation = useCallback((item, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (item.requiresAuth && !session) {
      closeMenus();
      router.push('/auth/login');
      return;
    }

    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      closeMenus();
      return;
    }

    if (item.href.startsWith('/#')) {
      const elementId = item.href.replace('/#', '');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMenus();
      }
    } else {
      router.push(item.href);
    }
  }, [router, session, closeMenus]);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link href="/" className="logo" onClick={closeMenus}>
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
                onClick={closeMenus}
              />
            )}
          </AnimatePresence>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navigationItems.map((item) => {
              if (item.requiresAuth && !session) return null;

              return (
                <button
                  key={item.name}
                  className={`nav-item ${item.isPrimary ? 'primary' : ''}`}
                  onClick={(e) => handleNavigation(item, e)}
                  role="link"
                >
                  <item.icon size={20} className="nav-icon" />
                  <span className="nav-label">{item.name}</span>
                  {item.external && <ExternalLink size={16} className="external-icon" />}
                </button>
              );
            })}
          </div>

          <div className="nav-controls">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Moon className="theme-icon" />
              ) : (
                <Sun className="theme-icon" />
              )}
            </button>

            {session?.user && (
              <div className="user-profile-wrapper">
                <button 
                  className="user-profile-button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowDropdown(!showDropdown);
                  }}
                  aria-expanded={showDropdown}
                >
                  <Image 
                    src={session.user.image || "https://cdn.discordapp.com/embed/avatars/0.png"}
                    alt={`${displayName}'s avatar`}
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
                          src={session.user.image || "https://cdn.discordapp.com/embed/avatars/0.png"}
                          alt={`${displayName}'s avatar`}
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
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
