// pages/dashboard/servers/[id]/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings2, 
  BoltIcon, 
  Wrench, 
  Zap, 
  Bot, 
  LayoutGrid, 
  ChevronLeft,
  Save,
  Undo
} from 'lucide-react';

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

const TABS = [
  { id: 'general', label: 'General', icon: Settings2, color: '#3498db' },
  { id: 'tools', label: 'Tools', icon: Wrench, color: '#2ecc71' },
  { id: 'features', label: 'Features', icon: Zap, color: '#f1c40f' },
  { id: 'personality', label: 'Personality', icon: Bot, color: '#e74c3c' }
];

const pageTransitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
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
  const [originalSettings, setOriginalSettings] = useState(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serverInfo, setServerInfo] = useState(null);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

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
          const mergedSettings = {
            ...DEFAULT_SETTINGS,
            ...data,
            tools: {
              ...DEFAULT_SETTINGS.tools,
              ...data.tools
            },
            features: {
              ...DEFAULT_SETTINGS.features,
              ...data.features
            }
          };
          setSettings(mergedSettings);
          setOriginalSettings(mergedSettings);
        } else {
          throw new Error('Failed to fetch settings');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load settings', {
          icon: '⚠️'
        });
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    if (serverId && session?.accessToken) {
      fetchSettings();
    }
  }, [serverId, session?.accessToken]);

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

  // Track changes
  useEffect(() => {
    const settingsChanged = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    setHasChanges(settingsChanged);
    setIsEditing(settingsChanged);
  }, [settings, originalSettings]);

  // Handle unsaved changes when navigating away
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

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
  };

  const handleReset = () => {
    setSettings(originalSettings);
    toast.success('Changes reverted', {
      icon: '↩️'
    });
  };

  const saveSettings = async () => {
    if (!serverId || !hasChanges) return;

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

      setOriginalSettings(settings);
      toast.success('Settings saved successfully!', {
        icon: '✨'
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings', {
        icon: '❌'
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="loading-screen">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <BoltIcon className="text-primary" size={48} />
        </motion.div>
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
        {/* Back Navigation */}
        <motion.button
          className="fixed top-20 left-4 z-50 bg-dark/80 backdrop-blur-sm p-2 rounded-full text-primary border border-primary/20 hover:border-primary/40 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/dashboard/servers')}
        >
          <ChevronLeft size={24} />
        </motion.button>

        {/* Save/Reset Controls */}
        {hasChanges && (
          <motion.div 
            className="fixed bottom-24 right-4 z-50 flex flex-col gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <motion.button
              className="bg-primary text-dark p-3 rounded-full shadow-lg hover:shadow-primary/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveSettings}
              disabled={isSaving}
            >
              <Save size={24} />
            </motion.button>
            <motion.button
              className="bg-dark/80 backdrop-blur-sm text-primary p-3 rounded-full shadow-lg border border-primary/20 hover:border-primary/40 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
            >
              <Undo size={24} />
            </motion.button>
          </motion.div>
        )}

        {/* Mobile Navigation Toggle */}
        <motion.button 
          className="md:hidden fixed bottom-6 right-6 z-50 bg-primary text-dark p-3 rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMobileNav(!showMobileNav)}
        >
          <LayoutGrid size={24} />
        </motion.button>

        {/* Sidebar */}
        <AnimatePresence>
          {showMobileNav && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setShowMobileNav(false)}
            />
          )}
        </AnimatePresence>

        <div className={`dashboard-sidebar ${showMobileNav ? 'show' : ''}`}>
          <ServerSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            tabs={TABS}
            onTabChange={() => setShowMobileNav(false)}
          />
        </div>

        {/* Main Content */}
        <motion.div 
          className="dashboard-content"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="content-container">
            <motion.div variants={itemVariants}>
              <ServerHeader serverInfo={serverInfo} loading={loading} />
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="content-wrapper"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <ScrollToTop />
      <DashboardFooter />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: '!bg-dark-light !text-light border border-primary/20',
          style: {
            background: '#1a1a1a',
            color: '#fff',
            borderColor: 'rgba(255, 204, 0, 0.1)'
          }
        }}
      />
    </>
  );
}
