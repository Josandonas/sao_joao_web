import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { testimonialsService, isApiAvailable } from '../../../services';

/**
 * Hook para gerenciar depoimentos, categorias e formulário de envio
 * @returns {Object} Objeto contendo os depoimentos, categorias e funções para manipulá-los
 */
export const useTestimonials = () => {
  const { lang } = useParams();
  const [testimonials, setTestimonials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(true);

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
    setIsLoading(true);
    
    try {
      // Busca os depoimentos (função já combina dados estáticos + API)
      const data = await testimonialsService.fetchTestimonials(lang);
      setTestimonials(data);
      setFilteredTestimonials(data);
    } catch (err) {
      console.error('Erro ao buscar depoimentos:', err);
      // Erro exibido apenas no console
    } finally {
      setIsLoading(false);
    }
  }, [lang]);
  
  // Função para buscar categorias da API e combinar com dados estáticos
  const fetchCategories = useCallback(async () => {
    try {
      // Busca as categorias (função já combina dados estáticos + API)
      const data = await testimonialsService.fetchTestimonialCategories(lang);
      setCategories(data);
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
      // Não definimos erro aqui para não afetar a experiência do usuário
      // Se as categorias falharem, ainda podemos mostrar os depoimentos
    }
  }, [lang]);
  
  // Função para filtrar depoimentos por categoria
  const filterByCategory = useCallback(async (category) => {
    setSelectedCategory(category);
    setIsLoading(true);
    
    try {
      if (category === null || category === 'all') {
        // Se não houver categoria selecionada, mostra todos os depoimentos
        setFilteredTestimonials(testimonials);
      } else {
        // Filtra os depoimentos pela categoria selecionada
        const filtered = testimonials.filter(item => item.category === category);
        setFilteredTestimonials(filtered);
      }
    } catch (err) {
      console.error(`Erro ao filtrar depoimentos por categoria ${category}:`, err);
      // Erro exibido apenas no console
    } finally {
      setIsLoading(false);
    }
  }, [testimonials]);
  
  // Função para enviar um novo depoimento
  const submitNewTestimonial = useCallback(async (formData) => {
    try {
      // Verifica se a API está disponível
      const available = await checkApiAvailability();
      
      if (!available) {
        console.warn('API não está disponível no momento. Tente novamente mais tarde.');
        return false;
      }
      
      await testimonialsService.submitTestimonial(formData, lang);
      
      // Recarregar depoimentos após envio bem-sucedido
      fetchTestimonials();
      return true;
    } catch (err) {
      console.error('Erro ao enviar depoimento:', err);
      return false;
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
    testimonials: filteredTestimonials,
    allTestimonials: testimonials,
    categories,
    selectedCategory,
    isLoading,
    apiAvailable: apiStatus.available,
    filterByCategory,
    submitNewTestimonial
  };
};

export default useTestimonials;
