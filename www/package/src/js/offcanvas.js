function toggleOffcanvasFullscreen(offcanvasId) {
    const offcanvas = document.getElementById(offcanvasId);
    const currentWidth = offcanvas.style.getPropertyValue('--bs-offcanvas-width');
    
    if (currentWidth === '100vw') {
      // Zurück zur Bootstrap-Standard (entfernt Override)
      offcanvas.style.removeProperty('--bs-offcanvas-width');
    } else {
      // Auf Fullscreen setzen
      offcanvas.style.setProperty('--bs-offcanvas-width', '100vw');
    }
  }