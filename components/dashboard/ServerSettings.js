// components/dashboard/server/ServerSettings.js
import { useState } from 'react';
import { personalityModes, features } from '@/utils/dashboard-config';

export default function ServerSettings({ serverId }) {
  const [botName, setBotName] = useState('BoltBot⚡');
  const [contextLength, setContextLength] = useState(15);
  const [selectedMode, setSelectedMode] = useState('default');
  const [enabledFeatures, setEnabledFeatures] = useState(
    features.reduce((acc, feature) => ({
      ...acc,
      [feature.id]: true
    }), {})
  );

  const handleFeatureToggle = (featureId) => {
    setEnabledFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  return (
    <div className="settings-grid">
      {/* Basic Settings Card */}
      <div className="settings-card animate-slide-in" style={{ animationDelay: '0.1s' }}>
        <div className="card-header">
          <h3 className="card-title">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Basic Settings
          </h3>
        </div>
        <div className="form-group">
          <label className="form-label">Bot Name</label>
          <input 
            type="text" 
            className="form-input" 
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            placeholder="Enter bot name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Context Length</label>
          <input 
            type="range" 
            className="range-input"
            min="1"
            max="30"
            value={contextLength}
            onChange={(e) => setContextLength(parseInt(e.target.value))}
          />
          <div className="range-labels">
            <span>1 message</span>
            <span>30 messages</span>
          </div>
          <div className="range-value">
            Current: {contextLength} messages
          </div>
        </div>
      </div>

      {/* Personality Mode Card */}
      <div className="settings-card animate-slide-in" style={{ animationDelay: '0.2s' }}>
        <div className="card-header">
          <h3 className="card-title">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Personality Mode
          </h3>
        </div>
        <div className="mode-selector">
          {personalityModes.map((mode) => (
            <div 
              key={mode.id}
              className={`mode-option ${selectedMode === mode.id ? 'active' : ''}`}
              onClick={() => setSelectedMode(mode.id)}
            >
              <div className="mode-icon">{mode.icon}</div>
              <div className="mode-details">
                <h4>{mode.name}</h4>
                <p>{mode.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Toggle Card */}
      <div className="settings-card animate-slide-in" style={{ animationDelay: '0.3s' }}>
        <div className="card-header">
          <h3 className="card-title">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            Features & Tools
          </h3>
        </div>
        <div className="feature-list">
          {features.map((feature) => (
            <div key={feature.id} className="feature-item">
              <div className="feature-info">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <div className="feature-details">
                  <h4>{feature.name}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={enabledFeatures[feature.id]}
                  onChange={() => handleFeatureToggle(feature.id)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
