// components/landing/ContentContainer.jsx
import React from 'react';

export default function ContentContainer({ children, className = '' }) {
  return (
    <div className={`landing-content-container ${className}`}>
      <div className="landing-content-wrapper">
        {children}
      </div>
    </div>
  );
}
