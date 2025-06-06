import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, HeaderContainer, Title, ButtonWrapper, RecordButton } from './styles';

// Componentes
import CategoryFilter from './components/CategoryFilter';
import TestimonialList from './components/TestimonialList';
import TestimonialForm from './components/TestimonialForm';
import TestimonialVideoModal from './components/TestimonialVideo';

// Hooks
import { useVideoModal } from './hooks/useVideoModal';
import { useCategories } from './hooks/useCategories';
import { useTestimonialForm } from './hooks/useTestimonialForm';

/**
 * Página de Depoimentos - versão refatorada com componentes modularizados
 * e princípios de Clean Code aplicados
 */
const Testimonials = () => {
  const { t } = useTranslation();
  
  // Utilizando os hooks customizados
  const { selectedVideo, videoRef, openVideoModal, closeVideoModal } = useVideoModal();
  const { activeCategory, filteredTestimonials, changeCategory } = useCategories();
  const { showForm, toggleForm, handleSubmit } = useTestimonialForm();

  return (
    <Container>
      {/* Header estilizado */}
      <HeaderContainer>
        <Title>
          {t('testimonials.title') || 'Depoimentos'}
        </Title>
        <ButtonWrapper>
          <RecordButton onClick={toggleForm}>
            {t('testimonials.shareButton') || 'Compartilhe seu Depoimento'}
          </RecordButton>
        </ButtonWrapper>
      </HeaderContainer>
      
      {/* Filtro de categorias */}
      <CategoryFilter 
        activeCategory={activeCategory} 
        onCategoryChange={changeCategory} 
      />
      
      {/* Formulário para envio de depoimentos */}
      {showForm && (
        <TestimonialForm 
          showForm={showForm} 
          toggleForm={toggleForm} 
          handleSubmit={handleSubmit} 
        />
      )}
      
      {/* Lista de depoimentos */}
      <TestimonialList 
        testimonials={filteredTestimonials} 
        onOpenVideo={openVideoModal} 
      />
      
      {/* Modal para exibir vídeo */}
      {selectedVideo && (
        <TestimonialVideoModal 
          testimonial={selectedVideo} 
          videoRef={videoRef} 
          onClose={closeVideoModal} 
        />
      )}
    </Container>
  );
};

export default Testimonials;
