import React from 'react';
import { useTranslation } from 'react-i18next';
import { categories } from '../../data/testimonialData';
import { Categories, CategoryButton } from './styles';

/**
 * Componente para filtrar depoimentos por categoria
 */
const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  const { t } = useTranslation();

  return (
    <Categories>
      {categories.map(category => (
        <CategoryButton 
          key={category.id}
          isActive={activeCategory === category.id} 
          onClick={() => onCategoryChange(category.id)}
        >
          {t(`testimonials.category${category.id.charAt(0).toUpperCase() + category.id.slice(1)}`) || category.label}
        </CategoryButton>
      ))}
    </Categories>
  );
};

export default CategoryFilter;
