/**
 * Serviço para gerenciar as comunidades cadastradas
 * Utiliza localStorage para armazenamento temporário e integra com API
 */

import communitiesApi from './communitiesApi';

// Desestruturação das funções do serviço de API
const { fetchCommunitiesFromApi, createCommunity: apiCreateCommunity } = communitiesApi;

const COMMUNITIES_STORAGE_KEY = 'sao_joao_communities';

/**
 * Obtém todas as comunidades armazenadas localmente
 * @returns {Array} Lista de comunidades do localStorage
 */
export const getAllCommunities = () => {
  try {
    const communities = localStorage.getItem(COMMUNITIES_STORAGE_KEY);
    if (!communities) return [];
    
    const parsedCommunities = JSON.parse(communities);
    if (!Array.isArray(parsedCommunities)) {
      console.warn('Formato inválido de comunidades no localStorage');
      return [];
    }
    
    return parsedCommunities;
  } catch (error) {
    // Apenas log no console para desenvolvedores
    console.error('Erro ao carregar comunidades do localStorage:', error);
    return [];
  }
};

/**
 * Salva uma nova comunidade
 * @param {Object} community - Objeto da comunidade a ser salva
 * @returns {Promise<Object>} Comunidade salva com ID gerado
 */
export const saveCommunity = async (community) => {
  try {
    // Tenta salvar na API primeiro
    try {
      const apiCommunity = await apiCreateCommunity(community);
      console.log('Comunidade salva com sucesso na API');
      return apiCommunity;
    } catch (apiError) {
      // Apenas log no console para desenvolvedores
      console.warn('Falha ao salvar na API, salvando localmente:', apiError);
      
      // Se falhar na API, salva localmente como fallback
      const communities = getAllCommunities();
      
      // Cria um ID único para a comunidade
      const newCommunity = {
        ...community,
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      };
      
      try {
        // Adiciona a nova comunidade à lista e salva no localStorage
        communities.push(newCommunity);
        localStorage.setItem(COMMUNITIES_STORAGE_KEY, JSON.stringify(communities));
        console.log('Comunidade salva com sucesso no localStorage');
        return newCommunity;
      } catch (storageError) {
        // Apenas log no console para desenvolvedores
        console.error('Erro ao salvar no localStorage:', storageError);
        return newCommunity; // Retorna a comunidade mesmo sem conseguir salvar
      }
    }
  } catch (error) {
    // Apenas log no console para desenvolvedores
    console.error('Erro ao salvar comunidade:', error);
    throw new Error('Não foi possível salvar a comunidade.');
  }
};

/**
 * Processa e otimiza imagens antes de armazenar
 * @param {String} dataUrl - URL de dados da imagem
 * @param {Number} maxWidth - Largura máxima desejada
 * @returns {Promise<String>} URL de dados da imagem otimizada
 */
export const processImage = (dataUrl, maxWidth = 1200) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calcula as novas dimensões mantendo a proporção
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = height * ratio;
      }
      
      // Define as dimensões do canvas
      canvas.width = width;
      canvas.height = height;
      
      // Desenha a imagem redimensionada
      ctx.drawImage(img, 0, 0, width, height);
      
      // Converte para JPEG com qualidade reduzida para economizar espaço
      const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      resolve(optimizedDataUrl);
    };
    
    img.src = dataUrl;
  });
};

/**
 * Busca comunidades da API e mescla com as comunidades estáticas e locais
 * @param {Array} defaultCommunities - Lista de comunidades estáticas padrão
 * @returns {Promise<Array>} Lista mesclada de comunidades
 */
export const fetchAllCommunities = async (defaultCommunities) => {
  try {
    // Verifica se as comunidades padrão são válidas
    if (!defaultCommunities || !Array.isArray(defaultCommunities)) {
      console.warn('Comunidades padrão inválidas, usando array vazio');
      defaultCommunities = [];
    }
    
    // Busca comunidades da API
    let apiCommunities = [];
    try {
      apiCommunities = await fetchCommunitiesFromApi();
      console.log(`Carregadas ${apiCommunities.length} comunidades da API`);
    } catch (apiError) {
      // Apenas log no console para desenvolvedores
      console.warn('Erro ao buscar comunidades da API:', apiError);
    }
    
    // Busca comunidades locais
    const localCommunities = getAllCommunities();
    console.log(`Carregadas ${localCommunities.length} comunidades locais`);
    
    // Mescla todas as fontes de dados, priorizando as comunidades estáticas
    // As comunidades estáticas são preservadas e não são substituídas
    const mergedCommunities = [...defaultCommunities, ...apiCommunities, ...localCommunities];
    console.log(`Total de ${mergedCommunities.length} comunidades carregadas`);
    
    return mergedCommunities;
  } catch (error) {
    // Apenas log no console para desenvolvedores
    console.error('Erro ao buscar todas as comunidades:', error);
    
    // Em caso de erro, retorna apenas as comunidades estáticas e locais
    return updateCommunitiesData(defaultCommunities);
  }
};

/**
 * Atualiza as comunidades no armazenamento com dados mesclados das comunidades padrão e cadastradas
 * @param {Array} defaultCommunities - Lista de comunidades padrão
 * @returns {Array} Lista mesclada de comunidades estáticas e locais
 */
export const updateCommunitiesData = (defaultCommunities) => {
  try {
    // Verifica se as comunidades padrão são válidas
    if (!defaultCommunities || !Array.isArray(defaultCommunities)) {
      console.warn('Comunidades padrão inválidas, usando array vazio');
      defaultCommunities = [];
    }
    
    const userCommunities = getAllCommunities();
    
    // Mescla as comunidades padrão com as cadastradas pelo usuário
    return [...defaultCommunities, ...userCommunities];
  } catch (error) {
    // Apenas log no console para desenvolvedores
    console.error('Erro ao atualizar dados de comunidades:', error);
    return Array.isArray(defaultCommunities) ? defaultCommunities : [];
  }
};

/**
 * Verifica se uma comunidade já existe com base no nome e coordenadas
 * @param {Object} community - Comunidade a verificar
 * @param {Array} existingCommunities - Lista de comunidades existentes
 * @returns {boolean} Verdadeiro se a comunidade já existir
 */
export const communityExists = (community, existingCommunities) => {
  if (!community || !community.name || !community.coordinates) return false;
  if (!existingCommunities || !Array.isArray(existingCommunities)) return false;
  
  // Verifica por nome similar e coordenadas próximas
  return existingCommunities.some(existing => {
    // Verifica nome similar em qualquer idioma
    const nameSimilar = ['pt', 'en', 'es'].some(lang => 
      existing.name[lang]?.toLowerCase() === community.name[lang]?.toLowerCase()
    );
    
    // Verifica se as coordenadas são próximas (margem de erro de 0.001 graus ~ 100m)
    const coordsSimilar = existing.coordinates && community.coordinates &&
      Math.abs(existing.coordinates.lat - community.coordinates.lat) < 0.001 &&
      Math.abs(existing.coordinates.lng - community.coordinates.lng) < 0.001;
    
    return nameSimilar && coordsSimilar;
  });
};

export default {
  getAllCommunities,
  saveCommunity,
  processImage,
  updateCommunitiesData,
  fetchAllCommunities,
  communityExists
};
