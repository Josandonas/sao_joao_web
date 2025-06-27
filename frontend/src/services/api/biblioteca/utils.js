/**
 * Funções utilitárias para os serviços de API da Biblioteca e Galeria
 */

import api from '../index';

/**
 * Recupera dados do localStorage
 * @param {string} key - Chave para buscar no localStorage
 * @param {boolean} showError - Se deve mostrar erro no console
 * @returns {Array|Object|null} - Dados recuperados ou null
 */
export const getStoredData = (key, showError = false) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    if (showError) {
      console.error(`Erro ao recuperar dados do localStorage (${key}):`, error);
    }
    return null;
  }
};

/**
 * Pagina uma lista de itens
 * @param {Array} items - Lista completa de itens
 * @param {number} page - Número da página (começando em 1)
 * @param {number} limit - Limite de itens por página
 * @returns {Object} - Objeto com itens paginados e metadados
 */
export const paginateItems = (items, page = 1, limit = 6) => {
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
 * Cria uma resposta vazia com metadados de paginação
 * @param {number} page - Número da página
 * @param {number} limit - Limite de itens por página
 * @returns {Object} - Objeto de resposta vazia
 */
export const createEmptyResponse = (page = 1, limit = 6) => {
  return {
    items: [],
    pagination: {
      total: 0,
      page,
      limit,
      totalPages: 0
    }
  };
};

/**
 * Verifica se a API está disponível
 * @returns {Promise<boolean>} - true se a API estiver disponível
 */
export const isApiAvailable = async () => {
  try {
    await api.get('/health');
    return true;
  } catch (error) {
    return false;
  }
};
