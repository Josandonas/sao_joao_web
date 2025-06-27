import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Estilos
import { YearSelector as YearSelectorContainer, YearButton } from '../GaleriaSection.styles';

/**
 * Componente para seleção de anos da galeria
 * @param {Object} props - Propriedades do componente
 */
const YearSelector = ({ years, selectedYear, onYearSelect }) => {
  const { t } = useTranslation();
  
  /**
   * Renderiza os botões de seleção de ano
   */
  const renderYearButtons = useCallback(() => {
    if (!years || years.length === 0) return null;
    
    // Ordenar anos em ordem decrescente
    const sortedYears = [...years].sort((a, b) => b - a);
    
    return sortedYears.map(year => (
      <YearButton
        key={year}
        $isActive={selectedYear === year}
        onClick={() => onYearSelect(year)}
        aria-label={t('galeria.yearSelector', 'Ver imagens de {{year}}', { year })}
      >
        {year}
      </YearButton>
    ));
  }, [years, selectedYear, onYearSelect, t]);
  
  if (!years || years.length === 0) return null;
  
  return (
    <Row className="mb-4">
      <Col>
        <YearSelectorContainer>
          {renderYearButtons()}
        </YearSelectorContainer>
      </Col>
    </Row>
  );
};

YearSelector.propTypes = {
  years: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedYear: PropTypes.number,
  onYearSelect: PropTypes.func.isRequired
};

export default YearSelector;
