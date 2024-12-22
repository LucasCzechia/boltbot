// components/dashboard/servers/LoadingPreview.js
export default function LoadingPreview({ count = 0 }) {
  return (
    <div className="servers-grid loading">
      {[...Array(count)].map((_, index) => (
        <div 
          key={index} 
          className="loading-card"
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          <div className="skeleton-header">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-info">
              <div className="skeleton-title"></div>
              <div className="skeleton-subtitle"></div>
              <div className="skeleton-stats"></div>
            </div>
          </div>
          <div className="skeleton-status"></div>
          <div className="loading-shimmer"></div>
        </div>
      ))}
    </div>
  );
}
