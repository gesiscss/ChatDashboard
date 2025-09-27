const setupSkipLinks = function() {
  // JavaScript-based workaround for skip link animation in IE 11 and Edge
  // as these browsers don't support :focus-within pseudostate as of 2020-05-20
  const skipLinks = document.getElementsByClassName('skip-links')
  for (const skipLink of skipLinks) {
    skipLink.addEventListener('focusin', onSkipLinksContainedFocusChange);
    skipLink.addEventListener('focusout', onSkipLinksContainedFocusChange);
  }
  
  // the following code checks previously instantiated Menubuttons (which are
  // put into global window.GesisWeb.menubottons conventionally) for a match
  // with a potentially existing skip link to the main menubutton
  const mainMegamenuSkipLink = document.getElementById('skip-link-megamenu');
  if (mainMegamenuSkipLink) {
    const mainMegamenuMenubuttonElementId = mainMegamenuSkipLink.getAttribute('aria-controls');
    if (mainMegamenuMenubuttonElementId) {
      const menubuttons = window?.GesisWeb?.menubuttons;
      if (menubuttons) {
        const mainMegamenuMenubutton =
          menubuttons.find(
            menubutton => (menubutton.domNode.id === mainMegamenuMenubuttonElementId)
          );
        if (mainMegamenuMenubutton && !(mainMegamenuMenubutton.getDisabled()) ) {
          // in responsive layouts, when clicking the megamenu skip link,
          // then directly open main mega menu
          mainMegamenuSkipLink.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            mainMegamenuMenubutton.popupMenu.open();
            mainMegamenuMenubutton.popupMenu.setFocusToFirstItem();
          });
        }
      }
    }
  }
};

//JavaScript-based workaround for skip link animation in IE 11 and Edge
// as these browsers don't support :focus-within pseudostate as of 2020-05-20
function onSkipLinksContainedFocusChange(event) {
  const thisContainer = this;
  const eventType = event.type;
  
  if ('focusin' === eventType) {
    const previouslyFocusedElement = event.relatedTarget;
    const wasFocusPreviouslyAlreadyInsideContainer = thisContainer.contains(previouslyFocusedElement);
    if (wasFocusPreviouslyAlreadyInsideContainer) {
    }
    else {
      thisContainer.setAttribute('aria-expanded', 'true');
    }
  }
  else if ('focusout' === eventType) {
    const newlyFocusedElement = event.relatedTarget;
    const isFocusStillInsideContainer = thisContainer.contains(newlyFocusedElement);
    if (isFocusStillInsideContainer) {
    }
    else {
      thisContainer.setAttribute('aria-expanded', 'false');
    }
  }
}

export {
  setupSkipLinks,
};
