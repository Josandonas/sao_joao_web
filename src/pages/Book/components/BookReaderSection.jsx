import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

// Importando os componentes originais
import { 
  BookViewerSection, 
  BookViewer,
  BookPages
} from '../styles';

// Importando o componente ZoomableImage
import ZoomableImage from './ZoomableImage';

// Importando os novos estilos específicos para as imagens
import {
  BookImageContainer,
  BookImageLayout,
  BookImageWrapper,
  BookImage,
  BookNavigationControls as OldBookNavigationControls,
  BookNavigationButton,
  BookPageCounter,
  BookChaptersContainer,
  ChapterButton as ImageChapterButton,
  BookPagesContainer,
  ZoomControlsContainer,
  ZoomButton
} from '../styles/BookImageStyles';

// Importando os novos componentes
import BookReaderToolbar from './BookReaderToolbar';
import BookNavigationControls from './BookNavigationControls';
import BookChapterNavigation from './BookChapterNavigation';
import BookReaderSettings from './BookReaderSettings';

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
  const { t } = useTranslation();
  
  // Estado para controlar a animação de entrada
  const [fadeIn, setFadeIn] = useState(false);
  
  // Detecta se é dispositivo móvel
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Estados para os novos componentes
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [chaptersMenuOpen, setChaptersMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Removida a opção de alternar entre versões, pois o componente BookReader foi removido
  
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
  
  // Função para compartilhar o livro
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t('book.shareTitle', 'Banho de São João'),
        text: t('book.shareText', 'Confira este livro sobre o Banho de São João!'),
        url: window.location.href,
      })
      .catch((error) => console.log('Erro ao compartilhar:', error));
    } else {
      // Fallback para navegadores que não suportam a API Web Share
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, '_blank');
    }
  };
  
  // Função para alternar o modo escuro
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Prepara os dados das páginas no formato esperado pelo novo componente
  const formattedPages = bookPages.map(page => page.image);
  

  
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
          <BookPages>
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
                  <ZoomButton onClick={() => setZoomLevel(1)}>{t('book.resetZoom')}</ZoomButton>
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
          </BookPages>
        </BookImageLayout>
      );
    }
  };

  // Estado para controlar o zoom
  const [zoomActive, setZoomActive] = useState(false);
  // Estado para controlar o nível de zoom
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Versão híbrida: usa os componentes modulares com a estrutura existente
  
  // Versão híbrida: mantém a estrutura original mas usa os novos componentes
  return (
    <BookViewerSection className="book-viewer-section" style={fadeStyle}>
      
      {/* Usando o novo componente BookReaderToolbar */}
      <BookReaderToolbar
        isMobile={isMobile}
        onBackToCover={onBackToCover}
        onDownload={onDownload}
        onShare={handleShare}
        onToggleFullscreen={onToggleFullscreen}
        onToggleZoom={() => setZoomActive(!zoomActive)}
        onToggleChapters={() => setChaptersMenuOpen(true)}
        onToggleSettings={() => setSettingsMenuOpen(true)}
        isFullscreen={isFullscreen}
        zoomActive={zoomActive}
        t={t}
      />
      
      {/* Componente de configurações */}
      <BookReaderSettings
        isMobile={isMobile}
        isOpen={settingsMenuOpen}
        onClose={() => setSettingsMenuOpen(false)}
        onDownload={onDownload}
        onShare={handleShare}
        onToggleFullscreen={onToggleFullscreen}
        onToggleDarkMode={handleToggleDarkMode}
        isDarkMode={darkMode}
        isFullscreen={isFullscreen}
        t={t}
      />
      
      <BookViewer>
        <BookImageContainer>
          {/* Usando o novo componente de navegação */}
          <BookNavigationControls
            isMobile={false} // Mantemos false aqui pois estamos na versão híbrida
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            isFirstPage={currentPage === 0}
            isLastPage={currentPage === totalPages - 1}
            t={t}
          />
          
          {/* Renderização das páginas do livro (mantendo o método original) */}
          {renderBookPages()}
          
          {/* Usando o novo componente de navegação por capítulos */}
          <BookChapterNavigation
            isMobile={false} // Mantemos false aqui pois estamos na versão híbrida
            chapters={bookContent.chapters}
            currentPage={currentPage}
            onGoToChapter={onGoToChapter}
            isOpen={chaptersMenuOpen}
            onClose={() => setChaptersMenuOpen(false)}
            t={t}
          />
        </BookImageContainer>
      </BookViewer>
    </BookViewerSection>
  );
};

export default BookReaderSection;
