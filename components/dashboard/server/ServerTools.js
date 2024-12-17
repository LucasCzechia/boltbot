// components/dashboard/server/ServerTools.js
import { Search, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useServer } from '@/context/ServerContext';

const TOOL_DESCRIPTIONS = {
  BrowseInternet: "Allow BoltBot⚡ to search and retrieve current information from the internet.",
  GenerateImages: "Create images using DALL-E 3 with detailed text prompts",
  CurrencyConverter: "Convert between different currencies in real-time.",
  GetWeather: "Fetch current weather conditions for any location.",
  GetTime: "Get accurate time for different time zones.",
  ReactEmojis: "Add emoji reactions to messages.",
  CreateFiles: "Generate and manage text-based files.",
  RunPython: "Execute Python code in a secure environment.",
  GoogleImages: "Search and retrieve images from Google."
};

export default function ServerTools({ settings, handleSettingChange, searchQuery, setSearchQuery, isEditing, setIsEditing }) {
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
      
      toast.success('Tool settings saved successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to save tool settings');
    }
  };

  const filteredTools = Object.entries(settings.tools).filter(([key]) =>
    key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    TOOL_DESCRIPTIONS[key].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="content-section">
      <div className="content-header">
        <h1>Tools</h1>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search tools..."
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

      <div className="tools-grid">
        {filteredTools.map(([key, value]) => (
          <motion.div
            key={key}
            className="tool-card"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="tool-content">
              <h3>{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <p>{TOOL_DESCRIPTIONS[key]}</p>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleSettingChange('tools', key, e.target.checked)}
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
