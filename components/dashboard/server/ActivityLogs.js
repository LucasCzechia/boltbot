// components/dashboard/server/ActivityLogs.js
import { useState } from 'react';

export default function ActivityLogs({ serverId }) {
  const [filterType, setFilterType] = useState('all');
  
  // Dummy data for demonstration
  const logs = [
    {
      id: 1,
      type: 'info',
      title: 'Settings Updated',
      message: 'Bot name changed to "BoltBot⚡ Pro"',
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: 2,
      type: 'success',
      title: 'Command Executed',
      message: 'Successfully generated AI image',
      timestamp: new Date(Date.now() - 900000).toISOString(),
    },
    {
      id: 3,
      type: 'warning',
      title: 'Rate Limit Warning',
      message: 'Approaching API rate limit (80%)',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    }
  ];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const getIcon = (type) => {
    switch (type) {
      case 'info':
        return (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        );
      case 'success':
        return (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        );
      case 'warning':
        return (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="logs-section animate-fade-in">
      <div className="logs-header">
        <h3 className="card-title">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          Activity Logs
        </h3>
        <div className="logs-controls">
          <select 
            className="log-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Events</option>
            <option value="info">Information</option>
            <option value="success">Success</option>
            <option value="warning">Warnings</option>
          </select>
          <button className="log-filter">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Search Logs
          </button>
          <button className="log-filter">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export Logs
          </button>
        </div>
      </div>
      <div className="logs-list">
        {logs
          .filter(log => filterType === 'all' || log.type === filterType)
          .map((log) => (
            <div key={log.id} className="log-item">
              <div className={`log-icon ${log.type}`}>
                {getIcon(log.type)}
              </div>
              <div className="log-content">
                <div className="log-header">
                  <span className="log-title">{log.title}</span>
                  <span className="log-timestamp">{formatTimestamp(log.timestamp)}</span>
                </div>
                <p className="log-message">{log.message}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
          }
