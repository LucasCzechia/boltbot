// components/dashboard/servers/LoadingPreview.js
import React from 'react'

export default function LoadingPreview({ count = 9 }) {
  const rows = Math.ceil(count / 3)
  
  return (
    <div className="servers-grid loading">
      {[...Array(rows)].map((_, index) => {
        const cardsInRow = index === rows - 1 ? count % 3 || 3 : 3
        return (
          <div key={index} className="loading-row">
            {[...Array(cardsInRow)].map((_, cardIndex) => (
              <div 
                key={cardIndex} 
                className="loading-card"
                style={{
                  animationDelay: `${(index * 3 + cardIndex) * 100}ms`
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
        )
      })}
    </div>
  )
}
