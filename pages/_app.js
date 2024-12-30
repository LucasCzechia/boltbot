// pages/_app.js
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';
import dynamic from 'next/dynamic';
import '../styles/globals.css';

const CookieConsent = dynamic(() => import('../components/misc/CookieConsent'), {
  ssr: false
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const shouldShowAnalytics = typeof window !== 'undefined' && 
    localStorage.getItem('cookieConsent') === 'accepted';

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      {shouldShowAnalytics && <Analytics />}
      <CookieConsent />
    </SessionProvider>
  );
}
