import {
  getMeta,
  getLanguage,
} from './gesis-helpers.js';

const conditionallyShow404ModalOnActiveResolvingStrategy = function() {
  if ( getMeta("gesis-page-not-found") === "true" ) {
    let modalTitle, modalClose, modalContent;
    const language = getLanguage();
    if ('de' === language) {
      modalTitle = 'Seite nicht gefunden (404)';
      modalClose = 'Nachricht schließen';
      modalContent = 'Die von Ihnen aufgerufene Seite existiert nicht oder nicht mehr.<br/> Stattdessen zeigen wir Ihnen eine übergeordnete Seite.';
    }
    else {
      modalTitle = 'Page not found (404)';
      modalClose = 'Close message';
      modalContent = 'The page you requested does not exist or does not exist anymore.<br/> Instead, we present you a superordinate page.';
    }
    
    const pageNotFoundDialogString = `
  <!-- BEGIN conditional dialog modal on 404 resolving strategy
    if HTML document contains marker meta element <meta name="gesis-page-not-found" content="true"> -->
  <dialog id="dialog-page-not-found">
    <header>
      <strong>${modalTitle}</strong>
      <button aria-labelledby="dialog-page-not-found-close" data-action-close="true"></button>
    </header>
    <div class="dialog-content">
      <p>${modalContent}</p>
    </div>
    <footer>
      <button id="dialog-page-not-found-close" data-action-close="true">${modalClose}</button>
    </footer>
  </dialog>
  <!-- END conditional dialog modal on 404 resolving strategy -->
`;
    document.body.insertAdjacentHTML('afterbegin', pageNotFoundDialogString);
    const pageNotFoundDialogElement = document.getElementById('dialog-page-not-found');
    initializeDialog(pageNotFoundDialogElement);
    pageNotFoundDialogElement.showModal();
  }
};

const initializeDialog = function(dialogElement) {
  // enhance opened standard HTML dialog element by closing it when clicking outside of it
  dialogElement.addEventListener('click', function(event) {
    // console.log("event", event);
    const eventTarget = event.target;
    //console.log("eventTarget", eventTarget);
    
    if (dialogElement === eventTarget) {
      // console.log("click on dialog element's content, padding, border, or margin");
      const dialogElementRect = dialogElement.getBoundingClientRect();
      // console.log("dialogElementRect.width", dialogElementRect.width);
      // console.log("dialogElementRect.height", dialogElementRect.height);
      // console.log("dialogElementRect.top", dialogElementRect.top);
      // console.log("dialogElementRect.left", dialogElementRect.left);
      // console.log("event.offsetX", event.offsetX);
      // console.log("event.clientX", event.clientX);
      // console.log("event.offsetY", event.offsetY);
      // console.log("event.clientY", event.clientY)
      if (
        (dialogElementRect.top > event.clientY) ||
        (event.clientY > (dialogElementRect.top + dialogElementRect.height)) ||
        (dialogElementRect.left > event.clientX) ||
        (event.clientX > (dialogElementRect.left + dialogElementRect.width))
      ) {
        // console.log("click on dialog element's margin. closing dialog element");
        dialogElement.close();
      }
      else {
        // console.log("click on dialog element's content, padding, or border");
      }
    }
    else {
      // console.log("click on an element WITHIN dialog element");
    }
  });
  
  const maybeDialogFormElement = dialogElement.querySelector('form[method="dialog"]');
  if (! maybeDialogFormElement) {
    // this dialog element does NOT contain a "<form method="dialog">".
    // Hence, any contained buttons intended for closing the dialog will
    // NOT be automatically set up for closing the dialog
    // (see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#usage_notes ).
    // Therefore, programmatically set up close buttons
    const closeButtons = dialogElement.querySelectorAll('button[data-action-close], button[data-action-cancel]');
    closeButtons.forEach(closeButton => {
      closeButton.addEventListener('click', () => dialogElement.close() );
    });
  }
  
  return dialogElement;
};

export {
  conditionallyShow404ModalOnActiveResolvingStrategy,
  initializeDialog,
};
