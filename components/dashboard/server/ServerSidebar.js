// components/dashboard/server/ServerSidebar.js
import Image from 'next/image';
import { Settings, Wrench, Zap, UserCog } from 'lucide-react';

export default function ServerSidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <Image
          src="/images/boltbot.webp"
          alt="Server Icon"
          width={40}
          height={40}
          className="server-icon"
        />
        <h2>Dashboard</h2>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <Settings size={20} />
          General
        </button>
        <button
          className={`nav-item ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          <Wrench size={20} />
          Tools
        </button>
        <button
          className={`nav-item ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => setActiveTab('features')}
        >
          <Zap size={20} />
          Features
        </button>
        <button
          className={`nav-item ${activeTab === 'personality' ? 'active' : ''}`}
          onClick={() => setActiveTab('personality')}
        >
          <UserCog size={20} />
          Personality
        </button>
      </nav>
    </aside>
  );
}
