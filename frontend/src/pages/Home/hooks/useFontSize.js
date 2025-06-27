import { useState, useEffect } from 'react';

/**
 * Hook personalizado para controlar o tamanho da fonte com persistência
 * no localStorage
 * 
 * @param {number} defaultSize - Tamanho padrão da fonte em pixels
 * @param {number} minSize - Tamanho mínimo permitido
 * @param {number} maxSize - Tamanho máximo permitido
 * @param {number} step - Incremento/decremento no ajuste de tamanho
 * @returns {Object} - Objeto com o tamanho e funções para manipulá-lo
 */
const useFontSize = (
  defaultSize = 16,
  minSize = 12, 
  maxSize = 24, 
  step = 2
) => {
  // Estado para o tamanho da fonte com valor inicial recuperado do localStorage ou padrão
  const [fontSize, setFontSize] = useState(() => {
    try {
      const savedSize = localStorage.getItem('saoJoaoFontSize');
      return savedSize ? parseInt(savedSize) : defaultSize;
    } catch (e) {
      console.error('Erro ao recuperar tamanho da fonte:', e);
      return defaultSize;
    }
  });

  // Função para aumentar o tamanho da fonte
  const increaseFontSize = () => {
    try {
      const newSize = Math.min(fontSize + step, maxSize);
      setFontSize(newSize);
      localStorage.setItem('saoJoaoFontSize', newSize.toString());
    } catch (e) {
      console.error('Erro ao aumentar tamanho da fonte:', e);
    }
  };
  
  // Função para diminuir o tamanho da fonte
  const decreaseFontSize = () => {
    try {
      const newSize = Math.max(fontSize - step, minSize);
      setFontSize(newSize);
      localStorage.setItem('saoJoaoFontSize', newSize.toString());
    } catch (e) {
      console.error('Erro ao diminuir tamanho da fonte:', e);
    }
  };
  
  // Função para resetar o tamanho da fonte para o padrão
  const resetFontSize = () => {
    try {
      setFontSize(defaultSize);
      localStorage.setItem('saoJoaoFontSize', defaultSize.toString());
    } catch (e) {
      console.error('Erro ao resetar tamanho da fonte:', e);
    }
  };
  
  // Aplicar o tamanho da fonte como uma variável CSS para o escopo da seção About
  useEffect(() => {
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
      aboutSection.style.setProperty('--font-size', `${fontSize}px`);
    }
  }, [fontSize]);

  return {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize
  };
};

export default useFontSize;
