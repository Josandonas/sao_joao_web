import { useState, useRef } from 'react';

/**
 * Hook para gerenciar o modo de tela cheia
 * @returns {Object} - Estado e funções para controle de tela cheia
 */
export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenRef = useRef(null);
  
  // Alternar modo de tela cheia
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  return {
    isFullscreen,
    setIsFullscreen,
    fullscreenRef,
    toggleFullscreen
  };
};
