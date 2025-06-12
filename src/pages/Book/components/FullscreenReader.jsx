import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FullscreenReader as FullscreenContainer, 
  FullscreenContent
} from '../styles';

import {
  FullscreenCloseButton
} from '../styles/BookReaderStyles';

// Importando os componentes necessários
import PDFReader from './PDFReader';
import BookReaderToolbar from './BookReaderToolbar';

// Importando os estilos necessários
import {
  FullscreenImageContainer,
  BookChaptersContainer,
  ChapterButton
} from '../styles/BookImageStyles';

/**
 * Componente para visualização do livro em tela cheia usando o visualizador de PDF
 * 
 * Este componente é utilizado pelo BookPage.jsx quando o usuário ativa o modo de tela cheia.
 * Ele recebe todas as funções de navegação e o conteúdo do livro do componente pai,
 * permitindo uma experiência de leitura imersiva sem perder as funcionalidades de navegação.
 * 
 * Relacionamento com outros componentes:
 * - Recebe props do BookPage.jsx
 * - Utiliza estilos definidos em BookReaderStyles.js
 * - Compartilha lógica de navegação com BookReaderSection.jsx
 * - Usa o componente PDFReader para exibir o PDF
 * 
 * @param {Object} props - Propriedades do componente
 * @param {React.RefObject} props.fullscreenRef - Referência para o elemento que será exibido em tela cheia
 * @param {Function} props.onClose - Função para fechar o modo de tela cheia
 * @param {Array} props.bookContent - Array com o conteúdo do livro
 * @param {Number} props.currentPage - Índice da página atual
 * @param {Number} props.totalPages - Total de páginas do livro
 * @param {Function} props.onNextPage - Função para avançar para a próxima página
 * @param {Function} props.onPrevPage - Função para voltar para a página anterior
 * @param {Function} props.onGoToChapter - Função para navegar para um capítulo específico
 * @param {string} props.pdfUrl - URL do arquivo PDF a ser exibido
 * @returns {JSX.Element} - Componente renderizado
 */
const FullscreenReader = ({
  fullscreenRef,
  onClose,
  bookContent,
  bookPages,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  onGoToChapter,
  t,
  pdfUrl
}) => {
  // Se não for passado o objeto de tradução, usa o hook
  const { t: translate } = useTranslation();
  const tFunc = t || translate;
  // Estado para controlar a visibilidade do zoom
  const [zoomActive, setZoomActive] = useState(false);
  const [scale, setScale] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [pdfTotalPages, setPdfTotalPages] = useState(totalPages);
  
  // Funções para controle de zoom
  const handleZoomIn = () => {
    setZoomActive(true);
    setScale(prev => Math.min(3, prev + 0.2));
  };
  
  const handleZoomOut = () => {
    setZoomActive(true);
    setScale(prev => Math.max(0.5, prev - 0.2));
  };
  
  const handleZoomReset = () => {
    setScale(1);
    if (scale === 1) {
      setZoomActive(false);
    }
  };
  
  const handleFitToWidth = () => {
    setZoomActive(true);
    // Ajusta o zoom para caber na largura disponível
    const newScale = Math.min(1.5, window.innerWidth / 800);
    setScale(newScale);
  };
  
  // Função para lidar com o carregamento bem-sucedido do documento PDF
  const handlePdfLoadSuccess = ({ numPages }) => {
    setPdfTotalPages(numPages);
  };

  return (
    <FullscreenContainer ref={fullscreenRef}>
      {/* Barra de controles superior */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '0',
        right: '0',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 1001
      }}>
        {/* Controles de zoom usando o BookReaderToolbar */}
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: '30px',
          padding: '5px 15px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          <BookReaderToolbar
            isMobile={false}
            onToggleZoom={() => setZoomActive(!zoomActive)}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onZoomReset={handleZoomReset}
            onFitToWidth={handleFitToWidth}
            zoomActive={zoomActive}
            zoomLevel={scale}
            t={tFunc}
          />
        </div>
        
        {/* Controles de navegação central */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: '30px',
          padding: '5px 15px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <button
            onClick={onPrevPage} 
            disabled={currentPage === 0}
            title={tFunc('book.previousPage')}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: currentPage === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentPage === 0 ? 'default' : 'pointer',
              margin: '0 2px',
              opacity: currentPage === 0 ? 0.5 : 1,
              fontSize: '22px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          
          <div style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '0 12px'
          }}>
            {tFunc('book.pageCounter', { current: bookPages[currentPage]?.pageNumber || currentPage + 1, total: totalPages })}
          </div>
          
          <button
            onClick={onNextPage} 
            disabled={currentPage === totalPages - 1}
            title={tFunc('book.nextPage')}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: currentPage === totalPages - 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentPage === totalPages - 1 ? 'default' : 'pointer',
              margin: '0 2px',
              opacity: currentPage === totalPages - 1 ? 0.5 : 1,
              fontSize: '22px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
        
        {/* Botão de fechar tela cheia */}
        <button 
          onClick={onClose} 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            padding: '8px 16px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            fontSize: '14px'
          }}
          title={tFunc('book.exitFullscreen')}
        >
          {tFunc('book.exitFullscreen')}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <FullscreenContent>
        {/* Botão de navegação esquerdo (página anterior) */}
        <button
          onClick={onPrevPage} 
          disabled={currentPage === 0}
          title={tFunc('book.previousPage')}
          style={{
            position: 'fixed',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: currentPage === 0 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.6)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentPage === 0 ? 'default' : 'pointer',
            zIndex: 1002,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        
        {/* Botão de navegação direito (próxima página) */}
        <button
          onClick={onNextPage} 
          disabled={currentPage === totalPages - 1}
          title={tFunc('book.nextPage')}
          style={{
            position: 'fixed',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: currentPage === totalPages - 1 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.6)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentPage === totalPages - 1 ? 'default' : 'pointer',
            zIndex: 1002,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
        
        <FullscreenImageContainer>
          {/* Renderização do PDFReader */}
          <div style={{ 
            width: '100%', 
            height: 'calc(100vh - 200px)',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '0',
            boxSizing: 'border-box',
            maxWidth: 'calc(100vw - 120px)', /* Largura total menos espaço para as setas */
            margin: '0 auto'
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
              darkMode={darkMode}
              zoomEnabled={zoomActive}
              zoomLevel={scale}
            />
          </div>
          
          {/* Navegação por capítulos */}
          <BookChaptersContainer>
            {bookContent.chapters.map((chapter) => (
              <ChapterButton
                key={chapter.id}
                $active={currentPage === chapter.pageNumber - 1}
                onClick={() => onGoToChapter(chapter.pageNumber - 1)}
              >
                {tFunc(chapter.chapter)}
              </ChapterButton>
            ))}
          </BookChaptersContainer>
        </FullscreenImageContainer>
      </FullscreenContent>
    </FullscreenContainer>
  );
};

export default FullscreenReader;
