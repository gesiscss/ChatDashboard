const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

// list of plugins active by default: https://webpack.js.org/configuration/mode/
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/*
// NOTICE
// using GitRevisionPlugin, commit information will always be one commit
// before the actual commit.
// Also, branch information will be stale/deceptive when git-merging.
// To not cause confusion and false assumptions, don't include any git information
// into webpack build.

const { GitRevisionPlugin } = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin({
  // the following assumes git version 2.39.2 and git-revision-webpack-plugin version 5.0.0
  //
  // if the webpack build user's ~/.gitconfig is configured to always show commit signatures, i.e.
  // ...
  // [log]
  //      showSignature = true
  // ...
  // then GitRevisionPlugin's lastcommitdatetime() will provide a broken lastcommitdatetime
  // with signature information.
  //
  // Therefore, the following lastCommitDateTimeCommand configuration makes sure that
  // lastcommitdatetime only includes the datetime and not signature information
  lastCommitDateTimeCommand: 'log --no-show-signature -1 --format=%cI'
});

const gitVersion = JSON.stringify(gitRevisionPlugin.version());
const gitCommithash = JSON.stringify(gitRevisionPlugin.commithash());
const gitLastcommitdatetime = JSON.stringify(gitRevisionPlugin.lastcommitdatetime());
const gitBranch = JSON.stringify(gitRevisionPlugin.branch());

console.log("gitVersion=", gitVersion);
console.log("gitCommithash=", gitCommithash);
console.log("gitBranch=", gitBranch);
console.log("gitLastcommitdatetime=", gitLastcommitdatetime);
*/

// SpeedMeasurePlugin not working as of Webpack 5 2021-09-13, see https://github.com/stephencookdev/speed-measure-webpack-plugin/issues/167
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
// module.exports = smp.wrap({
module.exports = {
  // for default options, see https://github.com/webpack/webpack/blob/main/lib/config/defaults.js
  
  // see https://webpack.js.org/configuration/experiments/
  /*
  experiments: {
    outputModule: true,
  },
  */
  
  // see https://webpack.js.org/configuration/mode/
  mode: 'production',
  
  // see https://webpack.js.org/concepts/entry-points/
  // entry: './src/index.js',
  // see https://webpack.js.org/concepts/entry-points/#object-syntax
  entry: {
    'gesis-web': './src/gesis-web.js',
    
    // webpack is not suitable for building ECMAScript modules
    // therefore, src/gesis-web-frontend.js is build by rollup to
    // output file dist/gesis-web-frontend.js . This output file
    // then is referenced in package.json's "module" property
    // 'gesis-web-frontend': './src/gesis-web-frontend.js',
  },
  
  // see https://webpack.js.org/concepts/output/
  output: {
    // see https://webpack.js.org/configuration/output/#outputpath
    path: path.resolve(__dirname, 'dist'),
    // see https://webpack.js.org/configuration/output/#outputfilename
    // filename: 'gesis-web.js',
    filename: '[name].js',
    // see https://webpack.js.org/configuration/output/#outputlibrary
    // library: 'MyLibrary',
    // see https://webpack.js.org/configuration/output/#librarytarget-module
    // libraryTarget: 'module', // breaks full frontend, but works with downstream dependencies
    // libraryTarget: 'commonjs2',
    /*
    library: {
      // see https://webpack.js.org/configuration/output/#type-module
      type: 'module',
    },
    */
  },
  
  devtool: 'source-map',
  optimization: {
    // see https://webpack.js.org/configuration/optimization/#optimizationminimizer
    minimizer: [
      new TerserPlugin({
        parallel: true,
        // see https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        terserOptions: {
          // see https://terser.org/docs/api-reference#format-options
          format: {
            // beautify: true,
            // indent_level: 2,
            preserve_annotations: true,
            semicolons: false, // semicolon: false makes reading the minimized .js files much easier
          }
        },
      }),
    ],
  },
  devServer: {
    contentBase: './dist',
  },
  
  plugins: [
    // see https://stackoverflow.com/a/59237067
    new MiniCssExtractPlugin({
      filename: 'gesis-web.css',
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      inject: false,
      minify: false,
      template: 'src/index.html'
    }),
    // gitRevisionPlugin,
    new webpack.DefinePlugin({
      // VERSION: gitVersion,
      // COMMITHASH: gitCommithash,
      // LASTCOMMITDATETIME: gitLastcommitdatetime,
      // BRANCH: gitBranch,
      GESIS_WEB_FRONTEND_PACKAGE_VERSION: JSON.stringify(pkg.version),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/img', to: 'img' },
        { from: 'src/dflip', to: 'dflip' },
        { from: 'src/font', to: 'font' },
        { from: 'node_modules/bootstrap-icons/font/fonts', to: 'font/bootstrap-icons' },
      ]
    })
  ],
  module: {
    rules: [
      /*
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2)$/i,
        type: 'asset/resource',
      },
      */
      {
        test: /\.(scss)$/,
        use: [
          // By default, webpack produces a bundle JS with CSS-in-JS.
          // MiniCssExtractPlugin is used to create a separate .css file.
          // see https://stackoverflow.com/a/59237067
          // see https://getbootstrap.com/docs/5.2/getting-started/webpack/#extracting-css
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          { 
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          },
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      /*
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: {
            exposes:  ['$', 'jQuery']
          }
        }]
      },
      */
     /*
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              "exclude":  [
                // \\ for Windows, \/ for Mac OS and Linux
                /node_modules[\\\/]core-js/,
                /node_modules[\\\/]webpack[\\\/]buildin/,
              ],
              presets: [
                '@babel/preset-env',
                {
                  'plugins': ['@babel/plugin-proposal-class-properties']
                }
              ]
            }
          },
        ]
      },
      */
    ]
  }
// });
};
