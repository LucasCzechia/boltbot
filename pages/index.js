// pages/index.js
import { useEffect } from 'react';
import Head from 'next/head';
import { Zap, Wrench, BarChart2, Users, Bot } from 'lucide-react';
import DashboardNav from '../components/dashboard/DashboardNav';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Tools from '../components/landing/Tools';
import Statistics from '../components/landing/Statistics';
import DashboardFooter from '../components/dashboard/DashboardFooter';
import LandingStarfield from '../components/landing/LandingStarfield';
import { initializeAnimations } from '../utils/animation';

export default function Home() {
  useEffect(() => {
    const cleanup = initializeAnimations();
    return () => cleanup();
  }, []);

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
    <div className="landing-page">
      <Head>
        <title>BoltBot⚡ - Advanced AI Discord Bot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="loading-screen">
        <svg className="lightning" viewBox="0 0 24 24" fill="var(--primary)">
          <path d="M13 0L0 13h9v11l13-13h-9z"/>
        </svg>
      </div>

      <DashboardNav navigationItems={navigationItems} />

      <Hero />

      <div className="content-wrapper">
          <main>
          <LandingStarfield /> 
          <Features />
          <Tools />
          <Statistics />
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
}
