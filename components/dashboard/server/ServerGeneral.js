// components/dashboard/server/ServerGeneral.js
import { Search, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function ServerGeneral({ 
  settings, 
  handleSettingChange, 
  searchQuery, 
  setSearchQuery, 
  isEditing, 
  saveSettings,
  isSaving,
  loading
}) {
  const rangeRef = useRef(null);

  useEffect(() => {
    if (rangeRef.current) {
      const progress = (settings.contextLength - 1) / 29 * 100;
      rangeRef.current.style.setProperty('--range-progress', `${progress}%`);
    }
  }, [settings.contextLength]);

  // Define only the main marker points
  const markerValues = [1, 10, 20, 30];

  if (loading) {
    return (
      <div className="content-section">
        <div className="content-header">
          <div className="skeleton-title"></div>
          <div className="header-actions">
            <div className="search-bar">
              <Search size={20} />
              <div className="skeleton-input"></div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="setting-group">
            <div className="skeleton-label"></div>
            <div className="skeleton-input"></div>
            <div className="skeleton-text"></div>
          </div>

          <div className="setting-group">
            <div className="skeleton-label"></div>
            <div className="skeleton-range">
              <div className="skeleton-track"></div>
              <div className="skeleton-thumb"></div>
            </div>
            <div className="skeleton-text"></div>
          </div>
        </div>
      </div>
    );
  }

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
              disabled={isSaving}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Save size={20} />
              {isSaving ? 'Saving...' : 'Save Changes'}
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
            <div className="range-markers">
              {markerValues.map(value => (
                <div
                  key={value}
                  className={`range-marker ${settings.contextLength >= value ? 'active' : ''}`}
                  data-value={value}
                  style={{
                    left: `${((value - 1) / 29) * 100}%`
                  }}
                />
              ))}
            </div>
            <input
              ref={rangeRef}
              type="range"
              min="1"
              max="30"
              value={settings.contextLength}
              onChange={(e) => handleSettingChange('contextLength', null, parseInt(e.target.value))}
              className="range-slider"
            />
            <div className="range-value">{settings.contextLength} messages</div>
          </div>
          <span className="setting-help">Number of previous messages BoltBot⚡ will remember in conversations.</span>
        </div>
      </div>
    </div>
  );
}
