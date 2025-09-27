import {
  getHighlightJs,
} from './gesis-import-async.js';

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

export {
  lazyHighlightAll,
};
