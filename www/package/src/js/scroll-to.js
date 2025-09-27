// js/scroll-to.js
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-bs-scroll-target]').forEach(button => {
      button.addEventListener('click', function() {
        const target = document.querySelector(this.dataset.bsScrollTarget);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });