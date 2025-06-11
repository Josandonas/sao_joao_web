import React, { useMemo } from 'react';
import { Container } from './styles';
import { bookContent } from './data/bookContent';
import { useBookNavigation } from './hooks/useBookNavigation';
import { useFullscreen } from './hooks/useFullscreen';
import { useBookActions } from './hooks/useBookActions';
import BookCoverSection from './components/BookCoverSection';
import BookReaderSection from './components/BookReaderSection';
import FullscreenReader from './components/FullscreenReader';
import BookHeader from './components/BookHeader';
import { useParams } from 'react-router-dom';

/**
 * Componente principal da página do livro
 * Responsável por orquestrar os subcomponentes e gerenciar o estado global
 * @returns {JSX.Element} - Componente renderizado
 */
const BookPage = () => {
  // Obtém o parâmetro de idioma da URL
  const { lang } = useParams();
  
  // Define o PDF e os títulos de compartilhamento adequados com base no idioma
  const getPdfByLanguage = () => {
    switch(lang) {
      case 'en':
        return {
          pdfUrl: '/assets/pdf/livro_en.pdf',
          shareTitle: 'Bath of Saint John - A Pantanal Tradition',
          shareText: 'Discover the rich tradition of the Bath of Saint John in the Brazilian Pantanal.'
        };
      case 'es':
        return {
          pdfUrl: '/assets/pdf/livro_es.pdf',
          shareTitle: 'Baño de San Juan - Una Tradición del Pantanal',
          shareText: 'Descubra la rica tradición del Baño de San Juan en el Pantanal brasileño.'
        };
      case 'pt':
      default:
        return {
          pdfUrl: '/assets/pdf/livro_c.pdf',
          shareTitle: 'Banho de São João - Uma Tradição do Pantanal',
          shareText: 'Conheça a rica tradição do Banho de São João no Pantanal brasileiro.'
        };
    }
  };
  
  const { pdfUrl, shareTitle, shareText } = getPdfByLanguage();
  
  // Gera as páginas do livro baseadas no idioma atual
  const bookPages = useMemo(() => {
    return bookContent.getBookPages(lang);
  }, [lang]);
  
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
  } = useBookNavigation({ ...bookContent, totalPages: bookPages.length });
  
  const { isFullscreen, fullscreenRef, toggleFullscreen } = useFullscreen();
  
  const { handleDownload, handleShare } = useBookActions({
    shareTitle,
    shareText,
    pdfUrl,
    pdfNotReady: false // PDF está disponível para download
  });

  return (
    <Container>
      {/* Cabeçalho da página do livro com botões de ação */}
      <BookHeader 
        onStartReading={startReading}
        onDownload={handleDownload}
        onShare={handleShare}
        showBook={showBook}
      />
      
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
          bookPages={bookPages}
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
      
      {/* Renderizador de tela cheia condicional */}
      {isFullscreen && (
        <FullscreenReader
          ref={fullscreenRef}
          fullscreenRef={fullscreenRef}
          onClose={toggleFullscreen}
          bookContent={bookContent}
          bookPages={bookPages}
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
