import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-localstorage-backend';

// Import your translation files
import enTranslation from '../public/locales/en/translation.json';
import bgTranslation from '../public/locales/bg/translation.json';

i18n
  .use(Backend) // loads translations from your server
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en-US', // fallback language if translation is not found
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
      'en-US': {
        translation: enTranslation,
      },
      'bg-BG': {
        translation: bgTranslation,
      },
    },
  });

export default i18n;