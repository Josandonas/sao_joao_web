import { useState, useCallback, useMemo } from 'react';
import { testimonialData } from '../data/testimonialData';

/**
 * Hook para gerenciar a filtragem de depoimentos por categoria
 */
export const useCategories = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filtrar depoimentos por categoria selecionada
  const filteredTestimonials = useMemo(() => {
    return activeCategory === 'all' 
      ? testimonialData 
      : testimonialData.filter(t => t.category === activeCategory);
  }, [activeCategory]);
  
  // Função para alterar a categoria ativa
  const changeCategory = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  return {
    activeCategory,
    filteredTestimonials,
    changeCategory
  };
};
