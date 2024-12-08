// components/dashboard/GeneralSettings.tsx
import { useState } from 'react';
import { Save, Bot, MessageCircle } from 'lucide-react';
import SettingsCard from './SettingsCard';
import { toast } from 'react-hot-toast';

interface GeneralSettingsProps {
  settings: {
    botName: string;
    description: string;
    messageMemory: number;
  };
  onSave: (settings: any) => void;
}

export default function GeneralSettings({ settings, onSave }: GeneralSettingsProps) {
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="settings-header">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          General Settings
        </h1>
        <p className="text-light/80">Configure your BoltBot⚡ instance</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsCard
            title="Bot Identity"
            icon={Bot}
            cardClassName="md:col-span-2"
          >
            <div className="space-y-4">
              <div className="form-group">
                <label>Bot Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.botName}
                  onChange={(e) => setFormData({ ...formData, botName: e.target.value })}
                  maxLength={32}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  maxLength={100}
                />
              </div>
            </div>
          </SettingsCard>

          <SettingsCard
            title="Memory Settings"
            icon={MessageCircle}
            tag="Advanced"
          >
            <div className="form-group">
              <label>Messages to Remember</label>
              <input
                type="number"
                className="form-input"
                value={formData.messageMemory}
                onChange={(e) => setFormData({ ...formData, messageMemory: parseInt(e.target.value) })}
                min={1}
                max={50}
              />
              <p className="text-sm text-light/60 mt-2">
                Number of previous messages to maintain in conversation context
              </p>
            </div>
          </SettingsCard>
        </div>

        <button type="submit" className="save-button">
          <Save size={18} />
          Save Changes
        </button>
      </form>
    </div>
  );
}
