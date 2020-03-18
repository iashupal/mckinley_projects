import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import en from '../lang/en.json';
import ko from '../lang/ko.json';
// import i18nextAsync from './i18nextAsync';
import languageDetector from './i18n/language-detector'

i18n
  // .use(languageDetector)
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'ko',
    resources: {
      en,
      ko,
    },
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    // Disable this to show log info in console
    debug: false,
    // cache: {
    //   enabled: true
    // },
    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n;
