// pages/auth/login.js
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard/servers');
    }
  }, [status, router]);

  const handleLogin = () => {
    signIn('discord', { callbackUrl: '/dashboard/servers' });
  };

  if (status === 'loading') {
    return (
      <div className="loading-screen">
        <svg className="lightning" viewBox="0 0 24 24" fill="var(--primary)">
          <path d="M13 0L0 13h9v11l13-13h-9z"/>
        </svg>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Login - BoltBot⚡</title>
      </Head>

      <nav className="auth-nav">
        <div className="nav-content">
          <a href="/" className="logo">
            <Image 
              src="/bot-logo.png" 
              alt="BoltBot Logo" 
              width={40} 
              height={40}
              className="logo-img"
            />
            BoltBot⚡
          </a>
        </div>
      </nav>

      <div className="auth-container">
        <div id="particles-js" className="particles"></div>
        
        <div className="auth-card">
          <Image 
            src="/bot-logo.png"
            alt="BoltBot Avatar"
            width={120}
            height={120}
            className="bot-avatar"
          />
          
          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-subtitle">Login with Discord to manage your servers and customize BoltBot's settings</p>
          
          <div className="features-list">
            <div className="feature-item">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"></path>
              </svg>
              <span>Manage multiple servers</span>
            </div>
            <div className="feature-item">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>Customize bot settings</span>
            </div>
            <div className="feature-item">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Quick and secure access</span>
            </div>
          </div>

          <button className="discord-button" onClick={handleLogin}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4C14.89 4.21 14.76 4.49 14.67 4.71C13.06 4.47 11.47 4.47 9.88 4.71C9.79 4.49 9.66 4.21 9.55 4C8.04 4.26 6.6 4.71 5.27 5.33C1.96 10.18 1.07 14.91 1.52 19.57C3.27 20.84 4.97 21.63 6.65 22.14C7.07 21.54 7.45 20.9 7.77 20.23C7.13 19.98 6.52 19.67 5.94 19.31C6.11 19.18 6.27 19.05 6.42 18.92C10.05 20.61 13.95 20.61 17.54 18.92C17.7 19.06 17.86 19.18 18.02 19.31C17.44 19.67 16.82 19.99 16.19 20.23C16.51 20.9 16.88 21.54 17.31 22.14C18.99 21.63 20.7 20.84 22.44 19.57C22.97 14.15 21.56 9.46 19.27 5.33Z"/>
            </svg>
            Continue with Discord
          </button>
        </div>
      </div>
    </>
  );
}
