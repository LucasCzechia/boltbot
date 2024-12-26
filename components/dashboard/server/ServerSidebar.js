// components/dashboard/server/ServerSidebar.js
import { Settings2, Wrench, Zap, UserCog } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServerSidebar({ activeTab, setActiveTab }) {
  const sidebarItems = [
    {
      id: 'general',
      label: 'General Settings',
      shortLabel: 'General',
      icon: Settings2,
      description: 'Configure basic bot settings and behavior',
      color: '#ffcc00'
    },
    {
      id: 'tools',
      label: 'Bot Tools',
      shortLabel: 'Tools',
      icon: Wrench,
      description: 'Manage available bot tools and utilities',
      color: '#3498db'
    },
    {
      id: 'features',
      label: 'Bot Features',
      shortLabel: 'Features',
      icon: Zap,
      description: 'Control advanced bot features and capabilities',
      color: '#2ecc71'
    },
    {
      id: 'personality',
      label: 'Bot Personality',
      shortLabel: 'Personality',
      icon: UserCog,
      description: 'Customize bot personality and behavior',
      color: '#e74c3c'
    }
  ];

  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 1024 : false;

  return (
    <aside className="dashboard-sidebar">
      <nav className={`sidebar-nav ${isMobile ? 'mobile' : ''}`}>
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
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
              <div className="nav-item-icon">
                <Icon size={24} />
              </div>
              
              {/* Mobile Label */}
              <span className="mobile-label">{item.shortLabel}</span>
              
              {/* Desktop Content */}
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
