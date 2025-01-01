// pages/404.js
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon, AlertTriangle, GamepadIcon } from 'lucide-react';
import DashboardNav from '../components/dashboard/DashboardNav';
import DashboardFooter from '../components/dashboard/DashboardFooter'
import Starfield from '../components/misc/Starfield';

export default function Custom404() {
 const { data: session, status } = useSession();
 const [isDarkMode, setIsDarkMode] = useState(true);
  
  return (
    <>
      <Head>
        <title>404 - Page Not Found | BoltBot⚡</title>
      </Head>

            {!session?.user ? (
        <Navigation 
          isDarkMode={isDarkMode}
        />
      ) : (
        <Navigation
          userProfile={session?.user}      
          isDarkMode={isDarkMode}
        />
      )}
      <Starfield /> 
    
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
      <DashboardFooter />      
    </>
  );
              }
