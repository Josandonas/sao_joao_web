/**
 * Serviço de API para o módulo Book (Livro Digital)
 * Responsável por buscar, enviar e processar dados do livro digital
 */

import api, { delay, isApiAvailable } from './index';

const ENDPOINT = '/book';

/**
 * Busca todos os capítulos do livro
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de capítulos
 */
export const fetchBookChapters = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('book_chapters_data');
        if (storedData) {
          return JSON.parse(storedData) || [];
        }
        return [];
      } catch (error) {
        console.error('Erro ao buscar capítulos do livro do localStorage:', error);
        return [];
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/chapters`, { params: { lang } });
    return response.data.chapters || [];
  } catch (error) {
    console.error('Erro ao buscar capítulos do livro:', error);
    
    // Em caso de erro, tenta usar o localStorage como fallback
    if (import.meta.env.DEV) {
      try {
        const storedData = localStorage.getItem('book_chapters_data');
        if (storedData) {
          console.warn('Usando dados armazenados devido a erro na API');
          return JSON.parse(storedData) || [];
        }
      } catch (fallbackError) {
        console.error('Erro ao carregar dados de fallback:', fallbackError);
      }
    }
    
    return [];
  }
};

/**
 * Busca um capítulo específico por ID
 * @param {string} id - ID do capítulo
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object|null>} Capítulo encontrado ou null
 */
export const getChapterById = async (id, lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('book_chapters_data');
        if (storedData) {
          const chapters = JSON.parse(storedData);
          return chapters.find(chapter => chapter.id === id) || null;
        }
        return null;
      } catch (error) {
        console.error(`Erro ao buscar capítulo ID ${id} do localStorage:`, error);
        return null;
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/chapters/${id}`, { params: { lang } });
    return response.data || null;
  } catch (error) {
    console.error(`Erro ao buscar capítulo ID ${id}:`, error);
    return null;
  }
};

/**
 * Busca o sumário do livro
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} Sumário do livro
 */
export const getBookSummary = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('book_summary_data');
        if (storedData) {
          return JSON.parse(storedData) || {};
        }
        return {};
      } catch (error) {
        console.error('Erro ao buscar sumário do livro do localStorage:', error);
        return {};
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/summary`, { params: { lang } });
    return response.data || {};
  } catch (error) {
    console.error('Erro ao buscar sumário do livro:', error);
    return {};
  }
};

/**
 * Busca metadados do livro (título, autor, etc)
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} Metadados do livro
 */
export const getBookMetadata = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('book_metadata');
        if (storedData) {
          return JSON.parse(storedData) || {};
        }
        return {};
      } catch (error) {
        console.error('Erro ao buscar metadados do livro do localStorage:', error);
        return {};
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/metadata`, { params: { lang } });
    return response.data || {};
  } catch (error) {
    console.error('Erro ao buscar metadados do livro:', error);
    return {};
  }
};

export default {
  fetchBookChapters,
  getChapterById,
  getBookSummary,
  getBookMetadata
};
