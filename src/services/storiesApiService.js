/**
 * Serviço para integração com a API de histórias
 * Responsável por buscar, enviar e processar dados das histórias via API
 * Mantém os dados locais do arquivo JSON e combina com os dados da API
 * Fornece utilitários para gerenciar o conteúdo multilíngue das histórias
 */

import axios from 'axios';
import staticStoriesData from '../pages/Stories/data/stories.json';

// URL base da API - substitua pela URL real quando disponível
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';
const STORIES_ENDPOINT = '/stories';

// Instância do axios configurada para a API
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * Verifica se a API está disponível
 * @returns {Promise<boolean>} True se a API estiver disponível, false caso contrário
 */
export const isApiAvailable = async () => {
  try {
    // Tenta fazer uma requisição simples para verificar se a API está disponível
    const response = await api.get('/health', { timeout: 5000 });
    return response.status === 200;
  } catch (error) {
    console.warn('API de histórias não está disponível:', error.message);
    return false;
  }
};

/**
 * Obtém o conteúdo da história no idioma especificado
 * @param {Object} story - Objeto da história com dados multilíngues
 * @param {string} lang - Código do idioma (pt, en, es)
 * @param {string} field - Campo a ser obtido (title, content, excerpt, author)
 * @returns {string} Conteúdo no idioma especificado ou fallback para português
 */
export const getStoryContentByLang = (story, lang = 'pt', field) => {
  if (!story) return '';
  
  // Verificar se o campo existe nas traduções do idioma solicitado
  if (story.translations && story.translations[lang] && story.translations[lang][field]) {
    return story.translations[lang][field];
  }
  
  // Verificar se o campo existe diretamente no objeto do idioma solicitado
  if (story[lang] && story[lang][field]) {
    return story[lang][field];
  }
  
  // Verificar se o campo existe nas traduções em português (fallback padrão)
  if (story.translations && story.translations.pt && story.translations.pt[field]) {
    return story.translations.pt[field];
  }
  
  // Verificar se o campo existe diretamente no objeto em português
  if (story.pt && story.pt[field]) {
    return story.pt[field];
  }
  
  // Fallback para o campo no nível raiz (compatibilidade com dados legados)
  if (field === 'autor' && story.author) {
    return story.author;
  }
  
  return story[field] || '';
};

/**
 * Obtém uma versão completa da história no idioma especificado
 * @param {Object} story - Objeto da história com dados multilíngues
 * @param {string} lang - Código do idioma (pt, en, es)
 * @returns {Object} História com os campos no idioma especificado
 */
export const getLocalizedStory = (story, lang = 'pt') => {
  if (!story) return null;
  
  return {
    ...story,
    title: getStoryContentByLang(story, lang, 'title'),
    content: getStoryContentByLang(story, lang, 'content'),
    excerpt: getStoryContentByLang(story, lang, 'excerpt'),
    author: getStoryContentByLang(story, lang, 'author') || getStoryContentByLang(story, lang, 'autor')
  };
};

/**
 * Busca todas as histórias da API e combina com os dados estáticos
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista combinada de histórias estáticas e da API
 */
export const fetchStoriesFromApi = async (lang = 'pt') => {
  // Sempre carrega os dados estáticos do arquivo JSON primeiro
  // Isso garante que mesmo se houver erros na API, os dados estáticos serão retornados
  const staticStories = staticStoriesData.stories || [];
  console.log('[DEV] Carregando histórias estáticas:', staticStories.length);
  
  // Tenta buscar dados da API
  let apiStories = [];
  
  try {
    // Em ambiente de desenvolvimento sem API configurada, usa o localStorage
    if (import.meta.env.MODE === 'development' && !import.meta.env.VITE_API_URL) {
      const storedStories = localStorage.getItem('api_stories_sample');
      if (storedStories) {
        apiStories = JSON.parse(storedStories);
        console.log('[DEV] Carregando histórias do localStorage:', apiStories.length);
      }
    } else {
      // Em produção ou com API configurada, faz a requisição real
      const response = await api.get(STORIES_ENDPOINT, {
        params: { lang }
      });
      apiStories = response.data.stories || [];
      console.log('[DEV] Carregando histórias da API:', apiStories.length);
    }
    
    // Combina as histórias da API com as histórias estáticas
    // Garante que não haja duplicação de IDs
    const staticIds = new Set(staticStories.map(story => story.id));
    const filteredApiStories = apiStories.filter(story => !staticIds.has(story.id));
    
    // Retorna a combinação, com as histórias da API primeiro (mais recentes) e depois as estáticas
    const combinedStories = [...filteredApiStories, ...staticStories];
    console.log('[DEV] Total de histórias combinadas:', combinedStories.length);
    return combinedStories;
  } catch (apiError) {
    console.warn('[DEV] Erro ao buscar histórias da API, usando apenas dados estáticos:', apiError);
    // Em caso de erro na API, retorna apenas as histórias estáticas
    return staticStories;
  }
};

/**
 * Envia uma nova história para a API
 * @param {Object} storyData - Dados da história a ser cadastrada
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} História cadastrada com ID gerado pela API
 */
export const createStory = async (storyData, lang = 'pt') => {
  try {
    // Em ambiente de desenvolvimento sem API, simula o cadastro
    if (import.meta.env.MODE === 'development' && !import.meta.env.VITE_API_URL) {
      // Simula um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Gera um ID único para simular o comportamento da API
      const newStory = {
        ...storyData,
        id: `api_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        source: 'api'
      };
      
      // Adiciona ao localStorage para persistir entre recargas da página
      const storedStories = localStorage.getItem('api_stories_sample') || '[]';
      const stories = JSON.parse(storedStories);
      stories.push(newStory);
      localStorage.setItem('api_stories_sample', JSON.stringify(stories));
      
      return newStory;
    }

    // Em produção, envia para a API real
    const response = await api.post(STORIES_ENDPOINT, storyData, {
      params: { lang }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar história na API:', error);
    throw new Error('Não foi possível cadastrar a história. Tente novamente mais tarde.');
  }
};

/**
 * Atualiza uma história existente na API
 * @param {String} id - ID da história a ser atualizada
 * @param {Object} storyData - Novos dados da história
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} História atualizada
 */
export const updateStory = async (id, storyData, lang = 'pt') => {
  try {
    // Verifica se é uma história estática (não pode ser atualizada via API)
    const staticStory = staticStoriesData.stories.find(story => story.id === id);
    if (staticStory) {
      throw new Error('Não é possível atualizar histórias do arquivo estático.');
    }
    
    // Em ambiente de desenvolvimento sem API, simula a atualização
    if (import.meta.env.MODE === 'development' && !import.meta.env.VITE_API_URL) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const storedStories = localStorage.getItem('api_stories_sample') || '[]';
      const stories = JSON.parse(storedStories);
      
      const index = stories.findIndex(c => c.id === id);
      if (index === -1) {
        throw new Error('História não encontrada');
      }
      
      const updatedStory = {
        ...stories[index],
        ...storyData,
        updatedAt: new Date().toISOString()
      };
      
      stories[index] = updatedStory;
      localStorage.setItem('api_stories_sample', JSON.stringify(stories));
      
      return updatedStory;
    }

    // Em produção, envia para a API real
    const response = await api.put(`${STORIES_ENDPOINT}/${id}`, storyData, {
      params: { lang }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar história na API:', error);
    throw new Error(error.message || 'Não foi possível atualizar a história. Tente novamente mais tarde.');
  }
};

/**
 * Exclui uma história da API
 * @param {String} id - ID da história a ser excluída
 * @returns {Promise<void>}
 */
export const deleteStory = async (id) => {
  try {
    // Verifica se é uma história estática (não pode ser excluída via API)
    const staticStory = staticStoriesData.stories.find(story => story.id === id);
    if (staticStory) {
      throw new Error('Não é possível excluir histórias do arquivo estático.');
    }
    
    // Em ambiente de desenvolvimento sem API, simula a exclusão
    if (import.meta.env.MODE === 'development' && !import.meta.env.VITE_API_URL) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const storedStories = localStorage.getItem('api_stories_sample') || '[]';
      const stories = JSON.parse(storedStories);
      
      const index = stories.findIndex(c => c.id === id);
      if (index === -1) {
        throw new Error('História não encontrada');
      }
      
      stories.splice(index, 1);
      localStorage.setItem('api_stories_sample', JSON.stringify(stories));
      
      return;
    }

    // Em produção, envia para a API real
    await api.delete(`${STORIES_ENDPOINT}/${id}`);
  } catch (error) {
    console.error('Erro ao excluir história da API:', error);
    throw new Error(error.message || 'Não foi possível excluir a história. Tente novamente mais tarde.');
  }
};

/**
 * Busca uma história específica por ID
 * @param {String} id - ID da história
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object|null>} História encontrada ou null
 */
export const getStoryById = async (id, lang = 'pt') => {
  try {
    // Primeiro verifica se é uma história estática
    const staticStory = staticStoriesData.stories.find(story => story.id === id);
    if (staticStory) {
      return staticStory;
    }
    
    // Se não for estática, busca na API
    if (import.meta.env.MODE === 'development' && !import.meta.env.VITE_API_URL) {
      // Em desenvolvimento, busca no localStorage
      const storedStories = localStorage.getItem('api_stories_sample') || '[]';
      const stories = JSON.parse(storedStories);
      return stories.find(story => story.id === id) || null;
    }
    
    // Em produção, busca na API
    const response = await api.get(`${STORIES_ENDPOINT}/${id}`, {
      params: { lang }
    });
    return response.data || null;
  } catch (error) {
    console.error(`Erro ao buscar história ID ${id}:`, error);
    return null;
  }
};

export default {
  fetchStoriesFromApi,
  createStory,
  updateStory,
  deleteStory,
  getStoryById,
  isApiAvailable,
  getStoryContentByLang,
  getLocalizedStory
};
