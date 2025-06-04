/**
 * Serviço para gerenciar as comunidades cadastradas
 * Utiliza localStorage para armazenamento temporário 
 */

const COMMUNITIES_STORAGE_KEY = 'sao_joao_communities';

/**
 * Obtém todas as comunidades armazenadas
 * @returns {Array} Lista de comunidades
 */
export const getAllCommunities = () => {
  try {
    const communities = localStorage.getItem(COMMUNITIES_STORAGE_KEY);
    return communities ? JSON.parse(communities) : [];
  } catch (error) {
    console.error('Erro ao carregar comunidades:', error);
    return [];
  }
};

/**
 * Salva uma nova comunidade
 * @param {Object} community - Objeto da comunidade a ser salva
 * @returns {Object} Comunidade salva com ID gerado
 */
export const saveCommunity = (community) => {
  try {
    const communities = getAllCommunities();
    
    // Cria um ID único para a comunidade
    const newCommunity = {
      ...community,
      id: `community_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    
    // Adiciona a nova comunidade à lista
    communities.push(newCommunity);
    
    // Salva no localStorage
    localStorage.setItem(COMMUNITIES_STORAGE_KEY, JSON.stringify(communities));
    
    return newCommunity;
  } catch (error) {
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
 * Atualiza as comunidades no armazenamento com dados mesclados das comunidades padrão e cadastradas
 * @param {Array} defaultCommunities - Lista de comunidades padrão
 */
export const updateCommunitiesData = (defaultCommunities) => {
  const userCommunities = getAllCommunities();
  
  // Se não houver comunidades cadastradas pelo usuário, retorna as padrão
  if (userCommunities.length === 0) {
    return defaultCommunities;
  }
  
  // Mescla as comunidades padrão com as cadastradas pelo usuário
  return [...defaultCommunities, ...userCommunities];
};

export default {
  getAllCommunities,
  saveCommunity,
  processImage,
  updateCommunitiesData
};
