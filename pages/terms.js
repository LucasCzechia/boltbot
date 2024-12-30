// pages/terms.js
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Scroll, Scale, Users, Clock, Bell, FileText, Mail, AlertCircle, ArrowLeft, Menu, X } from 'lucide-react';
import DashboardNav from '../components/dashboard/DashboardNav';
import DashboardFooter from '../components/dashboard/DashboardFooter';
import Starfield from '../components/misc/Starfield';

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: Scroll },
    { id: 'usage', title: 'Terms of Use', icon: Users },
    { id: 'privacy', title: 'Privacy & Data', icon: Shield },
    { id: 'legal', title: 'Legal Rights', icon: Scale },
    { id: 'updates', title: 'Updates', icon: Bell },
    { id: 'support', title: 'Support', icon: Mail }
  ];

  const lastUpdated = '2024-12-30';

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    if (isMobile) {
      setIsMobileMenuOpen(false);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const mainStyles = {
    position: 'relative',
    minHeight: '100vh',
    padding: '6rem 1rem 2rem',
    background: 'var(--bg-primary)',
    '@media (max-width: 768px)': {
      padding: '5rem 1rem 2rem'
    }
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(250px, 1fr) minmax(0, 3fr)',
    gap: '2rem',
    position: 'relative',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1rem'
    }
  };

  const sidebarStyles = {
    position: 'sticky',
    top: '7rem',
    height: 'fit-content',
    background: 'var(--bg-secondary)',
    padding: '1.5rem',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    '@media (max-width: 768px)': {
      position: 'fixed',
      top: 'auto',
      bottom: '1rem',
      right: '1rem',
      zIndex: 100,
      width: '56px',
      height: '56px',
      padding: '0',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      ...(isMobileMenuOpen && {
        width: 'calc(100% - 2rem)',
        height: 'auto',
        padding: '1.5rem'
      })
    }
  };

  const mobileMenuButtonStyles = {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '56px',
      height: '56px',
      background: 'var(--primary)',
      border: 'none',
      borderRadius: '16px',
      color: 'var(--dark)',
      cursor: 'pointer'
    }
  };

  const contentStyles = {
    background: 'var(--bg-secondary)',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    '@media (max-width: 768px)': {
      padding: '1.5rem'
    }
  };

  const titleStyles = {
    fontSize: '2.5rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1.5rem',
    '@media (max-width: 768px)': {
      fontSize: '2rem'
    }
  };

  const navigationStyles = {
    marginBottom: '1.5rem',
    '@media (max-width: 768px)': {
      display: isMobileMenuOpen ? 'block' : 'none'
    }
  };

  return (
    <>
      <Head>
        <title>Terms of Service - BoltBot⚡</title>
        <meta name="description" content="Terms of Service for BoltBot - Read about our terms, conditions, and policies." />
      </Head>

      <DashboardNav />
      <Starfield />

      <div style={mainStyles}>
        <div style={containerStyles}>
          <motion.aside
            initial={false}
            animate={isMobileMenuOpen ? { 
              width: 'calc(100% - 2rem)',
              height: 'auto',
              padding: '1.5rem'
            } : {
              width: isMobile ? '56px' : 'auto',
              height: isMobile ? '56px' : 'auto',
              padding: isMobile ? '0' : '1.5rem'
            }}
            transition={{ duration: 0.3 }}
            style={sidebarStyles}
          >
            {isMobile && (
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={mobileMenuButtonStyles}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}

            <AnimatePresence>
              {(!isMobile || isMobileMenuOpen) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.5rem'
                  }}>
                    <FileText size={24} style={{ color: 'var(--primary)' }} />
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 600 }}>
                      Table of Contents
                    </h2>
                  </div>

                  <nav style={navigationStyles}>
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => handleSectionClick(section.id)}
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
                            transition: 'all 0.2s ease',
                            fontSize: '0.925rem'
                          }}
                        >
                          <Icon size={18} />
                          <span>{section.title}</span>
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
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Last Updated
                      </span>
                    </div>
                    <time style={{ fontSize: '0.925rem', color: 'var(--text-primary)' }}>
                      {lastUpdated}
                    </time>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>

          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={contentStyles}
          >
            <h1 style={titleStyles}>Terms of Service</h1>

            <Link 
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                marginBottom: '2rem',
                background: 'var(--hover-bg)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                transition: 'all 0.2s ease',
                fontSize: '0.925rem'
              }}
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <div style={{ color: 'var(--text-secondary)' }}>
              {sections.map((section) => (
                <section 
                  key={section.id}
                  id={section.id}
                  style={{ 
                    marginBottom: '2rem',
                    scrollMarginTop: '100px'
                  }}
                >
                  <h2 style={{
                    fontSize: '1.5rem',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem'
                  }}>
                    {section.title}
                  </h2>
                  
                  {section.id === 'introduction' && (
                    <p style={{ lineHeight: 1.6 }}>
                      Welcome to BoltBot⚡ ("we," "our," or "us"). By accessing or using our Discord bot and associated services, you agree to be bound by these Terms of Service. Please read them carefully.
                    </p>
                  )}

                  {section.id === 'usage' && (
                    <div style={{
                      background: 'var(--bg-tertiary)',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)'
                    }}>
                      <h3 style={{
                        fontSize: '1.1rem',
                        color: 'var(--primary)',
                        marginBottom: '0.75rem'
                      }}>
                        Acceptable Use
                      </h3>
                      <ul style={{ 
                        paddingLeft: '1.5rem',
                        lineHeight: 1.6 
                      }}>
                        <li>Use the bot in compliance with Discord's Terms of Service</li>
                        <li>Respect rate limits and usage guidelines</li>
                        <li>Do not attempt to exploit or abuse the service</li>
                      </ul>
                    </div>
                  )}

                  {section.id === 'privacy' && (
                    <p style={{ lineHeight: 1.6 }}>
                      We take your privacy seriously. See our Privacy Policy for details on how we collect, use, and protect your data.
                    </p>
                  )}

                  {section.id === 'legal' && (
                    <p style={{ lineHeight: 1.6 }}>
                      BoltBot⚡ reserves all rights to the service, including the right to modify or terminate service at any time.
                    </p>
                  )}

                  {section.id === 'updates' && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: 'rgba(255, 204, 0, 0.1)',
                      borderRadius: '8px'
                    }}>
                      <AlertCircle size={24} style={{ color: 'var(--primary)' }} />
                      <p style={{ lineHeight: 1.6 }}>
                        We may update these terms at any time. Continued use of the service constitutes acceptance of any changes.
                      </p>
                    </div>
                  )}

                  {section.id === 'support' && (
                    <p style={{ lineHeight: 1.6 }}>
                      For support inquiries, join our{' '}
                      <Link 
                        href="https://discord.gg/bolt"
                        style={{
                          color: 'var(--primary)',
                          textDecoration: 'underline',
                          margin: '0 0.25rem'
                        }}
                      >
                        Discord server
                      </Link>
                      {' '}or contact our support team.
                    </p>
                  )}
                </section>
              ))}
            </div>
          </motion.main>
        </div>
      </div>

      <DashboardFooter />
    </>
  );
}
