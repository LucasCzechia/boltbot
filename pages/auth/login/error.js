// pages/auth/login/error.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, HomeIcon, HelpCircle } from 'lucide-react';
import DashboardFooter from '../../../components/dashboard/DashboardFooter';
import Starfield from '../../.../components/misc/Starfield'

const getErrorMessage = (error) => {
  switch (error) {
    case 'Signin':
      return 'Try signing in with a different account.';
    case 'OAuthSignin':
      return 'Error occurred while accessing Discord login.';
    case 'OAuthCallback':
      return 'Error occurred while processing Discord login.';
    case 'OAuthCreateAccount':
      return 'Error creating Discord account connection.';
    case 'EmailCreateAccount':
      return 'Could not create account using Discord.';
    case 'Callback':
      return 'Error occurred during authentication callback.';
    case 'AccessDenied':
      return 'Access was denied to your Discord account.';
    default:
      return 'An unexpected error occurred during authentication.';
  }
};

export default function AuthError() {

  const error = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('error') : null;
  const errorMessage = getErrorMessage(error);

  return (
    <>
      <Head>
        <title>Authentication Error - BoltBot⚡</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <Starfield />
    
      <div className="auth-error-page">
        <motion.div 
          className="auth-error-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/boltbot.webp"
            alt="BoltBot Logo"
            width={120}
            height={120}
            className="error-logo"
            priority
          />

          <motion.div 
            className="error-icon-wrapper"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <AlertTriangle size={48} className="error-icon" />
          </motion.div>

          <motion.h1 
            className="error-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Authentication Failed
          </motion.h1>

          <motion.p 
            className="error-message"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {errorMessage}
          </motion.p>

          <motion.div 
            className="error-actions"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link href="/auth/login" className="retry-button">
              Try Again
            </Link>
            <Link href="/" className="home-button">
              <HomeIcon size={20} />
              Return Home
            </Link>
            <Link 
              href="https://discord.gg/bolt" 
              className="support-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HelpCircle size={20} />
              Get Help
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <DashboardFooter />
    </>
  );
}

export async function getServerSideProps({ res }) {
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
