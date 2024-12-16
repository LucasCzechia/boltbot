// components/dashboard/server/sections/Settings.js
import { useState } from 'react';
import { personalityModes } from '../../../../utils/dashboard-config';

export default function Settings({ onSettingChange }) {
  const [botName, setBotName] = useState('BoltBot⚡');
  const [contextLength, setContextLength] = useState(15);
  const [selectedMode, setSelectedMode] = useState('default');

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    onSettingChange();
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    onSettingChange();
  };

  return (
    <div className="dashboard-section">
      <div className="settings-grid">
        <div className="settings-card">
          <h3>Basic Settings</h3>
          <div className="form-group">
            <label>Bot Name</label>
            <input
              type="text"
              value={botName}
              onChange={handleInputChange(setBotName)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Context Length</label>
            <input
              type="range"
              min="1"
              max="30"
              value={contextLength}
              onChange={handleInputChange(setContextLength)}
              className="range-input"
            />
            <div className="range-value">{contextLength} messages</div>
          </div>
        </div>

        <div className="settings-card">
          <h3>Personality Mode</h3>
          <div className="mode-grid">
            {personalityModes.map((mode) => (
              <button
                key={mode.id}
                className={`mode-card ${selectedMode === mode.id ? 'active' : ''}`}
                onClick={() => handleModeChange(mode.id)}
              >
                <div className="mode-icon">{mode.icon}</div>
                <h4>{mode.name}</h4>
                <p>{mode.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
