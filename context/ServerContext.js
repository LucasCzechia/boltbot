// context/ServerContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ServerContext = createContext();

export function ServerProvider({ children }) {
  const router = useRouter();
  const { id } = router.query;
  const [server, setServer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchServerData();
    }
  }, [id]);

  const fetchServerData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/discord/servers/${id}/settings`);
      
      if (!response.ok) {
        if (response.status === 403) {
          setError('No permission to access this server');
        } else {
          setError('Failed to fetch server data');
        }
        return;
      }

      const data = await response.json();
      setServer(data);
    } catch (error) {
      console.error('Failed to fetch server data:', error);
      setError('An error occurred while fetching server data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServerContext.Provider value={{ server, loading, error }}>
      {children}
    </ServerContext.Provider>
  );
}

export const useServer = () => useContext(ServerContext);
