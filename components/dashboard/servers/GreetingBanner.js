import React, { useEffect, useState } from 'react';

const TimeGreeting = () => {
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
      <h1 className="greeting-text">{greeting}</h1>
    </div>
  );
};

export default TimeGreeting;
