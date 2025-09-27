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
const replaceTag = function(element, tagName) {
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

const keyCode = Object.freeze({
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

export {
  getFocusableAncestors,
  fadeMainContent,
  unfadeMainContent,
  isSmallScreenOrTouchOnly,
  getMeta,
  getMicrosite,
  getLanguage,
  isAppleMobileBrowser,
  appendDebug,
  replaceTag,
  getXPathForElement,
  getElementByXPath,
  showConfetti,
  keyCode,
};
