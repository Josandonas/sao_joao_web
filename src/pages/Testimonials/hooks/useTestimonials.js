import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { testimonialsService, isApiAvailable } from '../../../services';

/**
 * Hook para gerenciar depoimentos, categorias e formulário de envio
 * @returns {Object} Objeto contendo os depoimentos, categorias e funções para manipulá-los
 */
export const useTestimonials = () => {
  const { lang: urlLang } = useParams();
  const { i18n, t } = useTranslation();
  
  // Usar o idioma do i18n se disponível, caso contrário usar o parâmetro da URL
  const lang = i18n.language || urlLang || 'pt';
  
  // Log para debug do idioma atual
  console.log(`[DEBUG] Hook: Idioma atual - URL: ${urlLang}, i18n: ${i18n.language}, usado: ${lang}`);
  
  const [testimonials, setTestimonials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Exibe 20 itens por página
  const [paginatedTestimonials, setPaginatedTestimonials] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Estado para controlar se a API está disponível
  const [apiStatus, setApiStatus] = useState({
    checked: false,
    available: false
  });

  // Função para verificar disponibilidade da API
  const checkApiAvailability = useCallback(async () => {
    try {
      const available = await isApiAvailable();
      setApiStatus({
        checked: true,
        available
      });
      return available;
    } catch (err) {
      console.error('Erro ao verificar disponibilidade da API:', err);
      setApiStatus({
        checked: true,
        available: false
      });
      return false;
    }
  }, []);

  // Função para paginar os depoimentos
  const paginateTestimonials = useCallback((data, page = 1) => {
    const totalItems = data.length;
    const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Calcula os índices de início e fim para a página atual
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    
    // Obtém os itens para a página atual
    const itemsForCurrentPage = data.slice(startIndex, endIndex);
    
    console.log(`[DEBUG] Paginação: Página ${page}/${calculatedTotalPages}, Itens ${startIndex+1}-${endIndex} de ${totalItems}`);
    
    // Atualiza os estados
    setPaginatedTestimonials(itemsForCurrentPage);
    setTotalPages(calculatedTotalPages);
    setCurrentPage(page);
    
    return itemsForCurrentPage;
  }, [itemsPerPage]);
  
  // Função para mudar de página
  const changePage = useCallback((page) => {
    if (page < 1 || page > totalPages) return;
    
    setCurrentPage(page);
    // Usa o estado atual de filteredTestimonials diretamente
    paginateTestimonials(filteredTestimonials, page);
  }, [paginateTestimonials, totalPages]);
  
  // Função para buscar depoimentos da API e combinar com dados estáticos
  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    
    try {
      console.log('[DEBUG] Hook: Buscando todos os depoimentos');
      // Busca os depoimentos (função já combina dados estáticos + API)
      const data = await testimonialsService.fetchTestimonials(lang);
      console.log(`[DEBUG] Hook: Recebidos ${data.length} depoimentos`);
      
      // Os dados já estão normalizados pelo serviço, mas vamos garantir que todos os campos necessários estejam presentes
      const validatedData = data.map(item => ({
        id: item.id,
        name: item.name || '',
        text: item.text || item.quote || '',
        location: item.location || '',
        videoUrl: item.videoUrl || '',
        videos: item.videos || null,
        imageUrl: item.imageUrl || item.image || '',
        category: item.category || 'all',
        featured: item.featured || false,
        status: item.status || 'approved',
        currentLang: item.currentLang || lang
      }));
      
      setTestimonials(validatedData);
      setFilteredTestimonials(validatedData);
      
      // Aplica paginação aos dados diretamente em vez de chamar paginateTestimonials
      const totalItems = validatedData.length;
      const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
      const itemsForCurrentPage = validatedData.slice(0, itemsPerPage);
      
      setPaginatedTestimonials(itemsForCurrentPage);
      setTotalPages(calculatedTotalPages);
      setCurrentPage(1);
      
      // Se já existe uma categoria selecionada, filtra novamente
      if (selectedCategory && selectedCategory !== 'all') {
        filterByCategory(selectedCategory);
      }
    } catch (err) {
      console.error('Erro ao buscar depoimentos:', err);
      // Erro exibido apenas no console
      setPaginatedTestimonials([]);
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setIsLoading(false);
    }
  }, [lang, selectedCategory, itemsPerPage]);
  
  // Função para buscar categorias da API e combinar com dados estáticos
  const fetchCategories = useCallback(async () => {
    try {
      console.log('[DEBUG] Hook: Buscando categorias de depoimentos');
      
      // Busca as categorias (função já combina dados estáticos + API)
      const data = await testimonialsService.fetchTestimonialCategories(lang);
      console.log(`[DEBUG] Hook: Recebidas ${data.length} categorias`);
      
      // Log das categorias para debug
      data.forEach(cat => {
        console.log(`[DEBUG] Categoria: id=${cat.id}, label=${cat.label}`);
      });
      
      // Garante que sempre temos a categoria 'all' no início
      const allCategoryExists = data.some(cat => cat.id === 'all');
      
      if (!allCategoryExists) {
        // Adiciona a categoria 'all' se não existir
        const allCategory = {
          id: 'all',
          label: 'Todos',
          labelEn: 'All',
          labelEs: 'Todos'
        };
        
        data.unshift(allCategory);
      }
      
      setCategories(data);
      
      // Define a categoria inicial como 'all' se nenhuma estiver selecionada
      if (!selectedCategory) {
        setSelectedCategory('all');
      }
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
      // Não definimos erro aqui para não afetar a experiência do usuário
      // Se as categorias falharem, ainda podemos mostrar os depoimentos
    }
  }, [lang, selectedCategory]);
  

  
  // Função para filtrar depoimentos por categoria
  const filterByCategory = useCallback(async (category) => {
    setSelectedCategory(category);
    setIsLoading(true);
    
    try {
      console.log(`[DEBUG] Hook: Filtrando depoimentos por categoria: ${category}`);
      
      // Usa o serviço para buscar depoimentos filtrados por categoria
      // Em vez de filtrar localmente, isso garante que usamos a lógica correta de fallback
      const filteredData = await testimonialsService.fetchTestimonialsByCategory(category, lang);
      console.log(`[DEBUG] Hook: Depoimentos filtrados recebidos: ${filteredData.length}`);
      
      setFilteredTestimonials(filteredData);
      
      // Reseta para a primeira página quando mudar a categoria
      setCurrentPage(1);
      paginateTestimonials(filteredData, 1);
    } catch (err) {
      console.error(`Erro ao filtrar depoimentos por categoria ${category}:`, err);
      // Em caso de erro, mantém os depoimentos atuais ou mostra todos
      if (category === 'all') {
        setFilteredTestimonials(testimonials);
        paginateTestimonials(testimonials, 1);
      }
    } finally {
      setIsLoading(false);
    }
  }, [lang, testimonials, paginateTestimonials]);
  
  // Função para enviar um novo depoimento
  const submitNewTestimonial = useCallback(async (formData) => {
    try {
      // Verifica se a API está disponível
      const available = await checkApiAvailability();
      
      if (!available) {
        const errorMsg = t('testimonials.apiUnavailable', 'API não está disponível no momento. Tente novamente mais tarde.');
        console.warn(errorMsg);
        setError(errorMsg);
        return false;
      }
      
      await testimonialsService.submitTestimonial(formData, lang);
      
      // Recarregar depoimentos após envio bem-sucedido
      fetchTestimonials();
      setError(null); // Limpa qualquer erro anterior
      return true;
    } catch (err) {
      console.error('Erro ao enviar depoimento:', err);
      const errorMsg = t('testimonials.errorSubmitting', 'Erro ao enviar depoimento. Tente novamente mais tarde.');
      setError(errorMsg);
      return false;
    }
  }, [fetchTestimonials, lang, checkApiAvailability, t, setError]);
  
  // Efeito principal para carregar dados quando o componente monta ou quando o idioma muda
  useEffect(() => {
    const fetchData = async () => {
      console.log(`[DEBUG] Hook: Carregando dados para idioma ${lang}`);
      setIsLoading(true);
      setError(null); // Limpa erros anteriores
      
      try {
        // Verificar disponibilidade da API
        const isApiAvailable = await checkApiAvailability();
        setApiAvailable(isApiAvailable);
        
        // Buscar categorias
        console.log(`[DEBUG] Hook: Buscando categorias para idioma ${lang}`);
        const categoriesData = await fetchCategories(lang);
        setCategories(categoriesData);
        
        // Buscar depoimentos
        console.log(`[DEBUG] Hook: Buscando depoimentos para idioma ${lang}`);
        const testimonialsData = await fetchTestimonials();
        console.log(`[DEBUG] Hook: ${testimonialsData.length} depoimentos encontrados`);
        
        // Verifica se os depoimentos têm o idioma correto
        if (testimonialsData.length > 0) {
          console.log(`[DEBUG] Hook: Exemplo de depoimento:`, {
            id: testimonialsData[0].id,
            text: testimonialsData[0].text?.substring(0, 30) + '...',
            currentLang: testimonialsData[0].currentLang || 'não definido'
          });
        }
        
        setTestimonials(testimonialsData);
        
        // Resetar filtros e paginação quando o idioma mudar
        setFilteredTestimonials(testimonialsData);
        setSelectedCategory('all');
        setCurrentPage(1); // Garante que voltamos para a primeira página
        paginateTestimonials(testimonialsData, 1);
        
        console.log(`[DEBUG] Hook: Dados carregados com sucesso para idioma ${lang}`);
      } catch (error) {
        console.error(`[ERROR] Hook: Erro ao carregar dados para idioma ${lang}:`, error);
        // Usar t() para traduzir mensagens de erro
        const errorMessage = t('testimonials.errorLoading', 'Não foi possível carregar os depoimentos. Tente novamente mais tarde.');
        console.error(errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [lang, t, checkApiAvailability, fetchCategories, fetchTestimonials, paginateTestimonials]);
  
  return {
    testimonials: paginatedTestimonials, // Agora retorna os depoimentos paginados
    allTestimonials: testimonials,
    filteredTestimonials, // Adicionado para acesso aos dados completos filtrados
    categories,
    selectedCategory,
    isLoading,
    apiAvailable: apiStatus.available,
    error,
    // Informações de paginação
    currentPage,
    totalPages,
    itemsPerPage,
    // Funções
    filterByCategory,
    submitNewTestimonial,
    changePage
  };
};

export default useTestimonials;
