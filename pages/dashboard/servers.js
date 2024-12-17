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
      const starfieldContainer = document.getElementById('starfield-background');
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        starfieldContainer.appendChild(star);
      }
    };
  }, []);

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
