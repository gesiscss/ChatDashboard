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

class Search {
  constructor(microsite) {

    this.combobox = document.getElementById('gs_gws_combobox');
    this.input = document.getElementById('gs_searchterm');
    this.listbox = document.getElementById('gs_hitlist');
    this.inputClearButton = document.getElementById('clear-input-button');
    this.micrositeSelect = document.getElementsByClassName("gs_search_facet")[0].firstElementChild;

    this.hasResponse = false;
    this.httpRequest = new XMLHttpRequest();
    this.resultsCount = 0;
    this.resultsItems = [];
    this.automaticallyShowListbox = true;
    this.shown = false;
    this.previousInput = '';
    this.microsite = microsite;
    this.host = '';

    this.listbox.tabIndex = -1;
    this.listbox.setAttribute('aria-hidden', 'true');

    this.activeIndex = -1;

    this.input.addEventListener('keyup', this.checkKey.bind(this));
    this.inputClearButton.addEventListener('click', this.resetSearchterm.bind(this));
    this.combobox.addEventListener('focusout', this.checkHide.bind(this));
    this.input.addEventListener('focus', this.checkShow.bind(this));
    this.input.addEventListener('keydown', this.setActiveItem.bind(this));
    this.micrositeSelect.addEventListener("change", this.setMicrosite.bind(this));
    
    if (this.microsite == "missy"){
      const option = document.createElement("option");
      option.text = "MISSY";
      this.micrositeSelect.add(option, this.micrositeSelect[0]);
      this.micrositeSelect.selectedIndex = "0"
    }
    else if (this.microsite == "cews") {
      const option = document.createElement("option");
      option.text = "CEWS";
      this.micrositeSelect.add(option, this.micrositeSelect[0]);
      this.micrositeSelect.selectedIndex = "0"
    }
    else if (this.microsite == "gles") {
      const option = document.createElement("option");
      option.text = "GLES";
      this.micrositeSelect.add(option, this.micrositeSelect[0]);
      this.micrositeSelect.selectedIndex = "0"
    }
    else if (this.microsite == "issp") {
      const option = document.createElement("option");
      option.text = "ISSP";
      this.micrositeSelect.add(option, this.micrositeSelect[0]);
      this.micrositeSelect.selectedIndex = "0"
    }
    else if (this.microsite == "gesis-panel") {
      const option = document.createElement("option");
      option.text = "GESIS Panel";
      this.micrositeSelect.add(option, this.micrositeSelect[0]);
      this.micrositeSelect.selectedIndex = "0"
    }
    else if (this.microsite == "gesis-guides") {
      const option = document.createElement("option");
      option.text = "GESIS Guides";
      this.micrositeSelect.add(option, this.micrositeSelect[0]);
      this.micrositeSelect.selectedIndex = "0"
    }
  }

  setMicrosite(event) {
   if (event.target.value == "Alles" || event.target.value == "All") {
     this.microsite = null;
   }
   else {
     this.microsite = event.target.value.toLowerCase();
   }
   this.updateResults();
  }

  getItemAt(index) {
    var indexItem = this.resultsItems[index];
    return indexItem;
  }

  setActiveItem(evt) {
    this.previousInput = this.input.value;
    var key = evt.which || evt.keyCode;
    var activeIndex = this.activeIndex;

    if (key === keyCode.ESC) {
      this.httpRequest.abort();
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
      this.input.setAttribute('aria-activedescendant', 'result-item-' + activeIndex);
      activeItem.classList.add('focused');
      activeItem.setAttribute('aria-selected', 'true');
    }
    else {
      this.input.removeAttribute('aria-activedescendant');
    }
  }

  selectItem(item) {
    if (item) {
      item.click();
    }
  }

  resetSearchterm(){
    this.clearInput();
    this.clearListbox();
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

  hideListbox() {
    this.combobox.setAttribute('aria-expanded', 'false');
    this.listbox.setAttribute('aria-hidden', 'true');
    this.shown = false;
    this.removeMainBackdrop();
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
          this.httpRequest.abort();
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
       return;
     }
  }

  updateResults() {
    this.httpRequest.abort();

    const lang = getLanguage();
    const microsite = this.microsite; // getMicrosite();

    const data = {
      term: this.input.value,
      lang,
      ...(microsite && {microsite}) // optional parameter, see https://stackoverflow.com/a/47892178/923560
    };

    const searchParams = new URLSearchParams(data);
    const searchParamsString = searchParams.toString();
    const gwsRequestUrl =
     this.host + "/fileadmin/admin/gs_search_connector.php?"
      + searchParamsString;

    this.httpRequest = new XMLHttpRequest();
    this.httpRequest.addEventListener("load", this.processResults.bind(this));
    this.httpRequest.open("GET", gwsRequestUrl);
    this.httpRequest.send();
  }

  clearInput() {
    this.input.value = '';
    this.removeMainBackdrop();
  }

  processResults () {
    this.clearListbox();
    this.hasResponse = true;
    var wrapper = document.createElement('div');
    wrapper.innerHTML = this.httpRequest.responseText;
    var responseTree = wrapper.firstElementChild;
    this.listbox.appendChild(responseTree);
    var focusableElements = Array.from(responseTree
      .querySelectorAll('a'))
      .filter(function(element) {
        var result = true;
        return result;
      });

    focusableElements.forEach(function(element, index) {
      element.tabIndex = -1;
      element.classList.add("result");
      element.setAttribute("role", "option");
      element.id ? null : element.id = 'result-item-' + index;
    });

    this.resultsCount = focusableElements.length;
    this.resultsItems = focusableElements;

    this.checkShow();
  }

  clearListbox() {
    this.listbox.innerHTML = '';
    this.listbox.setAttribute('aria-hidden', 'true');
    this.resultsCount = 0;
    this.resultsItems = [];
    this.hasResponse = false;
    this.input.removeAttribute('aria-activedescendant');
    // this.hideListbox();
  }

  checkShow() {
    if (this.hasResponse && this.automaticallyShowListbox) {
      this.showListbox();
      this.addMainBackdrop();
    }
  }

  showListbox() {
    this.combobox.setAttribute('aria-expanded', 'true');
    this.listbox.setAttribute('aria-hidden', 'false');
    this.shown = true;
    //this.onShow();
  }

  addMainBackdrop(){
    const mainElement = document.getElementsByTagName("main")[0];
    mainElement.classList.add("has-backdrop");
  }

  removeMainBackdrop(){
    const mainElement = document.getElementsByTagName("main")[0];
    mainElement.classList.remove("has-backdrop");
  }
}

export {
  Search
};
