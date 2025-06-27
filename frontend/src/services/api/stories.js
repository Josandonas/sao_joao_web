/**
 * Serviço de API para o módulo Stories
 * Responsável por buscar, enviar e processar dados das histórias
 */

import api, { delay, isApiAvailable } from './index';
import staticStoriesData from '../../pages/Stories/data/stories.json';

const ENDPOINT = '/stories';

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
 * Busca todas as histórias
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista combinada de histórias estáticas e da API
 */
export const fetchStories = async (lang = 'pt') => {
  // Sempre carrega os dados estáticos do arquivo JSON primeiro
  const staticStories = staticStoriesData.stories || [];
  
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      let apiStories = [];
      try {
        const storedData = localStorage.getItem('stories_data');
        if (storedData) {
          apiStories = JSON.parse(storedData) || [];
        }
      } catch (error) {
        console.error('Erro ao buscar histórias do localStorage:', error);
      }
      
      // Combina as histórias do localStorage com as histórias estáticas
      const staticIds = new Set(staticStories.map(story => story.id));
      const filteredApiStories = apiStories.filter(story => !staticIds.has(story.id));
      
      return [...filteredApiStories, ...staticStories];
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(ENDPOINT, { params: { lang } });
    const apiStories = response.data.stories || [];
    
    // Combina as histórias da API com as histórias estáticas
    const staticIds = new Set(staticStories.map(story => story.id));
    const filteredApiStories = apiStories.filter(story => !staticIds.has(story.id));
    
    return [...filteredApiStories, ...staticStories];
  } catch (error) {
    console.error('Erro ao buscar histórias:', error);
    // Em caso de erro, retorna apenas as histórias estáticas
    return staticStories;
  }
};

/**
 * Busca uma história específica por ID
 * @param {string} id - ID da história
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
    
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, busca no localStorage
      try {
        const storedData = localStorage.getItem('stories_data');
        if (storedData) {
          const stories = JSON.parse(storedData);
          return stories.find(story => story.id === id) || null;
        }
      } catch (error) {
        console.error(`Erro ao buscar história ID ${id} do localStorage:`, error);
      }
      return null;
    }
    
    // Com API disponível, busca na API
    const response = await api.get(`${ENDPOINT}/${id}`, { params: { lang } });
    return response.data || null;
  } catch (error) {
    console.error(`Erro ao buscar história ID ${id}:`, error);
    return null;
  }
};

/**
 * Cria uma nova história
 * @param {Object} storyData - Dados da história a ser cadastrada
 * @returns {Promise<Object>} História cadastrada com ID gerado
 */
export const createStory = async (storyData) => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, simula o cadastro
      await delay(800);
      
      // Gera um ID único para simular o comportamento da API
      const newStory = {
        ...storyData,
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      };
      
      // Adiciona ao localStorage para persistir entre recargas da página
      try {
        const storedData = localStorage.getItem('stories_data') || '[]';
        const stories = JSON.parse(storedData);
        stories.push(newStory);
        localStorage.setItem('stories_data', JSON.stringify(stories));
      } catch (storageError) {
        console.error('Erro ao salvar história no localStorage:', storageError);
      }
      
      return newStory;
    }

    // Com API disponível, envia para a API real
    const response = await api.post(ENDPOINT, storyData);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar história:', error);
    throw new Error('Não foi possível cadastrar a história. Tente novamente mais tarde.');
  }
};

/**
 * Atualiza uma história existente
 * @param {string} id - ID da história a ser atualizada
 * @param {Object} storyData - Novos dados da história
 * @returns {Promise<Object>} História atualizada
 */
export const updateStory = async (id, storyData) => {
  try {
    // Verifica se é uma história estática (não pode ser atualizada via API)
    const staticStory = staticStoriesData.stories.find(story => story.id === id);
    if (staticStory) {
      throw new Error('Não é possível atualizar histórias do arquivo estático.');
    }
    
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, simula a atualização
      await delay(800);
      
      try {
        const storedData = localStorage.getItem('stories_data') || '[]';
        const stories = JSON.parse(storedData);
        
        const index = stories.findIndex(s => s.id === id);
        if (index === -1) {
          throw new Error('História não encontrada');
        }
        
        const updatedStory = {
          ...stories[index],
          ...storyData,
          updatedAt: new Date().toISOString()
        };
        
        stories[index] = updatedStory;
        localStorage.setItem('stories_data', JSON.stringify(stories));
        
        return updatedStory;
      } catch (storageError) {
        console.error('Erro ao atualizar história no localStorage:', storageError);
        throw storageError;
      }
    }

    // Com API disponível, envia para a API real
    const response = await api.put(`${ENDPOINT}/${id}`, storyData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar história ID ${id}:`, error);
    throw new Error(error.message || 'Não foi possível atualizar a história. Tente novamente mais tarde.');
  }
};

/**
 * Remove uma história
 * @param {string} id - ID da história a ser removida
 * @returns {Promise<void>}
 */
export const deleteStory = async (id) => {
  try {
    // Verifica se é uma história estática (não pode ser excluída via API)
    const staticStory = staticStoriesData.stories.find(story => story.id === id);
    if (staticStory) {
      throw new Error('Não é possível excluir histórias do arquivo estático.');
    }
    
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, simula a exclusão
      await delay(800);
      
      try {
        const storedData = localStorage.getItem('stories_data') || '[]';
        const stories = JSON.parse(storedData);
        
        const index = stories.findIndex(s => s.id === id);
        if (index === -1) {
          throw new Error('História não encontrada');
        }
        
        stories.splice(index, 1);
        localStorage.setItem('stories_data', JSON.stringify(stories));
      } catch (storageError) {
        console.error('Erro ao excluir história do localStorage:', storageError);
        throw storageError;
      }
      
      return;
    }

    // Com API disponível, envia para a API real
    await api.delete(`${ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Erro ao excluir história ID ${id}:`, error);
    throw new Error(error.message || 'Não foi possível excluir a história. Tente novamente mais tarde.');
  }
};

export default {
  fetchStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
  getStoryContentByLang,
  getLocalizedStory
};
