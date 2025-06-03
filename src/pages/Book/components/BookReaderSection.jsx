import React, { useEffect, useState } from 'react';
import { 
  BookViewerSection, 
  BookViewerActions,
  BookViewer,
  BookControls,
  PageNavigation,
  NavButton,
  PageCounter,
  BookPages,
  Page,
  PageContent,
  PageImage,
  PageText,
  PageTitle,
  ChapterNavigation,
  ChapterButton,
  BackToCoverButton,
  DownloadButton,
  FullscreenButton
} from '../styles';

/**
 * Componente para a seção de leitura do livro
 * @param {Object} props - Propriedades do componente
 * @returns {JSX.Element} - Componente renderizado
 */
const BookReaderSection = ({
  bookContent,
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
        </div>
      </BookViewerActions>
      
      <BookViewer>
        <BookControls>
          <PageNavigation>
            <NavButton 
              onClick={onPrevPage} 
              disabled={currentPage === 0}
              title="Página anterior"
            >
              &larr;
            </NavButton>
            
            <PageCounter>
              Página {currentPage + 1} de {totalPages}
            </PageCounter>
            
            <NavButton 
              onClick={onNextPage} 
              disabled={currentPage === totalPages - 1}
              title="Próxima página"
            >
              &rarr;
            </NavButton>
          </PageNavigation>
        </BookControls>
        
        <BookPages>
          {bookContent.chapters.map((page, index) => (
            <Page 
              key={page.id} 
              active={index === currentPage}
            >
              <PageTitle>{page.title}</PageTitle>
              <PageContent>
                <PageImage 
                  src={page.image} 
                  alt={page.title} 
                />
                <PageText 
                  dangerouslySetInnerHTML={{ __html: page.content }} 
                />
              </PageContent>
            </Page>
          ))}
        </BookPages>
        
        <ChapterNavigation>
          <h3>Capítulos</h3>
          <div className="chapter-buttons">
            {bookContent.chapters.map((page, index) => (
              <ChapterButton
                key={page.id}
                isActive={index === currentPage}
                onClick={() => onGoToChapter(index)}
              >
                {page.chapter}
              </ChapterButton>
            ))}
          </div>
        </ChapterNavigation>
      </BookViewer>
    </BookViewerSection>
  );
};

export default BookReaderSection;
