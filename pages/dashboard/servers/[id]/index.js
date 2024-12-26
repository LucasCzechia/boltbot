// pages/dashboard/servers/[id]/index.js
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, BoltIcon, Wrench, Zap, Bot, Menu, Save, Undo } from 'lucide-react';

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

const DEBUG = true;

const DEBUG_SETTINGS = {
  botName: 'Debug BoltBot⚡',
  contextLength: 20,
  tools: {
    BrowseInternet: true,
    GenerateImages: true,
    CurrencyConverter: false,
    GetWeather: true,
    GetTime: false,
    ReactEmojis: true,
    CreateFiles: false,
    RunPython: true,
    GoogleImages: true
  },
  features: {
    ImageRecognition: true,
    FileHandling: false, 
    PdfHandling: true
  },
  personality: 'fancy'
};

const DEBUG_SERVER = {
  id: '123456789',
  name: 'Debug Server',
  icon: null,
  memberCount: 1337,
  onlineCount: 42,
  description: 'A debug server for testing purposes'
};

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
    FileHandling: true, 
    PdfHandling: true 
  },
  personality: 'default'
};

const TABS = [
  { id: 'general', label: 'General Settings', icon: Settings2 },
  { id: 'tools', label: 'Bot Tools', icon: Wrench },
  { id: 'features', label: 'Bot Features', icon: Zap },
  { id: 'personality', label: 'Bot Personality', icon: Bot }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
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

  const [settings, setSettings] = useState(DEBUG ? DEBUG_SETTINGS : DEFAULT_SETTINGS);
  const [originalSettings, setOriginalSettings] = useState(DEBUG ? DEBUG_SETTINGS : DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(!DEBUG);
  const [serverInfo, setServerInfo] = useState(DEBUG ? DEBUG_SERVER : null);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const fetchSettings = useCallback(async () => {
    if (!serverId || DEBUG) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/discord/servers/${serverId}/settings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch settings');

      const data = await response.json();
      const mergedSettings = {
        ...DEFAULT_SETTINGS,
        ...data,
        tools: { ...DEFAULT_SETTINGS.tools, ...data.tools },
        features: { ...DEFAULT_SETTINGS.features, ...data.features }
      };

      setSettings(mergedSettings);
      setOriginalSettings(mergedSettings);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load settings', { icon: '⚠️', duration: 4000 });
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [serverId, session]);

  const fetchServerInfo = useCallback(async () => {
    if (!serverId || DEBUG) return;

    try {
      const response = await fetch(`/api/discord/servers/${serverId}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to fetch server info');

      const data = await response.json();
      setServerInfo(data);
    } catch (error) {
      console.error('Error fetching server info:', error);
      toast.error('Failed to load server information');
    }
  }, [serverId]);

  useEffect(() => {
    if (serverId && session?.accessToken) {
      fetchSettings();
      fetchServerInfo();
    }
  }, [serverId, session?.accessToken, fetchSettings, fetchServerInfo]);

  useEffect(() => {
    const settingsChanged = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    setHasChanges(settingsChanged);
    setIsEditing(settingsChanged);
  }, [settings, originalSettings]);

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
    setSettings(prev => {
      if (setting === null) {
        return { ...prev, [category]: value };
      }
      return {
        ...prev,
        [category]: { ...prev[category], [setting]: value }
      };
    });
  };

  const handleReset = () => {
    setSettings(originalSettings);
    toast.success('Changes reverted', { icon: '↩️', duration: 2000 });
  };

  const saveSettings = async () => {
    if (!serverId || !hasChanges) return;
    if (DEBUG) {
      toast.success('Settings saved (Debug Mode)', { icon: '🐛', duration: 2000 });
      setOriginalSettings(settings);
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`/api/discord/servers/${serverId}/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Failed to save settings');

      setOriginalSettings(settings);
      toast.success('Settings saved successfully!', { icon: '✨', duration: 3000 });
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
    )
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

      <DashboardNav />

      <div className="dashboard-wrapper">
      <Starfield /> 
  
        <AnimatePresence>
          {hasChanges && (
            <motion.div 
              className="floating-controls"
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              exit={fadeInUp.exit}
            >
              <motion.button
                className="floating-button primary"
                onClick={saveSettings}
                disabled={isSaving}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save />
              </motion.button>
              <motion.button
                className="floating-button secondary"
                onClick={handleReset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Undo />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

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
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setShowMobileNav(false);
            }}
            tabs={TABS}
          />
        </div>

        <motion.div 
          className="dashboard-content"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="content-container">
            <motion.div variants={fadeInUp}>
              <ServerHeader serverInfo={serverInfo} loading={loading} />
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={fadeInUp}
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
          className: '!bg-dark-light !text-light border border-primary/20',
          style: {
            background: '#1a1a1a',
            color: '#fff',
            borderColor: 'rgba(255, 204, 0, 0.1)'
          },
          duration: 3000
        }}
      />
    </>
  );
}
