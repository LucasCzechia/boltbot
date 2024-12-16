// components/dashboard/server/ServerHeader.js
import Image from 'next/image';
import { useServer } from '@/context/ServerContext';
import { Users, Circle } from 'lucide-react';

export default function ServerHeader() {
  const { server } = useServer();

  if (!server) return null;

  return (
    <div className="server-header">
      <div className="server-header-content">
        <Image 
          src={server.icon 
            ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith('a_') ? 'gif' : 'png'}?size=128` 
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(server.name)}&background=1a1a1a&color=ffcc00&size=128`
          }
          alt={server.name}
          width={64}
          height={64}
          className="server-header-icon"
          unoptimized
        />
        <div className="server-header-info">
          <h1>{server.name}</h1>
          <div className="server-stats">
            <div className="stat-item">
              <Users size={16} />
              <span>{server.memberCount.toLocaleString()} members</span>
            </div>
            <div className="stat-item">
              <Circle size={16} className="online-indicator" />
              <span>{server.onlineCount.toLocaleString()} online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
