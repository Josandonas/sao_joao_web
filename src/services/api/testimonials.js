/**
 * Serviço de API para o módulo Testimonials
 * Responsável por buscar, enviar e processar dados dos depoimentos
 */

import api, { delay, isApiAvailable } from './index';
import { testimonialData, categories } from '../../pages/Testimonials/data/testimonialData';

const ENDPOINT = '/testimonials';

/**
 * Converte os dados estáticos para o formato esperado pela aplicação
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Array} - Dados estáticos formatados
 */
export const getStaticTestimonials = (lang = 'pt') => {
  return testimonialData.map(item => {
    // Seleciona o vídeo correto com base no idioma
    const videoUrl = item.videos[lang] || item.videos.pt;
    
    // Seleciona o texto correto com base no idioma
    const text = item.text[lang] || item.text.pt;
    const name = item.name[lang] || item.name.pt;
    const location = item.location[lang] || item.location.pt;
    
    return {
      id: item.id,
      name,
      text,
      location,
      videoUrl,
      imageUrl: item.imageUrl,
      category: item.category,
      featured: item.featured || false,
      status: 'approved' // Dados estáticos são sempre aprovados
    };
  });
};

/**
 * Converte os dados estáticos de categorias para o formato esperado pela aplicação
 * @returns {Array} - Categorias estáticas formatadas
 */
export const getStaticCategories = () => {
  return categories.map(category => ({
    id: category.id,
    name: category.name,
    description: category.description,
    count: testimonialData.filter(item => item.category === category.id).length
  }));
};

/**
 * Busca todos os depoimentos
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de depoimentos
 */
export const fetchTestimonials = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('testimonials_data');
        if (storedData) {
          return JSON.parse(storedData) || [];
        }
        return [];
      } catch (error) {
        console.error('Erro ao buscar depoimentos do localStorage:', error);
        return [];
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(ENDPOINT, { params: { lang } });
    return response.data.testimonials || [];
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    
    // Em caso de erro, tenta usar o localStorage como fallback
    if (import.meta.env.DEV) {
      try {
        const storedData = localStorage.getItem('testimonials_data');
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
 * Busca categorias de depoimentos
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de categorias
 */
export const fetchTestimonialCategories = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('testimonial_categories_data');
        if (storedData) {
          return JSON.parse(storedData) || [];
        }
        return [];
      } catch (error) {
        console.error('Erro ao buscar categorias de depoimentos do localStorage:', error);
        return [];
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/categories`, { params: { lang } });
    return response.data.categories || [];
  } catch (error) {
    console.error('Erro ao buscar categorias de depoimentos:', error);
    return [];
  }
};

/**
 * Busca depoimentos por categoria
 * @param {string} category - ID da categoria
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de depoimentos filtrados por categoria
 */
export const fetchTestimonialsByCategory = async (category, lang = 'pt') => {
  try {
    // Se a categoria for "all", retorna todos os depoimentos
    if (category === 'all') {
      return fetchTestimonials(lang);
    }
    
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, filtra os dados do localStorage
      try {
        const storedData = localStorage.getItem('testimonials_data');
        if (storedData) {
          const testimonials = JSON.parse(storedData) || [];
          return testimonials.filter(testimonial => testimonial.category === category);
        }
        return [];
      } catch (error) {
        console.error('Erro ao buscar depoimentos por categoria do localStorage:', error);
        return [];
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/category/${category}`, { params: { lang } });
    return response.data.testimonials || [];
  } catch (error) {
    console.error(`Erro ao buscar depoimentos da categoria ${category}:`, error);
    return [];
  }
};

/**
 * Busca um depoimento específico por ID
 * @param {string} id - ID do depoimento
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object|null>} Depoimento encontrado ou null
 */
export const getTestimonialById = async (id, lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('testimonials_data');
        if (storedData) {
          const testimonials = JSON.parse(storedData);
          return testimonials.find(testimonial => testimonial.id === id) || null;
        }
        return null;
      } catch (error) {
        console.error(`Erro ao buscar depoimento ID ${id} do localStorage:`, error);
        return null;
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/${id}`, { params: { lang } });
    return response.data || null;
  } catch (error) {
    console.error(`Erro ao buscar depoimento ID ${id}:`, error);
    return null;
  }
};

/**
 * Envia um novo depoimento
 * @param {Object|FormData} testimonialData - Dados do depoimento ou FormData com arquivo
 * @returns {Promise<Object>} Depoimento cadastrado com ID gerado
 */
export const submitTestimonial = async (testimonialData) => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, simula o envio
      await delay(800);
      
      // Gera um ID único para simular o comportamento da API
      const isFormData = testimonialData instanceof FormData;
      
      // Se for FormData, extrai os dados para salvar no localStorage
      let dataToStore;
      if (isFormData) {
        dataToStore = {};
        for (const [key, value] of testimonialData.entries()) {
          // Ignora arquivos, pois não podem ser armazenados diretamente no localStorage
          if (!(value instanceof File)) {
            dataToStore[key] = value;
          }
        }
      } else {
        dataToStore = { ...testimonialData };
      }
      
      const newTestimonial = {
        ...dataToStore,
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        status: 'pending' // Depoimentos enviados pelo usuário ficam pendentes de aprovação
      };
      
      // Adiciona ao localStorage para persistir entre recargas da página
      try {
        const storedData = localStorage.getItem('testimonials_data') || '[]';
        const testimonials = JSON.parse(storedData);
        testimonials.push(newTestimonial);
        localStorage.setItem('testimonials_data', JSON.stringify(testimonials));
      } catch (storageError) {
        console.error('Erro ao salvar depoimento no localStorage:', storageError);
      }
      
      return newTestimonial;
    }

    // Com API disponível, envia para a API real
    // Se for FormData, configura o header apropriado
    const isFormData = testimonialData instanceof FormData;
    const config = isFormData ? {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    } : {};
    
    const response = await api.post(ENDPOINT, testimonialData, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar depoimento:', error);
    throw new Error('Não foi possível enviar o depoimento. Tente novamente mais tarde.');
  }
};

export default {
  fetchTestimonials,
  fetchTestimonialCategories,
  fetchTestimonialsByCategory,
  getTestimonialById,
  submitTestimonial,
  getStaticTestimonials,
  getStaticCategories
};
