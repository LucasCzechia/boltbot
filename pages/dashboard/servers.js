// pages/dashboard/servers.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Users, Crown, Bot } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import UserProfile from '@/components/dashboard/UserProfile';
import { useAuth } from '@/contexts/AuthContext';

export default function ServerSelection() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch('/api/servers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setServers(data);
      } catch (error) {
        console.error('Failed to fetch servers');
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  const handleServerClick = (server) => {
    if (server.botPresent) {
      router.push(`/dashboard/${server.id}`);
    } else {
      window.open(`https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&permissions=8&scope=bot&guild_id=${server.id}`, '_blank');
    }
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <nav className="dashboard-nav">
          <div className="nav-content">
            <h1 className="nav-title">BoltBot⚡</h1>
            <UserProfile user={user} />
          </div>
        </nav>
        <div className="loading-screen">
          <div className="loading-content">
            <div className="loading-logo">⚡</div>
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="dashboard-layout">
        <nav className="dashboard-nav">
          <div className="nav-content">
            <h1 className="nav-title">BoltBot⚡</h1>
            <UserProfile user={user} />
          </div>
        </nav>
        
        <div className="servers-container">
          <div className="servers-header">
            <h1 className="servers-title">Select a Server</h1>
            <p className="servers-subtitle">
              Choose a server to manage BoltBot⚡ settings
            </p>
          </div>

          <div className="servers-grid">
            {servers.map((server) => (
              <div
                key={server.id}
                className={`server-card ${!server.botPresent ? 'inactive' : ''}`}
                onClick={() => handleServerClick(server)}
                onMouseMove={handleMouseMove}
              >
                <div className="server-header">
                  {server.icon ? (
                    <Image
                      src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
                      alt={server.name}
                      width={64}
                      height={64}
                      className="server-icon"
                    />
                  ) : (
                    <div className="server-icon" />
                  )}
                  
                  <div className="server-info">
                    <h3 className="server-name">{server.name}</h3>
                    <div className="server-meta">
                      <span className="meta-item">
                        <Users size={14} />
                        {server.memberCount}
                      </span>
                      {server.ownerID === server.userId && (
                        <span className="meta-item">
                          <Crown size={14} />
                          Owner
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="server-status">
                  {server.botPresent ? (
                    <span className="status-badge active">
                      <Bot size={14} />
                      Bot Active
                    </span>
                  ) : (
                    <span className="status-badge inactive">
                      <Bot size={14} />
                      Invite Bot
                    </span> 
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
