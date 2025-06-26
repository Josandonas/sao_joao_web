import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook para gerenciar a abertura e fechamento do modal de vídeo
 * e controlar a reprodução do vídeo
 */
export const useVideoModal = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [originalTestimonial, setOriginalTestimonial] = useState(null);
  const videoRef = useRef(null);
  const { i18n } = useTranslation();
  
  // Abrir modal com o vídeo do depoimento
  const openVideoModal = useCallback((testimonial) => {
    setSelectedVideo(testimonial);
    setOriginalTestimonial(testimonial); // Armazena o depoimento original
    document.body.style.overflow = 'hidden';
    
    // Necessário para garantir que o vídeo carregue antes de tentar dar play
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error('Erro ao reproduzir o vídeo:', error);
        });
      }
    }, 100);
  }, []);
  
  // Fechar o modal de vídeo
  const closeVideoModal = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedVideo(null);
    setOriginalTestimonial(null);
    document.body.style.overflow = 'auto';
  }, []);

  // Efeito para atualizar o depoimento selecionado quando o idioma mudar
  useEffect(() => {
    if (originalTestimonial) {
      console.log(`[DEBUG] useVideoModal - Idioma alterado para: ${i18n.language}, atualizando depoimento selecionado`);
      // Força a atualização do depoimento selecionado para refletir o novo idioma
      setSelectedVideo({...originalTestimonial});
    }
  }, [i18n.language, originalTestimonial]);

  return {
    selectedVideo,
    videoRef,
    openVideoModal,
    closeVideoModal
  };
};
