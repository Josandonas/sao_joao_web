/**
 * Serviço de API para o módulo Biblioteca
 * Responsável por buscar, enviar e processar dados da biblioteca digital
 */

import api from '../index';
import { getStoredData, paginateItems, createEmptyResponse, isApiAvailable } from './utils';
import { STORAGE_KEYS, ENDPOINTS } from './constants';

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
    const response = await api.get(ENDPOINTS.BIBLIOTECA, { 
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
    const response = await api.get(`${ENDPOINTS.BIBLIOTECA}/categorias`, { params: { lang } });
    return response.data.categories || [];
  } catch (error) {
    console.error('Erro ao buscar categorias da biblioteca:', error);
    return [];
  }
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
    const response = await api.get(`${ENDPOINTS.BIBLIOTECA}/categoria/${categoryId}`, { 
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
    const response = await api.get(`${ENDPOINTS.BIBLIOTECA}/${id}`, { params: { lang } });
    return response.data || null;
  } catch (error) {
    console.error(`Erro ao buscar item ID ${id}:`, error);
    return null;
  }
};
