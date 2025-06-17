import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  TestimonialsGrid,
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
      <LoadingContainer>
        <div className="spinner"></div>
        <p>{'Carregando depoimentos...'}</p>
      </LoadingContainer>
    );
  }

  // Renderiza o estado de erro
  if (error) {
    return (
      <ErrorContainer>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          {'Tentar novamente'}
        </button>
      </ErrorContainer>
    );
  }

  // Renderiza o estado vazio
  if (!testimonials || testimonials.length === 0) {
    return (
      <EmptyContainer>
        <p>{'Nenhum depoimento encontrado para esta categoria.'}</p>
      </EmptyContainer>
    );
  }

  // Renderiza a lista de depoimentos
  return (
    <TestimonialsGrid>
      {testimonials.map(testimonial => (
        <TestimonialCard key={testimonial.id}>
          <TestimonialImage src={testimonial.image} alt={testimonial.name} />
          <TestimonialContent>
            <TestimonialName>{testimonial.name}</TestimonialName>
            <TestimonialLocation>{testimonial.location}</TestimonialLocation>
            <TestimonialQuote>"{testimonial.quoteKey ? t(`testimonials_page.quotes.${testimonial.quoteKey}`) || testimonial.quote : testimonial.quote}"</TestimonialQuote>
            <TestimonialVideo onClick={() => onOpenVideo(testimonial)}>
              {'Assistir Depoimento'}
            </TestimonialVideo>
          </TestimonialContent>
        </TestimonialCard>
      ))}
    </TestimonialsGrid>
  );
};

export default TestimonialList;
