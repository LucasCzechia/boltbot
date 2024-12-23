// pages/dashboard/servers/[id]/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, BoltIcon, Wrench, Zap, Bot, LayoutGrid, Radio } from 'lucide-react';

// Component imports
import DashboardNav from '@/components/dashboard/DashboardNav';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import ServerSidebar from '@/components/dashboard/server/ServerSidebar';
import ServerHeader from '@/components/dashboard/server/ServerHeader';
import ServerGeneral from '@/components/dashboard/server/ServerGeneral';
import ServerTools from '@/components/dashboard/server/ServerTools';
import ServerFeatures from '@/components/dashboard/server/ServerFeatures';
import ServerPersonality from '@/components/dashboard/server/ServerPersonality';
import ScrollToTop from '@/components/dashboard/ScrollToTop';
import Starfield from '@/components/misc/Starfield';

// Default settings configuration
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

// Tab configuration
const TABS = [
  { id: 'general', label: 'General', icon: Settings2 },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'features', label: 'Features', icon: Zap },
  { id: 'personality', label: 'Personality', icon: Bot }
];

export default function ServerDashboard() {
  const router = useRouter();
  const { id: serverId } = router.query;
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/login');
    },
  });
  
  // State management
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serverInfo, setServerInfo] = useState(null);
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Fetch server settings
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

  // Fetch server info
  useEffect(() => {
    const fetchServerInfo = async () => {
      if (!serverId) return;

      try {
        const response = await fetch(`/api/discord/servers/${serverId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setServerInfo(data);
        }
      } catch (error) {
        console.error('Error fetching server info:', error);
      }
    };

    if (serverId) {
      fetchServerInfo();
    }
  }, [serverId]);

  // Handle setting changes
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

  // Save settings
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

  // Loading state
  if (status === 'loading') {
    return (
      <div className="loading-screen">
        <BoltIcon className="animate-pulse text-primary" size={48} />
      </div>
    );
  }

  // Render content based on active tab
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
      loading,
      serverInfo
    };

    const components = {
      general: ServerGeneral,
      tools: ServerTools,
      features: ServerFeatures,
      personality: ServerPersonality
    };

    const Component = components[activeTab];
    return Component ? <Component {...props} /> : null;
  };

  return (
    <>
      <Head>
        <title>{serverInfo?.name ? `${serverInfo.name} - Settings` : 'Server Settings'} | BoltBot⚡</title>
      </Head>

      <Starfield />
  
      <DashboardNav />

      <div className="dashboard-wrapper">
        {/* Mobile Navigation Toggle */}
        <button 
          className="mobile-nav-toggle md:hidden fixed bottom-6 right-6 z-50 bg-primary text-dark p-3 rounded-full shadow-lg"
          onClick={() => setShowMobileNav(!showMobileNav)}
        >
          <LayoutGrid size={24} />
        </button>

        {/* Sidebar */}
        <div className={`dashboard-sidebar ${showMobileNav ? 'show' : ''}`}>
          <ServerSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            tabs={TABS}
            onTabChange={() => setShowMobileNav(false)}
          />
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          <div className="content-container">
            <ServerHeader serverInfo={serverInfo} loading={loading} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="content-wrapper"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ScrollToTop />
      <DashboardFooter />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(255, 204, 0, 0.1)'
          }
        }}
      />
    </>
  );
}
