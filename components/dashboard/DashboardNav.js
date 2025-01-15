// components/dashboard/DashboardNav.js
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Menu,
  X,
  ExternalLink,
  Moon,
  Sun,
  LogOut,
  ServerIcon,
  LogIn,
} from 'lucide-react';

export default function DashboardNav({ navigationItems = [], customTitle = null, onThemeChange }) {
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
  const menuRef = useRef(null);

  const closeMenus = useCallback(() => {
    if (isMenuOpen) {
      document.body.classList.remove('menu-open');
      const overlay = document.querySelector('.menu-overlay');
      if (overlay) {
        overlay.classList.remove('active');
      }
    }
    setIsMenuOpen(false);
    setShowDropdown(false);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        setShowDropdown(false);
      }

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('.mobile-menu-btn')
      ) {
        closeMenus();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMenus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeMenus]);

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        closeMenus();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [closeMenus]);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(theme === 'dark');
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(`${theme}-mode`);
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
      const overlay = document.createElement('div');
      overlay.className = 'menu-overlay';
      document.body.appendChild(overlay);
      setTimeout(() => overlay.classList.add('active'), 0);

      overlay.addEventListener('click', closeMenus);

      return () => {
        document.body.classList.remove('menu-open');
        overlay.removeEventListener('click', closeMenus);
        overlay.remove();
      };
    }
  }, [isMenuOpen, closeMenus]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(`${newTheme}-mode`);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeMenus();
    try {
      await router.push('/auth/login/logout');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleSignIn = async () => {
    closeMenus();
    try {
      router.push('/auth/login');
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="dashboard-nav">
      {/* Rest of the component implementation remains the same... */}
      <div className="nav-content">
        {/* ... existing nav content ... */}

        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          ref={menuRef}
          className={`nav-links ${isMenuOpen ? 'active' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-item ${item.isPrimary ? 'primary' : ''}`}
              onClick={closeMenus}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
            >
              {item.icon && <item.icon size={20} className="nav-icon" />}
              <span>{item.name}</span>
              {item.external && <ExternalLink size={16} className="external-icon" />}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
