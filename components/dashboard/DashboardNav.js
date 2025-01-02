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
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function DashboardNav({ navigationItems = [], customTitle = null }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isServerDashboard = router.pathname.startsWith('/dashboard/servers/[id]');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentWidth, setCurrentWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const isMobile = currentWidth <= 768;

  const displayName = session?.user?.global_name || 
                     session?.user?.name || 
                     session?.user?.username ||
                     'Unknown User';
                     
  const handle = session?.user?.name ? 
                `@${session.user.name}` : 
                session?.user?.id ? 
                `@${session.user.id}` : 
                '@unknown';

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setCurrentWidth(width);
      if (width <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
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

  const closeMenus = useCallback(() => {
    setIsMenuOpen(false);
    setShowDropdown(false);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && !e.target.closest('.dashboard-sidebar') && !e.target.closest('.mobile-menu-btn')) {
        closeMenus();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeMenus();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeMenus, isMobile]);

  const handleSignOut = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      closeMenus();
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
    const handleRouteChange = () => {
      closeMenus();
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, closeMenus]);

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
      closeMenus();
      router.push(item.href);
    }
  }, [router, session, closeMenus]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="dashboard-nav">
        <div className="nav-content">
          {!isMobile && (
            <button 
              className="sidebar-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            >
              {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
          )}

          <Link href="/" className="logo" onClick={closeMenus}>
            <Image
              src="/images/boltbot.webp"
              alt="BoltBot Logo"
              width={45}
              height={45}
              priority
              className="logo-image"
            />
            <span className="logo-text">{getNavTitle()}</span>
          </Link>

          <div className="nav-controls-wrapper">
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

              {isMobile && (
                <button
                  className="mobile-menu-btn"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {isMobile && (
              <motion.div
                className="mobile-nav-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeMenus}
              />
            )}
            <motion.div
              className={`dashboard-sidebar ${isMobile ? 'mobile' : ''}`}
              initial={{ x: isMobile ? '-100%' : -300 }}
              animate={{ x: 0 }}
              exit={{ x: isMobile ? '-100%' : -300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="sidebar-header">
                <Link href="/" className="logo" onClick={closeMenus}>
                  <Image
                    src="/images/boltbot.webp"
                    alt="BoltBot Logo"
                    width={45}
                    height={45}
                    priority
                    className="logo-image"
                  />
                  <span className="logo-text">{getNavTitle()}</span>
                </Link>
              </div>

              <div className="nav-links-wrapper">
                <div className="nav-links">
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
