// components/dashboard/server/ServerTools.js
import { useState } from 'react';
import { Globe, Image, DollarSign, Cloud, Clock, Smile, FileText, Code, Search, Power, CircleSlash, Wrench } from 'lucide-react';
import ServerSearch from './ServerSearch';

const TOOL_INFO = {
  BrowseInternet: {
    icon: Globe,
    name: "Browse Internet",
    description: "Search and retrieve real-time information from across the web"
  },
  GenerateImages: {
    icon: Image,
    name: "AI Image Generation",
    description: "Create stunning, unique images using DALL-E 3"
  },
  CurrencyConverter: {
    icon: DollarSign,
    name: "Currency Converter",
    description: "Convert between global currencies with real-time rates"
  },
  GetWeather: {
    icon: Cloud,
    name: "Weather Updates",
    description: "Access detailed weather forecasts and conditions"
  },
  GetTime: {
    icon: Clock,
    name: "World Clock",
    description: "Display accurate time across multiple time zones"
  },
  ReactEmojis: {
    icon: Smile,
    name: "Message Reactions",
    description: "Add expressive emoji reactions to messages"
  },
  CreateFiles: {
    icon: FileText,
    name: "Create Files",
    description: "Create and manage text-based files"
  },
  RunPython: {
    icon: Code,
    name: "Python Executor",
    description: "Run Python code in a secure sandbox environment"
  }
};

const filterOptions = [
  { id: 'allTools', label: 'All Tools', icon: Search },
  { id: 'activeTools', label: 'Enabled Only', icon: Power },
  { id: 'inactiveTools', label: 'Disabled Only', icon: CircleSlash }
];

export default function ServerTools({ 
  settings, 
  handleSettingChange, 
  isEditing,
  saveSettings,
  isSaving,
  loading 
}) {
  const [filteredTools, setFilteredTools] = useState(Object.entries(TOOL_INFO));

  const handleSearch = ({ query, filter }) => {
    let filtered = Object.entries(TOOL_INFO).filter(([key, tool]) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase());
        
      if (filter === 'activeTools') {
        return matchesSearch && settings.tools[key];
      }
      if (filter === 'inactiveTools') {
        return matchesSearch && !settings.tools[key];
      }
      return matchesSearch;
    });

    setFilteredTools(filtered);
  };

  if (loading) {
    return <div className="content-section loading">...</div>;
  }

  return (
    <div className="content-section">
      <ServerSearch 
        onSearch={handleSearch}
        filterOptions={filterOptions}
        totalItems={filteredTools.length}
      />

      <div className="dashboard-container">
        <h2 className="container-title">
          <Wrench size={24} />
          Bot Tools
        </h2>
        <p className="container-description">
          Configure and manage the tools available to your bot. Enable or disable features based on your server's needs and customize their behavior.
        </p>

        <div className="tools-grid">
          {filteredTools.map(([key, tool]) => (
            <div 
              key={key} 
              className="tool-card"
            >
              <div className="tool-content">
                <div className="tool-header">
                  <tool.icon className="tool-icon" size={24} />
                  <h3>{tool.name}</h3>
                </div>
                <p>{tool.description}</p>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.tools[key]}
                    onChange={(e) => handleSettingChange('tools', key, e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
