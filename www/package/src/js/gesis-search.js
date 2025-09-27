/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*   
*   Adapted for GESIS-Web, www.gesis.org
*/

import {
  tns,
  initializeSliderOptions,
} from './accessible-slider/src/tiny-slider.js';

import {
  getMicrosite,
  getLanguage,
} from './gesis-helpers.js';


const keyCode = {
  BACKSPACE: 8,
  TAB: 9,
  RETURN: 13,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46
};

/**
 * @constructor
 *
 * @desc
 *  Combobox object representing the state and interactions for a combobox
 *  widget
 *
 * @param combobox
 *  The DOM node pointing to the combobox
 * @param input
 *  The input node
 * @param listbox
 *  The listbox node to load results in
 */
class GesisSearchWidget {
  constructor(
      combobox,
      input,
      listbox,
      onShow,
      onHide,
      microsite,
      automaticallyShowListbox = true
  ) {
    this.combobox = combobox;
    this.input = input;
    
    this.listbox = listbox;
    this.listbox.tabIndex = -1; // make result list focusable-on-click so that hideListbox can check relatedTarget being inside or outside of result list
    this.listbox.setAttribute('aria-hidden', 'true');
    
    this.onShow = onShow || function() { };
    this.onHide = onHide || function() { };
    this.microsite = microsite;
    this.automaticallyShowListbox = automaticallyShowListbox;
    
    this.activeIndex = -1;
    this.resultsCount = 0;
    this.resultsItems = [];
    this.shown = false;
    this.previousInput = '';
    this.hasResponse = false;
    this.httpRequest = new XMLHttpRequest();
    this.ariaBusyTimeoutId = false;
    this.slider = null;
    this.plugins = [];
    
    this.setupEvents();
  }
  
  setupEvents() {
    this.combobox.addEventListener('focusout', this.checkHide.bind(this));
    this.input.addEventListener('keydown', this.setActiveItem.bind(this));
    this.input.addEventListener('keyup', this.checkKey.bind(this));
    this.input.addEventListener('focus', this.checkShow.bind(this));
  }
  
  checkKey(evt) {
    var key = evt.which || evt.keyCode;
    
    switch (key) {
      case keyCode.UP:
      case keyCode.DOWN:
      case keyCode.ESC:
      case keyCode.RETURN:
        evt.preventDefault();
        return;
      default:
        if (this.input.value.length <= 2) {
          /* the following abort is neccessary in situations where there is
           * a concurrently running response-waiting request for a three-letter
           * query which then gets backspaced to a two-letter input
           */
          this.abortRequest();
          this.clearListbox();
        }
        else {
          if (this.previousInput === this.input.value) {
            // console.log("textual input did not change by this key interaction");
          }
          else {
            this.updateResults();
          }
        }
    }
    
  }
  
  updateResults() {
    // cancel possibly response-waiting previous request
    this.abortRequest();
    
    const lang = getLanguage();
    const microsite = getMicrosite();
    
    const data = {
      term: this.input.value,
      lang,
      ...(microsite && {microsite}) // optional parameter, see https://stackoverflow.com/a/47892178/923560
    };
    
    const searchParams = new URLSearchParams(data);
    const searchParamsString = searchParams.toString();
    const gwsRequestUrl =
      "/typo3conf/ext/gesis_web_ext/Resources/Public/PHP/gs_search_connector.php?"
      + searchParamsString;
    
    this.httpRequest = new XMLHttpRequest();
    this.httpRequest.addEventListener("load", this.processGwsResults.bind(this));
    this.httpRequest.open("GET", gwsRequestUrl);
    this.httpRequest.send();
    this.combobox.classList.add('loading');
  }
  
  clearInput() {
    this.input.value = '';
  }
  
  abortRequest() {
    this.httpRequest.abort();
    this.combobox.classList.remove('loading');
  }
  
  setActiveItem(evt) {
    this.previousInput = this.input.value;
    var key = evt.which || evt.keyCode;
    var activeIndex = this.activeIndex;
    
    if (key === keyCode.ESC) {
      this.abortRequest();
      this.hideListbox();
      this.clearInput();
      return;
    }
    
    var prevActive = this.getItemAt(activeIndex);
    var activeItem;
    
    switch (key) {
      case keyCode.UP:
        if (activeIndex <= 0) {
          activeIndex = this.resultsCount - 1;
        }
        else {
          activeIndex--;
        }
        break;
      case keyCode.DOWN:
        if (activeIndex === -1 || activeIndex >= this.resultsCount - 1) {
          activeIndex = 0;
        }
        else {
          activeIndex++;
        }
        break;
      case keyCode.RETURN:
        activeItem = this.getItemAt(activeIndex);
        if (activeItem) {
          this.selectItem(activeItem);
        }
        else {
          this.updateResults();
        }
        return;
      case keyCode.TAB:
        this.hideListbox();
        return;
      default:
        return;
    }
    
    evt.preventDefault();
    activeItem = this.getItemAt(activeIndex);
    this.activeIndex = activeIndex;
    
    if (prevActive) {
      prevActive.classList.remove('focused');
      prevActive.setAttribute('aria-selected', 'false');
    }
    
    if (activeItem) {
      if (activeItem.parentElement.classList.contains('tns-item') && (!activeItem.parentElement.classList.contains('tns-slide-active'))) {
        // keyboard input has selected a slider tile which currently is outside of visual range, therefore scroll carousel in appropriate direction
        if (key === keyCode.DOWN) {
          this.slider.goTo('next');
        }
        else if (key === keyCode.UP) {
          this.slider.goTo('prev');
        }
      }
      this.input.setAttribute('aria-activedescendant', 'result-item-' + activeIndex);
      activeItem.classList.add('focused');
      activeItem.setAttribute('aria-selected', 'true');
      // activeItem.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
      // activeItem.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
    }
    else {
      this.input.removeAttribute('aria-activedescendant');
    }
  }
  
  getItemAt(index) {
    var indexItem = this.resultsItems[index];
    return indexItem;
  }
  
  clickItem(evt) {
    if (evt.target && evt.target.nodeName == 'LI') {
      this.selectItem(evt.target);
    }
  }
  
  selectItem(item) {
    if (item) {
      item.click();
    }
  }
  
  checkShow(evt) {
    if (this.hasResponse && this.automaticallyShowListbox) {
      this.showListbox();
    }
  }
  
  checkHide(event) {
    var eventType = event.type;
    var relatedTarget = event.relatedTarget;
    var eventTarget = event.target;
    if ('focusout' === eventType) {
      if (this.input.contains(relatedTarget) || this.combobox.contains(relatedTarget) || this.listbox.contains(relatedTarget)) {
      }
      else {
        this.hideListbox();
      }
    }
  }
  
  clearListbox() {
    this.activeIndex = -1;
    this.listbox.innerHTML = '';
    this.listbox.setAttribute('aria-hidden', 'true');
    this.resultsCount = 0;
    this.resultsItems = [];
    this.hasResponse = false;
    this.input.removeAttribute('aria-activedescendant');
    // this.hideListbox();
  }
  
  hideListbox() {
    this.combobox.setAttribute('aria-expanded', 'false');
    this.listbox.setAttribute('aria-hidden', 'true');
    this.shown = false;
    this.onHide();
  }
  
  showListbox() {
    this.combobox.setAttribute('aria-expanded', 'true');
    this.listbox.setAttribute('aria-hidden', 'false');
    this.shown = true;
    this.onShow();
  }
  
  processGwsResults() {
    this.combobox.classList.remove('loading');
    this.clearListbox();
    
    this.hasResponse = true;
    
    var wrapper = document.createElement('div');
    wrapper.innerHTML = this.httpRequest.responseText;
    var responseTree = wrapper.firstElementChild;
    this.listbox.appendChild(responseTree);
    
    const threeColumnSliders = responseTree.getElementsByClassName('gs_3col_slider');
    for (const threeColumnSlider of threeColumnSliders) {
      const additionalOptions = {
        responsive: {
          576: {
            items: 2
          },
          768: {
            items: 3
          },
          992: {
            items: 4
          }
        },
        gutter: 16, // equals 16px = 1rem
      };
      
      const options = initializeSliderOptions(threeColumnSlider, additionalOptions);
      this.slider = tns(options);
    }
    
    var focusableElements = Array.from(responseTree
      // .querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      // .querySelectorAll('button, [href], input, select, textarea'))
      .querySelectorAll('a'))
      .filter(function(element) {
        /* One of the constraints for an element to be actually
         * focusable is that it and all its ancestors must be
         * both CSS-visible and CSS-displayed
         */
        // var result = isElementVisibleAndDisplayed(element);
        var result = true;
        return result;
      });
      
    /* the following removes all search results from the page's regular
     * tab order. Instead search results will be pseudo-focusable /
     * selectable by arrow key navigation, which is conventional WCAG
     * combobox behavior
     */
    focusableElements.forEach(function(element, index) {
      element.tabIndex = -1;
      element.classList.add("result");
      element.setAttribute("role", "option");
      // element.removeAttribute("aria-hidden"); // to make all carousel slides/tiles screenreader-visible
      /* if the arrow key-selectable search result item does not have an
       * id yet, it hereby gets one so that search input's
       * aria-activedescendant can potentially point to it when this element is selected
       */
      element.id ? null : element.id = 'result-item-' + index;
    });
    
    this.resultsCount = focusableElements.length;
    this.resultsItems = focusableElements;
    this.checkShow();
  }
}

const isElementVisibleAndDisplayed = function(element) {
  var elementStyle = window.getComputedStyle(element);
  if (elementStyle.display === 'none' || elementStyle.visibility === 'hidden') {
    return false;
  }
  else {
    var parentElement = element.parentElement;
    if (parentElement) {
      return isElementVisibleAndDisplayed(parentElement);
    }
    else {
      // element has reached recursion end by having no parent / being the root "html" element
      // each lineage elements is both displayed and visible
      return true;
    }
  }
};

const initializeGesisSearchWidget = function(
  gesisSearchCombobox,
  gesisSearchInput,
  gesisSearchOutput,
  onShow = null,
  onHide = null,
  microsite = null
) {
  let gesisSearchWidget = null;
  if (gesisSearchCombobox && gesisSearchInput && gesisSearchOutput) {
    // minimum requirements fulfilled to instantiate GesisSearchWidget
    gesisSearchWidget = new GesisSearchWidget(
      gesisSearchCombobox,
      gesisSearchInput,
      gesisSearchOutput,
      onShow,
      onHide,
      microsite
    );
  }
  return gesisSearchWidget;
};

export {
  GesisSearchWidget,
  initializeGesisSearchWidget,
};
