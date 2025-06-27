import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Container } from './styles';
import StoriesHeader from './components/StoriesHeader';
import StoriesGrid from './components/StoriesGrid';
import StoryModal from './components/StoryModal';
import AddStoryForm from './components/AddStoryForm';
import { useStories } from './hooks/useStories';

/**
 * Componente principal da página de Histórias
 * Utiliza uma arquitetura modularizada com separação de responsabilidades
 * Integrado com API para buscar e salvar histórias, mantendo dados estáticos
 */
const Stories = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  
  // Usar o hook atualizado com todas as funcionalidades
  const { 
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
    currentLanguage,
    currentPage,
    totalPages,
    nextPage,
    prevPage
  } = useStories();
  
  // Função para salvar nova história
  const handleSaveStory = async (newStory) => {
    try {
      // Chamar a função de adicionar história do hook
      const savedStory = await addStory(newStory);
      
      // Log de sucesso apenas para desenvolvedores
      console.log('[DEV] História adicionada com sucesso:', savedStory);
      
      // Fechar o formulário após salvar com sucesso
      closeAddStoryForm();
      
      return savedStory;
    } catch (err) {
      console.error('[DEV] Erro ao salvar história:', err);
      throw err;
    }
  };
  
  // Nenhuma função de remoção necessária, pois o usuário apenas visualiza e envia histórias

  return (
    <Container>
      <StoriesHeader 
        onAddStoryClick={openAddStoryForm}
        isApiAvailable={isApiAvailable}
      />
      
      {/* Erros e informações são registrados apenas no console para desenvolvedores */}
      
      <StoriesGrid 
        stories={stories}
        onStoryClick={openStoryModal}
        isLoading={isLoading}
        currentLanguage={currentLanguage}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={nextPage}
        onPrevPage={prevPage}
        showPagination={isApiAvailable && totalPages > 1}
      />
      
      {isModalOpen && selectedStory && (
        <StoryModal 
          story={selectedStory}
          onClose={closeStoryModal}
          currentLanguage={currentLanguage}
        />
      )}
      
      {isFormOpen && (
        <AddStoryForm
          onClose={closeAddStoryForm}
          onSave={handleSaveStory}
          currentLanguage={currentLanguage}
        />
      )}
    </Container>
  );
};

export default Stories;
