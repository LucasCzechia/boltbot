// components/dashboard/PersonalitySettings.tsx
import { useState } from 'react';
import { Save, Bot, MessageCircle, Brain } from 'lucide-react';
import SettingsCard from './SettingsCard';
import { toast } from 'react-hot-toast';

const PERSONALITY_TYPES = [
  { 
    id: 'default',
    label: 'Default (Balanced)',
    description: 'Balanced responses suitable for most interactions'
  },
  {
    id: 'chatty',
    label: 'Chatty',
    description: 'More casual and conversational style'
  },
  {
    id: 'assistant',
    label: 'Assistant',
    description: 'Focused on efficiency and task completion'
  }
];

interface PersonalitySettingsProps {
  settings: {
    type: string;
  };
  onSave: (settings: any) => void;
}

export default function PersonalitySettings({ settings, onSave }: PersonalitySettingsProps) {
  const [selectedType, setSelectedType] = useState(settings.type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ type: selectedType });
    toast.success('Personality settings updated!');
  };

  return (
    <div className="space-y-6">
      <div className="settings-header">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          AI & Personality
        </h1>
        <p className="text-light/80">Configure how BoltBot⚡ interacts</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <SettingsCard
          title="Personality Type"
          icon={Brain}
          className="md:max-w-2xl"
        >
          <div className="space-y-4">
            {PERSONALITY_TYPES.map((type) => (
              <div
                key={type.id}
                className={`
                  personality-option
                  ${selectedType === type.id ? 'selected' : ''}
                `}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="radio-circle">
                    <div className="radio-dot" />
                  </div>
                  <div>
                    <h4 className="font-medium text-light">{type.label}</h4>
                    <p className="text-sm text-light/60">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SettingsCard>

        <button type="submit" className="save-button">
          <Save size={18} />
          Save Changes
        </button>
      </form>
    </div>
  );
}
