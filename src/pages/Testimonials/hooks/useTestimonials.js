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

// Flag para controlar se deve usar a API real ou o mock
const USE_MOCK_API = true; // Altere para false quando a API real estiver disponível

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
  
  // Função para buscar depoimentos da API ou do mock
  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    setError(null);
    
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
      setError('Erro ao carregar depoimentos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, [lang]);
  
  // Função para buscar categorias da API ou do mock
  const fetchCategories = useCallback(async () => {
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
      // Não definimos erro aqui para não afetar a experiência do usuário
      // Se as categorias falharem, ainda podemos mostrar os depoimentos
    }
  }, [lang]);
  
  // Função para filtrar depoimentos por categoria
  const filterByCategory = useCallback(async (category) => {
    setActiveCategory(category);
    setLoading(true);
    setError(null);
    
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
      setError('Erro ao filtrar depoimentos. Tente novamente mais tarde.');
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
