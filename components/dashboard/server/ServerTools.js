// components/dashboard/server/ServerTools.js
import { Search, Save, Globe, Image, DollarSign, Cloud, Clock, Smile, FileText, Code, Search as SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useServer } from '@/context/ServerContext';

const TOOL_INFO = {
  BrowseInternet: {
    icon: Globe,
    name: "Browse Internet",
    description: "Search and retrieve real-time information from across the web with advanced filtering capabilities"
  },
  GenerateImages: {
    icon: Image,
    name: "AI Image Generation",
    description: "Create stunning, unique images using DALL-E 3 AI with detailed text prompts and customization"
  },
  CurrencyConverter: {
    icon: DollarSign,
    name: "Currency Converter",
    description: "Convert between 170+ global currencies with real-time exchange rates and historical data"
  },
  GetWeather: {
    icon: Cloud,
    name: "Weather Updates",
    description: "Access detailed weather forecasts, current conditions, and atmospheric data for any location"
  },
  GetTime: {
    icon: Clock,
    name: "World Clock",
    description: "Display accurate time across multiple time zones with daylight savings support"
  },
  ReactEmojis: {
    icon: Smile,
    name: "Message Reactions",
    description: "Add expressive emoji reactions to messages with custom animation effects"
  },
  CreateFiles: {
    icon: FileText,
    name: "File Management",
    description: "Create, edit, and manage text-based files with syntax highlighting and formatting"
  },
  RunPython: {
    icon: Code,
    name: "Python Executor",
    description: "Run Python code in a secure sandbox environment with package support and error handling"
  },
  GoogleImages: {
    icon: SearchIcon,
    name: "Image Search",
    description: "Search and retrieve high-quality images from Google with advanced filtering options"
  }
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
    TOOL_INFO[key].name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    TOOL_INFO[key].description.toLowerCase().includes(searchQuery.toLowerCase())
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
        {filteredTools.map(([key, value]) => {
          const ToolIcon = TOOL_INFO[key].icon;
          return (
            <motion.div
              key={key}
              className="tool-card"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="tool-content">
                <div className="tool-header">
                  <ToolIcon size={24} className="tool-icon" />
                  <h3>{TOOL_INFO[key].name}</h3>
                </div>
                <p>{TOOL_INFO[key].description}</p>
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
          );
        })}
      </div>
    </div>
  );
}
