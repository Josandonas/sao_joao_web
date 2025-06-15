import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './styles';
import { bookContent } from './data/bookContent';
import { useBookNavigation } from './hooks/useBookNavigation';
import { useFullscreen } from './hooks/useFullscreen';
import { useBookActions } from './hooks/useBookActions';
import BookReaderSection from './components/BookReaderSection';
import BookCoverSection from './components/BookCoverSection';
import PDFViewer from './components/PDFViewer';
import styled from 'styled-components';
import FullscreenReader from './components/FullscreenReader';
import BookHeader from './components/BookHeader';
import OnlineReaderSection from './components/OnlineReaderSection';
import { useParams } from 'react-router-dom';

/**
 * Componente principal da página do livro
 * Responsável por orquestrar os subcomponentes e gerenciar o estado global
 * @returns {JSX.Element} - Componente renderizado
 */
const BookPage = () => {
  // Obtém o parâmetro de idioma da URL
  const { lang } = useParams();
  
  // Hook de tradução
  const { t, i18n } = useTranslation();
  
  // Define o caminho do PDF baseado no idioma atual
  const pdfPath = useMemo(() => {
    // Garantir que a URL seja absoluta para evitar problemas de caminho relativo
    const basePath = window.location.origin;
    
    switch (i18n.language) {
      case 'en':
        return `${basePath}/assets/pdf/livro_en.pdf`;
      case 'es':
        return `${basePath}/assets/pdf/livro_es.pdf`;
      case 'pt':
      default:
        return `${basePath}/assets/pdf/livro_pt.pdf`;
    }
  }, [i18n.language]);
  

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
    shareTitle: 'Banho de São João - Uma Tradição do Pantanal',
    shareText: 'Conheça a rica tradição do Banho de São João no Pantanal brasileiro.',
    pdfUrl: pdfPath,
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
        /* Novo visualizador de PDF */
        <PDFViewer
          pdfUrl={pdfPath}
          onBackClick={backToCover}
          onDownload={handleDownload}
          onToggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
        />
      )}
      
      {/* Renderizador de tela cheia condicional */}
      {isFullscreen && (
        <FullscreenReader
          ref={fullscreenRef}
          onClose={toggleFullscreen}
          bookContent={bookContent}
          bookPages={bookPages}
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={goToNextPage}
          onPrevPage={goToPrevPage}
          onGoToChapter={goToChapter}
          t={t}
          pdfUrl={pdfPath}
        />
      )}
      
      {/* Seção de leitura online */}
      <OnlineReaderSection 
        pdfUrl={pdfPath}
        bookTitle={bookContent.metadata.title}
      />
    </Container>
  );
};

export default BookPage;
