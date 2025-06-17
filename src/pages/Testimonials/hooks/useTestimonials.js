import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  getTestimonials,
  getTestimonialCategories,
  getTestimonialsByCategory,
  submitTestimonial,
  isApiAvailable
} from '../../../services/testimonialsApiService';

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
  
  // Estado para controlar se a API está disponível
  const [apiStatus, setApiStatus] = useState({
    checked: false,
    available: false
  });

  // Função para verificar disponibilidade da API
  const checkApiAvailability = useCallback(async () => {
    try {
      const available = await isApiAvailable();
      setApiStatus({
        checked: true,
        available
      });
      return available;
    } catch (err) {
      console.error('Erro ao verificar disponibilidade da API:', err);
      setApiStatus({
        checked: true,
        available: false
      });
      return false;
    }
  }, []);

  // Função para buscar depoimentos da API e combinar com dados estáticos
  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Busca os depoimentos (função já combina dados estáticos + API)
      const data = await getTestimonials(lang);
      setTestimonials(data);
    } catch (err) {
      console.error('Erro ao buscar depoimentos:', err);
      setError('Erro ao carregar depoimentos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, [lang]);
  
  // Função para buscar categorias da API e combinar com dados estáticos
  const fetchCategories = useCallback(async () => {
    try {
      // Busca as categorias (função já combina dados estáticos + API)
      const data = await getTestimonialCategories(lang);
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
      // Busca os depoimentos filtrados por categoria
      const data = await getTestimonialsByCategory(category, lang);
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
      // Verifica se a API está disponível
      const available = await checkApiAvailability();
      
      if (!available) {
        throw new Error('API não está disponível no momento. Tente novamente mais tarde.');
      }
      
      await submitTestimonial(formData, lang);
      
      setFormSuccess(true);
      // Recarregar depoimentos após envio bem-sucedido
      fetchTestimonials();
      return true;
    } catch (err) {
      console.error('Erro ao enviar depoimento:', err);
      setFormError(err.message || 'Erro ao enviar depoimento. Tente novamente mais tarde.');
      return false;
    } finally {
      setFormSubmitting(false);
    }
  }, [fetchTestimonials, lang, checkApiAvailability]);
  
  // Efeito para verificar disponibilidade da API quando o componente é montado
  useEffect(() => {
    checkApiAvailability();
  }, [checkApiAvailability]);
  
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
    submitNewTestimonial,
    apiStatus
  };
};

export default useTestimonials;
