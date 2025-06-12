import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

// Importando os componentes originais
import { 
  BookViewerSection, 
  BookViewer
} from '../styles';

// Importando o componente PDFReader
import PDFReader from './PDFReader';

// Importando os estilos necessários
import {
  BookImageContainer,
  BookChaptersContainer,
  ChapterButton as ImageChapterButton
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
  isFullscreen,
  pdfUrl // Nova propriedade para a URL do PDF
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
  
  // Não precisamos mais do estado de modo de visualização, pois usaremos apenas o PDF
  
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
  

  
  // Não precisamos mais da função renderBookPages, pois usaremos apenas o PDFReader

  // Estado para controlar o zoom
  const [zoomActive, setZoomActive] = useState(false);
  // Estado para controlar o nível de zoom
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Função para aumentar o zoom
  const handleZoomIn = () => {
    setZoomActive(true);
    setZoomLevel(prev => Math.min(3, prev + 0.2));
  };
  
  // Função para diminuir o zoom
  const handleZoomOut = () => {
    setZoomActive(true);
    setZoomLevel(prev => Math.max(0.5, prev - 0.2));
  };
  
  // Função para resetar o zoom
  const handleZoomReset = () => {
    setZoomLevel(1);
    if (zoomLevel === 1) {
      setZoomActive(false);
    }
  };
  
  // Função para ajustar o zoom à largura
  const handleFitToWidth = () => {
    setZoomActive(true);
    // O valor exato será calculado pelo PDFReader
  };
  
  // Estado para controlar o número total de páginas do PDF
  const [pdfTotalPages, setPdfTotalPages] = useState(0);
  
  // Função para lidar com o carregamento bem-sucedido do documento PDF
  const handlePdfLoadSuccess = ({ numPages }) => {
    setPdfTotalPages(numPages);
    console.log(`PDF carregado com ${numPages} páginas`);
  };
  
  // Não precisamos mais da função para alternar entre modos de visualização
  
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
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
        onFitToWidth={handleFitToWidth}
        zoomLevel={zoomLevel}
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
        <BookImageContainer style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          {/* Usando o novo componente de navegação */}
          <BookNavigationControls
            isMobile={false}
            currentPage={currentPage}
            totalPages={pdfTotalPages}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            isFirstPage={currentPage === 0}
            isLastPage={currentPage === pdfTotalPages - 1}
            t={t}
          />
          
          {/* Renderização do PDFReader com estilo melhorado */}
          <div style={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <PDFReader
              pdfUrl={pdfUrl}
              currentPage={currentPage + 1} // PDFReader usa páginas começando em 1
              onPageChange={(newPage) => {
                // Ajuste para o sistema de navegação que começa em 0
                if (newPage - 1 !== currentPage) {
                  if (newPage - 1 > currentPage) {
                    onNextPage();
                  } else {
                    onPrevPage();
                  }
                }
              }}
              onDocumentLoadSuccess={handlePdfLoadSuccess}
              onZoomChange={(newZoom) => setZoomLevel(newZoom)}
              darkMode={darkMode}
              zoomEnabled={zoomActive}
              zoomLevel={zoomLevel}
            />
          </div>
          
          {/* Navegação por capítulos (menu lateral) */}
          <BookChaptersContainer 
            $isOpen={chaptersMenuOpen}
            onClick={() => setChaptersMenuOpen(false)}
          >
            <div className="chapters-content" onClick={(e) => e.stopPropagation()}>
              <div className="chapters-header">
                <h3>{t('book.chapters', 'Capítulos')}</h3>
                <button 
                  className="close-button"
                  onClick={() => setChaptersMenuOpen(false)}
                  aria-label={t('book.closeChapters', 'Fechar capítulos')}
                >
                  &times;
                </button>
              </div>
              
              <div className="chapters-list">
                {bookContent.chapters.map((chapter) => (
                  <ImageChapterButton
                    key={chapter.id}
                    onClick={() => {
                      // Ajuste para o sistema de navegação do PDF
                      // Subtrai 1 porque o sistema de navegação interno começa em 0, mas o PDF começa em 1
                      onGoToChapter(chapter.pageNumber - 1);
                      setChaptersMenuOpen(false);
                    }}
                    $active={currentPage === chapter.pageNumber - 1}
                  >
                    {t(chapter.title)}
                  </ImageChapterButton>
                ))}
              </div>
            </div>
          </BookChaptersContainer>
        </BookImageContainer>
      </BookViewer>
    </BookViewerSection>
  );
};

export default BookReaderSection;
