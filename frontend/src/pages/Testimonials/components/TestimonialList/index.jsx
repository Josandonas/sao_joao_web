import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Spinner, Button } from 'react-bootstrap';
import Pagination from '../Pagination';
import {
  TestimonialsContainer,
  TestimonialCard,
  TestimonialImage,
  TestimonialContent,
  TestimonialName,
  TestimonialLocation,
  TestimonialQuote,
  TestimonialVideo,
  LoadingContainer,
  EmptyContainer
} from './styles';

/**
 * Componente para exibir a lista de depoimentos
 * @param {Array} testimonials - Lista de depoimentos a serem exibidos
 * @param {boolean} isLoading - Indica se os depoimentos estão sendo carregados
 * @param {Function} onOpenVideo - Função chamada quando um vídeo é clicado
 * @param {number} currentPage - Página atual
 * @param {number} totalPages - Total de páginas
 * @param {Function} onPageChange - Função chamada quando a página é alterada
 */
const TestimonialList = ({ 
  testimonials = [], 
  isLoading = false, 
  onOpenVideo,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'pt';
  
  // Debug para verificar o idioma atual e os depoimentos
  console.log(`[DEBUG] TestimonialList - Idioma atual: ${currentLang}`);
  console.log(`[DEBUG] TestimonialList - Depoimentos: ${testimonials.length}`);
  
  // Verificar se os depoimentos têm o idioma correto
  if (testimonials.length > 0) {
    console.log(`[DEBUG] TestimonialList - Exemplo de depoimento:`, {
      id: testimonials[0].id,
      name: testimonials[0].name,
      text: testimonials[0].text,
      currentLang: testimonials[0].currentLang || 'não definido'
    });
  }

  // Renderiza o estado de carregamento
  if (isLoading) {
    return (
      <LoadingContainer className="d-flex flex-column align-items-center justify-content-center py-5">
        <Spinner animation="border" variant="danger" className="mb-3" />
        <p>{t('testimonials.loading', 'Carregando depoimentos...')}</p>
      </LoadingContainer>
    );
  }

  // Renderiza o estado vazio
  if (!testimonials || testimonials.length === 0) {
    return (
      <EmptyContainer className="d-flex flex-column align-items-center justify-content-center py-5 text-center">
        <p>{t('testimonials.noTestimonials', 'Nenhum depoimento encontrado para esta categoria.')}</p>
      </EmptyContainer>
    );
  }

  // Renderiza a lista de depoimentos
  return (
    <TestimonialsContainer>
      <Row xs={1} sm={2} lg={4} className="g-4">
        {testimonials.map((testimonial) => (
          <Col key={testimonial.id}>
            <TestimonialCard className="h-100 d-flex flex-column">
              <TestimonialImage
                src={PUBLIC_URL +testimonial.imageUrl || ''}
                alt={testimonial.name}
                className="mx-auto d-block"
              />
              <TestimonialContent className="d-flex flex-column flex-grow-1">
                <TestimonialName className="text-center text-sm-start">{testimonial.name}</TestimonialName>
                <TestimonialLocation className="text-center text-sm-start">{testimonial.location}</TestimonialLocation>
                <TestimonialQuote className="flex-grow-1" key={`quote-${testimonial.id}-${currentLang}`}>
                  "{t(`testimonials_page.quotes.${testimonial.id}`, testimonial.text || testimonial.quote || '')}"
                  {/* Adiciona um comentário com o idioma atual para debug */}
                  {/* Idioma: {currentLang} */}
                </TestimonialQuote>
                <div className="text-center mt-auto pt-3">
                  <TestimonialVideo
                    onClick={() => onOpenVideo(testimonial)}
                    disabled={!(testimonial.videoUrl || (testimonial.videos && Object.keys(testimonial.videos).length > 0))}
                    className="btn btn-sm"
                  >
                    {(testimonial.videoUrl || (testimonial.videos && Object.keys(testimonial.videos).length > 0)) ? t('testimonials.watchButton', 'Assistir Depoimento') : t('testimonials.noVideoAvailable', 'Sem vídeo disponível')}
                  </TestimonialVideo>
                </div>
              </TestimonialContent>
            </TestimonialCard>
          </Col>
        ))}
      </Row>
      
      {/* Componente de paginação */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </TestimonialsContainer>
  );
};

export default TestimonialList;
