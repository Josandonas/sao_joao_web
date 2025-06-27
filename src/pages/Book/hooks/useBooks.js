import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchBooks } from '../../../services/api/book';
import { bookContent } from '../data/bookContent';

/**
 * Hook para gerenciar a coleção de livros e seleção de ano
 * @param {Object} options - Opções do hook
 * @param {string} options.lang - Idioma atual (pt, en, es)
 * @returns {Object} - Estado e funções para gerenciar livros
 */
export const useBooks = (options = {}) => {
  const { i18n } = useTranslation();
  const lang = options.lang || i18n.language || 'pt';
  
  // Estado para armazenar a coleção de livros da API
  const [apiBooks, setApiBooks] = useState([]);
  
  // Estado para armazenar o livro legado (sempre disponível)
  const [legacyBook, setLegacyBook] = useState({
    id: 'legacy',
    year: 2012, // Ano do livro legado
    metadata: bookContent.metadata,
    pdfInfo: bookContent.pdfInfo,
    shareInfo: bookContent.shareInfo,
    isLegacy: true
  });
  
  // Estado para armazenar todos os livros (API + legado)
  const [allBooks, setAllBooks] = useState([legacyBook]);
  
  // Estado para armazenar o livro selecionado atualmente
  const [selectedBook, setSelectedBook] = useState(legacyBook);
  
  // Estado para controlar o carregamento
  const [loading, setLoading] = useState(false);
  
  // Estado para controlar erros
  const [error, setError] = useState(null);
  
  /**
   * Carrega os livros da API
   */
  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Buscar livros da API
      const booksFromApi = await fetchBooks(lang);
      
      // Processar os livros da API para garantir formato consistente
      const processedApiBooks = booksFromApi.map(book => ({
        ...book,
        isLegacy: false,
        // Garantir que o ano seja um número para ordenação
        year: typeof book.year === 'string' ? parseInt(book.year, 10) : book.year
      }));
      
      setApiBooks(processedApiBooks);
      
      // Combinar livros da API com o livro legado
      const combined = [legacyBook, ...processedApiBooks];
      
      // Ordenar por ano (decrescente)
      const sorted = combined.sort((a, b) => b.year - a.year);
      
      setAllBooks(sorted);
      
      // Selecionar o livro mais recente por padrão
      if (sorted.length > 0 && !selectedBook) {
        setSelectedBook(sorted[0]);
      }
    } catch (err) {
      console.error('Erro ao carregar livros:', err);
      setError(err);
      
      // Em caso de erro, garantir que pelo menos o livro legado esteja disponível
      setAllBooks([legacyBook]);
    } finally {
      setLoading(false);
    }
  }, [lang, legacyBook, selectedBook]);
  
  /**
   * Seleciona um livro pelo ano
   * @param {number} year - Ano do livro a ser selecionado
   * @returns {boolean} - Se o livro foi encontrado e selecionado
   */
  const selectBookByYear = useCallback((year) => {
    // Converter para número se for string
    const yearNum = typeof year === 'string' ? parseInt(year, 10) : year;
    
    // Buscar o livro pelo ano
    const book = allBooks.find(b => b.year === yearNum);
    
    if (book) {
      setSelectedBook(book);
      return true;
    }
    
    return false;
  }, [allBooks]);
  
  /**
   * Obtém o PDF do livro selecionado com base no idioma
   * @param {string} lang - Idioma (pt, en, es)
   * @returns {string} - URL do PDF
   */
  const getSelectedBookPdfUrl = useCallback((lang = 'pt') => {
    if (!selectedBook) return '';
    
    // Se o livro for legado, usar a estrutura do bookContent
    if (selectedBook.isLegacy) {
      return selectedBook.pdfInfo[lang]?.path || selectedBook.pdfInfo.pt.path;
    }
    
    // Se o livro da API tiver uma estrutura de PDF por idioma
    if (selectedBook.pdfInfo && typeof selectedBook.pdfInfo === 'object') {
      return selectedBook.pdfInfo[lang]?.path || 
             selectedBook.pdfInfo.pt?.path || 
             '';
    }
    
    // Se o livro da API tiver apenas um PDF único
    return selectedBook.pdfUrl || '';
  }, [selectedBook]);
  
  // Carregar livros quando o idioma mudar
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);
  
  return {
    allBooks,
    apiBooks,
    legacyBook,
    selectedBook,
    loading,
    error,
    selectBookByYear,
    getSelectedBookPdfUrl,
    loadBooks
  };
};

export default useBooks;
