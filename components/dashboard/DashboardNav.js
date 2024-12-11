// components/dashboard/DashboardNav.js
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function DashboardNav() {
  const { data: session } = useSession()

  const displayName = session?.user?.globalName || session?.user?.name || 'Unknown User'
  const handle = session?.user?.name ? `@${session?.user?.name}` : '@unknown'

  const getUserAvatar = () => {
    if (!session?.user?.image) {
      return "https://cdn.discordapp.com/embed/avatars/0.png"
    }
    return session.user.image
  }

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
            src={getUserAvatar()}
            alt="User Avatar"
            width={32}
            height={32}
            className="user-avatar"
            unoptimized
          />
          <div>
            <div className="user-name">{displayName}</div>
            <div className="user-tag">{handle}</div>
          </div>
          <div className="dropdown-menu">
            <Link href="/dashboard/profile" className="dropdown-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profile Settings
            </Link>
            <Link href="#" className="dropdown-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
              </svg>
              Preferences
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
