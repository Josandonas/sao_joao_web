import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container as StyledContainer, HeaderContainer, Title, ButtonWrapper, RecordButton } from './styles';
import { Container, Row, Col } from 'react-bootstrap';

// Componentes
import CategoryFilter from './components/CategoryFilter';
import TestimonialList from './components/TestimonialList';
import TestimonialForm from './components/TestimonialForm';
import TestimonialVideoModal from './components/TestimonialVideo';

// Hooks
import { useVideoModal } from './hooks/useVideoModal';
import { useTestimonials } from './hooks/useTestimonials';

/**
 * Página de Depoimentos - versão refatorada com componentes modularizados,
 * princípios de Clean Code aplicados e responsividade com Bootstrap
 */
const Testimonials = () => {
  const { t } = useTranslation();
  
  // Utilizando os hooks customizados
  const { selectedVideo, videoRef, openVideoModal, closeVideoModal } = useVideoModal();
  const { 
    testimonials, 
    categories, 
    activeCategory, 
    loading, 
    error, 
    filterByCategory, 
    submitNewTestimonial,
    apiStatus
  } = useTestimonials();
  
  // Estado local para controlar a exibição do formulário
  const [showForm, setShowForm] = React.useState(false);
  
  // Função para alternar a exibição do formulário
  const toggleForm = () => setShowForm(prev => !prev);
  
  // Handler para submissão do formulário
  const handleSubmit = async (formData) => {
    const success = await submitNewTestimonial(formData);
    if (success) {
      setShowForm(false); // Fecha o formulário após envio bem-sucedido
    }
    return success;
  };

  return (
    <div className="bg-light">
      <StyledContainer className="py-4 py-md-5">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} lg={10} xl={9}>
            {/* Header estilizado */}
            <HeaderContainer className="mb-4">
              <Title>
                {t('testimonials.title', 'Depoimentos')}
              </Title>
              <ButtonWrapper>
                <RecordButton onClick={toggleForm} className="btn-responsive">
                  {t('testimonials.recordButton', 'Registrar Depoimento')}
                </RecordButton>
              </ButtonWrapper>
            </HeaderContainer>
            
            {/* Filtro de categorias */}
            <CategoryFilter 
              activeCategory={activeCategory} 
              categories={categories}
              onCategoryChange={filterByCategory} 
            />
            
            {/* Formulário para envio de depoimentos */}
            {showForm && (
              <TestimonialForm 
                showForm={showForm} 
                toggleForm={toggleForm} 
                handleSubmit={handleSubmit}
                categories={categories}
                apiAvailable={apiStatus.available} 
              />
            )}
            
            {/* Lista de depoimentos */}
            <TestimonialList 
              testimonials={testimonials}
              loading={loading}
              error={error} 
              onOpenVideo={openVideoModal} 
            />
          </Col>
        </Row>
      </Container>
      
      {/* Modal para exibir vídeo */}
      {selectedVideo && (
        <TestimonialVideoModal 
          testimonial={selectedVideo} 
          videoRef={videoRef} 
          onClose={closeVideoModal} 
        />
      )}
      </StyledContainer>
    </div>
  );
};

export default Testimonials;
