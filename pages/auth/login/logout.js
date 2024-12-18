// pages/auth/login/logout.js
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';

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

        await signOut({ redirect: false });

        setTimeout(() => {
          router.push('/');
        }, 100);

      } catch (error) {
        console.error('Logout error:', error);
        router.push('/');
      }
    };

    performLogout();
  }, [router]);

  return (
    <>
      <Head>
        <title>Logging Out - BoltBot⚡</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  return {
    props: {}
  };
}
