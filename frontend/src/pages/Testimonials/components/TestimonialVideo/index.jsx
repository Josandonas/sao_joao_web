import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
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
 * Agora com suporte a vídeos em diferentes idiomas e responsivo com Bootstrap
 */
const TestimonialVideoModal = ({ testimonial, videoRef, onClose }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'pt'; // Obtém o idioma atual do i18n

  // Debug para verificar o idioma atual e o depoimento
  console.log(`[DEBUG] TestimonialVideoModal - Idioma atual: ${currentLang}`);
  console.log(`[DEBUG] TestimonialVideoModal - Depoimento:`, testimonial);

  if (!testimonial) return null;

  // Seleciona o vídeo de acordo com o idioma atual
  // Se o vídeo no idioma atual não existir, usa o vídeo em português como fallback
  const getVideoUrl = () => {
    if (testimonial.videos) {
      // Estrutura nova com suporte a múltiplos idiomas
      return testimonial.videos[currentLang] || testimonial.videos.pt;
    } else if (testimonial.videoUrl) {
      // Compatibilidade com a estrutura antiga
      return testimonial.videoUrl;
    }
    return '';
  };

  const videoUrl = getVideoUrl();

  return (
    <VideoModal onClick={onClose} className="d-flex align-items-center justify-content-center">
      <ModalContent onClick={e => e.stopPropagation()} className="position-relative">
        <CloseButton onClick={onClose} className="btn-close-custom">&times;</CloseButton>
        <VideoContainer className="mb-3">
          <video
            ref={videoRef}
            controls
            width="100%"
            className="video-player"
            src={PUBLIC_URL +videoUrl}
          >
            {t('testimonials.video.unsupportedBrowser', 'Seu navegador não suporta a reprodução de vídeos.')}
          </video>
        </VideoContainer>
        <div className="px-3 pb-3">
          <TestimonialName className="mb-1">{testimonial.name}</TestimonialName>
          <TestimonialLocation>{testimonial.location}</TestimonialLocation>
          <p className="mt-2" key={`quote-${testimonial.id}-${currentLang}`}>
            {t(`testimonials_page.quotes.${testimonial.id}`, testimonial.text || testimonial.quote || '')}
          </p>
        </div>
      </ModalContent>
    </VideoModal>
  );
};

export default TestimonialVideoModal;
