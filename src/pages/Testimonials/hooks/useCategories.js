import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTestimonialCategories, getTestimonialsByCategory } from '../../../services/testimonialsApi';
import { mockGetTestimonialCategories, mockGetTestimonialsByCategory } from '../../../services/testimonialsMockApi';

// Flag para controlar se deve usar a API real ou o mock
const USE_MOCK_API = true; // Altere para false quando a API real estiver disponível

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
  
  // Buscar categorias da API ou do mock
  useEffect(() => {
    const fetchCategories = async () => {
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
      }
    };
    
    fetchCategories();
  }, [lang]);
  
  // Função para alterar a categoria ativa e buscar depoimentos filtrados
  const changeCategory = useCallback(async (category) => {
    setActiveCategory(category);
    setLoading(true);
    
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
