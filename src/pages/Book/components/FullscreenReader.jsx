import React from 'react';
import { 
  FullscreenReader as FullscreenContainer, 
  CloseButton, 
  FullscreenContent,
  PageNavigation,
  NavButton,
  PageCounter
} from '../styles';

/**
 * Componente para visualização do livro em tela cheia
 * @param {Object} props - Propriedades do componente
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
      <CloseButton onClick={onClose}>&times;</CloseButton>
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
