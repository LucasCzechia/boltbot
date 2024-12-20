import React, { useEffect, useState } from 'react';

const TimeGreeting = ({ username = 'user' }) => {
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setTimeOfDay('morning');
        setGreeting('Good morning');
      } else if (hour >= 12 && hour < 17) {
        setTimeOfDay('afternoon');
        setGreeting('Good afternoon');
      } else if (hour >= 17 && hour < 20) {
        setTimeOfDay('evening');
        setGreeting('Good evening');
      } else {
        setTimeOfDay('night');
        setGreeting('Good night');
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderScene = () => {
    switch (timeOfDay) {
      case 'morning':
        return (
          <div className="scene morning-scene">
            <div className="sun">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="ray"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
        );
      case 'afternoon':
        return (
          <div className="scene afternoon-scene">
            <div className="sun">
              <div className="heat-waves">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="heat-wave"
                    style={{
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'evening':
        return (
          <div className="scene evening-scene">
            <div className="moon">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="crater"
                  style={{
                    width: `${8 + i * 4}px`,
                    height: `${8 + i * 4}px`,
                    top: `${10 + i * 12}px`,
                    left: `${8 + i * 10}px`,
                  }}
                />
              ))}
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="cloud"
                  style={{
                    width: `${30 + i * 10}px`,
                    height: '8px',
                    top: `${15 + i * 15}px`,
                    animationDelay: `${i * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        );
      case 'night':
        return (
          <div className="scene night-scene">
            <div className="moon">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="star"
                  style={{
                    width: '2px',
                    height: '2px',
                    top: `${10 + Math.random() * 30}px`,
                    left: `${10 + Math.random() * 30}px`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="constellation-line"
                  style={{
                    width: '15px',
                    transform: `rotate(${45 + i * 45}deg)`,
                    top: '50%',
                    left: '50%',
                  }}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="greeting-banner">
      <div className="greeting-icon">{renderScene()}</div>
      <div className="greeting-content">
        <h1 className="greeting-text">
          {greeting}, <span className="greeting-username">{username}</span>
        </h1>
      </div>
    </div>
  );
};

export default TimeGreeting;

const styles = `
:root {
  --greeting-text-color: #f8f9fa;
  --greeting-icon-color: #f8f9fa;
  --sun-primary: #FFD700;
  --sun-secondary: #FFA500;
  --afternoon-primary: #FF8C00;
  --afternoon-secondary: #FF4500;
  --evening-primary: #FFE5B4;
  --evening-secondary: #FFD700;
  --night-primary: #E6E6FA;
  --night-secondary: #B0C4DE;
}

[data-theme="light"] {
  --greeting-text-color: #1a1a1a;
  --greeting-icon-color: #1a1a1a;
}

.greeting-banner {
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.greeting-icon {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  color: var(--greeting-icon-color);
  transition: color 0.3s ease;
  position: relative;
}

.greeting-content {
  flex-grow: 1;
  min-width: 0;
}

.scene {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.morning-scene .sun {
  width: 32px;
  height: 32px;
  background: linear-gradient(45deg, var(--sun-primary), var(--sun-secondary));
  border-radius: 50%;
  position: relative;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
  animation: float 3s ease-in-out infinite;
}

.morning-scene .ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 2px;
  background: linear-gradient(90deg, var(--sun-primary), transparent);
  transform-origin: 0 50%;
  animation: rayGlow 3s ease-in-out infinite;
}

.afternoon-scene .sun {
  width: 32px;
  height: 32px;
  background: linear-gradient(45deg, var(--afternoon-primary), var(--afternoon-secondary));
  border-radius: 50%;
  position: relative;
  filter: drop-shadow(0 0 15px rgba(255, 140, 0, 0.6));
}

.heat-waves {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: rotate 10s linear infinite;
}

.heat-wave {
  position: absolute;
  width: 140%;
  height: 140%;
  top: -20%;
  left: -20%;
  border-radius: 50%;
  border: 1px solid rgba(255, 140, 0, 0.2);
  animation: expand 3s ease-in-out infinite;
}

.evening-scene .moon {
  width: 32px;
  height: 32px;
  background: linear-gradient(45deg, var(--evening-primary), var(--evening-secondary));
  border-radius: 50%;
  position: relative;
  filter: drop-shadow(0 0 10px rgba(255, 229, 180, 0.4));
  overflow: visible;
}

.evening-scene .cloud {
  position: absolute;
  background: var(--greeting-icon-color);
  opacity: 0.2;
  border-radius: 10px;
  animation: drift 8s linear infinite;
}

.evening-scene .crater {
  position: absolute;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  animation: glow 4s ease-in-out infinite alternate;
}

.night-scene .moon {
  width: 32px;
  height: 32px;
  background: linear-gradient(45deg, var(--night-primary), var(--night-secondary));
  border-radius: 50%;
  position: relative;
  filter: drop-shadow(0 0 10px rgba(230, 230, 250, 0.4));
}

.night-scene .star {
  position: absolute;
  background: var(--greeting-icon-color);
  border-radius: 50%;
  animation: twinkle 2s ease-in-out infinite;
}

.night-scene .constellation-line {
  position: absolute;
  height: 1px;
  background: var(--greeting-icon-color);
  opacity: 0.3;
  transform-origin: left center;
  animation: fade 4s ease-in-out infinite alternate;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes rayGlow {
  0%, 100% { opacity: 0.3; transform: rotate(var(--rotation)) scaleX(1); }
  50% { opacity: 0.6; transform: rotate(var(--rotation)) scaleX(1.2); }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes expand {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.2); opacity: 0.4; }
}

@keyframes drift {
  0% { transform: translateX(-100%); opacity: 0; }
  20%, 80% { opacity: 0.2; }
  100% { transform: translateX(100%); opacity: 0; }
}

@keyframes glow {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.2; }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

@keyframes fade {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}

.greeting-text {
  color: var(--greeting-text-color);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1.2;
  word-wrap: break-word;
  hyphens: auto;
}

.greeting-username {
  display: inline-block;
  color: var(--greeting-text-color);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .greeting-banner {
    padding: 1.25rem;
  }
  
  .greeting-icon {
    width: 36px;
    height: 36px;
    margin-top: 0.25rem;
  }
  
  .morning-scene .sun,
  .afternoon-scene .sun,
  .evening-scene .moon,
  .night-scene .moon {
    width: 28px;
    height: 28px;
  }
  
  .greeting-text {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .greeting-banner {
    padding: 1rem;
  }
  
  .greeting-icon {
    width: 32px;
    height: 32px;
  }
  
  .morning-scene .sun,
  .afternoon-scene .sun,
  .evening-scene .moon,
  .night-scene .moon {
    width: 24px;
    height: 24px;
  }
  
  .morning-scene .ray {
    width: 20px;
  }
  
  .greeting-text {
    font-size: 1.5rem;
  }
}

@media (max-width: 360px) {
  .greeting-banner {
    padding: 0.875rem;
  }
  
  .greeting-icon {
    width: 28px;
    height: 28px;
  }
  
  .greeting-text {
    font-size: 1.25rem;
  }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
