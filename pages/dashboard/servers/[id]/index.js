// pages/dashboard/servers/[id]/index.js
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Toaster, toast } from 'react-hot-toast';
import ServerHeader from '../../../../components/dashboard/server/ServerHeader';
import DashboardNav from '../../../../components/dashboard/server/DashboardNav';
import Overview from '../../../../components/dashboard/server/sections/Overview';
import Features from '../../../../components/dashboard/server/sections/Features';
import Settings from '../../../../components/dashboard/server/sections/Settings';
import Logs from '../../../../components/dashboard/server/sections/Logs';
import DashboardFooter from '../../../../components/dashboard/DashboardFooter';

export default function ServerDashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/auth/login');
    },
  });

  const router = useRouter();
  const { id: serverId } = router.query;
  const [server, setServer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchServerData = async () => {
      if (!serverId) return;
      
      try {
        const response = await fetch('/api/discord/servers');
        if (!response.ok) throw new Error('Failed to fetch servers');
        
        const servers = await response.json();
        const currentServer = servers.find(s => s.id === serverId);
        
        if (!currentServer) {
          router.replace('/dashboard/servers');
          return;
        }
        
        setServer(currentServer);
      } catch (error) {
        console.error('Error fetching server:', error);
        router.replace('/dashboard/servers');
      } finally {
        setLoading(false);
      }
    };

    fetchServerData();
  }, [serverId, router]);

  useEffect(() => {
    const generateStarfield = () => {
      const starfieldContainer = document.getElementById('starfield-background');
      if (starfieldContainer) {
        for (let i = 0; i < 100; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.left = Math.random() * 100 + '%';
          star.style.top = Math.random() * 100 + '%';
          star.style.animationDelay = Math.random() * 2 + 's';
          starfieldContainer.appendChild(star);
        }
      }
    };

    generateStarfield();
  }, []);

  const handleSave = async () => {
    try {
      // TODO: Implement actual save functionality
      toast.promise(
        new Promise(resolve => setTimeout(resolve, 1000)), // Replace with actual API call
        {
          loading: 'Saving changes...',
          success: 'Changes saved successfully!',
          error: 'Failed to save changes'
        }
      );
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview server={server} />;
      case 'features':
        return <Features onSettingChange={() => setHasChanges(true)} />;
      case 'settings':
        return <Settings onSettingChange={() => setHasChanges(true)} />;
      case 'logs':
        return <Logs serverId={serverId} />;
      default:
        return <Overview server={server} />;
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="loading-screen">
        <svg className="lightning" viewBox="0 0 24 24" fill="var(--primary)">
          <path d="M13 0L0 13h9v11l13-13h-9z"/>
        </svg>
      </div>
    );
  }

  if (!server) return null;

  return (
    <>
      <Head>
        <title>{server.name} - BoltBot⚡ Dashboard</title>
      </Head>

      <div id="starfield-background" className="starfield-container" />

      <div className="dashboard-container">
        <ServerHeader server={server} />
        <DashboardNav 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
        />
        
        <main className="dashboard-content">
          {renderContent()}
          
          {hasChanges && (
            <button 
              className="save-changes-btn"
              onClick={handleSave}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              Save Changes
            </button>
          )}
        </main>
      </div>

      <DashboardFooter />
      <Toaster position="top-right" />
    </>
  );
}
