// components/dashboard/servers/LoadingPreview.js
import React from 'react'

export default function LoadingPreview() {
  return (
    <div className="servers-grid loading">
      {[...Array(2)].map((_, rowIndex) => (
        <div key={rowIndex} className="loading-row">
          {[...Array(3)].map((_, cardIndex) => (
            <div 
              key={cardIndex} 
              className="loading-card"
              style={{
                animationDelay: `${(rowIndex * 3 + cardIndex) * 100}ms`
              }}
            >
              <div className="skeleton-header">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-info">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-subtitle"></div>
                </div>
              </div>
              <div className="skeleton-status"></div>
              <div className="loading-shimmer"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
