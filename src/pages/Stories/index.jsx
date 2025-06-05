import React, { useState } from 'react';
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
 */
const Stories = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const { stories, selectedStory, openStoryModal, closeStoryModal, addStory } = useStories();
  const [showAddStoryForm, setShowAddStoryForm] = useState(false);
  
  // Função para abrir o formulário de adição de histórias
  const handleOpenAddStoryForm = () => {
    setShowAddStoryForm(true);
  };
  
  // Função para fechar o formulário de adição de histórias
  const handleCloseAddStoryForm = () => {
    setShowAddStoryForm(false);
  };
  
  // Função para salvar nova história
  const handleSaveStory = (newStory) => {
    addStory(newStory);
    handleCloseAddStoryForm();
  };

  return (
    <Container>
      <StoriesHeader 
        onAddStoryClick={handleOpenAddStoryForm}
      />
      
      <StoriesGrid 
        stories={stories}
        onStoryClick={openStoryModal}
      />
      
      {selectedStory && (
        <StoryModal 
          story={selectedStory}
          onClose={closeStoryModal}
        />
      )}
      
      {showAddStoryForm && (
        <AddStoryForm
          onClose={handleCloseAddStoryForm}
          onSave={handleSaveStory}
          currentLanguage={lang || 'pt'}
        />
      )}
    </Container>
  );
};

export default Stories;
