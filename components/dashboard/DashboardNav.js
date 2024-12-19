// components/dashboard/DashboardNav.js
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Moon, Sun, LogOut } from 'lucide-react'

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
    document.documentElement.classList.toggle('dark-theme', theme === 'dark')
    document.documentElement.classList.toggle('light-theme', theme === 'light')
  }, [])

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark-theme')
    document.documentElement.classList.toggle('light-theme')
  }

  const handleSignOut = () => {
    setShowDropdown(false)
    router.push('/auth/login/logout')
  }

  return (
    <nav className="dashboard-nav">
      <div className="nav-content">
        <div className="nav-controls">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun size={20} className="theme-icon" />
            ) : (
              <Moon size={20} className="theme-icon" />
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
                width={40}
                height={40}
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
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
