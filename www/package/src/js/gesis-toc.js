document.addEventListener('DOMContentLoaded', () => {
  const ENABLE_WIDTH = 992;

  // Elemente einlesen
  const toc       = document.querySelector('.gs-toc');
  const stickyNav = document.querySelector('.microsite-menu');
  const footer    = document.querySelector('footer');
  const tocLinks  = toc ? toc.querySelectorAll('a[href^="#"]') : null;
  const sections  = tocLinks
    ? Array.from(tocLinks)
        .map(a => document.getElementById(a.getAttribute('href').slice(1)))
        .filter(Boolean)
    : null;

  // Guard: prüfen, ob überhaupt TOC & Nav existieren
  if (!toc) {
    console.warn('TOC-Script: Kein Element mit .gs-toc gefunden – Script abgebrochen.');
    return;
  }
  if (!stickyNav) {
    console.warn('TOC-Script: Keine .microsite-menu Navigation gefunden – Script abgebrochen.');
    return;
  }
  if (!tocLinks.length || !sections.length) {
    console.warn('TOC-Script: TOC-Links oder Sections fehlen oder ungültig – Script abgebrochen.');
    return;
  }

  // Variablen
  let initialTocY, navHeight, gap, topOffset, thresholdY, initialWidth;
  let isFixed   = false;
  let observer  = null;
  let isEnabled = false;

  // Hilfsfunktionen
  function readGap() {
    const raw = getComputedStyle(document.documentElement)
                     .getPropertyValue('--gs-toc-my').trim() || '0px';
    return parseFloat(raw);
  }

  function initValues() {
    try {
      const tocRect = toc.getBoundingClientRect();
      const navRect = stickyNav.getBoundingClientRect();
      gap           = readGap();
      navHeight     = navRect.height;
      initialTocY   = tocRect.top + window.scrollY;
      initialWidth  = tocRect.width;
      topOffset     = navHeight + gap;
      thresholdY    = initialTocY - topOffset;

      document.documentElement.style.setProperty('--gs-toc-offset', `${topOffset}px`);
      document.documentElement.style.setProperty('--gs-toc-width',  `${initialWidth}px`);
    } catch (err) {
      console.error('TOC-Script initValues-Fehler:', err);
      throw err;
    }
  }

  function updateMaxHeight() {
    try {
      const navRect   = stickyNav.getBoundingClientRect();
      const footerTop = footer ? footer.getBoundingClientRect().top : window.innerHeight;
      const bottomEdge= Math.min(window.innerHeight, footerTop);
      const maxH      = bottomEdge - navRect.bottom - gap;
      document.documentElement.style.setProperty(
        '--gs-toc-max-height',
        `${Math.max(maxH, 0)}px`
      );
    } catch (err) {
      console.error('TOC-Script updateMaxHeight-Fehler:', err);
    }
  }

  function onScroll() {
    try {
      updateMaxHeight();
      const y = window.scrollY;
      if (!isFixed && y > thresholdY) {
        toc.classList.add('fixed');
        isFixed = true;
      } else if (isFixed && y <= thresholdY) {
        toc.classList.remove('fixed');
        isFixed = false;
      }
    } catch (err) {
      console.error('TOC-Script onScroll-Fehler:', err);
    }
  }

  function setupObserver() {
    try {
      if (observer) observer.disconnect();

      const options = {
        root: null,
        rootMargin: `-${topOffset}px 0px 0px 0px`,
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
      };
      const visibility = new Map();

      observer = new IntersectionObserver(entries => {
        try {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0) visibility.set(entry.target, entry.intersectionRatio);
            else visibility.delete(entry.target);
          });
          let maxRatio = 0, mostVisible = null;
          visibility.forEach((ratio, section) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              mostVisible = section;
            }
          });
          tocLinks.forEach(link => {
            const isActive = mostVisible &&
              link.getAttribute('href').slice(1) === mostVisible.id;
            link.classList.toggle('active', isActive);
          });
        } catch (innerErr) {
          console.error('TOC-Script Observer-Callback-Fehler:', innerErr);
        }
      }, options);

      sections.forEach(sec => observer.observe(sec));
    } catch (err) {
      console.error('TOC-Script setupObserver-Fehler:', err);
    }
  }

  // Enable/Disable
  function enable() {
    try {
      initValues();
      updateMaxHeight();
      onScroll();
      setupObserver();
      window.addEventListener('scroll', onScroll, { passive: true });
      isEnabled = true;
    } catch (err) {
      console.error('TOC-Script enable-Fehler:', err);
    }
  }

  function disable() {
    window.removeEventListener('scroll', onScroll);
    if (observer) observer.disconnect();
    toc.classList.remove('fixed');
    tocLinks.forEach(link => link.classList.remove('active'));
    isEnabled = false;
  }

  function checkEnable() {
    try {
      if (window.innerWidth >= ENABLE_WIDTH) {
        if (!isEnabled) enable();
        else {
          // nur neu messen und Observer neu starten
          initValues();
          updateMaxHeight();
          onScroll();
          setupObserver();
        }
      } else if (isEnabled) {
        disable();
      }
    } catch (err) {
      console.error('TOC-Script checkEnable-Fehler:', err);
    }
  }

  // Initial & Resize
  try {
    checkEnable();
    window.addEventListener('resize', () => {
      checkEnable();
    });
  } catch (err) {
    console.error('TOC-Script Initialisierung fehlgeschlagen:', err);
  }
});
