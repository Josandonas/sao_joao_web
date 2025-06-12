import styled from 'styled-components';
import React from 'react';

// Container principal do PDF
export const PDFContainer = styled.div.attrs(props => ({
  // Filtra a prop darkMode para não ser passada para o DOM
  // Isso evita o warning do React
}))`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.$darkMode ? '#121212' : '#f5f5f5'};
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.$darkMode ? '0.4' : '0.1'});
  transition: background-color 0.3s ease;
  overflow: auto; /* Permite rolagem quando o zoom aumenta */
  position: relative;
  max-width: 100%;
`;

// Componente base que pode receber ref
const PDFContentBase = React.forwardRef((props, ref) => {`
  return <div ref={ref} {...props} />;
`});

// Conteúdo do PDF com suporte para zoom
export const PDFContent = styled(PDFContentBase).attrs(props => {
  // Transformamos as props customizadas para usar o prefixo $
  const { darkMode, zoomEnabled, zoomLevel, ...rest } = props;
  return {
    ...rest,
    $darkMode: darkMode,
    $zoomEnabled: zoomEnabled,
    $zoomLevel: zoomLevel
  };
})`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow: ${props => props.$zoomEnabled ? 'auto' : 'hidden'}; /* Permite rolagem quando o zoom aumenta */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 auto;
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1); /* Transição mais suave para o zoom */
  cursor: ${props => {
    if (!props.$zoomEnabled) return 'default';
    return props.$zoomLevel > 2 ? 'zoom-out' : 'zoom-in';
  }}; /* Mostra cursor de zoom-in ou zoom-out dependendo do nível de zoom */
  will-change: transform; /* Otimiza a performance da animação */
  
  /* Ocultar todos os controles nativos de zoom do react-pdf */
  .rpv-core__toolbar,
  .rpv-core__inner-pages,
  .rpv-core__inner-page,
  .rpv-core__page-navigation {
    display: none !important;
  }

  /* Estilos para o documento PDF */
  .react-pdf__Document {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    
    /* Estilos para a página PDF */
    .react-pdf__Page {
      max-width: 100%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      margin-bottom: 20px;
      background-color: white;
      
      /* Estilos para o canvas da página */
      canvas {
        max-width: 100%;
        height: auto !important;
      }
    }
  }
`;

// Indicador de carregamento
export const LoadingIndicator = styled.div.attrs(props => ({
  // Filtra a prop darkMode para não ser passada para o DOM
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  color: ${props => props.$darkMode ? '#e0e0e0' : '#333'};
  
  .loading-text {
    margin-top: 20px;
    font-size: 16px;
  }
`;

// Mensagem de erro
export const ErrorMessage = styled.div.attrs(props => ({
  // Filtra a prop darkMode para não ser passada para o DOM
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px;
  color: ${props => props.$darkMode ? '#ff6b6b' : '#d32f2f'};
  text-align: center;
  
  svg {
    margin-bottom: 16px;
  }
  
  p {
    font-size: 16px;
  }
`;

// Botão de navegação para o PDF
export const PageNavigationButton = styled.button.attrs(props => ({
  // Filtra a prop darkMode para não ser passada para o DOM
}))`
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  }
  
  ${props => props.$darkMode && `
    background-color: rgba(50, 50, 50, 0.7);
    color: #e0e0e0;
    
    &:hover {
      background-color: rgba(60, 60, 60, 0.9);
    }
  `}
  
  svg {
    width: 24px;
    height: 24px;
    color: #333;
  }
`;

// Indicador de nível de zoom
export const ZoomIndicator = styled.div.attrs(props => ({
  // Filtra a prop darkMode para não ser passada para o DOM
}))`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  z-index: 100;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  
  &.fade-out {
    opacity: 0;
  }
  
  ${props => props.$darkMode && `
    background-color: rgba(255, 255, 255, 0.2);
    color: #333;
  `}
`;
