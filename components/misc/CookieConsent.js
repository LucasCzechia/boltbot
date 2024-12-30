// components/CookieConsent.js
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "easeOut", duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: 'var(--bg-primary)',
            borderTop: '1px solid var(--border-color)',
            backdropFilter: 'blur(var(--blur-strength))'
          }}
        >
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexDirection: 'row',
            justifyContent: 'space-between',
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              textAlign: 'center'
            }
          }}>
            <div style={{ flex: '1 1 auto' }}>
              <p style={{ 
                color: 'var(--text-secondary)',
                fontSize: '0.925rem',
                lineHeight: 1.5
              }}>
                We use cookies to enhance your experience. By continuing to visit our site, you agree to our use of cookies. 
                <a 
                  href="/privacy" 
                  style={{
                    color: 'var(--primary)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '2px',
                    marginLeft: '0.25rem',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = 'var(--primary-dark)'}
                  onMouseOut={(e) => e.target.style.color = 'var(--primary)'}
                >
                  Learn more
                </a>
              </p>
            </div>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexShrink: 0,
              '@media (max-width: 768px)': {
                width: '100%',
                justifyContent: 'center'
              }
            }}>
              <button
                onClick={declineCookies}
                style={{
                  padding: '0.625rem 1.25rem',
                  color: 'var(--text-primary)',
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.925rem',
                  transition: 'all 0.2s ease',
                  minWidth: '100px',
                  '@media (max-width: 768px)': {
                    flex: '1',
                    maxWidth: '150px'
                  }
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = 'var(--primary)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = 'var(--border-color)';
                }}
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                style={{
                  padding: '0.625rem 1.25rem',
                  background: 'var(--primary)',
                  color: 'var(--dark)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.925rem',
                  transition: 'all 0.2s ease',
                  minWidth: '100px',
                  '@media (max-width: 768px)': {
                    flex: '1',
                    maxWidth: '150px'
                  }
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'var(--primary-dark)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'var(--primary)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
