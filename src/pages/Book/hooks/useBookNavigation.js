import { useState, useEffect } from 'react';

/**
 * Hook para gerenciar a navegação do livro
 * @param {Object} bookContent - Objeto com o conteúdo do livro e metadados
 * @returns {Object} - Funções e estado para navegação
 */
export const useBookNavigation = (bookContent) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showBook, setShowBook] = useState(false);
  
  // Usar o comprimento do array de capítulos para determinar o total de páginas
  const totalPages = bookContent.chapters.length;
  
  // Navegar para a próxima página
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Navegar para a página anterior
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Navegar para um capítulo específico
  const goToChapter = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  
  // Iniciar a leitura do livro - agora simplesmente altera o estado
  const startReading = () => {
    // Apenas atualiza o estado para mostrar o livro em vez da capa
    setShowBook(true);
    
    // Rolar para o topo da página para uma experiência mais limpa
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Voltar para a capa do livro
  const backToCover = () => {
    setShowBook(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Efeito para rolagem ao topo quando a página muda
  useEffect(() => {
    if (showBook) {
      window.scrollTo(0, 0);
    }
  }, [currentPage, showBook]);
  
  return {
    currentPage,
    setCurrentPage,
    showBook,
    setShowBook,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToChapter,
    startReading,
    backToCover
  };
};
