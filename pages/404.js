// pages/404.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon, AlertTriangle, GamepadIcon } from 'lucide-react';
import DashboardNav from '../components/dashboard/DashboardNav';
import DashboardFooter from '../components/dashboard/DashboardFooter'
import Starfield from '../components/misc/Starfield';

export default function Custom404() {
   return (
    <>
      <Head>
        <title>404 - Page Not Found | BoltBot⚡</title>
      </Head>

      <DashboardNav />
   
      <Starfield /> 
    
      <div className="error-page">
        
        <div className="error-content">
          
          
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
                       
            <Link href="https://discord.gg/bolt" className="support-link" target="_blank">
              <AlertTriangle size={20} />
              Need Help?
            </Link>
             <Link href="/snake" className="play-snake-button">
              <GamepadIcon size={20} />
              Play Snake
            </Link>
          </div>
        </div>
      </div>
      <DashboardFooter />      
    </>
  );
}
