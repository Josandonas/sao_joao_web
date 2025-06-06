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
  TestimonialVideo
} from './styles';

/**
 * Componente para exibir a lista de depoimentos
 */
const TestimonialList = ({ testimonials, onOpenVideo }) => {
  const { t } = useTranslation();

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
              {t('testimonials.watchButton') || 'Assistir Depoimento'}
            </TestimonialVideo>
          </TestimonialContent>
        </TestimonialCard>
      ))}
    </TestimonialsGrid>
  );
};

export default TestimonialList;
