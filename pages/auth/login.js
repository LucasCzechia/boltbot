// pages/auth/login.js
import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import AuthSuccess from '../../components/auth/AuthSuccess'

const FEATURES = [
  {
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 7h-8.586L9.707 5.293A1 1 0 0 0 9 5H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1z"/>
      </svg>
    ),
    text: "Manage multiple servers"
  },
  {
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
      </svg>
    ),
    text: "Customize bot settings"
  },
  {
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    text: "Quick and secure access"
  }
];

export default function Login() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard/servers')
    }
  }, [status, router]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.particlesJS) {
      const particlesElement = document.getElementById('particles-js');
      if (particlesElement) { 
        window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 250,
              density: {
                enable: true,
                value_area: 1000,
              },
            },
            color: {
              value: "#ffcc00",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.7,
              random: false,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.1,
                sync: false
              },
            },
            size: {
              value: 2.5,
              random: true,
              animation: {
                enable: false,
              },
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              outMode: "out",
              bounce: false,
            },
            line_linked: {
              enable: true,
              distance: 120,
              color: "#ffcc00",
              opacity: 0.3,
              width: 0.8,
            },
          },
          interactivity: {
            detectOn: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 80,
                duration: 0.3,
              },
              push: {
                particles_nb: 4,
              },
            },
          },
          retina_detect: true,
        });
      }
    }
  }, []);

  if (status === 'authenticated') {
    return <AuthSuccess onRedirect={() => router.replace('/dashboard/servers')} />
  }

  return (
    <>
      <Head>
        <title>Login - BoltBot⚡</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js" async></script>
      </Head>

      <nav className="auth-nav">
        <div className="nav-content">
          <a href="/" className="logo">
            <Image 
              src="/images/boltbot.webp"
              alt="BoltBot Logo"
              width={40}
              height={40}
              priority
            />
            BoltBot⚡
          </a>
        </div>
      </nav>

      <div className="auth-container">
        <div id="particles-js" className="particles"></div>
        
        <div className="auth-card">
          <div className="card-glow"></div>
          <Image 
            src="/images/boltbot.webp"
            alt="BoltBot Avatar"
            width={120}
            height={120}
            className="bot-avatar"
            priority
          />
          
          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-subtitle">Login with Discord to manage your servers and customize BoltBot's settings</p>
          
          <div className="features-list">
            {FEATURES.map((feature, index) => (
              <div key={index} className="feature-item">
                {feature.icon}
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          <button onClick={() => signIn('discord')} className="discord-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Continue with Discord
          </button>
        </div>
      </div>
    </>
  )
}
