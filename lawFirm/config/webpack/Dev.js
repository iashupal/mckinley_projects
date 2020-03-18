/* eslint-disable prefer-destructuring */
/**
 * Default dev server configuration.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');

class WebpackDevConfig extends WebpackBaseConfig {
  constructor() {
    super();
    this.isDev = true;
    this.config = {
      mode: 'development',
      entry: ['@babel/polyfill', 'webpack/hot/only-dev-server', 'react-hot-loader/patch', './index.js'],
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
      ],
    };
  }
}

module.exports = WebpackDevConfig;
