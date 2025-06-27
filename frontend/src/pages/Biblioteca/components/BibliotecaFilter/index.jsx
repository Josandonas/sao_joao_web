import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { FilterContainer, FilterButton } from './BibliotecaFilter.styles';

/**
 * Componente de filtro para os itens da biblioteca
 * @param {Object} props - Propriedades do componente
 * @param {string} props.currentCategory - Filtro ativo no momento
 * @param {Function} props.onFilterChange - Função chamada quando um filtro é selecionado
 * @returns {JSX.Element} - Componente renderizado
 */
const BibliotecaFilter = ({ currentCategory, onFilterChange }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  // Se for dispositivo móvel, não renderiza o componente
  if (isMobile) {
    return null;
  }
  
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
          $isActive={currentCategory === category.id}
          onClick={() => onFilterChange(category.id)}
        >
          {category.label}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

BibliotecaFilter.propTypes = {
  currentCategory: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default BibliotecaFilter;
