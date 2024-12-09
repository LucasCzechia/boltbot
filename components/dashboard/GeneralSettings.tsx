// components/dashboard/GeneralSettings.tsx
import { useState, useEffect } from 'react';
import { Save, Bot, MessageCircle } from 'lucide-react';
import SettingsCard from './SettingsCard';

interface GeneralSettingsProps {
  settings: {
    botName: string;
    description: string;
    messageMemory: number;
  };
  isLoading: boolean;
  onSave: (settings: any) => void;
}

export default function GeneralSettings({ settings, isLoading, onSave }: GeneralSettingsProps) {
  const [formData, setFormData] = useState(settings);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(JSON.stringify(settings) !== JSON.stringify(formData));
  }, [settings, formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">General Settings</h1>
        <p className="page-description">Configure your BoltBot⚡ instance</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="dashboard-grid">
          <SettingsCard
            title="Bot Identity"
            icon={Bot}
            className="md:col-span-2"
          >
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Bot Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.botName}
                  onChange={(e) => setFormData({ ...formData, botName: e.target.value })}
                  maxLength={32}
                  placeholder="BoltBot⚡"
                />
                <p className="text-xs text-light/60 mt-1">
                  Maximum 32 characters
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  maxLength={100}
                  placeholder="Your AI-powered Discord companion"
                />
                <p className="text-xs text-light/60 mt-1">
                  Brief description of your bot
                </p>
              </div>
            </div>
          </SettingsCard>

          <SettingsCard
            title="Memory Settings"
            icon={MessageCircle}
            tag="Advanced"
          >
            <div className="form-group">
              <label className="form-label">Messages to Remember</label>
              <input
                type="number"
                className="form-input"
                value={formData.messageMemory}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  messageMemory: Math.min(50, Math.max(1, parseInt(e.target.value) || 1))
                })}
                min={1}
                max={50}
              />
              <p className="text-xs text-light/60 mt-1">
                Number of previous messages to maintain in conversation (1-50)
              </p>
            </div>
          </SettingsCard>
        </div>

        <button 
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || !isDirty}
        >
          {isLoading ? (
            <span className="loading-dots">Saving</span>
          ) : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
}
