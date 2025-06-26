import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid, NoResults, LoadingContainer } from './styles';
import PostcardItem from '../PostcardItem';
import { FaSpinner } from 'react-icons/fa';

const PostcardGrid = ({ postcards, onPostcardClick, clearFilters, loading = false }) => {
  const { t } = useTranslation();
  
  // Se estiver carregando, mostrar indicador de carregamento
  if (loading) {
    return (
      <LoadingContainer>
        <FaSpinner size={24} />
        <p>{t('postcards.loading')}</p>
      </LoadingContainer>
    );
  }
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
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      titleKey: PropTypes.string,
      title: PropTypes.string,
      image: PropTypes.string.isRequired,
      descriptionKey: PropTypes.string,
      description: PropTypes.string,
      locationKey: PropTypes.string,
      location: PropTypes.string,
      authorKey: PropTypes.string,
      author: PropTypes.string,
      year: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired
    })
  ).isRequired,
  onPostcardClick: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

// Removido defaultProps em favor de parâmetros padrão do JavaScript

export default PostcardGrid;
