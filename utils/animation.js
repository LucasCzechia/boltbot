// utils/animation.js
export const initializeAnimations = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all cards
  document.querySelectorAll('.landing-feature-card, .landing-tool-card, .landing-stats-card').forEach(card => {
    observer.observe(card);
  });

  // Observe section titles
  document.querySelectorAll('.landing-container-title').forEach(title => {
    observer.observe(title);
  });

  // Observe statistics
  document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
  });

  // Observe generic elements
  document.querySelectorAll('.observe-element').forEach(element => {
    observer.observe(element);
  });

  // Cleanup function
  return () => observer.disconnect();
};
