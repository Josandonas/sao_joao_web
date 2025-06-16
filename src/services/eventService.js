import eventsData from '../data/events.json';

/**
 * Serviço para gerenciar eventos da programação
 */
class EventService {
  /**
   * Retorna todos os eventos para um idioma específico
   * @param {string} lang - Código do idioma (pt, en, es)
   * @returns {Array} - Lista de eventos
   */
  getAllEvents(lang = 'pt') {
    return eventsData.events[lang] || [];
  }

  /**
   * Retorna um evento específico por ID
   * @param {number} id - ID do evento
   * @param {string} lang - Código do idioma (pt, en, es)
   * @returns {Object|null} - Evento encontrado ou null
   */
  getEventById(id, lang = 'pt') {
    const events = this.getAllEvents(lang);
    return events.find(event => event.id === id) || null;
  }

  /**
   * Retorna eventos para uma data específica
   * @param {Date|string} date - Data para filtrar eventos
   * @param {string} lang - Código do idioma (pt, en, es)
   * @returns {Array} - Lista de eventos filtrados
   */
  getEventsByDate(date, lang = 'pt') {
    const events = this.getAllEvents(lang);
    const targetDate = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      const eventDateString = eventDate.toISOString().split('T')[0];
      return eventDateString === targetDate;
    });
  }

  /**
   * Retorna eventos por categoria
   * @param {string} category - Categoria para filtrar
   * @param {string} lang - Código do idioma (pt, en, es)
   * @returns {Array} - Lista de eventos filtrados
   */
  getEventsByCategory(category, lang = 'pt') {
    const events = this.getAllEvents(lang);
    return events.filter(event => event.category === category);
  }

  /**
   * Retorna eventos em destaque
   * @param {string} lang - Código do idioma (pt, en, es)
   * @returns {Array} - Lista de eventos em destaque
   */
  getFeaturedEvents(lang = 'pt') {
    const events = this.getAllEvents(lang);
    return events.filter(event => event.featured);
  }

  /**
   * Retorna o nome da categoria traduzido
   * @param {string} categoryKey - Chave da categoria
   * @param {string} lang - Código do idioma (pt, en, es)
   * @returns {string} - Nome da categoria traduzido
   */
  getCategoryName(categoryKey, lang = 'pt') {
    return eventsData.categories[categoryKey]?.[lang] || categoryKey;
  }

  /**
   * Retorna todas as categorias disponíveis
   * @param {string} lang - Código do idioma (pt, en, es)
   * @returns {Array} - Lista de categorias com chave e nome traduzido
   */
  getAllCategories(lang = 'pt') {
    return Object.entries(eventsData.categories).map(([key, translations]) => ({
      key,
      name: translations[lang] || key
    }));
  }

  /**
   * Retorna um template para criação de novo evento
   * @param {string} lang - Código do idioma (pt, en, es)
   * @returns {Object} - Template de evento
   */
  getEventTemplate(lang = 'pt') {
    const template = JSON.parse(JSON.stringify(eventsData.eventTemplate));
    return template;
  }
  
  /**
   * Cria um novo evento com traduções para todos os idiomas
   * @param {Object} eventData - Dados do evento para todos os idiomas
   * @returns {Object} - Objeto com os eventos criados para cada idioma
   */
  createMultilingualEvent(eventData) {
    // Verificar se os dados estão no formato correto
    if (!eventData.translations || !eventData.commonData) {
      throw new Error('Formato de dados inválido para evento multilíngue');
    }
    
    // Gerar ID único se não fornecido
    const eventId = eventData.commonData.id || Date.now();
    
    // Criar eventos para cada idioma
    const result = {};
    
    ['pt', 'en', 'es'].forEach(lang => {
      if (!eventData.translations[lang]) {
        console.warn(`Tradução para o idioma ${lang} não fornecida`);
        return;
      }
      
      // Combinar dados comuns com traduções específicas
      result[lang] = {
        ...eventData.translations[lang],
        id: eventId,
        date: eventData.commonData.eventDate,
        category: eventData.commonData.category,
        featured: eventData.commonData.featured,
        additionalInfo: eventData.commonData.additionalInfo
      };
    });
    
    return result;
  }
}

// Exporta uma instância única do serviço
export default new EventService();
