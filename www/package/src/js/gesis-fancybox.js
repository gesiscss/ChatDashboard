import {
  getFancybox,
} from './gesis-import-async.js';

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

export {
  lazySetupFancybox,
};
