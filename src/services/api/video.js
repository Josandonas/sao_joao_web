/**
 * Serviço de API para o componente VideoSection
 * Responsável por buscar dados de vídeos por ano para a seção de vídeo da página inicial
 */

import api, { isApiAvailable } from './index';

// Constantes para endpoints da API
const ENDPOINT = '/videos';

// Ano do vídeo legado
export const LEGACY_VIDEO_YEAR = 2012;

/**
 * Busca os anos disponíveis para vídeos
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de anos disponíveis
 */
export const fetchAvailableVideoYears = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable) {
      // Se a API não estiver disponível, retorna apenas o ano legado
      console.warn('API não disponível para buscar anos de vídeos. Usando apenas o vídeo legado.');
      return [LEGACY_VIDEO_YEAR];
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/years`, { 
      params: { lang } 
    });
    
    // Obtém os anos da resposta da API
    const apiYears = response.data.years || [];
    
    // Garante que o ano legado sempre esteja na lista
    // Se o ano legado já estiver na lista da API, não o adiciona novamente
    if (!apiYears.includes(LEGACY_VIDEO_YEAR)) {
      apiYears.push(LEGACY_VIDEO_YEAR);
    }
    
    // Retorna a lista de anos ordenada do mais recente para o mais antigo
    return apiYears.sort((a, b) => b - a);
  } catch (error) {
    // Log de erro no console (sem exibir na UI)
    console.error('Erro ao buscar anos de vídeos disponíveis:', error);
    
    // Em caso de erro, retorna apenas o ano legado
    return [LEGACY_VIDEO_YEAR];
  }
};

/**
 * Busca o caminho do vídeo para um ano específico
 * @param {number} year - Ano do vídeo
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<string|null>} Caminho do vídeo ou null em caso de erro
 */
export const fetchVideoByYear = async (year, lang = 'pt') => {
  // Se for o ano legado, retorna o caminho do vídeo legado
  if (year === LEGACY_VIDEO_YEAR) {
    // Retorna o caminho do vídeo legado com base no idioma
    switch(lang) {
      case 'en':
        return `${PUBLIC_URL}/assets/videos/intro/institucional-en.mp4`;
      case 'es':
        return `${PUBLIC_URL}/assets/videos/intro/institucional-es.mp4`;
      case 'pt':
      default:
        return `${PUBLIC_URL}/assets/videos/intro/institucional-pt.mp4`;
    }
  }
  
  // Se não for o ano legado, continua com a busca na API
  
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable) {
      // Se a API não estiver disponível, retorna null
      console.warn(`API não disponível para buscar vídeo do ano ${year}.`);
      return null;
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/${year}`, { 
      params: { lang } 
    });
    
    // Retorna o caminho do vídeo
    return response.data.videoPath || null;
  } catch (error) {
    // Log de erro no console (sem exibir na UI)
    console.error(`Erro ao buscar vídeo do ano ${year}:`, error);
    
    // Em caso de erro, retorna null
    return null;
  }
};

export default {
  fetchAvailableVideoYears,
  fetchVideoByYear,
  LEGACY_VIDEO_YEAR
};
