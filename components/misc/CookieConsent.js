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
          className="fixed bottom-0 left-0 right-0 z-50 bg-dark border-t border-white/10 backdrop-blur-md"
        >
          <div className="max-w-[1400px] mx-auto p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-light/90 text-sm">
                We use cookies to enhance your experience. By continuing to visit our site, you agree to our use of cookies. 
                <a 
                  href="/privacy" 
                  className="text-primary hover:text-primary-dark underline underline-offset-2 ml-1 transition-colors"
                >
                  Learn more
                </a>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={declineCookies}
                className="px-4 py-2 text-sm text-light hover:text-primary transition-colors"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="px-4 py-2 text-sm bg-primary hover:bg-primary-dark text-dark rounded-md transition-all hover:-translate-y-0.5"
              >
                Accept All
              </button>
              <button
                onClick={() => setShowConsent(false)}
                className="p-2 text-light hover:text-primary transition-colors sm:hidden"
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
