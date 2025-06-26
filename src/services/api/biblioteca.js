/**
 * Serviço de API para o módulo Biblioteca
 * Responsável por buscar, enviar e processar dados da biblioteca digital
 */

import api, { delay, isApiAvailable } from './index';

const ENDPOINT = '/biblioteca';

/**
 * Busca todos os itens da biblioteca
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de itens da biblioteca
 */
export const fetchBibliotecaItems = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('biblioteca_items_data');
        if (storedData) {
          return JSON.parse(storedData) || [];
        }
        return [];
      } catch (error) {
        console.error('Erro ao buscar itens da biblioteca do localStorage:', error);
        return [];
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(ENDPOINT, { params: { lang } });
    return response.data.items || [];
  } catch (error) {
    console.error('Erro ao buscar itens da biblioteca:', error);
    
    // Em caso de erro, tenta usar o localStorage como fallback
    if (import.meta.env.DEV) {
      try {
        const storedData = localStorage.getItem('biblioteca_items_data');
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
      try {
        const storedData = localStorage.getItem('biblioteca_categories_data');
        if (storedData) {
          return JSON.parse(storedData) || [];
        }
        return [];
      } catch (error) {
        console.error('Erro ao buscar categorias da biblioteca do localStorage:', error);
        return [];
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/categorias`, { params: { lang } });
    return response.data.categories || [];
  } catch (error) {
    console.error('Erro ao buscar categorias da biblioteca:', error);
    return [];
  }
};

/**
 * Busca itens da biblioteca por categoria
 * @param {string} categoryId - ID da categoria
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de itens filtrados por categoria
 */
export const fetchBibliotecaItemsByCategory = async (categoryId, lang = 'pt') => {
  try {
    // Se a categoria for "all", retorna todos os itens
    if (categoryId === 'all' || !categoryId) {
      return fetchBibliotecaItems(lang);
    }
    
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, filtra os dados do localStorage
      try {
        const storedData = localStorage.getItem('biblioteca_items_data');
        if (storedData) {
          const items = JSON.parse(storedData) || [];
          return items.filter(item => 
            item.category === categoryId || 
            (item.categories && item.categories.includes(categoryId))
          );
        }
        return [];
      } catch (error) {
        console.error(`Erro ao buscar itens da categoria ${categoryId} do localStorage:`, error);
        return [];
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/categoria/${categoryId}`, { params: { lang } });
    return response.data.items || [];
  } catch (error) {
    console.error(`Erro ao buscar itens da categoria ${categoryId}:`, error);
    return [];
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
      try {
        const storedData = localStorage.getItem('biblioteca_items_data');
        if (storedData) {
          const items = JSON.parse(storedData);
          return items.find(item => item.id === id) || null;
        }
        return null;
      } catch (error) {
        console.error(`Erro ao buscar item ID ${id} do localStorage:`, error);
        return null;
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/${id}`, { params: { lang } });
    return response.data || null;
  } catch (error) {
    console.error(`Erro ao buscar item ID ${id}:`, error);
    return null;
  }
};

export default {
  fetchBibliotecaItems,
  fetchBibliotecaCategories,
  fetchBibliotecaItemsByCategory,
  getBibliotecaItemById
};
