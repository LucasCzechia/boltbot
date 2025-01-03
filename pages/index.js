// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { Zap, Wrench, BarChart2, Users, Bot } from 'lucide-react';
import DashboardNav from '../components/dashboard/DashboardNav';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Tools from '../components/landing/Tools';
import Statistics from '../components/landing/Statistics';
import DashboardFooter from '../components/dashboard/DashboardFooter';

export default function Home() {
  const navigationItems = [
    {
      name: 'Features',
      href: '/#features',
      icon: Zap,
      description: 'Explore powerful AI capabilities'
    },
    {
      name: 'Tools',
      href: '/#tools',
      icon: Wrench,
      description: 'Discover utility features'
    },
    {
      name: 'Statistics',
      href: '/#statistics',
      icon: BarChart2,
      description: 'View real-time statistics'
    },
    {
      name: 'Community',
      href: 'https://discord.gg/bolt',
      icon: Users,
      description: 'Join our Discord server',
      external: true
    },
    {
      name: 'Add to Discord',
      href: 'https://discord.com/oauth2/authorize?client_id=1250114494081007697&permissions=8&scope=bot',
      icon: Bot,
      description: 'Add BoltBot to your server',
      external: true,
      isPrimary: true
    }
  ];

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
      <DashboardNav navigationItems={navigationItems} />
      <Hero />
      <Features />
      <Tools />
      <Statistics />
      <DashboardFooter />
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
  );
}
