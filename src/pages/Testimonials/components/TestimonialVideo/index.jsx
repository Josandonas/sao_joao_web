import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  VideoModal,
  ModalContent,
  CloseButton,
  VideoContainer,
  TestimonialName,
  TestimonialLocation
} from './styles';

/**
 * Componente para exibir o modal de vídeo do depoimento
 */
const TestimonialVideoModal = ({ testimonial, videoRef, onClose }) => {
  const { t } = useTranslation();
  
  if (!testimonial) return null;

  return (
    <VideoModal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <VideoContainer>
          <video 
            ref={videoRef}
            controls
            width="100%"
            src={testimonial.videoUrl}
          >
            {t('testimonials.video.unsupportedBrowser') || 'Seu navegador não suporta a reprodução de vídeos.'}
          </video>
        </VideoContainer>
        <TestimonialName>{testimonial.name}</TestimonialName>
        <TestimonialLocation>{testimonial.location}</TestimonialLocation>
      </ModalContent>
    </VideoModal>
  );
};

export default TestimonialVideoModal;
