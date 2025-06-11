import React, { useState, useRef } from 'react';
import { 
  FullscreenReader as FullscreenContainer, 
  FullscreenContent
} from '../styles';

import {
  FullscreenCloseButton
} from '../styles/BookReaderStyles';

// Importando o componente ZoomableImage
import ZoomableImage from './ZoomableImage';

// Importando os novos estilos específicos para as imagens
import {
  FullscreenImageContainer,
  FullscreenImageLayout,
  BookImageWrapper,
  BookImage,
  FullscreenNavigationControls,
  BookNavigationButton,
  BookPageCounter,
  BookChaptersContainer,
  ZoomControlsContainer,
  ZoomButton
} from '../styles/BookImageStyles';

/**
 * Componente para visualização do livro em tela cheia
 * 
 * Este componente é utilizado pelo BookPage.jsx quando o usuário ativa o modo de tela cheia.
 * Ele recebe todas as funções de navegação e o conteúdo do livro do componente pai,
 * permitindo uma experiência de leitura imersiva sem perder as funcionalidades de navegação.
 * 
 * Relacionamento com outros componentes:
 * - Recebe props do BookPage.jsx
 * - Utiliza estilos definidos em BookReaderStyles.js
 * - Compartilha lógica de navegação com BookReaderSection.jsx
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
  onGoToChapter
}) => {
  // Estado para controlar a visibilidade do zoom
  const [zoomActive, setZoomActive] = useState(false);
  // Estado para controlar o nível de zoom
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Sempre exibir páginas duplas por padrão
  // Função para renderizar sempre duas páginas lado a lado
  const renderBookPages = () => {
    // Caso especial para contracapa (página última)
    // A capa (página 0) não é mais exibida isoladamente, pois já foi mostrada na página inicial
    if (currentPage === totalPages - 1) {
      const page = bookPages[currentPage];
      if (!page) return null;
      
      return (
        <FullscreenImageLayout singlePage={true}>
          <BookImageWrapper singlePage={true}>
            <BookImage 
              src={page.image} 
              alt={`Página ${page.pageNumber}`} 
              fullscreen={true}
              style={{ maxHeight: '90vh' }}
            />
          </BookImageWrapper>
        </FullscreenImageLayout>
      );
    } else {
      // Garantir que sempre exibimos páginas pares à esquerda e ímpares à direita
      // Se a página atual for par, ajustamos para exibir ela e a próxima
      const leftPageIndex = currentPage % 2 === 1 ? currentPage - 1 : currentPage;
      const rightPageIndex = leftPageIndex + 1;
      
      const leftPage = bookPages[leftPageIndex];
      const rightPage = bookPages[rightPageIndex];
      
      return (
        <FullscreenImageLayout $singlePage={0}>
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
          
          {/* Página esquerda */}
          <BookImageWrapper $singlePage={0}>
            {leftPage && (
              <ZoomableImage
                src={leftPage.image}
                alt={`Página ${leftPage.pageNumber}`}
                fullscreen={true}
                zoomActive={zoomActive}
                showControls={false}
                zoomLevel={zoomLevel}
              />
            )}
          </BookImageWrapper>
          
          {/* Página direita */}
          <BookImageWrapper $singlePage={0}>
            {rightPage && (
              <ZoomableImage
                src={rightPage.image}
                alt={`Página ${rightPage.pageNumber}`}
                fullscreen={true}
                zoomActive={zoomActive}
                showControls={false}
                zoomLevel={zoomLevel}
              />
            )}
          </BookImageWrapper>
        </FullscreenImageLayout>
      );
    }
  };

  return (
    <FullscreenContainer ref={fullscreenRef}>
      <FullscreenCloseButton onClick={onClose}>
        &times; Sair da tela cheia
      </FullscreenCloseButton>
      <button 
        onClick={() => setZoomActive(!zoomActive)} 
        style={{ 
          position: 'fixed',
          top: '70px',
          right: '20px',
          padding: '8px 16px', 
          backgroundColor: zoomActive ? '#4CAF50' : '#2196F3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          zIndex: 1000
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
      <FullscreenContent>
        <FullscreenImageContainer>

          
          {/* Controles de navegação */}
          <FullscreenNavigationControls>
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
          </FullscreenNavigationControls>
          
          {/* Renderização das páginas do livro */}
          {renderBookPages()}
          
          {/* Navegação por capítulos */}
          <BookChaptersContainer>
            {bookContent.chapters.map((chapter) => (
              <ChapterButton
                key={chapter.id}
                $active={bookPages[currentPage]?.pageNumber === chapter.pageNumber}
                onClick={() => onGoToChapter(chapter.pageNumber - 1)}
              >
                {chapter.chapter}
              </ChapterButton>
            ))}
          </BookChaptersContainer>
        </FullscreenImageContainer>
      </FullscreenContent>
    </FullscreenContainer>
  );
};

export default FullscreenReader;
