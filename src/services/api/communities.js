/**
 * Serviço de API para o módulo Communities
 * Responsável por buscar, enviar e processar dados das comunidades
 */

import api, { delay, isApiAvailable } from './index';

const ENDPOINT = '/communities';

/**
 * Busca todas as comunidades
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de comunidades
 */
export const fetchCommunities = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('communities_data');
        if (storedData) {
          return JSON.parse(storedData) || [];
        }
        return [];
      } catch (error) {
        console.error('Erro ao buscar comunidades do localStorage:', error);
        return [];
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(ENDPOINT, { params: { lang } });
    return response.data.communities || [];
  } catch (error) {
    console.error('Erro ao buscar comunidades:', error);
    
    // Em caso de erro, tenta usar o localStorage como fallback
    if (import.meta.env.DEV) {
      try {
        const storedData = localStorage.getItem('communities_data');
        if (storedData) {
          console.warn('Usando dados armazenados devido a erro na API');
          return JSON.parse(storedData) || [];
        }
      } catch (fallbackError) {
        console.error('Erro ao carregar dados de fallback:', fallbackError);
      }
    }
    
    return [];
  }
};

/**
 * Busca uma comunidade específica por ID
 * @param {string} id - ID da comunidade
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object|null>} Comunidade encontrada ou null
 */
export const getCommunityById = async (id, lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('communities_data');
        if (storedData) {
          const communities = JSON.parse(storedData);
          return communities.find(community => community.id === id) || null;
        }
        return null;
      } catch (error) {
        console.error(`Erro ao buscar comunidade ID ${id} do localStorage:`, error);
        return null;
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/${id}`, { params: { lang } });
    return response.data || null;
  } catch (error) {
    console.error(`Erro ao buscar comunidade ID ${id}:`, error);
    return null;
  }
};

/**
 * Cria uma nova comunidade
 * @param {Object} communityData - Dados da comunidade a ser cadastrada
 * @returns {Promise<Object>} Comunidade cadastrada com ID gerado
 */
export const createCommunity = async (communityData) => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, simula o cadastro
      await delay(800);
      
      // Gera um ID único para simular o comportamento da API
      const newCommunity = {
        ...communityData,
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      };
      
      // Adiciona ao localStorage para persistir entre recargas da página
      try {
        const storedData = localStorage.getItem('communities_data') || '[]';
        const communities = JSON.parse(storedData);
        communities.push(newCommunity);
        localStorage.setItem('communities_data', JSON.stringify(communities));
      } catch (storageError) {
        console.error('Erro ao salvar comunidade no localStorage:', storageError);
      }
      
      return newCommunity;
    }

    // Com API disponível, envia para a API real
    const response = await api.post(ENDPOINT, communityData);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar comunidade:', error);
    throw new Error('Não foi possível cadastrar a comunidade. Tente novamente mais tarde.');
  }
};

/**
 * Atualiza uma comunidade existente
 * @param {string} id - ID da comunidade a ser atualizada
 * @param {Object} communityData - Novos dados da comunidade
 * @returns {Promise<Object>} Comunidade atualizada
 */
export const updateCommunity = async (id, communityData) => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, simula a atualização
      await delay(800);
      
      try {
        const storedData = localStorage.getItem('communities_data') || '[]';
        const communities = JSON.parse(storedData);
        
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
        localStorage.setItem('communities_data', JSON.stringify(communities));
        
        return updatedCommunity;
      } catch (storageError) {
        console.error('Erro ao atualizar comunidade no localStorage:', storageError);
        throw storageError;
      }
    }

    // Com API disponível, envia para a API real
    const response = await api.put(`${ENDPOINT}/${id}`, communityData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar comunidade ID ${id}:`, error);
    throw new Error('Não foi possível atualizar a comunidade. Tente novamente mais tarde.');
  }
};

/**
 * Remove uma comunidade
 * @param {string} id - ID da comunidade a ser removida
 * @returns {Promise<void>}
 */
export const deleteCommunity = async (id) => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, simula a remoção
      await delay(800);
      
      try {
        const storedData = localStorage.getItem('communities_data') || '[]';
        const communities = JSON.parse(storedData);
        
        const index = communities.findIndex(c => c.id === id);
        if (index === -1) {
          throw new Error('Comunidade não encontrada');
        }
        
        communities.splice(index, 1);
        localStorage.setItem('communities_data', JSON.stringify(communities));
      } catch (storageError) {
        console.error('Erro ao remover comunidade do localStorage:', storageError);
        throw storageError;
      }
      
      return;
    }

    // Com API disponível, envia para a API real
    await api.delete(`${ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Erro ao remover comunidade ID ${id}:`, error);
    throw new Error('Não foi possível remover a comunidade. Tente novamente mais tarde.');
  }
};

/**
 * Obtém todas as comunidades armazenadas localmente
 * @returns {Array} Lista de comunidades do localStorage
 */
export const getAllCommunities = () => {
  try {
    const communities = localStorage.getItem('sao_joao_communities');
    if (!communities) return [];
    
    const parsedCommunities = JSON.parse(communities);
    if (!Array.isArray(parsedCommunities)) {
      console.warn('Formato inválido de comunidades no localStorage');
      return [];
    }
    
    return parsedCommunities;
  } catch (error) {
    console.error('Erro ao carregar comunidades do localStorage:', error);
    return [];
  }
};

/**
 * Mescla comunidades estáticas e locais
 * @param {Array} defaultCommunities - Lista de comunidades padrão
 * @returns {Array} Lista mesclada de comunidades estáticas e locais
 */
export const mergeCommunities = (defaultCommunities) => {
  try {
    // Verifica se as comunidades padrão são válidas
    if (!defaultCommunities || !Array.isArray(defaultCommunities)) {
      console.warn('Comunidades padrão inválidas, usando array vazio');
      defaultCommunities = [];
    }
    
    // Busca comunidades locais
    const localCommunities = getAllCommunities();
    
    // Mescla comunidades estáticas e locais
    const mergedCommunities = [...defaultCommunities, ...localCommunities];
    
    return mergedCommunities;
  } catch (error) {
    console.error('Erro ao mesclar comunidades:', error);
    return defaultCommunities || [];
  }
};

/**
 * Verifica se uma comunidade já existe com base no nome e coordenadas
 * @param {Object} community - Comunidade a verificar
 * @param {Array} existingCommunities - Lista de comunidades existentes
 * @returns {boolean} Verdadeiro se a comunidade já existir
 */
export const communityExists = (community, existingCommunities) => {
  if (!community || !existingCommunities || !Array.isArray(existingCommunities)) {
    return false;
  }
  
  // Extrai o nome da comunidade no idioma atual ou em português
  const communityName = community.name ? 
    (typeof community.name === 'object' ? 
      (Object.values(community.name)[0] || '').toLowerCase() : 
      community.name.toLowerCase()) : 
    '';
  
  // Verifica se existe uma comunidade com nome similar (ignorando case)
  const similarNameCommunity = existingCommunities.find(existing => {
    const existingName = existing.name ? 
      (typeof existing.name === 'object' ? 
        (Object.values(existing.name)[0] || '').toLowerCase() : 
        existing.name.toLowerCase()) : 
      '';
    
    return existingName === communityName;
  });
  
  // Se encontrou uma comunidade com nome similar, verifica se as coordenadas são próximas
  if (similarNameCommunity && community.coordinates && similarNameCommunity.coordinates) {
    const distance = calculateDistance(
      community.coordinates.lat,
      community.coordinates.lng,
      similarNameCommunity.coordinates.lat,
      similarNameCommunity.coordinates.lng
    );
    
    // Se a distância for menor que 500 metros, considera como a mesma comunidade
    return distance < 0.5;
  }
  
  return false;
};

/**
 * Calcula a distância entre dois pontos geográficos em km
 * @param {number} lat1 - Latitude do ponto 1
 * @param {number} lon1 - Longitude do ponto 1
 * @param {number} lat2 - Latitude do ponto 2
 * @param {number} lon2 - Longitude do ponto 2
 * @returns {number} Distância em km
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Busca comunidades da API e mescla com as comunidades estáticas e locais
 * @param {Array} defaultCommunities - Lista de comunidades estáticas padrão
 * @returns {Promise<Array>} Lista mesclada de comunidades
 */
export const fetchAllCommunities = async (defaultCommunities = []) => {
  try {
    // Verifica se as comunidades padrão são válidas
    if (!defaultCommunities || !Array.isArray(defaultCommunities)) {
      console.warn('Comunidades padrão inválidas, usando array vazio');
      defaultCommunities = [];
    }
    
    // Busca comunidades da API
    let apiCommunities = [];
    try {
      apiCommunities = await fetchCommunities();
      console.log(`Carregadas ${apiCommunities.length} comunidades da API`);
    } catch (apiError) {
      console.warn('Erro ao buscar comunidades da API:', apiError);
    }
    
    // Busca comunidades locais
    const localCommunities = getAllCommunities();
    console.log(`Carregadas ${localCommunities.length} comunidades locais`);
    
    // Mescla todas as fontes de dados, priorizando as comunidades estáticas
    const mergedCommunities = [...defaultCommunities, ...apiCommunities, ...localCommunities];
    console.log(`Total de ${mergedCommunities.length} comunidades carregadas`);
    
    return mergedCommunities;
  } catch (error) {
    console.error('Erro ao buscar todas as comunidades:', error);
    
    // Em caso de erro, retorna apenas as comunidades estáticas e locais
    return mergeCommunities(defaultCommunities);
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

export default {
  fetchCommunities,
  getCommunityById,
  createCommunity,
  updateCommunity,
  deleteCommunity,
  fetchAllCommunities,
  mergeCommunities,
  communityExists,
  getAllCommunities,
  processImage
};
