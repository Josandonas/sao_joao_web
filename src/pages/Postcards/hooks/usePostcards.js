import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchPostcards, fetchBasePostcards, submitPostcard } from '../../../services/api/postcards';

const usePostcards = () => {
  const { i18n } = useTranslation();
  const [selectedPostcard, setSelectedPostcard] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Estado para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(15);
  
  // Estado para os postais
  const [postcards, setPostcards] = useState([]);
  const [basePostcards, setBasePostcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estado para o formulário de submissão
  const [formData, setFormData] = useState({
    image: null,
    description: '',
    location: '',
    author: '',
    year: new Date().getFullYear().toString()
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  // Gerar lista de anos para o dropdown (ano atual no topo)
  const currentYear = new Date().getFullYear();
  const yearsList = useMemo(() => {
    const years = [];
    for (let i = currentYear; i >= 1900; i--) {
      years.push(i.toString());
    }
    return years;
  }, [currentYear]);
  
  // Abrir modal com o postal selecionado
  const openPostcardModal = (postcard) => {
    setSelectedPostcard(postcard);
  };
  
  // Fechar o modal
  const closePostcardModal = () => {
    setSelectedPostcard(null);
  };
  
  // Função de compartilhamento usando Web Share API
  const sharePostcard = () => {
    if (selectedPostcard && navigator.share) {
      navigator.share({
        title: selectedPostcard.titleKey,
        text: `Confira este postal do Banho de São João: ${selectedPostcard.titleKey}`,
        url: window.location.href
      })
        .then(() => console.log('Postal compartilhado com sucesso'))
        .catch((error) => console.error('Erro ao compartilhar:', error));
    } else {
      // Fallback para navegadores que não suportam a Web Share API
      // Criamos um input temporário para copiar o link para a área de transferência
      const tempInput = document.createElement('input');
      const text = `${selectedPostcard.titleKey} - Postais do Banho de São João`;
      tempInput.value = window.location.href;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      
      alert('Link copiado para a área de transferência! Você pode compartilhar manualmente.');
    }
  };
  
  // Função de download real da imagem
  const downloadPostcard = () => {
    if (selectedPostcard) {
      // Cria um link temporário para download
      const link = document.createElement('a');
      const imageSrc = selectedPostcard.image;
      const filename = `postal-${selectedPostcard.id}-${selectedPostcard.titleKey.split('.').pop().toLowerCase().replace(/\s+/g, '-')}.jpg`;
      
      // Configura o link para download
      link.href = imageSrc;
      link.download = filename;
      link.target = '_blank';
      
      // Adiciona o link ao documento, clica nele e depois remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Limpar todos os filtros
  const clearFilters = () => {
    setActiveFilter('all');
  };
  
  // Carregar postais com paginação
  const loadPostcards = async (page = 1) => {
    setLoading(true);
    
    try {
      const result = await fetchPostcards({ 
        page, 
        limit: itemsPerPage, 
        lang: i18n.language 
      });
      
      // Verificar se o resultado é válido antes de acessar suas propriedades
      if (result && result.postcards && result.pagination) {
        setPostcards(result.postcards);
        setTotalPages(result.pagination.totalPages || 1);
        setTotalItems(result.pagination.totalItems || 0);
        setCurrentPage(page);
      } else {
        // Definir valores padrão quando a API não retornar dados válidos
        setPostcards([]);
        setTotalPages(1);
        setTotalItems(0);
        setCurrentPage(1);
        console.info('API não retornou dados válidos, usando valores padrão');
      }
    } catch (err) {
      console.error('Erro ao carregar postais:', err);
      // Não definir mensagem de erro na interface, apenas logar no console
      
      // Definir valores padrão quando ocorrer um erro
      setPostcards([]);
      setTotalPages(1);
      setTotalItems(0);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };
  
  // Carregar postais base/atuais (conjunto fixo)
  const loadBasePostcards = async () => {
    try {
      const baseCards = await fetchBasePostcards(i18n.language);
      // Verificar se o resultado é válido
      if (Array.isArray(baseCards)) {
        setBasePostcards(baseCards);
      } else {
        // Se não for um array válido, definir como array vazio
        setBasePostcards([]);
        console.info('API de postais base não retornou um array válido');
      }
    } catch (err) {
      console.error('Erro ao carregar postais base:', err);
      // Definir como array vazio em caso de erro
      setBasePostcards([]);
      // Não definimos erro na interface para não afetar a experiência do usuário
    }
  };
  
  // Efeito para carregar postais quando a página mudar ou o idioma mudar
  useEffect(() => {
    loadPostcards(currentPage);
    loadBasePostcards();
  }, [currentPage, i18n.language]);
  
  // Função para ir para a próxima página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  // Função para ir para a página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  // Função para ir para uma página específica
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Manipuladores do formulário de submissão
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
      
      // Limpar erro de validação quando o campo for preenchido
      if (formErrors[name]) {
        setFormErrors(prev => ({
          ...prev,
          [name]: null
        }));
      }
    } else if (name !== 'image') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Limpar erro de validação quando o campo for preenchido
      if (formErrors[name] && value.trim()) {
        setFormErrors(prev => ({
          ...prev,
          [name]: null
        }));
      }
    }
  };
  
  // Validar formulário
  const validateForm = () => {
    const errors = {};
    
    if (!formData.image) {
      errors.image = 'A imagem é obrigatória';
    }
    
    if (!formData.location.trim()) {
      errors.location = 'O local é obrigatório';
    }
    
    if (!formData.author.trim()) {
      errors.author = 'O autor é obrigatório';
    }
    
    if (!formData.year) {
      errors.year = 'O ano é obrigatório';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Enviar formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Resetar estados de submissão
    setSubmitSuccess(false);
    setSubmitError(null);
    
    // Validar formulário
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Criar FormData para envio multipart/form-data
      const data = new FormData();
      data.append('image', formData.image);
      data.append('description', formData.description);
      data.append('location', formData.location);
      data.append('author', formData.author);
      data.append('year', formData.year);
      data.append('lang', i18n.language);
      
      // Enviar para a API
      await submitPostcard(data);
      
      // Sucesso
      setSubmitSuccess(true);
      
      // Limpar formulário
      setFormData({
        image: null,
        description: '',
        location: '',
        author: '',
        year: new Date().getFullYear().toString()
      });
      
      // Recarregar postais para mostrar o novo postal
      loadPostcards(1); // Voltar para a primeira página para ver o novo postal
    } catch (err) {
      console.error('Erro ao enviar postal:', err);
      // Não definir mensagem de erro na interface, apenas logar no console
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Filtrar postais por categoria usando useMemo para memoização
  const filteredPostcards = useMemo(() => {
    // Garantir que postcards e basePostcards sejam arrays
    const safePostcards = Array.isArray(postcards) ? postcards : [];
    const safeBasePostcards = Array.isArray(basePostcards) ? basePostcards : [];
    
    // Combinar postais da API com os postais base
    const allPostcards = [...safePostcards, ...safeBasePostcards];
    
    // Remover duplicatas (caso algum postal base também esteja na API)
    const uniquePostcards = allPostcards.filter((postcard, index, self) =>
      index === self.findIndex(p => p && p.id === postcard.id)
    );
    
    return uniquePostcards.filter(postcard => {
      // Verificar se o postcard é válido
      if (!postcard) return false;
      
      // Filtro por categoria
      if (activeFilter !== 'all' && postcard.category !== activeFilter) {
        return false;
      }
      
      return true;
    });
  }, [postcards, basePostcards, activeFilter]);

  return {
    postcards: filteredPostcards,
    selectedPostcard,
    activeFilter,
    setActiveFilter,
    openPostcardModal,
    closePostcardModal,
    sharePostcard,
    downloadPostcard,
    clearFilters,
    // Paginação
    currentPage,
    totalPages,
    totalItems,
    loading,
    error,
    nextPage,
    prevPage,
    goToPage,
    // Formulário de submissão
    formData,
    formErrors,
    handleFormChange,
    handleSubmit,
    isSubmitting,
    submitSuccess,
    submitError,
    yearsList
  };
};

export default usePostcards;
