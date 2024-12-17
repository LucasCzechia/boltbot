// components/dashboard/server/ServerFeatures.js
import { Search, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useServer } from '@/context/ServerContext';

const FEATURE_DESCRIPTIONS = {
  ImageRecognition: "Allows BoltBot⚡ to view and see images in conversations.",
  FileHandling: "Allows BoltBot⚡ to view and interact with text-based files directly in conversations."
};

export default function ServerFeatures({ settings, handleSettingChange, searchQuery, setSearchQuery, isEditing, setIsEditing }) {
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
      
      toast.success('Feature settings saved successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to save feature settings');
    }
  };

  const filteredFeatures = Object.entries(settings.features).filter(([key]) =>
    key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    FEATURE_DESCRIPTIONS[key].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="content-section">
      <div className="content-header">
        <h1>Features</h1>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search features..."
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

      <div className="features-grid">
        {filteredFeatures.map(([key, value]) => (
          <motion.div
            key={key}
            className="feature-card"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="feature-content">
              <h3>{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <p>{FEATURE_DESCRIPTIONS[key]}</p>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleSettingChange('features', key, e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
