// pages/index.js
import Head from 'next/head'
import Script from 'next/script'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Tools from '../components/Tools'
import Statistics from '../components/Statistics'
import Developers from '../components/Developers'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>BoltBot⚡ - Advanced AI Discord Bot</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><text y='20'>⚡</text></svg>" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="loading-screen">
        <svg className="lightning" viewBox="0 0 24 24" fill="var(--primary)">
          <path d="M13 0L0 13h9v11l13-13h-9z"/>
        </svg>
      </div>

      <Navbar />
      <Hero />
      <Features />
      <Tools />
      <Statistics />
      <Developers />
      <Footer />

      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js" 
        strategy="lazyOnload" 
        onLoad={() => {
          particlesJS('particles-js', {
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: '#ffcc00' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: false },
              size: { value: 3, random: true },
              line_linked: {
                enable: true,
                distance: 150,
                color: '#ffcc00',
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
              }
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
              }
            },
            retina_detect: true
          });
        }}
      />
    </>
  )
}
