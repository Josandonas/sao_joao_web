/**
 * Serviço de API para o módulo de Depoimentos (Testimonials)
 * Responsável por buscar e enviar dados de depoimentos da/para API
 */

import { fetchFromAPI } from './api';

// URL base para API - mesma usada no arquivo api.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.banhodesaojoao.corumba.ms.gov.br'
  : '/api';

/**
 * Função para enviar dados para a API
 * @param {string} endpoint - Endpoint da API
 * @param {Object} data - Dados a serem enviados
 * @param {Object} options - Opções adicionais para a requisição
 * @returns {Promise<any>} - Resposta da API
 */
const postToAPI = async (endpoint, data, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': options.lang || 'pt',
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao enviar dados para API (${endpoint}):`, error);
    throw error;
  }
};

/**
 * Serviço para buscar todos os depoimentos
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} - Lista de depoimentos
 */
export const getTestimonials = async (lang = 'pt') => {
  try {
    const data = await fetchFromAPI('testimonials', { lang });
    return data.testimonials || [];
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    return [];
  }
};

/**
 * Serviço para buscar categorias de depoimentos
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} - Lista de categorias
 */
export const getTestimonialCategories = async (lang = 'pt') => {
  try {
    const data = await fetchFromAPI('testimonials/categories', { lang });
    return data.categories || [];
  } catch (error) {
    console.error('Erro ao buscar categorias de depoimentos:', error);
    return [];
  }
};

/**
 * Serviço para buscar um depoimento específico por ID
 * @param {string} id - ID do depoimento
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} - Dados do depoimento
 */
export const getTestimonialById = async (id, lang = 'pt') => {
  try {
    const data = await fetchFromAPI(`testimonials/${id}`, { lang });
    return data.testimonial || null;
  } catch (error) {
    console.error(`Erro ao buscar depoimento ID ${id}:`, error);
    return null;
  }
};

/**
 * Serviço para enviar um novo depoimento
 * @param {Object} testimonialData - Dados do depoimento
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} - Resposta da API com o depoimento criado
 */
export const submitTestimonial = async (testimonialData, lang = 'pt') => {
  try {
    // Se for um FormData, não podemos usar JSON.stringify
    const isFormData = testimonialData instanceof FormData;
    
    const headers = {
      'Accept-Language': lang || 'pt',
    };
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers,
      body: isFormData ? testimonialData : JSON.stringify(testimonialData),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar depoimento:', error);
    throw error;
  }
};

/**
 * Serviço para atualizar um depoimento existente
 * @param {string} id - ID do depoimento
 * @param {Object} testimonialData - Dados atualizados do depoimento
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} - Resposta da API com o depoimento atualizado
 */
export const updateTestimonial = async (id, testimonialData, lang = 'pt') => {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
      body: JSON.stringify(testimonialData),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao atualizar depoimento ID ${id}:`, error);
    throw error;
  }
};

/**
 * Serviço para filtrar depoimentos por categoria
 * @param {string} category - Categoria para filtrar
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} - Lista de depoimentos filtrados
 */
export const getTestimonialsByCategory = async (category, lang = 'pt') => {
  try {
    const data = await fetchFromAPI(`testimonials/category/${category}`, { lang });
    return data.testimonials || [];
  } catch (error) {
    console.error(`Erro ao buscar depoimentos da categoria ${category}:`, error);
    return [];
  }
};
