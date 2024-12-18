// pages/auth/login/success.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import DashboardFooter from '../../../components/dashboard/DashboardFooter'

export default function AuthSuccess() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard/servers')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  useEffect(() => {
    const generateStarfield = () => {
      const starfieldContainer = document.getElementById('starfield-background')
      if (starfieldContainer) {
        for (let i = 0; i < 100; i++) {
          const star = document.createElement('div')
          star.className = 'star'
          star.style.left = Math.random() * 100 + '%'
          star.style.top = Math.random() * 100 + '%'
          star.style.animationDelay = Math.random() * 2 + 's'
          starfieldContainer.appendChild(star)
        }
      }
    }

    generateStarfield()
  }, [])

  const handleSkip = () => {
    router.push('/dashboard/servers')
  }

  return (
    <>
      <Head>
        <title>Authentication Successful - BoltBot⚡</title>
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
            <button onClick={handleSkip} className="skip-button">
              Go to Dashboard
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      <DashboardFooter />
    </>
  )
} 
