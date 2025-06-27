/**
 * Serviço de API para o módulo Galeria
 * Responsável por buscar, enviar e processar dados da galeria de imagens
 */

import api from '../index';
import { getStoredData, isApiAvailable } from './utils';
import { STORAGE_KEYS, ENDPOINTS } from './constants';

/**
 * Busca anos disponíveis na galeria
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de anos disponíveis
 */
export const fetchGaleriaYears = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      const storedYears = getStoredData(STORAGE_KEYS.GALERIA_YEARS);
      return storedYears || [];
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINTS.GALERIA}/anos`, { params: { lang } });
    return response.data.years || [];
  } catch (error) {
    console.error('Erro ao buscar anos da galeria:', error);
    
    // Em caso de erro, tenta usar o localStorage como fallback
    if (import.meta.env.DEV) {
      const storedYears = getStoredData(STORAGE_KEYS.GALERIA_YEARS, true);
      return storedYears || [];
    }
    
    return [];
  }
};

/**
 * Busca imagens da galeria por ano
 * @param {number|string} year - Ano para buscar imagens
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de imagens do ano
 */
export const fetchGaleriaImages = async (year, lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      const storedImages = getStoredData(`${STORAGE_KEYS.GALERIA_IMAGES_PREFIX}_${year}`);
      return storedImages || [];
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINTS.GALERIA}/${year}`, { params: { lang } });
    return response.data.images || [];
  } catch (error) {
    console.error(`Erro ao buscar imagens do ano ${year}:`, error);
    
    // Em caso de erro, tenta usar o localStorage como fallback
    if (import.meta.env.DEV) {
      const storedImages = getStoredData(`${STORAGE_KEYS.GALERIA_IMAGES_PREFIX}_${year}`, true);
      return storedImages || [];
    }
    
    return [];
  }
};
