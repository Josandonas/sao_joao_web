import React, { createContext, useContext, useState, useEffect } from 'react';
import { useBookActions } from '../hooks/useBookActions';
import { useBooks } from '../hooks/useBooks';

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
 * @param {string} props.lang - Idioma atual (pt, en, es)
 */
export const BookProvider = ({ children, initialData = {}, lang = 'pt' }) => {
  // Estado para armazenar dados do livro
  const [bookData, setBookData] = useState(initialData.bookContent || {});
  
  // Hook para gerenciar a coleção de livros e seleção de ano
  const { 
    allBooks,
    selectedBook,
    loading: booksLoading,
    error: booksError,
    selectBookByYear,
    getSelectedBookPdfUrl
  } = useBooks({ lang });
  
  // Atualizar o pdfUrl com base no livro selecionado
  const currentPdfUrl = getSelectedBookPdfUrl(lang);
  
  // Hooks personalizados para ações do livro
  const { handleShare, handleReadOnline, shareStatus } = useBookActions({
    shareTitle: selectedBook?.shareInfo?.title || initialData.shareTitle,
    shareText: selectedBook?.shareInfo?.text || initialData.shareText,
    onSuccess: initialData.onSuccess,
    onError: initialData.onError,
    pdfUrl: currentPdfUrl || initialData.pdfUrl
  });
  
  // Estado para erros globais
  const [globalError, setGlobalError] = useState(null);
  
  // Atualizar bookData quando o livro selecionado mudar
  useEffect(() => {
    if (selectedBook) {
      setBookData({
        metadata: selectedBook.metadata || {},
        pdfInfo: selectedBook.pdfInfo || {},
        shareInfo: selectedBook.shareInfo || {}
      });
    }
  }, [selectedBook]);
  
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
    
    // Dados dos livros
    books: {
      allBooks,
      selectedBook,
      loading: booksLoading,
      error: booksError,
      selectBookByYear,
      getSelectedBookPdfUrl
    },
    
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
