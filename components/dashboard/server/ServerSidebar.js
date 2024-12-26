// components/dashboard/server/ServerSidebar.js
import Image from 'next/image';
import { Settings2, Wrench, Zap, UserCog } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServerSidebar({ activeTab, setActiveTab }) {
  const sidebarItems = [
    {
      id: 'general',
      label: 'General',
      icon: Settings2,
      description: 'Configure basic bot settings and behavior'
    },
    {
      id: 'tools',
      label: 'Tools',
      icon: Wrench,
      description: 'Manage available bot tools and utilities'
    },
    {
      id: 'features',
      label: 'Features',
      icon: Zap,
      description: 'Control advanced bot features and capabilities'
    },
    {
      id: 'personality',
      label: 'Personality',
      icon: UserCog,
      description: 'Customize bot personality and behavior'
    }
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <Image
          src="/images/boltbot.webp"
          alt="BoltBot Logo"
          width={40}
          height={40}
          className="server-icon"
        />
        <h2>Dashboard</h2>
      </div>

      <nav className="sidebar-nav">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Icon size={24} />
              {/* This span shows on mobile */}
              <span className="mobile-label">{item.label}</span>
              
              {/* This div only shows on desktop */}
              <div className="nav-item-content">
                <span className="nav-item-label">{item.label}</span>
                <span className="nav-item-description">{item.description}</span>
              </div>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}
