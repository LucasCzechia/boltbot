// pages/auth/login/logout.js
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

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
          callbackUrl: '/auth/login',
          redirect: false
        });

        router.push('/auth/login');
      } catch (error) {
        console.error('Logout error:', error);
        router.push('/auth/login');
      }
    };

    performLogout();
  }, [router]);

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
