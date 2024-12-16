// context/ServerContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ServerContext = createContext();

export function ServerProvider({ children }) {
  const router = useRouter();
  const { id } = router.query;
  const [server, setServer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchServerData();
    }
  }, [id]);

  const fetchServerData = async () => {
    try {
      const response = await fetch(`/api/discord/servers/${id}`);
      const data = await response.json();
      setServer(data);
    } catch (error) {
      console.error('Failed to fetch server data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServerContext.Provider value={{ server, loading }}>
      {children}
    </ServerContext.Provider>
  );
}

export const useServer = () => useContext(ServerContext);
