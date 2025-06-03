import React from 'react';
import { Container, Title, Introduction } from './styles';
import { bookContent } from './data/bookContent';
import { useBookNavigation } from './hooks/useBookNavigation';
import { useFullscreen } from './hooks/useFullscreen';
import { useBookActions } from './hooks/useBookActions';
import BookCoverSection from './components/BookCoverSection';
import BookReaderSection from './components/BookReaderSection';
import FullscreenReader from './components/FullscreenReader';

/**
 * Componente principal da página do livro
 * Responsável por orquestrar os subcomponentes e gerenciar o estado global
 * @returns {JSX.Element} - Componente renderizado
 */
const BookPage = () => {
  // Hooks personalizados para separar lógica
  const { 
    currentPage, 
    showBook, 
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToChapter,
    startReading,
    backToCover
  } = useBookNavigation(bookContent);
  
  const { isFullscreen, fullscreenRef, toggleFullscreen } = useFullscreen();
  
  const { handleDownload, handleShare } = useBookActions({
    shareTitle: 'Banho de São João - Uma Tradição do Pantanal',
    shareText: 'Conheça a rica tradição do Banho de São João no Pantanal brasileiro.',
    pdfUrl: '/assets/pdf/livro_c.pdf',
    pdfNotReady: false // PDF está disponível para download
  });

  return (
    <Container>
      
      {/* Renderização condicional: ou mostra a capa ou mostra o leitor */}
      {!showBook ? (
        /* Seção da capa */
        <BookCoverSection
          bookContent={bookContent}
          onStartReading={startReading}
          onDownload={handleDownload}
          onShare={handleShare}
        />
      ) : (
        <BookReaderSection 
          bookContent={bookContent}
          currentPage={currentPage}
          totalPages={totalPages}
          onBackToCover={backToCover}
          onDownload={handleDownload}
          onToggleFullscreen={toggleFullscreen}
          onNextPage={goToNextPage}
          onPrevPage={goToPrevPage}
          onGoToChapter={goToChapter}
          isFullscreen={isFullscreen}
        />
      )}
      
      {/* Modo de tela cheia */}
      {isFullscreen && (
        <FullscreenReader 
          fullscreenRef={fullscreenRef}
          onClose={toggleFullscreen}
          bookContent={bookContent}
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={goToNextPage}
          onPrevPage={goToPrevPage}
          onGoToChapter={goToChapter}
        />
      )}
    </Container>
  );
};

export default BookPage;
