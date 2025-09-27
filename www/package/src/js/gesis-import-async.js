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
    result = (await import('js-beautify')).default;
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
    result = (await import('jquery')).default;
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
    result = (await import('tablesorter')).default;
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
    result = (await import('highlight.js/lib/core')).default;
    
    const javascript = (await import('highlight.js/lib/languages/javascript')).default;
    result.registerLanguage('javascript', javascript);
    
    const xml = (await import('highlight.js/lib/languages/xml')).default;
    result.registerLanguage('xml', xml); // xml provides html/html5 highlighting
    
    const css = (await import('highlight.js/lib/languages/css')).default;
    result.registerLanguage('css', css);
    
    const scss = (await import('highlight.js/lib/languages/scss')).default;
    result.registerLanguage('scss', scss); // scss provides sass highlighting
    
    const python = (await import('highlight.js/lib/languages/python')).default;
    result.registerLanguage('python', python);
    
    const bash = (await import('highlight.js/lib/languages/bash')).default;
    result.registerLanguage('bash', bash);
    
    const php = (await import('highlight.js/lib/languages/php')).default;
    result.registerLanguage('php', php);
    
    const java = (await import('highlight.js/lib/languages/java')).default;
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
    result = (await import('@fancyapps/ui')).Fancybox;
    window.Fancybox = result;
  }
  return result;
};

const getGesisDataTable = async function() {
  const result = (await import('./gesis-datatable-extend.js')).GesisDataTable;
  return result;
};

// BEGIN DataTables language localization
const paginatePreviousMarkup = '<i class="bi bi-caret-left-fill"></i>';
const paginateNextMarkup = '<i class="bi bi-caret-right-fill"></i>';

const getDataTableLanguageEn = async function() {
  // datatables does not (yet) provide en-US
  const result = (await import('datatables.net-plugins/i18n/en-GB.mjs')).default;
  
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
  const result = (await import('datatables.net-plugins/i18n/de-DE.mjs')).default;
  
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
// END DataTables language localization

export {
  importModule,
  getBeautify,
  getJQuery,
  getJQueryTablesorter,
  getHighlightJs,
  getFancybox,
  getGesisDataTable,
  getDataTableLanguageEn,
  getDataTableLanguageDe,
};
