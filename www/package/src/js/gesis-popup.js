import {
  getFocusableAncestors,
  keyCode,
  fadeMainContent,
  unfadeMainContent,
} from './gesis-helpers.js';

// Popup implements patterns from
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/listbox-collapsible.html
// https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox
// TODO leverage https://www.w3.org/WAI/PF/aria-1.1/states_and_properties#aria-owns and https://www.w3.org/WAI/PF/aria-1.1/states_and_properties#aria-controls
// TODO use aria-activedescendant
// TODO allow quickselection by typing printable character
class Popup {
  
  constructor(domNode, controllerNode, onOpen, onClose) {
    this.domNode = domNode;
    this.controllerNode = controllerNode;
    this.onOpen = onOpen || function() { };
    this.onClose = onClose || function() { };

    this.init();
  }
  
  init() {
    this.domNode.setAttribute('aria-haspopup', 'listbox');

    // this.controllerNode.setAttribute('role', 'listbox');
    this.controllerNode.tabIndex = 0;

    this.controllerNode.addEventListener('keydown', this.handleKeydown.bind(this));
    this.controllerNode.addEventListener('mouseenter', this.handleMouseenter.bind(this));
    this.controllerNode.addEventListener('mouseleave', this.handleMouseleave.bind(this));
    this.controllerNode.addEventListener('click', this.handleClick.bind(this));

    this.controllerNode.addEventListener('focusout', this.handleFocusChange.bind(this));

    var focusablePopupElements = getFocusableAncestors(this.domNode);
    focusablePopupElements.forEach(function(element, index) {
      element.tabIndex = -1;
      element.setAttribute('role', 'option');
    });
  }
  
  handleMouseenter(event) {
    this.openPopup();
  }
  
  handleMouseleave(event) {
    this.closePopup();
  }
  
  handleClick(event) {
    if (this.isPopupOpen()) {
      this.closePopup();
    }
    else {
      this.openPopup();
    }
  }
  
  handleFocusChange(event) {
    var eventType = event.type;
    var relatedTarget = event.relatedTarget;

    if ('focusout' === eventType) {
      if (this.controllerNode.contains(relatedTarget)) {
      }
      else {
        this.closePopup();
      }
    }
  }
  
  isPopupOpen() {
    var isExpanded = this.controllerNode.getAttribute('aria-expanded');
    var isOpen = (isExpanded === 'true');
    return isOpen;
  }
  
  openPopup() {
    this.controllerNode.setAttribute('aria-expanded', 'true');
    this.onOpen();
  }
  
  closePopup() {
    this.controllerNode.setAttribute('aria-expanded', 'false');
    this.onClose();
  }
  
  selectNextElement() {
    var selectableElements = Array.from(this.domNode.querySelectorAll('[role="option"]'));

    var currentlySelectedElement = this.getCurrentlySelectedElement();
    var index = selectableElements.indexOf(currentlySelectedElement);
    if (index <= -1) {
      // none selected yet
      this.selectElement(selectableElements[0]);
    }
    else if (index === (selectableElements.length - 1)) {
      // roll-around
      this.unselectElement(currentlySelectedElement);
      this.selectElement(selectableElements[0]);
    }
    else {
      this.unselectElement(currentlySelectedElement);
      this.selectElement(selectableElements[index + 1]);
    }
  }
  
  selectPreviousElement() {
    var selectableElements = Array.from(this.domNode.querySelectorAll('[role="option"]'));

    var currentlySelectedElement = this.getCurrentlySelectedElement();
    var index = selectableElements.indexOf(currentlySelectedElement);
    if (index <= -1) {
      // none selected yet
      this.selectElement(selectableElements[selectableElements.length - 1]);
    }
    else if (index === 0) {
      // roll-around
      this.unselectElement(currentlySelectedElement);
      this.selectElement(selectableElements[selectableElements.length - 1]);
    }
    else {
      this.unselectElement(currentlySelectedElement);
      this.selectElement(selectableElements[index - 1]);
    }
  }
  
  getCurrentlySelectedElement() {
    var result = this.domNode.querySelector('[aria-selected="true"]');
    return result;
  }
  
  selectElement(element) {
    element.setAttribute('aria-selected', "true");
    element.focus();
  }
  
  unselectElement(element) {
    element.setAttribute('aria-selected', "false");
  }
  
  selectFirstElement() {
    var currentlySelectedElement = this.getCurrentlySelectedElement();
    this.unselectElement(currentlySelectedElement);
    var firstElement = this.domNode.querySelector('[role="option"]');
    this.selectElement(firstElement);
  }
  
  selectLastElement() {
    var currentlySelectedElement = this.getCurrentlySelectedElement();
    this.unselectElement(currentlySelectedElement);
    var selectableElements = this.domNode.querySelectorAll('[role="option"]');
    var lastElement = selectableElements[selectableElements.length - 1];
    this.selectElement(lastElement);
  }
  
  handleKeydown(event) {
    switch (event.keyCode) {
      case keyCode.SPACE:
      case keyCode.DOWN:
        event.stopPropagation();
        event.preventDefault();
        this.openPopup();
        this.selectNextElement();
        break;
      case keyCode.UP:
        event.stopPropagation();
        event.preventDefault();
        this.openPopup();
        this.selectPreviousElement();
        break;
      case keyCode.ESC:
      case keyCode.LEFT:
      case keyCode.RIGHT:
        event.stopPropagation();
        event.preventDefault();
        this.closePopup();
        this.controllerNode.focus();
        break;
      case keyCode.RETURN:
        event.stopPropagation();
        event.preventDefault();
        this.openPopup();
        var currentlySelectedElement = this.getCurrentlySelectedElement();
        if (currentlySelectedElement) {
          currentlySelectedElement.click();
        }
        else {
          this.selectNextElement();
        }
        break;
      case keyCode.HOME:
        event.stopPropagation();
        event.preventDefault();
        this.openPopup();
        this.selectFirstElement();
        break;
      case keyCode.END:
        event.stopPropagation();
        event.preventDefault();
        this.openPopup();
        this.selectLastElement();
        break;
    }
  }
  
}

const initializePopups = function(popupElements) {
  const popups = [];
  for (const popupElement of popupElements) {
    const popupNode = popupElement.querySelector('.gs_dropdown_content');
    if (popupNode) {
      const popup = new Popup(
        popupNode,
        popupElement,
        function() {fadeMainContent(this.controllerNode, this.domNode);},
        function() {unfadeMainContent(this.controllerNode, this.domNode);}
      );
      popups.push(popup);
    }
  }
  return popups;
};

export {
  Popup,
  initializePopups,
};
