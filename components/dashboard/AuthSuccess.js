// components/dashboard/AuthSuccess.js
import React, { useState, useEffect } from 'react';

const AuthSuccess = ({ onRedirect }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      onRedirect();
    }
  }, [countdown, onRedirect]);

  const handleSkip = () => {
    setCountdown(0);
  };

  return (
    <div className="auth-success-overlay">
      <div className="auth-success-card">
        <div className="checkmark-wrapper">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="23" fill="none"/>
            <path className="checkmark-path" d="M16 26l7.5 7.5L38 18" fill="none"/>
          </svg>
        </div>

        <h1 className="success-title">Authentication Complete!</h1>
        <p className="success-message">Welcome to BoltBot Dashboard</p>
        
        <div className="redirect-info">
          <p>Redirecting automatically in <span className="countdown">{countdown}</span></p>
          <button onClick={handleSkip} className="skip-button">
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;