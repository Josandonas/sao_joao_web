/**
 * Serviço para integração com a API de comunidades
 * Responsável por buscar, enviar e processar dados das comunidades via API
 */

import axios from 'axios';

// URL base da API - substitua pela URL real quando disponível
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';
const COMMUNITIES_ENDPOINT = '/communities';

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
 * Busca todas as comunidades da API
 * @returns {Promise<Array>} Lista de comunidades da API
 */
export const fetchCommunitiesFromApi = async () => {
  try {
    // Em ambiente de desenvolvimento, podemos usar o arquivo de amostra
    if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
      // Importação dinâmica do arquivo de amostra
      const sampleData = await import('../data/api_communities_sample.json');
      return sampleData.communities || [];
    }

    // Em produção ou com API configurada, faz a requisição real
    const response = await api.get(COMMUNITIES_ENDPOINT);
    return response.data.communities || [];
  } catch (error) {
    console.error('Erro ao buscar comunidades da API:', error);
    
    // Em caso de erro, tenta usar o arquivo de amostra como fallback
    try {
      if (process.env.NODE_ENV === 'development') {
        const sampleData = await import('../data/api_communities_sample.json');
        console.warn('Usando dados de amostra devido a erro na API');
        return sampleData.communities || [];
      }
    } catch (fallbackError) {
      console.error('Erro ao carregar dados de amostra:', fallbackError);
    }
    
    return [];
  }
};

/**
 * Envia uma nova comunidade para a API
 * @param {Object} communityData - Dados da comunidade a ser cadastrada
 * @returns {Promise<Object>} Comunidade cadastrada com ID gerado pela API
 */
export const createCommunity = async (communityData) => {
  try {
    // Em ambiente de desenvolvimento sem API, simula o cadastro
    if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
      // Simula um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Gera um ID único para simular o comportamento da API
      const newCommunity = {
        ...communityData,
        id: `api_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      };
      
      // Adiciona ao localStorage para persistir entre recargas da página
      const storedCommunities = localStorage.getItem('api_communities_sample') || '[]';
      const communities = JSON.parse(storedCommunities);
      communities.push(newCommunity);
      localStorage.setItem('api_communities_sample', JSON.stringify(communities));
      
      return newCommunity;
    }

    // Em produção, envia para a API real
    const response = await api.post(COMMUNITIES_ENDPOINT, communityData);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar comunidade na API:', error);
    throw new Error('Não foi possível cadastrar a comunidade. Tente novamente mais tarde.');
  }
};

/**
 * Atualiza uma comunidade existente na API
 * @param {String} id - ID da comunidade a ser atualizada
 * @param {Object} communityData - Novos dados da comunidade
 * @returns {Promise<Object>} Comunidade atualizada
 */
export const updateCommunity = async (id, communityData) => {
  try {
    // Em ambiente de desenvolvimento sem API, simula a atualização
    if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const storedCommunities = localStorage.getItem('api_communities_sample') || '[]';
      const communities = JSON.parse(storedCommunities);
      
      const index = communities.findIndex(c => c.id === id);
      if (index === -1) {
        throw new Error('Comunidade não encontrada');
      }
      
      const updatedCommunity = {
        ...communities[index],
        ...communityData,
        updatedAt: new Date().toISOString()
      };
      
      communities[index] = updatedCommunity;
      localStorage.setItem('api_communities_sample', JSON.stringify(communities));
      
      return updatedCommunity;
    }

    // Em produção, envia para a API real
    const response = await api.put(`${COMMUNITIES_ENDPOINT}/${id}`, communityData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar comunidade na API:', error);
    throw new Error('Não foi possível atualizar a comunidade. Tente novamente mais tarde.');
  }
};

export default {
  fetchCommunitiesFromApi,
  createCommunity,
  updateCommunity
};
