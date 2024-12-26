// components/dashboard/server/ServerFeatures.js
import { Zap, Camera, FileText, CircleSlash, Power, Search } from 'lucide-react';
import ServerSearch from './ServerSearch';
import { useState } from 'react';

const FEATURE_INFO = {
  ImageRecognition: {
    icon: Camera,
    name: "Image Recognition",
    description: "Advanced AI-powered image analysis for identifying objects and text"
  },
  FileHandling: {
    icon: FileText,
    name: "File Management",
    description: "Comprehensive file system for viewing and organizing text files"
  }
};

const filterOptions = [
  { id: 'all', label: 'All Features', icon: Search },
  { id: 'active', label: 'Enabled Only', icon: Power },
  { id: 'inactive', label: 'Disabled Only', icon: CircleSlash }
];

export default function ServerFeatures({
  settings,
  handleSettingChange,
  isEditing,
  saveSettings,
  isSaving,
  loading
}) {
  const [filteredFeatures, setFilteredFeatures] = useState(Object.entries(FEATURE_INFO));

  const handleSearch = ({ query, filter }) => {
    let filtered = Object.entries(FEATURE_INFO).filter(([key, feature]) => {
      const matchesSearch = 
        feature.name.toLowerCase().includes(query.toLowerCase()) ||
        feature.description.toLowerCase().includes(query.toLowerCase());

      if (filter === 'active') {
        return matchesSearch && settings.features[key];
      }
      if (filter === 'inactive') {
        return matchesSearch && !settings.features[key];
      }
      return matchesSearch;
    });

    setFilteredFeatures(filtered);
  };

  if (loading) {
    return <div className="content-section loading">...</div>;
  }

  return (
    <div className="content-section">
      <ServerSearch 
        onSearch={handleSearch}
        filterOptions={filterOptions}
        totalItems={filteredFeatures.length}
      />

      <div className="features-grid">
        {filteredFeatures.map(([key, feature]) => {
          const FeatureIcon = feature.icon;
          return (
            <div key={key} className="feature-card">
              <div className="feature-content">
                <div className="feature-header">
                  <FeatureIcon size={24} className="feature-icon" />
                  <h3>{feature.name}</h3>
                </div>
                <p>{feature.description}</p>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.features[key]}
                    onChange={(e) => handleSettingChange('features', key, e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
