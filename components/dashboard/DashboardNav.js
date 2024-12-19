// components/dashboard/DashboardNav.js
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function DashboardNav() {
  const { data: session } = useSession()
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const displayName = session?.user?.globalName || session?.user?.name || 'Unknown User'
  const handle = session?.user?.name ? `@${session?.user?.name}` : '@unknown'

  const getUserAvatar = () => {
    if (!session?.user?.image) {
      return "https://cdn.discordapp.com/embed/avatars/0.png"
    }
    return session.user.image
  }

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark'
    setIsDarkMode(theme === 'dark')
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const handleSignOut = () => {
    setShowDropdown(false)
    router.push('/auth/login/logout')
  }

  return (
    <nav className="dashboard-nav">
      <div className="nav-content">
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <Moon size={20} className="theme-icon" />
          ) : (
            <Sun size={20} className="theme-icon" />
          )}
        </button>

        <div className="user-profile-wrapper">
          <button 
            className="user-profile-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Image 
              src={getUserAvatar()}
              alt="User Avatar"
              width={32}
              height={32}
              className="user-avatar"
              unoptimized
            />
          </button>

          {showDropdown && (
            <div className="user-dropdown">
              <div className="user-info">
                <div className="user-name">{displayName}</div>
                <div className="user-handle">{handle}</div>
              </div>
              <button onClick={handleSignOut} className="logout-button">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
