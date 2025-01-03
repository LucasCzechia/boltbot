// components/dashboard/DashboardNav.js
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
    X,
    ExternalLink,
    Sun,
    LogOut,
    ServerIcon,
    LogIn,
    Menu
} from 'lucide-react';

// Custom Combined Moon and Star Icon Component
const MoonStarIcon = ({ className = 'theme-icon' , size=24}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M20.52 18.96c.32-.4-.01-.96-.52-.96A11 11 0 0 1 9.77 2.94c.31-.78-.3-1.68-1.1-1.43a11 11 0 1 0 11.85 17.45Z" />
            <path d="m17.73 9.27-.76-2.02a.5.5 0 0 0-.94 0l-.76 2.02-2.02.76a.5.5 0 0 0 0 .94l2.02.76.76 2.02a.5.5 0 0 0 .94 0l.76-2.02 2.02-.76a.5.5 0 0 0 0-.94l-2.02-.76ZM19.73 2.62l.45 1.2 1.2.45c.21.08.21.38 0 .46l-1.2.45-.45 1.2a.25.25 0 0 1-.46 0l-.45-1.2-1.2-.45a.25.25 0 0 1 0-.46l1.2-.45.45-1.2a.25.25 0 0 1 .46 0Z"/>

        </svg>
    );
};


export default function DashboardNav({ navigationItems = [], customTitle = null }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isServerDashboard = router.pathname.startsWith('/dashboard/servers/[id]');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const isMobile = currentWidth <= 768;
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

    const displayName = session?.user?.global_name ||
        session?.user?.name ||
        session?.user?.username ||
        'Unknown User';

    const handle = session?.user?.name ?
        `@${session.user.name}` :
        session?.user?.id ?
            `@${session.user.id}` :
            '@unknown';

  const closeMenus = useCallback(() => {
    setIsMenuOpen(false);
    setShowDropdown(false);
  }, []);

  useEffect(() => {
      const handleClickOutside = (event) => {
          if (
              dropdownRef.current &&
              !dropdownRef.current.contains(event.target) &&
              !buttonRef.current.contains(event.target)
          ) {
              setShowDropdown(false);
          }
      };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
    };
}, []);

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
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

    useEffect(() => {
        if (showDropdown || isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showDropdown, isMenuOpen]);


  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(`${newTheme}-mode`);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

   const handleSignOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMenus();
        router.push('/auth/login/logout');
    };

  const handleSignIn = async () => {
    try {
      router.push('/auth/login');
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

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
    return "BoltBot⚡";
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

  return (
    <nav className="dashboard-nav">
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
                 <MoonStarIcon />
              ) : (
                <Sun className="theme-icon" />
              )}
            </button>

            {status === "loading" ? (
              <div className="loading-avatar" />
            ) : session?.user ? (
              <div className="user-profile-wrapper">
                <button
                  ref={buttonRef}
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

                {showDropdown && (
                      <div
                         ref={dropdownRef}
                          className="user-dropdown show"
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
                      </div>
                  )}
              </div>
            ) : (
              <button onClick={handleSignIn} className="login-button">
                <LogIn size={20} />
                <span>Sign In</span>
              </button>
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


         {isMenuOpen && (
              <div
                  className={`nav-links ${isMenuOpen ? 'active' : ''}`}
                  onClick={(e) => e.stopPropagation()}
              >
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
          )}
    </nav>
  );
}
