// pages/dashboard.js
import Head from 'next/head';
import { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import GeneralSettings from '../components/dashboard/GeneralSettings';
import ToolsSettings from '../components/dashboard/ToolsSettings';
import PersonalitySettings from '../components/dashboard/PersonalitySettings';
import { Settings, Tool, Bot, Bell, PieChart, Users } from 'lucide-react';

const NAVIGATION_ITEMS = [
  { id: 'general', label: 'General Settings', icon: Settings },
  { id: 'tools', label: 'Tools & Features', icon: Tool },
  { id: 'personality', label: 'AI & Personality', icon: Bot },
  { id: 'notifications', label: 'Notifications', icon: Bell, disabled: true },
  { id: 'analytics', label: 'Analytics', icon: PieChart, disabled: true },
  { id: 'users', label: 'User Management', icon: Users, disabled: true }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
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

  const handleSettingsChange = (category, newSettings) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...newSettings
      }
    }));

    // Here you would make an API call to your bot
    console.log('Updating settings:', category, newSettings);
    // Example API call:
    // await fetch('https://api.boltbot.app/settings', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.API_TOKEN}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ category, settings: newSettings })
    // });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralSettings 
            settings={settings.general} 
            onSave={(newSettings) => handleSettingsChange('general', newSettings)} 
          />
        );
      case 'tools':
        return (
          <ToolsSettings 
            settings={settings.tools} 
            onSave={(newSettings) => handleSettingsChange('tools', newSettings)} 
          />
        );
      case 'personality':
        return (
          <PersonalitySettings 
            settings={settings.personality} 
            onSave={(newSettings) => handleSettingsChange('personality', newSettings)} 
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-400">Coming soon...</p>
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
