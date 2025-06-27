import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Pagination, Spinner, Alert } from 'react-bootstrap';
import { useBibliotecaItems } from './hooks/useBibliotecaItems';
import { BibliotecaCard, BibliotecaFilter, GaleriaSection } from './components';
import { 
  Container as StyledContainer, 
  TitleContainer, 
  Title, 
  AboutSection, 
  AboutText,
  BibliotecaGrid,
  PaginationContainer
} from './styles/index';

/**
 * Página de Biblioteca com referências e locais da cidade
 * @returns {JSX.Element} - Componente renderizado
 */
const Biblioteca = () => {
  const { t } = useTranslation();
  const { 
    items: currentItems, 
    isLoading, 
    error, 
    currentPage, 
    totalPages, 
    currentCategory,
    goToPage,
    filterByCategory
  } = useBibliotecaItems();

  return (
    <StyledContainer className='py-5 md-5'>
      <Container>
        <TitleContainer>
          <Title>{t('biblioteca.title', 'Biblioteca Cultural')}</Title>
        </TitleContainer>
        
        <AboutSection>
          <AboutText>
            {t('biblioteca.description', 'Explore nossa coleção de referências sobre o Banho de São João, incluindo artigos, livros, documentos históricos e recursos multimídia.')}
            {t(' biblioteca.collaborate', ' Se você tem alguma publicação ou estudo ao respeito, venha colaborar conosco, nos envie e faça parte de nossa biblioteca: ')}
            <a href={`mailto:${t('biblioteca.email', 'nucleoestrategico@corumbams.gov.br')}`}>
              {t('biblioteca.email', 'nucleoestrategico@corumbams.gov.br')}
            </a>
          </AboutText>
        </AboutSection>
        
        <BibliotecaFilter 
          currentCategory={currentCategory} 
          onFilterChange={filterByCategory} 
        />
        
        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">{t('common.loading', 'Carregando...')}</span>
            </Spinner>
          </div>
        ) : error ? (
          // Erro exibido apenas no console, não para o usuário
          <BibliotecaGrid>
            {/* Componente vazio para manter o layout */}
          </BibliotecaGrid>
        ) : (
          <>
            <BibliotecaGrid>
              {currentItems.map(item => (
                <BibliotecaCard key={item.id} item={item} />
              ))}
            </BibliotecaGrid>
            
            {totalPages > 1 && (
              <PaginationContainer>
                <Pagination>
                  <Pagination.Prev 
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    
                    // Mostrar primeira página, última página e páginas próximas à atual
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === currentPage}
                          onClick={() => goToPage(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      );
                    }
                    
                    // Mostrar elipses para páginas omitidas
                    if (
                      (pageNumber === 2 && currentPage > 3) ||
                      (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return <Pagination.Ellipsis key={`ellipsis-${pageNumber}`} />;
                    }
                    
                    return null;
                  })}
                  
                  <Pagination.Next
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </PaginationContainer>
            )}
          </>
        )}
        
        <Row className="mt-5">
          <Col>
            <GaleriaSection />
          </Col>
        </Row>
      </Container>
    </StyledContainer>
  );
};

export default Biblioteca;
