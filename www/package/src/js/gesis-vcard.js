class VCard {
  constructor(domElement, onOpenPopup, onClosePopup) {
    this.domElement = domElement;
    this.onOpenPopup = onOpenPopup;
    this.onClosePopup = onClosePopup;
    
    this.domElement.addEventListener('touchstart', this.onContainedEventChange.bind(this));
    this.domElement.addEventListener('focusin', this.onContainedEventChange.bind(this));
    this.domElement.addEventListener('focus', this.onContainedEventChange.bind(this));
    this.domElement.addEventListener('focusout', this.onContainedEventChange.bind(this));
    this.domElement.addEventListener('blur', this.onContainedEventChange.bind(this));
    // this.domElement.addEventListener('mouseover', this.onContainedEventChange.bind(this));
    this.domElement.addEventListener('mouseenter', this.onContainedEventChange.bind(this));
    this.domElement.addEventListener('mousedown', this.onContainedEventChange.bind(this));
    this.domElement.addEventListener('mouseup', this.onContainedEventChange.bind(this));
    // this.domElement.addEventListener('mouseout', this.onContainedEventChange.bind(this));
    this.domElement.addEventListener('mouseleave', this.onContainedEventChange.bind(this));
    this.domElement.addEventListener('click', this.onContainedEventChange.bind(this));
    this.domElement.addEventListener('keydown', this.onContainedEventChange.bind(this));
    
    this.domElement.setAttribute('aria-expanded', 'false');
  }
  
  togglePopup() {
    if (this.domElement.getAttribute('aria-expanded') === 'false') {
      this.openPopup();
    }
    else {
      this.closePopup();
    }
  }
  
  openPopup() {
    this.domElement.setAttribute('aria-expanded', 'true');
    if (this.onOpenPopup) {
      this.onOpenPopup();
    }
  }
  
  closePopup() {
    this.domElement.setAttribute('aria-expanded', 'false');
    if (this.onClosePopup) {
      this.onClosePopup();
    }
  }
  
  onContainedEventChange(event) {
    const eventType = event.type;
    
    if ('mouseenter' === eventType) {
      const previouslyFocusedElement = event.relatedTarget;
      const wasFocusPreviouslyAlreadyInsideContainer = this.domElement.contains(previouslyFocusedElement);
      if (wasFocusPreviouslyAlreadyInsideContainer) {
      }
      else {
        this.openPopup();
      }
    }
    else if ('focusout' === eventType || 'mouseleave' === eventType) {
      const newlyFocusedElement = event.relatedTarget;
      const isFocusStillInsideContainer = this.domElement.contains(newlyFocusedElement);
      if (isFocusStillInsideContainer) {
      }
      else {
        this.closePopup();
      }
    }
    else if ('click' === eventType) {
      if (event.target === this.domElement) {
        event.preventDefault();
        this.togglePopup();
      }
    }
    else if ('touchstart' === eventType) {
      // A touch event on the screen. By default, this would also fire mouse, tab, and click events
      // In order for these subsequent events to not double-toggle, prevent default:
      if (event.target === this.domElement) {
        event.preventDefault();
        if (this.domElement.getAttribute('aria-expanded') === 'false') {
          this.openPopup();
          // focusing here gives us a chance to later receive a focusout event if
          // the user clicks outside of the pop-up bubble in order to close the pop-up
          // This is useful because there doesn't exist the concept of a "touchleave" event.
          this.domElement.focus();
        }
        else {
          this.closePopup();
        }
      }
    }
    else if ('keydown' === eventType) {
      switch (event.code) {
        case "Enter":
        case "NumpadEnter":
        case "Space":
          if (event.target === this.domElement) {
            event.preventDefault();
            this.togglePopup();
          }
          break;
        case "Escape":
          event.preventDefault();
          this.closePopup();
          break;
      }
    }
    else if ('mousedown' === eventType) {
    }
    else if ('mouseup' === eventType) {
    }
    else if ('focus' === eventType) {
    }
    else if ('blur' === eventType) {
    }
  }
}

const initializeVCards = function(vCardsElements, onOpenPopup, onClosePopup) {
  const vCards = [];
  for (const vCardElement of vCardsElements) {
    const vCard = new VCard(vCardElement, onOpenPopup, onClosePopup);
    vCards.push(vCard);
  }
  return vCards;
};

export {
  VCard,
  initializeVCards,
};
