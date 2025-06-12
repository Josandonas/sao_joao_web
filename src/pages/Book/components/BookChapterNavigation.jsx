import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DesktopChaptersNavigation, 
  DesktopChapterButton 
} from '../styles/BookReaderDesktop.styles';
import {
  MobileChaptersMenu,
  MobileChaptersHeader,
  MobileChaptersList,
  MobileChapterItem,
  MobileOverlay
} from '../styles/BookReaderMobile.styles';

/**
 * Componente para navegação por capítulos do livro
 * Versões responsivas para desktop e mobile
 */
const BookChapterNavigation = ({
  isMobile,
  chapters,
  currentPage,
  onGoToChapter,
  isOpen,
  onClose,
  t
}) => {
  // Se não for passado o objeto de tradução, usa o hook
  const { t: translate } = useTranslation();
  const tFunc = t || translate;

  // Função para determinar se um capítulo está ativo
  const isChapterActive = (chapter) => {
    const currentPageNumber = currentPage + 1;
    const nextChapterIndex = chapters.findIndex(c => c.pageNumber > currentPageNumber);
    
    if (nextChapterIndex === -1) {
      // Se não houver próximo capítulo, estamos no último
      return chapter.id === chapters[chapters.length - 1].id;
    } else {
      // Estamos no capítulo cujo número de página é menor ou igual à página atual
      // e o próximo capítulo tem número de página maior
      const isCurrentChapter = chapter.pageNumber <= currentPageNumber && 
        chapters[nextChapterIndex].pageNumber > currentPageNumber;
      return isCurrentChapter;
    }
  };

  // Renderiza a versão mobile da navegação por capítulos
  if (isMobile) {
    return (
      <>
        <MobileOverlay isOpen={isOpen} onClick={onClose} />
        <MobileChaptersMenu isOpen={isOpen}>
          <MobileChaptersHeader>
            <h3>{tFunc('book.chapters')}</h3>
            <button onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </MobileChaptersHeader>
          <MobileChaptersList>
            {chapters.map((chapter) => (
              <MobileChapterItem 
                key={chapter.id} 
                $active={isChapterActive(chapter)}
                onClick={() => {
                  onGoToChapter(chapter.id);
                  onClose();
                }}
              >
                {tFunc(chapter.chapter)}: {tFunc(chapter.title)}
              </MobileChapterItem>
            ))}
          </MobileChaptersList>
        </MobileChaptersMenu>
      </>
    );
  }

  // Renderiza a versão desktop da navegação por capítulos
  return (
    <DesktopChaptersNavigation>
      {chapters.map((chapter) => (
        <DesktopChapterButton
          key={chapter.id}
          $active={isChapterActive(chapter)}
          onClick={() => onGoToChapter(chapter.pageNumber - 1)}
          title={`${tFunc(chapter.chapter)}: ${tFunc(chapter.title)}`}
        >
          {tFunc(chapter.chapter)}
        </DesktopChapterButton>
      ))}
    </DesktopChaptersNavigation>
  );
};

export default BookChapterNavigation;
