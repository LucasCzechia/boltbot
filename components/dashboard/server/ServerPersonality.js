// components/dashboard/server/ServerPersonality.js
import { Search, Save, Bot, Brain, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const DEFAULT_PERSONALITIES = [
  { 
    id: 'default', 
    name: 'Default', 
    description: 'Casual and friendly conversational chatbot, eager to help with any query.',
    icon: Bot
  },
  { 
    id: 'assistant', 
    name: 'Assistant', 
    description: 'Professional, efficient, and knowledgeable, providing helpful and accurate answers.',
    icon: Brain
  },
  { 
    id: 'fancy', 
    name: 'Fancy', 
    description: 'A refined and eloquent conversational style, resembling that of a British gentleman.',
    icon: Crown
  }
];

export default function ServerPersonality({ 
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

        <div className="personality-grid">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="personality-card loading">
              <div className="personality-header">
                <div className="skeleton-icon"></div>
                <div className="skeleton-title"></div>
              </div>
              <div className="skeleton-text"></div>
              <div className="loading-shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const filteredPersonalities = DEFAULT_PERSONALITIES.filter(personality =>
    personality.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    personality.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="content-section">
      <div className="content-header">
        <h1>Personality</h1>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search personalities..."
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

      <div className="personality-grid">
        {filteredPersonalities.map((personality) => {
          const PersonalityIcon = personality.icon;
          return (
            <motion.div
              key={personality.id}
              className={`personality-card ${settings.personality === personality.id ? 'active' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSettingChange('personality', null, personality.id)}
            >
              <div className="personality-header">
                <PersonalityIcon size={24} className="personality-icon" />
                <h3>{personality.name}</h3>
              </div>
              <p>{personality.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
