import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Container, ContentLayout, TitleContainer, Title, AboutSection, AboutText, FilterSection, CardsContainer } from './styles';

// Componentes
import BibliotecaCard from './components/BibliotecaCard';
import BibliotecaFilter from './components/BibliotecaFilter';
import { useBibliotecaItems } from './hooks/useBibliotecaItems';

/**
 * Página de Biblioteca com referências e locais da cidade
 */
const Biblioteca = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const { items, filterItems } = useBibliotecaItems();
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  
  useEffect(() => {
    setFilteredItems(items);
  }, [items]);
  
  // Handler para quando um filtro é selecionado
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredItems(items);
    } else {
      const filtered = filterItems(filter);
      setFilteredItems(filtered);
    }
  };
  
  return (
    <Container>
      <ContentLayout>
        <TitleContainer>
          <Title>{t('biblioteca.title', 'Biblioteca de Referências')}</Title>
        </TitleContainer>
        
        <AboutSection>
          <AboutText>
            {t('biblioteca.description', 'A biblioteca do Banho de São João de Corumbá manterá um pequeno acervo com teses, dissertações e artigos relacionados à história da Celebração do Banho de São João de Corumbá-Mato Grosso do Sul. Se você tem alguma publicação ou estudo ao respeito, venha colaborar conosco, nos envie e faça parte de nossa biblioteca: ')}
            <a href={`mailto:${t('biblioteca.email', 'nucleoestrategico@corumbams.gov.br')}`}>
              {t('biblioteca.email', 'nucleoestrategico@corumbams.gov.br')}
            </a>
          </AboutText>
        </AboutSection>
        
        <FilterSection>
          <BibliotecaFilter 
            activeFilter={activeFilter} 
            onFilterChange={handleFilterChange} 
          />
        </FilterSection>
        
        <CardsContainer>
          {filteredItems.map((item) => (
            <BibliotecaCard 
              key={item.id} 
              item={item}
            />
          ))}
        </CardsContainer>
      </ContentLayout>
    </Container>
  );
};

export default Biblioteca;
