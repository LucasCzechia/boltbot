// components/dashboard/LoadingPreview.js
import React from 'react'

export default function LoadingPreview() {
  return (
    <div className="servers-grid">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="server-card loading-card"
          style={{
            animationDelay: `${index * 200}ms`
          }}
        >
          <div className="server-header">
            <div className="skeleton-avatar"></div>
            <div className="server-info">
              <div className="skeleton-text skeleton-title"></div>
              <div className="skeleton-text skeleton-subtitle"></div>
            </div>
          </div>
          <div className="skeleton-status"></div>
          <div className="loading-shimmer"></div>
        </div>
      ))}
    </div>
  )
}
