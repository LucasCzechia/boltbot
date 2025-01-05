// components/misc/Starfield.js
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const Starfield = () => {
  const [stars, setStars] = useState([]);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const generateStars = () => {
      const starCount = 150;
      const newStars = [];

      for (let i = 0; i < starCount; i++) {
        const star = {
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          duration: `${2 + Math.random() * 3}s`,
          type: i % 3
        };
        newStars.push(star);
      }

      setStars(newStars);
    };

    generateStars();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="starfield-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star star-type-${star.type}`}
          style={{
            left: star.left,
            top: star.top,
            '--duration': star.duration,
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;
