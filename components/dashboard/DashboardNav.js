// components/dashboard/DashboardNav.js
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function DashboardNav() {
  const { data: session } = useSession()

  return (
    <nav className="dashboard-nav">
      <div className="nav-content">
        <Link href="/" className="logo">
          <Image 
            src="/images/boltbot.webp"
            alt="BoltBot Logo"
            width={40}
            height={40}
          />
          BoltBot⚡
        </Link>

        <div className="user-profile">
          <Image 
            src={session?.user?.image || "https://cdn.discordapp.com/embed/avatars/0.png"}
            alt="User Avatar"
            width={32}
            height={32}
            className="user-avatar"
          />
          <div className="user-name">{session?.user?.name}</div>
          <div className="dropdown-menu">
            <Link href="/dashboard/profile" className="dropdown-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profile Settings
            </Link>
            <button onClick={() => signOut()} className="dropdown-item danger">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
                }
