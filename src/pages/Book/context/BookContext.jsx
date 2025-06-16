import React, { createContext, useContext, useState } from 'react';
import { useBookActions } from '../hooks/useBookActions';

/**
 * Contexto para gerenciar o estado global do módulo Book
 * Centraliza todos os hooks e estados relacionados ao livro
 */
const BookContext = createContext();

/**
 * Provider do contexto do livro
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componentes filhos
 * @param {Object} props.initialData - Dados iniciais para o contexto
 */
export const BookProvider = ({ children, initialData = {} }) => {
  // Estado para armazenar dados do livro
  const [bookData, setBookData] = useState(initialData.bookContent || {});
  
  // Hooks personalizados - sem incluir handleDownload que agora é gerenciado aqui
  const { handleShare, handleReadOnline, shareStatus } = useBookActions({
    shareTitle: initialData.shareTitle,
    shareText: initialData.shareText,
    onSuccess: initialData.onSuccess,
    onError: initialData.onError,
    pdfUrl: initialData.pdfUrl
  });
  
  // Estado para erros globais
  const [globalError, setGlobalError] = useState(null);
  
  // Não precisamos mais da função handleDownload pois agora usamos o DownloadLink diretamente no componente
  

  
  // Manipulador global de erros
  const handleError = (error) => {
    console.error('Book error:', error);
    setGlobalError(error);
  };
  
  // Limpar erro global
  const clearError = () => setGlobalError(null);
  
  // Valor do contexto
  const contextValue = {
    bookData,
    globalError,
    
    // Ações agrupadas para manter a interface consistente
    actions: {
      handleShare,
      handleReadOnline,
      shareStatus
    },
    
    // Funções
    handleError,
    clearError
  };
  
  return (
    <BookContext.Provider value={contextValue}>
      {children}
    </BookContext.Provider>
  );
};

/**
 * Hook para usar o contexto do livro
 * @returns {Object} - Valor do contexto do livro
 */
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext deve ser usado dentro de um BookProvider');
  }
  return context;
};
