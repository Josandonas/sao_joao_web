import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import bibliotecaData from '../data/bibliotecaData';
import { fetchBibliotecaItems, fetchBibliotecaItemsByCategory } from '../../../services/api/biblioteca';

// Constantes
const ITEMS_PER_PAGE = 6;
const DEFAULT_CATEGORY = 'all';
const DEFAULT_PAGE = 1;

/**
 * Traduz um item estático para o idioma atual
 * @param {Object} item - Item a ser traduzido
 * @param {string} currentLang - Idioma atual
 * @returns {Object} - Item traduzido
 */
const translateStaticItem = (item, currentLang) => {
  const fallbackLang = 'pt';
  const translations = item.translations || {};
  const langData = translations[currentLang] || translations[fallbackLang] || {};
  
  return {
    ...item,
    title: langData.title || '',
    description: langData.description || '',
    additionalInfo: langData.additionalInfo || '',
    isStatic: true // Marcar como item estático para identificação
  };
};

/**
 * Hook personalizado para gerenciar os itens da biblioteca com paginação
 * @returns {Object} - Objeto com os itens, funções para manipulá-los e controles de paginação
 */
export const useBibliotecaItems = () => {
  const { i18n } = useTranslation();
  const [staticItems, setStaticItems] = useState([]);
  const [apiItems, setApiItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(DEFAULT_CATEGORY);
  
  /**
   * Processa os itens estáticos com base no idioma atual
   */
  const processStaticItems = useCallback(() => {
    const currentLang = i18n.language;
    return bibliotecaData.map(item => translateStaticItem(item, currentLang));
  }, [i18n.language]);
  
  /**
   * Atualiza os itens estáticos quando o idioma muda
   */
  useEffect(() => {
    setStaticItems(processStaticItems());
  }, [processStaticItems]);
  
  /**
   * Carrega itens da API com paginação
   */
  const loadApiItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchParams = {
        lang: i18n.language,
        page: currentPage,
        limit: ITEMS_PER_PAGE
      };
      
      const response = currentCategory === DEFAULT_CATEGORY
        ? await fetchBibliotecaItems(fetchParams)
        : await fetchBibliotecaItemsByCategory(currentCategory, fetchParams);
      
      setApiItems(response.items || []);
      setTotalPages(response.pagination?.totalPages || 1);
      setTotalItems(response.pagination?.total || 0);
      setError(null); // Limpa qualquer erro anterior
    } catch (err) {
      // Registra detalhes do erro no console para desenvolvedores
      console.error('Erro ao carregar itens da biblioteca:', err);
      console.error('Detalhes do erro:', {
        mensagem: err.message,
        código: err.code,
        stack: err.stack,
        endpoint: currentCategory === DEFAULT_CATEGORY ? 'fetchBibliotecaItems' : 'fetchBibliotecaItemsByCategory',
        parâmetros: {
          categoria: currentCategory,
          página: currentPage,
          idioma: i18n.language
        }
      });
      
      // Define um estado de erro interno sem exibir mensagem para o usuário
      setError('API_ERROR');
      setApiItems([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentCategory, i18n.language]);
  
  /**
   * Carrega itens da API quando a página, categoria ou idioma mudam
   */
  useEffect(() => {
    loadApiItems();
  }, [loadApiItems]);
  
  /**
   * Filtra os itens estáticos por categoria
   */
  const filterStaticItemsByCategory = useCallback((category) => {
    if (category === DEFAULT_CATEGORY) return staticItems;
    return staticItems.filter(item => item.category === category);
  }, [staticItems]);
  
  /**
   * Combina itens estáticos e da API
   */
  const getCombinedItems = useCallback(() => {
    // Se estiver na primeira página, incluir os itens estáticos no início
    if (currentPage === DEFAULT_PAGE) {
      const filteredStaticItems = filterStaticItemsByCategory(currentCategory);
      return [...filteredStaticItems, ...apiItems];
    }
    
    // Nas outras páginas, mostrar apenas os itens da API
    return apiItems;
  }, [currentPage, apiItems, currentCategory, filterStaticItemsByCategory]);
  
  /**
   * Navega para uma página específica
   */
  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);
  
  /**
   * Filtra itens por categoria
   */
  const filterByCategory = useCallback((category) => {
    setCurrentCategory(category);
    setCurrentPage(DEFAULT_PAGE); // Voltar para a primeira página ao mudar de categoria
  }, []);
  
  return {
    items: getCombinedItems(),
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    currentCategory,
    goToPage,
    filterByCategory,
    refreshItems: loadApiItems
  };
};
