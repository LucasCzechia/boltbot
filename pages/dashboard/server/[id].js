// pages/dashboard/server/[id].js
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DashboardSidebar from '@/components/dashboard/server/DashboardSidebar';
import ServerHeader from '@/components/dashboard/server/ServerHeader';
import ServerSettings from '@/components/dashboard/server/ServerSettings';
import ActivityLogs from '@/components/dashboard/server/ActivityLogs';
import DashboardFooter from '@/components/dashboard/DashboardFooter';

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

      <div className="dashboard-layout">
        <DashboardSidebar serverId={serverId} />
        
        <main className="main-content">
          <ServerHeader server={server} />
          <ServerSettings serverId={serverId} />
          <ActivityLogs serverId={serverId} />
          
          <button 
            className="save-changes"
            onClick={() => {
              // TODO: Implement save functionality
              console.log('Saving changes...');
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            Save Changes
          </button>
        </main>
      </div>

      <DashboardFooter />
    </>
  );
}
