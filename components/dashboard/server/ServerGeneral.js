// components/dashboard/server/ServerGeneral.js
import { Settings2, Bot, Globe, Users } from 'lucide-react';
import ServerSearch from './ServerSearch';
import { useState } from 'react';

const GENERAL_SETTINGS = {
  botName: {
    name: "Bot Name",
    description: "The name your bot will use in responses and commands",
    type: "text"
  },
  contextLength: {
    name: "Context Length",
    description: "Number of previous messages the bot will remember",
    type: "range"
  }
};

const filterOptions = [
  { id: 'all', label: 'All Settings', icon: Settings2 },
  { id: 'customized', label: 'Customized', icon: Bot },
  { id: 'default', label: 'Default', icon: Globe }
];

export default function ServerGeneral({
  settings,
  handleSettingChange,
  isEditing,
  saveSettings,
  isSaving,
  loading
}) {
  const [filteredSettings, setFilteredSettings] = useState(Object.entries(GENERAL_SETTINGS));
  const defaultSettings = {
    botName: 'BoltBot⚡',
    contextLength: 15
  };

  const handleSearch = ({ query, filter }) => {
    let filtered = Object.entries(GENERAL_SETTINGS).filter(([key, setting]) => {
      const matchesSearch = 
        setting.name.toLowerCase().includes(query.toLowerCase()) ||
        setting.description.toLowerCase().includes(query.toLowerCase());

      if (filter === 'customized') {
        return matchesSearch && settings[key] !== defaultSettings[key];
      }
      if (filter === 'default') {
        return matchesSearch && settings[key] === defaultSettings[key];
      }
      return matchesSearch;
    });

    setFilteredSettings(filtered);
  };

  if (loading) {
    return <div className="content-section loading">...</div>;
  }

  return (
    <div className="content-section">
      <ServerSearch 
        onSearch={handleSearch}
        filterOptions={filterOptions}
        totalItems={filteredSettings.length}
      />

      <div className="settings-section">
        {filteredSettings.map(([key, setting]) => (
          <div key={key} className="setting-group">
            <label>{setting.name}</label>
            {setting.type === 'text' ? (
              <input
                type="text"
                value={settings[key] || ''}
                onChange={(e) => handleSettingChange(key, null, e.target.value)}
                maxLength={32}
                className="setting-input"
              />
            ) : (
              <div className="range-input">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={settings[key] || 15}
                  onChange={(e) => handleSettingChange(key, null, parseInt(e.target.value))}
                  className="range-slider"
                />
                <span className="range-value">{settings[key] || 15} messages</span>
              </div>
            )}
            <span className="setting-help">{setting.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
