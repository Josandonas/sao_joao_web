/**
 * Serviço de API para o componente Hero
 * Responsável por buscar imagens dinâmicas para o carrossel da página inicial
 */

import api, { isApiAvailable } from './index';

// Constantes para endpoints da API
const ENDPOINT = '/hero';

/**
 * Busca imagens para o carrossel Hero
 * @param {number} limit - Número máximo de imagens a serem retornadas
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de caminhos de imagens
 */
export const fetchHeroImages = async (limit = 14, lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable) {
      // Se a API não estiver disponível, retorna array vazio
      // O componente usará as imagens legadas como fallback
      console.warn('API não disponível para buscar imagens do Hero. Usando imagens legadas.');
      return [];
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(ENDPOINT, { 
      params: { 
        limit,
        lang 
      } 
    });
    
    // Retorna o array de caminhos de imagem
    return response.data.images || [];
  } catch (error) {
    // Log de erro no console (sem exibir na UI)
    console.error('Erro ao buscar imagens para o Hero:', error);
    
    // Em caso de erro, retorna array vazio
    // O componente usará as imagens legadas como fallback
    return [];
  }
};

export default {
  fetchHeroImages
};
