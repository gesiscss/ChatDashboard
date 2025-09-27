// This entry script is not processed by webpack, but by rollup,
// using the configuration file "rollup.config.mjs",
// producing a pure EcmaScript module (esm).
// its build artifacts are placed into dist/lib/ ,
// with the main processed module file being "dist/lib/gesis-web-frontend.js",
// just as configured in package.json -> "module" and "main" properties.

// see https://docs.npmjs.com/about-packages-and-modules
// see https://docs.npmjs.com/cli/v9/configuring-npm/package-json#main
// see https://docs.npmjs.com/cli/v9/configuring-npm/package-json#browser
// see https://esbuild.github.io/api/#main-fields
// see https://stackoverflow.com/q/42708484
// see https://stackoverflow.com/questions/32037150/style-field-in-package-json
// see https://stackoverflow.com/questions/42708484/what-is-the-module-package-json-field-for

export * from './js/gesis-helpers.js';
export * from './js/gesis-accessibility.js';
export * from './js/gesis-slider.js';
export * from './js/gesis-search.js';
export * from './js/gesis-popup.js';
export * from './js/gesis-tabs.js';
export * from './js/gesis-tracking.js';
export * from './js/gesis-vcard.js';
export * from './js/gesis-megamenu.js';
export * from './js/gesis-import-async.js';
export * from './js/gesis-fancybox.js';
export * from './js/gesis-highlightjs.js';
export * from './js/gesis-dialog.js';
export * from './js/gesis-datatables.js';
