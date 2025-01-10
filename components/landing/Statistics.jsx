// components/landing/Statistics.jsx
import { useState, useEffect } from 'react';
import LandingContentContainer from './LandingContentContainer';
import { BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = 'https://www.boltbot.app/api/stats';
const UPTIME_KEY = 'bot_uptime_start';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

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

  const formatTime = () => {
    if (!stats?.status) return '0d, 0h, 0m, 0s';

    if (stats.status.state === 'online') {
        const uptimeStart = parseInt(localStorage.getItem(UPTIME_KEY) || Date.now());
        const totalUptimeSeconds = Math.floor((currentTime - uptimeStart) / 1000);
        const days = Math.floor(totalUptimeSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalUptimeSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalUptimeSeconds % (60 * 60)) / 60);
        const seconds = totalUptimeSeconds % 60;

        return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
    } else {
         return '0d, 0h, 0m, 0s';
    }
  };

  if (isLoading || error) {
    return (
      <div className="stats-loading">
        <div className="stats-loading-pulse">
          <span className="stats-loading-text">Awaiting Statistics</span>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="landing-statistics" id="statistics">
      <LandingContentContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={fadeInUp} className="landing-container-title">
            <BarChart size={24} />
            Live Statistics
          </motion.h2>

          <motion.div 
            className="landing-status-bar"
            variants={fadeInUp}
          >
            <div className="landing-status-item">
              <div
                className="landing-status-indicator"
                style={{
                  backgroundColor: stats?.status?.state === 'online' 
                    ? 'var(--status-online)'
                    : 'var(--status-offline)',
                  boxShadow: `0 0 10px ${
                    stats?.status?.state === 'online'
                      ? 'var(--status-online)'
                      : 'var(--status-offline)'
                  }`,
                }}
              />
              <span>
                System{' '}
                {stats?.status?.state === 'idle'
                  ? 'Offline'
                  : stats?.status?.state 
                  ? stats.status.state.charAt(0).toUpperCase() + stats.status.state.slice(1)
                  : 'Unknown'}
              </span>
            </div>
            <div className="landing-status-item">
              <span>Response Time:</span>
              <div className="w-24">
                <div className="landing-response-gauge">
                  <motion.div
                    className="landing-gauge-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min(100, Math.max(0, (200 - (stats?.status?.responseTime || 0)) / 2))}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <div className="text-right text-sm text-primary">
                  {stats?.status?.responseTime || 0}ms
                </div>
              </div>
            </div>
            <div className="landing-status-item">
              <span>{stats?.status?.state === 'online' ? 'Uptime' : 'Downtime'}:</span>
              <span className="text-primary">{formatTime()}</span>
            </div>
          </motion.div>

          <motion.div 
            className="landing-stats-grid"
            variants={containerVariants}
          >
            <motion.div 
              className="landing-stats-card"
              variants={fadeInUp}
            >
              <h3>🌐 Global Reach</h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Currently serving{' '}
                <motion.span 
                  className="landing-highlight"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {stats?.guilds?.toLocaleString() || 0}
                </motion.span>{' '}
                servers worldwide
              </motion.p>
            </motion.div>

            <motion.div 
              className="landing-stats-card"
              variants={fadeInUp}
            >
              <h3>👥 Active Users</h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Over{' '}
                <motion.span 
                  className="landing-highlight"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {stats?.users?.toLocaleString() || 0}
                </motion.span>{' '}
                users and growing
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </LandingContentContainer>
    </section>
  );
};

export default Statistics;
