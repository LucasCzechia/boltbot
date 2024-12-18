// components/dashboard/server/ServerHeader.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Users, Circle } from 'lucide-react';
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
      <div className="server-header">
        <div className="server-header-content loading">
          <div className="skeleton-avatar"></div>
          <div className="server-header-info">
            <div className="skeleton-title"></div>
            <div className="skeleton-stats">
              <div className="skeleton-stat"></div>
              <div className="skeleton-stat"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !serverData) {
    return (
      <div className="server-header">
        <div className="server-header-content error">
          <div className="server-header-info">
            <h1>Unable to load server information</h1>
            <div className="server-stats">
              <div className="stat-item">
                <span>Please try refreshing the page</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="server-header">
      <div className="server-header-content">
        <Image 
          src={serverData.icon 
            ? `https://cdn.discordapp.com/icons/${serverData.id}/${serverData.icon}.${serverData.icon.startsWith('a_') ? 'gif' : 'png'}?size=128` 
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(serverData.name)}&background=1a1a1a&color=ffcc00&size=128`
          }
          alt={serverData.name}
          width={64}
          height={64}
          className="server-header-icon"
          unoptimized
        />
        <div className="server-header-info">
          <h1>{serverData.name}</h1>
          <div className="server-stats">
            <div className="stat-item">
              <Users size={16} />
              <span>{serverData.memberCount?.toLocaleString() || '0'} members</span>
            </div>
            <div className="stat-item">
              <Circle size={16} className="online-indicator" />
              <span>{serverData.onlineCount?.toLocaleString() || '0'} online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
