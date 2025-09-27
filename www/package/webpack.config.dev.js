const prodConf = require('./webpack.config.js');

const devConf = {
  ...prodConf,
  mode: 'development',
  devtool: 'source-map'
};

module.exports = devConf;
