/**
 * Serviço para integração com a API de histórias
 * Responsável por buscar, enviar e processar dados das histórias via API
 */

import axios from 'axios';

// URL base da API - substitua pela URL real quando disponível
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';
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
 * Busca todas as histórias da API
 * @returns {Promise<Array>} Lista de histórias da API
 */
export const fetchStoriesFromApi = async () => {
  try {
    // Em ambiente de desenvolvimento, podemos usar o arquivo de amostra
    if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
      // Importação dinâmica do arquivo de amostra
      const sampleData = await import('../data/api_stories_sample.json');
      return sampleData.stories || [];
    }

    // Em produção ou com API configurada, faz a requisição real
    const response = await api.get(STORIES_ENDPOINT);
    return response.data.stories || [];
  } catch (error) {
    console.error('Erro ao buscar histórias da API:', error);
    
    // Em caso de erro, tenta usar o arquivo de amostra como fallback
    try {
      if (process.env.NODE_ENV === 'development') {
        const sampleData = await import('../data/api_stories_sample.json');
        console.warn('Usando dados de amostra devido a erro na API');
        return sampleData.stories || [];
      }
    } catch (fallbackError) {
      console.error('Erro ao carregar dados de amostra:', fallbackError);
    }
    
    return [];
  }
};

/**
 * Envia uma nova história para a API
 * @param {Object} storyData - Dados da história a ser cadastrada
 * @returns {Promise<Object>} História cadastrada com ID gerado pela API
 */
export const createStory = async (storyData) => {
  try {
    // Em ambiente de desenvolvimento sem API, simula o cadastro
    if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
      // Simula um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Gera um ID único para simular o comportamento da API
      const newStory = {
        ...storyData,
        id: `api_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      };
      
      // Adiciona ao localStorage para persistir entre recargas da página
      const storedStories = localStorage.getItem('api_stories_sample') || '[]';
      const stories = JSON.parse(storedStories);
      stories.push(newStory);
      localStorage.setItem('api_stories_sample', JSON.stringify(stories));
      
      return newStory;
    }

    // Em produção, envia para a API real
    const response = await api.post(STORIES_ENDPOINT, storyData);
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
 * @returns {Promise<Object>} História atualizada
 */
export const updateStory = async (id, storyData) => {
  try {
    // Em ambiente de desenvolvimento sem API, simula a atualização
    if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
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
    const response = await api.put(`${STORIES_ENDPOINT}/${id}`, storyData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar história na API:', error);
    throw new Error('Não foi possível atualizar a história. Tente novamente mais tarde.');
  }
};

/**
 * Exclui uma história da API
 * @param {String} id - ID da história a ser excluída
 * @returns {Promise<void>}
 */
export const deleteStory = async (id) => {
  try {
    // Em ambiente de desenvolvimento sem API, simula a exclusão
    if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
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
    throw new Error('Não foi possível excluir a história. Tente novamente mais tarde.');
  }
};

export default {
  fetchStoriesFromApi,
  createStory,
  updateStory,
  deleteStory
};
