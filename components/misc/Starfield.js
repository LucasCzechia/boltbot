// components/common/Starfield.js
import { useEffect } from 'react';

export default function Starfield() {
  useEffect(() => {
    const generateStarfield = () => {
      const existingStarfield = document.getElementById('starfield-background');
      if (!existingStarfield) return;
      
      existingStarfield.innerHTML = '';
      
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        existingStarfield.appendChild(star);
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
