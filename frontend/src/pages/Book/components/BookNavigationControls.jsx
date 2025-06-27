import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DesktopNavigationControls, 
  DesktopNavigationButton, 
  DesktopPageIndicator 
} from '../styles/BookReaderDesktop.styles';
import {
  MobileNavigationButton,
  MobilePageIndicator,
  GestureOverlay
} from '../styles/BookReaderMobile.styles';
import { ProgressBar } from '../styles/BookReaderCommon.styles';

/**
 * Componente para controles de navegação do livro
 * Versões responsivas para desktop e mobile
 */
const BookNavigationControls = ({
  isMobile,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  isFirstPage,
  isLastPage,
  t,
  // Removida referência ao darkMode
}) => {
  // Se não for passado o objeto de tradução, usa o hook
  const { t: translate } = useTranslation();
  const tFunc = t || translate;
  
  // Estado para controlar a visibilidade do indicador de página em dispositivos móveis
  const [showPageIndicator, setShowPageIndicator] = useState(false);
  
  // Mostra o indicador de página por alguns segundos após a navegação
  useEffect(() => {
    if (isMobile) {
      setShowPageIndicator(true);
      const timer = setTimeout(() => {
        setShowPageIndicator(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentPage, isMobile]);
  
  // Calcula o progresso da leitura
  const progress = ((currentPage + 1) / totalPages) * 100;
  
  // Manipuladores de gestos para dispositivos móveis
  const handleSwipeLeft = () => {
    if (!isLastPage) {
      onNextPage();
    }
  };
  
  const handleSwipeRight = () => {
    if (!isFirstPage) {
      onPrevPage();
    }
  };
  
  // Renderiza a versão mobile dos controles de navegação
  if (isMobile) {
    return (
      <>
        <GestureOverlay>
          {/* Área para voltar página (30% esquerda) */}
          <div onClick={handleSwipeRight} />
          {/* Área central (40% - implementada via ::before e ::after no CSS) */}
          {/* Área para avançar página (30% direita) */}
          <div onClick={handleSwipeLeft} />
        </GestureOverlay>
        
        <MobilePageIndicator $visible={showPageIndicator}>
          {currentPage + 1} / {totalPages}
        </MobilePageIndicator>
        
        <div style={{ 
          position: 'absolute', 
          bottom: 70, 
          left: 0, 
          width: '100%', 
          padding: '0 20px',
          zIndex: 5
        }}>
          <ProgressBar $progress={`${progress}%`} />
        </div>
      </>
    );
  }
  
  // Renderiza a versão desktop dos controles de navegação
  return (
    <DesktopNavigationControls>
      <DesktopNavigationButton 
        onClick={onPrevPage} 
        disabled={isFirstPage}
        title={tFunc('book.previousPage')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </DesktopNavigationButton>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <DesktopPageIndicator>
          {currentPage + 1} / {totalPages}
        </DesktopPageIndicator>
        <ProgressBar $progress={`${progress}%`} style={{ width: '200px' }} />
      </div>
      
      <DesktopNavigationButton 
        onClick={onNextPage} 
        disabled={isLastPage}
        title={tFunc('book.nextPage')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </DesktopNavigationButton>
    </DesktopNavigationControls>
  );
};

export default BookNavigationControls;
