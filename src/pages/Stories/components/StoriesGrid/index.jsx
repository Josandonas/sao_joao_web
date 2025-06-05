import React from 'react';
import PropTypes from 'prop-types';
import StoryCard from '../StoryCard';
import { Grid } from './styles';

/**
 * Componente grid para exibir os cards de histórias
 * @param {Object} props - Props do componente
 * @param {Array} props.stories - Lista de histórias a serem exibidas
 * @param {Function} props.onStoryClick - Função chamada ao clicar em uma história
 */
const StoriesGrid = ({ stories, onStoryClick }) => {
  return (
    <Grid>
      {stories.map(story => (
        <StoryCard 
          key={story.id} 
          story={story} 
          onClick={onStoryClick} 
        />
      ))}
    </Grid>
  );
};

StoriesGrid.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  onStoryClick: PropTypes.func.isRequired,
};

export default StoriesGrid;
