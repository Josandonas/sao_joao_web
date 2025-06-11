import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
  ChapterButton,
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
  onGoToChapter,
  t
}) => {
  // Se não for passado o objeto de tradução, usa o hook
  const { t: translate } = useTranslation();
  const tFunc = t || translate;
  // Estado para controlar a visibilidade do zoom
  const [zoomActive, setZoomActive] = useState(false);
  const [scale, setScale] = useState(1);
  // Estado para controlar o nível de zoom (removido - agora usando scale)
  
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
          {/* Os controles de zoom foram movidos para a barra superior */}
          
          {/* Página esquerda */}
          <BookImageWrapper $singlePage={0}>
            {leftPage && (
              <ZoomableImage
                src={leftPage.image}
                alt={`Página ${leftPage.pageNumber}`}
                fullscreen={true}
                zoomActive={zoomActive}
                showControls={false}
                zoomLevel={scale}
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
                zoomLevel={scale}
              />
            )}
          </BookImageWrapper>
        </FullscreenImageLayout>
      );
    }
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
        {/* Controles do lado esquerdo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          {/* Botão de zoom */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: '30px',
            padding: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
            {/* Botão de zoom out */}
            <button
              onClick={() => {
                if (zoomActive) {
                  setScale(prev => Math.max(1, prev - 0.2));
                } else {
                  setZoomActive(true);
                  setScale(prev => Math.max(1, prev - 0.2));
                }
              }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                margin: '0 2px'
              }}
              title={tFunc('book.zoomOut')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            
            {/* Indicador de zoom */}
            <div style={{
              padding: '0 12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              {Math.round(scale * 100)}%
            </div>
            
            {/* Botão de zoom in */}
            <button
              onClick={() => {
                if (zoomActive) {
                  setScale(prev => Math.min(3, prev + 0.2));
                } else {
                  setZoomActive(true);
                  setScale(prev => Math.min(3, prev + 0.2));
                }
              }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                margin: '0 2px'
              }}
              title={tFunc('book.zoomIn')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            
            {/* Botão de reset zoom */}
            <button
              onClick={() => {
                setScale(1);
                if (scale === 1) {
                  setZoomActive(false);
                }
              }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: scale !== 1 ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                margin: '0 2px',
                opacity: scale !== 1 ? 1 : 0.5
              }}
              title={tFunc('book.resetZoom')}
              disabled={scale === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Controles de navegação central */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: '30px',
          padding: '5px 15px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
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
        <FullscreenImageContainer>

          
          {/* Os controles de navegação foram movidos para a barra superior */}
          
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
