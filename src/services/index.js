/**
 * Arquivo de exportação centralizada para todos os serviços de API
 * Facilita a importação e manutenção dos serviços em todo o projeto
 */

// Importar configuração base da API
import apiConfig, { isApiAvailable, delay } from './api/index';

// Importar serviços específicos
import storiesService from './api/stories';
import testimonialsService from './api/testimonials';
import communitiesService from './api/communities';
import programacaoService from './api/programacao';
import postcardsService from './api/postcards';
import bibliotecaService from './api/biblioteca';
import bookService from './api/book';

// Exportar todos os serviços
export {
  storiesService,
  testimonialsService,
  communitiesService,
  programacaoService,
  postcardsService,
  bibliotecaService,
  bookService,
  isApiAvailable,
  delay
};

// Exportar configurações comuns de API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || '/api',
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
  return isApiAvailable();
};

// Exportação padrão com todos os serviços organizados
export default {
  stories: storiesService,
  testimonials: testimonialsService,
  communities: communitiesService,
  programacao: programacaoService,
  postcards: postcardsService,
  biblioteca: bibliotecaService,
  book: bookService,
  api: apiConfig,
  config: API_CONFIG,
  checkApiAvailability
};
