/**
 * Exportações centralizadas para os serviços de API da Biblioteca e Galeria
 */

// Exportações da API da Biblioteca
export {
  fetchBibliotecaItems,
  fetchBibliotecaCategories,
  fetchBibliotecaItemsByCategory,
  getBibliotecaItemById
} from './bibliotecaApi';

// Exportações da API da Galeria
export {
  fetchGaleriaYears,
  fetchGaleriaImages
} from './galeriaApi';

// Exportações de utilitários (se necessário para uso externo)
export {
  paginateItems,
  createEmptyResponse
} from './utils';

// Exportações de constantes (se necessário para uso externo)
export {
  STORAGE_KEYS,
  ENDPOINTS
} from './constants';
