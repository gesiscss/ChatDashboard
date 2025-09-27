const observer = new MutationObserver((mutations, obs) => {
    if (document.querySelector('.microsite-menu')) {
      document.documentElement.style.setProperty('--gs-scroll-padding--top', '6rem');
      obs.disconnect(); // wenn nur einmal nötig
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });