import React, { createContext, useReducer, useContext, useEffect } from 'react';
import i18n from '../utils/i18n';

// Versão do cache para controle de invalidação
const CACHE_VERSION = '1.0.0';
const CACHE_KEY = 'sao_joao_translations';

// Estado inicial
const initialState = {
  translations: {},
  version: CACHE_VERSION,
  loading: false
};

// Ações
const actions = {
  SET_TRANSLATIONS: 'SET_TRANSLATIONS',
  SET_LOADING: 'SET_LOADING',
  CLEAR_CACHE: 'CLEAR_CACHE'
};

// Reducer para gerenciar o estado
const translationReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_TRANSLATIONS:
      return {
        ...state,
        translations: {
          ...state.translations,
          [action.language]: {
            ...state.translations[action.language],
            ...action.payload
          }
        },
        loading: false
      };
    case actions.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case actions.CLEAR_CACHE:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Criar o contexto
const TranslationContext = createContext();

// Provider component
export const TranslationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(translationReducer, initialState);

  // Carregar cache do localStorage na inicialização
  useEffect(() => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        
        // Verificar se a versão do cache é a atual
        if (parsedData.version === CACHE_VERSION) {
          // Restaurar traduções do cache
          Object.keys(parsedData.translations).forEach(lang => {
            dispatch({
              type: actions.SET_TRANSLATIONS,
              language: lang,
              payload: parsedData.translations[lang]
            });
          });
        } else {
          // Versão diferente, limpar cache
          localStorage.removeItem(CACHE_KEY);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar cache de traduções:', error);
      localStorage.removeItem(CACHE_KEY);
    }
  }, []);

  // Persistir no localStorage quando o estado mudar
  useEffect(() => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        translations: state.translations,
        version: CACHE_VERSION
      }));
    } catch (error) {
      console.error('Erro ao salvar cache de traduções:', error);
    }
  }, [state.translations]);

  // Função para buscar traduções
  const getTranslation = async (language, namespace = 'translation') => {
    // Verificar se já temos a tradução em cache
    if (state.translations[language]?.[namespace]) {
      return state.translations[language][namespace];
    }

    // Definir loading
    dispatch({ type: actions.SET_LOADING, payload: true });

    try {
      // Carregar tradução via i18n
      await i18n.changeLanguage(language);
      const translations = i18n.getResourceBundle(language, namespace);

      // Atualizar o cache
      dispatch({
        type: actions.SET_TRANSLATIONS,
        language,
        payload: { [namespace]: translations }
      });

      return translations;
    } catch (error) {
      console.error(`Erro ao carregar traduções para ${language}:`, error);
      dispatch({ type: actions.SET_LOADING, payload: false });
      return null;
    }
  };

  // Limpar cache
  const clearCache = () => {
    dispatch({ type: actions.CLEAR_CACHE });
    localStorage.removeItem(CACHE_KEY);
  };

  const value = {
    ...state,
    getTranslation,
    clearCache
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useTranslationCache = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslationCache deve ser usado dentro de um TranslationProvider');
  }
  return context;
};
