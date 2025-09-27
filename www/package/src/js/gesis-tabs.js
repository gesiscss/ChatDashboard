/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*   Adapted from https://w3c.github.io/aria-practices/examples/tabs/tabs-1/tabs.html
*   for GESIS-Web
*/

class TabContainer {
  constructor(domElement, automaticTabActivation = true) {
    this.domElement = domElement;
    this.automaticTabActivation = automaticTabActivation;
    
    // see https://developer.chrome.com/articles/hidden-until-found/
    // see https://caniuse.com/mdn-html_global_attributes_hidden_until-found_value
    this.supportsHiddenUntilFound = 'onbeforematch' in document.body;
    
    /*
    see https://w3c.github.io/aria-practices/#keyboard-interaction-21
    WCAG WAI-ARIA Authoring Practices 1.2 recommends automatic tab
    activation on tab receiving focus, therefore defaulting to
    automaticTabActivation == true
    (example: https://w3c.github.io/aria-practices/examples/tabs/tabs-1/tabs.html )
    
    automaticTabActivation == false will use manual activation
    (example: https://w3c.github.io/aria-practices/examples/tabs/tabs-2/tabs.html )
    */
    
    // using querySelector, not querySelectorAll to select only the first,
    // allowing for nested tab containers
    this.tablist = this.domElement.querySelector('[role="tablist"]');
    /*
    // select all direct children tabpanels, allowing for nested tab containers
    // see https://stackoverflow.com/a/17206138/923560
    this.tabpanels = Array.from( this.domElement.querySelectorAll(':scope > [role="tabpanel"]') );
    */
    this.tabpanels = [];
    this.tabheaders2TabpanelsMap = new Map();
    this.tabpanels2TabheadersMap = new Map();
    this.tabheaders = Array.from( this.tablist.querySelectorAll('[role="tab"]') ); // button elements
    for (const tabheader of this.tabheaders) {
      tabheader.addEventListener('click', this.clickEventListener);
      tabheader.addEventListener('keydown', this.keydownEventListener);
      
      const tabpanelId = tabheader.getAttribute('aria-controls');
      if (tabpanelId) {
        const tabpanel = document.getElementById(tabpanelId);
        if (tabpanel) {
          if (tabpanel.classList.contains('d-none')) {
            // remove deprecated/previously used class
            // and use new hidden="..." attribute instead
            tabpanel.classList.remove('d-none');
            tabpanel.hidden = 'until-found';
          }
           
          this.tabpanels.push(tabpanel);
          this.tabheaders2TabpanelsMap.set(tabheader, tabpanel);
          this.tabpanels2TabheadersMap.set(tabpanel,tabheader);
        }
      }
      
      if (this.supportsHiddenUntilFound) {
        for(const tabpanel of this.tabpanels) {
          tabpanel.addEventListener('beforematch', this.handleBeforeMatch);
        }
      }
    }
  }
  
  clickEventListener = event => {
    const tabheader = event.target;
    this.updateTabsStates(tabheader, true);
  }
  
  keydownEventListener = event => {
    switch (event.code) {
      case "End":
        event.preventDefault();
        const lastTabheader = this.tabheaders[this.tabheaders.length - 1];
        this.updateTabsStates(lastTabheader, this.automaticTabActivation);
        break;
      case "Home":
        event.preventDefault();
        const firstTabheader = this.tabheaders[0];
        this.updateTabsStates(firstTabheader, this.automaticTabActivation);
        break;
      case "Enter":
      case "NumpadEnter":
      case "Space":
        const currentTabheader = event.target;
        this.updateTabsStates(currentTabheader, true);
        break;
      case "ArrowLeft":
      case "ArrowRight":
        event.preventDefault();
        this.switchTabheaderOnArrowPress(event);
        break;
    }
  }
  
  handleBeforeMatch = event => {
    const tabpanel = event.target;
    const tabheader = this.tabpanels2TabheadersMap.get(tabpanel);
    if (tabheader) {
      this.updateTabsStates(tabheader, true);
    }
  }
  
  switchTabheaderOnArrowPress(event) {
    const pressedKey = event.code;
    const targetTabheader = event.target; // the current button
    const currentPosition = this.tabheaders.indexOf(targetTabheader);
    let newTabheader;
    
    if (pressedKey === "ArrowLeft") {
      if (currentPosition === 0) {
        newTabheader = this.tabheaders[this.tabheaders.length - 1]; // last tab
      }
      else {
        newTabheader = this.tabheaders[currentPosition - 1];
      }
    }
    else if (pressedKey === "ArrowRight") {
      if ( currentPosition === (this.tabheaders.length - 1) ) {
        newTabheader = this.tabheaders[0]; // first tab
      }
      else {
        newTabheader = this.tabheaders[currentPosition + 1];
      }
    }
    
    if (newTabheader) {
      this.updateTabsStates(newTabheader, this.automaticTabActivation);
    }
    
  }
  
  updateTabsStates(interactedTabheader, activateInteractedTabpanel) {
    // step one: update state for all tab headers
    for (const tabheader of this.tabheaders) {
      tabheader.setAttribute('tabindex', '-1');
      if (activateInteractedTabpanel) {
        tabheader.setAttribute('aria-selected', 'false');
      }
    }
    
    // step two: update interacted tab
    interactedTabheader.removeAttribute('tabindex');
    interactedTabheader.focus();
    
    if (activateInteractedTabpanel) {
      // optional step three: hide all panels
      for (const tabpanel of this.tabpanels) {
        // tabpanel.classList.add('d-none');
        tabpanel.hidden = 'until-found';
        tabpanel.removeAttribute('tabindex');
      }
      
      // optional step four: show interacted tabpanel
      interactedTabheader.setAttribute('aria-selected', 'true');
      const toBeShownTabpanel = this.tabheaders2TabpanelsMap.get(interactedTabheader);
      toBeShownTabpanel.hidden = false;
      toBeShownTabpanel.tabIndex = 0;
    }
  }
  
}

const initializeTabContainers = function(tabContainersElements) {
  const tabContainers = [];
  for (const tabContainerElement of tabContainersElements) {
    const tabContainer = new TabContainer(tabContainerElement);
    tabContainers.push(tabContainer);
  }
  return tabContainers;
};

export {
  TabContainer,
  initializeTabContainers,
};
