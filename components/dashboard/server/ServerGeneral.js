// components/dashboard/server/ServerGeneral.js
import { Search, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useServer } from '@/context/ServerContext';

export default function ServerGeneral({ settings, handleSettingChange, searchQuery, setSearchQuery, isEditing, setIsEditing }) {
  const { server } = useServer();
  
  const saveSettings = async () => {
    try {
      await fetch(`/api/discord/servers/${server.id}/settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      
      toast.success('Settings saved successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  return (
    <div className="content-section">
      <div className="content-header">
        <h1>General Settings</h1>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {isEditing && (
            <motion.button
              className="save-button"
              onClick={saveSettings}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Save size={20} />
              Save Changes
            </motion.button>
          )}
        </div>
      </div>

      <div className="settings-section">
        <div className="setting-group">
          <label>Bot Name</label>
          <input
            type="text"
            value={settings.botName}
            onChange={(e) => handleSettingChange('botName', null, e.target.value)}
            maxLength={32}
            className="setting-input"
          />
          <span className="setting-help">This name will be used in responses and commands.</span>
        </div>

        <div className="setting-group">
          <label>Context Length</label>
          <div className="range-input">
            <input
              type="range"
              min="1"
              max="30"
              value={settings.contextLength}
              onChange={(e) => handleSettingChange('contextLength', null, parseInt(e.target.value))}
              className="range-slider"
            />
            <span className="range-value">{settings.contextLength} messages</span>
          </div>
          <span className="setting-help">Number of previous messages BoltBot will remember in conversations.</span>
        </div>
      </div>
    </div>
  );
            }
