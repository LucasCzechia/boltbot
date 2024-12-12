// components/dashboard/GreetingBanner.js
import { useEffect, useState } from 'react'

export default function GreetingBanner({ username }) {
  const [timeOfDay, setTimeOfDay] = useState('')
  const [icon, setIcon] = useState(null)

  useEffect(() => {
    const getTimeBasedContent = () => {
      const hour = new Date().getHours()

      if (hour >= 5 && hour < 12) {
        setTimeOfDay('Good morning')
        setIcon(
          <svg className="greeting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/>
            <path d="M12 20v2"/>
            <path d="M4 12H2"/>
            <path d="M22 12h-2"/>
            <path d="M19.8 4.2l-1.4 1.4"/>
            <path d="M4.2 19.8l1.4-1.4"/>
            <path d="M19.8 19.8l-1.4-1.4"/>
            <path d="M4.2 4.2l1.4 1.4"/>
          </svg>
        )
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay('Good afternoon')
        setIcon(
          <svg className="greeting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 3v2"/>
            <path d="M12 19v2"/>
            <path d="M4 12H2"/>
            <path d="M22 12h-2"/>
          </svg>
        )
      } else if (hour >= 18 && hour < 22) {
        setTimeOfDay('Good evening')
        setIcon(
          <svg className="greeting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
          </svg>
        )
      } else {
        setTimeOfDay('Happy Late night')
        setIcon(
          <svg className="greeting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
            <path d="M7 6 L17 18"/>
          </svg>
        )
      }
    }

    getTimeBasedContent()
    const interval = setInterval(getTimeBasedContent, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="greeting-banner">
      {icon}
      <div className="greeting-text">{timeOfDay}, {username}</div>
    </div>
  )
          }
