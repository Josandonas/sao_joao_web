/**
 * Serviço de API para o aplicativo Banho de São João
 * Responsável por buscar dados de APIs externas ou arquivos JSON locais
 */

// URL base para API - pode ser alterada para apontar para um servidor real no futuro
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.banhodesaojoao.corumba.ms.gov.br'
  : '/api';

/**
 * Função para buscar dados da API
 * @param {string} endpoint - Endpoint da API
 * @param {Object} options - Opções para a requisição fetch
 * @returns {Promise<any>} - Dados da resposta em formato JSON
 */
export const fetchFromAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': options.lang || 'pt',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar dados da API (${endpoint}):`, error);
    throw error;
  }
};

/**
 * Serviço para buscar eventos da programação
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} - Lista de eventos
 */
export const getProgramacaoEvents = async (lang = 'pt') => {
  try {
    const data = await fetchFromAPI('programacao/eventos', { lang });
    return data.events || [];
  } catch (error) {
    console.error('Erro ao buscar eventos da programação:', error);
    // Em caso de erro, retorna array vazio para evitar quebrar a aplicação
    return [];
  }
};

/**
 * Serviço para buscar categorias de eventos
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} - Lista de categorias
 */
export const getEventCategories = async (lang = 'pt') => {
  try {
    const data = await fetchFromAPI('programacao/categorias', { lang });
    return data.categories || [];
  } catch (error) {
    console.error('Erro ao buscar categorias de eventos:', error);
    return [];
  }
};
