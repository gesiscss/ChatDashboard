const getFocusableAncestors = function(element) {
  var focusableElements = Array.from(element
    .querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
  return focusableElements;
};

const fadeMainContent = function(...highlightedElements) {
  highlightedElements.forEach(element => element.classList.add('unfaded'));
  
  const faderElement = document.getElementsByTagName('main')[0];
  faderElement.classList.add('faded');
};

const unfadeMainContent = function(...highlightedElements) {
  highlightedElements.forEach(element => element.classList.remove('unfaded'));
  
  const faderElement = document.getElementsByTagName('main')[0];
  faderElement.classList.remove('faded');
};

const isSmallScreenOrTouchOnly = function() {
  // see https://stackoverflow.com/a/8876069/923560
  // max-width: 991.98px equals @include media-breakpoint-down(lg). Comma behaves like logical or operator
  const isMobile = window.matchMedia('(max-width: 991.98px), (hover: none), (pointer: coarse)').matches;
  return isMobile;
};

// given a metaName string, looks for any matching meta elements and returns the first's  content attribute as a string. If not found, returns boolean false
const getMeta = function(metaName) {
  const metas = Array.from( document.getElementsByTagName('meta') );
  const metasResults = metas.filter(element => element.getAttribute('name') === metaName);
  let result = metasResults.length ? metasResults[0].getAttribute('content') : false;
  return result;
};

const getMicrosite = function() {
  const micrositeSection = document.querySelector("body > section");
  if (micrositeSection){
    const [result] = Array.from(micrositeSection.classList)
      .filter(clazz => clazz.includes('microsite-identifier-'))
      .map(micrositeClazz => micrositeClazz.replace('microsite-identifier-', ''));
    return result;
  }
};

const getLanguage = function() {
  const language = document.getElementsByTagName('html')[0].lang || 'en';
  return language;
};

// see https://stackoverflow.com/a/9039885/923560
const isAppleMobileBrowser = function() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
};

/*
  Add <div id="debug-output"></div> to a page to see appendDebug('foo') output.
  Useful for remote debugging, when the usual console.log('foo') logging is not
  viewable, e.g. on mobile devices on real hardware.
*/
const appendDebug = function(text) {
  let debugOutput = document.getElementById('debug-output');
  if (!debugOutput) {
    // if #debug-output does not exist yet, create it
    document.body.insertAdjacentHTML('beforeend', '<div id="debug-output"></div>');
    debugOutput = document.getElementById('debug-output');
  }
  
  const p = document.createElement('p');
  const content = document.createElement('code');
  content.textContent = text;
  p.appendChild(content);
  debugOutput.appendChild(p);
};

/* 
replaceTag(someFooElement, 'baz') converts
<foo attribute="bar">...</foo> to
<baz attribute="bar">...</baz>
see https://stackoverflow.com/a/72439100/923560
*/
const replaceTag$1 = function(element, tagName) {
  const newElement = document.createElement(tagName);
  newElement.append(...element.childNodes);
  
  for (const attribute of element.attributes) {
    newElement.setAttribute(attribute.name, attribute.value);
  }
  
  element.replaceWith(newElement);
  return newElement;
};

const showConfetti = function() {
  var count = 400;
  var defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

// see https://stackoverflow.com/a/43688599/923560
const getXPathForElement = function(element) {
  const idx = (sib, name) => sib
    ? idx(sib.previousElementSibling, name||sib.localName) + (sib.localName == name)
    : 1;
  const segs = elm => !elm || elm.nodeType !== 1
    ? ['']
    : elm.id && document.getElementById(elm.id) === elm
      ? [`id("${elm.id}")`]
      : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
  return segs(element).join('/');
};

// see https://stackoverflow.com/a/43688599/923560
const getElementByXPath = function(path) {
  return (new XPathEvaluator())
    .evaluate(
      path,
      document.documentElement, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
};

const keyCode$2 = Object.freeze({
  'TAB': 9,
  'RETURN': 13,
  'ESC': 27,
  'SPACE': 32,
  'PAGEUP': 33,
  'PAGEDOWN': 34,
  'END': 35,
  'HOME': 36,
  'LEFT': 37,
  'UP': 38,
  'RIGHT': 39,
  'DOWN': 40,
  'DELETE': 46
});

const setupSkipLinks = function() {
  // JavaScript-based workaround for skip link animation in IE 11 and Edge
  // as these browsers don't support :focus-within pseudostate as of 2020-05-20
  const skipLinks = document.getElementsByClassName('skip-links');
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
    if (wasFocusPreviouslyAlreadyInsideContainer) ;
    else {
      thisContainer.setAttribute('aria-expanded', 'true');
    }
  }
  else if ('focusout' === eventType) {
    const newlyFocusedElement = event.relatedTarget;
    const isFocusStillInsideContainer = thisContainer.contains(newlyFocusedElement);
    if (isFocusStillInsideContainer) ;
    else {
      thisContainer.setAttribute('aria-expanded', 'false');
    }
  }
}

var win$1 = window;

var raf = win$1.requestAnimationFrame
  || win$1.webkitRequestAnimationFrame
  || win$1.mozRequestAnimationFrame
  || win$1.msRequestAnimationFrame
  || function(cb) { return setTimeout(cb, 16); };

var win = window;

var caf = win.cancelAnimationFrame
  || win.mozCancelAnimationFrame
  || function(id){ clearTimeout(id); };

function extend() {
  var obj, name, copy,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length;

  for (; i < length; i++) {
    if ((obj = arguments[i]) !== null) {
      for (name in obj) {
        copy = obj[name];

        if (target === copy) {
          continue;
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}

function checkStorageValue (value) {
  return ['true', 'false'].indexOf(value) >= 0 ? JSON.parse(value) : value;
}

function setLocalStorage(storage, key, value, access) {
  if (access) {
    try { storage.setItem(key, value); } catch (e) {}
  }
  return value;
}

function getSlideId() {
  var id = window.tnsId;
  window.tnsId = !id ? 1 : id + 1;
  
  return 'tns' + window.tnsId;
}

function getBody () {
  var doc = document,
      body = doc.body;

  if (!body) {
    body = doc.createElement('body');
    body.fake = true;
  }

  return body;
}

var docElement = document.documentElement;

function setFakeBody (body) {
  var docOverflow = '';
  if (body.fake) {
    docOverflow = docElement.style.overflow;
    //avoid crashing IE8, if background image is used
    body.style.background = '';
    //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
    body.style.overflow = docElement.style.overflow = 'hidden';
    docElement.appendChild(body);
  }

  return docOverflow;
}

function resetFakeBody (body, docOverflow) {
  if (body.fake) {
    body.remove();
    docElement.style.overflow = docOverflow;
    // Trigger layout so kinetic scrolling isn't disabled in iOS6+
    // eslint-disable-next-line
    docElement.offsetHeight;
  }
}

// get css-calc 
// @return - false | calc | -webkit-calc | -moz-calc
// @usage - var calc = getCalc(); 

function calc() {
  var doc = document, 
      body = getBody(),
      docOverflow = setFakeBody(body),
      div = doc.createElement('div'), 
      result = false;

  body.appendChild(div);
  try {
    var str = '(10px * 10)',
        vals = ['calc' + str, '-moz-calc' + str, '-webkit-calc' + str],
        val;
    for (var i = 0; i < 3; i++) {
      val = vals[i];
      div.style.width = val;
      if (div.offsetWidth === 100) { 
        result = val.replace(str, ''); 
        break;
      }
    }
  } catch (e) {}
  
  body.fake ? resetFakeBody(body, docOverflow) : div.remove();

  return result;
}

// get subpixel support value
// @return - boolean

function percentageLayout() {
  // check subpixel layout supporting
  var doc = document,
      body = getBody(),
      docOverflow = setFakeBody(body),
      wrapper = doc.createElement('div'),
      outer = doc.createElement('div'),
      str = '',
      count = 70,
      perPage = 3,
      supported = false;

  wrapper.className = "tns-t-subp2";
  outer.className = "tns-t-ct";

  for (var i = 0; i < count; i++) {
    str += '<div></div>';
  }

  outer.innerHTML = str;
  wrapper.appendChild(outer);
  body.appendChild(wrapper);

  supported = Math.abs(wrapper.getBoundingClientRect().left - outer.children[count - perPage].getBoundingClientRect().left) < 2;

  body.fake ? resetFakeBody(body, docOverflow) : wrapper.remove();

  return supported;
}

// create and append style sheet
function createStyleSheet (media) {
  // Create the <style> tag
  var style = document.createElement("style");
  // style.setAttribute("type", "text/css");

  // Add a media (and/or media query) here if you'd like!
  // style.setAttribute("media", "screen")
  // style.setAttribute("media", "only screen and (max-width : 1024px)")
  if (media) { style.setAttribute("media", media); }

  // WebKit hack :(
  // style.appendChild(document.createTextNode(""));

  // Add the <style> element to the page
  document.querySelector('head').appendChild(style);

  return style.sheet ? style.sheet : style.styleSheet;
}

// cross browsers addRule method
function addCSSRule(sheet, selector, rules, index) {
  // return raf(function() {
    'insertRule' in sheet ?
      sheet.insertRule(selector + '{' + rules + '}', index) :
      sheet.addRule(selector, rules, index);
  // });
}

// cross browsers addRule method
function removeCSSRule(sheet, index) {
  // return raf(function() {
    'deleteRule' in sheet ?
      sheet.deleteRule(index) :
      sheet.removeRule(index);
  // });
}

function getCssRulesLength(sheet) {
  var rule = ('insertRule' in sheet) ? sheet.cssRules : sheet.rules;
  return rule.length;
}

function toDegree (y, x) {
  return Math.atan2(y, x) * (180 / Math.PI);
}

function getTouchDirection(angle, range) {
  var direction = false,
      gap = Math.abs(90 - Math.abs(angle));
      
  if (gap >= 90 - range) {
    direction = 'horizontal';
  } else if (gap <= range) {
    direction = 'vertical';
  }

  return direction;
}

// https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
function forEach (arr, callback, scope) {
  for (var i = 0, l = arr.length; i < l; i++) {
    callback.call(scope, arr[i], i);
  }
}

var classListSupport = 'classList' in document.createElement('_');

var hasClass = classListSupport ?
    function (el, str) { return el.classList.contains(str); } :
    function (el, str) { return el.className.indexOf(str) >= 0; };

var addClass = classListSupport ?
    function (el, str) {
      if (!hasClass(el,  str)) { el.classList.add(str); }
    } :
    function (el, str) {
      if (!hasClass(el,  str)) { el.className += ' ' + str; }
    };

var removeClass = classListSupport ?
    function (el, str) {
      if (hasClass(el,  str)) { el.classList.remove(str); }
    } :
    function (el, str) {
      if (hasClass(el, str)) { el.className = el.className.replace(str, ''); }
    };

function hasAttr(el, attr) {
  return el.hasAttribute(attr);
}

function getAttr(el, attr) {
  return el.getAttribute(attr);
}

function isNodeList(el) {
  // Only NodeList has the "item()" function
  return typeof el.item !== "undefined"; 
}

function setAttrs(els, attrs) {
  els = (isNodeList(els) || els instanceof Array) ? els : [els];
  if (Object.prototype.toString.call(attrs) !== '[object Object]') { return; }

  for (var i = els.length; i--;) {
    for(var key in attrs) {
      els[i].setAttribute(key, attrs[key]);
    }
  }
}

function removeAttrs(els, attrs) {
  els = (isNodeList(els) || els instanceof Array) ? els : [els];
  attrs = (attrs instanceof Array) ? attrs : [attrs];

  var attrLength = attrs.length;
  for (var i = els.length; i--;) {
    for (var j = attrLength; j--;) {
      els[i].removeAttribute(attrs[j]);
    }
  }
}

function arrayFromNodeList (nl) {
  var arr = [];
  for (var i = 0, l = nl.length; i < l; i++) {
    arr.push(nl[i]);
  }
  return arr;
}

function hideElement(el, forceHide) {
  if (el.style.display !== 'none') { el.style.display = 'none'; }
}

function showElement(el, forceHide) {
  if (el.style.display === 'none') { el.style.display = ''; }
}

function isVisible(el) {
  return window.getComputedStyle(el).display !== 'none';
}

function whichProperty(props){
  if (typeof props === 'string') {
    var arr = [props],
        Props = props.charAt(0).toUpperCase() + props.substr(1),
        prefixes = ['Webkit', 'Moz', 'ms', 'O'];
        
    prefixes.forEach(function(prefix) {
      if (prefix !== 'ms' || props === 'transform') {
        arr.push(prefix + Props);
      }
    });

    props = arr;
  }

  var el = document.createElement('fakeelement');
      props.length;
  for(var i = 0; i < props.length; i++){
    var prop = props[i];
    if( el.style[prop] !== undefined ){ return prop; }
  }

  return false; // explicit for ie9-
}

function has3DTransforms(tf){
  if (!tf) { return false; }
  if (!window.getComputedStyle) { return false; }
  
  var doc = document,
      body = getBody(),
      docOverflow = setFakeBody(body),
      el = doc.createElement('p'),
      has3d,
      cssTF = tf.length > 9 ? '-' + tf.slice(0, -9).toLowerCase() + '-' : '';

  cssTF += 'transform';

  // Add it to the body to get the computed style
  body.insertBefore(el, null);

  el.style[tf] = 'translate3d(1px,1px,1px)';
  has3d = window.getComputedStyle(el).getPropertyValue(cssTF);

  body.fake ? resetFakeBody(body, docOverflow) : el.remove();

  return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
}

// get transitionend, animationend based on transitionDuration
// @propin: string
// @propOut: string, first-letter uppercase
// Usage: getEndProperty('WebkitTransitionDuration', 'Transition') => webkitTransitionEnd
function getEndProperty(propIn, propOut) {
  var endProp = false;
  if (/^Webkit/.test(propIn)) {
    endProp = 'webkit' + propOut + 'End';
  } else if (/^O/.test(propIn)) {
    endProp = 'o' + propOut + 'End';
  } else if (propIn) {
    endProp = propOut.toLowerCase() + 'end';
  }
  return endProp;
}

// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("test", null, opts);
} catch (e) {}
var passiveOption = supportsPassive ? { passive: true } : false;

function addEvents(el, obj, preventScrolling) {
  for (var prop in obj) {
    var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 && !preventScrolling ? passiveOption : false;
    el.addEventListener(prop, obj[prop], option);
  }
}

function removeEvents(el, obj) {
  for (var prop in obj) {
    var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 ? passiveOption : false;
    el.removeEventListener(prop, obj[prop], option);
  }
}

function Events() {
  return {
    topics: {},
    on: function (eventName, fn) {
      this.topics[eventName] = this.topics[eventName] || [];
      this.topics[eventName].push(fn);
    },
    off: function(eventName, fn) {
      if (this.topics[eventName]) {
        for (var i = 0; i < this.topics[eventName].length; i++) {
          if (this.topics[eventName][i] === fn) {
            this.topics[eventName].splice(i, 1);
            break;
          }
        }
      }
    },
    emit: function (eventName, data) {
      data.type = eventName;
      if (this.topics[eventName]) {
        this.topics[eventName].forEach(function(fn) {
          fn(data, eventName);
        });
      }
    }
  };
}

function jsTransform(element, attr, prefix, postfix, to, duration, callback) {
  var tick = Math.min(duration, 10),
      unit = (to.indexOf('%') >= 0) ? '%' : 'px',
      to = to.replace(unit, ''),
      from = Number(element.style[attr].replace(prefix, '').replace(postfix, '').replace(unit, '')),
      positionTick = (to - from) / duration * tick;

  setTimeout(moveElement, tick);
  function moveElement() {
    duration -= tick;
    from += positionTick;
    element.style[attr] = prefix + from + unit + postfix;
    if (duration > 0) { 
      setTimeout(moveElement, tick); 
    } else {
      callback();
    }
  }
}

// Object.keys
if (!Object.keys) {
  Object.keys = function(object) {
    var keys = [];
    for (var name in object) {
      if (Object.prototype.hasOwnProperty.call(object, name)) {
        keys.push(name);
      }
    }
    return keys;
  };
}

// ChildNode.remove
if(!("remove" in Element.prototype)){
  Element.prototype.remove = function(){
    if(this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}


const defaultSliderOptions = Object.freeze({
  containerLabel: false,
  containerLabelledby: false,
  items: 1,
  slideBy: 'page',
  controls: true,
  controlsText: ['', ''],
  nav: true,
  navPosition: 'top',
  arrowKeys: true,
  autoplay: true,
  autoplayTimeout: 10000,
  speed: 200,
  autoplayPosition: 'top',
  autoplayText: ['', ''],
  autoplayHoverPause: true,
  autoplayUserPaused: false, // false => autoplay running by default
  autoplayButton: false,
  autoplayButtonOutput: true,
  mouseDrag: true,
  swipeAngle: false,
  rewind: true,
  locale: document.getElementsByTagName('html')[0].lang || 'en',
  useLocalStorage: false
});

const tns = function(options) {
  options = extend({
    container: '.slider',
    containerLabel: false,
    containerLabelledby: false,
    mode: 'carousel',
    axis: 'horizontal',
    items: 1,
    gutter: 0,
    edgePadding: 0,
    fixedWidth: false,
    autoWidth: false,
    viewportMax: false,
    slideBy: 1,
    center: false,
    controls: true,
    controlsPosition: 'top',
    controlsText: ['prev', 'next'],
    controlsContainer: false,
    prevButton: false,
    nextButton: false,
    nav: true,
    navPosition: 'top',
    navContainer: false,
    navAsThumbnails: false,
    arrowKeys: false,
    speed: 300,
    autoplay: false,
    autoplayPosition: 'top',
    autoplayTimeout: 5000,
    autoplayDirection: 'forward',
    autoplayText: ['start', 'pause'],
    autoplayHoverPause: false,
    autoplayUserPaused: false,
    autoplayButton: false,
    autoplayButtonOutput: true,
    autoplayIndicator: false,
    autoplayResetOnVisibility: true,
    animateIn: 'tns-fadeIn',
    animateOut: 'tns-fadeOut',
    animateNormal: 'tns-normal',
    animateDelay: false,
    loop: true,
    rewind: false,
    autoHeight: false,
    responsive: false,
    lazyload: false,
    lazyloadSelector: '.tns-lazy-img',
    touch: true,
    mouseDrag: false,
    swipeAngle: 15,
    nested: false,
    preventActionWhenRunning: false,
    preventScrollOnTouch: false,
    freezable: true,
    onInit: false,
    locale: 'en',
    showDebug: false,
    isAriaLiveRegion: true, // when isAriaLiveRegion is explicitly set to false, then this slider will not use any aria-* attributes which cause assistive live region output.
    // This is useful in contexts where the slider is used inside a surrounding live region, such as the GESIS Search widget
    useLocalStorage: true
  }, options || {});

  var doc = document,
      win = window,
      KEYS = {
        ENTER: 13,
        SPACE: 32,
        LEFT: 37,
        RIGHT: 39
      },
      tnsStorage = {},
      localStorageAccess = options.useLocalStorage;
  
  var L10N = {
      'en': {
        'CAROUSEL': 'Carousel',
        'STOP_AUTOPLAY': 'Stop autoplay',
        'PAUSE_AUTOPLAY': 'Pause autoplay',
        'START_AUTOPLAY': 'Start autoplay',
        'TILE': 'Tile',
        'OF': 'of',
        'PAGINATION': 'Page selection',
        'PAGE': 'Page',
        'PREVIOUS_PAGE': 'Previous page',
        'NEXT_PAGE': 'Next page',
        'SELECTED_PAGE': 'selected page'
      },
      'de': {
        'CAROUSEL': 'Karussell',
        'STOP_AUTOPLAY': 'Automatisches Abspielen stoppen',
        'PAUSE_AUTOPLAY': 'Automatisches Abspielen pausieren',
        'START_AUTOPLAY': 'Automatisches Abspielen starten',
        'TILE': 'Kachel',
        'OF' : 'von',
        'PAGINATION': 'Seitenauswahl',
        'PAGE': 'Seite',
        'PREVIOUS_PAGE': 'Vorherige Seite',
        'NEXT_PAGE': 'Nächste Seite',
        'SELECTED_PAGE': 'ausgewählte Seite'
      }
  };
  
  if (localStorageAccess) {
    // check browser version and local storage access
    var browserInfo = navigator.userAgent;
    var uid = new Date;

    try {
      tnsStorage = win.localStorage;
      if (tnsStorage) {
        tnsStorage.setItem(uid, uid);
        localStorageAccess = tnsStorage.getItem(uid) == uid;
        tnsStorage.removeItem(uid);
      } else {
        localStorageAccess = false;
      }
      if (!localStorageAccess) { tnsStorage = {}; }
    } catch(e) {
      localStorageAccess = false;
    }

    if (localStorageAccess) {
      // remove storage when browser version changes
      if (tnsStorage['tnsApp'] && tnsStorage['tnsApp'] !== browserInfo) {
        ['tC', 'tPL', 'tMQ', 'tTf', 't3D', 'tTDu', 'tTDe', 'tADu', 'tADe', 'tTE', 'tAE'].forEach(function(item) { tnsStorage.removeItem(item); });
      }
      // update browserInfo
      localStorage['tnsApp'] = browserInfo;
    }
  }

  var CALC = tnsStorage['tC'] ? checkStorageValue(tnsStorage['tC']) : setLocalStorage(tnsStorage, 'tC', calc(), localStorageAccess),
      PERCENTAGELAYOUT = tnsStorage['tPL'] ? checkStorageValue(tnsStorage['tPL']) : setLocalStorage(tnsStorage, 'tPL', percentageLayout(), localStorageAccess),
      CSSMQ = tnsStorage['tMQ'] ? checkStorageValue(tnsStorage['tMQ']) : setLocalStorage(tnsStorage, 'tMQ', true, localStorageAccess),
      TRANSFORM = tnsStorage['tTf'] ? checkStorageValue(tnsStorage['tTf']) : setLocalStorage(tnsStorage, 'tTf', whichProperty('transform'), localStorageAccess),
      HAS3DTRANSFORMS = tnsStorage['t3D'] ? checkStorageValue(tnsStorage['t3D']) : setLocalStorage(tnsStorage, 't3D', has3DTransforms(TRANSFORM), localStorageAccess),
      TRANSITIONDURATION = tnsStorage['tTDu'] ? checkStorageValue(tnsStorage['tTDu']) : setLocalStorage(tnsStorage, 'tTDu', whichProperty('transitionDuration'), localStorageAccess),
      TRANSITIONDELAY = tnsStorage['tTDe'] ? checkStorageValue(tnsStorage['tTDe']) : setLocalStorage(tnsStorage, 'tTDe', whichProperty('transitionDelay'), localStorageAccess),
      ANIMATIONDURATION = tnsStorage['tADu'] ? checkStorageValue(tnsStorage['tADu']) : setLocalStorage(tnsStorage, 'tADu', whichProperty('animationDuration'), localStorageAccess),
      ANIMATIONDELAY = tnsStorage['tADe'] ? checkStorageValue(tnsStorage['tADe']) : setLocalStorage(tnsStorage, 'tADe', whichProperty('animationDelay'), localStorageAccess),
      TRANSITIONEND = tnsStorage['tTE'] ? checkStorageValue(tnsStorage['tTE']) : setLocalStorage(tnsStorage, 'tTE', getEndProperty(TRANSITIONDURATION, 'Transition'), localStorageAccess),
      ANIMATIONEND = tnsStorage['tAE'] ? checkStorageValue(tnsStorage['tAE']) : setLocalStorage(tnsStorage, 'tAE', getEndProperty(ANIMATIONDURATION, 'Animation'), localStorageAccess);

  // get element nodes from selectors
  var supportConsoleWarn = win.console && typeof win.console.warn === "function",
      tnsList = ['container', 'controlsContainer', 'prevButton', 'nextButton', 'navContainer', 'autoplayButton'],
      optionsElements = {};

  tnsList.forEach(function(item) {
    if (typeof options[item] === 'string') {
      var str = options[item],
          el = doc.querySelector(str);
      optionsElements[item] = str;

      if (el && el.nodeName) {
        options[item] = el;
      }
      else {
        if (supportConsoleWarn && options.showDebug) {
          console.warn('Can\'t find', options[item]);
        }
        return;
      }
    }
  });

  // make sure at least 1 slide
  if (!options.container || !options.container.children || options.container.children.length < 1) {
    if (supportConsoleWarn && options.showDebug) {
      console.warn('No slides found in', options.container);
    }
    return;
   }

  // update options
  var responsive = options.responsive,
      nested = options.nested,
      carousel = options.mode === 'carousel' ? true : false;

  if (responsive) {
    // apply responsive[0] to options and remove it
    if (0 in responsive) {
      options = extend(options, responsive[0]);
      delete responsive[0];
    }

    var responsiveTem = {};
    for (var key in responsive) {
      var val = responsive[key];
      // update responsive
      // from: 300: 2
      // to:
      //   300: {
      //     items: 2
      //   }
      val = typeof val === 'number' ? {items: val} : val;
      responsiveTem[key] = val;
    }
    responsive = responsiveTem;
    responsiveTem = null;
  }

  // update options
  function updateOptions (obj) {
    for (var key in obj) {
      if (!carousel) {
        if (key === 'slideBy') { obj[key] = 'page'; }
        if (key === 'edgePadding') { obj[key] = false; }
        if (key === 'autoHeight') { obj[key] = false; }
      }

      // update responsive options
      if (key === 'responsive') { updateOptions(obj[key]); }
    }
  }
  if (!carousel) { updateOptions(options); }


  // === define and set variables ===
  if (!carousel) {
    options.axis = 'horizontal';
    options.slideBy = 'page';
    options.edgePadding = false;

    var animateIn = options.animateIn,
        animateOut = options.animateOut,
        animateDelay = options.animateDelay,
        animateNormal = options.animateNormal;
  }

  var horizontal = options.axis === 'horizontal' ? true : false,
      outerWrapper = doc.createElement('section'),
      controllerWrapper = doc.createElement('div'),
      innerWrapper = doc.createElement('div'),
      middleWrapper,
      container = options.container,
      containerParent = container.parentNode,
      containerHTML = container.outerHTML,
      slideItems = container.children,
      slideCount = slideItems.length,
      breakpointZone,
      windowWidth = getWindowWidth(),
      isOn = false;
  if (responsive) { setBreakpointZone(); }
  if (carousel) { container.className += ' tns-vpfix'; }

  const userPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // fixedWidth: viewport > rightBoundary > indexMax
  var autoWidth = options.autoWidth,
      fixedWidth = getOption('fixedWidth'),
      edgePadding = getOption('edgePadding'),
      gutter = getOption('gutter'),
      viewport = getViewportWidth(),
      center = getOption('center'),
      items = !autoWidth ? Math.floor(getOption('items')) : 1,
      slideBy = getOption('slideBy'),
      viewportMax = options.viewportMax || options.fixedWidthViewportWidth,
      arrowKeys = getOption('arrowKeys'),
      speed = userPrefersReducedMotion ? 0 : getOption('speed'),
      rewind = options.rewind,
      loop = rewind ? false : options.loop,
      autoHeight = getOption('autoHeight'),
      controls = getOption('controls'),
      controlsText = getOption('controlsText'),
      nav = getOption('nav'),
      touch = getOption('touch'),
      mouseDrag = getOption('mouseDrag'),
      autoplay = getOption('autoplay'),
      autoplayTimeout = getOption('autoplayTimeout'),
      autoplayText = getOption('autoplayText'),
      autoplayHoverPause = getOption('autoplayHoverPause'),
      autoplayResetOnVisibility = getOption('autoplayResetOnVisibility'),
      sheet = createStyleSheet(),
      lazyload = options.lazyload,
      lazyloadSelector = options.lazyloadSelector,
      locale = options.locale,
      containerLabel = options.containerLabel,
      containerLabelledby = options.containerLabelledby,
      slidePositions, // collection of slide positions
      slideItemsOut = [],
      cloneCount = loop ? getCloneCountForLoop() : 0,
      slideCountNew = !carousel ? slideCount + cloneCount : slideCount + cloneCount * 2,
      hasRightDeadZone = (fixedWidth || autoWidth) && !loop ? true : false,
      rightBoundary = fixedWidth ? getRightBoundary() : null,
      updateIndexBeforeTransform = (!carousel || !loop) ? true : false,
      // transform
      transformAttr = horizontal ? 'left' : 'top',
      transformPrefix = '',
      transformPostfix = '',
      // index
      getIndexMax = (function () {
        if (fixedWidth) {
          return function() { return center && !loop ? slideCount - 1 : Math.ceil(- rightBoundary / (fixedWidth + gutter)); };
        }
        else if (autoWidth) {
          return function() {
            for (var i = slideCountNew; i--;) {
              if (slidePositions[i] >= - rightBoundary) { return i; }
            }
          };
        }
        else {
          return function() {
            if (center && carousel && !loop) {
              return slideCount - 1;
            }
            else {
              return loop || carousel ? Math.max(0, slideCountNew - Math.ceil(items)) : slideCountNew - 1;
            }
          };
        }
      })(),
      index = getStartIndex(getOption('startIndex')),
      indexCached = index;
      getCurrentSlide();
      var indexMin = 0,
      indexMax = !autoWidth ? getIndexMax() : null,
      preventActionWhenRunning = options.preventActionWhenRunning,
      swipeAngle = options.swipeAngle,
      moveDirectionExpected = swipeAngle ? '?' : true,
      running = false,
      onInit = options.onInit,
      events = new Events(),
      // id, class
      newContainerClasses = ' tns-slider tns-' + options.mode,
      slideId = container.id || getSlideId(),
      disable = getOption('disable'),
      disabled = false,
      freezable = options.freezable,
      freeze = freezable && !autoWidth ? getFreeze() : false,
      frozen = false,
      controlsEvents = {
        'click': onPrevNextClick,
        'keydown': onControlsKeydown
      },
      navEvents = {
        'click': onNavClick,
        'keydown': onNavKeydown
      },
      hoverEvents = {
        'mouseover': mouseoverPause,
        'mouseout': mouseoutRestart
      },
      visibilityEvent = {'visibilitychange': onVisibilityChange},
      docmentKeydownEvent = {'keydown': onDocumentKeydown},
      touchEvents = {
        'touchstart': onPanStart,
        'touchmove': onPanMove,
        'touchend': onPanEnd,
        'touchcancel': onPanEnd
      },
      dragEvents = {
        'mousedown': onPanStart,
        'mousemove': onPanMove,
        'mouseup': onPanEnd,
        'mouseleave': onPanEnd
      },
      hasControls = hasOption('controls'),
      hasNav = hasOption('nav'),
      navAsThumbnails = autoWidth ? true : options.navAsThumbnails,
      hasAutoplay = hasOption('autoplay'),
      hasTouch = hasOption('touch'),
      hasMouseDrag = hasOption('mouseDrag'),
      slideActiveClass = 'tns-slide-active',
      imgCompleteClass = 'tns-complete',
      imgEvents = {
        'load': onImgLoaded,
        'error': onImgFailed
      },
      imgsComplete,
      ariaLiveTimeouts = [],
      isAriaLiveRegion = hasOption('isAriaLiveRegion'),
      preventScroll = options.preventScrollOnTouch === 'force' ? true : false;

  // controls
  if (hasControls) {
    var controlsContainer = options.controlsContainer,
        controlsContainerHTML = options.controlsContainer ? options.controlsContainer.outerHTML : '',
        prevButton = options.prevButton,
        nextButton = options.nextButton,
        prevButtonHTML = options.prevButton ? options.prevButton.outerHTML : '',
        nextButtonHTML = options.nextButton ? options.nextButton.outerHTML : '',
        prevIsButton,
        nextIsButton;
  }

  // nav
  if (hasNav) {
    var navContainer = options.navContainer,
        navContainerHTML = options.navContainer ? options.navContainer.outerHTML : '',
        navItems,
        pages = autoWidth ? slideCount : getPages(),
        pagesCached = 0,
        navClicked = -1,
        navCurrentIndex = getCurrentNavIndex(),
        navCurrentIndexCached = navCurrentIndex,
        navStr = getString('PAGE') + ' ',
        // navStrCurrent = ' (' + getString('SELECTED_PAGE') + ')';
        navStrCurrent = '';
  }

  // autoplay
  if (hasAutoplay) {
    var autoplayDirection = options.autoplayDirection === 'forward' ? 1 : -1,
        autoplayButton = options.autoplayButton,
        autoplayButtonHTML = options.autoplayButton ? options.autoplayButton.outerHTML : '',
        autoplayTimer;
        options.autoplayIndicator;
        var animating,
        autoplayHoverPaused,
        autoplayUserPaused = userPrefersReducedMotion ? true : options.autoplayUserPaused,
        autoplayVisibilityPaused;
  }

  if (hasTouch || hasMouseDrag) {
    var initPosition = {},
        lastPosition = {},
        translateInit,
        panStart = false,
        rafIndex,
        getDist = horizontal ?
          function(a, b) { return a.x - b.x; } :
          function(a, b) { return a.y - b.y; };
  }

  // disable slider when slidecount <= items
  if (!autoWidth) {
    resetVariblesWhenDisable(disable || freeze);
  }

  if (TRANSFORM) {
    transformAttr = TRANSFORM;
    transformPrefix = 'translate';

    if (HAS3DTRANSFORMS) {
      transformPrefix += horizontal ? '3d(' : '3d(0px, ';
      transformPostfix = horizontal ? ', 0px, 0px)' : ', 0px)';
    }
    else {
      transformPrefix += horizontal ? 'X(' : 'Y(';
      transformPostfix = ')';
    }

  }

  if (carousel) {
    container.className = container.className.replace('tns-vpfix', '');
  }
  initStructure();
  initSheet();
  initSliderTransform();

  // === COMMON FUNCTIONS === //
  function resetVariblesWhenDisable (condition) {
    if (condition) {
      controls = nav = touch = mouseDrag = arrowKeys = autoplay = autoplayHoverPause = autoplayResetOnVisibility = false;
    }
  }

  function getCurrentSlide () {
    var tem = carousel ? index - cloneCount : index;
    while (tem < 0) {
      tem += slideCount;
    }
    return tem%slideCount + 1;
  }

  function getStartIndex (ind) {
    ind = ind ? Math.max(0, Math.min(loop ? slideCount - 1 : slideCount - items, ind)) : 0;
    return carousel ? ind + cloneCount : ind;
  }

  function getAbsIndex (i) {
    if (i == null) {
      i = index;
    }

    if (carousel) {
      i -= cloneCount;
    }
    while (i < 0) {
      i += slideCount;
    }

    return Math.floor(i%slideCount);
  }

  function getCurrentNavIndex () {
    var absIndex = getAbsIndex(),
        result;

    result = navAsThumbnails ? absIndex :
      fixedWidth || autoWidth ? Math.ceil((absIndex + 1) * pages / slideCount - 1) :
          Math.floor(absIndex / items);

    // set active nav to the last one when reaches the right edge
    if (!loop && carousel && index === indexMax) {
      result = pages - 1;
    }

    return result;
  }

  function getItemsMax () {
    // fixedWidth or autoWidth while viewportMax is not available
    if (autoWidth || (fixedWidth && !viewportMax)) {
      return slideCount - 1;
    // most cases
    }
    else {
      var str = fixedWidth ? 'fixedWidth' : 'items',
          arr = [];

      if (fixedWidth || options[str] < slideCount) {
        arr.push(options[str]);
      }

      if (responsive) {
        for (var bp in responsive) {
          var tem = responsive[bp][str];
          if (tem && (fixedWidth || tem < slideCount)) {
            arr.push(tem);
          }
        }
      }

      if (!arr.length) {
        arr.push(0);
      }

      return Math.ceil(fixedWidth ? viewportMax / Math.min.apply(null, arr) : Math.max.apply(null, arr));
    }
  }

  function getCloneCountForLoop () {
    var itemsMax = getItemsMax(),
        result = carousel ? Math.ceil((itemsMax * 5 - slideCount)/2) : (itemsMax * 4 - slideCount);
    result = Math.max(itemsMax, result);

    return hasOption('edgePadding') ? result + 1 : result;
  }

  function getWindowWidth () {
    return win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
  }

  function getInsertPosition (pos) {
    return pos === 'top' ? 'afterbegin' : 'beforeend';
  }

  function getClientWidth (el) {
    if (el == null) { return; }
    var div = doc.createElement('div'), rect, width;
    el.appendChild(div);
    rect = div.getBoundingClientRect();
    width = rect.right - rect.left;
    div.remove();
    return width || getClientWidth(el.parentNode);
  }

  function getViewportWidth () {
    var gap = edgePadding ? edgePadding * 2 - gutter : 0;
    return getClientWidth(containerParent) - gap;
  }

  function hasOption (item) {
    if (options[item]) {
      return true;
    }
    else {
      if (responsive) {
        for (var bp in responsive) {
          if (responsive[bp][item]) {
            return true;
          }
        }
      }
      return false;
    }
  }

  // get option:
  // fixed width: viewport, fixedWidth, gutter => items
  // others: window width => all variables
  // all: items => slideBy
  function getOption (item, ww) {
    if (ww == null) { ww = windowWidth; }

    if (item === 'items' && fixedWidth) {
      return Math.floor((viewport + gutter) / (fixedWidth + gutter)) || 1;

    }
    else {
      var result = options[item];

      if (responsive) {
        for (var bp in responsive) {
          // bp: convert string to number
          if (ww >= parseInt(bp)) {
            if (item in responsive[bp]) { result = responsive[bp][item]; }
          }
        }
      }

      if (item === 'slideBy' && result === 'page') {
        result = getOption('items');
      }
      if (!carousel && (item === 'slideBy' || item === 'items')) {
        result = Math.floor(result);
      }

      return result;
    }
  }

  function getSlideMarginLeft (i) {
    return CALC ?
      CALC + '(' + i * 100 + '% / ' + slideCountNew + ')' :
      i * 100 / slideCountNew + '%';
  }

  function getInnerWrapperStyles (edgePaddingTem, gutterTem, fixedWidthTem, speedTem, autoHeightBP) {
    var str = '';

    if (edgePaddingTem !== undefined) {
      var gap = edgePaddingTem;
      if (gutterTem) { gap -= gutterTem; }
      str = horizontal ?
        'margin: 0 ' + gap + 'px 0 ' + edgePaddingTem + 'px;' :
        'margin: ' + edgePaddingTem + 'px 0 ' + gap + 'px 0;';
    } else if (gutterTem && !fixedWidthTem) {
      var gutterTemUnit = '-' + gutterTem + 'px',
          dir = horizontal ? gutterTemUnit + ' 0 0' : '0 ' + gutterTemUnit + ' 0';
      str = 'margin: 0 ' + dir + ';';
    }

    if (!carousel && autoHeightBP && TRANSITIONDURATION && speedTem) { str += getTransitionDurationStyle(speedTem); }
    return str;
  }

  function getContainerWidth (fixedWidthTem, gutterTem, itemsTem) {
    if (fixedWidthTem) {
      return (fixedWidthTem + gutterTem) * slideCountNew + 'px';
    } else {
      return CALC ?
        CALC + '(' + slideCountNew * 100 + '% / ' + itemsTem + ')' :
        slideCountNew * 100 / itemsTem + '%';
    }
  }

  function getSlideWidthStyle (fixedWidthTem, gutterTem, itemsTem) {
    var width;

    if (fixedWidthTem) {
      width = (fixedWidthTem + gutterTem) + 'px';
    } else {
      if (!carousel) { itemsTem = Math.floor(itemsTem); }
      var dividend = carousel ? slideCountNew : itemsTem;
      width = CALC ?
        CALC + '(100% / ' + dividend + ')' :
        100 / dividend + '%';
    }

    width = 'width:' + width;

    // inner slider: overwrite outer slider styles
    return nested !== 'inner' ? width + ';' : width + ' !important;';
  }

  function getSlideGutterStyle (gutterTem) {
    var str = '';

    // gutter maybe interger || 0
    // so can't use 'if (gutter)'
    if (gutterTem !== false) {
      var prop = horizontal ? 'margin-' : 'margin-',
          dir = horizontal ? 'right' : 'bottom';
      str = prop +  dir + ': ' + gutterTem + 'px;';
    }

    return str;
  }

  function getCSSPrefix (name, num) {
    var prefix = name.substring(0, name.length - num).toLowerCase();
    if (prefix) { prefix = '-' + prefix + '-'; }

    return prefix;
  }

  function getTransitionDurationStyle (speed) {
    return getCSSPrefix(TRANSITIONDURATION, 18) + 'transition-duration:' + speed / 1000 + 's;';
  }

  function getAnimationDurationStyle (speed) {
    return getCSSPrefix(ANIMATIONDURATION, 17) + 'animation-duration:' + speed / 1000 + 's;';
  }

  function initStructure () {
    var classOuter = 'tns-outer',
        classInner = 'tns-inner',
        classController = 'tns-controller';
        hasOption('gutter');

    outerWrapper.className = classOuter;
    
    outerWrapper.setAttribute('aria-roledescription', getString('CAROUSEL'));
    
    if (containerLabelledby) {
      outerWrapper.setAttribute('aria-labelledby', containerLabelledby);
    }
    else if (containerLabel) {
      outerWrapper.setAttribute('aria-label', containerLabel);
    }
    else {
      outerWrapper.setAttribute('aria-label', getString('CAROUSEL'));
    }
    
    innerWrapper.className = classInner;
    outerWrapper.id = slideId + '-ow';
    innerWrapper.id = slideId + '-iw';

    controllerWrapper.className = classController;

    // set container properties
    if (container.id === '') { container.id = slideId; }
    newContainerClasses += PERCENTAGELAYOUT || autoWidth ? ' tns-subpixel' : ' tns-no-subpixel';
    newContainerClasses += CALC ? ' tns-calc' : ' tns-no-calc';
    if (autoWidth) { newContainerClasses += ' tns-autowidth'; }
    newContainerClasses += ' tns-' + options.axis;
    container.className += newContainerClasses;

    outerWrapper.appendChild(controllerWrapper);
    
    // add constrain layer for carousel
    if (carousel) {
      middleWrapper = doc.createElement('div');
      middleWrapper.id = slideId + '-mw';
      middleWrapper.className = 'tns-ovh';

      outerWrapper.appendChild(middleWrapper);
      middleWrapper.appendChild(innerWrapper);
    } else {
      outerWrapper.appendChild(innerWrapper);
    }
    
    if (autoHeight) {
      var wp = middleWrapper ? middleWrapper : innerWrapper;
      wp.className += ' tns-ah';
    }

    containerParent.insertBefore(outerWrapper, container);
    innerWrapper.appendChild(container);

    // add id, class, aria attributes
    // before clone slides
    forEach(slideItems, function(item, i) {
      addClass(item, 'tns-item');
      if (!item.id) { item.id = slideId + '-item' + i; }
      if (!carousel && animateNormal) {
        addClass(item, animateNormal);
      }
      setAttrs(item, {
        'aria-label': getString('TILE') + ' ' + (i + 1) + ' ' + getString('OF') + ' ' + slideItems.length,
        'role': 'tabpanel',
        'aria-roledescription': getString('TILE')
      });
    });

    // ## clone slides
    // carousel: n + slides + n
    // gallery:      slides + n
    if (cloneCount) {
      var fragmentBefore = doc.createDocumentFragment(),
          fragmentAfter = doc.createDocumentFragment();

      for (var j = cloneCount; j--;) {
        var num = j%slideCount,
            cloneFirst = slideItems[num].cloneNode(true);
        removeAttrs(cloneFirst, 'id');
        fragmentAfter.insertBefore(cloneFirst, fragmentAfter.firstChild);

        if (carousel) {
          var cloneLast = slideItems[slideCount - 1 - num].cloneNode(true);
          removeAttrs(cloneLast, 'id');
          fragmentBefore.appendChild(cloneLast);
        }
      }

      container.insertBefore(fragmentBefore, container.firstChild);
      container.appendChild(fragmentAfter);
      slideItems = container.children;
    }

  }

  function initSliderTransform () {
    // ## images loaded/failed
    if (hasOption('autoHeight') || autoWidth || !horizontal) {
      var imgs = container.querySelectorAll('img');

      // add img load event listener
      forEach(imgs, function(img) {
        var src = img.src;

        if (!lazyload) {
          // not data img
          if (src && src.indexOf('data:image') < 0) {
            img.src = '';
            addEvents(img, imgEvents);
            addClass(img, 'loading');

            img.src = src;
          // data img
          } else {
            imgLoaded(img);
          }
        }
      });

      // set imgsComplete
      raf(function(){ imgsLoadedCheck(arrayFromNodeList(imgs), function() { imgsComplete = true; }); });

      // reset imgs for auto height: check visible imgs only
      if (hasOption('autoHeight')) { imgs = getImageArray(index, Math.min(index + items - 1, slideCountNew - 1)); }

      lazyload ? initSliderTransformStyleCheck() : raf(function(){ imgsLoadedCheck(arrayFromNodeList(imgs), initSliderTransformStyleCheck); });

    } else {
      // set container transform property
      if (carousel) { doContainerTransformSilent(); }

      // update slider tools and events
      initTools();
      initEvents();
    }
  }

  function initSliderTransformStyleCheck () {
    if (autoWidth) {
      // check styles application
      var num = loop ? index : slideCount - 1;

      (function stylesApplicationCheck() {
        var left = slideItems[num].getBoundingClientRect().left;
        var right = slideItems[num - 1].getBoundingClientRect().right;

        (Math.abs(left - right) <= 1) ?
          initSliderTransformCore() :
          setTimeout(function(){ stylesApplicationCheck(); }, 16);
      })();

    } else {
      initSliderTransformCore();
    }
  }


  function initSliderTransformCore () {
    // run Fn()s which are rely on image loading
    if (!horizontal || autoWidth) {
      setSlidePositions();

      if (autoWidth) {
        rightBoundary = getRightBoundary();
        if (freezable) { freeze = getFreeze(); }
        indexMax = getIndexMax(); // <= slidePositions, rightBoundary <=
        resetVariblesWhenDisable(disable || freeze);
      } else {
        updateContentWrapperHeight();
      }
    }

    // set container transform property
    if (carousel) { doContainerTransformSilent(); }

    // update slider tools and events
    initTools();
    initEvents();
  }

  function initSheet () {
    // gallery:
    // set animation classes and left value for gallery slider
    if (!carousel) {
      for (var i = index, l = index + Math.min(slideCount, items); i < l; i++) {
        var item = slideItems[i];
        item.style.left = (i - index) * 100 / items + '%';
        addClass(item, animateIn);
        removeClass(item, animateNormal);
      }
    }

    // #### LAYOUT

    // ## INLINE-BLOCK VS FLOAT

    // ## PercentageLayout:
    // slides: inline-block
    // remove blank space between slides by set font-size: 0

    // ## Non PercentageLayout:
    // slides: float
    //         margin-right: -100%
    //         margin-left: ~

    // Resource: https://docs.google.com/spreadsheets/d/147up245wwTXeQYve3BRSAD4oVcvQmuGsFteJOeA5xNQ/edit?usp=sharing
    if (horizontal) {
      if (PERCENTAGELAYOUT || autoWidth) {
        addCSSRule(sheet, '#' + slideId + ' > .tns-item', 'font-size:' + win.getComputedStyle(slideItems[0]).fontSize + ';', getCssRulesLength(sheet));
        addCSSRule(sheet, '#' + slideId, 'font-size:0;', getCssRulesLength(sheet));
      } else if (carousel) {
        forEach(slideItems, function (slide, i) {
          slide.style.marginLeft = getSlideMarginLeft(i);
        });
      }
    }


    // ## BASIC STYLES
    if (CSSMQ) {
      // middle wrapper style
      if (TRANSITIONDURATION) {
        var str = middleWrapper && options.autoHeight ? getTransitionDurationStyle(options.speed) : '';
        addCSSRule(sheet, '#' + slideId + '-mw', str, getCssRulesLength(sheet));
      }

      // inner wrapper styles
      str = getInnerWrapperStyles(options.edgePadding, options.gutter, options.fixedWidth, options.speed, options.autoHeight);
      addCSSRule(sheet, '#' + slideId + '-iw', str, getCssRulesLength(sheet));

      // container styles
      if (carousel) {
        str = horizontal && !autoWidth ? 'width:' + getContainerWidth(options.fixedWidth, options.gutter, options.items) + ';' : '';
        if (TRANSITIONDURATION) { str += getTransitionDurationStyle(speed); }
        addCSSRule(sheet, '#' + slideId, str, getCssRulesLength(sheet));
      }

      // slide styles
      str = horizontal && !autoWidth ? getSlideWidthStyle(options.fixedWidth, options.gutter, options.items) : '';
      if (options.gutter) { str += getSlideGutterStyle(options.gutter); }
      // set gallery items transition-duration
      if (!carousel) {
        if (TRANSITIONDURATION) { str += getTransitionDurationStyle(speed); }
        if (ANIMATIONDURATION) { str += getAnimationDurationStyle(speed); }
      }
      if (str) { addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet)); }

    // non CSS mediaqueries: IE8
    // ## update inner wrapper, container, slides if needed
    // set inline styles for inner wrapper & container
    // insert stylesheet (one line) for slides only (since slides are many)
    } else {
      // middle wrapper styles
      update_carousel_transition_duration();

      // inner wrapper styles
      innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, autoHeight);

      // container styles
      if (carousel && horizontal && !autoWidth) {
        container.style.width = getContainerWidth(fixedWidth, gutter, items);
      }

      // slide styles
      var str = horizontal && !autoWidth ? getSlideWidthStyle(fixedWidth, gutter, items) : '';
      if (gutter) { str += getSlideGutterStyle(gutter); }

      // append to the last line
      if (str) { addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet)); }
    }

    // ## MEDIAQUERIES
    if (responsive && CSSMQ) {
      for (var bp in responsive) {
        // bp: convert string to number
        bp = parseInt(bp);

        var opts = responsive[bp],
            str = '',
            middleWrapperStr = '',
            innerWrapperStr = '',
            containerStr = '',
            slideStr = '',
            itemsBP = !autoWidth ? getOption('items', bp) : null,
            fixedWidthBP = getOption('fixedWidth', bp),
            speedBP = getOption('speed', bp),
            edgePaddingBP = getOption('edgePadding', bp),
            autoHeightBP = getOption('autoHeight', bp),
            gutterBP = getOption('gutter', bp);

        // middle wrapper string
        if (TRANSITIONDURATION && middleWrapper && getOption('autoHeight', bp) && 'speed' in opts) {
          middleWrapperStr = '#' + slideId + '-mw{' + getTransitionDurationStyle(speedBP) + '}';
        }

        // inner wrapper string
        if ('edgePadding' in opts || 'gutter' in opts) {
          innerWrapperStr = '#' + slideId + '-iw{' + getInnerWrapperStyles(edgePaddingBP, gutterBP, fixedWidthBP, speedBP, autoHeightBP) + '}';
        }

        // container string
        if (carousel && horizontal && !autoWidth && ('fixedWidth' in opts || 'items' in opts || (fixedWidth && 'gutter' in opts))) {
          containerStr = 'width:' + getContainerWidth(fixedWidthBP, gutterBP, itemsBP) + ';';
        }
        if (TRANSITIONDURATION && 'speed' in opts) {
          containerStr += getTransitionDurationStyle(speedBP);
        }
        if (containerStr) {
          containerStr = '#' + slideId + '{' + containerStr + '}';
        }

        // slide string
        if ('fixedWidth' in opts || (fixedWidth && 'gutter' in opts) || !carousel && 'items' in opts) {
          slideStr += getSlideWidthStyle(fixedWidthBP, gutterBP, itemsBP);
        }
        if ('gutter' in opts) {
          slideStr += getSlideGutterStyle(gutterBP);
        }
        // set gallery items transition-duration
        if (!carousel && 'speed' in opts) {
          if (TRANSITIONDURATION) { slideStr += getTransitionDurationStyle(speedBP); }
          if (ANIMATIONDURATION) { slideStr += getAnimationDurationStyle(speedBP); }
        }
        if (slideStr) { slideStr = '#' + slideId + ' > .tns-item{' + slideStr + '}'; }

        // add up
        str = middleWrapperStr + innerWrapperStr + containerStr + slideStr;

        if (str) {
          sheet.insertRule('@media (min-width: ' + bp / 16 + 'em) {' + str + '}', sheet.cssRules.length);
        }
      }
    }
  }

  function getString (key) {
    return L10N[locale][key];
  }
  
  function initTools () {
    updateSlideStatus();

    if (isAriaLiveRegion) {
      container.setAttribute('aria-atomic', 'false');
    }
    
    if (hasNav) {
      // customized nav
      // will not hide the navs in case they're thumbnails
      if (navContainer) {
        setAttrs(navContainer, {'aria-label': getString('PAGINATION')});
        navItems = navContainer.children;
        forEach(navItems, function(item, i) {
          setAttrs(item, {
            'data-nav': i,
            'tabindex': '-1',
            'aria-label': navStr + (i + 1),
            'aria-selected': 'false',
            'aria-controls': slideId,
          });
        });

      // generated nav
      }
      else {
        var navHtml = '',
            hiddenStr = navAsThumbnails ? '' : 'style="display:none"';
        for (var i = 0; i < slideCount; i++) {
          // hide nav items by default
          navHtml += '<button type="button" role="tab" aria-label="' + navStr + (i + 1) +'" aria-selected="false" aria-controls="' + slideId + '" ' + hiddenStr + ' tabindex="-1" data-nav="' + i +'"></button>';
        }
        navHtml = '<div class="tns-nav" role="tablist" aria-label="' + getString('PAGINATION') + '">' + navHtml + '</div>';
        // controllerWrapper.insertAdjacentHTML(getInsertPosition(options.navPosition), navHtml);
        controllerWrapper.insertAdjacentHTML("afterend", navHtml);
        
        navContainer = outerWrapper.querySelector('.tns-nav');
        navItems = navContainer.children;
      }

      updateNavVisibility();

      // add transition
      if (TRANSITIONDURATION) {
        var prefix = TRANSITIONDURATION.substring(0, TRANSITIONDURATION.length - 18).toLowerCase(),
            str = 'transition: all ' + speed / 1000 + 's';

        if (prefix) {
          str = '-' + prefix + '-' + str;
        }

        addCSSRule(sheet, '[aria-controls^=' + slideId + '-item]', str, getCssRulesLength(sheet));
      }

      setAttrs(navItems[navCurrentIndex], {'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent});
      removeAttrs(navItems[navCurrentIndex], 'tabindex');
      navItems[navCurrentIndex].setAttribute('aria-selected', 'true');

      // add events
      addEvents(navContainer, navEvents);
    }



    // == controlsInit ==
    if (hasControls) {
      if (!controlsContainer && (!prevButton || !nextButton)) {
        controllerWrapper.insertAdjacentHTML(getInsertPosition(options.controlsPosition), '<span class="tns-controls"><button class="tns-prev" data-controls="prev" aria-label="' + getString('PREVIOUS_PAGE') + '" aria-controls="' + slideId +'">' + controlsText[0] + '</button><button class="tns-next" data-controls="next" aria-label="' + getString('NEXT_PAGE') + '" aria-controls="' + slideId +'">' + controlsText[1] + '</button></span>');
        controlsContainer = outerWrapper.querySelector('.tns-controls');
      }

      if (!prevButton || !nextButton) {
        prevButton = controlsContainer.children[0];
        nextButton = controlsContainer.children[1];
      }

      if (options.controlsContainer) {
        setAttrs(controlsContainer, {
          'tabindex': '0'
        });
      }

      if (options.controlsContainer || (options.prevButton && options.nextButton)) {
        setAttrs([prevButton, nextButton], {
          'aria-controls': slideId,
          'tabindex': '-1',
        });
      }

      if (options.controlsContainer || (options.prevButton && options.nextButton)) {
        setAttrs(prevButton, {'data-controls' : 'prev'});
        setAttrs(nextButton, {'data-controls' : 'next'});
      }

      prevIsButton = isButton(prevButton);
      nextIsButton = isButton(nextButton);

      updateControlsStatus();

      // add events
      if (controlsContainer) {
        addEvents(controlsContainer, controlsEvents);
      } else {
        addEvents(prevButton, controlsEvents);
        addEvents(nextButton, controlsEvents);
      }
    }

    // == autoplayInit ==
    if (hasAutoplay) {
      if (autoplayUserPaused) {
        if (isAriaLiveRegion) {
          container.setAttribute('aria-live', 'polite');
        }
      }
      else {
        if (isAriaLiveRegion) {
          container.setAttribute('aria-live', 'off');
        }
      }
      
      if (autoplayButton) {
        setAttrs(autoplayButton, {
          'aria-label': autoplayUserPaused ? getString('START_AUTOPLAY') : getString('PAUSE_AUTOPLAY')

        });
      }
      else if (options.autoplayButtonOutput) {
        controllerWrapper.insertAdjacentHTML(getInsertPosition(options.autoplayPosition), '<button class="tns-autoplay" aria-label="' + (autoplayUserPaused ? getString('START_AUTOPLAY') : getString('PAUSE_AUTOPLAY')) + '"></button>');
        autoplayButton = outerWrapper.querySelector('.tns-autoplay');
      }

      // add event
      if (autoplayButton) {
        addEvents(autoplayButton, {
          'click': toggleAutoplay,
          'keydown': onControlsKeydown
          });
      }

      if (autoplay) {
        if (autoplayUserPaused) {
          stopAutoplay();
        }
        else {
          startAutoplay();
        }
        
        if (autoplayHoverPause) {
          addEvents(outerWrapper, hoverEvents);
        }
        if (autoplayResetOnVisibility) {
          addEvents(container, visibilityEvent);
        }
      }
    }
    else {
      if (isAriaLiveRegion) {
        container.setAttribute('aria-live', 'polite');
      }
    }

    // hide tools if needed
    disableUI();
  }

  function initEvents () {
    // add events
    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      addEvents(container, eve);
    }
    
    addEvents(outerWrapper, {
      'focusin': onContainedFocusChange,
      'focusout': onContainedFocusChange
      }
    );
    
    addEvents(innerWrapper, {
      'keydown': onInnerWrapperKeydown
    });
    
    // if user prefers reduced motion, set speed to 0 to effectively deactivate animation
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.addEventListener('change', e => {
      if (e.matches) {
        speed = 0;
      }
      else {
        speed = getOption('speed');
      }
    });
    
    if (touch) {
      addEvents(container, touchEvents, options.preventScrollOnTouch);
    }
    if (mouseDrag) {
      addEvents(container, dragEvents);
    }
    if (arrowKeys) {
      addEvents(outerWrapper, docmentKeydownEvent);
    }

    if (nested === 'inner') {
      events.on('outerResized', function () {
        resizeTasks();
        events.emit('innerLoaded', info());
      });
    }
    else if (responsive || fixedWidth || autoWidth || autoHeight || !horizontal) {
      addEvents(win, {'resize': onResize});
    }

    if (autoHeight) {
      if (nested === 'outer') {
        events.on('innerLoaded', doAutoHeight);
      }
      else if (!disable) {
        doAutoHeight();
      }
    }

    doLazyLoad();
    if (disable) {
      disableSlider();
    }
    else if (freeze) {
      freezeSlider();
    }

    events.on('indexChanged', additionalUpdates);
    if (nested === 'inner') {
      events.emit('innerLoaded', info());
    }
    if (typeof onInit === 'function') {
      onInit(info());
    }
    isOn = true;
  }

  function destroy () {
    // sheet
    sheet.disabled = true;
    if (sheet.ownerNode) { sheet.ownerNode.remove(); }

    // remove win event listeners
    removeEvents(win, {'resize': onResize});

    // arrowKeys, controls, nav
    if (arrowKeys) { removeEvents(container, docmentKeydownEvent); }
    if (controlsContainer) { removeEvents(controlsContainer, controlsEvents); }
    if (navContainer) { removeEvents(navContainer, navEvents); }

    // autoplay
    removeEvents(outerWrapper, hoverEvents);
    removeEvents(container, visibilityEvent);
    if (autoplayButton) {
      removeEvents(autoplayButton, {'click': toggleAutoplay});
    }
    if (autoplay) {
      clearInterval(autoplayTimer);
    }

    // container
    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      removeEvents(container, eve);
    }
    if (touch) {
      removeEvents(container, touchEvents);
    }
    if (mouseDrag) {
      removeEvents(container, dragEvents);
    }

    // cache Object values in options && reset HTML
    var htmlList = [containerHTML, controlsContainerHTML, prevButtonHTML, nextButtonHTML, navContainerHTML, autoplayButtonHTML];

    tnsList.forEach(function(item, i) {
      var el = item === 'container' ? outerWrapper : options[item];

      if (typeof el === 'object' && el) {
        var prevEl = el.previousElementSibling ? el.previousElementSibling : false,
            parentEl = el.parentNode;
        el.outerHTML = htmlList[i];
        options[item] = prevEl ? prevEl.nextElementSibling : parentEl.firstElementChild;
      }
    });


    // reset variables
    tnsList = animateIn = animateOut = animateDelay = animateNormal = horizontal = outerWrapper = innerWrapper = container = containerParent = containerHTML = slideItems = slideCount = breakpointZone = windowWidth = autoWidth = fixedWidth = edgePadding = gutter = viewport = items = slideBy = viewportMax = arrowKeys = speed = rewind = loop = autoHeight = sheet = lazyload = slidePositions = slideItemsOut = cloneCount = slideCountNew = hasRightDeadZone = rightBoundary = updateIndexBeforeTransform = transformAttr = transformPrefix = transformPostfix = getIndexMax = index = indexCached = indexMin = indexMax = swipeAngle = moveDirectionExpected = running = onInit = events = newContainerClasses = slideId = disable = disabled = freezable = freeze = frozen = controlsEvents = navEvents = hoverEvents = visibilityEvent = docmentKeydownEvent = touchEvents = dragEvents = hasControls = hasNav = navAsThumbnails = hasAutoplay = hasTouch = hasMouseDrag = slideActiveClass = imgCompleteClass = imgEvents = imgsComplete = controls = controlsText = controlsContainer = controlsContainerHTML = prevButton = nextButton = prevIsButton = nextIsButton = nav = navContainer = navContainerHTML = navItems = pages = pagesCached = navClicked = navCurrentIndex = navCurrentIndexCached = navStr = navStrCurrent = autoplay = autoplayTimeout = autoplayDirection = autoplayText = autoplayHoverPause = autoplayButton = autoplayButtonHTML = autoplayResetOnVisibility = autoplayTimer = animating = autoplayHoverPaused = autoplayUserPaused = autoplayVisibilityPaused = initPosition = lastPosition = translateInit = panStart = rafIndex = getDist = touch = mouseDrag = null;
    // check variables
    
    for (var a in this) {
      if (a !== 'rebuild') { this[a] = null; }
    }
    isOn = false;
  }

// === ON RESIZE ===
  // responsive || fixedWidth || autoWidth || !horizontal
  function onResize (e) {
    raf(function(){ resizeTasks(getEvent(e)); });
  }

  function resizeTasks (e) {
    if (!isOn) { return; }
    if (nested === 'outer') { events.emit('outerResized', info(e)); }
    windowWidth = getWindowWidth();
    var bpChanged,
        breakpointZoneTem = breakpointZone,
        needContainerTransform = false;

    if (responsive) {
      setBreakpointZone();
      bpChanged = breakpointZoneTem !== breakpointZone;
      if (bpChanged) { events.emit('newBreakpointStart', info(e)); }
    }

    var indChanged,
        itemsChanged,
        itemsTem = items,
        disableTem = disable,
        freezeTem = freeze,
        arrowKeysTem = arrowKeys,
        controlsTem = controls,
        navTem = nav,
        touchTem = touch,
        mouseDragTem = mouseDrag,
        autoplayTem = autoplay,
        autoplayHoverPauseTem = autoplayHoverPause,
        autoplayResetOnVisibilityTem = autoplayResetOnVisibility,
        indexTem = index;

    if (bpChanged) {
      var fixedWidthTem = fixedWidth,
          autoHeightTem = autoHeight,
          controlsTextTem = controlsText,
          centerTem = center,
          autoplayTextTem = autoplayText;

      if (!CSSMQ) {
        var gutterTem = gutter,
            edgePaddingTem = edgePadding;
      }
    }

    // get option:
    // fixed width: viewport, fixedWidth, gutter => items
    // others: window width => all variables
    // all: items => slideBy
    arrowKeys = getOption('arrowKeys');
    controls = getOption('controls');
    nav = getOption('nav');
    touch = getOption('touch');
    center = getOption('center');
    mouseDrag = getOption('mouseDrag');
    autoplay = getOption('autoplay');
    autoplayHoverPause = getOption('autoplayHoverPause');
    autoplayResetOnVisibility = getOption('autoplayResetOnVisibility');

    if (bpChanged) {
      disable = getOption('disable');
      fixedWidth = getOption('fixedWidth');
      speed = getOption('speed');
      autoHeight = getOption('autoHeight');
      controlsText = getOption('controlsText');
      autoplayText = getOption('autoplayText');
      autoplayTimeout = getOption('autoplayTimeout');

      if (!CSSMQ) {
        edgePadding = getOption('edgePadding');
        gutter = getOption('gutter');
      }
    }
    // update options
    resetVariblesWhenDisable(disable);

    viewport = getViewportWidth(); // <= edgePadding, gutter
    if ((!horizontal || autoWidth) && !disable) {
      setSlidePositions();
      if (!horizontal) {
        updateContentWrapperHeight(); // <= setSlidePositions
        needContainerTransform = true;
      }
    }
    if (fixedWidth || autoWidth) {
      rightBoundary = getRightBoundary(); // autoWidth: <= viewport, slidePositions, gutter
                                          // fixedWidth: <= viewport, fixedWidth, gutter
      indexMax = getIndexMax(); // autoWidth: <= rightBoundary, slidePositions
                                // fixedWidth: <= rightBoundary, fixedWidth, gutter
    }

    if (bpChanged || fixedWidth) {
      items = getOption('items');
      slideBy = getOption('slideBy');
      itemsChanged = items !== itemsTem;

      if (itemsChanged) {
        if (!fixedWidth && !autoWidth) { indexMax = getIndexMax(); } // <= items
        // check index before transform in case
        // slider reach the right edge then items become bigger
        updateIndex();
      }
    }

    if (bpChanged) {
      if (disable !== disableTem) {
        if (disable) {
          disableSlider();
        } else {
          enableSlider(); // <= slidePositions, rightBoundary, indexMax
        }
      }
    }

    if (freezable && (bpChanged || fixedWidth || autoWidth)) {
      freeze = getFreeze(); // <= autoWidth: slidePositions, gutter, viewport, rightBoundary
                            // <= fixedWidth: fixedWidth, gutter, rightBoundary
                            // <= others: items

      if (freeze !== freezeTem) {
        if (freeze) {
          doContainerTransform(getContainerTransformValue(getStartIndex(0)));
          freezeSlider();
        } else {
          unfreezeSlider();
          needContainerTransform = true;
        }
      }
    }

    resetVariblesWhenDisable(disable || freeze); // controls, nav, touch, mouseDrag, arrowKeys, autoplay, autoplayHoverPause, autoplayResetOnVisibility
    if (!autoplay) {
      autoplayHoverPause = autoplayResetOnVisibility = false;
    }

    if (arrowKeys !== arrowKeysTem) {
      arrowKeys ?
        addEvents(container, docmentKeydownEvent) :
        removeEvents(container, docmentKeydownEvent);
    }
    if (controls !== controlsTem) {
      if (controls) {
        if (controlsContainer) {
          showElement(controlsContainer);
        }
        else {
          if (prevButton) {
            showElement(prevButton);
          }
          if (nextButton) {
            showElement(nextButton);
          }
        }
      }
      else {
        if (controlsContainer) {
          hideElement(controlsContainer);
        }
        else {
          if (prevButton) {
            hideElement(prevButton);
          }
          if (nextButton) {
            hideElement(nextButton);
          }
        }
      }
    }
    if (nav !== navTem) {
      nav ?
        showElement(navContainer) :
        hideElement(navContainer);
    }
    if (touch !== touchTem) {
      touch ?
        addEvents(container, touchEvents, options.preventScrollOnTouch) :
        removeEvents(container, touchEvents);
    }
    if (mouseDrag !== mouseDragTem) {
      mouseDrag ?
        addEvents(container, dragEvents) :
        removeEvents(container, dragEvents);
    }
    if (autoplay !== autoplayTem) {
      if (autoplay) {
        if (autoplayButton) {
          showElement(autoplayButton);
        }
        if (!animating && !autoplayUserPaused) {
          startAutoplay();
        }
      }
      else {
        if (autoplayButton) {
          hideElement(autoplayButton);
        }
        if (animating) {
          stopAutoplay();
        }
      }
    }
    if (autoplayHoverPause !== autoplayHoverPauseTem) {
      autoplayHoverPause ? addEvents(outerWrapper, hoverEvents) : removeEvents(outerWrapper, hoverEvents);
    }
    if (autoplayResetOnVisibility !== autoplayResetOnVisibilityTem) {
      autoplayResetOnVisibility ?
        addEvents(doc, visibilityEvent) :
        removeEvents(doc, visibilityEvent);
    }

    if (bpChanged) {
      if (fixedWidth !== fixedWidthTem || center !== centerTem) { needContainerTransform = true; }

      if (autoHeight !== autoHeightTem) {
        if (!autoHeight) { innerWrapper.style.height = ''; }
      }

      if (controls && controlsText !== controlsTextTem) {
        prevButton.innerHTML = controlsText[0];
        nextButton.innerHTML = controlsText[1];
      }

      if (autoplayButton && autoplayText !== autoplayTextTem) {
        var i = autoplay ? 1 : 0,
            html = autoplayButton.innerHTML,
            len = html.length - autoplayTextTem[i].length;
        if (html.substring(len) === autoplayTextTem[i]) {
          autoplayButton.innerHTML = html.substring(0, len) + autoplayText[i];
        }
      }
    } else {
      if (center && (fixedWidth || autoWidth)) { needContainerTransform = true; }
    }

    if (itemsChanged || fixedWidth && !autoWidth) {
      pages = getPages();
      updateNavVisibility();
    }

    indChanged = index !== indexTem;
    if (indChanged) {
      events.emit('indexChanged', info());
      needContainerTransform = true;
    } else if (itemsChanged) {
      if (!indChanged) { additionalUpdates(); }
    } else if (fixedWidth || autoWidth) {
      doLazyLoad();
      updateSlideStatus();
    }

    if (itemsChanged && !carousel) { updateGallerySlidePositions(); }

    if (!disable && !freeze) {
      // non-mediaqueries: IE8
      if (bpChanged && !CSSMQ) {
        // middle wrapper styles

        // inner wrapper styles
        if (edgePadding !== edgePaddingTem || gutter !== gutterTem) {
          innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, speed, autoHeight);
        }

        if (horizontal) {
          // container styles
          if (carousel) {
            container.style.width = getContainerWidth(fixedWidth, gutter, items);
          }

          // slide styles
          var str = getSlideWidthStyle(fixedWidth, gutter, items) +
                    getSlideGutterStyle(gutter);

          // remove the last line and
          // add new styles
          removeCSSRule(sheet, getCssRulesLength(sheet) - 1);
          addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet));
        }
      }

      // auto height
      if (autoHeight) { doAutoHeight(); }

      if (needContainerTransform) {
        doContainerTransformSilent();
        indexCached = index;
      }
    }

    if (bpChanged) { events.emit('newBreakpointEnd', info(e)); }
  }


  // === INITIALIZATION FUNCTIONS === //
  function getFreeze () {
    if (!fixedWidth && !autoWidth) {
      var a = center ? items - (items - 1) / 2 : items;
      return  slideCount <= a;
    }

    var width = fixedWidth ? (fixedWidth + gutter) * slideCount : slidePositions[slideCount],
        vp = edgePadding ? viewport + edgePadding * 2 : viewport + gutter;

    if (center) {
      vp -= fixedWidth ? (viewport - fixedWidth) / 2 : (viewport - (slidePositions[index + 1] - slidePositions[index] - gutter)) / 2;
    }

    return width <= vp;
  }

  function setBreakpointZone () {
    breakpointZone = 0;
    for (var bp in responsive) {
      bp = parseInt(bp); // convert string to number
      if (windowWidth >= bp) { breakpointZone = bp; }
    }
  }

  // (slideBy, indexMin, indexMax) => index
  var updateIndex = (function () {
    return loop ?
      carousel ?
        // loop + carousel
        function () {
          var leftEdge = indexMin,
              rightEdge = indexMax;

          leftEdge += slideBy;
          rightEdge -= slideBy;

          // adjust edges when has edge paddings
          // or fixed-width slider with extra space on the right side
          if (edgePadding) {
            leftEdge += 1;
            rightEdge -= 1;
          }
          else if (fixedWidth) {
            if ((viewport + gutter)%(fixedWidth + gutter)) {
              rightEdge -= 1;
            }
          }

          if (cloneCount) {
            if (index > rightEdge) {
              index -= slideCount;
            }
            else if (index < leftEdge) {
              index += slideCount;
            }
          }
        } :
        // loop + gallery
        function() {
          if (index > indexMax) {
            while (index >= indexMin + slideCount) {
              index -= slideCount;
            }
          }
          else if (index < indexMin) {
            while (index <= indexMax - slideCount) {
              index += slideCount;
            }
          }
        } :
      // non-loop
      function() {
        index = Math.max(indexMin, Math.min(indexMax, index));
      };
  })();

  function disableUI () {
    if (!autoplay && autoplayButton) { hideElement(autoplayButton); }
    if (!nav && navContainer) { hideElement(navContainer); }
    if (!controls) {
      if (controlsContainer) {
        hideElement(controlsContainer);
      } else {
        if (prevButton) { hideElement(prevButton); }
        if (nextButton) { hideElement(nextButton); }
      }
    }
  }

  function enableUI () {
    if (autoplay && autoplayButton) { showElement(autoplayButton); }
    if (nav && navContainer) { showElement(navContainer); }
    if (controls) {
      if (controlsContainer) {
        showElement(controlsContainer);
      } else {
        if (prevButton) { showElement(prevButton); }
        if (nextButton) { showElement(nextButton); }
      }
    }
  }

  function freezeSlider () {
    if (frozen) { return; }

    // remove edge padding from inner wrapper
    if (edgePadding) { innerWrapper.style.margin = '0px'; }

    // add class tns-transparent to cloned slides
    if (cloneCount) {
      var str = 'tns-transparent';
      for (var i = cloneCount; i--;) {
        if (carousel) { addClass(slideItems[i], str); }
        addClass(slideItems[slideCountNew - i - 1], str);
      }
    }

    // update tools
    disableUI();

    frozen = true;
  }

  function unfreezeSlider () {
    if (!frozen) { return; }

    // restore edge padding for inner wrapper
    // for mordern browsers
    if (edgePadding && CSSMQ) { innerWrapper.style.margin = ''; }

    // remove class tns-transparent to cloned slides
    if (cloneCount) {
      var str = 'tns-transparent';
      for (var i = cloneCount; i--;) {
        if (carousel) { removeClass(slideItems[i], str); }
        removeClass(slideItems[slideCountNew - i - 1], str);
      }
    }

    // update tools
    enableUI();

    frozen = false;
  }

  function disableSlider () {
    if (disabled) { return; }

    sheet.disabled = true;
    container.className = container.className.replace(newContainerClasses.substring(1), '');
    removeAttrs(container, ['style']);
    if (loop) {
      for (var j = cloneCount; j--;) {
        if (carousel) { hideElement(slideItems[j]); }
        hideElement(slideItems[slideCountNew - j - 1]);
      }
    }

    // vertical slider
    if (!horizontal || !carousel) { removeAttrs(innerWrapper, ['style']); }

    // gallery
    if (!carousel) {
      for (var i = index, l = index + slideCount; i < l; i++) {
        var item = slideItems[i];
        removeAttrs(item, ['style']);
        removeClass(item, animateIn);
        removeClass(item, animateNormal);
      }
    }

    // update tools
    disableUI();

    disabled = true;
  }

  function enableSlider () {
    if (!disabled) { return; }

    sheet.disabled = false;
    container.className += newContainerClasses;
    doContainerTransformSilent();

    if (loop) {
      for (var j = cloneCount; j--;) {
        if (carousel) { showElement(slideItems[j]); }
        showElement(slideItems[slideCountNew - j - 1]);
      }
    }

    // gallery
    if (!carousel) {
      for (var i = index, l = index + slideCount; i < l; i++) {
        var item = slideItems[i],
            classN = i < index + items ? animateIn : animateNormal;
        item.style.left = (i - index) * 100 / items + '%';
        addClass(item, classN);
      }
    }

    // update tools
    enableUI();

    disabled = false;
  }

  function getVisibleSlideRange (val) {
    if (val == null) {
      val = getContainerTransformValue();
    }
    var start = index, end, rangestart, rangeend;

    // get range start, range end for autoWidth and fixedWidth
    if (center || edgePadding) {
      if (autoWidth || fixedWidth) {
        rangestart = - (parseFloat(val) + edgePadding);
        rangeend = rangestart + viewport + edgePadding * 2;
      }
    } else {
      if (autoWidth) {
        rangestart = slidePositions[index];
        rangeend = rangestart + viewport;
      }
    }

    // get start, end
    // - check auto width
    if (autoWidth) {
      slidePositions.forEach(function(point, i) {
        if (i < slideCountNew) {
          if ((center || edgePadding) && point <= rangestart + 0.5) { start = i; }
          if (rangeend - point >= 0.5) { end = i; }
        }
      });

    // - check percentage width, fixed width
    } else {

      if (fixedWidth) {
        var cell = fixedWidth + gutter;
        if (center || edgePadding) {
          start = Math.floor(rangestart/cell);
          end = Math.ceil(rangeend/cell - 1);
        } else {
          end = start + Math.ceil(viewport/cell) - 1;
        }

      } else {
        if (center || edgePadding) {
          var a = items - 1;
          if (center) {
            start -= a / 2;
            end = index + a / 2;
          } else {
            end = index + a;
          }

          if (edgePadding) {
            var b = edgePadding * items / viewport;
            start -= b;
            end += b;
          }

          start = Math.floor(start);
          end = Math.ceil(end);
        } else {
          end = start + items - 1;
        }
      }

      start = Math.max(start, 0);
      end = Math.min(end, slideCountNew - 1);
    }

    return [start, end];
  }

  function doLazyLoad () {
    if (lazyload && !disable) {
      var arg = getVisibleSlideRange();
      arg.push(lazyloadSelector);

      getImageArray.apply(null, arg).forEach(function (img) {
        if (!hasClass(img, imgCompleteClass)) {
          // stop propagation transitionend event to container
          var eve = {};
          eve[TRANSITIONEND] = function (e) { e.stopPropagation(); };
          addEvents(img, eve);

          addEvents(img, imgEvents);

          // update src
          img.src = getAttr(img, 'data-src');

          // update srcset
          var srcset = getAttr(img, 'data-srcset');
          if (srcset) { img.srcset = srcset; }

          addClass(img, 'loading');
        }
      });
    }
  }

  function onImgLoaded (e) {
    imgLoaded(getTarget(e));
  }

  function onImgFailed (e) {
    imgFailed(getTarget(e));
  }

  function imgLoaded (img) {
    addClass(img, 'loaded');
    imgCompleted(img);
  }

  function imgFailed (img) {
    addClass(img, 'failed');
    imgCompleted(img);
  }

  function imgCompleted (img) {
    addClass(img, imgCompleteClass);
    removeClass(img, 'loading');
    removeEvents(img, imgEvents);
  }

  function getImageArray (start, end, imgSelector) {
    var imgs = [];
    if (!imgSelector) { imgSelector = 'img'; }

    while (start <= end) {
      forEach(slideItems[start].querySelectorAll(imgSelector), function (img) { imgs.push(img); });
      start++;
    }

    return imgs;
  }

  // check if all visible images are loaded
  // and update container height if it's done
  function doAutoHeight () {
    var imgs = getImageArray.apply(null, getVisibleSlideRange());
    raf(function(){ imgsLoadedCheck(imgs, updateInnerWrapperHeight); });
  }

  function imgsLoadedCheck (imgs, cb) {
    // execute callback function if all images are complete
    if (imgsComplete) { return cb(); }

    // check image classes
    imgs.forEach(function (img, index) {
      if (!lazyload && img.complete) { imgCompleted(img); } // Check image.complete
      if (hasClass(img, imgCompleteClass)) { imgs.splice(index, 1); }
    });

    // execute callback function if selected images are all complete
    if (!imgs.length) { return cb(); }

    // otherwise execute this functiona again
    raf(function(){ imgsLoadedCheck(imgs, cb); });
  }

  function additionalUpdates () {
    doLazyLoad();
    updateSlideStatus();
    updateControlsStatus();
    updateNavStatus();
  }


  function update_carousel_transition_duration () {
    if (carousel && autoHeight) {
      middleWrapper.style[TRANSITIONDURATION] = speed / 1000 + 's';
    }
  }

  function getMaxSlideHeight (slideStart, slideRange) {
    var heights = [];
    for (var i = slideStart, l = Math.min(slideStart + slideRange, slideCountNew); i < l; i++) {
      heights.push(slideItems[i].offsetHeight);
    }

    return Math.max.apply(null, heights);
  }

  // update inner wrapper height
  // 1. get the max-height of the visible slides
  // 2. set transitionDuration to speed
  // 3. update inner wrapper height to max-height
  // 4. set transitionDuration to 0s after transition done
  function updateInnerWrapperHeight () {
    var maxHeight = autoHeight ? getMaxSlideHeight(index, items) : getMaxSlideHeight(cloneCount, slideCount),
        wp = middleWrapper ? middleWrapper : innerWrapper;

    if (wp.style.height !== maxHeight) { wp.style.height = maxHeight + 'px'; }
  }

  // get the distance from the top edge of the first slide to each slide
  // (init) => slidePositions
  function setSlidePositions () {
    slidePositions = [0];
    var attr = horizontal ? 'left' : 'top',
        attr2 = horizontal ? 'right' : 'bottom',
        base = slideItems[0].getBoundingClientRect()[attr];

    forEach(slideItems, function(item, i) {
      // skip the first slide
      if (i) { slidePositions.push(item.getBoundingClientRect()[attr] - base); }
      // add the end edge
      if (i === slideCountNew - 1) { slidePositions.push(item.getBoundingClientRect()[attr2] - base); }
    });
  }

  // update slide
  function updateSlideStatus () {
    var range = getVisibleSlideRange(),
        start = range[0],
        end = range[1];

    forEach(slideItems, function(item, i) {
      if (i >= start && i <= end) {
        // show slides
        addClass(item, slideActiveClass);
        setAttrs(item, { 'tabindex': '0' });
        if (isAriaLiveRegion) {
          item.removeAttribute('aria-hidden');
        }
      }
      else {
        // hide slides
        removeClass(item, slideActiveClass);
        setAttrs(item, { 'tabindex': '-1' });
        if (isAriaLiveRegion) {
          item.setAttribute('aria-hidden', 'true');
        }
      }
    });
  }

  // gallery: update slide position
  function updateGallerySlidePositions () {
    var l = index + Math.min(slideCount, items);
    for (var i = slideCountNew; i--;) {
      var item = slideItems[i];

      if (i >= index && i < l) {
        // add transitions to visible slides when adjusting their positions
        addClass(item, 'tns-moving');

        item.style.left = (i - index) * 100 / items + '%';
        addClass(item, animateIn);
        removeClass(item, animateNormal);
      } else if (item.style.left) {
        item.style.left = '';
        addClass(item, animateNormal);
        removeClass(item, animateIn);
      }

      // remove outlet animation
      removeClass(item, animateOut);
    }

    // removing '.tns-moving'
    setTimeout(function() {
      forEach(slideItems, function(el) {
        removeClass(el, 'tns-moving');
      });
    }, 300);
  }

  // set tabindex on Nav
  function updateNavStatus () {
    // get current nav
    if (nav) {
      navCurrentIndex = navClicked >= 0 ? navClicked : getCurrentNavIndex();
      navClicked = -1;

      if (navCurrentIndex !== navCurrentIndexCached) {
        var navPrev = navItems[navCurrentIndexCached],
            navCurrent = navItems[navCurrentIndex];

        setAttrs(navPrev, {
          'tabindex': '-1',
          'aria-label': navStr + (navCurrentIndexCached + 1)
        });
        navPrev.setAttribute('aria-selected', 'false');

        setAttrs(navCurrent, {'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent});
        removeAttrs(navCurrent, 'tabindex');
        navCurrent.setAttribute('aria-selected', 'true');
        
        navCurrentIndexCached = navCurrentIndex;
      }
    }
  }

  function getLowerCaseNodeName (el) {
    return el.nodeName.toLowerCase();
  }

  function isButton (el) {
    return getLowerCaseNodeName(el) === 'button';
  }

  function isAriaDisabled (el) {
    return el.getAttribute('aria-disabled') === 'true';
  }

  function disEnableElement (isButton, el, val) {
    if (isButton) {
      el.disabled = val;
    }
    else {
      el.setAttribute('aria-disabled', val.toString());
    }
  }

  // set 'disabled' to true on controls when reach the edges
  function updateControlsStatus () {
    if (!controls || rewind || loop) { return; }

    var prevDisabled = (prevIsButton) ? prevButton.disabled : isAriaDisabled(prevButton),
        nextDisabled = (nextIsButton) ? nextButton.disabled : isAriaDisabled(nextButton),
        disablePrev = (index <= indexMin) ? true : false,
        disableNext = (!rewind && index >= indexMax) ? true : false;

    if (disablePrev && !prevDisabled) {
      disEnableElement(prevIsButton, prevButton, true);
    }
    if (!disablePrev && prevDisabled) {
      disEnableElement(prevIsButton, prevButton, false);
    }
    if (disableNext && !nextDisabled) {
      disEnableElement(nextIsButton, nextButton, true);
    }
    if (!disableNext && nextDisabled) {
      disEnableElement(nextIsButton, nextButton, false);
    }
  }

  // set duration
  function resetDuration (el, str) {
    if (TRANSITIONDURATION) { el.style[TRANSITIONDURATION] = str; }
  }

  function getSliderWidth () {
    return fixedWidth ? (fixedWidth + gutter) * slideCountNew : slidePositions[slideCountNew];
  }

  function getCenterGap (num) {
    if (num == null) { num = index; }

    var gap = edgePadding ? gutter : 0;
    return autoWidth ? ((viewport - gap) - (slidePositions[num + 1] - slidePositions[num] - gutter))/2 :
      fixedWidth ? (viewport - fixedWidth) / 2 :
        (items - 1) / 2;
  }

  function getRightBoundary () {
    var gap = edgePadding ? gutter : 0,
        result = (viewport + gap) - getSliderWidth();

    if (center && !loop) {
      result = fixedWidth ? - (fixedWidth + gutter) * (slideCountNew - 1) - getCenterGap() :
        getCenterGap(slideCountNew - 1) - slidePositions[slideCountNew - 1];
    }
    if (result > 0) { result = 0; }

    return result;
  }

  function getContainerTransformValue (num) {
    if (num == null) {
      num = index;
    }

    var val;
    if (horizontal && !autoWidth) {
      if (fixedWidth) {
        val = - (fixedWidth + gutter) * num;
        if (center) {
          val += getCenterGap();
        }
      }
      else {
        var denominator = TRANSFORM ? slideCountNew : items;
        if (center) {
          num -= getCenterGap();
        }
        val = - num * 100 / denominator;
      }
    }
    else {
      val = - slidePositions[num];
      if (center && autoWidth) {
        val += getCenterGap();
      }
    }

    if (hasRightDeadZone) {
      val = Math.max(val, rightBoundary);
    }

    val += (horizontal && !autoWidth && !fixedWidth) ? '%' : 'px';

    return val;
  }

  function doContainerTransformSilent (val) {
    resetDuration(container, '0s');
    doContainerTransform(val);
  }

  function doContainerTransform (val) {
    if (val == null) {
      val = getContainerTransformValue();
    }
    container.style[transformAttr] = transformPrefix + val + transformPostfix;
  }

  function animateSlide (number, classOut, classIn, isOut) {
    var l = number + items;
    if (!loop) {
      l = Math.min(l, slideCountNew);
    }

    for (var i = number; i < l; i++) {
      var item = slideItems[i];

      // set item positions
      if (!isOut) {
        item.style.left = (i - index) * 100 / items + '%';
      }

      if (animateDelay && TRANSITIONDELAY) {
        item.style[TRANSITIONDELAY] = item.style[ANIMATIONDELAY] = animateDelay * (i - number) / 1000 + 's';
      }
      removeClass(item, classOut);
      addClass(item, classIn);

      if (isOut) {
        slideItemsOut.push(item);
      }
    }
  }

  // make transfer after click/drag:
  // 1. change 'transform' property for mordern browsers
  // 2. change 'left' property for legacy browsers
  var transformCore = (function () {
    return carousel ?
      function () {
        resetDuration(container, '');
        if (TRANSITIONDURATION || !speed) {
          // for morden browsers with non-zero duration or
          // zero duration for all browsers
          doContainerTransform();
          // run fallback function manually
          // when duration is 0 / container is hidden
          if (!speed || !isVisible(container)) {
            onTransitionEnd();
          }
        }
        else {
          // for old browser with non-zero duration
          jsTransform(container, transformAttr, transformPrefix, transformPostfix, getContainerTransformValue(), speed, onTransitionEnd);
        }

        if (!horizontal) {
          updateContentWrapperHeight();
        }
      } :
      function () {
        slideItemsOut = [];

        var eve = {};
        eve[TRANSITIONEND] = eve[ANIMATIONEND] = onTransitionEnd;
        removeEvents(slideItems[indexCached], eve);
        addEvents(slideItems[index], eve);

        animateSlide(indexCached, animateIn, animateOut, true);
        animateSlide(index, animateNormal, animateIn);

        // run fallback function manually
        // when transition or animation not supported / duration is 0
        if (!TRANSITIONEND || !ANIMATIONEND || !speed || !isVisible(container)) {
          onTransitionEnd();
        }
      };
  })();

  function render (e, sliderMoved) {
    // container.setAttribute('aria-busy', 'true');
    if (updateIndexBeforeTransform) {
      updateIndex();
    }

    // render when slider was moved (touch or drag) even though index may not change
    if (index !== indexCached || sliderMoved) {
      // events
      events.emit('indexChanged', info());
      events.emit('transitionStart', info());
      if (autoHeight) {
        doAutoHeight();
      }

      // pause autoplay when click or keydown from user
      if (animating && e && ['click', 'keydown'].indexOf(e.type) >= 0) {
        stopAutoplay();
      }

      running = true;
      
      // BEGIN MARKER carousel aria-live shenanigans
      // console.log("clearing potentially waiting ariaLiveTimeouts", ariaLiveTimeouts);
      ariaLiveTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
      ariaLiveTimeouts.length = 0; // emptying array
      
      if (isAriaLiveRegion) {
        container.setAttribute("aria-busy", "true");
      }
      
      container.classList.add('tns-animating');
      // adding .tns-animating results in all slide/tile elements getting "visibility: visible",
      // this would all theses elements to the accessibility tree, confusing screenreaders, therefore
      // setting aria-busy="true" while animation is going on.
      // the CSS visibility state of slides/tiles has to be carefully handled in conjunction with the
      // container's aria-live and aria-busy states. visiblity state is important for animation (visible)
      // and not tabbing into inactive tiles (hidden).
      //
      // END MARKER carousel aria-live shenanigans

      transformCore();
    }
  }

  /*
   * Transfer prefixed properties to the same format
   * CSS: -Webkit-Transform => webkittransform
   * JS: WebkitTransform => webkittransform
   * @param {string} str - property
   *
   */
  function strTrans (str) {
    return str.toLowerCase().replace(/-/g, '');
  }
  
  function onContainedFocusChange(event) {
    const thisContainer = this;
    const eventType = event.type;
    event.target;
    
    if ('focusin' === eventType) {
      const previouslyFocusedElement = event.relatedTarget;
      const wasFocusPreviouslyAlreadyInsideContainer = thisContainer.contains(previouslyFocusedElement);
      if (wasFocusPreviouslyAlreadyInsideContainer) ;
      else {
        mouseoverPause();
      }
    }
    else if ('focusout' === eventType) {
      const newlyFocusedElement = event.relatedTarget;
      const isFocusStillInsideContainer = thisContainer.contains(newlyFocusedElement);
      if (isFocusStillInsideContainer) ;
      else {
        mouseoutRestart();
      }
    }
  }
  // AFTER TRANSFORM
  // Things need to be done after a transfer:
  // 1. check index
  // 2. add classes to visible slide
  // 3. disable controls buttons when reach the first/last slide in non-loop slider
  // 4. update nav status
  // 5. lazyload images
  // 6. update container height
  function onTransitionEnd (event) {
    // check running on gallery mode
    // make sure trantionend/animationend events run only once
    if (carousel || running) {
      events.emit('transitionEnd', info(event));
      container.classList.remove('tns-animating');

      if (!carousel && slideItemsOut.length > 0) {
        for (var i = 0; i < slideItemsOut.length; i++) {
          var item = slideItemsOut[i];
          // set item positions
          item.style.left = '';

          if (ANIMATIONDELAY && TRANSITIONDELAY) {
            item.style[ANIMATIONDELAY] = '';
            item.style[TRANSITIONDELAY] = '';
          }
          removeClass(item, animateOut);
          addClass(item, animateNormal);
        }
      }

      /* update slides, nav, controls after checking ...
       * => legacy browsers who don't support 'event'
       *    have to check event first, otherwise event.target will cause an error
       * => or 'gallery' mode:
       *   + event target is slide item
       * => or 'carousel' mode:
       *   + event target is container,
       *   + event.property is the same with transform attribute
       */
      if (!event ||
          !carousel && event.target.parentNode === container ||
          event.target === container && strTrans(event.propertyName) === strTrans(transformAttr)) {
        if (!updateIndexBeforeTransform) {
          var indexTem = index;
          updateIndex();
          if (index !== indexTem) {
            events.emit('indexChanged', info());

            doContainerTransformSilent();
          }
        }

        if (nested === 'inner') {
          events.emit('innerLoaded', info());
        }
        
        running = false;
        indexCached = index;
      }
    }
    
    if (isAriaLiveRegion) {
      // BEGIN MARKER carousel aria-live shenanigans
      // aria-live has weird behavior, at least in Chrome 102 with NVDA 2022.1:
      // * first and last slides (which may contain one or more tiles) are NOT aria-live-anounced
      //   when there is animation (prefers-reduced-motion and speed == 0 result in no animation;
      //   dragging-touching-panning always has animation). All other slides/tiles in between are
      //   announced.
      // * there is some concurrency going on with respect to container aria-busy, container aria-live,
      //   and descendent accessibility tree visibility (i.e. slide/tile screenreader visibility
      //   stemming from CSS .tns-animating "visibility: visible" and aria-hidden="true" toggling).
      //   Adding empirically determined minimum delays between these state changes seems to be the
      //   only way of getting satisfactory results.
      ariaLiveTimeouts.push( setTimeout(() => {
        const activeSlides = container.getElementsByClassName('tns-slide-active');
        for (const activeSlide of activeSlides) {
          activeSlide.setAttribute('aria-hidden', 'true');
        }
        ariaLiveTimeouts.push( setTimeout(() => {
          container.setAttribute("aria-busy", "false");
          ariaLiveTimeouts.push( setTimeout(() => {
            // for weird reasons, at least Chrome 102 with NVDA 2022.1 aria-live-announces
            // multi-tile slides in nondeterministic order iff there is not a minimum delay
            // between adding each consecutive tile to the accessibility tree. Therefore
            // the following setTimeout loop takes care of adding tiles in sequencial order
            var someDelay = 0;
            for (const activeSlide of activeSlides) {
              someDelay = someDelay + 200;
              ariaLiveTimeouts.push( setTimeout(() => {
                activeSlide.removeAttribute('aria-hidden');
              }, someDelay) );
            }
          }, 100) );
        }, 100) );
      }, 100) );
      // END MARKER carousel aria-live shenanigans
    }
    
  }

  // # ACTIONS
  function goTo (targetIndex, e) {
    if (freeze) {
      return;
    }

    // prev slideBy
    if (targetIndex === 'prev') {
      onControlsClick(e, -1);

    // next slideBy
    }
    else if (targetIndex === 'next') {
      onControlsClick(e, 1);
    
    }
    else { // go to exact slide
      if (running) {
        if (preventActionWhenRunning) {
          return;
        }
        else {
          onTransitionEnd();
        }
      }

      var absIndex = getAbsIndex(),
          indexGap = 0;

      if (targetIndex === 'first') {
        indexGap = - absIndex;
      }
      else if (targetIndex === 'last') {
        indexGap = carousel ? slideCount - items - absIndex : slideCount - 1 - absIndex;
      }
      else {
        if (typeof targetIndex !== 'number') {
          targetIndex = parseInt(targetIndex);
        }

        if (!isNaN(targetIndex)) {
          // from directly called goTo function
          if (!e) {
            targetIndex = Math.max(0, Math.min(slideCount - 1, targetIndex));
          }

          indexGap = targetIndex - absIndex;
        }
      }

      // gallery: make sure new page won't overlap with current page
      if (!carousel && indexGap && Math.abs(indexGap) < items) {
        var factor = indexGap > 0 ? 1 : -1;
        indexGap += (index + indexGap - slideCount) >= indexMin ? slideCount * factor : slideCount * 2 * factor * -1;
      }

      index += indexGap;

      // make sure index is in range
      if (carousel && loop) {
        if (index < indexMin) {
          index += slideCount;
        }
        if (index > indexMax) {
          index -= slideCount;
        }
      }

      // if index is changed, start rendering
      if (getAbsIndex(index) !== getAbsIndex(indexCached)) {
        render(e);
      }

    }
  }

  function onPrevNextClick (e, dir) {
    pause();
    autoplayUserPaused = true;
    stopAutoplay();
    onControlsClick(e,dir);
  }
  
  // on controls click - badly named because it is triggered not only by user click, but also by automatisms
  function onControlsClick (e, dir) {
    if (running) {
      if (preventActionWhenRunning) {
        return;
      }
      else {
        onTransitionEnd();
      }
    }
    var passEventObject;
    if (!dir) {
      e = getEvent(e);
      var target = getTarget(e);

      while (target !== controlsContainer && [prevButton, nextButton].indexOf(target) < 0) { target = target.parentNode; }

      var targetIn = [prevButton, nextButton].indexOf(target);
      if (targetIn >= 0) {
        passEventObject = true;
        dir = targetIn === 0 ? -1 : 1;
      }
    }

    if (rewind) {
      if (index === indexMin && dir === -1) {
        goTo('last', e);
        return;
      } else if (index === indexMax && dir === 1) {
        goTo('first', e);
        return;
      }
    }

    if (dir) {
      index += slideBy * dir;
      if (autoWidth) { index = Math.floor(index); }
      // pass e when click control buttons or keydown
      render((passEventObject || (e && e.type === 'keydown')) ? e : null);
    }
  }

  // on nav click
  function onNavClick (e) {
    pause();
    autoplayUserPaused = true;
    stopAutoplay();
    if (running) {
      if (preventActionWhenRunning) {
        return;
      }
      else {
        onTransitionEnd();
      }
    }

    e = getEvent(e);
    var target = getTarget(e), navIndex;

    // find the clicked nav item
    while (target !== navContainer && !hasAttr(target, 'data-nav')) { target = target.parentNode; }
    if (hasAttr(target, 'data-nav')) {
      var navIndex = navClicked = Number(getAttr(target, 'data-nav')),
          targetIndexBase = fixedWidth || autoWidth ? navIndex * slideCount / pages : navIndex * items,
          targetIndex = navAsThumbnails ? navIndex : Math.min(Math.ceil(targetIndexBase), slideCount - 1);
      goTo(targetIndex, e);

      if (navCurrentIndex === navIndex) {
        if (animating) {
          stopAutoplay();
        }
        navClicked = -1; // reset navClicked
      }
    }
  }

  // autoplay functions
  function setAutoplayTimer () {
    if (!autoplayTimer) {
      autoplayTimer = setInterval(function () {
        onControlsClick(null, autoplayDirection);
      }, autoplayTimeout);
    }
    
    animating = true;
  }

  function stopAutoplayTimer () {
    if (autoplayTimer) {
      autoplayTimer = clearInterval(autoplayTimer);
    }
    animating = false;
  }

  function updateAutoplayButton (action, txt) {
    if (autoplayUserPaused) {
      setAttrs(autoplayButton, {
        'data-action': 'start',
        'aria-label': getString('START_AUTOPLAY')
      });
    }
    else {
      setAttrs(autoplayButton, {
        'data-action': 'pause',
        'aria-label': getString('PAUSE_AUTOPLAY')
      });
    }
    
    
  }

  function startAutoplay () {
    setAutoplayTimer();
    if (isAriaLiveRegion) {
      container.setAttribute('aria-live', 'off');
    }
    
    if (autoplayButton) {
      updateAutoplayButton('pause', autoplayText[1]);
    }
  }

  function stopAutoplay () {
    stopAutoplayTimer();
    if (isAriaLiveRegion) {
      container.setAttribute('aria-live', 'polite');
    }
    
    if (autoplayButton) {
      updateAutoplayButton('start', autoplayText[0]);
    }
  }

  // programmatically play/pause the slider
  function play () {
    if (autoplay && !animating) {
      startAutoplay();
      autoplayUserPaused = false;
    }
  }
  function pause () {
    if (animating) {
      stopAutoplay();
      autoplayUserPaused = true;
    }
  }

  function toggleAutoplay () {
    if (autoplayUserPaused) {
      autoplayUserPaused = false;
      startAutoplay();
    }
    else {
      autoplayUserPaused = true;
      stopAutoplay();
    }
  }

  function onVisibilityChange () {
    if (doc.hidden) {
      if (animating) {
        stopAutoplayTimer();
        autoplayVisibilityPaused = true;
      }
    }
    else if (autoplayVisibilityPaused) {
      setAutoplayTimer();
      autoplayVisibilityPaused = false;
    }
  }

  function mouseoverPause () {
    if (animating) {
      stopAutoplayTimer();
      autoplayHoverPaused = true;
    }
    
    if (autoplay) {
      updateAutoplayButton('start', autoplayText[0]);
    }
    
  }

  function mouseoutRestart () {
    if (autoplayHoverPaused && !autoplayUserPaused) {
      setAutoplayTimer();
      autoplayHoverPaused = false;
      
      if (autoplay) {
        updateAutoplayButton('pause', autoplayText[1]);
      }
      
    }
  }

  // keydown events on document
  function onDocumentKeydown (e) {
  }

  // on key control
  function onControlsKeydown (e) {
    e = getEvent(e);
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);

    if (keyIndex >= 0) {
      autoplayUserPaused = true;
      stopAutoplay();
      if (keyIndex === 0) {
        // left cursor key pressed
        if (!prevButton.disabled) {
          onControlsClick(e, -1);
        }
      }
      else if (!nextButton.disabled) {
        // right cursor key pressed and nextButton is not disabled
        onControlsClick(e, 1);
      }
      event.stopPropagation();
      event.preventDefault();
    }
  }
  
  function setFocusOnFirstVisibleSlideAndRemoveThisEventListener () {
    var firstVisibleSlideItemIndex = getVisibleSlideRange()[0];
    var firstVisibleSlideItem = slideItems[firstVisibleSlideItemIndex];
    firstVisibleSlideItem.focus();
    events.off('transitionEnd', setFocusOnFirstVisibleSlideAndRemoveThisEventListener);
  }
  
  function onInnerWrapperKeydown (event) {
    if ([KEYS.LEFT, KEYS.RIGHT].includes(event.keyCode)) {
      events.on('transitionEnd', setFocusOnFirstVisibleSlideAndRemoveThisEventListener);
    }
    onControlsKeydown(event);
  }
  
  // set focus
  function setFocus (el) {
    el.focus();
  }

  // on key nav
  function onNavKeydown (e) {
    e = getEvent(e);
    var curElement = doc.activeElement;
    if (!hasAttr(curElement, 'data-nav')) { return; }

    // var code = e.keyCode,
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT, KEYS.ENTER, KEYS.SPACE].indexOf(e.keyCode),
        navIndex = Number(getAttr(curElement, 'data-nav'));

    if (keyIndex >= 0) {
      if (keyIndex === 0) {
        if (navIndex > 0) {
          setFocus(navItems[navIndex - 1]);
        }
      }
      else if (keyIndex === 1) {
        if (navIndex < pages - 1) {
          setFocus(navItems[navIndex + 1]);
        }
      }
      else {
        navClicked = navIndex;
        // goTo(navIndex, e);
        // because enter or space is pressed, click event -> onNavClick will also be triggered
      }
    }
  }

  function getEvent (e) {
    e = e || win.event;
    return isTouchEvent(e) ? e.changedTouches[0] : e;
  }
  function getTarget (e) {
    return e.target || win.event.srcElement;
  }

  function isTouchEvent (e) {
    return e.type.indexOf('touch') >= 0;
  }

  function preventDefaultBehavior (e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
  }

  function getMoveDirectionExpected () {
    var touchDirection = getTouchDirection(toDegree(lastPosition.y - initPosition.y, lastPosition.x - initPosition.x), swipeAngle);
    var touchDirectionEqualsAxis = touchDirection === options.axis;
    return touchDirectionEqualsAxis;
  }

  function onPanStart (e) {
    autoplayUserPaused = true;
    stopAutoplay();
    if (isAriaLiveRegion) {
      container.setAttribute("aria-busy", "true");
    }
    
    container.classList.add('tns-animating');
    
    if (running) {
      if (preventActionWhenRunning) {
        return;
      }
    }
    
    stopAutoplayTimer();
    
    panStart = true;
    if (rafIndex) {
      caf(rafIndex);
      rafIndex = null;
    }

    var $ = getEvent(e);
    events.emit(isTouchEvent(e) ? 'touchStart' : 'dragStart', info(e));

    if (!isTouchEvent(e) && ['img', 'a'].indexOf(getLowerCaseNodeName(getTarget(e))) >= 0) {
      preventDefaultBehavior(e);
    }

    lastPosition.x = initPosition.x = $.clientX;
    lastPosition.y = initPosition.y = $.clientY;
    if (carousel) {
      translateInit = parseFloat(container.style[transformAttr].replace(transformPrefix, ''));
      resetDuration(container, '0s');
    }
  }

  function onPanMove (e) {
    if (panStart) {
      var $ = getEvent(e);
      lastPosition.x = $.clientX;
      lastPosition.y = $.clientY;

      if (carousel) {
        if (!rafIndex) {
          rafIndex = raf(function(){ panUpdate(e); });
        }
      }
      else {
        if (moveDirectionExpected === '?') {
          moveDirectionExpected = getMoveDirectionExpected();
        }
        if (moveDirectionExpected) {
          preventScroll = true;
        }
      }

      if ((typeof e.cancelable !== 'boolean' || e.cancelable) && preventScroll) {
        e.preventDefault();
      }
    }
  }

  function panUpdate (e) {
    if (!moveDirectionExpected) {
      panStart = false;
      return;
    }
    caf(rafIndex);
    if (panStart) {
      rafIndex = raf(function(){ panUpdate(e); });
    }

    if (moveDirectionExpected === '?') {
      moveDirectionExpected = getMoveDirectionExpected();
    }
    if (moveDirectionExpected) {
      if (!preventScroll && isTouchEvent(e)) { preventScroll = true; }

      try {
        if (e.type) {
          events.emit(isTouchEvent(e) ? 'touchMove' : 'dragMove', info(e));
        }
      }
      catch(err) {}

      var x = translateInit,
          dist = getDist(lastPosition, initPosition);
      if (!horizontal || fixedWidth || autoWidth) {
        x += dist;
        x += 'px';
      } else {
        var percentageX = TRANSFORM ? dist * items * 100 / ((viewport + gutter) * slideCountNew): dist * 100 / (viewport + gutter);
        x += percentageX;
        x += '%';
      }

      container.style[transformAttr] = transformPrefix + x + transformPostfix;
    }
  }

  function onPanEnd (e) {
    if (panStart) {
      if (rafIndex) {
        caf(rafIndex);
        rafIndex = null;
      }
      if (carousel) {
        resetDuration(container, '');
      }
      panStart = false;

      var $ = getEvent(e);
      lastPosition.x = $.clientX;
      lastPosition.y = $.clientY;
      var dist = getDist(lastPosition, initPosition);
      if (Math.abs(dist)) {
        // drag vs click
        if (!isTouchEvent(e)) {
          // prevent "click"
          var target = getTarget(e);
          addEvents(target, {'click': function preventClick (e) {
            preventDefaultBehavior(e);
            removeEvents(target, {'click': preventClick});
          }});
        }
        
        if (carousel) {
          rafIndex = raf(function() {
            if (Math.abs(dist) >= 50) { // minimum distance of movement in order to trigger slide change
              if (horizontal && !autoWidth) {
                var indexMoved = - dist * items / (viewport + gutter);
                indexMoved = dist > 0 ? Math.floor(indexMoved) : Math.ceil(indexMoved);
                index += indexMoved;
              }
              else {
                var moved = - (translateInit + dist);
                if (moved <= 0) {
                  index = indexMin;
                }
                else if (moved >= slidePositions[slideCountNew - 1]) {
                  index = indexMax;
                }
                else {
                  var i = 0;
                  while (i < slideCountNew && moved >= slidePositions[i]) {
                    index = i;
                    if (moved > slidePositions[i] && dist < 0) {
                      index += 1;
                    }
                    i++;
                  }
                }
              }
            }

            render(e, dist);
            events.emit(isTouchEvent(e) ? 'touchEnd' : 'dragEnd', info(e));
          });
        }
        else {
          if (moveDirectionExpected) {
            onControlsClick(e, dist > 0 ? -1 : 1);
          }
        }
      }
    }

    // reset
    if (options.preventScrollOnTouch === 'auto') {
      preventScroll = false;
    }
    if (swipeAngle) {
      moveDirectionExpected = '?';
    }
    if (autoplay && !animating && !autoplayUserPaused) {
      setAutoplayTimer();
    }
  }

  // === RESIZE FUNCTIONS === //
  // (slidePositions, index, items) => vertical_conentWrapper.height
  function updateContentWrapperHeight () {
    var wp = middleWrapper ? middleWrapper : innerWrapper;
    wp.style.height = slidePositions[index + items] - slidePositions[index] + 'px';
  }

  function getPages () {
    var rough = fixedWidth ? (fixedWidth + gutter) * slideCount / viewport : slideCount / items;
    return Math.min(Math.ceil(rough), slideCount);
  }

  /*
   * 1. update visible nav items list
   * 2. add "hidden" attributes to previous visible nav items
   * 3. remove "hidden" attrubutes to new visible nav items
   */
  function updateNavVisibility () {
    if (!nav || navAsThumbnails) { return; }

    if (pages !== pagesCached) {
      var min = pagesCached,
          max = pages,
          fn = showElement;

      if (pagesCached > pages) {
        min = pages;
        max = pagesCached;
        fn = hideElement;
      }

      while (min < max) {
        fn(navItems[min]);
        min++;
      }

      // cache pages
      pagesCached = pages;
    }
  }

  function info (e) {
    return {
      container: container,
      slideItems: slideItems,
      navContainer: navContainer,
      navItems: navItems,
      controlsContainer: controlsContainer,
      hasControls: hasControls,
      prevButton: prevButton,
      nextButton: nextButton,
      items: items,
      slideBy: slideBy,
      cloneCount: cloneCount,
      slideCount: slideCount,
      slideCountNew: slideCountNew,
      index: index,
      indexCached: indexCached,
      displayIndex: getCurrentSlide(),
      navCurrentIndex: navCurrentIndex,
      navCurrentIndexCached: navCurrentIndexCached,
      pages: pages,
      pagesCached: pagesCached,
      sheet: sheet,
      isOn: isOn,
      event: e || {},
    };
  }

  return {
    version: '2.9.2s',
    getInfo: info,
    events: events,
    goTo: goTo,
    play: play,
    pause: pause,
    isOn: isOn,
    updateSliderHeight: updateInnerWrapperHeight,
    refresh: initSliderTransform,
    destroy: destroy,
    rebuild: function() {
      return tns(extend(options, optionsElements));
    }
  };
};

function initializeSliderOptions(containerElement, additionalOptions) {
  const containerElementOptions = {...defaultSliderOptions, ...additionalOptions};
  const dataset = containerElement.dataset;
  for (const [key, value] of Object.entries(dataset)) {
    let result;
    switch (key) {
      case 'items':
      case 'autoplayTimeout':
      case 'speed':
        result = parseInt(value);
        break;
      case 'controls':
      case 'nav':
      case 'arrowKeys':
      case 'autoplay':
      case 'autoplayUserPaused':
      case 'autoplayButtonOutput':
      case 'isAriaLiveRegion':
        if (value === "true") {
          result = true;
        }
        else if (value === "false") {
          result = false;
        }
        else {
          result = defaultSliderOptions[key];
        }
        break;
      default:
        result = value;
    }
    containerElementOptions[key] = result;
  }
  
  containerElementOptions['container'] = containerElement;
  return containerElementOptions;
}

// expects a NodeList of slider-type HTML elements, e.g.
// sliderElements = document.querySelectorAll('.gs_3col_slider, .gs_single_slider, .gs_news_compact_slider, .gs_single_slider_wrapper');
const initializeSliders = function(sliderElements) {
  const sliders = [];
  const sliderElementsArray = Array.from(sliderElements);
  
  {
    // Slider with up to 4 items at once
    const multiColumnSliders = sliderElementsArray.filter(
      sliderElement => sliderElement.classList.contains('gs_3col_slider')
    );
    for (const multiColumnSlider of multiColumnSliders) {
      const additionalOptions = {
        responsive: {
          576: { // >= 576px: bootstrap sm and larger
            items: 2
          },
          768: { // >= 768px: bootstrap md and larger
            items: 3
          },
          992: { // >= 992px: bootstrap lg and larger
            items: 4
          }
        },
        gutter: 16, // equals 16px = 1rem
      };
      const options = initializeSliderOptions(multiColumnSlider, additionalOptions);
      const slider = tns(options);
      sliders.push(slider);
    }
  }
  
  {
    // banner slider, testimonials, news, and RSS feed (all with 1 item at once)
    const oneColumnSliders = sliderElementsArray.filter(
      sliderElement => (
        sliderElement.classList.contains('gs_single_slider') ||
        sliderElement.classList.contains('gs_news_compact_slider')
      )
    );
    for (const oneColumnSlider of oneColumnSliders) {
      const options = initializeSliderOptions(oneColumnSlider);
      const slider = tns(options);
      sliders.push(slider);
    }
  }
  
  {
    // ul-li sliders inside wrapper
    const ulLiSliderWrappers = sliderElementsArray.filter(
      sliderElement => sliderElement.classList.contains('gs_single_slider_wrapper')
    );
    for (const ulLiSliderWrapper of ulLiSliderWrappers) {
      const maybeHeader = ulLiSliderWrapper.querySelector('.headline header');
      const containerLabelledby = maybeHeader ? maybeHeader.id : false;
      
      // ul-li-based slider tiles are problematic because HTML validation fails with
      // "Error: Bad value tabpanel for attribute role on element li."
      // Therefore, the following steps replace  the ul element and its li children to divs.
      const wrappedUlLiSlider = ulLiSliderWrapper.querySelector('ul');
      const replacedListContainer = replaceTag(wrappedUlLiSlider, 'div');
      replacedListContainer.querySelectorAll(':scope > li').forEach( li => replaceTag(li, 'div') );
      
      const options = initializeSliderOptions(replacedListContainer, {containerLabelledby});
      const slider = tns(options);
      sliders.push(slider);
    }
  }
  
  return sliders;
};

/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*   
*   Adapted for GESIS-Web, www.gesis.org
*/



const keyCode$1 = {
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
      case keyCode$1.UP:
      case keyCode$1.DOWN:
      case keyCode$1.ESC:
      case keyCode$1.RETURN:
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
          if (this.previousInput === this.input.value) ;
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
    
    if (key === keyCode$1.ESC) {
      this.abortRequest();
      this.hideListbox();
      this.clearInput();
      return;
    }
    
    var prevActive = this.getItemAt(activeIndex);
    var activeItem;
    
    switch (key) {
      case keyCode$1.UP:
        if (activeIndex <= 0) {
          activeIndex = this.resultsCount - 1;
        }
        else {
          activeIndex--;
        }
        break;
      case keyCode$1.DOWN:
        if (activeIndex === -1 || activeIndex >= this.resultsCount - 1) {
          activeIndex = 0;
        }
        else {
          activeIndex++;
        }
        break;
      case keyCode$1.RETURN:
        activeItem = this.getItemAt(activeIndex);
        if (activeItem) {
          this.selectItem(activeItem);
        }
        else {
          this.updateResults();
        }
        return;
      case keyCode$1.TAB:
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
        if (key === keyCode$1.DOWN) {
          this.slider.goTo('next');
        }
        else if (key === keyCode$1.UP) {
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
    event.target;
    if ('focusout' === eventType) {
      if (this.input.contains(relatedTarget) || this.combobox.contains(relatedTarget) || this.listbox.contains(relatedTarget)) ;
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
      if (this.controllerNode.contains(relatedTarget)) ;
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
      case keyCode$2.SPACE:
      case keyCode$2.DOWN:
        event.stopPropagation();
        event.preventDefault();
        this.openPopup();
        this.selectNextElement();
        break;
      case keyCode$2.UP:
        event.stopPropagation();
        event.preventDefault();
        this.openPopup();
        this.selectPreviousElement();
        break;
      case keyCode$2.ESC:
      case keyCode$2.LEFT:
      case keyCode$2.RIGHT:
        event.stopPropagation();
        event.preventDefault();
        this.closePopup();
        this.controllerNode.focus();
        break;
      case keyCode$2.RETURN:
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
      case keyCode$2.HOME:
        event.stopPropagation();
        event.preventDefault();
        this.openPopup();
        this.selectFirstElement();
        break;
      case keyCode$2.END:
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

// setup.typoscript contains additional GESIS Web-specific etracker setup code

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
}
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
}
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
}
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
}
const setupTracking = function() {
  // guard against null-pointer exception in strong privacy environments
  if ( (typeof _etracker !== 'undefined') && (typeof et_pagename !== 'undefined') ) {
    setupTabClickTracking();
    setupDownloadTracking();
    setupXPathLinkTracking();
    setupMouseoverBoxTracking();
  }
};

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
      if (wasFocusPreviouslyAlreadyInsideContainer) ;
      else {
        this.openPopup();
      }
    }
    else if ('focusout' === eventType || 'mouseleave' === eventType) {
      const newlyFocusedElement = event.relatedTarget;
      const isFocusStillInsideContainer = this.domElement.contains(newlyFocusedElement);
      if (isFocusStillInsideContainer) ;
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
    else ;
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

/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/

const addToFirstChars = function(array, node) {
	const textContent = node.textContent.trim();
	array.push(textContent.substring(0, 1).toLowerCase());
};

const getIndexFirstChars = function(startIndex, char) {
	for (var i = startIndex; i < this.firstChars.length; i++)
		if (char === this.firstChars[ i ])
			return i;

	return -1;
};

const keyCode = Object.freeze({
	"TAB"      : 9,
	"RETURN"   : 13,
	"ESC"      : 27,
	"SPACE"    : 32,
	"PAGEUP"   : 33,
	"PAGEDOWN" : 34,
	"END"      : 35,
	"HOME"     : 36,
	"LEFT"     : 37,
	"UP"       : 38,
	"RIGHT"    : 39,
	"DOWN"     : 40
});

const userIntents = Object.freeze({
  VISIT_LINK                               : "VISIT_LINK",
  GO_TO_PREVIOUS_ITEM                      : "GO_TO_PREVIOUS_ITEM",
  GO_TO_NEXT_ITEM                          : "GO_TO_NEXT_ITEM",
  GO_TO_FIRST_ITEM                         : "GO_TO_FIRST_ITEM",
  GO_TO_LAST_ITEM                          : "GO_TO_LAST_ITEM",
  OPEN_SUBMENU                             : "OPEN_SUBMENU",
  OPEN_SUBMENU_AND_GO_TO_SUBMENU_LAST_ITEM : "OPEN_SUBMENU_AND_GO_TO_SUBMENU_LAST_ITEM",
  CLOSE_MENU                               : "CLOSE_MENU",
  SEARCH_ITEM                              : "SEARCH_ITEM",
  TAB_OUT                                  : "TAB_OUT",
  UNDEFINED                                : "UNDEFINED"
});

const handleListItemClick = function(event) {
	if (event.target === this.parentLi) {
		if (this.popupMenu) {
			const currentOpenState = this.popupMenu.controller.isExpanded();
			if (true === currentOpenState) {
				this.popupMenu.close();
				this.popupMenu.setFocusToController();
			}
			else {
				this.popupMenu.open();
				this.popupMenu.setFocusToFirstItem();
			}
		}
  }
};

/*
 * A Menubutton instance (button element) has one popupMenu of type Menubar:
   * A Menubar instance (ul element) ...
	 * ... has a direct parent element (nav element "navElement")
	 * ... contains one or more li elements, each of which in turn must contain one 'a' element (type MenubarItem ... "...bar..."!) and may contain one ul element
	   * A MenubarItem instance ('a' element), if it has a ul element as next sibling, will have this sibling as popupMenu of type PopupMenu:
		* A PopupMenu instance (ul element) ...
		  * ... contains one or more li elements, each of which in turn must contain one 'a' element (type MenuItem ... NO "...bar..."!) and may contain one ul element
			* A MenuItem instance ('a' element), if it has a ul element as next sibling, will have this sibling as popupMenu of type PopupMenu:
			  * (from here recursion)
*/
class Menubutton {
	constructor(domNode, onOpen, onClose) {
		this.domNode    = domNode;
		this.isDisabled = false;
		this.popupMenu  = false;
		this.hasFocus   = false;
		this.hasHover   = false;
		this.onOpen     = onOpen  || function() {};
		this.onClose    = onClose || function() {};
	}

	init() {
		this.domNode.setAttribute("aria-haspopup", "true");

		this.domNode.addEventListener("keydown",   this.handleKeydown.bind(this));
		this.domNode.addEventListener("click",     this.handleClick.bind(this));
		this.domNode.addEventListener("focus",     this.handleFocus.bind(this));
		this.domNode.addEventListener("blur",      this.handleBlur.bind(this));
		this.domNode.addEventListener("mouseover", this.handleMouseover.bind(this));
		this.domNode.addEventListener("mouseout",  this.handleMouseout.bind(this));

		// initialize pop up menus
		const popupMenu = document.getElementById(this.domNode.getAttribute('aria-controls'));
		if (!popupMenu)
			return;

		this.popupMenu = new Menubar(popupMenu, this, this.onOpen, this.onClose);
		this.popupMenu.init();
	}
	
	getDisabled() {
		return this.isDisabled;
	}
	
	setDisabled(disabled) {
		this.isDisabled       = disabled;
		this.domNode.disabled = disabled;
	}
	
	handleKeydown(event) {
		var flag = false;

		switch (event.keyCode) {
			case keyCode.SPACE:
			case keyCode.RETURN:
			case keyCode.DOWN:
				if (!this.popupMenu) {
					this.popupMenu.open();
					this.popupMenu.setFocusToFirstItem();
				}
				flag = true;
				break;

			case keyCode.UP:
				if (this.popupMenu) {
					this.popupMenu.open();
					this.popupMenu.setFocusToLastItem();
					flag = true;
				}
				break;
		}

		if (flag) {
			event.stopPropagation();
			event.preventDefault();
		}
	}
	handleClick() {
		if (this.domNode.getAttribute("aria-expanded") == "true") {
			this.popupMenu.close(true);
		}
		else {
			this.popupMenu.open();
			this.popupMenu.setFocusToFirstItem();
		}
	}
	handleFocus() {
		this.popupMenu.hasFocus = true;
	}
	handleBlur() {
		this.popupMenu.hasFocus = false;
	}
	handleMouseover() {
		this.hasHover = true;
	}
	handleMouseout() {
		this.hasHover = false;
	}
}

// controllerObj: the Menubutton representing the hamburger button element (visible on small screens)
class Menubar {
	constructor(domNode, controllerObj, onOpen, onClose) {
		// Check whether menubarNode is a DOM element
		if (!domNode instanceof Element)
			throw new TypeError(domNode + " is not a DOM Element.");
		if ((!domNode.parentElement) || (domNode.parentElement.tagName !== "NAV"))
			throw new Error(domNode + " is not wrapped in a nav element.");

		this.parentNav = domNode.parentElement;
		// Check whether menubarNode has descendant elements
		if (domNode.childElementCount === 0)
			// if no children, then disable controllerObj / hamburger button
			controllerObj.setDisabled(true);

		// Check whether all menubarNodeChildren have each an 'a' element as first child
		const menubarNodeChildren = domNode.children;
		for (const menubarNodeChild of menubarNodeChildren) {
			const menubarNodeFirstGrandchild = menubarNodeChild.firstElementChild;
			if (menubarNodeFirstGrandchild && menubarNodeFirstGrandchild.tagName !== "A")
				throw new Error(domNode + " has child elements that are not A elements.");
		}

		this.isMenubar = true;

		// TODO rename to this.menubarNode
		// domNode is of element type "ul"
		this.domNode = domNode;

		this.controller = controllerObj;
		this.mainController = controllerObj;

		this.onOpen = onOpen;

		this.onClose = onClose;

		this.menubarItems = []; // See Menubar init method

		this.firstChars = []; // See Menubar init method


		// TODO rename to this.firstMenubarItem
		this.firstItem = null; // See Menubar init method


		//TODO rename to this.lastMenubarItem
		this.lastItem = null; // See Menubar init method

		this.hasFocus = false; // See MenubarItem handleFocus, handleBlur
		this.hasHover = false; // See Menubar handleMouseover, handleMouseout
		
		// if this.directlyPopUp is true, then menubar items don't need
		// a hover thresold to pop up. This improves usability when hover-
		// navigating between menubarItems and their individual pop-ups,
		// as the user is already in a mode of investigating pop-ups contents
		this.directlyPopUp = false;
	}
	/*
	*   @method Menubar.prototype.init
	*
	*   @desc
	*       Adds ARIA role to the menubar node
	*       Traverse menubar children for A elements to configure each A element as a ARIA menuitem
	*       and populate menuitems array. Initialize firstItem and lastItem properties.
	*/
	init() {
		// compared to PopupMenu, Menubar does not add its own mouseover and mouseout
		// event handlers.
		// Traverse the element children of menubarNode: configure each with
		// menuitem role behavior and store reference in menubarItems array.

		const menubarNodeChildren = this.domNode.children;
		for (const menubarNodeChild of menubarNodeChildren) {
			// a menubarNodeChild is an "li" with at least one nested "a" element and 
			// possibly a another nested "ul" element (submenu)
			const menubarItemNode = menubarNodeChild.firstElementChild;
			if (menubarItemNode && menubarItemNode.tagName === "A") {
				const menubarItem = new MenubarItem(menubarItemNode, this, this.onOpen, this.onClose, this.mainController);
				menubarItem.init();
				this.menubarItems.push(menubarItem);
				addToFirstChars(this.firstChars, menubarItemNode);
			}
		}

		// Use populated menubarItems to initialize firstItem and lastItem.
		const numItems = this.menubarItems.length;
		if (numItems > 0) {
			this.firstItem = this.menubarItems[0];

			// initially, make firstMenubarItem accessible by usertab,
			// see https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
			// see https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-12
			this.firstItem.domNode.tabIndex = 0;

			this.lastItem = this.menubarItems[numItems - 1];
		}

		this.domNode.addEventListener("focusin", this.handleContainedFocusChange.bind(this));
		this.domNode.addEventListener("focusout", this.handleContainedFocusChange.bind(this));
	}
	handleContainedFocusChange(event) {
		const thisContainer = this.domNode;
		const eventType = event.type;
		if ("focusin" === eventType) {
			const previouslyFocusedElement = event.relatedTarget;
			const wasFocusPreviouslyAlreadyInsideContainer = thisContainer.contains(previouslyFocusedElement);
			if (wasFocusPreviouslyAlreadyInsideContainer) ;
			else {
				this.open();
			}
		}
		else if ("focusout" === eventType) {
			const newlyFocusedElement = event.relatedTarget;
			const isFocusStillInsideContainer = thisContainer.contains(newlyFocusedElement);
			if (isFocusStillInsideContainer) ;
			else if (newlyFocusedElement === this.controller.domNode) ;
			else if (isAppleMobileBrowser()) {
				/*
				What an annoying workaround for Apple iOS devices (iPhone, iPad)!
				On these devices, button elements never receive a focus event / become
				document.activeElement, therefore above strategy for testing on
				newlyFocusedElement === this.controller.domNode
				will not work in order to determine if the toggling button was pressed in
				order to reliable determine that the popup is intended to be closed.
				
				As a workaround and to still avoid double-toggling, in the following, first
				the button is deactivated, therefore disabling its click event listener (i.e.
				deactivating its own toggling mechanism).
				
				Then we manually close the pop-up.
				
				Then we leverage a setTimeout(..) which callbacks after all UI events have
				finished. In that callback, the button gets activated again.
				
				iOS browsers make up to 10% percent of gesis.org visitors according to
				etracker as of 2021-10-22, and due to Apple's policies, third-party browsers
				such as Chrome and Firefox have to use Apple's WebKit engine:
				https://www.theregister.com/2021/10/22/safari_risks_becoming_the_new_ie/
				
				Here is a debugging testbed. Keep in mind that step-debugging UI events
				has its own Heisenbug challenges, as breakpoint pauses may change or swallow
				up events in the usual UI event flow of focusin, focusout, focus, blur,
				mousedown, mouseup, and click events. Also keep in mind that DevTools device
				emulation of Apple devices is not faithful to real hardware. Chrome's Blink
				engine still behaves blinky with respect to UI events and not lik
				Apple iOS' WebKit engine even when iPhone or iPad emulation is activated.
				
		  ### BEGIN testbed ###
		  <button id="debug" tabindex="0">Button</button>
		  <div id="debug-output"></div>
		  
		  <script>
		  const debugButton = document.getElementById('debug');
		  const debugOutput = document.getElementById('debug-output');
		  
		  isAppleMobileBrowser = function() {
			return [
			  'iPad Simulator',
			  'iPhone Simulator',
			  'iPod Simulator',
			  'iPad',
			  'iPhone',
			  'iPod'
			].includes(navigator.platform)
			// iPad on iOS 13 detection
			|| (navigator.userAgent.includes("Mac") && "ontouchend" in document);
		  };
		  
		  appendDebug = function(text) {
			const debugOutput = document.getElementById('debug-output');
			if (debugOutput) {
			  const p = document.createElement('p');
			  const content = document.createElement('code');
			  content.textContent = text;
			  p.appendChild(content);
			  debugOutput.appendChild(p);
			}
		  };
		  
		  debugButton.addEventListener('click', event => {
			console.log('click');
			appendDebug('click');
		  });
		  debugButton.addEventListener('focus', event => {
			console.log('focus');
			appendDebug('focus');
		  });
		  debugButton.addEventListener('focus', event => {
			console.log('focus');
			appendDebug('focus');
		  });
		  debugButton.addEventListener('focusin', event => {
			const previouslyFocusedElement = event.relatedTarget;
			console.log('focusin. previouslyFocusedElement:', previouslyFocusedElement);
			appendDebug('focusin. previouslyFocusedElement: ' + (previouslyFocusedElement? previouslyFocusedElement.toString(): 'nulli'));
		  });
		  debugButton.addEventListener('focusout', event => {
			const newlyFocusedElement = event.relatedTarget;
			console.log('focusout. newlyFocusedElement:', newlyFocusedElement);
			appendDebug('focusout. newlyFocusedElement: ' + (newlyFocusedElement ? newlyFocusedElement.toString(): 'nulli'));
		  });
		  debugButton.addEventListener('blur', event => {
			console.log('blur');
			appendDebug('blur');
		  });
		  appendDebug('version 13');
		  appendDebug('isAppleMobileBrowser(): ' + isAppleMobileBrowser());
		  </script>
		  ### END testbed ###
				
				Further reading:
				https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus
				https://zellwk.com/blog/inconsistent-button-behavior/
				*/
				appendDebug("Apple iOS workaround. Disabling button");
				this.controller.domNode.disabled = true;

				// see https://stackoverflow.com/a/7760499/923560
				setTimeout(() => {
					appendDebug("Apple iOS workaround. Reenabling button");
					this.controller.domNode.disabled = false;
				}, 0);

				this.close();
			}
			else {
				this.close();
			}
		}
	}
	open() {
		this.controller.domNode.setAttribute("aria-expanded", "true");
		/* As MenuBar has role="menu" or "menubar", and as these roles don't permit
		 * aria-expanded, here a proprietary attribute "data-open" is additionally added.
		 * This attribute is used for CSS rules to conditionally hide or show the "main menu"
		 * when toggling the menubutton. As of 2022, CSS is not yet expressive enough to write
		 * a CSS rule which matches HTML elements which are not part of the same root line
		 * (i.e., in general, menubutton and root menu are not in a anchestor-descendant or
		 * sibling relationship which could be expressed with CSS)
		 * see https://w3c.github.io/aria/#menu
		 */
		this.domNode.setAttribute("data-open", "true");
		this.onOpen();
	}
	close() {
		this.menubarItems.forEach(menubarItem => {
			if (menubarItem.popupMenu) {
				menubarItem.popupMenu.close(true, true);
			}
		});
		this.controller.domNode.setAttribute("aria-expanded", "false");
		this.domNode.setAttribute("data-open", "false");
		this.onClose();
	}
	setFocusToController() {
		this.controller.domNode.focus();
	}
	// REFACTOR rename to setFocusToMenubarItem = function (toBeFocusedMenubarItem)
	setFocusToItem(newItem) {
		const anyMenuBarItemWasTabbaleAndExpanded = this.menubarItems.some(mbi => (mbi.domNode.tabIndex == 0) && (mbi.isExpanded()));

		this.menubarItems.forEach(mbi => {
			mbi.domNode.tabIndex = -1;
			mbi.popupMenu ? mbi.isExpanded() && mbi.popupMenu.close() : null;
		});

		newItem.domNode.focus();
		newItem.domNode.tabIndex = 0;

		if (anyMenuBarItemWasTabbaleAndExpanded && newItem.popupMenu) {
			newItem.popupMenu.open();
		}
	}
	setFocusToFirstItem() {
		this.setFocusToItem(this.firstItem);
	}
	setFocusToLastItem() {
		this.setFocusToItem(this.lastItem);
	}
	setFocusToPreviousItem(currentItem) {
		let newItem;

		if (currentItem === this.firstItem) {
			newItem = this.lastItem;
		}
		else {
			const index = this.menubarItems.indexOf(currentItem);
			newItem = this.menubarItems[index - 1];
		}

		this.setFocusToItem(newItem);
	}
	setFocusToNextItem(currentItem) {
		let newItem;
		if (currentItem === this.lastItem) {
			newItem = this.firstItem;
		}
		else {
			const index = this.menubarItems.indexOf(currentItem);
			newItem = this.menubarItems[index + 1];
		}

		this.setFocusToItem(newItem);
	}
	setFocusByFirstCharacter(currentItem, char) {
		var start, index, char = char.toLowerCase();

		// Get start index for search based on position of currentItem
		start = this.menubarItems.indexOf(currentItem) + 1;
		if (start === this.menubarItems.length) {
			start = 0;
		}

		// Check remaining slots in the menu
		index = this.getIndexFirstChars(start, char);

		// If not found in remaining slots, check from beginning
		if (index === -1) {
			index = this.getIndexFirstChars(0, char);
		}

		// If match was found...
		if (index > -1) {
			this.setFocusToItem(this.menubarItems[index]);
		}
	}
	
	getIndexFirstChars = getIndexFirstChars;
}


// RENAME domNode to menubarItemNode
class MenubarItem {
	constructor(domNode, menubar, onOpen, onClose, mainController) {

		// menubar is Menubar controller
		this.menubar = menubar;

		// domNode / menubarItemNode is of element type 'a'
		this.domNode = domNode;

		// if null, then no popupMenu exists.
		// Otherwise, this.popupMenu is the PopupMenu controller for popup menu
		this.popupMenu = null;

		this.hasFocus = false;
		this.hasHover = false;

		this.isMenubarItem = true;

		this.onOpen = onOpen;
		this.onClose = onClose;

		this.mainController = mainController;
		this.popupMenuHoverThresholdTimeoutID = null;
	}
	init() {
		// by default, menubarItems are focusable only by javascript, not tabpress
		// https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
		// Menubar's init method gives first menubarItem a tabindex of 0, therefore
		// that first menubarItem will be focusable by javascript AND tabpress
		this.domNode.tabIndex = -1;

		this.parentLi = this.domNode.parentNode;
		this.parentLi.addEventListener("click", this.handleListItemClick.bind(this));
		this.parentLi.addEventListener("mousedown", event => event.preventDefault()); // prevent currently focused element to loose focus to nirvana

		this.domNode.addEventListener("keydown", this.handleKeydown.bind(this));
		this.domNode.addEventListener("focus", this.handleFocus.bind(this));
		this.domNode.addEventListener("blur", this.handleBlur.bind(this));
		this.domNode.addEventListener("mouseover", this.handleMouseover.bind(this));
		this.domNode.addEventListener("mouseleave", this.handleMouseleave.bind(this));

		// Initialize pop up menus
		var maybeSiblingUlPopupMenuElement = this.domNode.nextElementSibling;
		if (maybeSiblingUlPopupMenuElement && maybeSiblingUlPopupMenuElement.tagName === 'UL') {
			this.popupMenu = new PopupMenu(maybeSiblingUlPopupMenuElement, this, true, this.onOpen, this.onClose, this.mainController);
			this.popupMenu.init();
		}

	}
	
	hoverThresholdReached() {
	  this.popupMenuHoverThresholdTimeoutID = null;
	  this.menubar.directlyPopUp = true;
	  this.popupMenu.open();
	}
	
	isExpanded() {
		const isExpanded = this.domNode.getAttribute('aria-expanded') === 'true';
		return isExpanded;
	}
	setExpanded(value) {
		if (value) {
			this.domNode.setAttribute('aria-expanded', 'true');
		}
		else {
			this.domNode.setAttribute('aria-expanded', 'false');
		}
	}
	handleKeydown(event) {
		const char = event.key;

		let preventDefaultBrowserKeydownBehavior = false;

		function isPrintableCharacter(str) {
			return str.length === 1 && str.match(/\S/);
		}

		let userIntent;
		switch (event.keyCode) {
			case keyCode.RETURN:
				userIntent = userIntents.VISIT_LINK;
				break;

			case keyCode.SPACE:
				userIntent = userIntents.OPEN_SUBMENU;
				break;

			case keyCode.DOWN:
				userIntent = isSmallScreenOrTouchOnly() ? userIntents.GO_TO_NEXT_ITEM : userIntents.OPEN_SUBMENU;
				break;

			case keyCode.LEFT:
				userIntent = isSmallScreenOrTouchOnly() ? userIntents.CLOSE_MENU : userIntents.GO_TO_PREVIOUS_ITEM;
				break;

			case keyCode.RIGHT:
				userIntent = isSmallScreenOrTouchOnly() ? userIntents.OPEN_SUBMENU : userIntents.GO_TO_NEXT_ITEM;
				break;

			case keyCode.UP:
				userIntent = isSmallScreenOrTouchOnly() ? userIntents.GO_TO_PREVIOUS_ITEM : userIntents.OPEN_SUBMENU_AND_GO_TO_SUBMENU_LAST_ITEM;
				break;

			case keyCode.HOME:
			case keyCode.PAGEUP:
				userIntent = userIntents.GO_TO_FIRST_ITEM;
				break;

			case keyCode.END:
			case keyCode.PAGEDOWN:
				userIntent = userIntents.GO_TO_LAST_ITEM;
				break;

			case keyCode.TAB:
				userIntent = userIntents.TAB_OUT;
				break;

			case keyCode.ESC:
				userIntent = userIntents.CLOSE_MENU;
				break;

			default:
				if (isPrintableCharacter(char)) {
					userIntent = userIntents.SEARCH_ITEM;
				}
				else {
					userIntent = userIntents.UNDEFINED;
				}
				break;
		}

		switch (userIntent) {
			case userIntents.VISIT_LINK:
				break;

			case userIntents.OPEN_SUBMENU:
				if (this.popupMenu) {
					this.setExpanded(true);
					this.popupMenu.open();
					this.popupMenu.setFocusToFirstItem();
					preventDefaultBrowserKeydownBehavior = true;
				}
				break;

			case userIntents.GO_TO_PREVIOUS_ITEM:
				this.menubar.setFocusToPreviousItem(this);
				preventDefaultBrowserKeydownBehavior = true;
				break;

			case userIntents.GO_TO_NEXT_ITEM:
				this.menubar.setFocusToNextItem(this);
				preventDefaultBrowserKeydownBehavior = true;
				break;

			case userIntents.OPEN_SUBMENU_AND_GO_TO_SUBMENU_LAST_ITEM:
				if (this.popupMenu) {
					this.setExpanded(true);
					this.popupMenu.open();
					this.popupMenu.setFocusToLastItem();
					preventDefaultBrowserKeydownBehavior = true;
				}
				break;

			case userIntents.GO_TO_FIRST_ITEM:
				this.menubar.setFocusToFirstItem();
				preventDefaultBrowserKeydownBehavior = true;
				break;

			case userIntents.GO_TO_LAST_ITEM:
				this.menubar.setFocusToLastItem();
				preventDefaultBrowserKeydownBehavior = true;
				break;

			case userIntents.TAB_OUT:
				if (this.popupMenu) {
					this.setExpanded(false);
					this.popupMenu.close(true);
				}
				break;

			case userIntents.CLOSE_MENU:
				if (this.popupMenu) {
					this.setExpanded(false);
					this.popupMenu.close(true);
				}
				this.menubar.close();
				this.menubar.setFocusToController();
				break;

			case userIntents.SEARCH_ITEM:
				this.menubar.setFocusByFirstCharacter(this, char);
				preventDefaultBrowserKeydownBehavior = true;
				break;
		}

		if (preventDefaultBrowserKeydownBehavior) {
			event.stopPropagation();
			event.preventDefault();
		}
	}
	handleFocus() {
		this.menubar.hasFocus = true;
	}
	handleBlur() {
		this.menubar.hasFocus = false;
	}
	handleMouseover() {
		this.hasHover = true;
		if (this.popupMenu && !isSmallScreenOrTouchOnly()) {
		  if (this.menubar.directlyPopUp === true) {
			this.popupMenu.open();
		  }
		  else {
			this.popupMenuHoverThresholdTimeoutID =
			setTimeout(() => this.hoverThresholdReached(), 200);
		  }
		}
	}
	handleMouseleave(event) {
		const newHoveredElement = event.relatedTarget;
		this.hasHover = false;

		if (this.popupMenu && !isSmallScreenOrTouchOnly()) {
			if (!this.popupMenu.domNode.contains(newHoveredElement)) {
			  // the pointer has moved outside the menubar item AND
			  // has not moved into its own popup menu
			  if (this.popupMenuHoverThresholdTimeoutID) {
				  clearTimeout(this.popupMenuHoverThresholdTimeoutID);
				  this.popupMenuHoverThresholdTimeoutID = null;
				}
				this.popupMenu.close(false);
			}
			if (!this.menubar.domNode.contains(newHoveredElement)) {
			  // the pointer has moved outside the menubar item AND
			  // has not moved to any element within the menubar,
			  // including the menubar itself, sibling menu items,
			  // and their own popups
			  this.menubar.directlyPopUp = false;
			}
		}
	}
	handleListItemClick = handleListItemClick;
}


// RENAME domNode to popupMenuNode
// RENAME controllerObj to controllingWidget
class PopupMenu {
	constructor(domNode, controllerObj, isMainPopup, onOpen, onClose, mainController) {

		// Check whether domNode is a DOM element
		if (!domNode instanceof Element) {
			throw new TypeError(`${domNode} is not a DOM Element.`);
		}
		// Check whether domNode has child elements
		if (domNode.childElementCount === 0) {
			throw new Error(`${domNode} has no child nodes.`);
		}

		// Check whether all popupMenuNodeChildren have each an 'a' element as first child
		const popupMenuNodeChildren = domNode.children; // popupMenuNodeChildren is an array of li elements
		for (const popupMenuNodeChild of popupMenuNodeChildren) { // popupMenuNodeChild is an li element
			const popupMenuNodeFirstGrandchild = popupMenuNodeChild.firstElementChild; // by convention, popupMenuNodeChild.firstElementChild is an 'a' element
			if (popupMenuNodeFirstGrandchild && popupMenuNodeFirstGrandchild.tagName !== 'A') {
				throw new Error(`${domNode} has descendant elements that are not '<a>' elements.`);
			}
		}

		this.isMenubar   = false;
		this.isMainPopup = isMainPopup;

		// domNode / popupMenuNode is of element type 'ul'
		this.domNode = domNode;

		// this.controller is either a MenubarItem or a MenuItem instance
		this.controller     = controllerObj;
		this.mainController = mainController;

		                       // TODO Rename to menuItems
		this.menuitems  = [];  // See PopupMenu init method
		this.firstChars = [];  // See PopupMenu init method

		this.firstItem = null;  // See PopupMenu init method
		this.lastItem  = null;  // See PopupMenu init method

		this.hasFocus = false; // See MenuItem handleFocus, handleBlur
		this.hasHover = false; // See PopupMenu handleMouseover, handleMouseout

		this.onOpen  = onOpen || function() {};
		this.onClose = onClose || function() {};
	}
	/*
	*   @method PopupMenu.prototype.init
	*
	*   @desc
	*       Add domNode event listeners for mouseover and mouseout. Traverse
	*       domNode children to configure each menuitem and populate menuitems
	*       array. Initialize firstItem and lastItem properties.
	*/
	init() {
		if (this.isMainPopup)
			this.domNode.addEventListener("mouseleave", this.handleMouseleave.bind(this));

		// Traverse the element children of domNode: configure each with
		// menuitem role behavior and store reference in menuitems array.
		const popupMenuNodeChildren = this.domNode.children;
		for (const popupMenuNodeChild of popupMenuNodeChildren) {
			const menuItemNode = popupMenuNodeChild.firstElementChild;
			if (menuItemNode && menuItemNode.tagName === "A") {
				const menuItem = new MenuItem(menuItemNode, this, this.mainController);
				menuItem.init();
				this.menuitems.push(menuItem);
				addToFirstChars(this.firstChars, menuItemNode);
			}
		}

		// Use populated menuitems array to initialize firstItem and lastItem.
		const numItems = this.menuitems.length;
		if (numItems > 0) {
			this.firstItem = this.menuitems[0];
			this.lastItem = this.menuitems[numItems - 1];
			// no tabIndex fiddely like in Menubar init because popupmenus should
			// not participate in tabbability
			// see https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-12
		}

	}
	handleMouseleave(event) {
		if (!isSmallScreenOrTouchOnly()) {
			this.hasHover = false;
			this.close(false);
			if (this.controller instanceof MenubarItem) {
			  const menubar = this.controller.menubar;
			  const newHoveredElement = event.relatedTarget;
			  if (! menubar.domNode.contains(newHoveredElement)) {
				// the pointer has moved outside the popupMenu AND
				// has not moved to any element within the menubar,
				// including the menubar itself, menu items,
				// their own popups
				menubar.directlyPopUp = false;
			  }
			}
		}
	}
	setFocusToController(command, flag) {

		if (typeof command !== "string")
			command = "";

		function setFocusToMenubarItem(controller, close) {
			while (controller) {
				if (controller.isMenubarItem) {
					controller.domNode.focus();

					return controller;
				}
				else {
					if (close)
						controller.menu.close(true);
					controller.hasFocus = false;
				}
				controller = controller.menu.controller;
			}
			return false;
		}

		if (command === "") {
			if (this.controller && this.controller.domNode)
				this.controller.domNode.focus();
			return;
		}

		if (!this.controller.isMenubarItem) {
			this.controller.domNode.focus();
			this.close();

			if (command === 'next') {
				var menubarItem = setFocusToMenubarItem(this.controller, false);
				if (menubarItem) {
					menubarItem.menu.setFocusToNextItem(menubarItem, flag);
				}
			}
		}
		else {
			if (command === 'previous') {
				this.controller.menu.setFocusToPreviousItem(this.controller, flag);
			}
			else if (command === 'next') {
				this.controller.menu.setFocusToNextItem(this.controller, flag);
			}
		}

	}
	setFocusToFirstItem() {
		this.firstItem.domNode.focus();
	}
	setFocusToLastItem() {
		this.lastItem.domNode.focus();
	}
	setFocusToPreviousItem(currentItem) {
		var index;

		if (currentItem === this.firstItem) {
			this.lastItem.domNode.focus();
		}
		else {
			index = this.menuitems.indexOf(currentItem);
			this.menuitems[index - 1].domNode.focus();
		}
	}
	setFocusToNextItem(currentItem) {
		var index;

		if (currentItem === this.lastItem) {
			this.firstItem.domNode.focus();
		}
		else {
			index = this.menuitems.indexOf(currentItem);
			this.menuitems[index + 1].domNode.focus();
		}
	}
	setFocusByFirstCharacter(currentItem, char) {
		var start, index, char = char.toLowerCase();

		// Get start index for search based on position of currentItem
		start = this.menuitems.indexOf(currentItem) + 1;
		if (start === this.menuitems.length) {
			start = 0;
		}

		// Check remaining slots in the menu
		index = this.getIndexFirstChars(start, char);

		// If not found in remaining slots, check from beginning
		if (index === -1) {
			index = this.getIndexFirstChars(0, char);
		}

		// If match was found...
		if (index > -1) {
			this.menuitems[index].domNode.focus();
		}
	}
	open() {
		if (!isSmallScreenOrTouchOnly()) {
			// only fade background if not responsive layout, as button trigger already takes care of fading
			this.onOpen();
		}
		this.controller.setExpanded(true);
	}
	close(force, shallCloseRecursively) {
		if (!isSmallScreenOrTouchOnly()) {
			// only unfade background if not responsive layout, as button trigger already takes care of fading
			this.onClose();
		}
		this.controller.setExpanded(false);
		if (shallCloseRecursively) {
			this.menuitems.forEach(menuItem => {
				if (menuItem.popupMenu) {
					menuItem.popupMenu.close(true, true);
				}
			});
		}
	}
	
	getIndexFirstChars = getIndexFirstChars;
}


class MenuItem {
	constructor(domNode, menuObj, mainController) {
		// domNode is of element type 'a'
		this.domNode = domNode;

		// menu / menuObj is containing PopupMenu controller
		this.menu = menuObj;

		this.mainController = mainController;

		this.popupMenu = false;
		this.isMenubarItem = false;
	}
	init() {
		// MenuItem's domNode shall not be tabbable, but can still be given focus with .focus()
		// see https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties-13
		this.domNode.tabIndex = -1;

		this.parentLi = this.domNode.parentNode;
		this.parentLi.addEventListener('click', this.handleListItemClick.bind(this));
		this.parentLi.addEventListener('mousedown', event => event.preventDefault()); // prevent currently focused element to loose focus to nirvana

		this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
		this.domNode.addEventListener('focus', this.handleFocus.bind(this));
		this.domNode.addEventListener('blur', this.handleBlur.bind(this));

		var nextElement = this.domNode.nextElementSibling;

		if (nextElement && nextElement.tagName === 'UL') {
			this.popupMenu = new PopupMenu(nextElement, this, false, null, null, this.mainController);
			this.popupMenu.init();
		}

	}
	handleKeydown(event) {
		event.currentTarget; var char = event.key, flag = false;

		function isPrintableCharacter(str) {
			return str.length === 1 && str.match(/\S/);
		}

		switch (event.keyCode) {
			case keyCode.RETURN:
				break;

			case keyCode.UP:
				this.menu.setFocusToPreviousItem(this);
				flag = true;
				break;

			case keyCode.DOWN:
				this.menu.setFocusToNextItem(this);
				flag = true;
				break;

			case keyCode.LEFT:
				if (isSmallScreenOrTouchOnly()) {
					this.menu.setFocusToController();
				}
				else {
					// to implement https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-12
					// on full screen popup menubar menus, when navigating left, directly open previous popup menu
					// this.menu.setFocusToController('previous', true);
					// but because this is actually confusing in navigation, we don't implement this behavior
					this.menu.setFocusToController();
				}
				this.menu.close(true);
				this.setExpanded(false);
				flag = true;
				break;

			case keyCode.RIGHT:
			case keyCode.SPACE:
				if (this.popupMenu) {
					this.setExpanded(true);
					this.popupMenu.open();
					this.popupMenu.setFocusToFirstItem();
				}
				flag = true;
				break;

			case keyCode.HOME:
			case keyCode.PAGEUP:
				this.menu.setFocusToFirstItem();
				flag = true;
				break;

			case keyCode.END:
			case keyCode.PAGEDOWN:
				this.menu.setFocusToLastItem();
				flag = true;
				break;

			case keyCode.ESC:
				this.menu.setFocusToController();
				this.setExpanded(false);
				this.menu.close(true);
				flag = true;
				break;

			case keyCode.TAB:
				// when tabbing, tab out of menu and close all open menus
				// see https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-12
				let currentMenu = this.menu;
				while (currentMenu && !currentMenu.isMenubar) {
					currentMenu.setFocusToController();
					currentMenu.close(true);
					currentMenu = currentMenu.controller.menu;
				}
				break;

			default:
				if (isPrintableCharacter(char)) {
					this.menu.setFocusByFirstCharacter(this, char);
					flag = true;
				}
				break;
		}

		if (flag) {
			event.stopPropagation();
			event.preventDefault();
		}
	}
	handleFocus() {
		this.menu.hasFocus = true;
	}
	handleBlur() {
		this.menu.hasFocus = false;
	}
	
	handleListItemClick = handleListItemClick;
	
	isExpanded() {
		const isExpanded = this.domNode.getAttribute('aria-expanded') === 'true';
		return isExpanded;
	}
	setExpanded(value) {
		if (value) {
			this.domNode.setAttribute('aria-expanded', 'true');
		}
		else {
			this.domNode.setAttribute('aria-expanded', 'false');
		}
	}
}

const fadeMainContentAndHighlightThisMegamenuOnOpenHandler = function() {
  fadeMainContent(this.mainController.popupMenu.parentNav, this.mainController.domNode);
};

const unfadeMainContentAndHighlightThisMegamenuOnCloseHandler = function() {
  unfadeMainContent(this.mainController.popupMenu.parentNav, this.mainController.domNode);
};

// menubuttonElements = document.getElementsByClassName('gs_mm_toggle_button');
const initializeMegamenus = function(menubuttonElements, onOpen, onClose) {
  const menubuttons = [];
  
  for (const menubuttonElement of menubuttonElements) {
	const menubutton = new Menubutton(menubuttonElement, onOpen, onClose);
	menubutton.init();
	menubuttons.push(menubutton);
  }
  
  return menubuttons;
};

// dynamic imports to keep gesis-web.js size small

// e.g.:
// const { YAML } = await importModule('/typo3conf/ext/gesis_web_ext/Resources/Public/webpack/node_modules/yaml/browser/dist/index.js');
// const yamlString = YAML.stringify({ number: 3, plain: 'string', block: 'two\nlines\n' });
// console.log(yamlString);
//
// const lodashModule = await importModule('https://cdn.jsdelivr.net/npm/lodash@4.17.21/+esm', 'lodash');
// const _ = lodashModule.default;
// _.chunk(['a', 'b', 'c', 'd'], 2);
const importModule = async function(moduleName, optionalModuleKey = null) {
  let result;
  const moduleKey = optionalModuleKey ?? moduleName;
  const isAlreadyImported = Object.hasOwn(window, moduleKey);
  
  if (isAlreadyImported) {
    result = window.moduleName;
  }
  else {
    // use webpackIgnore: true to not have webpack create a shim for import(..) here
    // see https://stackoverflow.com/a/69951351
    // result = (await import(/* webpackIgnore: true */ moduleName)).default;
    result = await import(/* webpackIgnore: true */ moduleName);
    // using ES6 computed property, see https://stackoverflow.com/a/35579786
    Object.assign(window, {[moduleKey]: result});
  }
  return result;
};

const getBeautify = async function() {
  let result;
  if (window.beautify) {
    result = window.beautify;
  }
  else {
    result = (await import('./index-517cf045.js').then(function (n) { return n.i; })).default;
    window.beautify = result;
  }
  return result;
};

// e.g.:
// const $ = await getJQuery();
// $('main') ...
const getJQuery = async function() {
  let result;
  if (window.jQuery) {
    result = window.jQuery;
  }
  else {
    result = (await import('./jquery-4b0590b2.js').then(function (n) { return n.j; })).default;
    window.$ = result;
    window.jQuery = result;
  }
  return result;
};

const getJQueryTablesorter = async function() {
  let result;
  if (window.tablesorter) {
    result = window.tablesorter;
  }
  else {
    // import 'tablesorter'; // default import pulls in jquery.tablesorter.combined.js, which with 94.7 kiB is unacceptably big
    // import 'tablesorter/dist/js/jquery.tablesorter'; // this import pulls in 42.2 kiB
    result = (await import('./jquery.tablesorter.combined-bc23efe6.js').then(function (n) { return n.j; })).default;
    window.tablesorter = result;
  }
  return result;
};

// as import('hljs') imports all kinds of obscure languages
// and creates a big gesis-web.js bundle,
// the following dynamic imports cherry-pick only those languages
// which are used frequently at GESIS
const getHighlightJs = async function() {
  let result;
  if (window.hljs) {
    result = window.hljs;
  }
  else {
    result = (await import('./core-13a6b9c0.js')).default;
    
    const javascript = (await import('./javascript-fd307765.js')).default;
    result.registerLanguage('javascript', javascript);
    
    const xml = (await import('./xml-40c19a10.js')).default;
    result.registerLanguage('xml', xml); // xml provides html/html5 highlighting
    
    const css = (await import('./css-b7d19921.js')).default;
    result.registerLanguage('css', css);
    
    const scss = (await import('./scss-66364847.js')).default;
    result.registerLanguage('scss', scss); // scss provides sass highlighting
    
    const python = (await import('./python-7fb403af.js')).default;
    result.registerLanguage('python', python);
    
    const bash = (await import('./bash-04b03598.js')).default;
    result.registerLanguage('bash', bash);
    
    const php = (await import('./php-b8e8a73a.js')).default;
    result.registerLanguage('php', php);
    
    const java = (await import('./java-bcb12552.js')).default;
    result.registerLanguage('java', java);
   
    window.hljs = result;
  }
  return result;
};

const getFancybox = async function() {
  let result;
  if (window.Fancybox) {
    result = window.Fancybox;
  }
  else {
    result = (await import('./fancybox.esm-cdb93b16.js')).Fancybox;
    window.Fancybox = result;
  }
  return result;
};

const getGesisDataTable = async function() {
  const result = (await import('./gesis-datatable-extend-1aa6b58f.js')).GesisDataTable;
  return result;
};

// BEGIN DataTables language localization
const paginatePreviousMarkup = '<i class="bi bi-caret-left-fill"></i>';
const paginateNextMarkup = '<i class="bi bi-caret-right-fill"></i>';

const getDataTableLanguageEn = async function() {
  // datatables does not (yet) provide en-US
  const result = (await import('./en-GB-24ed455e.js')).default;
  
  // modify existing language key values
  result.paginate.previous = paginatePreviousMarkup;
  result.paginate.next = paginateNextMarkup;
  
  // extend with additional language key-values
  result.aria.paginate = {
    ... result.aria.paginate,
    first: 'first page',
    previous: 'previous page',
    next: 'next page',
    last: 'last page',
    page: 'page',
    tablepagination: 'table pagination',
  };
  
  return result;
};

const getDataTableLanguageDe = async function() {
  const result = (await import('./de-DE-72395ba6.js')).default;
  
  // modify existing language key values
  result.paginate.previous = paginatePreviousMarkup;
  result.paginate.next = paginateNextMarkup;
  
  // extend with additional language key-values
  result.aria.paginate = {
    ... result.aria.paginate,
    first: 'erste Seite',
    previous: 'vorherige Seite',
    next: 'nächste Seite',
    last: 'letzte Seite',
    page: 'Seite',
    tablepagination: 'Tabellen-Paginierung',
  };
  
  return result;
};

// Fancyapps UI / Fancybox v4
// https://fancyapps.com/resources/releases/
// https://web.archive.org/web/20230108195740/https://fancyapps.com/docs/ui/fancybox/
const lazySetupFancybox = async function() {
  let result = null;
  // only import Fancybox, when there exists an element with attribute 'data-fancybox'
  // this is the magic marker which Fancybox v4 looks for upon import
  // to automatically set up Fancybox lightboxes
  const hasFancybox = document.querySelector('[data-fancybox]') ? true : false;
  if (hasFancybox) {
    const Fancybox = await getFancybox();
    // fix fancybox jerking background because of hiding scrollbar
    Fancybox.defaults.hideScrollbar = 'false';
    result = Fancybox;
  }
  return result;
};

const lazyHighlightAll = async function() {
  let result = null;
  // see https://highlightjs.org/usage/
  // highlight.js's hljs.highlightAll() matches on 'pre > code'
  const hasHighlightableCode = document.querySelector('pre > code') ? true : false;
  if (hasHighlightableCode) {
    const hljs = await getHighlightJs();
    hljs.highlightAll();
    result = hljs;
  }
  return result;
};

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

const lazySetupGesisDataTables = async function() {
  let initializedGesisDataTables = null;
  const gesisDataTableElements = document.querySelectorAll('.gesis-datatable table');
  if (
    gesisDataTableElements
    && 'length' in gesisDataTableElements
    && (gesisDataTableElements.length >= 1)
  ) {
    // only import GesisDataTable when there exists at least one element requiring it
    const GesisDataTable = await getGesisDataTable();
    
    initializedGesisDataTables = [];
    for (const gesisDataTableElement of gesisDataTableElements) {
      
      // check if this table element is not yet initialized as a DataTable
      // see https://datatables.net/manual/tech-notes/3#Object-instance-retrieval
      if ( ! GesisDataTable.isDataTable(gesisDataTableElement) ) {
        // WORKAROUND-DATATABLES: During initialization, DataTables creates a wrapper around the table element and its controls.
        // this messes up CSS styling rules for a potentially existing "table-responsive" div wrapper,
        // including the scroll faders on the left and right side.
        // to work around this issue, we first remove the "table-responsive" wrapper,
        // then later, gesis-datatable-extend.js' extended DataTable implementation
        // initializes the the custom DataTable instance with a specially crafted 'dom' option
        // which wraps the table in a "table-responsive" wrapper.
        const gesisDatatableElementParent = gesisDataTableElement.parentElement;
        const isTableResponsiveWrapped = gesisDatatableElementParent.classList.contains('table-responsive');
        if (isTableResponsiveWrapped) {
          gesisDatatableElementParent.insertAdjacentElement('beforebegin', gesisDataTableElement);
          gesisDatatableElementParent.remove();
        }
        
        const language = getLanguage();
        const datatablesLanguage = language === 'de' ? await getDataTableLanguageDe() : await getDataTableLanguageEn();
        
        const initializedGesisDataTable = new GesisDataTable(gesisDataTableElement, {
          language: datatablesLanguage,
          // avoid alert modal when trying to initialize an already initialized Datatable
          // see https://datatables.net/manual/tech-notes/3#retrieve
          retrieve: true,
        });
        
        initializedGesisDataTables.push(initializedGesisDataTable);
      }
      
    }
  }
  return initializedGesisDataTables;
};

export { GesisSearchWidget, Menubutton, Popup, TabContainer, VCard, appendDebug, conditionallyShow404ModalOnActiveResolvingStrategy, fadeMainContent, fadeMainContentAndHighlightThisMegamenuOnOpenHandler, getBeautify, getDataTableLanguageDe, getDataTableLanguageEn, getElementByXPath, getFancybox, getFocusableAncestors, getGesisDataTable, getHighlightJs, getJQuery, getJQueryTablesorter, getLanguage, getMeta, getMicrosite, getXPathForElement, importModule, initializeDialog, initializeGesisSearchWidget, initializeMegamenus, initializePopups, initializeSliderOptions, initializeSliders, initializeTabContainers, initializeVCards, isAppleMobileBrowser, isSmallScreenOrTouchOnly, keyCode$2 as keyCode, lazyHighlightAll, lazySetupFancybox, lazySetupGesisDataTables, replaceTag$1 as replaceTag, setupSkipLinks, setupTracking, showConfetti, tns, unfadeMainContent, unfadeMainContentAndHighlightThisMegamenuOnCloseHandler };
//# sourceMappingURL=gesis-web-frontend.js.map
