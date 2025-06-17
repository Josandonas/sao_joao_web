/**
 * Arquivo de exportação centralizada para todos os serviços de API
 * Facilita a importação e manutenção dos serviços em todo o projeto
 */

// Importar serviços específicos
import storiesApiService from './storiesApiService';

// Exportar todos os serviços
export {
  storiesApiService
};

// Exportar configurações comuns de API
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://api.example.com',
  TIMEOUT: 10000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

/**
 * Função utilitária para verificar se a API está disponível
 * @returns {Promise<boolean>} true se a API estiver disponível, false caso contrário
 */
export const checkApiAvailability = async () => {
  try {
    // Importar axios dinamicamente para evitar dependência circular
    const axios = (await import('axios')).default;
    
    // Tentar fazer uma requisição simples para verificar se a API está disponível
    await axios.get(`${API_CONFIG.BASE_URL}/health`, {
      timeout: 5000
    });
    
    return true;
  } catch (error) {
    console.warn('API não está disponível:', error.message);
    return false;
  }
};

export default {
  stories: storiesApiService,
  config: API_CONFIG,
  checkApiAvailability
};
