import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './styles';
import { bookContent } from './data/bookContent';
import BookCoverSection from './components/BookCoverSection';
import BookHeader from './components/BookHeader';
import { useParams } from 'react-router-dom';

// Importar o contexto do livro
import { BookProvider, useBookContext } from './context/BookContext';

/**
 * Componente interno da página do livro que usa o contexto
 * @returns {JSX.Element} - Componente renderizado
 */
const BookPageContent = () => {
  // Obtém o parâmetro de idioma da URL
  const { lang } = useParams();
  
  // Hook de tradução
  const { t } = useTranslation();
  
  // Usar o contexto do livro
  const { 
    actions: { handleDownload, handleShare, handleReadOnline, shareStatus }
  } = useBookContext();
  
  return (
    <Container>
      {/* Cabeçalho da página do livro com botões de ação */}
      <BookHeader 
        onDownload={handleDownload}
        onShare={handleShare}
        onReadOnline={handleReadOnline}
        shareStatus={shareStatus}
      />
      
      {/* Seção da capa */}
      <BookCoverSection
        bookContent={bookContent}
        onDownload={handleDownload}
        onShare={handleShare}
        onReadOnline={handleReadOnline}
        shareStatus={shareStatus}
      />
    </Container>
  );
};

/**
 * Componente principal da página do livro
 * Responsável por orquestrar os subcomponentes e gerenciar o estado global
 * @returns {JSX.Element} - Componente renderizado
 */
const BookPage = () => {
  // Obtém o parâmetro de idioma da URL
  const { lang } = useParams();
  
  // Hook de tradução
  const { i18n } = useTranslation();
  
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
  
  // Dados iniciais para o contexto
  const initialData = {
    pdfUrl: pdfPath,
    bookContent: { ...bookContent },
    shareTitle: 'Banho de São João - Uma Tradição do Pantanal',
    shareText: 'Conheça a rica tradição do Banho de São João no Pantanal brasileiro.'
  };
  
  return (
    <BookProvider initialData={initialData}>
      <BookPageContent />
    </BookProvider>
  );
};

export default BookPage;
