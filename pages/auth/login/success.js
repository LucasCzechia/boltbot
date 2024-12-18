// pages/auth/login/success.js
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import DashboardFooter from '../../../components/dashboard/DashboardFooter'

export default function AuthSuccess() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/login')
      return
    }

    if (status === 'authenticated') {
      const timer = setTimeout(() => {
        router.replace('/dashboard/servers')
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [status, router])

  if (status === 'unauthenticated') {
    return null
  }

  if (status === 'loading') {
    return (
      <div className="loading-screen">
        <svg className="lightning" viewBox="0 0 24 24" fill="var(--primary)">
          <path d="M13 0L0 13h9v11l13-13h-9z"/>
        </svg>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Authentication Successful - BoltBot⚡</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div id="starfield-background" className="starfield-container" />

      <div className="auth-success-page">
        <motion.div 
          className="auth-success-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src="/images/boltbot.webp"
            alt="BoltBot Logo"
            width={120}
            height={120}
            className="success-logo"
            priority
          />

          <motion.div 
            className="checkmark-wrapper"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          >
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="23" fill="none"/>
              <path className="checkmark-check" d="M16 26l7.5 7.5L38 18" fill="none"/>
            </svg>
          </motion.div>

          <motion.h1 
            className="success-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Authentication Complete!
          </motion.h1>

          <motion.p 
            className="success-message"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Welcome to the BoltBot⚡ Dashboard
          </motion.p>

          <motion.div 
            className="redirect-info"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p>Redirecting you automatically...</p>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
            <button onClick={() => router.replace('/dashboard/servers')} className="skip-button">
              Go to Dashboard
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      <DashboardFooter />
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  const token = req.cookies['next-auth.session-token'] || req.cookies['__Secure-next-auth.session-token'];
  
  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

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
