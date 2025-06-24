'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translations } from './translations';

const initI18n = async () => {
  if (!i18n.isInitialized) {
    await i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: translations,
        fallbackLng: 'en',
        debug: false,
        
        detection: {
          order: ['localStorage', 'navigator', 'htmlTag'],
          caches: ['localStorage'],
        },
        
        interpolation: {
          escapeValue: false,
        },
      });
  }
  return i18n;
};

// Initialize i18n
initI18n();

export default i18n; 