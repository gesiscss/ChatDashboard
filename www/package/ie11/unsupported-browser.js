/*
 This script file is dynamically added as a '<script src="...unsupported-browser.js">' element when
 setup.typoscript's inline '<script>' notices the website is being visited with an Internet Explorer.
 This setup allows to save one unnecessary HTTP request for all other (good) browsers.
 
 Also, this script is not part of the webpack build, as the built index.js is 
 not compatible with Internet Explorer.
*/
document.addEventListener('DOMContentLoaded', function() {
  console.warn('unsupported browser');
  
  window.language = document.getElementsByTagName('html')[0].lang;

  let modalTitle, modalClose, modalContent;
  if ('de' === language) {
    modalTitle = 'Nicht unterstützter Browser';
    modalClose = 'Nachricht schließen';
    modalContent = 'Ihr Browser stellt diese Webseite falsch dar. Bitte benutzen Sie einen alternativen Browser.';
  }
  else {
    modalTitle = 'Unsupported browser';
    modalClose = 'Close message';
    modalContent = 'Your browser does not display this website correctly. Please use an alternative browser.';
  }
  
  const micromodalString = 
  '<div class="modal micromodal-slide is-open" id="modal-unsupported-browser" aria-hidden="false" aria-live="assertive">\n' +
  '  <div class="modal__overlay" tabindex="-1">\n' +
  '    <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-unsupported-browser-title" aria-describedby="modal-unsupported-browser-content">\n' +
  '      <header class="modal__header">\n' +
  '        <strong class="modal__title" id="modal-unsupported-browser-title">\n' +
             modalTitle +
  '        </strong>\n' +
  '        <button class="modal__close" aria-label="' + modalClose + '"></button>\n' +
  '      </header>\n' +
  '      <div class="modal__content" id="modal-unsupported-browser-content">\n' +
  '        <p>\n' +
             modalContent +
  '        </p>\n' +
  '      </div>\n' +
  '      <footer class="modal__footer">\n' +
  '        <button class="modal__btn modal__btn-primary" id="modal-unsupported-browser-ok">\n' +
             modalClose +
  '        </button>\n' +
  '      </footer>\n' +
  '    </div>\n' +
  '  </div>\n' +
  '</div>\n';
  
  document.body.insertAdjacentHTML('afterbegin', micromodalString);
  
  /*
  var closeButton1 = document.getElementById('modal-unsupported-browser-ok');
  closeButton1.addEventListener('click', function () {
    document.getElementById('modal-unsupported-browser').classList.remove('is-open');
  });
  */
  var modal = document.getElementById('modal-unsupported-browser');
  modal.addEventListener('click', function () {
    document.getElementById('modal-unsupported-browser').classList.remove('is-open');
  });
});
