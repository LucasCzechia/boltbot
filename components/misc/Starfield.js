// components/misc/Starfield.js 
import { useEffect, useCallback } from 'react';

export default function Starfield() {
  const generateStarfield = useCallback(() => {
    const container = document.getElementById('starfield-background');
    if (!container) return;
    
    container.innerHTML = '';
    const numStars = 150;
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    
    const colors = theme === 'light' 
      ? ['rgba(255, 204, 0, 0.8)', 'rgba(255, 153, 0, 0.8)', 'rgba(0, 0, 0, 0.6)']
      : ['rgba(255, 204, 0, 0.8)', 'rgba(255, 153, 0, 0.8)', 'rgba(255, 255, 255, 0.8)'];
    
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
  }, []);

  useEffect(() => {
    generateStarfield();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          generateStarfield();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    window.addEventListener('resize', generateStarfield);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', generateStarfield);
    };
  }, [generateStarfield]);

  return <div id="starfield-background" className="starfield-container" />;
}
