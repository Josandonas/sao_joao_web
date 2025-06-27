import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import StoryCard from '../StoryCard';
import { Grid, LoadingContainer, PaginationContainer, PaginationButton } from './styles';

/**
 * Componente grid para exibir os cards de histórias
 * @param {Object} props - Props do componente
 * @param {Array} props.stories - Lista de histórias a serem exibidas
 * @param {Function} props.onStoryClick - Função chamada ao clicar em uma história
 * @param {Boolean} props.isLoading - Indica se as histórias estão sendo carregadas
 * @param {String} props.currentLanguage - Idioma atual (pt, en, es)
 * @param {Number} props.currentPage - Página atual
 * @param {Number} props.totalPages - Total de páginas
 * @param {Function} props.onNextPage - Função para avançar para a próxima página
 * @param {Function} props.onPrevPage - Função para voltar para a página anterior
 * @param {Boolean} props.showPagination - Indica se deve mostrar a paginação
 */
const StoriesGrid = ({ 
  stories, 
  onStoryClick, 
  isLoading = false,
  currentLanguage = 'pt',
  currentPage = 1,
  totalPages = 1,
  onNextPage = () => {},
  onPrevPage = () => {},
  showPagination = false
}) => {
  const { t } = useTranslation();
  
  if (isLoading) {
    return (
      <LoadingContainer>
        <div className="loading-spinner"></div>
      </LoadingContainer>
    );
  }

  return (
    <>
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
            <p>{t('stories.noStories')}</p>
          </div>
        )}
      </Grid>
      
      {showPagination && totalPages > 1 && (
        <PaginationContainer>
          <PaginationButton 
            onClick={onPrevPage} 
            disabled={currentPage <= 1}
          >
            &laquo; {t('stories.pagination.prev')}
          </PaginationButton>
          
          <span className="page-info">
            {t('stories.pagination.pageInfo', { current: currentPage, total: totalPages })}
          </span>
          
          <PaginationButton 
            onClick={onNextPage} 
            disabled={currentPage >= totalPages}
          >
            {t('stories.pagination.next')} &raquo;
          </PaginationButton>
        </PaginationContainer>
      )}
    </>
  );
};

StoriesGrid.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      excerpt: PropTypes.string,
      author: PropTypes.string,
    })
  ),
  onStoryClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  currentLanguage: PropTypes.string,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onNextPage: PropTypes.func,
  onPrevPage: PropTypes.func,
  showPagination: PropTypes.bool
};

export default StoriesGrid;
