// components/dashboard/ToolsSettings.tsx
import { Globe, Image, DollarSign, Cloud, Clock, Smile, FileText, Code, Search } from 'lucide-react';
import SettingsCard from './SettingsCard';

const TOOLS_CONFIG = [
  {
    id: 'browseInternet',
    label: 'Browse Internet',
    icon: Globe,
    description: 'Allow the bot to search and browse the internet'
  },
  {
    id: 'generateImages',
    label: 'Generate AI Images',
    icon: Image,
    description: 'Create images using AI technology'
  },
  {
    id: 'currencyConverter',
    label: 'Currency Converter',
    icon: DollarSign,
    description: 'Convert between different currencies'
  },
  {
    id: 'weather',
    label: 'Weather',
    icon: Cloud,
    description: 'Check weather conditions for any location'
  },
  {
    id: 'currentTime',
    label: 'Current Time',
    icon: Clock,
    description: 'Display time for different time zones'
  },
  {
    id: 'reactEmojis',
    label: 'React Emojis',
    icon: Smile,
    description: 'Add emoji reactions to messages'
  },
  {
    id: 'createFiles',
    label: 'Create Files',
    icon: FileText,
    description: 'Generate and manage text files'
  },
  {
    id: 'runPythonCode',
    label: 'Run Python Code',
    icon: Code,
    description: 'Execute Python code snippets'
  },
  {
    id: 'googleImages',
    label: 'Google Images Search',
    icon: Search,
    description: 'Search and display images from Google'
  }
] as const;

interface ToolsSettingsProps {
  settings: Record<string, boolean>;
  isLoading: boolean;
  onSave: (settings: Record<string, boolean>) => void;
}

export default function ToolsSettings({ settings, isLoading, onSave }: ToolsSettingsProps) {
  const handleToggle = (toolId: string) => {
    onSave({ ...settings, [toolId]: !settings[toolId] });
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Tools & Features</h1>
        <p className="page-description">Enable or disable bot functionalities</p>
      </div>

      <div className="dashboard-grid">
        {TOOLS_CONFIG.map((tool) => (
          <SettingsCard
            key={tool.id}
            title={tool.label}
            icon={tool.icon}
            className="hover-lift hover-glow"
          >
            <p className="text-sm text-light/70 mb-4">
              {tool.description}
            </p>
            
            <div className="toggle-wrapper">
              <span className="text-sm font-medium">
                {settings[tool.id] ? 'Enabled' : 'Disabled'}
              </span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings[tool.id]}
                  onChange={() => handleToggle(tool.id)}
                  disabled={isLoading}
                />
                <span className="toggle-slider" />
              </label>
            </div>
          </SettingsCard>
        ))}
      </div>
    </div>
  );
}
