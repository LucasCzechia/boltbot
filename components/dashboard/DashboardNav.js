// pages/auth/login/logout.js
import { signOut } from 'next-auth/react'
import Head from 'next/head'

export default function Logout() {
  return (
    <>
      <Head>
        <title>Logging out... - BoltBot⚡</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className="loading-screen">
        <svg className="lightning" viewBox="0 0 24 24" fill="var(--primary)">
          <path d="M13 0L0 13h9v11l13-13h-9z"/>
        </svg>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (async function() {
            try {
              localStorage.clear();
              sessionStorage.clear();
              document.cookie.split(";").forEach(function(c) { 
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
              });
              window.location.href = '/api/auth/signout?redirect=/auth/login';
            } catch (error) {
              window.location.href = '/auth/login';
            }
          })();
        `
      }} />
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  return { props: {} };
}
