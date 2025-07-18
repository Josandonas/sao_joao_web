/**
 * Serviço de API para o módulo Postcards
 * Responsável por buscar, enviar e processar dados dos postais
 */

import api, { delay, isApiAvailable } from './index';

const ENDPOINT = '/postcards';

// Número de itens por página para paginação
const ITEMS_PER_PAGE = 15;

/**
 * Busca postais com suporte a paginação
 * @param {Object} options - Opções de busca
 * @param {number} options.page - Número da página (começando em 1)
 * @param {number} options.limit - Número de itens por página
 * @param {string} options.lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} Objeto com lista de postais e metadados de paginação
 */
export const fetchPostcards = async ({ page = 1, limit = ITEMS_PER_PAGE, lang = 'pt' } = {}) => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('postcards_data');
        if (storedData) {
          return JSON.parse(storedData) || [];
        }
        return [];
      } catch (error) {
        console.error('Erro ao buscar postais do localStorage:', error);
        return [];
      }
    }

    // Com API disponível, faz a requisição real com paginação
    const response = await api.get(ENDPOINT, { 
      params: { 
        _page: page, 
        _limit: limit, 
        _sort: 'createdAt', 
        _order: 'desc',
        lang 
      } 
    });
    
    // Extrair total de itens do header ou do corpo da resposta
    const totalItems = parseInt(response.headers['x-total-count'] || '0', 10) || response.data.totalItems || 0;
    const totalPages = Math.ceil(totalItems / limit);
    
    return {
      postcards: response.data.postcards || response.data || [],
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  } catch (error) {
    console.error('Erro ao buscar postais:', error);
    
    // Em caso de erro, tenta usar o localStorage como fallback
    if (import.meta.env.DEV) {
      try {
        const storedData = localStorage.getItem('postcards_data');
        if (storedData) {
          console.warn('Usando dados armazenados devido a erro na API');
          const postcards = JSON.parse(storedData) || [];
          
          // Aplicar paginação manualmente
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedPostcards = postcards.slice(startIndex, endIndex);
          const totalItems = postcards.length;
          const totalPages = Math.ceil(totalItems / limit);
          
          return {
            postcards: paginatedPostcards,
            pagination: {
              page,
              limit,
              totalItems,
              totalPages,
              hasNextPage: page < totalPages,
              hasPrevPage: page > 1
            }
          };
        }
      } catch (fallbackError) {
        console.error('Erro ao carregar dados de fallback:', fallbackError);
      }
    }
    
    return {
      postcards: [],
      pagination: {
        page,
        limit,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false
      }
    };
  }
};

/**
 * Busca categorias de postais
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de categorias
 */
export const fetchPostcardCategories = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('postcard_categories_data');
        if (storedData) {
          return JSON.parse(storedData) || [];
        }
        return [];
      } catch (error) {
        console.error('Erro ao buscar categorias de postais do localStorage:', error);
        return [];
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/categories`, { params: { lang } });
    return response.data.categories || [];
  } catch (error) {
    console.error('Erro ao buscar categorias de postais:', error);
    return [];
  }
};

/**
 * Busca um postal específico por ID
 * @param {string} id - ID do postal
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object|null>} Postal encontrado ou null
 */
export const getPostcardById = async (id, lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('postcards_data');
        if (storedData) {
          const postcards = JSON.parse(storedData);
          return postcards.find(postcard => postcard.id === id) || null;
        }
        return null;
      } catch (error) {
        console.error(`Erro ao buscar postal ID ${id} do localStorage:`, error);
        return null;
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/${id}`, { params: { lang } });
    return response.data || null;
  } catch (error) {
    console.error(`Erro ao buscar postal ID ${id}:`, error);
    return null;
  }
};

/**
 * Envia um novo postal
 * @param {Object|FormData} postcardData - Dados do postal ou FormData com arquivo
 * @returns {Promise<Object>} Postal cadastrado com ID gerado
 */
export const submitPostcard = async (postcardData) => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, simula o envio
      await delay(800);
      
      // Gera um ID único para simular o comportamento da API
      const isFormData = postcardData instanceof FormData;
      
      // Se for FormData, extrai os dados para salvar no localStorage
      let dataToStore;
      if (isFormData) {
        dataToStore = {};
        for (const [key, value] of postcardData.entries()) {
          // Ignora arquivos, pois não podem ser armazenados diretamente no localStorage
          if (!(value instanceof File)) {
            dataToStore[key] = value;
          }
        }
      } else {
        dataToStore = { ...postcardData };
      }
      
      const newPostcard = {
        ...dataToStore,
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      };
      
      // Adiciona ao localStorage para persistir entre recargas da página
      try {
        const storedData = localStorage.getItem('postcards_data') || '[]';
        const postcards = JSON.parse(storedData);
        postcards.push(newPostcard);
        localStorage.setItem('postcards_data', JSON.stringify(postcards));
      } catch (storageError) {
        console.error('Erro ao salvar postal no localStorage:', storageError);
      }
      
      return newPostcard;
    }

    // Com API disponível, envia para a API real
    // Se for FormData, configura o header apropriado
    const isFormData = postcardData instanceof FormData;
    const config = isFormData ? {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    } : {};
    
    const response = await api.post(ENDPOINT, postcardData, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar postal:', error);
    throw new Error('Não foi possível cadastrar o postal. Tente novamente mais tarde.');
  }
};

/**
 * Busca os postais base/atuais (conjunto fixo que sempre deve ser exibido)
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de postais base
 */
export const fetchBasePostcards = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, retorna dados locais
      return postcardsData || [];
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/base`, { params: { lang } });
    return response.data.postcards || [];
  } catch (error) {
    console.error('Erro ao buscar postais base:', error);
    // Em caso de erro, retorna os dados locais como fallback
    return postcardsData || [];
  }
};

// Importar os dados base de postais para usar como fallback
import postcardsData from '../../pages/Postcards/data/postcardsData';

export default {
  fetchPostcards,
  fetchPostcardCategories,
  getPostcardById,
  submitPostcard,
  fetchBasePostcards
};
