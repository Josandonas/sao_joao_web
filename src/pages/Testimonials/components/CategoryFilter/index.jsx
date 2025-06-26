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
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'pt';
  
  // Debug para verificar as categorias recebidas e o idioma atual
  console.log('[DEBUG] CategoryFilter - Idioma atual:', currentLang);
  console.log('[DEBUG] CategoryFilter - Categorias recebidas:', categories);
  console.log('[DEBUG] CategoryFilter - Categoria ativa:', activeCategory);
  
  // Garantir que temos categorias para exibir
  if (!categories || categories.length === 0) {
    console.log('[DEBUG] CategoryFilter - Nenhuma categoria disponível');
    return null;
  }

  // Seleciona o label correto com base no idioma atual
  const getCategoryLabel = (category) => {
    console.log(`[DEBUG] getCategoryLabel - Categoria: ${category.id}, Idioma atual: ${currentLang}`);
    
    // Primeiro tenta usar a chave específica para a categoria
    const categoryKey = `testimonials.category${category.id.charAt(0).toUpperCase() + category.id.slice(1)}`;
    const categoryTranslation = t(categoryKey);
    
    // Se a tradução não for igual à chave, significa que encontrou uma tradução
    if (categoryTranslation !== categoryKey) {
      console.log(`[DEBUG] getCategoryLabel - Usando tradução da chave ${categoryKey}: ${categoryTranslation}`);
      return categoryTranslation;
    }
    
    // Tenta a chave alternativa no formato categories.id
    const i18nKey = `testimonials.categories.${category.id}`;
    const i18nTranslation = t(i18nKey);
    
    // Se a tradução não for igual à chave, significa que encontrou uma tradução
    if (i18nTranslation !== i18nKey) {
      console.log(`[DEBUG] getCategoryLabel - Usando tradução da chave ${i18nKey}: ${i18nTranslation}`);
      return i18nTranslation;
    }
    
    // Caso contrário, usa os campos de tradução do objeto
    if (currentLang === 'en' && category.labelEn) {
      console.log(`[DEBUG] getCategoryLabel - Usando labelEn: ${category.labelEn}`);
      return category.labelEn;
    }
    if (currentLang === 'es' && category.labelEs) {
      console.log(`[DEBUG] getCategoryLabel - Usando labelEs: ${category.labelEs}`);
      return category.labelEs;
    }
    
    // Fallback para o label padrão ou ID
    const fallbackLabel = category.label || category.id;
    console.log(`[DEBUG] getCategoryLabel - Usando fallback: ${fallbackLabel}`);
    return fallbackLabel;
  };
  
  return (
    <FilterContainer>
      <Container fluid className="px-0">
        <Row className="justify-content-center">
          <ButtonGroup className="d-flex flex-wrap justify-content-center">
            <FilterButton
              key="all"
              active={activeCategory === 'all'}
              onClick={() => onCategoryChange('all')}
              className={activeCategory === 'all' ? 'active' : ''}
              aria-label={t('testimonials.categoryAll', 'Todos')}
            >
              {t('testimonials.categoryAll', 'Todos')}
            </FilterButton>
            {categories.map(category => (
              <FilterButton
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => onCategoryChange(category.id)}
                className={activeCategory === category.id ? 'active' : ''}
                aria-label={t(`testimonials.categories.${category.id}`, getCategoryLabel(category))}
              >
                {t(`testimonials.categories.${category.id}`, getCategoryLabel(category))}
              </FilterButton>
            ))}
          
          </ButtonGroup>
        </Row>
      </Container>
    </FilterContainer>
  );
};

export default CategoryFilter;
