/**
 * Configuração central da API para o aplicativo Banho de São João
 * Fornece uma instância configurada do Axios para todos os serviços
 */

import axios from 'axios';

// URL base para API - configurável por variável de ambiente
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Instância do Axios configurada para a API
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * Interceptor para adicionar o idioma aos headers de requisição
 */
api.interceptors.request.use(config => {
  // Obtém o idioma da URL ou usa português como padrão
  const pathParts = window.location.pathname.split('/');
  const lang = ['pt', 'en', 'es'].includes(pathParts[1]) ? pathParts[1] : 'pt';
  
  // Adiciona o idioma aos headers
  config.headers['Accept-Language'] = lang;
  
  return config;
});

/**
 * Interceptor para tratamento de erros
 */
api.interceptors.response.use(
  response => response,
  error => {
    // Log centralizado de erros
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Função utilitária para simular delay em ambiente de desenvolvimento
 * @param {number} ms - Tempo de delay em milissegundos
 * @returns {Promise<void>}
 */
export const delay = (ms = 300) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Verifica se a API está disponível
 * @returns {Promise<boolean>} True se a API estiver disponível, false caso contrário
 */
export const isApiAvailable = async () => {
  try {
    const response = await api.get('/health', { timeout: 5000 });
    return response.status === 200;
  } catch (error) {
    // Mantendo os logs de erro para feedback aos desenvolvedores
    if (import.meta.env.DEV) {
      // Em ambiente de desenvolvimento, exibir mensagem mais informativa
      console.warn('API não está disponível ou endpoint /health não existe:', error.message);
    } else {
      console.error('API não está disponível:', error.message);
    }
    return false;
  }
};

export default api;
