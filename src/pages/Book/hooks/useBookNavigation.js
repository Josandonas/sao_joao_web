import { useState, useEffect } from 'react';

/**
 * Hook para gerenciar a navegação do livro
 * @param {Object} bookContent - Objeto com o conteúdo do livro e metadados
 * @returns {Object} - Funções e estado para navegação
 */
export const useBookNavigation = (bookContent) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showBook, setShowBook] = useState(false);
  
  // Usar o valor de totalPages passado pelo componente pai
  const totalPages = bookContent.totalPages || 184; // Valor padrão caso não seja fornecido
  
  // Função para ir para a próxima página (avançando 2 páginas por vez, exceto para capa e contracapa)
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      // Se estiver na capa (página 0), vai direto para a página 2 (pulando a página 1)
      if (currentPage === 0) {
        setCurrentPage(2);
      } 
      // Se estiver na penúltima página, vai para a última
      else if (currentPage === totalPages - 2) {
        setCurrentPage(totalPages - 1);
      }
      // Caso contrário, avança 2 páginas para manter o padrão de páginas duplas
      else {
        // Garantir que sempre avançamos para uma página par
        const nextPageIndex = currentPage % 2 === 0 ? currentPage + 2 : currentPage + 1;
        setCurrentPage(Math.min(nextPageIndex, totalPages - 1));
      }
    }
  };

  // Função para ir para a página anterior (retrocedendo 2 páginas por vez, exceto para capa e contracapa)
  const goToPrevPage = () => {
    if (currentPage > 0) {
      // Se estiver na última página (contracapa), vai para a penúltima ou antepenultima (dependendo da paridade)
      if (currentPage === totalPages - 1) {
        const prevPageIndex = (totalPages - 2) % 2 === 0 ? totalPages - 3 : totalPages - 2;
        setCurrentPage(Math.max(prevPageIndex, 2)); // Garante que não volta para a página 1
      }
      // Se estiver na página 2, vai direto para a capa (página 0)
      // A página 1 não deve ser exibida isoladamente
      else if (currentPage === 2 || currentPage === 1) {
        setCurrentPage(0);
      }
      // Caso contrário, retrocede 2 páginas para manter o padrão de páginas duplas
      else {
        // Garantir que sempre voltamos para uma página par
        const prevPageIndex = currentPage % 2 === 0 ? currentPage - 2 : currentPage - 1;
        setCurrentPage(Math.max(prevPageIndex, 2)); // Garante que não volta para a página 1
      }
    }
  };
  
  // Navegar para um capítulo específico
  const goToChapter = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  
  // Iniciar a leitura do livro - agora inicia na página 2 (pulando a capa e a página 1)
  const startReading = () => {
    // Atualiza o estado para mostrar o livro em vez da capa
    setShowBook(true);
    
    // Define a página inicial como 2 (pulando a capa que é a página 0 e a página 1)
    setCurrentPage(2);
    
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
