import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import enTranslation from '../public/locales/en/translation.json';
import bgTranslation from '../public/locales/bg/translation.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      'en-US': {
        translation: enTranslation,
      },
      'bg-BG': {
        translation: bgTranslation,
      },
    },
    lng: 'en-US', // default language
    fallbackLng: 'en-US', // fallback language if translation is not found
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;