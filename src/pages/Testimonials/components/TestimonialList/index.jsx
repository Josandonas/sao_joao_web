import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Spinner, Button } from 'react-bootstrap';
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
 * @param {Array} testimonials - Lista de depoimentos
 * @param {boolean} isLoading - Indica se os depoimentos estão sendo carregados
 * @param {Function} onOpenVideo - Função chamada quando um vídeo é selecionado
 */
const TestimonialList = ({ testimonials = [], isLoading = false, onOpenVideo }) => {
  const { t } = useTranslation();

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
                src={PUBLIC_URL + testimonial.image || ''}
                alt={testimonial.name}
                className="mx-auto d-block"
              />
              <TestimonialContent className="d-flex flex-column flex-grow-1">
                <TestimonialName className="text-center text-sm-start">{testimonial.name}</TestimonialName>
                <TestimonialLocation className="text-center text-sm-start">{testimonial.location}</TestimonialLocation>
                <TestimonialQuote className="flex-grow-1">
                  "{testimonial.quote}"
                </TestimonialQuote>
                <div className="text-center mt-auto pt-3">
                  <TestimonialVideo
                    onClick={() => onOpenVideo(testimonial)}
                  >
                    {t('testimonials.watchVideo', 'Assistir Depoimento')}
                  </TestimonialVideo>
                </div>
              </TestimonialContent>
            </TestimonialCard>
          </Col>
        ))}
      </Row>
    </TestimonialsContainer>
  );
};

export default TestimonialList;
