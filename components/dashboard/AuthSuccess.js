// components/dashboard/AuthSuccess.js
import React from 'react';
import { useRouter } from 'next/router';

const AuthSuccess = () => {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/dashboard/servers');
    }, 6000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleSkip = () => {
    router.replace('/dashboard/servers');
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
          <p>Redirecting automatically...</p>
          <button onClick={handleSkip} className="skip-button">
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;
