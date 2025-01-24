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

      // Start hero animations with extended logo pop
      setTimeout(() => {
        const botAvatar = document.querySelector('.bot-avatar');
        if (botAvatar) {
          // Add pop animation class
          botAvatar.style.animation = 'popAnimation 1s cubic-bezier(0.16, 1, 0.3, 1) forwards';
          
          // Add keyframes if they don't exist
          if (!document.querySelector('#pop-keyframes')) {
            const style = document.createElement('style');
            style.id = 'pop-keyframes';
            style.textContent = `
              @keyframes popAnimation {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.2); opacity: 1; }
                75% { transform: scale(0.9); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
              }

              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }

              @keyframes fadeInUp {
                from { 
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
            `;
            document.head.appendChild(style);
          }

          // Start other hero animations after logo appears
          setTimeout(() => {
            document.querySelector('.hero-content')?.classList.add('animate');
            document.querySelector('.hero h1')?.classList.add('animate');
            document.querySelector('.hero p')?.classList.add('animate');
            document.querySelector('.hero-buttons')?.classList.add('animate');
          }, 400);
        }
      }, 300);
    }, remainingTime);
  };

  // Handle mouse movement for container glow effects
  const handleMouseMove = (e) => {
    const containers = document.querySelectorAll('.landing-content-wrapper');
    containers.forEach(container => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  document.addEventListener('mousemove', handleMouseMove);

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
        
        // Add animation for content wrappers
        if (entry.target.classList.contains('landing-content-wrapper')) {
          entry.target.classList.add('animate');

          // Animate nested content wrappers with delay
          const nestedWrappers = entry.target.querySelectorAll('.landing-content-wrapper');
          nestedWrappers.forEach((wrapper, index) => {
            setTimeout(() => {
              wrapper.classList.add('animate');
            }, 300 + (index * 200));
          });
        }
        
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

        // Animate cards with stagger effect
        const cards = entry.target.querySelectorAll('.landing-feature-card, .landing-tool-card');
        cards.forEach((card, index) => {
          card.style.animationDelay = `${index * 100}ms`;
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
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

  // Easing functions
  const easeOutExpo = (x) => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };

  const easeOutBack = (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all animated elements
  document.querySelectorAll(`
    .landing-feature-card, 
    .landing-tool-card, 
    .landing-stats-card,
    .landing-status-bar,
    .landing-stats-grid,
    .landing-content-wrapper
  `).forEach(element => {
    observer.observe(element);
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
    document.removeEventListener('mousemove', handleMouseMove);
  };
};
