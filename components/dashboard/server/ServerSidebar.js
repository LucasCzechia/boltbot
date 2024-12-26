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
    <aside className="dashboard-sidebar">
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
              transition={{ 
                delay: index * 0.1,
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{
                '--item-color': item.color
              }}
            >
              {/* Icon shows in both views */}
              <div className="nav-item-icon">
                <Icon size={24} />
              </div>

              {/* Mobile label */}
              <span className="mobile-label">{item.label}</span>
              
              {/* Desktop-only content */}
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
