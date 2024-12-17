// pages/dashboard/servers/[id]/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardNav from '@/components/dashboard/DashboardNav';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import ServerSidebar from '@/components/dashboard/server/ServerSidebar';
import ServerHeader from '@/components/dashboard/server/ServerHeader';
import ServerGeneral from '@/components/dashboard/server/ServerGeneral';
import ServerTools from '@/components/dashboard/server/ServerTools';
import ServerFeatures from '@/components/dashboard/server/ServerFeatures';
import ServerPersonality from '@/components/dashboard/server/ServerPersonality';
import ScrollToTop from '@/components/dashboard/ScrollToTop';
import { ServerProvider } from '@/context/ServerContext';
import Image from 'next/image';
import Link from 'next/link';

const DEFAULT_SETTINGS = {
  botName: 'BoltBot',
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
  const { data: session, status } = useSession();
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchServerData = async () => {
      if (!router.query.id || !session?.accessToken) return;

      try {
        const response = await fetch(`/api/discord/servers/${router.query.id}/settings`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });

        if (!response.ok) {
          if (response.status === 403) {
            setError('You do not have permission to access this server.');
          } else {
            setError('Failed to load server settings.');
          }
          return;
        }

        const data = await response.json();
        setSettings(data);
      } catch (err) {
        setError('An error occurred while loading the server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServerData();
  }, [router.query.id, session]);

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: typeof setting === 'object' 
        ? { ...prev[category], ...setting }
        : category === 'tools' || category === 'features'
          ? { ...prev[category], [setting]: value }
          : value
    }));
    setIsEditing(true);
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="loading-screen">
        <svg className="lightning" viewBox="0 0 24 24" fill="var(--primary)">
          <path d="M13 0L0 13h9v11l13-13h-9z"/>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Error - BoltBot⚡</title>
        </Head>

        <div id="starfield-background" className="starfield-container" />
        
        <div className="error-page">
          <div className="error-content">
            <Image 
              src="/images/boltbot.webp"
              alt="BoltBot Logo"
              width={120}
              height={120}
              className="error-logo"
              priority
            />
            
            <h1>Access Denied</h1>
            <p>{error}</p>

            <div className="error-actions">
              <Link href="/dashboard/servers" className="home-button">
                Return to Servers
              </Link>
            </div>
          </div>
        </div>
        
        <DashboardFooter />
      </>
    );
  }

  const renderContent = () => {
    const props = {
      settings,
      handleSettingChange,
      searchQuery,
      setSearchQuery,
      isEditing,
      setIsEditing
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
    <ServerProvider>
      <Head>
        <title>Server Settings - BoltBot⚡</title>
      </Head>

      <div id="starfield-background" className="starfield-container" />
      
      <DashboardNav />

      <div className="server-dashboard">
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
    </ServerProvider>
  );
}
