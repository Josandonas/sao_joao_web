import React from 'react';
import PropTypes from 'prop-types';
import { FiltersContainer, FilterButton } from './styles';

const FilterSection = ({ activeFilter, setActiveFilter }) => {
  const filterCategories = [
    { id: 'all', label: 'Todos' },
    { id: 'celebrations', label: 'Celebrações' },
    { id: 'ritual', label: 'Ritual' },
    { id: 'dances', label: 'Danças' },
    { id: 'music', label: 'Música' },
    { id: 'altars', label: 'Altares' },
    { id: 'symbols', label: 'Símbolos' }
  ];

  return (
    <FiltersContainer>
      {filterCategories.map(category => (
        <FilterButton
          key={category.id}
          isActive={activeFilter === category.id}
          onClick={() => setActiveFilter(category.id)}
        >
          {category.label}
        </FilterButton>
      ))}
    </FiltersContainer>
  );
};

FilterSection.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired
};

export default FilterSection;
