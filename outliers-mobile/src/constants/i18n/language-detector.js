import { Platform, NativeModules } from 'react-native';

let locale
if (Platform.OS === 'android') {
  locale = NativeModules.I18nManager.localeIdentifier;
} else {
  locale = NativeModules.SettingsManager.settings.AppleLocale;
}

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    callback(locale.substring(0, 2));
  },
  init: () => {
  },
  cacheUserLanguage: () => {
  },
};

export default languageDetector;
