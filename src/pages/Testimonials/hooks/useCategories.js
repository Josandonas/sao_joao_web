import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { testimonialsService, isApiAvailable } from '../../../services';

// Não precisamos mais da flag USE_MOCK_API, pois o serviço padronizado já lida com fallback

/**
 * Hook para gerenciar a filtragem de depoimentos por categoria
 * @deprecated Use useTestimonials instead
 */
export const useCategories = () => {
  const { lang } = useParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Buscar categorias da API com fallback para localStorage
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await testimonialsService.fetchTestimonialCategories(lang);
        setCategories(data);
      } catch (err) {
        console.error('Erro ao buscar categorias:', err);
        setCategories([]);
      }
    };
    
    fetchCategories();
  }, [lang]);
  
  // Função para alterar a categoria ativa e buscar depoimentos filtrados
  const changeCategory = useCallback(async (category) => {
    setActiveCategory(category);
    setLoading(true);
    
    try {
      const data = await testimonialsService.fetchTestimonialsByCategory(category, lang);
      setTestimonials(data);
    } catch (err) {
      console.error(`Erro ao filtrar depoimentos por categoria ${category}:`, err);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }, [lang]);
  
  // Buscar todos os depoimentos quando o componente é montado
  useEffect(() => {
    changeCategory('all');
  }, [changeCategory]);

  return {
    activeCategory,
    categories,
    filteredTestimonials: testimonials,
    loading,
    changeCategory
  };
};
