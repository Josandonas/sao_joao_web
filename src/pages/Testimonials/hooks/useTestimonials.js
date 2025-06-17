import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  getTestimonials, 
  getTestimonialCategories, 
  getTestimonialsByCategory,
  submitTestimonial
} from '../../../services/testimonialsApi';
import { 
  mockGetTestimonials, 
  mockGetTestimonialCategories, 
  mockGetTestimonialsByCategory,
  mockSubmitTestimonial
} from '../../../services/testimonialsMockApi';
import { testimonialData, categories as staticCategories } from '../data/testimonialData';

// Configurações para controle de fonte de dados
const USE_MOCK_API = true; // Altere para false quando a API real estiver disponível
const USE_STATIC_DATA = true; // Se true, usa dados estáticos do testimonialData.js
const FALLBACK_TO_STATIC = true; // Se true, usa dados estáticos como fallback em caso de erro

/**
 * Hook para gerenciar depoimentos, categorias e formulário de envio
 * @returns {Object} Objeto contendo os depoimentos, categorias e funções para manipulá-los
 */
export const useTestimonials = () => {
  const { lang } = useParams();
  const [testimonials, setTestimonials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  
  // Função para buscar depoimentos da API ou do mock, ou usar dados estáticos
  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    // Se configurado para usar dados estáticos diretamente
    if (USE_STATIC_DATA) {
      // Adaptar dados estáticos para o formato esperado
      const adaptedData = testimonialData.map(item => ({
        id: `static-${item.id}`,
        name: item.name,
        location: item.location,
        quote: item.quote,
        quoteKey: item.quoteKey,
        image: item.image,
        videos: item.videos,
        category: item.category,
        isStatic: true // Marca como dado estático para identificação
      }));
      
      setTestimonials(adaptedData);
      setLoading(false);
      return;
    }
    
    // Caso contrário, tenta buscar da API ou mock
    try {
      let data;
      
      if (USE_MOCK_API) {
        const response = await mockGetTestimonials(lang);
        data = response.testimonials;
      } else {
        data = await getTestimonials(lang);
      }
      
      setTestimonials(data);
    } catch (err) {
      console.error('Erro ao buscar depoimentos:', err);
      
      // Se configurado para usar dados estáticos como fallback
      if (FALLBACK_TO_STATIC) {
        console.log('Usando dados estáticos como fallback');
        const adaptedData = testimonialData.map(item => ({
          id: `static-${item.id}`,
          name: item.name,
          location: item.location,
          quote: item.quote,
          quoteKey: item.quoteKey,
          image: item.image,
          videos: item.videos,
          category: item.category,
          isStatic: true
        }));
        
        setTestimonials(adaptedData);
      } else {
        setError('Erro ao carregar depoimentos. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  }, [lang]);
  
  // Função para buscar categorias da API ou do mock, ou usar categorias estáticas
  const fetchCategories = useCallback(async () => {
    // Se configurado para usar dados estáticos diretamente
    if (USE_STATIC_DATA) {
      // Adaptar categorias estáticas para o formato esperado
      const adaptedCategories = staticCategories.map(cat => ({
        id: cat.id,
        label: cat.label
      }));
      
      setCategories(adaptedCategories);
      return;
    }
    
    // Caso contrário, tenta buscar da API ou mock
    try {
      let data;
      
      if (USE_MOCK_API) {
        const response = await mockGetTestimonialCategories(lang);
        data = response.categories;
      } else {
        data = await getTestimonialCategories(lang);
      }
      
      setCategories(data);
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
      
      // Se configurado para usar categorias estáticas como fallback
      if (FALLBACK_TO_STATIC) {
        console.log('Usando categorias estáticas como fallback');
        
        // Adaptar categorias estáticas para o formato esperado
        const adaptedCategories = staticCategories.map(cat => ({
          id: cat.id,
          label: cat.label
        }));
        
        setCategories(adaptedCategories);
      }
      // Não definimos erro aqui para não afetar a experiência do usuário
      // Se as categorias falharem, ainda podemos mostrar os depoimentos
    }
  }, [lang]);
  
  // Função para filtrar depoimentos por categoria
  const filterByCategory = useCallback(async (category) => {
    setActiveCategory(category);
    setLoading(true);
    setError(null);
    
    // Se configurado para usar dados estáticos diretamente
    if (USE_STATIC_DATA) {
      // Filtrar dados estáticos pela categoria
      const filteredData = category === 'all'
        ? testimonialData
        : testimonialData.filter(item => item.category === category);
      
      // Adaptar dados estáticos para o formato esperado
      const adaptedData = filteredData.map(item => ({
        id: `static-${item.id}`,
        name: item.name,
        location: item.location,
        quote: item.quote,
        quoteKey: item.quoteKey,
        image: item.image,
        videos: item.videos,
        category: item.category,
        isStatic: true
      }));
      
      setTestimonials(adaptedData);
      setLoading(false);
      return;
    }
    
    // Caso contrário, tenta buscar da API ou mock
    try {
      let data;
      
      if (USE_MOCK_API) {
        const response = await mockGetTestimonialsByCategory(category, lang);
        data = response.testimonials;
      } else {
        data = await getTestimonialsByCategory(category, lang);
      }
      
      setTestimonials(data);
    } catch (err) {
      console.error(`Erro ao filtrar depoimentos por categoria ${category}:`, err);
      
      // Se configurado para usar dados estáticos como fallback
      if (FALLBACK_TO_STATIC) {
        console.log(`Usando dados estáticos como fallback para categoria ${category}`);
        
        // Filtrar dados estáticos pela categoria
        const filteredData = category === 'all'
          ? testimonialData
          : testimonialData.filter(item => item.category === category);
        
        // Adaptar dados estáticos para o formato esperado
        const adaptedData = filteredData.map(item => ({
          id: `static-${item.id}`,
          name: item.name,
          location: item.location,
          quote: item.quote,
          quoteKey: item.quoteKey,
          image: item.image,
          videos: item.videos,
          category: item.category,
          isStatic: true
        }));
        
        setTestimonials(adaptedData);
      } else {
        setError('Erro ao filtrar depoimentos. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  }, [lang]);
  
  // Função para enviar um novo depoimento
  const submitNewTestimonial = useCallback(async (formData) => {
    setFormSubmitting(true);
    setFormSuccess(false);
    setFormError(null);
    
    try {
      if (USE_MOCK_API) {
        await mockSubmitTestimonial(formData);
      } else {
        await submitTestimonial(formData, lang);
      }
      
      setFormSuccess(true);
      // Recarregar depoimentos após envio bem-sucedido
      fetchTestimonials();
      return true;
    } catch (err) {
      console.error('Erro ao enviar depoimento:', err);
      setFormError('Erro ao enviar depoimento. Tente novamente mais tarde.');
      return false;
    } finally {
      setFormSubmitting(false);
    }
  }, [fetchTestimonials, lang]);
  
  // Efeito para buscar depoimentos e categorias quando o componente é montado ou o idioma muda
  useEffect(() => {
    fetchTestimonials();
    fetchCategories();
  }, [fetchTestimonials, fetchCategories]);
  
  return {
    testimonials,
    categories,
    activeCategory,
    loading,
    error,
    formSubmitting,
    formSuccess,
    formError,
    filterByCategory,
    submitNewTestimonial
  };
};

export default useTestimonials;
