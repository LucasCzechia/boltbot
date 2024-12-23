// components/dashboard/server/ServerFeatures.js
import { Search, Save, Camera, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURE_INFO = {
  ImageRecognition: {
    icon: Camera,
    name: "Image Recognition",
    description: "Advanced AI-powered image analysis that can identify objects, text, and context in images shared in conversations"
  },
  FileHandling: {
    icon: FileText,
    name: "File Management",
    description: "Comprehensive file system integration allowing viewing, editing, and organizing text-based files directly within Discord"
  }
};

export default function ServerFeatures({ 
  settings, 
  handleSettingChange, 
  searchQuery, 
  setSearchQuery, 
  isEditing,
  saveSettings,
  isSaving,
  loading
}) {
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

        <div className="features-grid">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="feature-card loading">
              <div className="feature-content">
                <div className="feature-header">
                  <div className="skeleton-icon"></div>
                  <div className="skeleton-title"></div>
                </div>
                <div className="skeleton-text"></div>
                <div className="skeleton-toggle"></div>
              </div>
              <div className="loading-shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Ensure settings.features exists before filtering
  const features = settings?.features || {};
  const filteredFeatures = Object.entries(FEATURE_INFO)
    .filter(([key]) =>
      FEATURE_INFO[key].name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      FEATURE_INFO[key].description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(([key]) => [key, features[key] || false]);

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

      <div className="features-grid">
        {filteredFeatures.map(([key, value]) => {
          const FeatureIcon = FEATURE_INFO[key].icon;
          return (
            <motion.div
              key={key}
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="feature-content">
                <div className="feature-header">
                  <FeatureIcon size={24} className="feature-icon" />
                  <h3>{FEATURE_INFO[key].name}</h3>
                </div>
                <p>{FEATURE_INFO[key].description}</p>
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
          );
        })}
      </div>
    </div>
  );
}
