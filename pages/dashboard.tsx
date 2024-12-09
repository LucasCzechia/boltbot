// pages/dashboard.tsx
import Head from 'next/head';
import { useState } from 'react';
import { Settings, Wrench, Bot, Bell, PieChart, Users, Save } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import GeneralSettings from '../components/dashboard/GeneralSettings';
import ToolsSettings from '../components/dashboard/ToolsSettings';
import PersonalitySettings from '../components/dashboard/PersonalitySettings';

export interface DashboardSettings {
  general: {
    botName: string;
    description: string;
    messageMemory: number;
  };
  tools: {
    browseInternet: boolean;
    generateImages: boolean;
    currencyConverter: boolean;
    weather: boolean;
    currentTime: boolean;
    reactEmojis: boolean;
    createFiles: boolean;
    runPythonCode: boolean;
    googleImages: boolean;
  };
  personality: {
    type: 'default' | 'chatty' | 'assistant';
  };
}

const NAVIGATION_ITEMS = [
  { id: 'general', label: 'General Settings', icon: Settings },
  { id: 'tools', label: 'Tools & Features', icon: Wrench },
  { id: 'personality', label: 'AI & Personality', icon: Bot },
  { id: 'notifications', label: 'Notifications', icon: Bell, disabled: true },
  { id: 'analytics', label: 'Analytics', icon: PieChart, disabled: true },
  { id: 'users', label: 'User Management', icon: Users, disabled: true }
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<DashboardSettings>({
    general: {
      botName: 'BoltBot⚡',
      description: 'Your AI-powered Discord companion',
      messageMemory: 10
    },
    tools: {
      browseInternet: true,
      generateImages: true,
      currencyConverter: true,
      weather: true,
      currentTime: true,
      reactEmojis: true,
      createFiles: true,
      runPythonCode: true,
      googleImages: true
    },
    personality: {
      type: 'default'
    }
  });

  const handleSettingsChange = async (
    category: keyof DashboardSettings,
    newSettings: Partial<DashboardSettings[typeof category]>
  ) => {
    setIsLoading(true);
    try {
      // Here you would make your API call
      // await updateBotSettings(category, newSettings);
      
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          ...newSettings
        }
      }));
      
      toast.success('Settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update settings. Please try again.');
      console.error('Error updating settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralSettings 
            settings={settings.general}
            isLoading={isLoading}
            onSave={(newSettings) => handleSettingsChange('general', newSettings)}
          />
        );
      case 'tools':
        return (
          <ToolsSettings 
            settings={settings.tools}
            isLoading={isLoading}
            onSave={(newSettings) => handleSettingsChange('tools', newSettings)}
          />
        );
      case 'personality':
        return (
          <PersonalitySettings 
            settings={settings.personality}
            isLoading={isLoading}
            onSave={(newSettings) => handleSettingsChange('personality', newSettings)}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-light/60">
            <PieChart size={48} className="mb-4 opacity-50" />
            <p className="text-lg">Coming soon...</p>
          </div>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard - BoltBot⚡</title>
        <meta name="description" content="Configure your BoltBot instance" />
      </Head>

      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            border: '1px solid rgba(255, 204, 0, 0.2)'
          },
          success: {
            icon: '✅',
            duration: 3000
          },
          error: {
            icon: '❌',
            duration: 4000
          }
        }}
      />

      <DashboardLayout 
        navigationItems={NAVIGATION_ITEMS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {renderContent()}
      </DashboardLayout>
    </>
  );
              }
