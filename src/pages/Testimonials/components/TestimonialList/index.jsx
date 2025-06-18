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
  ErrorContainer,
  EmptyContainer
} from './styles';

/**
 * Componente para exibir a lista de depoimentos
 * @param {Array} testimonials - Lista de depoimentos
 * @param {boolean} loading - Indica se os depoimentos estão sendo carregados
 * @param {string|null} error - Mensagem de erro, se houver
 * @param {Function} onOpenVideo - Função chamada quando um vídeo é selecionado
 */
const TestimonialList = ({ testimonials = [], loading = false, error = null, onOpenVideo }) => {
  const { t } = useTranslation();

  // Renderiza o estado de carregamento
  if (loading) {
    return (
      <LoadingContainer className="d-flex flex-column align-items-center justify-content-center py-5">
        <Spinner animation="border" variant="danger" className="mb-3" />
        <p>{t('testimonials.loading', 'Carregando depoimentos...')}</p>
      </LoadingContainer>
    );
  }

  // Renderiza o estado de erro
  if (error) {
    return (
      <ErrorContainer className="d-flex flex-column align-items-center justify-content-center py-5 text-center">
        <p className="text-danger mb-4">{error}</p>
        <Button variant="outline-danger" onClick={() => window.location.reload()}>
          {t('testimonials.tryAgain', 'Tentar novamente')}
        </Button>
      </ErrorContainer>
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
      <Row className="g-4">
        {testimonials.map(testimonial => (
          <Col xs={12} sm={6} lg={4} key={testimonial.id}>
            <TestimonialCard className="h-100 shadow-sm">
              <TestimonialImage 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="img-fluid" 
              />
              <TestimonialContent className="d-flex flex-column h-100">
                <TestimonialName className="mb-1">{testimonial.name}</TestimonialName>
                <TestimonialLocation className="mb-3">{testimonial.location}</TestimonialLocation>
                <TestimonialQuote className="flex-grow-1">
                  "{testimonial.quoteKey ? t(`testimonials_page.quotes.${testimonial.quoteKey}`) || testimonial.quote : testimonial.quote}"
                </TestimonialQuote>
                <TestimonialVideo 
                  onClick={() => onOpenVideo(testimonial)}
                  className="mt-auto btn btn-block"
                >
                  {t('testimonials.watchButton', 'Assistir Depoimento')}
                </TestimonialVideo>
              </TestimonialContent>
            </TestimonialCard>
          </Col>
        ))}
      </Row>
    </TestimonialsContainer>
  );
};

export default TestimonialList;
