// utils/animation.js
export const initializeAnimations = () => {
  // Ensure loading screen shows for minimum time
  const MINIMUM_LOADING_TIME = 1500;
  const loadStart = Date.now();

  const startLoadingAnimations = () => {
    const timeElapsed = Date.now() - loadStart;
    const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - timeElapsed);

    // Delay hiding loading screen to ensure minimum display time
    setTimeout(() => {
      const loadingScreen = document.querySelector('.loading-screen');
      const contentWrapper = document.querySelector('.content-wrapper');
      
      if (loadingScreen) {
        loadingScreen.classList.add('hide');
      }
      
      if (contentWrapper) {
        contentWrapper.classList.add('loaded');
      }

      // Start hero animations with new logo pop
      setTimeout(() => {
        const botAvatar = document.querySelector('.bot-avatar');
        if (botAvatar) {
          // Add pop animation class
          botAvatar.style.animation = 'popAnimation 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
          
          // Add keyframes if they don't exist
          if (!document.querySelector('#pop-keyframes')) {
            const style = document.createElement('style');
            style.id = 'pop-keyframes';
            style.textContent = `
              @keyframes popAnimation {
                0% { transform: scale(0); }
                60% { transform: scale(1.2); }
                100% { transform: scale(1); }
              }
            `;
            document.head.appendChild(style);
          }
        }

        document.querySelector('.hero-content')?.classList.add('animate');
        document.querySelector('.hero h1')?.classList.add('animate');
        document.querySelector('.hero p')?.classList.add('animate');
        document.querySelector('.hero-buttons')?.classList.add('animate');
      }, 300);
    }, remainingTime);
  };

  // Initialize intersection observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Handle statistics animations specifically
        if (entry.target.classList.contains('landing-status-bar') || 
            entry.target.classList.contains('landing-stats-grid')) {
          
          // Animate status indicators
          const indicators = entry.target.querySelectorAll('.landing-status-indicator');
          indicators.forEach((indicator, index) => {
            setTimeout(() => {
              indicator.style.animation = 'pulse 2s infinite';
            }, index * 200);
          });

          // Animate response gauge
          const gauge = entry.target.querySelector('.landing-gauge-fill');
          if (gauge) {
            setTimeout(() => {
              gauge.style.width = gauge.dataset.width || '75%';
            }, 300);
          }

          // Animate stat numbers with counting effect
          const numbers = entry.target.querySelectorAll('.landing-highlight');
          numbers.forEach((number, index) => {
            const finalValue = parseInt(number.textContent.replace(/,/g, ''));
            if (!isNaN(finalValue)) {
              animateNumber(number, finalValue, 2000, index * 200);
            }
          });
        }
      }
    });
  };

  const animateNumber = (element, final, duration, delay) => {
    const start = 0;
    const step = (timestamp) => {
      if (!element.startTime) {
        element.startTime = timestamp + delay;
      }

      const elapsed = timestamp - element.startTime;
      
      if (elapsed < 0) {
        requestAnimationFrame(step);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.floor(start + (final - start) * easedProgress);
      
      element.textContent = new Intl.NumberFormat().format(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  // Easing function for smoother number animation
  const easeOutExpo = (x) => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all animated elements
  document.querySelectorAll(`
    .landing-feature-card, 
    .landing-tool-card, 
    .landing-stats-card,
    .landing-status-bar,
    .landing-stats-grid
  `).forEach(card => {
    observer.observe(card);
  });

  // Start animations after page loads
  if (document.readyState === 'complete') {
    startLoadingAnimations();
  } else {
    window.addEventListener('load', startLoadingAnimations);
  }

  // Cleanup function
  return () => {
    observer.disconnect();
    window.removeEventListener('load', startLoadingAnimations);
  };
};
