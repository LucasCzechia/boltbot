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

      // Start hero animations
      setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('animate');
        document.querySelector('.bot-avatar')?.classList.add('animate');
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
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all cards
  document.querySelectorAll('.landing-feature-card, .landing-tool-card, .landing-stats-card').forEach(card => {
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
