// components/dashboard/server/DashboardSidebar.js
import { useState } from 'react';
import Link from 'next/link';

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className={`menu-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      />

      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="nav-section">
          <h3 className="nav-section-title">General</h3>
          <ul className="nav-links">
            <li>
              <Link href="#overview" className="nav-link active">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Overview
              </Link>
            </li>
            <li>
              <Link href="#settings" className="nav-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                Settings
              </Link>
            </li>
            <li>
              <Link href="#features" className="nav-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Features
              </Link>
            </li>
            <li>
              <Link href="#logs" className="nav-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
                Logs
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="nav-section-title">Tools</h3>
          <ul className="nav-links">
            <li>
              <Link href="#commands" className="nav-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>
                </svg>
                Commands
              </Link>
            </li>
            <li>
              <Link href="#custom-responses" className="nav-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Custom Responses
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
                  }
