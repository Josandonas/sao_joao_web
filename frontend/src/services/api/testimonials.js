/**
 * Serviço de API para o módulo Testimonials
 * Responsável por buscar, enviar e processar dados dos depoimentos
 */

import api, { delay, isApiAvailable } from './index';
import { testimonialData, categories } from '../../pages/Testimonials/data/testimonialData';

const ENDPOINT = '/testimonials';

/**
 * Normaliza a estrutura de um depoimento para o formato padrão usado na aplicação
 * @param {Object} testimonial - Depoimento a ser normalizado
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Object} - Depoimento normalizado
 */
export const normalizeTestimonial = (testimonial, lang = 'pt') => {
  // Seleciona o vídeo correto com base no idioma ou mantém a estrutura de vídeos
  let videoUrl = null;
  let videos = null;
  
  if (testimonial.videos) {
    videos = testimonial.videos;
    videoUrl = testimonial.videos[lang] || testimonial.videos.pt;
  } else if (testimonial.videoUrl) {
    videoUrl = testimonial.videoUrl;
    // Cria uma estrutura de vídeos compatível
    videos = { pt: testimonial.videoUrl };
    if (lang !== 'pt') videos[lang] = testimonial.videoUrl;
  } else if (testimonial.video) {
    videoUrl = testimonial.video;
    videos = { pt: testimonial.video };
    if (lang !== 'pt') videos[lang] = testimonial.video;
  }
  
  // Verifica se o nome é um objeto com traduções ou uma string
  let name = testimonial.name;
  if (typeof testimonial.name === 'object') {
    name = testimonial.name[lang] || testimonial.name.pt;
  }
  
  // Verifica se a localização é um objeto com traduções ou uma string
  let location = testimonial.location;
  if (typeof testimonial.location === 'object') {
    location = testimonial.location[lang] || testimonial.location.pt;
  }
  
  // Verifica se o texto/quote é um objeto com traduções ou uma string
  // Padroniza para usar sempre a propriedade 'text'
  let text = testimonial.text || testimonial.quote || '';
  if (typeof text === 'object') {
    text = text[lang] || text.pt;
  } else if (testimonial.translations && testimonial.translations[lang] && testimonial.translations[lang].text) {
    // Tenta buscar do formato alternativo de traduções
    text = testimonial.translations[lang].text;
  }
  
  // Padroniza a estrutura do depoimento
  return {
    id: testimonial.id,
    name,
    text,
    location,
    videoUrl,
    videos,
    imageUrl: testimonial.image || testimonial.imageUrl || '', // Suporta ambos os formatos
    category: testimonial.category || 'other',
    featured: testimonial.featured || false,
    status: testimonial.status || 'approved', // Dados estáticos são sempre aprovados
    currentLang: lang // Adiciona o idioma atual para facilitar debug
  };
};

/**
 * Converte os dados estáticos para o formato esperado pela aplicação
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Array} - Dados estáticos formatados
 */
export const getStaticTestimonials = (lang = 'pt') => {
  console.log(`[DEBUG] Convertendo dados estáticos para o formato da aplicação (idioma: ${lang})`);
  
  return testimonialData.map(item => {
    const normalizedItem = normalizeTestimonial(item, lang);
    console.log(`[DEBUG] Depoimento estático ID ${normalizedItem.id}, categoria: ${normalizedItem.category}, idioma: ${lang}`);
    return normalizedItem;
  });
};

/**
 * Converte os dados estáticos de categorias para o formato esperado pela aplicação
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Array} - Categorias estáticas formatadas
 */
export const getStaticCategories = (lang = 'pt') => {
  console.log('[DEBUG] Obtendo categorias estáticas');
  
  // Primeiro, adiciona a categoria 'all' se não existir
  const allCategories = [...categories];
  const hasAllCategory = allCategories.some(cat => cat.id === 'all');
  
  if (!hasAllCategory) {
    allCategories.unshift({
      id: 'all',
      label: 'Todos',
      labelEn: 'All',
      labelEs: 'Todos'
    });
  }
  
  const result = allCategories.map(category => {
    // Conta quantos depoimentos existem para esta categoria
    const count = category.id === 'all' 
      ? testimonialData.length 
      : testimonialData.filter(item => item.category === category.id).length;
    
    // Seleciona o label correto com base no idioma
    let label = category.label;
    if (lang === 'en' && category.labelEn) {
      label = category.labelEn;
    } else if (lang === 'es' && category.labelEs) {
      label = category.labelEs;
    }
    
    console.log(`[DEBUG] Categoria estática: id=${category.id}, label=${label}, idioma=${lang}, count=${count}`);
    
    return {
      id: category.id,
      label: label, // Usa o label traduzido
      labelEn: category.labelEn || category.label,
      labelEs: category.labelEs || category.label,
      count: count
    };
  });
  
  return result;
};

/**
 * Busca todos os depoimentos
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de depoimentos
 */
export const fetchTestimonials = async (lang = 'pt') => {
  try {
    console.log(`[DEBUG] Service: Buscando todos os depoimentos (idioma: ${lang})`);
    
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    // Obtém os dados estáticos
    const staticData = getStaticTestimonials(lang);
    console.log(`[DEBUG] Service: ${staticData.length} depoimentos estáticos carregados para idioma ${lang}`);
    
    // Verifica se os dados estáticos têm o idioma correto
    if (staticData.length > 0) {
      console.log(`[DEBUG] Service: Exemplo de depoimento estático:`, {
        id: staticData[0].id,
        text: staticData[0].text?.substring(0, 30) + '...',
        currentLang: staticData[0].currentLang || 'não definido'
      });
    }
    
    // Cria um Map com os IDs dos depoimentos estáticos para referência rápida
    const staticIds = new Set(staticData.map(item => item.id));
    
    if (!apiAvailable) {
      console.log('[DEBUG] Service: API não disponível, usando dados estáticos e localStorage');
      
      // Em desenvolvimento sem API, tenta usar localStorage
      if (import.meta.env.DEV) {
        try {
          const storedData = localStorage.getItem('testimonials_data');
          if (storedData) {
            const localData = JSON.parse(storedData) || [];
            // Normaliza os dados do localStorage
            const normalizedLocalData = localData.map(item => normalizeTestimonial(item, lang));
            
            // Combina dados do localStorage com dados estáticos
            // Garante que todos os dados estáticos estejam presentes
            const combinedData = [...normalizedLocalData];
            
            // Adiciona dados estáticos que não existem no localStorage
            staticData.forEach(staticItem => {
              if (!combinedData.some(item => item.id === staticItem.id)) {
                combinedData.push(staticItem);
              }
            });
            
            return combinedData;
          }
        } catch (error) {
          console.error('Erro ao buscar depoimentos do localStorage:', error);
        }
      }
      
      return staticData;
    }
    
    // Se a API estiver disponível, busca os dados da API
    await delay(500); // Simula um pequeno delay de rede
    const response = await api.get(`${ENDPOINT}?lang=${lang}`);
    
    if (response.data && Array.isArray(response.data)) {
      console.log(`[DEBUG] Service: ${response.data.length} depoimentos recebidos da API`);
      
      // Normaliza os dados da API
      const normalizedApiData = response.data.map(item => normalizeTestimonial(item, lang));
      
      // Combina dados da API com dados estáticos
      const combinedData = [...normalizedApiData];
      
      // Adiciona dados estáticos que não existem na API
      staticData.forEach(staticItem => {
        if (!combinedData.some(item => item.id === staticItem.id)) {
          combinedData.push(staticItem);
        }
      });
      
      console.log(`[DEBUG] Service: ${combinedData.length} depoimentos combinados (API + estáticos)`);
      return combinedData;
    }
    
    return staticData;
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    
    // Em caso de erro, obtém os dados estáticos
    const staticData = getStaticTestimonials(lang);
    
    // Tenta usar o localStorage como fallback adicional
    if (import.meta.env.DEV) {
      try {
        const storedData = localStorage.getItem('testimonials_data');
        if (storedData) {
          console.warn('Usando dados estáticos e armazenados devido a erro na API');
          const localData = JSON.parse(storedData) || [];
          return [...localData, ...staticData];
        }
      } catch (fallbackError) {
        console.error('Erro ao carregar dados de fallback:', fallbackError);
      }
    }
    
    // Retorna pelo menos os dados estáticos
    return staticData;
  }
};

/**
 * Busca categorias de depoimentos
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de categorias
 */
export const fetchTestimonialCategories = async (lang = 'pt') => {
  try {
    // Sempre obtém as categorias estáticas primeiro, passando o idioma atual
    const staticCategories = getStaticCategories(lang);
    
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    // Se a API não estiver disponível, usa categorias estáticas + localStorage
    if (!apiAvailable) {
      console.log(`[DEV] API não disponível, usando categorias estáticas e localStorage (idioma: ${lang})`);
      
      // Em desenvolvimento sem API, tenta usar localStorage
      if (import.meta.env.DEV) {
        try {
          const storedData = localStorage.getItem('testimonial_categories_data');
          if (storedData) {
            const localCategories = JSON.parse(storedData) || [];
            // Combina categorias estáticas com localStorage
            // Evita duplicação de categorias com mesmo ID
            const mergedCategories = [...staticCategories];
            
            localCategories.forEach(localCat => {
              if (!mergedCategories.some(cat => cat.id === localCat.id)) {
                mergedCategories.push(localCat);
              }
            });
            
            return mergedCategories;
          }
        } catch (error) {
          console.error('Erro ao buscar categorias de depoimentos do localStorage:', error);
        }
      }
      
      // Se não conseguir dados do localStorage, retorna apenas as estáticas
      return staticCategories;
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/categories`, { params: { lang } });
    const apiCategories = response.data.categories || [];
    
    // Combina categorias da API com estáticas, evitando duplicações
    const mergedCategories = [...staticCategories];
    
    apiCategories.forEach(apiCat => {
      if (!mergedCategories.some(cat => cat.id === apiCat.id)) {
        mergedCategories.push(apiCat);
      }
    });
    
    return mergedCategories;
  } catch (error) {
    console.error('Erro ao buscar categorias de depoimentos:', error);
    
    // Em caso de erro, retorna pelo menos as categorias estáticas
    return getStaticCategories();
  }
};

/**
 * Busca depoimentos por categoria
 * @param {string} category - ID da categoria
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Array>} Lista de depoimentos filtrados por categoria
 */
export const fetchTestimonialsByCategory = async (category, lang = 'pt') => {
  try {
    console.log(`[DEBUG] Filtrando depoimentos por categoria: ${category}`);
    
    // Se a categoria for "all", retorna todos os depoimentos
    if (category === 'all') {
      console.log('[DEBUG] Categoria "all" selecionada, retornando todos os depoimentos');
      return fetchTestimonials(lang);
    }
    
    // Obtém todos os dados estáticos
    const allStaticData = getStaticTestimonials(lang);
    console.log(`[DEBUG] Total de depoimentos estáticos: ${allStaticData.length}`);
    
    // Log das categorias disponíveis nos dados estáticos
    const availableCategories = [...new Set(allStaticData.map(item => item.category))];
    console.log('[DEBUG] Categorias disponíveis nos dados estáticos:', availableCategories);
    
    // Filtra os dados estáticos pela categoria
    const staticData = allStaticData.filter(testimonial => {
      const match = testimonial.category === category;
      console.log(`[DEBUG] Depoimento ID ${testimonial.id}, categoria: ${testimonial.category}, match: ${match}`);
      return match;
    });
    
    console.log(`[DEBUG] Depoimentos estáticos filtrados para categoria '${category}': ${staticData.length}`);
    
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    // Se a API não estiver disponível, combina dados estáticos com localStorage
    if (!apiAvailable) {
      console.log(`[DEV] API não disponível, usando dados estáticos e localStorage para categoria ${category}`);
      
      // Em desenvolvimento sem API, tenta usar localStorage
      if (import.meta.env.DEV) {
        try {
          const storedData = localStorage.getItem('testimonials_data');
          if (storedData) {
            const localData = JSON.parse(storedData) || [];
            console.log(`[DEBUG] Dados do localStorage: ${localData.length} depoimentos`);
            
            // Filtra os dados do localStorage pela categoria
            const filteredLocalData = localData.filter(testimonial => testimonial.category === category);
            console.log(`[DEBUG] Depoimentos do localStorage filtrados: ${filteredLocalData.length}`);
            
            // Combina dados filtrados (localStorage primeiro, depois estáticos)
            const result = [...filteredLocalData, ...staticData];
            console.log(`[DEBUG] Total de depoimentos combinados: ${result.length}`);
            return result;
          }
        } catch (error) {
          console.error('Erro ao buscar depoimentos por categoria do localStorage:', error);
        }
      }
      
      // Se não conseguir dados do localStorage, retorna apenas os estáticos filtrados
      console.log(`[DEBUG] Retornando apenas dados estáticos filtrados: ${staticData.length}`);
      return staticData;
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/category/${category}`, { params: { lang } });
    const apiData = response.data.testimonials || [];
    console.log(`[DEBUG] Depoimentos da API para categoria '${category}': ${apiData.length}`);
    
    // Combina dados da API com dados estáticos filtrados (API primeiro, depois estáticos)
    const result = [...apiData, ...staticData];
    console.log(`[DEBUG] Total de depoimentos combinados (API + estáticos): ${result.length}`);
    return result;
  } catch (error) {
    console.error(`Erro ao buscar depoimentos da categoria ${category}:`, error);
    
    // Em caso de erro, retorna pelo menos os dados estáticos filtrados
    const fallbackData = getStaticTestimonials(lang).filter(testimonial => testimonial.category === category);
    console.log(`[DEBUG] Retornando dados de fallback: ${fallbackData.length} depoimentos`);
    return fallbackData;
  }
};

/**
 * Busca um depoimento específico por ID
 * @param {string} id - ID do depoimento
 * @param {string} lang - Idioma atual (pt, en, es)
 * @returns {Promise<Object|null>} Depoimento encontrado ou null
 */
export const getTestimonialById = async (id, lang = 'pt') => {
  try {
    // Primeiro, verifica nos dados estáticos
    const staticData = getStaticTestimonials(lang);
    const staticTestimonial = staticData.find(testimonial => testimonial.id === id);
    
    // Se encontrou nos dados estáticos, retorna imediatamente
    if (staticTestimonial) {
      return staticTestimonial;
    }
    
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    // Se a API não estiver disponível, tenta buscar no localStorage
    if (!apiAvailable) {
      console.log(`[DEV] API não disponível, buscando depoimento ID ${id} no localStorage`);
      
      if (import.meta.env.DEV) {
        try {
          const storedData = localStorage.getItem('testimonials_data');
          if (storedData) {
            const testimonials = JSON.parse(storedData);
            return testimonials.find(testimonial => testimonial.id === id) || null;
          }
        } catch (error) {
          console.error(`Erro ao buscar depoimento ID ${id} do localStorage:`, error);
        }
      }
      
      // Se não encontrou em nenhum lugar, retorna null
      return null;
    }

    // Com API disponível, faz a requisição real
    const response = await api.get(`${ENDPOINT}/${id}`, { params: { lang } });
    return response.data || null;
  } catch (error) {
    console.error(`Erro ao buscar depoimento ID ${id}:`, error);
    
    // Em caso de erro, tenta buscar nos dados estáticos como fallback final
    const staticData = getStaticTestimonials(lang);
    return staticData.find(testimonial => testimonial.id === id) || null;
  }
};

/**
 * Envia um novo depoimento
 * @param {Object|FormData} testimonialData - Dados do depoimento ou FormData com arquivo
 * @returns {Promise<Object>} Depoimento cadastrado com ID gerado
 */
export const submitTestimonial = async (testimonialData) => {
  try {
    // Verifica se a API está disponível
    const apiAvailable = await isApiAvailable();
    
    if (!apiAvailable && import.meta.env.DEV) {
      // Em desenvolvimento sem API, simula o envio
      await delay(800);
      
      // Gera um ID único para simular o comportamento da API
      const isFormData = testimonialData instanceof FormData;
      
      // Se for FormData, extrai os dados para salvar no localStorage
      let dataToStore;
      if (isFormData) {
        dataToStore = {};
        for (const [key, value] of testimonialData.entries()) {
          // Ignora arquivos, pois não podem ser armazenados diretamente no localStorage
          if (!(value instanceof File)) {
            dataToStore[key] = value;
          }
        }
      } else {
        dataToStore = { ...testimonialData };
      }
      
      const newTestimonial = {
        ...dataToStore,
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        status: 'pending' // Depoimentos enviados pelo usuário ficam pendentes de aprovação
      };
      
      // Adiciona ao localStorage para persistir entre recargas da página
      try {
        const storedData = localStorage.getItem('testimonials_data') || '[]';
        const testimonials = JSON.parse(storedData);
        testimonials.push(newTestimonial);
        localStorage.setItem('testimonials_data', JSON.stringify(testimonials));
      } catch (storageError) {
        console.error('Erro ao salvar depoimento no localStorage:', storageError);
      }
      
      return newTestimonial;
    }

    // Com API disponível, envia para a API real
    // Se for FormData, configura o header apropriado
    const isFormData = testimonialData instanceof FormData;
    const config = isFormData ? {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    } : {};
    
    const response = await api.post(ENDPOINT, testimonialData, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar depoimento:', error);
    throw new Error('Não foi possível enviar o depoimento. Tente novamente mais tarde.');
  }
};

export default {
  fetchTestimonials,
  fetchTestimonialCategories,
  fetchTestimonialsByCategory,
  getTestimonialById,
  submitTestimonial,
  getStaticTestimonials,
  getStaticCategories
};
