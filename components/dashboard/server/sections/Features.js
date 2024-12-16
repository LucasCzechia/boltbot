// components/dashboard/server/sections/Features.js
import { useState } from 'react';
import { features } from '../../../../utils/dashboard-config';

export default function Features({ onSettingChange }) {
  const [enabledFeatures, setEnabledFeatures] = useState(
    features.reduce((acc, feature) => ({
      ...acc,
      [feature.id]: true
    }), {})
  );

  const handleFeatureToggle = (featureId) => {
    setEnabledFeatures(prev => {
      const newState = {
        ...prev,
        [featureId]: !prev[featureId]
      };
      onSettingChange();
      return newState;
    });
  };

  return (
    <div className="dashboard-section">
      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                {feature.icon}
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
            <h3>{feature.name}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
