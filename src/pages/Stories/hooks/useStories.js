import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import storiesJson from '../data/stories.json';

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
  const loadStories = useCallback(() => {
    // Obter o idioma atual
    const currentLanguage = i18n.language || 'pt';
    
    // Mapear as histórias aplicando a tradução adequada
    const translatedStories = storiesJson.stories.map(story => {
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
    
    setStories(translatedStories);
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
   */
  const addStory = (newStory) => {
    // Na implementação atual, apenas adicionamos a história ao estado
    // Em uma implementação completa, enviaríamos para uma API e atualizaríamos o arquivo JSON
    
    // Adicionar a história na lista local
    const updatedStories = [newStory, ...stories];
    setStories(updatedStories);
    
    // Em um cenário real, aqui chamaríamos uma API para persistir os dados
    console.log('Nova história adicionada (temporariamente):', newStory);
    alert('História adicionada com sucesso! (Nota: Esta é uma demonstração, a história não será salva permanentemente)');
    
    // Para uma implementação completa, seria necessário:
    // 1. Enviar a história para uma API backend
    // 2. Atualizar o arquivo JSON local
    // 3. Recarregar as histórias do servidor
  };
  
  return {
    stories,
    selectedStory,
    openStoryModal,
    closeStoryModal,
    addStory
  };
};
