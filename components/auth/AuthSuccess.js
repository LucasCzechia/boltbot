// components/auth/AuthSuccess.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthSuccess = () => {
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/dashboard/servers');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  useEffect(() => {
    const generateStarfield = () => {
      const starfieldContainer = document.getElementById('starfield-background');
      if (starfieldContainer) {
        for (let i = 0; i < 100; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.left = Math.random() * 100 + '%';
          star.style.top = Math.random() * 100 + '%';
          star.style.animationDelay = Math.random() * 2 + 's';
          starfieldContainer.appendChild(star);
        }
      }
    };

    generateStarfield();
  }, []);

  const handleSkip = () => {
    setCountdown(0);
    router.push('/dashboard/servers');
  };

  return (
    <div className="auth-success-overlay">
      <div id="starfield-background" className="starfield-container" />
      <div className="auth-success-card">
        <div className="checkmark-wrapper">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="23" fill="none"/>
            <path className="checkmark-path" d="M16 26l7.5 7.5L38 18" fill="none"/>
          </svg>
        </div>

        <h1 className="success-title">Authentication Complete!</h1>
        <p className="success-message">Welcome to the BoltBot⚡ Dashboard</p>
        
        <div className="redirect-info">
          <p>Redirecting automatically in <span className="countdown">{countdown}</span> seconds</p>
          <button onClick={handleSkip} className="skip-button">
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;
