// components/dashboard/PersonalitySettings.tsx
import { Bot, MessageCircle, Brain } from 'lucide-react';
import SettingsCard from './SettingsCard';

const PERSONALITY_TYPES = [
  {
    id: 'default',
    label: 'Default (Balanced)',
    description: 'A balanced approach suitable for most interactions. Provides clear, helpful responses while maintaining a professional tone.',
    features: ['Professional responses', 'Balanced conversation', 'Clear communication']
  },
  {
    id: 'chatty',
    label: 'Chatty',
    description: 'More casual and conversational. Uses a friendlier tone and engages in more natural dialogue.',
    features: ['Casual tone', 'Engaging dialogue', 'Natural conversations']
  },
  {
    id: 'assistant',
    label: 'Assistant',
    description: 'Focused on efficiency and task completion. Provides direct, concise responses optimized for productivity.',
    features: ['Concise responses', 'Task-focused', 'Efficient communication']
  }
] as const;

interface PersonalitySettingsProps {
  settings: {
    type: 'default' | 'chatty' | 'assistant';
  };
  isLoading: boolean;
  onSave: (settings: { type: 'default' | 'chatty' | 'assistant' }) => void;
}

export default function PersonalitySettings({ settings, isLoading, onSave }: PersonalitySettingsProps) {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">AI & Personality</h1>
        <p className="page-description">Configure how BoltBot⚡ interacts</p>
      </div>

      <div className="max-w-3xl">
        <SettingsCard
          title="Personality Type"
          icon={Brain}
          description="Choose how BoltBot communicates with users"
        >
          <div className="space-y-4 mt-6">
            {PERSONALITY_TYPES.map((type) => (
              <div
                key={type.id}
                className={`
                  p-4 rounded-lg border cursor-pointer transition-all
                  ${settings.type === type.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-primary/10 hover:border-primary/30'
                  }
                `}
                onClick={() => !isLoading && onSave({ type: type.id })}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-4 h-4 rounded-full border-2 border-primary relative">
                      {settings.type === type.id && (
                        <div className="absolute inset-1 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-light mb-1">
                      {type.label}
                    </h3>
                    <p className="text-sm text-light/70 mb-3">
                      {type.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {type.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SettingsCard>
      </div>
    </div>
  );
}
