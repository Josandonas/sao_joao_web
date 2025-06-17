import React, { useState, useEffect } from 'react';
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
 * Integrado com API para buscar e salvar histórias
 */
const Stories = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const { stories, selectedStory, openStoryModal, closeStoryModal, addStory, loadStories } = useStories();
  const [showAddStoryForm, setShowAddStoryForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Recarregar histórias quando o idioma mudar
  useEffect(() => {
    loadStories();
  }, [lang, loadStories]);
  
  // Função para abrir o formulário de adição de histórias
  const handleOpenAddStoryForm = () => {
    setShowAddStoryForm(true);
  };
  
  // Função para fechar o formulário de adição de histórias
  const handleCloseAddStoryForm = () => {
    setShowAddStoryForm(false);
  };
  
  // Função para salvar nova história
  const handleSaveStory = async (newStory) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Chamar a função de adicionar história do hook
      const savedStory = await addStory(newStory);
      
      // Exibir mensagem de sucesso
      alert(t('stories.addSuccess', 'História adicionada com sucesso!'));
      
      return savedStory;
    } catch (err) {
      console.error('Erro ao salvar história:', err);
      setError(err.message || 'Erro ao salvar história. Tente novamente mais tarde.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <StoriesHeader 
        onAddStoryClick={handleOpenAddStoryForm}
      />
      
      {error && (
        <div style={{ color: 'red', padding: '15px', textAlign: 'center', margin: '20px 0' }}>
          {error}
          <button 
            onClick={() => {
              setError(null);
              loadStories();
            }}
            style={{ marginLeft: '10px', padding: '5px 10px' }}
          >
            Tentar novamente
          </button>
        </div>
      )}
      
      <StoriesGrid 
        stories={stories}
        onStoryClick={openStoryModal}
        isLoading={isLoading}
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
