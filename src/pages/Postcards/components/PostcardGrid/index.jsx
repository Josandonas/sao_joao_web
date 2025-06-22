import React from 'react';
import PropTypes from 'prop-types';
import { Grid, NoResults } from './styles';
import PostcardItem from '../PostcardItem';

const PostcardGrid = ({ postcards, onPostcardClick, clearFilters }) => {
  if (postcards.length === 0) {
    return (
      <NoResults>
        <p>Nenhum postal encontrado com os filtros atuais.</p>
        <button onClick={clearFilters}>
          Limpar filtros
        </button>
      </NoResults>
    );
  }

  return (
    <Grid>
      {postcards.map(postcard => (
        <PostcardItem 
          key={postcard.id} 
          postcard={postcard} 
          onClick={onPostcardClick} 
        />
      ))}
    </Grid>
  );
};

PostcardGrid.propTypes = {
  postcards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      titleKey: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      descriptionKey: PropTypes.string.isRequired,
      locationKey: PropTypes.string.isRequired,
      authorKey: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired
    })
  ).isRequired,
  onPostcardClick: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired
};

export default PostcardGrid;
