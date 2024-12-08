// components/dashboard/ToolsSettings.tsx
import { useState } from 'react';
import { Save, Globe, Image, DollarSign, Cloud, Clock, Smile, FileText, Code, Search } from 'lucide-react';
import SettingsCard from './SettingsCard';
import { toast } from 'react-hot-toast';

const TOOLS = [
  { id: 'browseInternet', label: 'Browse Internet', icon: Globe },
  { id: 'generateImages', label: 'Generate AI Images', icon: Image },
  { id: 'currencyConverter', label: 'Currency Converter', icon: DollarSign },
  { id: 'weather', label: 'Weather', icon: Cloud },
  { id: 'currentTime', label: 'Current Time', icon: Clock },
  { id: 'reactEmojis', label: 'React Emojis', icon: Smile },
  { id: 'createFiles', label: 'Create Files', icon: FileText },
  { id: 'runPythonCode', label: 'Run Python Code', icon: Code },
  { id: 'googleImages', label: 'Google Images Search', icon: Search }
];

interface ToolsSettingsProps {
  settings: Record<string, boolean>;
  onSave: (settings: any) => void;
}

export default function ToolsSettings({ settings, onSave }: ToolsSettingsProps) {
  const [toolStates, setToolStates] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(toolStates);
    toast.success('Tool settings updated successfully!');
  };

  const handleToggle = (toolId: string) => {
    setToolStates(prev => ({
      ...prev,
      [toolId]: !prev[toolId]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="settings-header">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          Tools & Features
        </h1>
        <p className="text-light/80">Enable or disable bot features</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <SettingsCard
              key={tool.id}
              title={tool.label}
              icon={tool.icon}
              className="transform transition-all hover:scale-102"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-light/80">Enable this feature</p>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={toolStates[tool.id]}
                    onChange={() => handleToggle(tool.id)}
                  />
                  <span className="toggle-slider" />
                </label>
              </div>
            </SettingsCard>
          ))}
        </div>

        <button type="submit" className="save-button">
          <Save size={18} />
          Save Changes
        </button>
      </form>
    </div>
  );
} 
