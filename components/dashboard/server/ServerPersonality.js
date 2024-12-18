// components/dashboard/server/ServerPersonality.js
import { useState } from 'react';
import { Search, Save, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const DEFAULT_PERSONALITIES = [
  { id: 'default', name: 'Default', description: 'Playful, conversational chatbot' },
  { id: 'assistant', name: 'Assistant', description: 'Professional and helpful like Claude or ChatGPT' },
  { id: 'fancy', name: 'Fancy', description: 'A British gentleman type of responses' }
];

export default function ServerPersonality({ 
  settings, 
  handleSettingChange, 
  searchQuery, 
  setSearchQuery, 
  isEditing,
  saveSettings,
  isSaving
}) {
  const [personalities, setPersonalities] = useState(DEFAULT_PERSONALITIES);
  const [customPersonality, setCustomPersonality] = useState('');

  const addCustomPersonality = () => {
    if (customPersonality.trim()) {
      const newPersonality = {
        id: customPersonality.toLowerCase().replace(/\s+/g, '-'),
        name: customPersonality,
        description: 'Custom personality mode'
      };
      
      setPersonalities(prev => [...prev, newPersonality]);
      setCustomPersonality('');
      toast.success('New personality added!');
    }
  };

  const filteredPersonalities = personalities.filter(personality =>
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
        {filteredPersonalities.map((personality) => (
          <motion.div
            key={personality.id}
            className={`personality-card ${settings.personality === personality.id ? 'active' : ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSettingChange('personality', null, personality.id)}
          >
            <h3>{personality.name}</h3>
            <p>{personality.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="add-personality">
        <input
          type="text"
          placeholder="Add custom personality..."
          value={customPersonality}
          onChange={(e) => setCustomPersonality(e.target.value)}
          className="setting-input"
        />
        <motion.button
          className="add-button"
          onClick={addCustomPersonality}
          disabled={!customPersonality.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
          Add
        </motion.button>
      </div>
    </div>
  );
}
