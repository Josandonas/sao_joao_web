/**
 * Serviço de API para o módulo Biblioteca
 * Responsável por buscar, enviar e processar dados da biblioteca digital
 * e da galeria de imagens
 */

import api, { delay, isApiAvailable } from './index';

// Constantes para endpoints da API
const BIBLIOTECA_ENDPOINT = '/biblioteca';
const GALERIA_ENDPOINT = '/galeria';

// Constantes para armazenamento local
const STORAGE_KEYS = {
  BIBLIOTECA_ITEMS: 'biblioteca_items_data',
  GALERIA_YEARS: 'galeria_years_data',
  GALERIA_IMAGES: 'galeria_images_data'
};

/**
 * Recupera dados do localStorage
 * @param {string} key - Chave de armazenamento
 * @param {boolean} showWarning - Se deve mostrar aviso de uso de dados locais
 * @returns {Array|null} - Dados armazenados ou null em caso de erro
 */
const getStoredData = (key, showWarning = false) => {
  try {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      if (showWarning) {
        console.warn(`Usando dados armazenados de ${key} devido a erro na API`);
      }
      return JSON.parse(storedData) || [];
    }
    return null;
  } catch (error) {
    console.error(`Erro ao recuperar dados de ${key} do localStorage:`, error);
    return null;
  }
};

/**
 * Aplica paginação a uma lista de itens
 * @param {Array} items - Lista completa de itens
 * @param {number} page - Página atual
 * @param {number} limit - Limite de itens por página
 * @returns {Object} - Objeto com itens paginados e metadados de paginação
 */
const paginateItems = (items, page, limit) => {
  if (!items || !items.length) {
    return { 
      items: [], 
      pagination: { total: 0, page, limit, totalPages: 0 } 
    };
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  
  return {
    items: paginatedItems,
    pagination: {
      total: items.length,
      page,
      limit,
      totalPages: Math.ceil(items.length / limit)
    }
  };
};

/**
 * Cria um objeto de resposta vazio com metadados de paginação
 * @param {number} page - Página atual
 * @param {number} limit - Limite de itens por página
 * @returns {Object} - Objeto de resposta vazio
 */
const createEmptyResponse = (page, limit) => ({
  items: [],
  pagination: { total: 0, page, limit, totalPages: 0 }
});

/**
 * Busca itens da biblioteca com suporte a paginação
 * @param {Object} options - Opções de busca
 * @param {string} options.lang - Idioma atual (pt, en, es)
 * @param {number} options.page - Número da página (começando em 1)
 * @param {number} options.limit - Limite de itens por página
 * @returns {Promise<Object>} Objeto com itens e metadados de paginação
 */
export const fetchBibliotecaItems = async ({ lang = 'pt', page = 1, limit = 6 } = {}) => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      const storedItems = getStoredData(STORAGE_KEYS.BIBLIOTECA_ITEMS);
      return storedItems ? paginateItems(storedItems, page, limit) : createEmptyResponse(page, limit);
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(BIBLIOTECA_ENDPOINT, { 
      params: { lang, page, limit } 
    });
    
    return {
      items: response.data.items || [],
      pagination: response.data.pagination || {
        total: response.data.items?.length || 0,
        page,
        limit,
        totalPages: Math.ceil((response.data.items?.length || 0) / limit)
      }
    };
  } catch (error) {
    console.error('Erro ao buscar itens da biblioteca:', error);
    
    // Em caso de erro, tenta usar o localStorage como fallback
    if (import.meta.env.DEV) {
      const storedItems = getStoredData(STORAGE_KEYS.BIBLIOTECA_ITEMS, true);
      return storedItems ? paginateItems(storedItems, page, limit) : createEmptyResponse(page, limit);
    }
    
    return createEmptyResponse(page, limit);
  }
};

/**
 * Busca categorias de itens da biblioteca
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de categorias
 */
export const fetchBibliotecaCategories = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      const storedCategories = getStoredData('biblioteca_categories_data');
      return storedCategories || [];
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${BIBLIOTECA_ENDPOINT}/categorias`, { params: { lang } });
    return response.data.categories || [];
  } catch (error) {
    console.error('Erro ao buscar categorias da biblioteca:', error);
    return [];
  }
};

/**
 * Filtra itens por categoria
 * @param {Array} items - Lista de itens
 * @param {string} categoryId - ID da categoria
 * @returns {Array} - Itens filtrados por categoria
 */
const filterItemsByCategory = (items, categoryId) => {
  return items.filter(item => 
    item.category === categoryId || 
    (item.categories && item.categories.includes(categoryId))
  );
};

/**
 * Busca itens da biblioteca por categoria com suporte a paginação
 * @param {string} categoryId - ID da categoria
 * @param {Object} options - Opções de busca
 * @param {string} options.lang - Idioma atual (pt, en, es)
 * @param {number} options.page - Número da página (começando em 1)
 * @param {number} options.limit - Limite de itens por página
 * @returns {Promise<Object>} Objeto com itens e metadados de paginação
 */
export const fetchBibliotecaItemsByCategory = async (categoryId, { lang = 'pt', page = 1, limit = 6 } = {}) => {
  try {
    // Se a categoria for "all", retorna todos os itens
    if (categoryId === 'all' || !categoryId) {
      return fetchBibliotecaItems({ lang, page, limit });
    }
    
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, filtra os dados do localStorage
      const storedItems = getStoredData(STORAGE_KEYS.BIBLIOTECA_ITEMS);
      if (storedItems) {
        const filteredItems = filterItemsByCategory(storedItems, categoryId);
        return paginateItems(filteredItems, page, limit);
      }
      return createEmptyResponse(page, limit);
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${BIBLIOTECA_ENDPOINT}/categoria/${categoryId}`, { 
      params: { lang, page, limit } 
    });
    
    return {
      items: response.data.items || [],
      pagination: response.data.pagination || {
        total: response.data.items?.length || 0,
        page,
        limit,
        totalPages: Math.ceil((response.data.items?.length || 0) / limit)
      }
    };
  } catch (error) {
    console.error(`Erro ao buscar itens da biblioteca por categoria ${categoryId}:`, error);
    
    // Em caso de erro, tenta usar o localStorage como fallback
    if (import.meta.env.DEV) {
      const storedItems = getStoredData(STORAGE_KEYS.BIBLIOTECA_ITEMS, true);
      if (storedItems) {
        const filteredItems = filterItemsByCategory(storedItems, categoryId);
        return paginateItems(filteredItems, page, limit);
      }
    }
    
    return createEmptyResponse(page, limit);
  }
};

/**
 * Busca um item específico da biblioteca por ID
 * @param {string} id - ID do item
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object|null>} Item encontrado ou null
 */
export const getBibliotecaItemById = async (id, lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      const storedItems = getStoredData(STORAGE_KEYS.BIBLIOTECA_ITEMS);
      return storedItems ? storedItems.find(item => item.id === id) || null : null;
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${BIBLIOTECA_ENDPOINT}/${id}`, { params: { lang } });
    return response.data || null;
  } catch (error) {
    console.error(`Erro ao buscar item ID ${id}:`, error);
    return null;
  }
};

/**
 * Busca anos disponíveis para a galeria de imagens
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de anos disponíveis
 */
export const fetchGaleriaYears = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      const storedYears = getStoredData(STORAGE_KEYS.GALERIA_YEARS);
      return storedYears || [];
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${GALERIA_ENDPOINT}/years`, { params: { lang } });
    return response.data.years || [];
  } catch (error) {
    console.error('Erro ao buscar anos da galeria:', error);
    return [];
  }
};

/**
 * Busca imagens da galeria para um ano específico
 * @param {string} year - Ano das imagens
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de imagens para o ano especificado
 */
export const fetchGaleriaImages = async (year, lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      const storageKey = `${STORAGE_KEYS.GALERIA_IMAGES}_${year}`;
      const storedImages = getStoredData(storageKey);
      return storedImages || [];
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${GALERIA_ENDPOINT}/images`, { 
      params: { year, lang } 
    });
    return response.data.images || [];
  } catch (error) {
    console.error(`Erro ao buscar imagens do ano ${year}:`, error);
    return [];
  }
};

export default {
  fetchBibliotecaItems,
  fetchBibliotecaCategories,
  fetchBibliotecaItemsByCategory,
  getBibliotecaItemById,
  fetchGaleriaYears,
  fetchGaleriaImages
};
