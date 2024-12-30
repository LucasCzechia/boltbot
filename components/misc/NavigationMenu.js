// components/misc/NavigationMenu.js
import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function NavigationMenu({ 
  title, 
  icon: Icon, 
  items, 
  footer,
  onNavigate,
  position = 'right',
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth > 1024 && isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onNavigate) {
      onNavigate();
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={`nav-menu-trigger ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div 
        className={`nav-menu-overlay ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(false)} 
      />

      <nav className={`nav-menu ${isOpen ? 'open' : ''} ${position}`}>
        <div className="nav-menu-header">
          {Icon && <Icon size={24} />}
          <h2>{title}</h2>
        </div>

        <div className="nav-menu-items">
          {items.map((item) => {
            const ItemIcon = item.icon;

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`nav-menu-item ${item.active ? 'active' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  {ItemIcon && <ItemIcon size={20} />}
                  <span>{item.title}</span>
                  <ChevronRight className="nav-menu-chevron" size={16} />
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                className={`nav-menu-item ${item.active ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                {ItemIcon && <ItemIcon size={20} />}
                <span>{item.title}</span>
                <ChevronRight className="nav-menu-chevron" size={16} />
              </button>
            );
          })}
        </div>

        {footer && (
          <div className="nav-menu-footer">
            {footer}
          </div>
        )}
      </nav>
    </>
  );
}
