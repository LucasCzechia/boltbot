// pages/auth/login/logout.js
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Head from 'next/head';

export default function Logout() {
  useEffect(() => {
    const performLogout = async () => {
      try {
        localStorage.clear();
        sessionStorage.clear();
        
        document.cookie.split(';').forEach(cookie => {
          document.cookie = cookie
            .replace(/^ +/, '')
            .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
        });

        await signOut({ 
          redirect: false
        });

        window.location.replace('/auth/login');
      } catch (error) {
        console.error('Logout error:', error);
        window.location.replace('/auth/login');
      }
    };

    performLogout();
  }, []);

  return (
    <Head>
      <title>Logging Out - BoltBot⚡</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'private, no-cache, no-store, max-age=0, must-revalidate'
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  return {
    props: {}
  };
}
