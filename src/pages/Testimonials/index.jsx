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
import { useTestimonials } from './hooks/useTestimonials';

/**
 * Página de Depoimentos - versão refatorada com componentes modularizados
 * e princípios de Clean Code aplicados
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
    <Container>
      {/* Header estilizado */}
      <HeaderContainer>
        <Title>
          {'Depoimentos'}
        </Title>
        <ButtonWrapper>
          <RecordButton onClick={toggleForm}>
            {'Registrar Depoimento'}
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
