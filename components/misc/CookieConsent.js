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
    window.location.reload();
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
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
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
                    marginLeft: '0.25rem'
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
              gap: '0.75rem'
            }}>
              <button
                onClick={declineCookies}
                style={{
                  padding: '0.625rem 1.25rem',
                  color: 'var(--text-primary)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.925rem',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                onMouseOut={(e) => e.target.style.color = 'var(--text-primary)'}
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
                  transition: 'all 0.2s ease'
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
              <button
                onClick={() => setShowConsent(false)}
                style={{
                  display: 'none',
                  padding: '0.5rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '@media (max-width: 768px)': {
                    display: 'flex'
                  }
                }}
                aria-label="Close cookie banner"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
