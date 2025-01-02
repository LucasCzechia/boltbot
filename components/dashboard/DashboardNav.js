// components/dashboard/DashboardNav.js
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ExternalLink,
  Moon,
  Sun,
  LogOut,
  ServerIcon,
} from 'lucide-react';

export default function DashboardNav({ navigationItems = [], customTitle = null }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isServerDashboard = router.pathname.startsWith('/dashboard/servers/[id]');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  const [currentWidth, setCurrentWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);


  const displayName = session?.user?.globalName || session?.user?.name || 'Unknown User';
  const handle = session?.user?.name ? `@${session?.user?.name}` : '@unknown';

  const getUserAvatar = () => {
    if (!session?.user?.image) {
      return 'https://cdn.discordapp.com/embed/avatars/0.png';
    }
    return session.user.image;
  };

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
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(theme === 'dark');
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(`${theme}-mode`);
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(`${newTheme}-mode`);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: '/auth/login',
        redirect: true,
      });
    } catch (error) {
      console.error('Sign out error:', error);
      router.push('/auth/login');
    }
  };

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

    const getNavTitle = () => {
        if (currentWidth <= 768) {
            return "BoltBot⚡";
        }

    if (customTitle) {
            return customTitle;
        }

      if (isServerDashboard) {
          return "BoltBot⚡ Dashboard";
      }
        return "BoltBot⚡ Dashboard";
  };
    const getMobileNavTitle = () => {
      return "BoltBot⚡"
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
        <nav className="dashboard-nav">
            <div className="nav-content">
                <Link href="/" className="logo">
                    <Image
                        src="/images/boltbot.webp"
                        alt="BoltBot Logo"
                        width={45}
                        height={45}
                        priority
                    />
                    {getNavTitle()}
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

                    {navigationItems.length > 0 && (
                        <div className="nav-links-wrapper">
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
                                            {item.icon && <item.icon size={20} className="nav-icon" />}
                                            <span className="nav-label">{item.name}</span>
                                            {item.external && <ExternalLink size={16} className="external-icon" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="nav-controls">
                        {isServerDashboard && (
                            <button
                                onClick={() => router.push('/dashboard/servers')}
                                className="nav-button"
                                aria-label="Back to servers"
                            >
                                <ServerIcon className="nav-icon" />
                            </button>
                        )}
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

                        <button
                            className="user-profile-button"
                            onClick={() => setShowDropdown(!showDropdown)}
                            aria-expanded={showDropdown}
                        >
                            <Image
                                src={getUserAvatar()}
                                alt="User Avatar"
                                width={48}
                                height={48}
                                className="user-avatar"
                                unoptimized
                            />
                        </button>
                    </div>
                </div>
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


                {showDropdown && (
                    <div className="user-dropdown">
                        <div className="user-info">
                            <Image
                                src={getUserAvatar()}
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
                    </div>
                )}
            </div>
        </nav>
    );
}
