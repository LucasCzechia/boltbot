// components/dashboard/server/sections/Overview.js
import { useState } from 'react';

export default function Overview({ server }) {
  return (
    <div className="dashboard-section">
      <div className="overview-stats">
        <div className="stat-card">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <div className="stat-content">
            <h3>Total Members</h3>
            <p>{server.memberCount.toLocaleString()}</p>
            <span className="stat-detail">{server.onlineCount.toLocaleString()} online</span>
          </div>
        </div>

        <div className="stat-card">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <div className="stat-content">
            <h3>Uptime</h3>
            <p>99.9%</p>
            <span className="stat-detail">Last 30 days</span>
          </div>
        </div>

        <div className="stat-card">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <div className="stat-content">
            <h3>Bot Status</h3>
            <p>{server.botPresent ? 'Active' : 'Inactive'}</p>
            <span className={`status-dot ${server.botPresent ? 'active' : 'inactive'}`}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
