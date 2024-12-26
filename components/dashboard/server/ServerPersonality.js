// components/dashboard/server/ServerPersonality.js
import { Bot, Brain, Crown, Search, Star, Heart } from 'lucide-react';
import ServerSearch from './ServerSearch';
import { useState } from 'react';

const PERSONALITY_INFO = [
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

const filterOptions = [
  { id: 'all', label: 'All Personalities', icon: Search },
  { id: 'current', label: 'Current', icon: Star },
  { id: 'available', label: 'Available', icon: Heart }
];

export default function ServerPersonality({
  settings,
  handleSettingChange,
  isEditing,
  saveSettings,
  isSaving,
  loading
}) {
  const [filteredPersonalities, setFilteredPersonalities] = useState(PERSONALITY_INFO);

  const handleSearch = ({ query, filter }) => {
    let filtered = PERSONALITY_INFO.filter(personality => {
      const matchesSearch = 
        personality.name.toLowerCase().includes(query.toLowerCase()) ||
        personality.description.toLowerCase().includes(query.toLowerCase());

      if (filter === 'current') {
        return matchesSearch && personality.id === settings.personality;
      }
      if (filter === 'available') {
        return matchesSearch && personality.id !== settings.personality;
      }
      return matchesSearch;
    });

    setFilteredPersonalities(filtered);
  };

  if (loading) {
    return <div className="content-section loading">...</div>;
  }

  return (
    <div className="content-section">
      <ServerSearch 
        onSearch={handleSearch}
        filterOptions={filterOptions}
        totalItems={filteredPersonalities.length}
      />

      <div className="personality-grid">
        {filteredPersonalities.map((personality) => {
          const PersonalityIcon = personality.icon;
          return (
            <div
              key={personality.id}
              className={`personality-card ${settings.personality === personality.id ? 'active' : ''}`}
              onClick={() => handleSettingChange('personality', null, personality.id)}
            >
              <div className="personality-header">
                <PersonalityIcon size={24} className="personality-icon" />
                <h3>{personality.name}</h3>
              </div>
              <p>{personality.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
