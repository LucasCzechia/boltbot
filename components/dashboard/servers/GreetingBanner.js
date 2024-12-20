import React, { useEffect, useState } from 'react';

const TimeGreeting = () => {
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setTimeOfDay('morning');
        setGreeting('Good morning');
      } else if (hour >= 12 && hour < 17) {
        setTimeOfDay('afternoon');
        setGreeting('Good afternoon');
      } else if (hour >= 17 && hour < 21) {
        setTimeOfDay('evening');
        setGreeting('Good evening');
      } else {
        setTimeOfDay('night');
        setGreeting('Good night');
      }
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const MorningScene = () => (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 animate-bounce shadow-lg">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 45}deg) translateX(50%)`,
                transformOrigin: '0 50%',
                animation: 'rayPulse 2s ease-in-out infinite',
                animationDelay: `${i * 0.25}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const AfternoonScene = () => (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-lg">
          <div className="absolute -inset-4 opacity-20 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-300 to-transparent animate-spin" 
                 style={{ animationDuration: '10s' }} />
          </div>
        </div>
      </div>
    </div>
  );

  const EveningScene = () => (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-yellow-400 shadow-lg overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-orange-100 opacity-20"
              style={{
                top: `${20 + i * 30}%`,
                left: `${10 + i * 25}%`,
                animation: 'craterGlow 4s ease-in-out infinite',
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 h-full overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute h-2 bg-gray-200 opacity-10 rounded-full animate-cloudDrift"
            style={{
              width: `${40 + i * 20}px`,
              top: `${20 + i * 30}%`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );

  const NightScene = () => (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-200 shadow-lg">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-white opacity-20"
          style={{
            width: `${20 + i * 10}px`,
            top: `${30 + i * 20}%`,
            left: `${20 + i * 15}%`,
            transform: `rotate(${45 + i * 30}deg)`,
            animation: 'constellationGlow 4s ease-in-out infinite',
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </div>
  );

  const sceneComponents = {
    morning: MorningScene,
    afternoon: AfternoonScene,
    evening: EveningScene,
    night: NightScene
  };

  const CurrentScene = sceneComponents[timeOfDay];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 p-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 relative">
          <CurrentScene />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{greeting}</h1>
      </div>
    </div>
  );
};

export default TimeGreeting;
