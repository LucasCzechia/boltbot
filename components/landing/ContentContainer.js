// components/landing/ContentContainer.jsx
import React from 'react';

export default function ContentContainer({ children, className = '' }) {
  return (
    <div className={`content-container ${className}`}>
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  );
}
