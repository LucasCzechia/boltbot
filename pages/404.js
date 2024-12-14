// pages/404.js
import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon, AlertTriangle, GamepadIcon } from 'lucide-react';

export default function Custom404() {
  useEffect(() => {
    const generateStarfield = () => {
      const starfieldContainer = document.getElementById('starfield-background')
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        star.style.animationDelay = Math.random() * 2 + 's'
        starfieldContainer.appendChild(star)
      }
    }

    generateStarfield()
  }, []);
  
  return (
    <>
      <Head>
        <title>404 - Page Not Found | BoltBot⚡</title>
      </Head>
    
    <div id="starfield-background" className="starfield-container" />

      <div className="error-page">
        
        <div className="error-content">
          <Image 
            src="/images/boltbot.webp"
            alt="BoltBot Logo"
            width={120}
            height={120}
            className="error-logo"
            priority
          />
          
          <div className="error-code">
            4<span className="lightning">⚡</span>4
          </div>
          
          <h1>Page Not Found</h1>
          <p>Oops! This page seems to be lost in cyberspace.</p>

          <div className="error-actions">
            <Link href="/" className="home-button">
              <HomeIcon size={20} />
              Return Home
            </Link>
            
            <Link href="/snake" className="play-snake-button">
              <GamepadIcon size={20} />
              Play Snake
            </Link>
            
            <Link href="https://discord.gg/bolt" className="support-link" target="_blank">
              <AlertTriangle size={20} />
              Need Help?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
              }
