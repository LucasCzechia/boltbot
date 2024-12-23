// components/dashboard/DashboardNav.js
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
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
    document.documentElement.classList.remove('light-mode', 'dark-mode')
    document.documentElement.classList.add(`${theme}-mode`)
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.remove('light-mode', 'dark-mode')
    document.documentElement.classList.add(`${newTheme}-mode`)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const handleSignOut = async () => {
    try {
      await signOut({ 
        callbackUrl: '/auth/login',
        redirect: true
      })
    } catch (error) {
      console.error('Sign out error:', error)
      router.push('/auth/login')
    }
  }

  const handleClickOutside = (event) => {
    if (showDropdown && !event.target.closest('.user-profile-wrapper')) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showDropdown])

  return (
    <nav className="dashboard-nav">
      <div className="nav-content">
        <Link href="/" className="logo">
          <Image 
            src="/images/boltbot.webp"
            alt="BoltBot Logo"
            width={45}
            height={45}
            priority
          />
          BoltBot⚡
        </Link>

        <div className="user-profile-wrapper">
          <div className="nav-controls">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Moon className="theme-icon" />
              ) : (
                <Sun className="theme-icon" />
              )}
            </button>

            <button 
              className="user-profile-button"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-expanded={showDropdown}
            >
              <Image 
                src={getUserAvatar()}
                alt="User Avatar"
                width={48}
                height={48}
                className="user-avatar"
                unoptimized
              />
            </button>
          </div>

          {showDropdown && (
            <div className="user-dropdown">
              <div className="user-info">
                <Image 
                  src={getUserAvatar()}
                  alt="User Avatar"
                  width={65}
                  height={65}
                  className="dropdown-avatar"
                  unoptimized
                />
                <div className="user-details">
                  <div className="user-name">{displayName}</div>
                  <div className="user-handle">{handle}</div>
                </div>
              </div>
              <button onClick={handleSignOut} className="logout-button">
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
