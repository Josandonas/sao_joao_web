import React, { useState, useRef, useEffect, forwardRef } from 'react';
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

// Importando os estilos necessários
import {
  FullscreenImageContainer,
  BookChaptersContainer,
  ChapterButton
} from '../styles/BookImageStyles';

// Importando os novos estilos específicos para o FullscreenReader
import {
  ControlsBar,
  NavigationControls,
  NavigationButton,
  PageIndicator,
  ContentContainer,
  PDFContainer,
  ChaptersMenu,
  ChaptersTitle,
  ChapterItem
} from '../styles/FullscreenReaderStyles';

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
const FullscreenReader = forwardRef(({
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
}, ref) => {
  // Se não for passado o objeto de tradução, usa o hook
  const { t: translate } = useTranslation();
  const tFunc = t || translate;
  // Estado para controlar o total de páginas do PDF
  const [pdfTotalPages, setPdfTotalPages] = useState(totalPages);
  

  
  // Função para lidar com o carregamento bem-sucedido do documento PDF
  const handlePdfLoadSuccess = ({ numPages }) => {
    setPdfTotalPages(numPages);
  };

  return (
    <FullscreenContainer ref={ref}>
      {/* Barra de controles superior */}
      <ControlsBar>
        
        {/* Controles de navegação central */}
        <NavigationControls>
          <NavigationButton
            onClick={onPrevPage} 
            disabled={currentPage === 0}
            title={tFunc('book.previousPage')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </NavigationButton>
          
          <PageIndicator>
            {currentPage + 1} / {pdfTotalPages || totalPages}
          </PageIndicator>
          
          <NavigationButton
            onClick={onNextPage} 
            disabled={currentPage >= (pdfTotalPages || totalPages) - 1}
            title={tFunc('book.nextPage')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </NavigationButton>
        </NavigationControls>

        {/* Botão de fechar */}
        <FullscreenCloseButton onClick={onClose} title={tFunc('book.closeFullscreen')} />
      </ControlsBar>
      <FullscreenContent>
        {/* Botão de navegação esquerdo (página anterior) */}
        <button
          onClick={onPrevPage} 
          disabled={currentPage === 0}
          title={tFunc('book.previousPage')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        
        {/* Botão de navegação direito (próxima página) */}
        <button
          onClick={onNextPage} 
          disabled={currentPage >= (pdfTotalPages || totalPages) - 1}
          title={tFunc('book.nextPage')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
        
        <FullscreenImageContainer>
          {/* Conteúdo principal */}
          <ContentContainer>
            {/* Container do PDF */}
            <PDFContainer>
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

            />
              </PDFContainer>
            </ContentContainer>
          
          {/* Navegação por capítulos */}
          <BookChaptersContainer>
            {bookContent && bookContent.chapters && bookContent.chapters.map((chapter) => (
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
});

export default FullscreenReader;
