// components/dashboard/server/ServerPersonality.js
import { useState, useEffect } from 'react';
import { Bot, Brain, Crown, Search, Plus, Star, Sparkles, X, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ServerSearch from './ServerSearch';

const DEFAULT_PERSONALITIES = [
  { 
    id: 'default', 
    name: 'Casual Assistant',
    type: 'Default',
    description: 'A friendly and approachable chatbot that maintains a casual tone while being helpful and informative.',
    prompt: 'You are a friendly and casual assistant, maintaining an approachable tone while being helpful.',
    icon: Bot,
    isDefault: true
  },
  { 
    id: 'professional', 
    name: 'Professional Expert',
    type: 'Default',
    description: 'A knowledgeable and efficient assistant focused on delivering precise and comprehensive responses.',
    prompt: 'You are a professional and knowledgeable expert, focused on precise and comprehensive assistance.',
    icon: Brain,
    isDefault: true
  },
  { 
    id: 'fancy', 
    name: 'British Gentleman',
    type: 'Default',
    description: 'An eloquent and sophisticated personality with a touch of British charm and wit.',
    prompt: 'You are a sophisticated British gentleman, speaking with elegance and wit while maintaining helpfulness.',
    icon: Crown,
    isDefault: true
  }
];

const filterOptions = [
  { id: 'all', label: 'All Personalities', icon: Search },
  { id: 'preset', label: 'Pre-Created Only', icon: Bot },
  { id: 'custom', label: 'Custom Made', icon: Sparkles }
];

const MAX_NAME_LENGTH = 32;
const MAX_PROMPT_LENGTH = 500;

export default function ServerPersonality({
  settings,
  handleSettingChange,
  isEditing,
  saveSettings,
  isSaving,
  loading
}) {
  const [personalities, setPersonalities] = useState([...DEFAULT_PERSONALITIES]);
  const [filteredPersonalities, setFilteredPersonalities] = useState(personalities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    prompt: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedPersonalities = localStorage.getItem('customPersonalities');
    if (savedPersonalities) {
      const custom = JSON.parse(savedPersonalities);
      setPersonalities([...DEFAULT_PERSONALITIES, ...custom]);
    }
  }, []);

  useEffect(() => {
    setFilteredPersonalities(personalities);
  }, [personalities]);

  const handleSearch = ({ query, filter }) => {
    let filtered = personalities.filter(personality => {
      const matchesSearch = 
        personality.name.toLowerCase().includes(query.toLowerCase()) ||
        personality.description.toLowerCase().includes(query.toLowerCase());

      if (filter === 'preset') {
        return matchesSearch && personality.isDefault;
      }
      if (filter === 'custom') {
        return matchesSearch && !personality.isDefault;
      }
      return matchesSearch;
    });

    setFilteredPersonalities(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (formData.name.length > MAX_NAME_LENGTH) {
      newErrors.name = `Name must be ${MAX_NAME_LENGTH} characters or less`;
    }
    if (!formData.prompt.trim()) {
      newErrors.prompt = 'Prompt is required';
    }
    if (formData.prompt.length > MAX_PROMPT_LENGTH) {
      newErrors.prompt = `Prompt must be ${MAX_PROMPT_LENGTH} characters or less`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newPersonality = {
      id: `custom_${Date.now()}`,
      name: formData.name.trim(),
      type: 'Custom',
      description: formData.prompt.trim(),
      prompt: formData.prompt.trim(),
      icon: Sparkles,
      isDefault: false
    };

    const updatedPersonalities = [...personalities, newPersonality];
    setPersonalities(updatedPersonalities);

    const customPersonalities = updatedPersonalities.filter(p => !p.isDefault);
    localStorage.setItem('customPersonalities', JSON.stringify(customPersonalities));

    setIsModalOpen(false);
    setFormData({ name: '', prompt: '' });
    toast.success('Personality created successfully!', {
      icon: '✨',
      duration: 3000
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', prompt: '' });
    setErrors({});
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
          const isSelected = settings.personality === personality.id;
          
          return (
            <div
              key={personality.id}
              className={`personality-card ${isSelected ? 'active' : ''}`}
              onClick={() => handleSettingChange('personality', null, personality.id)}
            >
              {isSelected && (
                <div className="selected-label">
                  <Check />
                  Selected
                </div>
              )}
              <div className="personality-header">
                <div className="personality-icon-wrapper">
                  <PersonalityIcon size={24} />
                </div>
                <div className="personality-info">
                  <div className="personality-name">{personality.name}</div>
                  <div className="personality-type">
                    <span>
                      {personality.isDefault ? <Bot size={14} /> : <Sparkles size={14} />}
                      {personality.type}
                    </span>
                  </div>
                </div>
              </div>
              <p className="personality-description">{personality.description}</p>
            </div>
          );
        })}

        <div className="personality-card add-personality" onClick={() => setIsModalOpen(true)}>
          <div className="personality-icon-wrapper">
            <Plus size={24} />
          </div>
          <h3>Create Custom</h3>
          <p>Create your own personality with custom behavior</p>
        </div>
      </div>

      {isModalOpen && (
        <div className={`personality-modal ${isModalOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Create Custom Personality</h2>
              <button className="modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="name">Personality Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter a name for your personality"
                  maxLength={MAX_NAME_LENGTH}
                />
                <div className="character-count">
                  {formData.name.length}/{MAX_NAME_LENGTH}
                </div>
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className={`form-group ${errors.prompt ? 'has-error' : ''}`}>
                <label htmlFor="prompt">Personality Description & Behavior</label>
                <textarea
                  id="prompt"
                  name="prompt"
                  value={formData.prompt}
                  onChange={handleInputChange}
                  placeholder="Describe how the personality should behave..."
                  maxLength={MAX_PROMPT_LENGTH}
                />
                <div className={`character-count ${formData.prompt.length === MAX_PROMPT_LENGTH ? 'limit' : ''}`}>
                  {formData.prompt.length}/{MAX_PROMPT_LENGTH}
                </div>
                {errors.prompt && <div className="error-message">{errors.prompt}</div>}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="modal-button secondary"
                onClick={closeModal}
                type="button"
              >
                Cancel
              </button>
              <button
                className="modal-button primary"
                onClick={handleSubmit}
                type="submit"
                disabled={isSaving}
              >
                Create Personality
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
