// components/dashboard/DashboardNav.js
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Moon, Sun, LogOut, ServerIcon, LogIn, Settings, User, HelpCircle, Home } from 'lucide-react';
import NavigationMenu from '../misc/NavigationMenu';

export default function DashboardNav() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isServerDashboard = router.pathname.startsWith('/dashboard/servers/[id]');
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  const [currentWidth, setCurrentWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const displayName = session?.user?.globalName || session?.user?.name || 'Guest User';
  const handle = session?.user?.name ? `@${session?.user?.name}` : '@guest';

  const getUserAvatar = () => {
    if (!session?.user?.image) {
      return "https://cdn.discordapp.com/embed/avatars/0.png";
    }
    return session.user.image;
  };

  const navigationItems = [
    {
      id: 'home',
      title: 'Home',
      href: '/',
      icon: Home
    },
    {
      id: 'servers',
      title: 'Manage Servers',
      href: '/dashboard/servers',
      icon: ServerIcon
    },
    {
      id: 'settings',
      title: 'Settings',
      href: '/settings',
      icon: Settings
    },
    {
      id: 'support',
      title: 'Support',
      href: 'https://discord.gg/bolt',
      icon: HelpCircle
    }
  ];

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
        redirect: true
      });
    } catch (error) {
      console.error('Sign out error:', error);
      router.push('/auth/login');
    }
  };

  const handleClickOutside = (event) => {
    if (showDropdown && !event.target.closest('.user-profile-wrapper')) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  const getNavTitle = () => {
    if (currentWidth <= 768) {
      return "BoltBot⚡";
    }
    if (isServerDashboard) {
      return "BoltBot⚡ Dashboard";
    }
    return "BoltBot⚡ Dashboard";
  };

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

        <div className="user-profile-wrapper">
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

            {session ? (
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
            ) : (
              <Link 
                href="/auth/login" 
                className="login-button"
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {showDropdown && session && (
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

              <div className="dropdown-links">
                {navigationItems.map(item => (
                  <Link 
                    key={item.id}
                    href={item.href}
                    className="dropdown-link"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <item.icon size={20} />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>

              <button onClick={handleSignOut} className="logout-button">
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {!session && (
        <div className="login-banner">
          <p>Sign in with Discord to manage your servers and customize BoltBot⚡</p>
          <Link href="/auth/login" className="login-cta">
            Login Now
          </Link>
        </div>
      )}
    </nav>
  );
}
