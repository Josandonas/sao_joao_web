import { useState, useRef, useCallback } from 'react';

/**
 * Hook para gerenciar a abertura e fechamento do modal de vídeo
 * e controlar a reprodução do vídeo
 */
export const useVideoModal = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  
  // Abrir modal com o vídeo do depoimento
  const openVideoModal = useCallback((testimonial) => {
    setSelectedVideo(testimonial);
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
    document.body.style.overflow = 'auto';
  }, []);

  return {
    selectedVideo,
    videoRef,
    openVideoModal,
    closeVideoModal
  };
};
