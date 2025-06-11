import React, { useState, useEffect, useRef } from 'react';
import { 
  BookViewerSection, 
  BookViewerActions,
  BookViewer
} from '../styles';

import {
  BackToCoverButton,
  DownloadButton,
  FullscreenButton
} from '../styles/ActionButtonStyles';

// Importando o componente ZoomableImage
import ZoomableImage from './ZoomableImage';

// Importando os novos estilos específicos para as imagens
import {
  BookImageContainer,
  BookImageLayout,
  BookImageWrapper,
  BookImage,
  BookNavigationControls,
  BookNavigationButton,
  BookPageCounter,
  BookChaptersContainer,
  ChapterButton as ImageChapterButton,
  BookViewerContent,
  BookPagesContainer,
  ZoomControlsContainer,
  ZoomButton
} from '../styles/BookImageStyles';

/**
 * Componente para a seção de leitura do livro
 * @param {Object} props - Propriedades do componente
 * @returns {JSX.Element} - Componente renderizado
 */
const BookReaderSection = ({
  bookContent,
  bookPages,
  currentPage,
  totalPages,
  onBackToCover,
  onDownload,
  onToggleFullscreen,
  onNextPage,
  onPrevPage,
  onGoToChapter,
  isFullscreen
}) => {
  // Estado para controlar a animação de entrada
  const [fadeIn, setFadeIn] = useState(false);
  
  // Efeito para ativar a animação após o componente ser montado
  useEffect(() => {
    // Pequeno atraso para que a animação ocorra após a renderização inicial
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Estilos inline para a animação de entrada
  const fadeStyle = {
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.6s ease-in-out, transform 0.5s ease-out',
  };
  

  
  // Função para renderizar sempre duas páginas lado a lado
  const renderBookPages = () => {
    // Caso especial para contracapa (página última)
    // A capa (página 0) não é mais exibida isoladamente, pois já foi mostrada na página inicial
    if (currentPage === totalPages - 1) {
      const page = bookPages[currentPage];
      if (!page) return null;
      
      return (
        <BookImageLayout singlePage={true}>
          <BookImageWrapper singlePage={true}>
            <BookImage 
              src={page.image} 
              alt={`Página ${page.pageNumber}`} 
              fullscreen={isFullscreen}
              style={{ maxHeight: '85vh' }}
            />
          </BookImageWrapper>
        </BookImageLayout>
      );
    } else {
      // Garantir que sempre exibimos páginas pares à esquerda e ímpares à direita
      // Se a página atual for par, ajustamos para exibir ela e a próxima
      const leftPageIndex = currentPage % 2 === 1 ? currentPage - 1 : currentPage;
      const rightPageIndex = leftPageIndex + 1;
      
      const leftPage = bookPages[leftPageIndex];
      const rightPage = bookPages[rightPageIndex];
      
      return (
        <BookImageLayout $singlePage={0}>
          <BookViewerContent>
            <BookPagesContainer>
              {/* Controles de zoom centralizados */}
              {zoomActive && (
                <div style={{
                  position: 'fixed',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '10px',
                  zIndex: 9999,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  padding: '10px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  <ZoomButton onClick={() => setZoomLevel(prev => Math.min(prev + 0.5, 4))}>+</ZoomButton>
                  <ZoomButton onClick={() => setZoomLevel(prev => Math.max(prev - 0.5, 0.5))}>-</ZoomButton>
                  <ZoomButton onClick={() => setZoomLevel(1)}>Reset</ZoomButton>
                </div>
              )}
              
              <BookImageWrapper $singlePage={0}>
                {leftPage && (
                  <ZoomableImage
                    src={leftPage.image}
                    alt={`Página ${leftPage.pageNumber}`}
                    fullscreen={isFullscreen}
                    zoomActive={zoomActive}
                    showControls={false}
                    zoomLevel={zoomLevel}
                  />
                )}
              </BookImageWrapper>
              
              <BookImageWrapper $singlePage={0}>
                {rightPage && (
                  <ZoomableImage
                    src={rightPage.image}
                    alt={`Página ${rightPage.pageNumber}`}
                    fullscreen={isFullscreen}
                    zoomActive={zoomActive}
                    showControls={false}
                    zoomLevel={zoomLevel}
                  />
                )}
              </BookImageWrapper>
            </BookPagesContainer>
          </BookViewerContent>
        </BookImageLayout>
      );
    }
  };

  // Estado para controlar o zoom
  const [zoomActive, setZoomActive] = useState(false);
  // Estado para controlar o nível de zoom
  const [zoomLevel, setZoomLevel] = useState(1);
  
  return (
    <BookViewerSection className="book-viewer-section" style={fadeStyle}>
      <BookViewerActions>
        <div className="left-actions">
          <BackToCoverButton onClick={onBackToCover}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Voltar para capa
          </BackToCoverButton>
        </div>
        
        <div className="center-actions">
          <DownloadButton onClick={onDownload}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </DownloadButton>
        </div>
        
        <div className="right-actions">
          <FullscreenButton onClick={onToggleFullscreen}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isFullscreen ? (
                <>
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                </>
              ) : (
                <>
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </>
              )}
            </svg>
            {isFullscreen ? 'Sair da tela cheia' : 'Modo tela cheia'}
          </FullscreenButton>
          <button 
            onClick={() => setZoomActive(!zoomActive)} 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: zoomActive ? '#4CAF50' : '#2196F3', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              marginLeft: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            {zoomActive ? 'Desativar Zoom' : 'Ativar Zoom'}
          </button>
        </div>
      </BookViewerActions>
      
      <BookViewer>
        <BookImageContainer>
          {/* Controles de navegação */}
          <BookNavigationControls>
            <BookNavigationButton 
              onClick={onPrevPage} 
              disabled={currentPage === 0}
              title="Página anterior"
            >
              &larr;
            </BookNavigationButton>
            
            <BookPageCounter>
              Página {bookPages[currentPage]?.pageNumber || currentPage + 1} de {totalPages}
            </BookPageCounter>
            
            <BookNavigationButton 
              onClick={onNextPage} 
              disabled={currentPage === totalPages - 1}
              title="Próxima página"
            >
              &rarr;
            </BookNavigationButton>
          </BookNavigationControls>
          
          {/* Renderização das páginas do livro */}
          {renderBookPages()}
          
          {/* Navegação por capítulos */}
          <BookChaptersContainer>
            {bookContent.chapters.map((chapter) => (
              <ImageChapterButton
                key={chapter.id}
                $active={bookPages[currentPage]?.pageNumber === chapter.pageNumber}
                onClick={() => onGoToChapter(chapter.pageNumber - 1)}
              >
                {chapter.chapter}
              </ImageChapterButton>
            ))}
          </BookChaptersContainer>
        </BookImageContainer>
      </BookViewer>
    </BookViewerSection>
  );
};

export default BookReaderSection;
