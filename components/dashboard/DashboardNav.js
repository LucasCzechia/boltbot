// components/dashboard/DashboardNav.js
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Moon, Sun, LogOut, LogIn } from 'lucide-react';
import NavigationMenu from '../misc/NavigationMenu';

export default function DashboardNav({ navigation }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const displayName = session?.user?.globalName || session?.user?.name || 'Guest User';
  const handle = session?.user?.name ? `@${session?.user?.name}` : '@guest';

  const getUserAvatar = () => {
    if (!session?.user?.image) {
      return "https://cdn.discordapp.com/embed/avatars/0.png";
    }
    return session.user.image;
  };

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
          <span>BoltBot⚡</span>
        </Link>

        <div className="nav-controls">
          {navigation && (
            <NavigationMenu
              {...navigation}
              className="nav-menu-embedded"
            />
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

          {status === 'authenticated' ? (
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
            <Link href="/auth/login" className="login-button">
              <LogIn size={20} />
              <span>Login</span>
            </Link>
          )}

          {showDropdown && status === 'authenticated' && (
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
      </div>
    </nav>
  );
}
