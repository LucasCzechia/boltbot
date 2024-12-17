// pages/dashboard/servers/[id]/index.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import DashboardNav from '../../../../components/dashboard/DashboardNav';
import DashboardFooter from '../../../../components/dashboard/DashboardFooter';
import ServerSidebar from '../../../../components/dashboard/server/ServerSidebar';
import ServerHeader from '../../../../components/dashboard/server/ServerHeader';
import ServerGeneral from '../../../../components/dashboard/server/ServerGeneral';
import ServerTools from '../../../../components/dashboard/server/ServerTools';
import ServerFeatures from '../../../../components/dashboard/server/ServerFeatures';
import ServerPersonality from '../../../../components/dashboard/server/ServerPersonality';
import ScrollToTop from '../../../components/dashboard/ScrollToTop'
import { ServerProvider } from '../../../../context/ServerContext';

const DEFAULT_SETTINGS = {
  botName: 'BoltBot',
  contextLength: 10,
  tools: {
    browseInternet: true,
    generateImages: true,
    currencyConverter: true,
    weather: true,
    time: true,
    reactEmojis: true,
    createFiles: true,
    runPython: true,
    googleImages: true
  },
  features: {
    imageRecognition: true,
    fileHandling: true
  },
  personality: 'default'
};

export default function ServerDashboard() {
  const router = useRouter();
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

  useEffect(() => {
    const generateStarfield = () => {
      const starfieldContainer = document.getElementById('starfield-background')
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        star.style.animationDelay = Math.random() * 2 + 's'
        starfieldContainer.appendChild(star)
      }
    }

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
    </ServerProvider>
  );
}
