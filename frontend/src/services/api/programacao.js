/**
 * Serviço de API para o módulo Programação
 * Responsável por buscar eventos e categorias da programação do Banho de São João
 */

import api, { delay, isApiAvailable } from './index';

const ENDPOINT = '/programacao';

/**
 * Busca todos os eventos da programação
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de eventos
 */
export const getProgramacaoEvents = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('programacao_events_data');
        if (storedData) {
          const events = JSON.parse(storedData) || [];
          return { events };
        }
        return { events: [] };
      } catch (error) {
        console.error('Erro ao buscar eventos da programação do localStorage:', error);
        return { events: [] };
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/eventos`, { params: { lang } });
    return response.data || { events: [] };
  } catch (error) {
    console.error('Erro ao buscar eventos da programação:', error);
    return { events: [] };
  }
};

/**
 * Busca categorias de eventos da programação
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de categorias
 */
export const getEventCategories = async (lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('programacao_categories_data');
        if (storedData) {
          const categories = JSON.parse(storedData) || [];
          return { categories };
        }
        return { categories: [] };
      } catch (error) {
        console.error('Erro ao buscar categorias de eventos do localStorage:', error);
        return { categories: [] };
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/categorias`, { params: { lang } });
    return response.data || { categories: [] };
  } catch (error) {
    console.error('Erro ao buscar categorias de eventos:', error);
    return { categories: [] };
  }
};

/**
 * Busca eventos por categoria
 * @param {string} categoryId - ID da categoria
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de eventos filtrados por categoria
 */
export const getEventsByCategory = async (categoryId, lang = 'pt') => {
  try {
    // Se a categoria for "all", retorna todos os eventos
    if (categoryId === 'all') {
      return getProgramacaoEvents(lang);
    }
    
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, filtra os dados do localStorage
      try {
        const storedData = localStorage.getItem('programacao_events_data');
        if (storedData) {
          const allEvents = JSON.parse(storedData) || [];
          const filteredEvents = allEvents.filter(event => event.category === categoryId);
          return { events: filteredEvents };
        }
        return { events: [] };
      } catch (error) {
        console.error(`Erro ao buscar eventos da categoria ${categoryId} do localStorage:`, error);
        return { events: [] };
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/categoria/${categoryId}`, { params: { lang } });
    return response.data || { events: [] };
  } catch (error) {
    console.error(`Erro ao buscar eventos da categoria ${categoryId}:`, error);
    return { events: [] };
  }
};

/**
 * Busca um evento específico por ID
 * @param {string} id - ID do evento
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object|null>} Evento encontrado ou null
 */
export const getEventById = async (id, lang = 'pt') => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, usa localStorage
      try {
        const storedData = localStorage.getItem('programacao_events_data');
        if (storedData) {
          const events = JSON.parse(storedData) || [];
          return events.find(event => event.id === id) || null;
        }
        return null;
      } catch (error) {
        console.error(`Erro ao buscar evento ID ${id} do localStorage:`, error);
        return null;
      }
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/eventos/${id}`, { params: { lang } });
    return response.data || null;
  } catch (error) {
    console.error(`Erro ao buscar evento ID ${id}:`, error);
    return null;
  }
};

export default {
  getProgramacaoEvents,
  getEventCategories,
  getEventsByCategory,
  getEventById
};
