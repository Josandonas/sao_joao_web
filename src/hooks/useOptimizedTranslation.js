import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTranslationCache } from '../contexts/TranslationContext';

/**
 * Hook personalizado que otimiza o uso de traduções com cache
 * @param {string} namespace - Namespace da tradução (opcional)
 * @returns {Object} Objeto com funções e estado de tradução otimizados
 */
const useOptimizedTranslation = (namespace = 'translation') => {
  const { i18n, t: originalT } = useTranslation(namespace);
  const { getTranslation, translations, loading } = useTranslationCache();
  const [isReady, setIsReady] = useState(false);

  // Carregar traduções do cache ou do i18n
  useEffect(() => {
    const currentLang = i18n.language;
    
    // Verificar se já temos as traduções em cache
    if (translations[currentLang]?.[namespace]) {
      setIsReady(true);
      return;
    }

    // Carregar traduções
    const loadTranslations = async () => {
      await getTranslation(currentLang, namespace);
      setIsReady(true);
    };

    loadTranslations();
  }, [i18n.language, namespace, getTranslation, translations]);

  // Função otimizada para tradução
  const t = useCallback((key, options) => {
    return originalT(key, options);
  }, [originalT]);

  // Função para mudar o idioma
  const changeLanguage = useCallback(async (lang) => {
    // Pré-carregar as traduções do novo idioma
    if (!translations[lang]?.[namespace]) {
      await getTranslation(lang, namespace);
    }
    // Mudar o idioma no i18n
    await i18n.changeLanguage(lang);
  }, [i18n, getTranslation, translations, namespace]);

  return {
    t,
    i18n,
    changeLanguage,
    isReady,
    loading,
    language: i18n.language
  };
};

export default useOptimizedTranslation;
