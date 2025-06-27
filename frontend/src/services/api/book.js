/**
 * Serviço de API para o módulo Book (Livro Digital)
 * Responsável por buscar, enviar e processar dados do livro digital
 */

import api, { delay, isApiAvailable } from './index';

// Constantes para endpoints da API
const ENDPOINT = '/book';
const BOOKS_ENDPOINT = '/books';

// Constantes para armazenamento local
const STORAGE_KEYS = {
  BOOKS_DATA: 'books_collection_data',
  BOOK_CHAPTERS_DATA: 'book_chapters_data',
  BOOK_SUMMARY_DATA: 'book_summary_data',
  BOOK_METADATA: 'book_metadata'
};

/**
 * Recupera dados do localStorage
 * @param {string} key - Chave de armazenamento
 * @param {boolean} showWarning - Se deve mostrar aviso de uso de dados locais
 * @returns {Array|Object|null} - Dados armazenados ou null em caso de erro
 */
const getStoredData = (key, showWarning = false) => {
  try {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      if (showWarning) {
        console.warn(`Usando dados armazenados de ${key} devido a erro na API`);
      }
      return JSON.parse(storedData) || null;
    }
    return null;
  } catch (error) {
    console.error(`Erro ao recuperar dados de ${key} do localStorage:`, error);
    return null;
  }
};

/**
 * Busca uma coleção de livros disponíveis
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de livros disponíveis
 */
export const fetchBooks = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      const storedBooks = getStoredData(STORAGE_KEYS.BOOKS_DATA);
      return storedBooks || [];
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(BOOKS_ENDPOINT, { params: { lang } });
    
    // Armazena os dados no localStorage para uso offline
    if (response.data && import.meta.env.DEV) {
      try {
        localStorage.setItem(STORAGE_KEYS.BOOKS_DATA, JSON.stringify(response.data.books || []));
      } catch (storageError) {
        console.error('Erro ao armazenar dados dos livros no localStorage:', storageError);
      }
    }
    
    return response.data.books || [];
  } catch (error) {
    console.error('Erro ao buscar coleção de livros:', error);
    
    // Em caso de erro, tenta usar o localStorage como fallback
    if (import.meta.env.DEV) {
      const storedBooks = getStoredData(STORAGE_KEYS.BOOKS_DATA, true);
      return storedBooks || [];
    }
    
    return [];
  }
};

/**
 * Busca um livro específico por ano
 * @param {number} year - Ano do livro
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object|null>} Livro encontrado ou null
 */
export const getBookByYear = async (year, lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      const storedBooks = getStoredData(STORAGE_KEYS.BOOKS_DATA);
      if (storedBooks) {
        return storedBooks.find(book => book.year === year) || null;
      }
      return null;
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${BOOKS_ENDPOINT}/${year}`, { params: { lang } });
    return response.data || null;
  } catch (error) {
    console.error(`Erro ao buscar livro do ano ${year}:`, error);
    
    // Em caso de erro, tenta usar o localStorage como fallback
    if (import.meta.env.DEV) {
      const storedBooks = getStoredData(STORAGE_KEYS.BOOKS_DATA, true);
      if (storedBooks) {
        return storedBooks.find(book => book.year === year) || null;
      }
    }
    
    return null;
  }
};

/**
 * Busca todos os capítulos do livro
 * @param {string} lang - Idioma atual (pt, en, es)
 * @param {number} year - Ano do livro (opcional)
 * @returns {Promise<Array>} Lista de capítulos
 */
export const fetchBookChapters = async (lang = 'pt', year = null) => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      const storedData = getStoredData(STORAGE_KEYS.BOOK_CHAPTERS_DATA);
      return storedData || [];
    }

    // Com API disponível, faz a requisição real
    const endpoint = year ? `${BOOKS_ENDPOINT}/${year}/chapters` : `${ENDPOINT}/chapters`;
    const response = await api.get(endpoint, { params: { lang } });
    return response.data.chapters || [];
  } catch (error) {
    console.error('Erro ao buscar capítulos do livro:', error);
    
    // Em caso de erro, tenta usar o localStorage como fallback
    if (import.meta.env.DEV) {
      const storedData = getStoredData(STORAGE_KEYS.BOOK_CHAPTERS_DATA, true);
      return storedData || [];
    }
    
    return [];
  }
};

/**
 * Busca um capítulo específico por ID
 * @param {string} id - ID do capítulo
 * @param {string} lang - Idioma atual (pt, en, es)
 * @param {number} year - Ano do livro (opcional)
 * @returns {Promise<Object|null>} Capítulo encontrado ou null
 */
export const getChapterById = async (id, lang = 'pt', year = null) => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      const storedData = getStoredData(STORAGE_KEYS.BOOK_CHAPTERS_DATA);
      if (storedData) {
        return storedData.find(chapter => chapter.id === id) || null;
      }
      return null;
    }

    // Com API disponível, faz a requisição real
    const endpoint = year ? `${BOOKS_ENDPOINT}/${year}/chapters/${id}` : `${ENDPOINT}/chapters/${id}`;
    const response = await api.get(endpoint, { params: { lang } });
    return response.data || null;
  } catch (error) {
    console.error(`Erro ao buscar capítulo ID ${id}:`, error);
    return null;
  }
};

/**
 * Busca o sumário do livro
 * @param {string} lang - Idioma atual (pt, en, es)
 * @param {number} year - Ano do livro (opcional)
 * @returns {Promise<Object>} Sumário do livro
 */
export const getBookSummary = async (lang = 'pt', year = null) => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      const storedData = getStoredData(STORAGE_KEYS.BOOK_SUMMARY_DATA);
      return storedData || {};
    }

    // Com API disponível, faz a requisição real
    const endpoint = year ? `${BOOKS_ENDPOINT}/${year}/summary` : `${ENDPOINT}/summary`;
    const response = await api.get(endpoint, { params: { lang } });
    return response.data || {};
  } catch (error) {
    console.error('Erro ao buscar sumário do livro:', error);
    return {};
  }
};

/**
 * Busca metadados do livro (título, autor, etc)
 * @param {string} lang - Idioma atual (pt, en, es)
 * @param {number} year - Ano do livro (opcional)
 * @returns {Promise<Object>} Metadados do livro
 */
export const getBookMetadata = async (lang = 'pt', year = null) => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      const storedData = getStoredData(STORAGE_KEYS.BOOK_METADATA);
      return storedData || {};
    }

    // Com API disponível, faz a requisição real
    const endpoint = year ? `${BOOKS_ENDPOINT}/${year}/metadata` : `${ENDPOINT}/metadata`;
    const response = await api.get(endpoint, { params: { lang } });
    return response.data || {};
  } catch (error) {
    console.error('Erro ao buscar metadados do livro:', error);
    return {};
  }
};

export default {
  fetchBooks,
  getBookByYear,
  fetchBookChapters,
  getChapterById,
  getBookSummary,
  getBookMetadata
};
