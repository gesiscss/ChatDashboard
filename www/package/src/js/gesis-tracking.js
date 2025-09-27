// setup.typoscript contains additional GESIS Web-specific etracker setup code
import {
  getXPathForElement,
} from './gesis-helpers.js';

// GESIS tab click tracking with etracker, see #2942
function setupTabClickTracking() {
  // selecting all tabsButtons, but filtering out .tns-nav / tiny-slider/accessible-slider/carousel,
  // because they are too special with their screen size-dependent selection buttons
  const tabsButtons = document.querySelectorAll('[role="tablist"]:not(.tns-nav) > button[role="tab"]');
  for (const tabButton of tabsButtons) {
    const tabTitle = tabButton.textContent.trim();
    const eventObjectName = decodeURIComponent(et_pagename);
    
    tabButton.addEventListener('click', function(event) {
      const eventSubType = 'findD|' + tabTitle; // pipe character acts as delimiter
      _etracker.sendEvent( new et_ClickEvent(eventObjectName, eventSubType) );
    });
  
    const controlledTabpanelId = tabButton.getAttribute('aria-controls');
    const controlledTabpanel = document.getElementById(controlledTabpanelId);
    const withinTabpanelsAnchors = controlledTabpanel.querySelectorAll('a');
    for (const withinTabpanelAnchor of withinTabpanelsAnchors) {
      const withinTabpanelAnchorHref = withinTabpanelAnchor.href;
      
      // Assumption: click and auxclick event capture all link clicks,
      // be they keyboard return/enter-, left mouse- or middle mouse-originating.
      // For caveats see https://stackoverflow.com/q/8927208/923560
      // N.B.: IE11 doesn't support auxclick: https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event
      ['click', 'auxclick'].forEach(function(eventType) {
        withinTabpanelAnchor.addEventListener(eventType, function(event) {
          const eventSubType = 'findD|' + tabTitle + '|' + withinTabpanelAnchorHref; // pipe character acts as delimiter
          _etracker.sendEvent( new et_LinkEvent(eventObjectName, eventSubType) );
        });
      });
    }
  }
};

function setupDownloadTracking() {
  const trackDownloads = document.getElementsByClassName('track-download');
  [ ...trackDownloads ].forEach( trackDownload => {
    // Assumption: click and auxclick event capture all link clicks,
    // be they keyboard return/enter-, left mouse- or middle mouse-originating.
    // For caveats see https://stackoverflow.com/q/8927208/923560
    // N.B.: IE11 doesn't support auxclick: https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event
    ['click', 'auxclick'].forEach(function(eventType) {
      trackDownload.addEventListener(eventType, () => {
        const url = new URL(trackDownload.href);
        const path = url.pathname;
        _etracker.sendEvent(new et_DownloadEvent(path, 'WEB Download'));
      });
    });
  });
};

function setupXPathLinkTracking() {
  const links = Array.from( document.getElementsByTagName('a') );
  links.forEach(link => {
    const linkXPath = getXPathForElement(link);
    const linkHref = link.href;
    // Assumption: click and auxclick event capture all link clicks,
    // be they keyboard return/enter-, left mouse- or middle mouse-originating.
    // For caveats see https://stackoverflow.com/q/8927208/923560
    // N.B.: IE11 doesn't support auxclick: https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event
    ['click', 'auxclick'].forEach(function(eventType) {
      link.addEventListener(eventType, () => {
        // see https://www.etracker.com/docs/integration-setup/tracking-code-sdks/tracking-code-integration/event-tracker/
        const linkEvent = new et_LinkEvent(linkXPath + '|' + linkHref, 'typo3-xpath');
        _etracker.sendEvent(linkEvent);
        // this will send a LinkEvent of type "typo3-xpath". The object will be of form:
        // id(\"c68912\")/a[1]|http://localhost/institut
        // that is, an XPath expression, then pipe symbol, then the target URL.
        // the XPath expression can be evaluated on the originating webpage to locate the anchor element,
        // assuming the page structure hasn't changed too much (hence the additional target URL for
        // disambiguation purposes).
        // example: open dev tools on the originating webpage, then execute
        // the following command in the console:
        // # on originating webpage https://www.gesis.org/home
        // getElementByXPath("id(\"c68912\")/a[1]")
        //
        // To investigate clicked links on a specific originating page,
        // open the etracker dashboard -> Basis Reports -> Content: Events ->
        // Segmentierung hinzufügen: Typ
        // Segmentierung hinzufügen: Seitenname
        // Filter -> Erweiterter Filter: Ergebnisse einschließen mit Seitenname entspricht genau $SEITENNAME
        // Click "Filteroption hinzufügen"
        // Ergebnisse einschließen mit Typ entspricht genau typo3-xpath
        // Click "Anwenden"
        //
        // To find out $SEITENNAME of a particular orginating page, visit that page, open Dev Tools,
        // and execute command: decodeURIComponent(et_pagename)
        // e.g., for https://www.gesis.org/home , decodeURIComponent(et_pagename) is GESIS/Home:home
      });
    });
  });
};

function setupMouseoverBoxTracking() {
  // send a custom link event of type "typo3-mouseoverbox" for any mouseover box link with payout "textContent of said mouseover box link"
  const mouseoverBoxLinks = document.querySelectorAll('.gs_mouseover_box > a');
  mouseoverBoxLinks.forEach(mouseoverBoxLink => {
    const mouseoverBoxLinktextContent = mouseoverBoxLink.textContent;
    ['click', 'auxclick'].forEach(function(eventType) {
      mouseoverBoxLink.addEventListener(eventType, () => {
        const mouseoverBoxLinkEvent = new et_LinkEvent(mouseoverBoxLinktextContent, 'typo3-mouseoverbox');
        _etracker.sendEvent(mouseoverBoxLinkEvent);
      });
    });
  });
};

const setupTracking = function() {
  // guard against null-pointer exception in strong privacy environments
  if ( (typeof _etracker !== 'undefined') && (typeof et_pagename !== 'undefined') ) {
    setupTabClickTracking();
    setupDownloadTracking();
    setupXPathLinkTracking();
    setupMouseoverBoxTracking();
  }
};

export {
  setupTracking,
};
