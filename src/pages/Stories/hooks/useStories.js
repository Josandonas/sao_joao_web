import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import storiesApiService from '../../../services/storiesApiService';

/**
 * Hook personalizado para gerenciar as histórias e o estado do modal
 * Suporta multilíngue, integração com API e manutenção dos dados estáticos
 * 
 * @returns {Object} Objeto contendo a lista de histórias, estados e funções para gerenciar histórias
 */
export const useStories = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'pt';
  
  // Estados principais
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isApiAvailable, setIsApiAvailable] = useState(true);
  
  /**
   * Verifica se a API está disponível
   */
  useEffect(() => {
    const checkApiAvailability = async () => {
      try {
        const available = await storiesApiService.isApiAvailable();
        setIsApiAvailable(available);
        console.log('[DEV] API disponível:', available);
      } catch (err) {
        console.error('[DEV] Erro ao verificar disponibilidade da API:', err);
        setIsApiAvailable(false);
      }
    };
    
    checkApiAvailability();
  }, []);
  
  /**
   * Carrega as histórias combinando dados estáticos e da API
   */
  const loadStories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Busca as histórias combinadas (estáticas + API)
      // Esta função já garante que os dados estáticos serão retornados mesmo se a API falhar
      const allStories = await storiesApiService.fetchStoriesFromApi(currentLanguage);
      console.log('[DEV] Histórias carregadas:', allStories.length);
      
      if (allStories && allStories.length > 0) {
        // Processa as histórias para o formato esperado pela UI
        const processedStories = allStories.map(story => ({
          ...story,
          title: story[currentLanguage]?.title || story.pt?.title || story.title,
          author: story[currentLanguage]?.author || story.pt?.author || story.author || '',
          excerpt: story[currentLanguage]?.excerpt || story.pt?.excerpt || story.excerpt || '',
          content: story[currentLanguage]?.content || story.pt?.content || story.content,
          // Marca a origem da história (estática ou API)
          source: story.source || 'api'
        }));
        
        setStories(processedStories);
      } else {
        console.warn('[DEV] Nenhuma história retornada');
        setStories([]);
      }
    } catch (err) {
      console.error('[DEV] Erro ao carregar histórias:', err);
      // Não exibimos o erro para o usuário final, apenas para desenvolvedores no console
      setError('Não foi possível carregar as histórias.');
    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage]);
  
  // Carregar histórias quando o componente montar ou o idioma mudar
  useEffect(() => {
    loadStories();
  }, [loadStories]);
  
  /**
   * Abre o modal com a história selecionada
   * @param {Object} story - Dados da história a ser exibida
   */
  const openStoryModal = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };
  
  /**
   * Fecha o modal da história
   */
  const closeStoryModal = () => {
    setIsModalOpen(false);
    // Pequeno atraso para a animação de fechamento completar antes de limpar os dados
    setTimeout(() => setSelectedStory(null), 300);
  };
  
  /**
   * Abre o formulário para adicionar nova história
   */
  const openAddStoryForm = () => {
    setIsFormOpen(true);
  };
  
  /**
   * Fecha o formulário de adicionar história
   */
  const closeAddStoryForm = () => {
    setIsFormOpen(false);
  };
  
  /**
   * Adiciona uma nova história
   * @param {Object} storyData - Dados da nova história
   * @returns {Promise<Object>} A história adicionada com ID gerado pela API
   */
  const addStory = async (storyData) => {
    try {
      if (!isApiAvailable) {
        throw new Error('A API não está disponível no momento. Tente novamente mais tarde.');
      }
      
      // Envia para a API
      const savedStory = await storiesApiService.createStory(storyData, currentLanguage);
      
      // Adiciona a nova história ao estado local com os campos traduzidos
      const newStory = {
        ...savedStory,
        title: savedStory[currentLanguage]?.title || savedStory.pt?.title || savedStory.title,
        author: savedStory[currentLanguage]?.author || savedStory.pt?.author || savedStory.author || '',
        excerpt: savedStory[currentLanguage]?.excerpt || savedStory.pt?.excerpt || savedStory.excerpt || '',
        content: savedStory[currentLanguage]?.content || savedStory.pt?.content || savedStory.content,
        source: 'api'
      };
      
      setStories(prevStories => [...prevStories, newStory]);
      console.log('Nova história adicionada com sucesso:', savedStory);
      return newStory;
    } catch (err) {
      console.error('Erro ao adicionar história:', err);
      throw err;
    }
  };
  
  /**
   * Atualiza uma história existente
   * @param {String} id - ID da história a ser atualizada
   * @param {Object} storyData - Novos dados da história
   */
  const updateStory = async (id, storyData) => {
    try {
      if (!isApiAvailable) {
        throw new Error('A API não está disponível no momento. Tente novamente mais tarde.');
      }
      
      // Verifica se a história existe e se é da API (não estática)
      const existingStory = stories.find(story => story.id === id);
      if (!existingStory) {
        throw new Error('História não encontrada.');
      }
      
      if (existingStory.source === 'static') {
        throw new Error('Não é possível editar histórias do arquivo estático.');
      }
      
      // Envia para a API
      const updatedStory = await storiesApiService.updateStory(id, storyData, currentLanguage);
      
      // Atualiza no estado local
      const processedStory = {
        ...updatedStory,
        title: updatedStory[currentLanguage]?.title || updatedStory.pt?.title || updatedStory.title,
        author: updatedStory[currentLanguage]?.author || updatedStory.pt?.author || updatedStory.author || '',
        excerpt: updatedStory[currentLanguage]?.excerpt || updatedStory.pt?.excerpt || updatedStory.excerpt || '',
        content: updatedStory[currentLanguage]?.content || updatedStory.pt?.content || updatedStory.content,
        source: 'api'
      };
      
      setStories(prevStories => 
        prevStories.map(story => story.id === id ? processedStory : story)
      );
      
      return processedStory;
    } catch (err) {
      console.error('Erro ao atualizar história:', err);
      throw err;
    }
  };
  
  /**
   * Remove uma história existente
   * @param {String} id - ID da história a ser removida
   */
  const removeStory = async (id) => {
    try {
      if (!isApiAvailable) {
        throw new Error('A API não está disponível no momento. Tente novamente mais tarde.');
      }
      
      // Verifica se a história existe e se é da API (não estática)
      const existingStory = stories.find(story => story.id === id);
      if (!existingStory) {
        throw new Error('História não encontrada.');
      }
      
      if (existingStory.source === 'static') {
        throw new Error('Não é possível remover histórias do arquivo estático.');
      }
      
      // Remove da API
      await storiesApiService.deleteStory(id);
      
      // Remove do estado local
      setStories(prevStories => prevStories.filter(story => story.id !== id));
      
      return true;
    } catch (err) {
      console.error('Erro ao remover história:', err);
      throw err;
    }
  };
  
  /**
   * Busca uma história específica por ID
   * @param {String} id - ID da história
   */
  const getStoryById = async (id) => {
    try {
      // Primeiro verifica no estado local
      const localStory = stories.find(story => story.id === id);
      if (localStory) {
        return localStory;
      }
      
      // Se não encontrou no estado local, busca na API
      const apiStory = await storiesApiService.getStoryById(id, currentLanguage);
      if (apiStory) {
        // Processa a história para o formato esperado pela UI
        return {
          ...apiStory,
          title: apiStory[currentLanguage]?.title || apiStory.pt?.title || apiStory.title,
          author: apiStory[currentLanguage]?.author || apiStory.pt?.author || apiStory.author || '',
          excerpt: apiStory[currentLanguage]?.excerpt || apiStory.pt?.excerpt || apiStory.excerpt || '',
          content: apiStory[currentLanguage]?.content || apiStory.pt?.content || apiStory.content,
          source: apiStory.source || 'api'
        };
      }
      
      return null;
    } catch (err) {
      console.error(`Erro ao buscar história ID ${id}:`, err);
      return null;
    }
  };
  
  return {
    stories,
    selectedStory,
    isLoading,
    error,
    isModalOpen,
    isFormOpen,
    isApiAvailable,
    openStoryModal,
    closeStoryModal,
    openAddStoryForm,
    closeAddStoryForm,
    addStory,
    updateStory,
    removeStory,
    getStoryById,
    loadStories,
    currentLanguage
  };
};
