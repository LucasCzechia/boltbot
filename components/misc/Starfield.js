// components/misc/Starfield.js
import { useEffect } from 'react';

export default function Starfield() {
  useEffect(() => {
    const generateStarfield = () => {
      const container = document.getElementById('starfield-background');
      if (!container) return;
      
      container.innerHTML = '';
      
      const numStars = 150;
      const colors = ['#ffcc00', '#ff9900', '#ffffff'];
      
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        star.style.width = `${1 + Math.random() * 2}px`;
        star.style.height = star.style.width;
        container.appendChild(star);
      }
    };

    generateStarfield();
    window.addEventListener('resize', generateStarfield);

    return () => {
      window.removeEventListener('resize', generateStarfield);
    };
  }, []);

  return <div id="starfield-background" className="starfield-container" />;
}
