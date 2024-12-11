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
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        )
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay('Good afternoon')
        setIcon(
          <svg className="greeting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 12a5 5 0 1 0-10 0"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
          </svg>
        )
      } else if (hour >= 18 && hour < 22) {
        setTimeOfDay('Good evening')
        setIcon(
          <svg className="greeting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )
      } else {
        setTimeOfDay('Late night')
        setIcon(
          <svg className="greeting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49A5 5 0 1 1 12 21a4.97 4.97 0 0 1-1.24-.16"/>
            <path d="M5 3l14 18"/>
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
