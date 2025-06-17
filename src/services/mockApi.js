/**
 * Mock da API para desenvolvimento local
 * Simula respostas da API usando dados locais
 */

// Importa os dados mockados
import programacaoEventosData from './mockData/programacao_eventos.json';

/**
 * Simula um delay de rede para tornar o mock mais realista
 * @param {number} ms - Tempo de delay em milissegundos
 * @returns {Promise<void>}
 */
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock da API para eventos da programação
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} - Dados mockados
 */
export const mockProgramacaoEvents = async (lang = 'pt') => {
  await delay();
  
  // Transforma os dados do formato JSON para o formato esperado pela aplicação
  const events = programacaoEventosData.events.map(event => {
    const translation = event.translations[lang] || event.translations.pt;
    
    return {
      id: event.id,
      title: translation.title,
      date: event.startDate,
      time: event.displayTime[lang] || event.displayTime.pt,
      location: translation.location,
      description: translation.description,
      category: event.type,
      featured: event.featured,
      imageUrl: event.imageUrl,
      tags: event.tags
    };
  });
  
  return { events };
};

/**
 * Mock da API para categorias de eventos
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} - Dados mockados
 */
export const mockEventCategories = async (lang = 'pt') => {
  await delay();
  
  // Transforma os dados do formato JSON para o formato esperado pela aplicação
  const categories = programacaoEventosData.categories.map(category => {
    return {
      id: category.id,
      name: category.translations[lang] || category.translations.pt,
      color: category.color
    };
  });
  
  return { categories };
};
