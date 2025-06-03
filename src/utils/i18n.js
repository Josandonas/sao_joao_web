import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importação dos recursos de idiomas
import translationPT from '../locales/pt.json';
import translationEN from '../locales/en.json';
import translationES from '../locales/es.json';

// Configuração dos recursos
const resources = {
  pt: {
    translation: translationPT
  },
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt', // Idioma padrão
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false // React já faz escape por padrão
    }
  });

export default i18n;
