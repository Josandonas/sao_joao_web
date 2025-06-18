import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonGroup, Container, Row } from 'react-bootstrap';
import { FilterContainer, FilterButton } from './styles';

/**
 * Componente para filtrar depoimentos por categoria
 * @param {Array} categories - Lista de categorias disponíveis
 * @param {string} activeCategory - Categoria atualmente selecionada
 * @param {Function} onCategoryChange - Função chamada quando uma categoria é selecionada
 */
const CategoryFilter = ({ categories = [], activeCategory = 'all', onCategoryChange }) => {
  const { t } = useTranslation();

  // Verificar se já existe uma categoria 'all' na lista para evitar duplicação
  const hasAllCategory = categories.some(cat => cat.id === 'all');
  
  return (
    <FilterContainer>
      <Container fluid className="px-0">
        <Row className="justify-content-center">
          <ButtonGroup className="d-flex flex-wrap justify-content-center">
            {/* Renderiza o botão 'Todos' apenas se não existir na lista de categorias */}
            {!hasAllCategory && (
              <FilterButton 
                active={activeCategory === 'all'}
                onClick={() => onCategoryChange('all')}
                className={activeCategory === 'all' ? 'active' : ''}
                aria-label={t('testimonials.categories.all', 'Todos')}
              >
                {t('testimonials.categories.all', 'Todos')}
              </FilterButton>
            )}
            
            {categories.map(category => (
              <FilterButton
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => onCategoryChange(category.id)}
                className={activeCategory === category.id ? 'active' : ''}
                aria-label={t(`testimonials.categories.${category.id}`, category.label)}
              >
                {t(`testimonials.categories.${category.id}`, category.label)}
              </FilterButton>
            ))}
          </ButtonGroup>
        </Row>
      </Container>
    </FilterContainer>
  );
};

export default CategoryFilter;
