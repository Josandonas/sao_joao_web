import React from 'react';
import { useTranslation } from 'react-i18next';
import { FilterContainer, FilterButton } from './BibliotecaFilter.styles';

/**
 * Componente de filtro para os itens da biblioteca
 * @param {Object} props - Propriedades do componente
 * @param {string} props.activeFilter - Filtro ativo no momento
 * @param {Function} props.onFilterChange - Função chamada quando um filtro é selecionado
 * @returns {JSX.Element} - Componente renderizado
 */
const BibliotecaFilter = ({ activeFilter, onFilterChange }) => {
  const { t } = useTranslation();
  
  // Categorias disponíveis para filtro
  const categories = [
    { id: 'all', label: t('biblioteca.filters.all', 'Todos') },
    { id: 'historical', label: t('biblioteca.filters.historical', 'Históricos') },
    { id: 'cultural', label: t('biblioteca.filters.cultural', 'Culturais') }
  ];
  
  return (
    <FilterContainer>
      {categories.map((category) => (
        <FilterButton
          key={category.id}
          $isActive={activeFilter === category.id}
          onClick={() => onFilterChange(category.id)}
        >
          {category.label}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

export default BibliotecaFilter;
