import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
import {
  PaginationContainer,
  PaginationButton,
  PageInfo,
  PageNumber,
  PageEllipsis,
  LoadingIndicator,
  ErrorMessage
} from './styles';

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  loading,
  error,
  onPageChange
}) => {
  const { t } = useTranslation();
  
  // Se estiver carregando, mostrar indicador de carregamento
  if (loading) {
    return (
      <LoadingIndicator>
        <FaSpinner size={16} />
        {t('postcards.pagination.loading')}
      </LoadingIndicator>
    );
  }
  
  // Se houver erro, não mostrar nada na interface (erros são apenas logados no console)
  if (error) {
    return null;
  }
  
  // Se não houver páginas, não mostrar paginação
  if (totalPages <= 1) {
    return null;
  }
  
  // Função para gerar os números de página
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Número máximo de botões de página para mostrar
    
    // Caso 1: Poucas páginas (mostrar todas)
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } 
    // Caso 2: Muitas páginas (mostrar algumas com elipses)
    else {
      // Sempre mostrar a primeira página
      pageNumbers.push(1);
      
      // Calcular o intervalo de páginas a mostrar
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Ajustar para mostrar sempre 3 páginas no meio
      if (startPage === 2) {
        endPage = Math.min(totalPages - 1, 4);
      }
      if (endPage === totalPages - 1) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      // Adicionar elipse antes do intervalo se necessário
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Adicionar o intervalo de páginas
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Adicionar elipse depois do intervalo se necessário
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Sempre mostrar a última página
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <PaginationContainer>
      <PaginationButton 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft size={12} /> {t('postcards.pagination.previous')}
      </PaginationButton>
      
      {pageNumbers.map((page, index) => (
        page === '...' ? (
          <PageEllipsis key={`ellipsis-${index}`}>...</PageEllipsis>
        ) : (
          <PageNumber
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageNumber>
        )
      ))}
      
      <PaginationButton 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {t('postcards.pagination.next')} <FaChevronRight size={12} />
      </PaginationButton>
      
      <PageInfo>
        {t('postcards.pagination.pageInfo', { 
          current: currentPage, 
          total: totalPages,
          items: totalItems
        })}
      </PageInfo>
    </PaginationContainer>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
