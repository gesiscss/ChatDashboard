# GESIS-Web Frontend Framework – `@gesis-web/gesis-web-frontend`

## Introduction
The *GESIS-Web Frontend Framework* provides reusable JavaScript and CSS assets which allow to create websites according to the [*GESIS-Web Styleguide*](https://www.gesis.org/styleguide/home). It includes common [web widgets](https://www.gesis.org/styleguide/widgets), which adhere to responsive and accessibility best practices.

Its JavaScript and CSS assets are built with [*webpack*](https://webpack.js.org/concepts/) and [*rollup*](https://rollupjs.org/introduction/), and are published as [*npm* package](https://docs.npmjs.com/) `@gesis-web/gesis-web-frontend` to GESIS' GitLab instance under the *npm package registry endpoint* `https://git.gesis.org/api/v4/projects/2764/packages/npm/` ([human web interface](https://git.gesis.org/gesis-web/public-dependency-registry/-/packages)).

All build- and asset-related files are contained within the [**private** GESIS GitLab project *gesis-web/gesis_web_ext*](https://git.gesis.org/gesis-web/gesis_web_ext), under [its subdirectory `/Resources/Public/webpack/`](https://git.gesis.org/gesis-web/gesis_web_ext/-/tree/master/Resources/Public/webpack).

The build output directory is `dist/` (that is, git repository *gesis-web/gesis_web_ext*'s subdirectory `/Resources/Public/webpack/dist/`).

The build provides two ways of incorporating the *GESIS-Web Frontend Framework*:
* **When using *GESIS-Web Frontend Framework* as an *npm* dependency**, `dist/gesis-web-frontend.js` and `dist/gesis-web.css` provide JavaScript functionality and CSS styling, respectively.
`dist/gesis-web-frontend.js` **does not** automatically initialize any GESIS-Web widgets. It is up to the depending project to initialize GESIS-Web widgets at *`DOMContentLoaded` event listener time*.
* **When using *GESIS-Web Frontend Framework* for TYPO3 (e.g. https://www.gesis.org/ )**, `dist/gesis-web.js` and `dist/gesis-web.css` provide JavaScript functionality and CSS styling, respectively. `dist/gesis-web.js` **does** automatically initialize any identified GESIS-Web widgets when the `DOMContentLoaded` event is fired for the HTML document.

Widget documentation and live demos are available at the following addresses:
* https://www.gesis.org/styleguide
* https://www.gesis.org/styleguide/gesis-web-frontend-framework – downloadable ZIP archive bundle for reusing the *GESIS-Web Frontend Framework* without *npm*
* https://www.gesis.org/styleguide/widgets – live widget demos

## Using `@gesis-web/gesis-web-frontend` as an *npm* dependency

### Example project
https://git.gesis.org/gesis-web/gesis-web-frontend-webpack-example is an *webpack* build example project using `@gesis-web/gesis-web-frontend` as an npm dependency.

### Setup for reusing `@gesis-web/gesis-web-frontend` as an *npm* dependency

* Have an *npm* project, e.g. by initializing an empty directory:
  ```
  npm init
  # will set up a file "package.json" in the current working directory
  ```
* Inside the *npm* project directory, create a file `.npmrc` which tells *npm* where to find packages for [*npm package scope*](https://docs.npmjs.com/cli/v9/using-npm/scope) `@gesis-web` (this step is required because `@gesis-web/gesis-web-frontend` is *not* published to the default [*public npm registry*](https://docs.npmjs.com/cli/v8/using-npm/registry):
  ```
  echo "@gesis-web:registry=https://git.gesis.org/api/v4/projects/2764/packages/npm/" >>.npmrc
  ```
* Add `@gesis-web/gesis-web-frontend` as an dependency:
  ```
  npm install @gesis-web/gesis-web-frontend
  ```
* From this point forward, build tools such as *webpack* will consult `@gesis-web/gesis-web-frontend` → `package.json`'s properties `"main"`, `"module"`, `"style"`, and `"sass"` to resolve JavaScript and CSS/SCSS/Sass `@gesis-web/gesis-web-frontend` *imports*:
  * for JavaScript: `import { ... } from '@gesis-web/gesis-web-frontend';`
  * for CSS/Sass: `@import "@gesis-web/gesis-web-frontend";`

## Development
This section is only relevant for `@gesis-web/gesis-web-frontend` maintainers.

### Prerequisites for building
“*Building*” means “*using sources inside `src/` to create derived assets inside `dist/`*”.
 
* Install *Node.js* `v18.16.0` or better (check currently installed version with `node --version`)
  * *Node.js* installation instructions:
    * *Node.js* installation via package manager: https://nodejs.org/en/download/package-manager
    * *Node.js* installation via installer: https://nodejs.org/en/download
  * *Node.js* will provide the command line tool *npm* `9.5.0` or better (check currently installed version `npm --version`)
* Initialize *gesis_web_ext* npm environment:
  ```
  cd ~/git/
  
  # clone "gesis_web_ext" git repository.
  # "gesis_web_ext" is a TYPO3 extension, within which npm package "@gesis-web/gesis-web-frontend"'s source code resides,
  # at subdirectory "Resources/Public/webpack/"
  git clone https://git.gesis.org/gesis-web/gesis_web_ext.git
  
  # change the curent working directory to the npm package directory
  cd gesis_web_ext/Resources/Public/webpack/
  
  # one-time initiate npm (development) packages
  npm install
  ```

###  Building
`package.json` provides the *script* `npm run build`. Executing this command will ...
* bump `package.json` → `"version"`'s  [*pre-release*](https://semver.org/#backusnaur-form-grammar-for-valid-semver-versions) to the current *UTC Zulu time second-resolution timestamp* (e.g. the `20230516T135322Z` in `1.1.0-20230516T135322Z`),
* run `webpack` to build `dist/gesis-web.js` and `dist/gesis-web.css` according to `webpack.config.js`,
* run `rollup` to build `dist/gesis-web-frontend.js` according to `rollup.config.mjs`.

#### Example build workflow
```
  # update dependencies
  npm update
  
  # make changes to files within "Resources/Public/webpack/src/",
  # then build (i.e. generate derived build assets within "Resources/Public/webpack/dist/")
  npm run build
```

#### Bundle size analysis
```
# prerequisite: install source-map-explorer
# as Unix user root, run the following command
npm install -g source-map-explorer

# to get a treemap of gesis-web.js, run the following command
cd ${GESIS_WEB_EXT}/Resources/Public/webpack
source-map-explorer dist/gesis-web.js
```

### Publishing `@gesis-web/gesis-web-frontend`
```
npm publish
```

On successful publishing, the new version will be available at GESIS' GitLab instance at a [*GitLab project-specific package registry*](https://docs.gitlab.com/ee/user/packages/package_registry/) under the *npm package registry* endpoint `https://git.gesis.org/api/v4/projects/2764/packages/npm/` ([human web interface](https://git.gesis.org/gesis-web/public-dependency-registry/-/packages)).

GitLab's *npm* registries do not allow to (re-)publish/overwrite *npm* packages with a version that has already been published. This is a *good thing*.

Notice that the *source code* for `@gesis-web/gesis-web-frontend` resides within GitLab project [*gesis-web/**gesis_web_ext***](https://git.gesis.org/gesis-web/gesis_web_ext) (a private GitLab project), while the *published npm package* resides within GitLab project [*gesis-web/**public-dependency-registry***](https://git.gesis.org/gesis-web/public-dependency-registry).
