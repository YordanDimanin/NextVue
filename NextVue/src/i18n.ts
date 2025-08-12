import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-localstorage-backend';

// Import your translation files
import enTranslation from '../public/locales/en/translation.json';
import bgTranslation from '../public/locales/bg/translation.json';

i18n
  .use(Backend) // loads translations from your server
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: ['en', 'bg', 'ja', 'es', 'fr'], // fallback language if translation is not found
    debug: true, // Enable debug mode for development
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to your translation files
    },
    detection: {
      order: ['localStorage', 'navigator'], // Order of language detection
      caches: ['localStorage'], // Cache language in localStorage
    },
    resources: {
      'en': {
        translation: enTranslation,
      },
      'bg': {
        translation: bgTranslation,
      },
      'ja': {
        translation: {},
      },
      'es': {
        translation: {},
      },
      'fr': {
        translation: {},
      },
    },
  });

export default i18n;