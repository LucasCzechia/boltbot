// components/dashboard/servers/GreetingBanner.js
import { useEffect, useState } from 'react'
import './GreetingBanner.css'

export default function GreetingBanner({ username }) {
  const [timeOfDay, setTimeOfDay] = useState('')
  const [currentScene, setCurrentScene] = useState('')

  useEffect(() => {
    const getTimeBasedContent = () => {
      const hour = new Date().getHours()

      if (hour >= 5 && hour < 12) {
        setTimeOfDay('Good morning')
        setCurrentScene('morning')
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay('Good afternoon')
        setCurrentScene('afternoon')
      } else if (hour >= 18 && hour < 22) {
        setTimeOfDay('Good evening')
        setCurrentScene('evening')
      } else {
        setTimeOfDay('Good night')
        setCurrentScene('night')
      }
    }

    getTimeBasedContent()
    const interval = setInterval(getTimeBasedContent, 60000)
    return () => clearInterval(interval)
  }, [])

  const renderScene = () => {
    switch(currentScene) {
      case 'morning':
        return (
          <div className="scene morning-scene">
            <div className="sun">
              <div className="ray-container">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="ray" 
                    style={{ 
                      transform: `rotate(${i * 30}deg)`,
                      animationDelay: `${i * 0.2}s`
                    }} 
                  />
                ))}
              </div>
            </div>
          </div>
        )
      case 'afternoon':
        return (
          <div className="scene afternoon-scene">
            <div className="sun">
              <div className="heat-wave" />
            </div>
          </div>
        )
      case 'evening':
        return (
          <div className="scene evening-scene">
            <div className="moon">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="crater" 
                  style={{
                    width: `${8 + i * 2}px`,
                    height: `${8 + i * 2}px`,
                    top: `${15 + i * 5}px`,
                    left: `${10 + i * 12}px`
                  }}
                />
              ))}
            </div>
            <div className="clouds">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="cloud"
                  style={{
                    width: `${40 + Math.random() * 30}px`,
                    height: `${10 + Math.random() * 10}px`,
                    top: `${20 + Math.random() * 100}px`,
                    animationDelay: `${i * 3}s`
                  }}
                />
              ))}
            </div>
          </div>
        )
      case 'night':
        return (
          <div className="scene night-scene">
            <div className="moon" />
            <div className="constellation">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="constellation-line"
                  style={{
                    width: '40px',
                    left: `${40 + i * 20}px`,
                    top: `${40 + i * 10}px`,
                    transform: `rotate(${45 + i * 15}deg)`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
            {[...Array(30)].map((_, i) => (
              <div 
                key={i}
                className="star"
                style={{
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  left: `${Math.random() * 180}px`,
                  top: `${Math.random() * 180}px`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="greeting-banner">
      <div className="icon-container">
        {renderScene()}
      </div>
      <div className="greeting-text">{timeOfDay}, {username}</div>
    </div>
  )
}
