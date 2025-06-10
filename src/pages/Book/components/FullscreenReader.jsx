import React from 'react';
import { 
  FullscreenReader as FullscreenContainer, 
  FullscreenCloseButton, 
  FullscreenContent,
  PageNavigation,
  NavButton,
  PageCounter
} from '../styles';

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
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  onGoToChapter
}) => {
  return (
    <FullscreenContainer ref={fullscreenRef}>
      <FullscreenCloseButton onClick={onClose}>&times;</FullscreenCloseButton>
      <FullscreenContent>
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
        
        <div className="fullscreen-page">
          {bookContent.chapters[currentPage] && (
            <>
              <h2>{bookContent.chapters[currentPage].title}</h2>
              <div className="page-container">
                <img src={bookContent.chapters[currentPage].image} alt={bookContent.chapters[currentPage].title} />
                <div 
                  className="page-text"
                  dangerouslySetInnerHTML={{ __html: bookContent.chapters[currentPage].content }} 
                />
              </div>
            </>
          )}
        </div>
        
        <div className="fullscreen-chapters">
          {bookContent.chapters.map((page, index) => (
            <button
              key={page.id}
              className={index === currentPage ? 'active' : ''}
              onClick={() => onGoToChapter(index)}
            >
              {page.chapter}
            </button>
          ))}
        </div>
      </FullscreenContent>
    </FullscreenContainer>
  );
};

export default FullscreenReader;
