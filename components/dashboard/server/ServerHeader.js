// components/dashboard/server/ServerHeader.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

export default function ServerHeader() {
  const router = useRouter();
  const { id: serverId } = router.query;
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServerData = async () => {
      if (!serverId) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/discord/servers/${serverId}`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch server data: ${response.statusText}`);
        }

        const data = await response.json();
        setServerData(data);
      } catch (error) {
        console.error('Error fetching server data:', error);
        setError(error.message);
        toast.error('Failed to load server information');
      } finally {
        setLoading(false);
      }
    };

    if (serverId) {
      fetchServerData();
    }

    return () => {
      setServerData(null);
      setLoading(true);
      setError(null);
    };
  }, [serverId]);

  if (loading) {
    return (
      <div className="server-dashboard-header">
        <div className="server-dashboard-content loading">
          <div className="server-dashboard-skeleton-avatar"></div>
          <div className="server-dashboard-info">
            <div className="server-dashboard-skeleton-text"></div>
            <div className="server-dashboard-skeleton-stats">
              <div className="server-dashboard-skeleton-stat"></div>
              <div className="server-dashboard-skeleton-stat"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !serverData) {
    return (
      <div className="server-dashboard-header">
        <div className="server-dashboard-content error">
          <div className="server-dashboard-info">
            <h1>Unable to load server information</h1>
            <div className="server-dashboard-stats">
              <div className="server-dashboard-stat">
                <span>Please try refreshing the page</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="server-dashboard-header">
      <div className="server-dashboard-content">
        <Image 
          src={serverData.icon 
            ? `https://cdn.discordapp.com/icons/${serverData.id}/${serverData.icon}.${serverData.icon.startsWith('a_') ? 'gif' : 'png'}?size=128` 
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(serverData.name)}&background=1a1a1a&color=ffcc00&size=128`
          }
          alt={serverData.name}
          width={64}
          height={64}
          className="server-dashboard-avatar"
          unoptimized
        />
        <div className="server-dashboard-info">
          <h1>{serverData.name}</h1>
          <div className="server-dashboard-stats">
            <div className="server-dashboard-stat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span className="server-dashboard-member-count">{serverData.memberCount?.toLocaleString() || '0'}</span> members 
              <span className="server-dashboard-online-count">{serverData.onlineCount?.toLocaleString() || '0'} online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
