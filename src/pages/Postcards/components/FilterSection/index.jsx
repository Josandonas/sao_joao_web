import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FiltersContainer, FilterButton } from './styles';

const FilterSection = ({ activeFilter, setActiveFilter }) => {
  const { t } = useTranslation();
  
  const filterCategories = [
    { id: 'all', label: t('postcards.categoryAll') },
    { id: 'celebrations', label: t('postcards.categoryCelebrations') },
    { id: 'ritual', label: t('postcards.categoryRitual') },
    { id: 'dances', label: t('postcards.categoryDances') },
    { id: 'music', label: t('postcards.categoryMusic') },
    { id: 'altars', label: t('postcards.categoryAltars') },
    { id: 'symbols', label: t('postcards.categorySymbols') }
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
