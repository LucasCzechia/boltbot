// components/dashboard/servers/GreetingBanner.js
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
            <g className="morning-sun">
              <circle cx="12" cy="12" r="4" className="sun-core"/>
              <g className="sun-rays">
                <line x1="12" y1="2" x2="12" y2="4"/>
                <line x1="12" y1="20" x2="12" y2="22"/>
                <line x1="4" y1="12" x2="2" y2="12"/>
                <line x1="20" y1="12" x2="22" y2="12"/>
                <line x1="6.34" y1="6.34" x2="4.93" y2="4.93"/>
                <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/>
                <line x1="6.34" y1="17.66" x2="4.93" y2="19.07"/>
                <line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>
              </g>
              <circle cx="12" cy="12" r="6" className="sun-glow" strokeWidth="0.5" opacity="0.5"/>
            </g>
          </svg>
        )
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay('Good afternoon')
        setIcon(
          <svg className="greeting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <g className="afternoon-sun">
              <circle cx="12" cy="12" r="5" className="sun-body"/>
              <g className="sun-beams">
                <path d="M12 2v4"/>
                <path d="M12 18v4"/>
                <path d="M4 12H2"/>
                <path d="M22 12h-2"/>
                <path d="M6.34 6.34l-1.41-1.41"/>
                <path d="M19.07 19.07l-1.41-1.41"/>
                <path d="M6.34 17.66l-1.41 1.41"/>
                <path d="M19.07 4.93l-1.41 1.41"/>
              </g>
              <circle cx="12" cy="12" r="8" className="sun-aura" strokeWidth="0.5" opacity="0.3"/>
            </g>
          </svg>
        )
      } else if (hour >= 18 && hour < 22) {
        setTimeOfDay('Good evening')
        setIcon(
          <svg className="greeting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <g className="evening-moon">
              <path 
                d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" 
                className="moon-body"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="15" cy="9" r="0.5" className="moon-crater" fill="currentColor" opacity="0.5"/>
              <circle cx="18" cy="6" r="0.3" className="moon-crater" fill="currentColor" opacity="0.3"/>
              <path 
                d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" 
                className="moon-glow"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </g>
          </svg>
        )
      } else {
        setTimeOfDay('Good night')
        setIcon(
          <svg className="greeting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
            <path d="M7 6 L17 18"/>
          </svg>
            <g className="night-scene">
              <path 
                d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" 
                className="moon-body"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g className="stars">
                {[...Array(6)].map((_, i) => (
                  <g key={i} className={`star-group-${i + 1}`}>
                    <circle 
                      cx={14 + i * 1.5} 
                      cy={4 + i} 
                      r="0.5" 
                      className="star" 
                      fill="currentColor"
                    />
                    <circle 
                      cx={14 + i * 1.5} 
                      cy={4 + i} 
                      r="1" 
                      className="star-glow" 
                      fill="url(#star-glow)"
                    />
                  </g>
                ))}
              </g>
              <circle cx="15" cy="9" r="0.3" className="moon-crater" fill="currentColor" opacity="0.5"/>
              <circle cx="18" cy="6" r="0.2" className="moon-crater" fill="currentColor" opacity="0.3"/>
            </g>
          </svg>
        )
      }
    }

    getTimeBasedContent()
    const interval = setInterval(getTimeBasedContent, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="greeting-banner">
      {icon}
      <div className="greeting-text">{timeOfDay}, {username}</div>

      <style jsx>{`
        .greeting-icon {
          --primary: #ffcc00;
          --glow: rgba(255, 204, 0, 0.2);
          width: 42px;
          height: 42px;
          color: var(--primary);
        }

        /* Morning Animations */
        .morning-sun {
          animation: rise 1s ease-out;
        }
        .sun-core {
          animation: pulse 2s ease-in-out infinite;
        }
        .sun-rays line {
          animation: rayPulse 2s ease-in-out infinite;
          stroke-linecap: round;
          transform-origin: center;
        }
        .sun-glow {
          animation: glowPulse 2s ease-in-out infinite alternate;
        }

        /* Afternoon Animations */
        .afternoon-sun {
          animation: rotate 20s linear infinite;
        }
        .sun-beams {
          animation: beamRotate 10s linear infinite;
        }
        .sun-body {
          animation: sunScale 2s ease-in-out infinite;
        }
        .sun-aura {
          animation: auraGlow 3s ease-in-out infinite alternate;
        }

        /* Evening Animations */
        .evening-moon {
          animation: moonRise 1s ease-out;
        }
        .moon-body {
          animation: moonGlow 3s ease-in-out infinite alternate;
        }
        .moon-crater {
          animation: craterFade 4s ease-in-out infinite alternate;
        }

        /* Night Animations */
        .night-scene {
          animation: nightFade 1s ease-out;
        }
        .stars circle {
          animation: twinkle 1.5s ease-in-out infinite alternate;
        }
        .star-group-1 { animation-delay: 0s; }
        .star-group-2 { animation-delay: 0.3s; }
        .star-group-3 { animation-delay: 0.6s; }
        .star-group-4 { animation-delay: 0.9s; }
        .star-group-5 { animation-delay: 1.2s; }
        .star-group-6 { animation-delay: 1.5s; }

        @keyframes rise {
          from { transform: translateY(20%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes rayPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes glowPulse {
          from { opacity: 0.3; }
          to { opacity: 0.6; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes beamRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes sunScale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes auraGlow {
          from { opacity: 0.1; }
          to { opacity: 0.4; }
        }

        @keyframes moonRise {
          from { transform: translateY(20%) rotate(-45deg); opacity: 0; }
          to { transform: translateY(0) rotate(0deg); opacity: 1; }
        }

        @keyframes moonGlow {
          from { filter: drop-shadow(0 0 2px var(--glow)); }
          to { filter: drop-shadow(0 0 8px var(--glow)); }
        }

        @keyframes craterFade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        @keyframes nightFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes twinkle {
          from { opacity: 0.2; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
