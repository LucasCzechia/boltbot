// components/dashboard/server/sections/Logs.js
import { useState } from 'react';

export default function Logs({ serverId }) {
  const [filterType, setFilterType] = useState('all');
  
  // Example log data - replace with actual API call
  const logs = [
    {
      id: 1,
      type: 'info',
      title: 'Settings Updated',
      message: 'Bot name changed to "BoltBot⚡ Pro"',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: 2,
      type: 'success',
      title: 'Command Executed',
      message: 'Successfully generated AI image',
      timestamp: new Date(Date.now() - 900000)
    }
  ];

  const formatTime = (date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.round((date - new Date()) / (1000 * 60)),
      'minutes'
    );
  };

  return (
    <div className="dashboard-section">
      <div className="logs-controls">
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="log-filter"
        >
          <option value="all">All Events</option>
          <option value="info">Info</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
        </select>
      </div>

      <div className="logs-list">
        {logs.map((log) => (
          <div key={log.id} className={`log-item ${log.type}`}>
            <span className="log-time">{formatTime(log.timestamp)}</span>
            <div className="log-content">
              <h4>{log.title}</h4>
              <p>{log.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
