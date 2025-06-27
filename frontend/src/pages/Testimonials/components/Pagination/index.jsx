import React from 'react';
import { useTranslation } from 'react-i18next';
import { PaginationContainer, PaginationButton, PageInfo } from './styles';

/**
 * Componente de paginação para navegar entre páginas de depoimentos
 * @param {number} currentPage - Página atual
 * @param {number} totalPages - Total de páginas
 * @param {Function} onPageChange - Função chamada quando a página é alterada
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'pt';
  
  // Debug para verificar o idioma atual
  console.log(`[DEBUG] Pagination - Idioma atual: ${currentLang}`);
  console.log(`[DEBUG] Pagination - Página atual: ${currentPage}, Total de páginas: ${totalPages}`);
  
  // Se houver apenas uma página, não exibe a paginação
  if (totalPages <= 1) {
    return null;
  }
  
  // Gera array com números de página para exibir
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Número máximo de botões de página visíveis
    
    if (totalPages <= maxVisiblePages) {
      // Se o total de páginas for menor que o máximo visível, mostra todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Sempre inclui a primeira página
      pageNumbers.push(1);
      
      // Calcula o intervalo de páginas a serem exibidas
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Ajusta para mostrar sempre 3 páginas no meio (ou mais se estiver próximo das bordas)
      if (currentPage <= 3) {
        endPage = Math.min(4, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      // Adiciona elipses se necessário
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Adiciona as páginas do meio
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Adiciona elipses se necessário
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Sempre inclui a última página
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };
  
  return (
    <PaginationContainer>
      {/* Botão Anterior */}
      <PaginationButton 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={t('pagination.previous', 'Página anterior')}
      >
        {t('pagination.previousSymbol', '«')}
      </PaginationButton>
      
      {/* Números de página */}
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <PageInfo key={`ellipsis-${index}`}>...</PageInfo>
        ) : (
          <PaginationButton
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? 'active' : ''}
            aria-label={t('pagination.page', 'Página {{page}}', { page })}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </PaginationButton>
        )
      ))}
      
      {/* Botão Próximo */}
      <PaginationButton 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={t('pagination.next', 'Próxima página')}
      >
        {t('pagination.nextSymbol', '»')}
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
