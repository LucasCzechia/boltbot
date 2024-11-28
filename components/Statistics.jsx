import { useState, useEffect } from 'react';

export default function Statistics() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('boltbot.app/api/stats');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError(err.message);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <section className="statistics-section" id="statistics">
        <h2 className="section-title">Live Statistics</h2>
        <p>Error fetching statistics: {error}</p>
      </section>
    );
  }

  if (!stats) {
    return (
      <section className="statistics-section" id="statistics">
        <h2 className="section-title">Live Statistics</h2>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="statistics-section" id="statistics">
      <h2 className="section-title">Live Statistics</h2>

      <div className="status-bar">
        <div className="status-item">
          <div
            className="status-indicator"
            style={{
              backgroundColor:
                stats.status.state === 'online'
                  ? 'var(--status-online)'
                  : stats.status.state === 'idle'
                  ? 'var(--status-idle)'
                  : 'var(--status-offline)',
              boxShadow: `0 0 10px ${
                stats.status.state === 'online'
                  ? 'var(--status-online)'
                  : stats.status.state === 'idle'
                  ? 'var(--status-idle)'
                  : 'var(--status-offline)'
              }`,
            }}
          />
          <span>
            System{' '}
            {stats.status.state.charAt(0).toUpperCase() + stats.status.state.slice(1)}
          </span>
        </div>

        <div className="status-item">
          <span>Response Time:</span>
          <div style={{ width: '100px' }}>
            <div className="response-gauge">
              <div
                className="gauge-fill"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(0, (200 - stats.status.responseTime) / 2)
                  )}%`,
                }}
              />
            </div>
            <div
              style={{
                textAlign: 'right',
                fontSize: '0.8rem',
                color: 'var(--primary)',
              }}
            >
              {stats.status.responseTime}ms
            </div>
          </div>
        </div>
        <div className="status-item">
          <span>Uptime:</span>
          <span style={{ color: 'var(--primary)' }}>
            {stats.status.uptimeDays}d {stats.status.uptimeHours}h
          </span>
        </div>
      </div>
      <div className="stats-grid">
        <div className="stats-card">
          <h3>🌐 Global Reach</h3>
          <p>
            Currently serving{' '}
            <span className="highlight">{stats.guilds.toLocaleString()}</span>{' '}
            servers worldwide
          </p>
        </div>
        <div className="stats-card">
          <h3>👥 Active Users</h3>
          <p>
            Over{' '}
            <span className="highlight">{stats.users.toLocaleString()}</span>{' '}
            users and growing
          </p>
        </div>
      </div>
    </section>
  );
}
