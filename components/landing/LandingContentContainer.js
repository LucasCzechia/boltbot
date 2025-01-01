// components/landing/LandingContentContainer.jsx
import React from 'react';

const LandingContentContainer = ({ children }) => {
  return (
    <div className="landing-content-container">
      <div className="landing-content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default LandingContentContainer;
