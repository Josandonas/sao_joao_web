import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Container, ContentLayout, Title, AboutSection, AboutText, FilterSection, CardsContainer } from './styles';

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
        <Title>{t('biblioteca.title', 'Biblioteca de Referências')}</Title>
        
        <AboutSection>
          <AboutText>
            {t('biblioteca.description', 'A biblioteca do Banho de São João de Corumbá manterá um pequeno acervo com teses, dissertações e artigos relacionados à história da Celebração do Banho de São João de Corumbá-Mato Grosso do Sul.')}
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
