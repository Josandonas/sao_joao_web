import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useMediaQuery } from 'react-responsive';

// Componentes
import BookReaderToolbar from './BookReaderToolbar';
import BookNavigationControls from './BookNavigationControls';
import BookChapterNavigation from './BookChapterNavigation';
import BookReaderSettings from './BookReaderSettings';
import ZoomableImage from './ZoomableImage';

// Estilos
import { 
  ReaderContainer, 
  LoadingIndicator, 
  FeedbackMessage 
} from '../styles/BookReaderCommon.styles';
import { 
  DesktopReaderContainer, 
  DesktopContentArea, 
  DesktopPagesContainer,
  DesktopPagesLayout,
  DesktopPageWrapper,
  DesktopPageImage,
  DesktopZoomControls,
  DesktopZoomButton,
  ZoomLevelIndicator
} from '../styles/BookReaderDesktop.styles';
import {
  MobileReaderContainer,
  MobileContentArea,
  MobilePageContainer,
  MobilePageImage
} from '../styles/BookReaderMobile.styles';

/**
 * Componente principal do leitor de livros
 * Integra todos os subcomponentes e gerencia o estado
 */
const BookReader = ({
  pages,
  chapters,
  currentPage,
  setCurrentPage,
  onBackToCover,
  onDownload,
  onShare,
  isFullscreen,
  toggleFullscreen
}) => {
  const { t } = useTranslation();
  
  // Detecta se é dispositivo móvel
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Estados
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showZoomControls, setShowZoomControls] = useState(false);
  const [chaptersMenuOpen, setChaptersMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [pageTransitionDirection, setPageTransitionDirection] = useState('next');
  const [isLoading, setIsLoading] = useState(true);
  
  // Total de páginas
  const totalPages = pages.length;
  
  // Verifica se está na primeira ou última página
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;
  
  // Determina se deve mostrar uma única página ou páginas duplas
  const isSinglePage = isMobile || isFirstPage || isLastPage || (currentPage % 2 === 0);
  
  // Carrega as imagens
  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      
      try {
        // Carrega a página atual
        const currentImg = new Image();
        currentImg.src = pages[currentPage];
        await new Promise(resolve => { currentImg.onload = resolve; });
        
        // Se não for página única, carrega a próxima página também
        if (!isSinglePage && currentPage + 1 < totalPages) {
          const nextImg = new Image();
          nextImg.src = pages[currentPage + 1];
          await new Promise(resolve => { nextImg.onload = resolve; });
        }
        
        // Pré-carrega as próximas páginas para navegação mais rápida
        if (currentPage + 2 < totalPages) {
          const preloadNext = new Image();
          preloadNext.src = pages[currentPage + 2];
        }
        
        if (currentPage - 1 >= 0) {
          const preloadPrev = new Image();
          preloadPrev.src = pages[currentPage - 1];
        }
      } catch (error) {
        console.error('Erro ao carregar imagens:', error);
        showFeedback('error', t('book.errorLoadingImages'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadImages();
  }, [currentPage, pages, isSinglePage, totalPages, t]);
  
  // Função para navegar para a página anterior
  const handlePrevPage = useCallback(() => {
    if (currentPage > 0) {
      setPageTransitionDirection('prev');
      setCurrentPage(isSinglePage || currentPage % 2 !== 0 ? currentPage - 1 : currentPage - 2);
    }
  }, [currentPage, isSinglePage, setCurrentPage]);
  
  // Função para navegar para a próxima página
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setPageTransitionDirection('next');
      setCurrentPage(isSinglePage || currentPage % 2 === 0 ? currentPage + 1 : currentPage + 2);
    }
  }, [currentPage, isSinglePage, setCurrentPage, totalPages]);
  
  // Função para navegar para um capítulo específico
  const handleGoToChapter = useCallback((pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setPageTransitionDirection(pageNumber > currentPage ? 'next' : 'prev');
      setCurrentPage(pageNumber);
    }
  }, [currentPage, setCurrentPage, totalPages]);
  
  // Função para alternar o zoom
  const handleToggleZoom = useCallback(() => {
    setZoomEnabled(!zoomEnabled);
    if (zoomEnabled) {
      setZoomLevel(1);
    }
  }, [zoomEnabled]);
  
  // Função para alternar o modo escuro
  const handleToggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);
  
  // Função para mostrar feedback
  const showFeedback = useCallback((type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
    }, 3000);
  }, []);
  
  // Manipuladores de eventos de teclado para navegação
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (e.key === 'ArrowRight') {
        handleNextPage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePrevPage, handleNextPage]);
  
  // Renderiza a versão mobile do leitor
  if (isMobile) {
    return (
      <ReaderContainer style={{ backgroundColor: darkMode ? '#121212' : '#f5f5f5' }}>
        <MobileReaderContainer>
          <MobileContentArea>
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <TransitionGroup component={null}>
                <CSSTransition
                  key={currentPage}
                  timeout={300}
                  classNames="page-transition"
                >
                  <MobilePageContainer $direction={pageTransitionDirection}>
                    {zoomEnabled ? (
                      <ZoomableImage
                        src={pages[currentPage]}
                        alt={`Página ${currentPage + 1}`}
                        onZoomChange={setZoomLevel}
                      />
                    ) : (
                      <MobilePageImage
                        src={pages[currentPage]}
                        alt={`Página ${currentPage + 1}`}
                      />
                    )}
                  </MobilePageContainer>
                </CSSTransition>
              </TransitionGroup>
            )}
            
            <BookNavigationControls
              isMobile={true}
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
              t={t}
            />
          </MobileContentArea>
          
          <BookReaderToolbar
            isMobile={true}
            onBackToCover={onBackToCover}
            onToggleZoom={handleToggleZoom}
            onToggleChapters={() => setChaptersMenuOpen(true)}
            onToggleSettings={() => setSettingsMenuOpen(true)}
            zoomActive={zoomEnabled}
            t={t}
          />
          
          <BookChapterNavigation
            isMobile={true}
            chapters={chapters}
            currentPage={currentPage}
            onGoToChapter={handleGoToChapter}
            isOpen={chaptersMenuOpen}
            onClose={() => setChaptersMenuOpen(false)}
            t={t}
          />
          
          <BookReaderSettings
            isMobile={true}
            isOpen={settingsMenuOpen}
            onClose={() => setSettingsMenuOpen(false)}
            onDownload={onDownload}
            onShare={onShare}
            onToggleFullscreen={toggleFullscreen}
            onToggleDarkMode={handleToggleDarkMode}
            isDarkMode={darkMode}
            isFullscreen={isFullscreen}
            t={t}
          />
        </MobileReaderContainer>
        
        {feedback && (
          <FeedbackMessage $type={feedback.type}>
            {feedback.message}
          </FeedbackMessage>
        )}
      </ReaderContainer>
    );
  }
  
  // Renderiza a versão desktop do leitor
  return (
    <ReaderContainer style={{ backgroundColor: darkMode ? '#121212' : '#f5f5f5' }}>
      <DesktopReaderContainer>
        <BookReaderToolbar
          isMobile={false}
          onBackToCover={onBackToCover}
          onDownload={onDownload}
          onShare={onShare}
          onToggleFullscreen={toggleFullscreen}
          onToggleZoom={handleToggleZoom}
          isFullscreen={isFullscreen}
          zoomActive={zoomEnabled}
          t={t}
        />
        
        <BookChapterNavigation
          isMobile={false}
          chapters={chapters}
          currentPage={currentPage}
          onGoToChapter={handleGoToChapter}
          t={t}
        />
        
        <DesktopContentArea>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <TransitionGroup component={null}>
              <CSSTransition
                key={currentPage}
                timeout={300}
                classNames="page-transition"
              >
                <DesktopPagesContainer>
                  <DesktopPagesLayout $singlePage={isSinglePage}>
                    <DesktopPageWrapper $singlePage={isSinglePage}>
                      {zoomEnabled ? (
                        <ZoomableImage
                          src={pages[currentPage]}
                          alt={`Página ${currentPage + 1}`}
                          onZoomChange={setZoomLevel}
                        />
                      ) : (
                        <DesktopPageImage
                          src={pages[currentPage]}
                          alt={`Página ${currentPage + 1}`}
                          $zoomEnabled={!zoomEnabled}
                        />
                      )}
                    </DesktopPageWrapper>
                    
                    {!isSinglePage && currentPage + 1 < totalPages && (
                      <DesktopPageWrapper $singlePage={false}>
                        {zoomEnabled ? (
                          <ZoomableImage
                            src={pages[currentPage + 1]}
                            alt={`Página ${currentPage + 2}`}
                            onZoomChange={setZoomLevel}
                          />
                        ) : (
                          <DesktopPageImage
                            src={pages[currentPage + 1]}
                            alt={`Página ${currentPage + 2}`}
                            $zoomEnabled={!zoomEnabled}
                          />
                        )}
                      </DesktopPageWrapper>
                    )}
                  </DesktopPagesLayout>
                </DesktopPagesContainer>
              </CSSTransition>
            </TransitionGroup>
          )}
          
          {zoomEnabled && (
            <DesktopZoomControls $visible={showZoomControls}>
              <DesktopZoomButton
                onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.25))}
                disabled={zoomLevel <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </DesktopZoomButton>
              
              <ZoomLevelIndicator>
                {Math.round(zoomLevel * 100)}%
              </ZoomLevelIndicator>
              
              <DesktopZoomButton
                onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.25))}
                disabled={zoomLevel >= 3}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </DesktopZoomButton>
            </DesktopZoomControls>
          )}
        </DesktopContentArea>
        
        <BookNavigationControls
          isMobile={false}
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          t={t}
        />
        
        {settingsMenuOpen && (
          <BookReaderSettings
            isMobile={false}
            isOpen={settingsMenuOpen}
            onClose={() => setSettingsMenuOpen(false)}
            onToggleDarkMode={handleToggleDarkMode}
            isDarkMode={darkMode}
            isFullscreen={isFullscreen}
            t={t}
          />
        )}
      </DesktopReaderContainer>
      
      {feedback && (
        <FeedbackMessage $type={feedback.type}>
          {feedback.message}
        </FeedbackMessage>
      )}
    </ReaderContainer>
  );
};

export default BookReader;
