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
    
    // Initialize GA after consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
    
    // Reload to enable analytics
    window.location.reload();
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
    
    // Clear existing cookies
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }

    // Disable GA if it exists
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
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
          className="cookie-consent-container"
        >
          <div className="cookie-consent-content">
            <div className="cookie-consent-text">
              <p>
                We use cookies and Google Analytics to enhance your experience and analyze site traffic. By continuing to visit our site, you agree to our use of cookies.
                <a href="/privacy">
                  Learn more
                </a>
              </p>
            </div>
            <div className="cookie-consent-buttons">
              <button
                onClick={declineCookies}
                className="cookie-consent-button"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="cookie-consent-button-accept"
              >
                Accept All
              </button>
              <button
                onClick={() => setShowConsent(false)}
                className="cookie-consent-close"
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
