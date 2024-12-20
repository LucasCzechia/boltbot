// pages/dashboard/servers/[id]/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardNav from '../../../../components/dashboard/DashboardNav';
import DashboardFooter from '../../../../components/dashboard/DashboardFooter';
import ServerSidebar from '../../../../components/dashboard/server/ServerSidebar';
import ServerHeader from '../../../../components/dashboard/server/ServerHeader';
import ServerGeneral from '../../../../components/dashboard/server/ServerGeneral';
import ServerTools from '../../../../components/dashboard/server/ServerTools';
import ServerFeatures from '../../../../components/dashboard/server/ServerFeatures';
import ServerPersonality from '../../../../components/dashboard/server/ServerPersonality';
import ScrollToTop from '../../../../components/dashboard/ScrollToTop';
import Starfield from '../../../../components/misc/Starfield';

const DEFAULT_SETTINGS = {
  botName: 'BoltBot⚡',
  contextLength: 15,
  tools: {
    BrowseInternet: true,
    GenerateImages: true,
    CurrencyConverter: true,
    GetWeather: true,
    GetTime: true,
    ReactEmojis: true,
    CreateFiles: true,
    RunPython: true,
    GoogleImages: true
  },
  features: {
    ImageRecognition: true,
    FileHandling: true
  },
  personality: 'default'
};

export default function ServerDashboard() {
  const router = useRouter();
  const { id: serverId } = router.query;
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/login');
    },
  });
  
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!serverId) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/discord/servers/${serverId}/settings`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSettings(prevSettings => ({
            ...DEFAULT_SETTINGS,
            ...prevSettings,
            ...data,
            tools: {
              ...DEFAULT_SETTINGS.tools,
              ...(prevSettings.tools || {}),
              ...(data.tools || {})
            },
            features: {
              ...DEFAULT_SETTINGS.features,
              ...(prevSettings.features || {}),
              ...(data.features || {})
            }
          }));
        } else {
          throw new Error('Failed to fetch settings');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load settings');
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    if (serverId && session?.accessToken) {
      fetchSettings();
    }
  }, [serverId, session?.accessToken]);

  const handleSettingChange = (category, setting, value) => {
    setSettings(prevSettings => {
      if (setting === null) {
        return {
          ...prevSettings,
          [category]: value
        };
      }
      
      return {
        ...prevSettings,
        [category]: {
          ...prevSettings[category],
          [setting]: value
        }
      };
    });
    setIsEditing(true);
  };

  const saveSettings = async () => {
    if (!serverId) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/discord/servers/${serverId}/settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Failed to save settings');

      toast.success('Settings saved successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="loading-screen">
        <svg className="lightning" viewBox="0 0 24 24" fill="var(--primary)">
          <path d="M13 0L0 13h9v11l13-13h-9z"/>
        </svg>
      </div>
    );
  }

  const renderContent = () => {
    const props = {
      settings,
      handleSettingChange,
      searchQuery,
      setSearchQuery,
      isEditing,
      setIsEditing,
      saveSettings,
      isSaving,
      loading
    };

    switch (activeTab) {
      case 'general':
        return <ServerGeneral {...props} />;
      case 'tools':
        return <ServerTools {...props} />;
      case 'features':
        return <ServerFeatures {...props} />;
      case 'personality':
        return <ServerPersonality {...props} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Server Settings - BoltBot⚡</title>
      </Head>

      <Starfield />
  
      <DashboardNav />

      <div className="dashboard-container">
        <ServerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="dashboard-main">
          <ServerHeader />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <DashboardFooter />
      <Toaster position="top-right" />
    </>
  );
}
