/**
 * Mock da API para o módulo de Depoimentos (Testimonials)
 * Simula respostas da API usando dados locais
 */

// Importa os dados mockados
import testimonialsData from './mockData/testimonials_data.json';

/**
 * Simula um delay de rede para tornar o mock mais realista
 * @param {number} ms - Tempo de delay em milissegundos
 * @returns {Promise<void>}
 */
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock da API para buscar todos os depoimentos
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} - Dados mockados
 */
export const mockGetTestimonials = async (lang = 'pt') => {
  await delay();
  
  // Transforma os dados do formato JSON para o formato esperado pela aplicação
  const testimonials = testimonialsData.testimonials.map(testimonial => {
    const translation = testimonial.translations[lang] || testimonial.translations.pt;
    
    return {
      id: testimonial.id,
      name: translation.name,
      location: translation.location,
      quote: translation.quote,
      image: testimonial.image,
      videos: testimonial.videos,
      category: testimonial.category
    };
  });
  
  return { testimonials };
};

/**
 * Mock da API para buscar categorias de depoimentos
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} - Dados mockados
 */
export const mockGetTestimonialCategories = async (lang = 'pt') => {
  await delay();
  
  // Transforma os dados do formato JSON para o formato esperado pela aplicação
  const categories = testimonialsData.categories.map(category => {
    const translation = category.translations[lang] || category.translations.pt;
    
    return {
      id: category.id,
      label: translation.label
    };
  });
  
  return { categories };
};

/**
 * Mock da API para buscar um depoimento específico por ID
 * @param {string} id - ID do depoimento
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} - Dados mockados
 */
export const mockGetTestimonialById = async (id, lang = 'pt') => {
  await delay();
  
  const testimonial = testimonialsData.testimonials.find(t => t.id === id);
  
  if (!testimonial) {
    return { testimonial: null };
  }
  
  const translation = testimonial.translations[lang] || testimonial.translations.pt;
  
  return {
    testimonial: {
      id: testimonial.id,
      name: translation.name,
      location: translation.location,
      quote: translation.quote,
      image: testimonial.image,
      videos: testimonial.videos,
      category: testimonial.category
    }
  };
};

/**
 * Mock da API para enviar um novo depoimento
 * @param {Object} testimonialData - Dados do depoimento
 * @returns {Promise<Object>} - Resposta mockada
 */
export const mockSubmitTestimonial = async (testimonialData) => {
  await delay(500); // Delay maior para simular upload
  
  // Simula uma resposta de sucesso
  return {
    success: true,
    message: 'Depoimento enviado com sucesso!',
    testimonial: {
      id: `test-${Date.now()}`, // Gera um ID único baseado no timestamp
      ...testimonialData
    }
  };
};

/**
 * Mock da API para atualizar um depoimento existente
 * @param {string} id - ID do depoimento
 * @param {Object} testimonialData - Dados atualizados do depoimento
 * @returns {Promise<Object>} - Resposta mockada
 */
export const mockUpdateTestimonial = async (id, testimonialData) => {
  await delay(500);
  
  // Simula uma resposta de sucesso
  return {
    success: true,
    message: 'Depoimento atualizado com sucesso!',
    testimonial: {
      id,
      ...testimonialData
    }
  };
};

/**
 * Mock da API para filtrar depoimentos por categoria
 * @param {string} category - Categoria para filtrar
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object>} - Dados mockados filtrados
 */
export const mockGetTestimonialsByCategory = async (category, lang = 'pt') => {
  await delay();
  
  if (category === 'all') {
    return mockGetTestimonials(lang);
  }
  
  // Filtra os depoimentos pela categoria
  const filteredTestimonials = testimonialsData.testimonials
    .filter(t => t.category === category)
    .map(testimonial => {
      const translation = testimonial.translations[lang] || testimonial.translations.pt;
      
      return {
        id: testimonial.id,
        name: translation.name,
        location: translation.location,
        quote: translation.quote,
        image: testimonial.image,
        videos: testimonial.videos,
        category: testimonial.category
      };
    });
  
  return { testimonials: filteredTestimonials };
};
