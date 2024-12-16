// components/dashboard/server/ServerHeader.js
import Image from 'next/image';

export default function ServerHeader({ server }) {
  const getServerIcon = () => {
    if (!server.icon) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(server.name)}&background=1a1a1a&color=ffcc00&size=80`;
    }
    return `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith('a_') ? 'gif' : 'png'}?size=80`;
  };

  return (
    <div className="server-header animate-fade-in">
      <Image 
        src={getServerIcon()}
        alt={`${server.name} Icon`}
        width={80}
        height={80}
        className="server-icon"
        unoptimized
      />
      <div className="server-info">
        <h1>{server.name}</h1>
        <div className="server-stats">
          <div className="stat-item">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span className="stat-value">{server.memberCount.toLocaleString()}</span> Members
            <span className="online-count">{server.onlineCount.toLocaleString()} online</span>
          </div>
          <div className="stat-item">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span className="stat-value">24/7</span> Uptime
          </div>
          <div className="stat-item">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span className="stat-value">
              {server.botPresent ? 'Active' : 'Inactive'}
            </span>
            <span className={`status-dot ${server.botPresent ? 'active' : 'inactive'}`}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
