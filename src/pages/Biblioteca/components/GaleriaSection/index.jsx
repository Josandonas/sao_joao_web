import React from 'react';
import PropTypes from 'prop-types';

// Hooks personalizados
import { useGaleriaImages } from '../../hooks/useGaleriaImages';

// Componentes
import { YearSelector, GalleryViewer, ErrorDisplay } from './components';

// Estilos
import { GaleriaSectionContainer } from './GaleriaSection.styles';

/**
 * Componente para exibição da galeria de imagens por ano
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.years - Lista de anos disponíveis
 */
const GaleriaSection = ({ years = [] }) => {
  // Usar o hook personalizado para gerenciar imagens da galeria
  const { 
    images, 
    loading, 
    error, 
    selectedYear, 
    selectYear 
  } = useGaleriaImages(years.length > 0 ? years[0] : null);
  
  return (
    <GaleriaSectionContainer>
      <YearSelector 
        years={years} 
        selectedYear={selectedYear} 
        onYearSelect={selectYear} 
      />
      <ErrorDisplay error={error} />
      <GalleryViewer 
        images={images} 
        loading={loading} 
        error={error} 
      />
    </GaleriaSectionContainer>
  );
};

GaleriaSection.propTypes = {
  years: PropTypes.arrayOf(PropTypes.number)
};

export default GaleriaSection;
