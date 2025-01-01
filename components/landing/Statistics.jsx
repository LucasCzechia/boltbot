// components/landing/Statistics.jsx
import { useState, useEffect } from 'react';
import ContentContainer from './ContentContainer';

const API_URL = 'https://www.boltbot.app/api/stats';
const UPTIME_KEY = 'bot_uptime_start';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch stats: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
          if (!localStorage.getItem(UPTIME_KEY)) {
          const totalSeconds = (data.status.uptimeDays * 24 * 60 * 60) + 
                             (data.status.uptimeHours * 60 * 60);
          const uptimeStart = Date.now() - (totalSeconds * 1000);
          localStorage.setItem(UPTIME_KEY, uptimeStart.toString());
        }
        
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    const fetchInterval = setInterval(fetchStats, 5 * 60 * 1000);
    
    const timeInterval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    
    return () => {
      clearInterval(fetchInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const formatUptime = () => {
    if (!stats?.status) return '0d, 0h, 0m, 0s';
    
    const uptimeStart = parseInt(localStorage.getItem(UPTIME_KEY) || Date.now());
    const totalSeconds = Math.floor((currentTime - uptimeStart) / 1000);
    
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    
    return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
  };

  if (isLoading) {
    return (
      <section className="statistics-section" id="statistics">
        <h2 className="section-title">Live Statistics</h2>
        <div className="flex items-center justify-center p-4">
          <div className="animate-pulse text-lg">Loading statistics...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="statistics-section" id="statistics">
        <h2 className="section-title">Live Statistics</h2>
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
          <p className="text-red-700">Unable to load statistics: {error}</p>
          <p className="text-sm text-red-500 mt-2">Please try again later or contact support if the issue persists.</p>
        </div>
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
              backgroundColor: stats?.status?.state === 'online' 
                ? 'var(--status-online)'
                : stats?.status?.state === 'idle'
                ? 'var(--status-idle)'
                : 'var(--status-offline)',
              boxShadow: `0 0 10px ${
                stats?.status?.state === 'online'
                  ? 'var(--status-online)'
                  : stats?.status?.state === 'idle'
                  ? 'var(--status-idle)'
                  : 'var(--status-offline)'
              }`,
            }}
          />
          <span>
            System{' '}
            {stats?.status?.state 
              ? stats.status.state.charAt(0).toUpperCase() + stats.status.state.slice(1)
              : 'Unknown'}
          </span>
        </div>
        <div className="status-item">
          <span>Response Time:</span>
          <div className="w-24">
            <div className="response-gauge">
              <div
                className="gauge-fill"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(0, (200 - (stats?.status?.responseTime || 0)) / 2)
                  )}%`,
                }}
              />
            </div>
            <div className="text-right text-sm text-primary">
              {stats?.status?.responseTime || 0}ms
            </div>
          </div>
        </div>
        <div className="status-item">
          <span>Uptime:</span>
          <span className="text-primary">{formatUptime()}</span>
        </div>
      </div>
      <div className="stats-grid">
        <div className="stats-card">
          <h3>🌐 Global Reach</h3>
          <p>
            Currently serving{' '}
            <span className="highlight">{stats?.guilds?.toLocaleString() || 0}</span>{' '}
            servers worldwide
          </p>
        </div>
        <div className="stats-card">
          <h3>👥 Active Users</h3>
          <p>
            Over{' '}
            <span className="highlight">{stats?.users?.toLocaleString() || 0}</span>{' '}
            users and growing
          </p>
        </div>
      </div>
    </section>
   </ContentContainer>
  );
};

export default Statistics;
