const webpackConfigs = require('./config/webpack');

module.exports = configName => {
  const defaultConfig = 'dev';
  const requestedConfig = configName || defaultConfig;

  let LoadedConfig = webpackConfigs[requestedConfig];
  if (!LoadedConfig) {
    console.warn(`
Provided environment "${configName}" was not found.
Please use one of the following ones: ${Object.keys(webpackConfigs).join(' ')}
    `);
    LoadedConfig = webpackConfigs[defaultConfig];
  }

  const loadedInstance = new LoadedConfig();
  process.env.NODE_ENV = loadedInstance.env; // global environment
  return loadedInstance.config;
};
