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

  useEffect(() => {
    const fetchServerData = async () => {
      if (!serverId) return;

      try {
        const response = await fetch(`/api/discord/servers/${serverId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch server data');
        }

        const data = await response.json();
        setServerData(data);
      } catch (error) {
        console.error('Error fetching server data:', error);
        toast.error('Failed to load server information');
      } finally {
        setLoading(false);
      }
    };

    fetchServerData();
  }, [serverId]);

  if (loading) {
    return (
      <div className="server-header">
        <div className="server-header-content loading">
          <div className="skeleton-avatar"></div>
          <div className="server-info">
            <div className="skeleton-title"></div>
            <div className="skeleton-stats"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!serverData) return null;

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
              <span>{serverData.memberCount.toLocaleString()} members</span>
            </div>
            <div className="stat-item">
              <Circle size={16} className="online-indicator" />
              <span>{serverData.onlineCount.toLocaleString()} online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
