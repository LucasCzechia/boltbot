// components/dashboard/server/ServerSidebar.js
import { Settings2, Wrench, Zap, UserCog } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServerSidebar({ activeTab, setActiveTab }) {
  const sidebarItems = [
    {
      id: 'general',
      label: 'General',
      icon: Settings2,
      description: 'Configure basic bot settings and behavior',
      color: '#ffcc00'
    },
    {
      id: 'tools',
      label: 'Tools',
      icon: Wrench,
      description: 'Manage available bot tools and utilities',
      color: '#3498db'
    },
    {
      id: 'features',
      label: 'Features',
      icon: Zap,
      description: 'Control advanced bot features and capabilities',
      color: '#2ecc71'
    },
    {
      id: 'personality',
      label: 'Personality',
      icon: UserCog,
      description: 'Customize bot personality and behavior',
      color: '#e74c3c'
    }
  ];

  return (
    <aside className="server-settings-sidebar">
      <nav className="server-settings-nav">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              className={`server-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{
                '--item-color': item.color
              }}
            >
              <div className="server-nav-icon">
                <Icon size={24} />
              </div>

              <span className="server-nav-mobile-label">{item.label}</span>
              
              <div className="server-nav-content">
                <span className="server-nav-label">{item.label}</span>
                <span className="server-nav-description">{item.description}</span>
              </div>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}
