import React from 'react';
import { useTranslation } from 'react-i18next';
import { Categories, CategoryButton } from './styles';
// Importação de categorias estáticas removida, agora vem via props

/**
 * Componente para filtrar depoimentos por categoria
 * @param {string} activeCategory - ID da categoria ativa
 * @param {Array} categories - Lista de categorias disponíveis
 * @param {Function} onCategoryChange - Função chamada quando uma categoria é selecionada
 */
const CategoryFilter = ({ activeCategory, categories = [], onCategoryChange }) => {
  const { t } = useTranslation();

  return (
    <Categories>
      {categories && categories.length > 0 ? (
        categories.map(category => (
          <CategoryButton 
            key={category.id}
            isActive={activeCategory === category.id} 
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
          </CategoryButton>
        ))
      ) : (
        // Fallback para quando não há categorias disponíveis
        <CategoryButton 
          key="all"
          isActive={true} 
          onClick={() => onCategoryChange('all')}
        >
          {'Todos'}
        </CategoryButton>
      )}
    </Categories>
  );
};

export default CategoryFilter;
