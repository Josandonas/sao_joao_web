/**
 * Serviço de API para o módulo de Depoimentos (Testimonials)
 * Responsável por buscar e enviar dados de depoimentos da/para API
 * e mesclar com dados estáticos existentes
 */

import axios from 'axios';
import { testimonialData, categories } from '../pages/Testimonials/data/testimonialData';

// Configuração da API
const API_URL = import.meta.env.VITE_API_URL || '';
const IS_DEV = import.meta.env.MODE === 'development';

// Instância do axios configurada
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Verifica se a API está disponível
 * @returns {Promise<boolean>} - true se a API estiver disponível, false caso contrário
 */
export const isApiAvailable = async () => {
  if (!API_URL) return false;
  
  try {
    const response = await api.get('/health', { timeout: 3000 });
    return response.status === 200;
  } catch (error) {
    console.warn('API de depoimentos não está disponível:', error.message);
    return false;
  }
};

/**
 * Converte os dados estáticos para o formato esperado pela aplicação
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Array} - Dados estáticos formatados
 */
const getStaticTestimonials = (lang = 'pt') => {
  return testimonialData.map(item => {
    // Seleciona o vídeo correto com base no idioma
    const videoUrl = item.videos[lang] || item.videos.pt;
    
    return {
      id: item.id.toString(),
      name: item.name,
      location: item.location,
      quote: item.quoteKey ? item.quote : item.quote,
      image: item.image,
      videoUrl: videoUrl,
      category: item.category,
      isStatic: true // Marca como dado estático para identificação
    };
  });
};

/**
 * Converte os dados estáticos de categorias para o formato esperado pela aplicação
 * @returns {Array} - Categorias estáticas formatadas
 */
const getStaticCategories = () => {
  return categories.map(category => ({
    id: category.id,
    label: category.label,
    isStatic: true
  }));
};

/**
 * Busca todos os depoimentos, combinando dados estáticos com dados da API
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} - Lista combinada de depoimentos
 */
export const getTestimonials = async (lang = 'pt') => {
  // Sempre carrega os dados estáticos
  const staticData = getStaticTestimonials(lang);
  
  // Tenta buscar dados da API
  try {
    const apiAvailable = await isApiAvailable();
    
    if (apiAvailable) {
      const response = await api.get(`/testimonials?lang=${lang}`);
      const apiData = response.data.testimonials || [];
      
      // Combina os dados, colocando os estáticos primeiro
      return [...staticData, ...apiData];
    }
  } catch (error) {
    console.error('Erro ao buscar depoimentos da API:', error);
  }
  
  // Se a API não estiver disponível ou ocorrer um erro, retorna apenas os dados estáticos
  return staticData;
};

/**
 * Busca categorias de depoimentos, combinando dados estáticos com dados da API
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} - Lista combinada de categorias
 */
export const getTestimonialCategories = async (lang = 'pt') => {
  // Sempre carrega as categorias estáticas
  const staticCategories = getStaticCategories();
  
  // Tenta buscar categorias da API
  try {
    const apiAvailable = await isApiAvailable();
    
    if (apiAvailable) {
      const response = await api.get(`/testimonials/categories?lang=${lang}`);
      const apiCategories = response.data.categories || [];
      
      // Filtra para evitar duplicação de categorias (por ID)
      const staticCategoryIds = staticCategories.map(cat => cat.id);
      const uniqueApiCategories = apiCategories.filter(cat => !staticCategoryIds.includes(cat.id));
      
      // Combina as categorias
      return [...staticCategories, ...uniqueApiCategories];
    }
  } catch (error) {
    console.error('Erro ao buscar categorias de depoimentos da API:', error);
  }
  
  // Se a API não estiver disponível ou ocorrer um erro, retorna apenas as categorias estáticas
  return staticCategories;
};

/**
 * Busca depoimentos filtrados por categoria, combinando dados estáticos com dados da API
 * @param {string} category - Categoria para filtrar
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} - Lista combinada de depoimentos filtrados
 */
export const getTestimonialsByCategory = async (category, lang = 'pt') => {
  // Se a categoria for 'all', retorna todos os depoimentos
  if (category === 'all') {
    return getTestimonials(lang);
  }
  
  // Filtra os dados estáticos pela categoria
  const staticData = getStaticTestimonials(lang).filter(
    item => item.category === category
  );
  
  // Tenta buscar dados da API
  try {
    const apiAvailable = await isApiAvailable();
    
    if (apiAvailable) {
      const response = await api.get(`/testimonials/category/${category}?lang=${lang}`);
      const apiData = response.data.testimonials || [];
      
      // Combina os dados, colocando os estáticos primeiro
      return [...staticData, ...apiData];
    }
  } catch (error) {
    console.error(`Erro ao buscar depoimentos da categoria ${category} da API:`, error);
  }
  
  // Se a API não estiver disponível ou ocorrer um erro, retorna apenas os dados estáticos
  return staticData;
};

/**
 * Busca um depoimento específico por ID
 * @param {string} id - ID do depoimento
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object|null>} - Dados do depoimento ou null se não encontrado
 */
export const getTestimonialById = async (id, lang = 'pt') => {
  // Verifica nos dados estáticos primeiro
  const staticData = getStaticTestimonials(lang);
  const staticTestimonial = staticData.find(item => item.id === id);
  
  if (staticTestimonial) {
    return staticTestimonial;
  }
  
  // Se não encontrou nos dados estáticos, busca na API
  try {
    const apiAvailable = await isApiAvailable();
    
    if (apiAvailable) {
      const response = await api.get(`/testimonials/${id}?lang=${lang}`);
      return response.data.testimonial || null;
    }
  } catch (error) {
    console.error(`Erro ao buscar depoimento ID ${id} da API:`, error);
  }
  
  return null;
};

/**
 * Envia um novo depoimento para a API
 * @param {Object|FormData} testimonialData - Dados do depoimento
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} - Resposta da API
 */
export const submitTestimonial = async (testimonialData, lang = 'pt') => {
  try {
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable) {
      throw new Error('API não está disponível no momento. Tente novamente mais tarde.');
    }
    
    // Configuração específica para FormData (upload de arquivos)
    const config = {
      headers: {
        'Accept-Language': lang,
      }
    };
    
    // Se for FormData, o axios configura automaticamente o Content-Type
    if (!(testimonialData instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    const response = await api.post('/testimonials', testimonialData, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar depoimento:', error);
    throw error;
  }
};

export default {
  getTestimonials,
  getTestimonialCategories,
  getTestimonialsByCategory,
  getTestimonialById,
  submitTestimonial,
  isApiAvailable
};
