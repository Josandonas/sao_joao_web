import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import storiesJson from '../data/stories.json';
import { fetchStoriesFromApi, createStory } from '../../../services/storiesApiService';

/**
 * Hook personalizado para gerenciar as histórias e o estado do modal
 * Suporta multilíngue e conteúdo de texto limpo
 * 
 * @returns {Object} Objeto contendo a lista de histórias, a história selecionada, funções para abrir e fechar o modal
 */
export const useStories = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const { i18n } = useTranslation();
  
  // Função para carregar histórias com base no idioma atual
  const loadStories = useCallback(async () => {
    // Obter o idioma atual
    const currentLanguage = i18n.language || 'pt';
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Tentar buscar histórias da API
      let apiStories = [];
      try {
        apiStories = await fetchStoriesFromApi();
      } catch (apiError) {
        console.warn('Erro ao buscar histórias da API, usando dados estáticos como fallback', apiError);
      }
      
      // Se não conseguiu dados da API, usar dados estáticos como fallback
      const storiesData = apiStories.length > 0 ? apiStories : storiesJson.stories;
      
      // Processar histórias conforme o formato (API ou estático)
      const translatedStories = storiesData.map(story => {
        // Para histórias da API (já têm campos por idioma)
        if (story.pt && story.en && story.es) {
          return {
            ...story,
            title: story[currentLanguage]?.title || story.pt.title,
            content: story[currentLanguage]?.content || story.pt.content,
            excerpt: story[currentLanguage]?.excerpt || story.pt.excerpt,
            autor: story[currentLanguage]?.author || story.pt.author
          };
        }
        
        // Para histórias do formato estático
        const translatedStory = { ...story };
        
        // Se o idioma não for português e existir tradução, aplicar
        if (currentLanguage !== 'pt' && story.translations && story.translations[currentLanguage]) {
          const translation = story.translations[currentLanguage];
          
          // Aplicar campos traduzidos, mantendo os campos em português como fallback
          translatedStory.title = translation.title || story.title;
          translatedStory.content = translation.content || story.content;
          translatedStory.excerpt = translation.excerpt || story.excerpt;
          translatedStory.autor = translation.autor || story.autor;
        }
        
        return translatedStory;
      });
      
      setStories(translatedStories);
    } catch (err) {
      console.error('Erro ao carregar histórias:', err);
      setError('Erro ao carregar histórias. Por favor, tente novamente mais tarde.');
      
      // Em caso de erro, tentar usar os dados estáticos como último recurso
      const staticStories = storiesJson.stories.map(story => {
        // Iniciar com os dados em português como fallback
        const translatedStory = { ...story };
        
        // Se o idioma não for português e existir tradução, aplicar
        if (currentLanguage !== 'pt' && story.translations && story.translations[currentLanguage]) {
          const translation = story.translations[currentLanguage];
          
          // Aplicar campos traduzidos, mantendo os campos em português como fallback
          translatedStory.title = translation.title || story.title;
          translatedStory.content = translation.content || story.content;
          translatedStory.excerpt = translation.excerpt || story.excerpt;
          translatedStory.autor = translation.autor || story.autor;
        }
        
        return translatedStory;
      });
      
      setStories(staticStories);
    } finally {
      setIsLoading(false);
    }
  }, [i18n.language]);
  
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
  };
  
  /**
   * Fecha o modal da história
   */
  const closeStoryModal = () => {
    setSelectedStory(null);
  };
  
  /**
   * Adiciona uma nova história
   * @param {Object} newStory - Dados da nova história
   * @returns {Promise<Object>} A história adicionada com ID gerado pela API
   */
  const addStory = async (newStory) => {
    try {
      // Enviar a história para a API
      const savedStory = await createStory(newStory);
      
      // Processar a história salva para o formato de exibição
      const currentLanguage = i18n.language || 'pt';
      const processedStory = {
        ...savedStory,
        title: savedStory[currentLanguage]?.title || savedStory.pt.title,
        content: savedStory[currentLanguage]?.content || savedStory.pt.content,
        excerpt: savedStory[currentLanguage]?.excerpt || savedStory.pt.excerpt,
        autor: savedStory[currentLanguage]?.author || savedStory.pt.author
      };
      
      // Adicionar a história na lista local
      setStories(prevStories => [processedStory, ...prevStories]);
      
      console.log('Nova história adicionada com sucesso:', savedStory);
      return savedStory;
    } catch (error) {
      console.error('Erro ao adicionar história:', error);
      throw error;
    }
  };
  
  return {
    stories,
    selectedStory,
    openStoryModal,
    closeStoryModal,
    addStory,
    loadStories
  };
};
