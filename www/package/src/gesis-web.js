// see https://getbootstrap.com/docs/5.3/customize/optimize/
// import 'bootstrap';
//import 'bootstrap/js/dist/dropdown'; // used for dropdown button on staff directory
//import "bootstrap/dist/js/bootstrap.bundle.js";
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

var getUrl = window.location;
window.MathJax = {
  loader: { load: ['input/tex', 'output/chtml'] },
  //tex: {
    //packages: { '[+]': ['noerrors'] }
  //},
  chtml: {
      fontURL: '/typo3conf/ext/gesis_web_ext/Resources/Public/webpack/dist/font/MathJax/fonts/woff-v2',
  },
  startup: {
    ready: () => {
      //console.log('MathJax is ready');
      MathJax.startup.defaultReady();
      MathJax.typesetPromise().then(() => {
        //console.log('MathJax typesetting is complete');
      });
    }
  }
};

import('mathjax/es5/tex-mml-chtml.js');

import {
  fadeMainContent,
  unfadeMainContent,
  getMeta,
  getMicrosite,
  getLanguage,
  appendDebug,
  replaceTag,
  showConfetti,
  getXPathForElement,
  getElementByXPath,
  isSmallScreenOrTouchOnly,
} from './js/gesis-helpers.js';

import {
  importModule,
  getBeautify,
  //getJQuery
} from './js/gesis-import-async.js';

import {
  setupSkipLinks
} from './js/gesis-accessibility.js';
//import { tns, initializeSliderOptions, initializeSliders } from './js/gesis-slider.js';

//import {
//Menubutton,
//initializeMegamenus,
//fadeMainContentAndHighlightThisMegamenuOnOpenHandler,
//unfadeMainContentAndHighlightThisMegamenuOnCloseHandler
//} from './js/gesis-megamenu.js';

import {
  Megamenu,
  MegamenuVertical,
} from './js/megamenu.js';

import {
  Form
} from './js/gesis-form.js';


import {
  Search
} from './js/search.js';

import {
  TOC
} from './js/gesis-toc.js';

import {
  Microsite
} from './js/gesis-microsite.js';

import {
  Sidebar
} from './js/gesis-sidebar.js';

//import {
  //GesisSearchWidget,
  //initializeGesisSearchWidget,
//} from './js/gesis-search.js';

import {
  Popup,
  initializePopups
} from './js/gesis-popup.js';
import {
  TabContainer,
  initializeTabContainers
} from './js/gesis-tabs.js';
import {
  injectColorTable
} from './js/gesis-css-custom-properties.js';
import './js/gesis-qa.js';
import {
  setupTracking
} from './js/gesis-tracking.js';
import {
  VCard,
  initializeVCards
} from './js/gesis-vcard.js';
import {
  lazySetupGrisServiceProjectsTablesorters
} from './js/gris-service.js';
import {
  setupParsley,
  setupPowermail
} from './js/gesis-powermail.js';
import {
  lazyHighlightAll
} from './js/gesis-highlightjs.js';
import {
  lazySetupFancybox
} from './js/gesis-fancybox.js';
import {
  conditionallyShow404ModalOnActiveResolvingStrategy,
  initializeDialog
} from './js/gesis-dialog.js';

import './js/scroll-to.js';
import './js/offcanvas.js';

import confetti from 'canvas-confetti';
import Cookies from 'js-cookie';

import {
  lazySetupGesisDataTables,
} from './js/gesis-datatables.js';

import './scss/gesis-web.scss';

import "bootstrap/dist/js/bootstrap.bundle.js";


import "slick-carousel/slick/slick.js";
import $ from "jquery";
//import lightbox from "lightbox2/dist/js/lightbox.js";

if (! typeof window.$ === "function" && ! typeof window.$.fn === "object" && ! window.$.fn.jquery) {
  window.$ = $;
  window.jQuery = $;
}

// create namespace for Gesis Web widget instances
window.GesisWeb = {};

// during webpack build time, webpack's DefinePlugin will replace
// GESIS_WEB_FRONTEND_PACKAGE_VERSION
// with the automatically-pre-build-updated package.json version information
window.GesisWeb.version = GESIS_WEB_FRONTEND_PACKAGE_VERSION;

window.GesisWeb.state = 'evaluating';

window.importModule = importModule;
window.getBeautify = getBeautify;
//window.getJQuery = getJQuery;

// put helpers on global scope
window.fadeMainContent = fadeMainContent;
window.unfadeMainContent = unfadeMainContent;
window.getMeta = getMeta;
window.getMicrosite = getMicrosite;
window.getLanguage = getLanguage;
window.appendDebug = appendDebug;
window.replaceTag = replaceTag;
window.showConfetti = showConfetti;
window.getXPathForElement = getXPathForElement;
window.getElementByXPath = getElementByXPath;

window.setupSkipLinks = setupSkipLinks;

window.lazySetupGrisServiceProjectsTablesorters = lazySetupGrisServiceProjectsTablesorters;

window.setupPowermail = setupPowermail;

window.lazyHighlightAll = lazyHighlightAll;

window.lazySetupFancybox = lazySetupFancybox;

window.lazySetupGesisDataTables = lazySetupGesisDataTables;

// BEGIN put widgets on global scope
window.confetti = confetti;
window.Cookies = Cookies;

//window.tns = tns;
//window.initializeSliderOptions = initializeSliderOptions;

//window.Menubutton = Menubutton;
//window.initializeMegamenus = initializeMegamenus;
//
window.search = new Search(getMicrosite());

window.form = new Form;

window.megamenu = new Megamenu;
megamenu.init();

window.megamenuVertical = new MegamenuVertical;
megamenuVertical.init();

//window.GesisSearchWidget = GesisSearchWidget;
//window.initializeGesisSearchWidget = initializeGesisSearchWidget;

window.Popup = Popup;
window.initializePopups = initializePopups;

window.VCard = VCard;
window.initializeVCards = initializeVCards;

window.TabContainer = TabContainer;
window.initializeTabContainers = initializeTabContainers;

window.initializeDialog = initializeDialog;
// END put widgets on global scope

setupParsley();


// Copy to clipboard function for icons overview page in styleguide
const copyIconInfoToClipboard = () => {
  const iconBoxes = document.querySelectorAll(".font-viewer .box");

  if (!iconBoxes) {
    // exit function if elemts dont exit to prevent errors on other pages
    return;
  }

  iconBoxes.forEach((box) => {
    const copyNameTrigger = box.querySelector("span.copy-name");
    const copyCodeTrigger = box.querySelector("span.copy-code");
    const iconName = box.getAttribute("data-icon-name");
    const iconCode = `<i class="${iconName}"></i>`;

    copyNameTrigger.addEventListener("click", (event) => {
      navigator.clipboard.writeText(iconName);

      copyNameTrigger.querySelector("span").textContent = "Copied name";
    });

    copyCodeTrigger.addEventListener("click", (event) => {
      navigator.clipboard.writeText(iconCode);

      copyCodeTrigger.querySelector("span").textContent = "Copied code";
    });
  });
};

document.addEventListener('DOMContentLoaded', function() {
  window.GesisWeb.state = 'initializing';
  copyIconInfoToClipboard();

  // console.log("DOMContentLoaded");

  window.language = getLanguage();

  conditionallyShow404ModalOnActiveResolvingStrategy();

  // initialize VCards
  const vCardElements = document.getElementsByClassName("gs_vcard_toggle");
  const vCards = initializeVCards(vCardElements, fadeMainContent, unfadeMainContent);
  window.GesisWeb.vCards = vCards;

  window.GesisWeb.Search = search;


  //initialize Menubuttons / Megamenus
  //const menubuttonElements = document.getElementsByClassName('gs_mm_toggle_button');
  //const menubuttons = initializeMegamenus(
  //menubuttonElements,
  //fadeMainContentAndHighlightThisMegamenuOnOpenHandler,
  //unfadeMainContentAndHighlightThisMegamenuOnCloseHandler
  //);
  //window.GesisWeb.menubuttons = menubuttons;

  setupSkipLinks();

  // initialize Popups / Rootline in breadcrumbs
  const popupElements = document.getElementsByClassName('gs_dropdown_toggle');
  const popups = initializePopups(popupElements);
  window.GesisWeb.popups = popups;

  // initialize tns / (accessible) sliders / carousels
  //const sliderElements = document.querySelectorAll('.gs_3col_slider, .gs_single_slider, .gs_news_compact_slider, .gs_single_slider_wrapper');
  //const sliders = initializeSliders(sliderElements);
  //window.GesisWeb.sliders = sliders;

  // initialize TabContainers
  const tabContainersElements = document.getElementsByClassName('tabs');
  const tabContainers = initializeTabContainers(tabContainersElements);
  window.GesisWeb.tabContainers = tabContainers;

  const lazyGrisServiceProjectsTablesortersPromise = lazySetupGrisServiceProjectsTablesorters();
  lazyGrisServiceProjectsTablesortersPromise.then(grisServiceProjectsTablesorters => {
    if (grisServiceProjectsTablesorters) {
      window.GesisWeb.grisServiceProjectsTablesorters = grisServiceProjectsTablesorters;
      // Tablesorter objects can then be programmatically interacted with e.g.
      // GesisWeb.grisServiceProjectsTablesorters[0].find('th:eq(2)').trigger('sort')
      // see https://mottie.github.io/tablesorter/docs/#methods
    }
  });
  window.GesisWeb.lazyGrisServiceProjectsTablesortersPromise = lazyGrisServiceProjectsTablesortersPromise;

  setupPowermail();

  const lazyHighlightAllPromise = lazyHighlightAll();
  window.GesisWeb.lazyHighlightAllPromise = lazyHighlightAllPromise;

  const lazySetupFancyboxPromise = lazySetupFancybox();
  window.GesisWeb.lazySetupFancyboxPromise = lazySetupFancyboxPromise;

  injectColorTable();

  setupTracking();

  const lazyGesisDataTablesPromise = lazySetupGesisDataTables();
  window.GesisWeb.lazyGesisDataTablesPromise = lazyGesisDataTablesPromise;

  window.GesisWeb.state = 'initialized';

  // dispatch event that setup has finished initializing
  const gesisWebInitializedEvent = new Event('gesisweb.initialized');
  document.dispatchEvent(gesisWebInitializedEvent);
  /* can be listened for with e.g.:
  document.addEventListener('gesisweb.initialized', event => {
    console.log("it has initialized", event);
  });
  */



  $(".carousel").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    prevArrow: `<button type="button" role="button" class="slick-prev slick-arrow"></button>`,
    nextArrow: `<button type="button" role="button" class="slick-next slick-arrow"></button>`,
    responsive: [{
      breakpoint: 1300,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    }, {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });

  $(".slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    dots: true,
    autoplaySpeed: 8000
  });


  // Get language data
  var language = "de";
  const pathname = window.location.pathname;
  if (pathname.startsWith("/en/")) language = "en";

  // Set links
  var serviceLinks = {
    "de": {
      "Phase1": "#c125569",
      "Phase2": "#c125553",
      "Phase3": "#c125557",
      "Phase4": "#c125561"
    },
    "en": {
      "Phase1": "#c125569",
      "Phase2": "#c125553",
      "Phase3": "#c125557",
      "Phase4": "#c125561"
    }
  };
  var researchLinks = {
    "de": {
      "Phase1": "#c124037",
      "Phase2": "#c124040",
      "Phase3": "#c124046",
      "Phase4": "#c124053",
      "Phase5": "#c124061"
    },
    "en": {
      "Phase1": "#c124037",
      "Phase2": "#c124040",
      "Phase3": "#c124046",
      "Phase4": "#c124053",
      "Phase5": "#c124061"
    }
  };

  // Objekt-ID
  if (pathname.startsWith("/angebot") || pathname.startsWith("/en/service")) {
    var mySVG = document.getElementById('71-svg');
  } else if (pathname.startsWith("/forschung") || pathname.startsWith("/en/research")) {
    var mySVG = document.getElementById('72-svg');
  }
  var svgDoc;
  // SVG laden
  if (mySVG) {
    mySVG.addEventListener('load', function() {
      svgDoc = mySVG.contentDocument;
      if (pathname.startsWith("/angebot") || pathname.startsWith("/en/service")) {
        var de_nodes = svgDoc.querySelectorAll("#pt-1, #pt-2, #pt-3, #pt-4");
        var en_nodes = svgDoc.querySelectorAll("#pt-1e, #pt-2e, #pt-3e, #pt-4e");
        if (language == "en") {
          for (var i = 0; i < de_nodes.length; i++) {
            de_nodes[i].style.display = "none";
            en_nodes[i].style.display = "block";
          }
        } else {
          for (var i = 0; i < en_nodes.length; i++) {
            en_nodes[i].style.display = "none";
            de_nodes[i].style.display = "block";
          }
        }
        for (var i = 1; i <= 4; i++) {
          var phase = "Phase" + i;
          add_events(svgDoc, phase);
        }
      } else if (pathname.startsWith("/forschung") || pathname.startsWith("/en/research")) {
        for (var i = 1; i <= 5; i++) {
          var phase = "Phase" + i;
          add_events(svgDoc, phase);
        }
      }
    }, false);

    function add_events(svgDoc, id_part) {
      if (pathname.startsWith("/angebot") || pathname.startsWith("/en/service")) {
        var box_hv = svgDoc.querySelector("[id='" + id_part + "_hv']");
        var box_bl = svgDoc.querySelector("[id='" + id_part + "_bl']");
        var box_mg = svgDoc.querySelector("[id='" + id_part + "_mg']");
      } else if (pathname.startsWith("/forschung") || pathname.startsWith("/en/research")) {
        var box_hv = svgDoc.querySelector("[id='" + id_part + "_hv']");
        var box_bl = svgDoc.querySelector("[id='" + id_part + "_bl']");
        var box_mg = svgDoc.querySelector("[id='" + id_part + "_mg']");
      }

      // Events für LC verknüpfen
      box_hv.addEventListener("mouseover", function() {
        // Aktive Box färben (SVG)
        box_bl.style.display = "none";
        box_mg.style.display = "block";
      }, false);

      box_hv.addEventListener("mouseout", function() {
        // Alles zurücksetzen
        box_bl.style.display = "block";
        box_mg.style.display = "none";
      }, false);

      box_hv.addEventListener("click", function() {
        if (pathname.startsWith("/angebot") || pathname.startsWith("/en/service")) {
          location.href = serviceLinks[language][id_part];
        } else if (pathname.startsWith("/forschung") || pathname.startsWith("/en/research")) {
          location.href = researchLinks[language][id_part];
        }
      }, false);
    }
  }

  /*
  if (document.querySelector('#surveyModal')) {
    const modal = new bootstrap.Modal('#surveyModal');

    if (!localStorage.getItem("surveyShown")) {
      setTimeout(() => {
        modal.show();
      }, 15000);
    }
  }
  */
});
