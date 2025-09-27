(function() {
  try {
    var sidebar = document.querySelector('.gs-left-sidebar');
    if (!sidebar) {
      console.warn('[OffcanvasSidebar] Keine .gs-left-sidebar im DOM gefunden. Skript wird nicht ausgeführt.');
      return;
    }

    var toggleBtn, closeBtn;

    function createToggleBtn() {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = [
        'btn-pink',
        'position-fixed',
        'bottom-0',
        'start-0',
        'm-3'
      ].join(' ');
      btn.setAttribute('data-bs-toggle', 'offcanvas');
      btn.setAttribute('data-bs-target', '#offcanvasSidebar');
      btn.setAttribute('aria-controls', 'offcanvasSidebar');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Sidebar ein-/ausblenden');
      btn.style.zIndex = '1030';
      btn.innerHTML = '<i class="bi-layout-text-sidebar p-0" aria-hidden="true"></i>';
      return btn;
    }

    function createCloseBtn() {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = [
        'btn-close',
        'btn-sm',
        'position-absolute',
        'top-0',
        'end-0',
        'p-2',
        'm-2'
      ].join(' ');
      btn.setAttribute('data-bs-dismiss', 'offcanvas');
      btn.setAttribute('aria-label', 'Close');
      btn.style.zIndex = '15';
      return btn;
    }

    function enableOffcanvas() {
      if (sidebar.dataset.offcanvas) return;
      sidebar.dataset.offcanvas = '1';

      sidebar.id = 'offcanvasSidebar';
      sidebar.classList.add('offcanvas', 'offcanvas-start', 'opacity-100');
      sidebar.setAttribute('data-bs-backdrop', 'true');
      sidebar.setAttribute('data-bs-scroll', 'false');

      closeBtn = createCloseBtn();
      sidebar.insertBefore(closeBtn, sidebar.firstChild);

      toggleBtn = createToggleBtn();
      document.body.appendChild(toggleBtn);

      sidebar.addEventListener('show.bs.offcanvas', function() {
        document.body.classList.add('blurred');
      });
      sidebar.addEventListener('hidden.bs.offcanvas', function() {
        document.body.classList.remove('blurred');
      });
    }

    function disableOffcanvas() {
      if (!sidebar.dataset.offcanvas) return;
      delete sidebar.dataset.offcanvas;

      sidebar.removeAttribute('id');
      sidebar.classList.remove('offcanvas', 'offcanvas-start', 'opacity-100');
      sidebar.removeAttribute('data-bs-backdrop');
      sidebar.removeAttribute('data-bs-scroll');

      if (closeBtn)   { closeBtn.remove();   closeBtn = null; }
      if (toggleBtn)  { toggleBtn.remove();  toggleBtn = null; }

      document.body.classList.remove('blurred');
    }

    function updateSidebarMode() {
      if (window.innerWidth < 992) {
        enableOffcanvas();
      } else {
        disableOffcanvas();
      }
    }

    var resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateSidebarMode, 150);
    });

    document.addEventListener('DOMContentLoaded', updateSidebarMode);

  } catch (err) {
    console.error('[OffcanvasSidebar] Ein Fehler ist aufgetreten:', err);
  }
})();
