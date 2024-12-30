// pages/terms.js
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Scroll, Scale, Shield, Bell, Mail, Clock, AlertCircle, ArrowLeft, Users, Home, Lock } from 'lucide-react';
import DashboardNav from '../components/dashboard/DashboardNav';
import DashboardFooter from '../components/dashboard/DashboardFooter';
import Starfield from '../components/misc/Starfield';
import UniversalSidebar from '../components/UniversalSidebar';

const legalItems = [
  {
    id: 'introduction',
    title: 'Introduction',
    href: '#introduction',
    icon: Scroll
  },
  {
    id: 'usage',
    title: 'Terms of Use',
    href: '#usage',
    icon: Users
  },
  {
    id: 'privacy',
    title: 'Privacy & Data',
    href: '#privacy',
    icon: Shield
  },
  {
    id: 'legal',
    title: 'Legal Rights',
    href: '#legal',
    icon: Scale
  },
  {
    id: 'updates',
    title: 'Updates',
    href: '#updates',
    icon: Bell
  },
  {
    id: 'support',
    title: 'Support',
    href: '#support',
    icon: Mail
  }
];

const navigationItems = [
  {
    id: 'home',
    title: 'Home',
    href: '/',
    icon: Home
  },
  {
    id: 'terms',
    title: 'Terms',
    href: '/terms',
    icon: FileText
  },
  {
    id: 'privacy',
    title: 'Privacy',
    href: '/privacy',
    icon: Lock
  }
];

export default function TermsOfService() {
  const lastUpdated = '2024-12-30';

  return (
    <>
      <Head>
        <title>Terms of Service - BoltBot⚡</title>
        <meta name="description" content="Terms of Service for BoltBot - Read about our terms, conditions, and policies." />
      </Head>

      <DashboardNav />
      <Starfield />

      <div className="terms-container">
        <div className="terms-wrapper">
          <UniversalSidebar
            title="Navigation"
            icon={FileText}
            items={navigationItems}
            position="left"
          />

          <motion.main
            className="terms-main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="terms-header">
              <h1 className="terms-title">Terms of Service</h1>
              <Link href="/" className="back-button">
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </div>

            <div className="terms-content">
              <section id="introduction" className="terms-section">
                <h2>Introduction</h2>
                <p>Welcome to BoltBot⚡ ("we," "our," or "us"). By accessing or using our Discord bot and associated services, you agree to be bound by these Terms of Service. Please read them carefully.</p>
              </section>

              <section id="usage" className="terms-section">
                <h2>Terms of Use</h2>
                <div className="terms-box">
                  <h3>Acceptable Use</h3>
                  <ul>
                    <li>Use the bot in compliance with Discord's Terms of Service</li>
                    <li>Respect rate limits and usage guidelines</li>
                    <li>Do not attempt to exploit or abuse the service</li>
                    <li>Follow community guidelines and best practices</li>
                    <li>Report any bugs or issues through proper channels</li>
                  </ul>
                </div>
              </section>

              <section id="privacy" className="terms-section">
                <h2>Privacy & Data</h2>
                <div className="terms-box">
                  <h3>Data Collection</h3>
                  <ul>
                    <li>We collect minimal data necessary for bot functionality</li>
                    <li>Server IDs and configurations are stored securely</li>
                    <li>User data is handled in accordance with GDPR</li>
                    <li>No personal data is shared with third parties</li>
                  </ul>
                </div>
              </section>

              <section id="legal" className="terms-section">
                <h2>Legal Rights</h2>
                <p>BoltBot⚡ reserves all rights to the service, including the right to modify or terminate service at any time.</p>
                <div className="terms-box">
                  <h3>Intellectual Property</h3>
                  <ul>
                    <li>All bot content and code is proprietary</li>
                    <li>Users retain rights to their own content</li>
                    <li>Unauthorized reproduction is prohibited</li>
                  </ul>
                </div>
              </section>

              <section id="updates" className="terms-section">
                <h2>Updates to Terms</h2>
                <div className="alert-box">
                  <AlertCircle size={24} style={{ color: 'var(--primary)' }} />
                  <p>We may update these terms at any time. Continued use of the service constitutes acceptance of any changes.</p>
                </div>
              </section>

              <section id="support" className="terms-section">
                <h2>Support</h2>
                <p>
                  For support inquiries, join our
                  <Link href="https://discord.gg/bolt" className="terms-link">Discord server</Link>
                  or contact our support team.
                </p>
                <div className="terms-box">
                  <h3>Support Channels</h3>
                  <ul>
                    <li>Discord Support Server</li>
                    <li>Email Support</li>
                    <li>Documentation</li>
                  </ul>
                </div>
              </section>
            </div>
          </motion.main>

          <UniversalSidebar
            title="Table of Contents"
            icon={FileText}
            items={legalItems}
            position="right"
            footer={
              <div className="last-updated">
                <div className="last-updated-header">
                  <Clock size={16} style={{ color: 'var(--primary)' }} />
                  <span>Last Updated</span>
                </div>
                <time dateTime={lastUpdated}>{lastUpdated}</time>
              </div>
            }
          />
        </div>
      </div>

      <DashboardFooter />
    </>
  );
}
