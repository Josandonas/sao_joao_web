import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
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
 * Agora com suporte a vídeos em diferentes idiomas
 */
const TestimonialVideoModal = ({ testimonial, videoRef, onClose }) => {
  const { t } = useTranslation();
  const { lang } = useParams(); // Obtém o idioma atual da URL
  
  if (!testimonial) return null;

  // Seleciona o vídeo de acordo com o idioma atual
  // Se o vídeo no idioma atual não existir, usa o vídeo em português como fallback
  const getVideoUrl = () => {
    if (testimonial.videos) {
      // Estrutura nova com suporte a múltiplos idiomas
      return testimonial.videos[lang] || testimonial.videos.pt;
    } else if (testimonial.videoUrl) {
      // Compatibilidade com a estrutura antiga
      return testimonial.videoUrl;
    }
    return '';
  };

  const videoUrl = getVideoUrl();

  return (
    <VideoModal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <VideoContainer>
          <video 
            ref={videoRef}
            controls
            width="100%"
            src={videoUrl}
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
