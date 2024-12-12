// pages/auth/complete.js
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../../components/Footer'

export default function AuthComplete() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      const timer = setTimeout(() => {
        router.replace('/dashboard/servers')
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      router.replace('/auth/login')
    }
  }, [status, router])

  if (status !== 'authenticated') return null

  return (
    <>
      <Head>
        <title>Authentication Complete - BoltBot⚡</title>
      </Head>

      <div className="auth-complete-page">
        <nav className="auth-nav">
          <div className="nav-content">
            <a href="/" className="logo">
              <Image 
                src="/images/boltbot.webp"
                alt="BoltBot Logo"
                width={40}
                height={40}
              />
              BoltBot⚡
            </a>
          </div>
        </nav>

        <div className="auth-complete-container">
          <div className="auth-complete-card">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h1 className="auth-complete-title">Authentication Complete!</h1>
            <p className="auth-complete-subtitle">You have successfully logged in with Discord.</p>
            <p className="auth-complete-subtitle">Redirecting you to the dashboard...</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
                  }
