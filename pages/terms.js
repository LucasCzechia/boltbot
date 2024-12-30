// pages/terms.js
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Scroll, Scale, Users, Clock, Bell, FileText, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import DashboardNav from '../components/dashboard/DashboardNav';
import DashboardFooter from '../components/dashboard/DashboardFooter';
import Starfield from '../components/misc/Starfield';

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: Scroll
    },
    {
      id: 'usage',
      title: 'Terms of Use',
      icon: Users
    },
    {
      id: 'privacy',
      title: 'Privacy & Data',
      icon: Shield
    },
    {
      id: 'legal',
      title: 'Legal Rights',
      icon: Scale
    },
    {
      id: 'updates',
      title: 'Updates',
      icon: Bell
    },
    {
      id: 'support',
      title: 'Support',
      icon: Mail
    }
  ];

  const lastUpdated = '2024-12-30';

  return (
    <>
      <Head>
        <title>Terms of Service - BoltBot⚡</title>
        <meta name="description" content="Terms of Service for BoltBot - Read about our terms, conditions, and policies." />
      </Head>

      <DashboardNav />
      <Starfield />

      <div style={{
        minHeight: '100vh',
        padding: '6rem 1rem 2rem',
        position: 'relative',
        zIndex: 1,
        background: 'var(--bg-primary)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(250px, 1fr) minmax(0, 3fr)',
          gap: '2rem',
          position: 'relative'
        }}>
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'sticky',
              top: '7rem',
              height: 'fit-content',
              background: 'var(--bg-secondary)',
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <FileText size={24} style={{ color: 'var(--primary)' }} />
              <h2 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 600 }}>Table of Contents</h2>
            </div>

            <nav>
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: activeSection === section.id ? 'var(--hover-bg)' : 'transparent',
                      border: '1px solid',
                      borderColor: activeSection === section.id ? 'var(--primary)' : 'transparent',
                      borderRadius: '8px',
                      color: activeSection === section.id ? 'var(--primary)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Icon size={18} />
                    <span style={{ fontSize: '0.925rem' }}>{section.title}</span>
                  </button>
                );
              })}
            </nav>

            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'var(--bg-tertiary)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <Clock size={16} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Last Updated</span>
              </div>
              <time style={{ fontSize: '0.925rem', color: 'var(--text-primary)' }}>{lastUpdated}</time>
            </div>
          </motion.aside>

          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'var(--bg-secondary)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Terms of Service
              </h1>
              <Link href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--hover-bg)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s ease'
                }}
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </div>

            <div style={{ color: 'var(--text-secondary)' }}>
              <section id="introduction" style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem'
                }}>Introduction</h2>
                <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>
                  Welcome to BoltBot⚡ ("we," "our," or "us"). By accessing or using our Discord bot and associated services, you agree to be bound by these Terms of Service. Please read them carefully.
                </p>
              </section>

              <section id="usage" style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem'
                }}>Terms of Use</h2>
                <div style={{
                  background: 'var(--bg-tertiary)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    color: 'var(--primary)',
                    marginBottom: '0.75rem'
                  }}>Acceptable Use</h3>
                  <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.6 }}>
                    <li>Use the bot in compliance with Discord's Terms of Service</li>
                    <li>Respect rate limits and usage guidelines</li>
                    <li>Do not attempt to exploit or abuse the service</li>
                  </ul>
                </div>
              </section>

              <section id="privacy" style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem'
                }}>Privacy & Data</h2>
                <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>
                  We take your privacy seriously. See our Privacy Policy for details on how we collect, use, and protect your data.
                </p>
              </section>

              <section id="legal" style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem'
                }}>Legal Rights</h2>
                <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>
                  BoltBot⚡ reserves all rights to the service, including the right to modify or terminate service at any time.
                </p>
              </section>

              <section id="updates" style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem'
                }}>Updates to Terms</h2>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(255, 204, 0, 0.1)',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <AlertCircle size={24} style={{ color: 'var(--primary)' }} />
                  <p>We may update these terms at any time. Continued use of the service constitutes acceptance of any changes.</p>
                </div>
              </section>

              <section id="support">
                <h2 style={{
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem'
                }}>Support</h2>
                <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>
                  For support inquiries, join our 
                  <Link href="https://discord.gg/bolt" style={{
                    color: 'var(--primary)',
                    textDecoration: 'underline',
                    margin: '0 0.25rem'
                  }}>Discord server</Link>
                  or contact our support team.
                </p>
              </section>
            </div>
          </motion.main>
        </div>
      </div>

      <DashboardFooter />
    </>
  );
}
