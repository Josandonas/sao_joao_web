import React from 'react';
import PropTypes from 'prop-types';
import StoryCard from '../StoryCard';
import { Grid, LoadingContainer } from './styles';

/**
 * Componente grid para exibir os cards de histórias
 * @param {Object} props - Props do componente
 * @param {Array} props.stories - Lista de histórias a serem exibidas
 * @param {Function} props.onStoryClick - Função chamada ao clicar em uma história
 * @param {Boolean} props.isLoading - Indica se as histórias estão sendo carregadas
 * @param {String} props.currentLanguage - Idioma atual (pt, en, es)
 */
const StoriesGrid = ({ 
  stories, 
  onStoryClick, 
  isLoading = false,
  currentLanguage = 'pt'
}) => {
  if (isLoading) {
    return (
      <LoadingContainer>
        <div className="loading-spinner"></div>
      </LoadingContainer>
    );
  }

  return (
    <Grid>
      {stories && stories.length > 0 ? stories.map(story => (
        <StoryCard 
          key={story.id} 
          story={story} 
          onClick={onStoryClick}
          currentLanguage={currentLanguage}
        />
      )) : (
        <div className="no-stories">
          <p>Nenhuma história encontrada.</p>
        </div>
      )}
    </Grid>
  );
};

StoriesGrid.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string,
      content: PropTypes.string.isRequired,
      source: PropTypes.string,
      author: PropTypes.string
    })
  ),
  onStoryClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  currentLanguage: PropTypes.string
};

export default StoriesGrid;
