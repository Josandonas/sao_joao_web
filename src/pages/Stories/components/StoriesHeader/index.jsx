import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Container, PageTitle, AddStoryButton, ButtonWrapper } from './styles';

/**
 * Componente de cabeçalho para a página de histórias
 * @param {Object} props - Props do componente
 * @param {Function} props.onAddStoryClick - Função chamada ao clicar no botão de adicionar história
 */
const StoriesHeader = ({ onAddStoryClick }) => {
  const { t } = useTranslation();
  
  return (
    <Container>
      <PageTitle>{t('stories.pageTitle')}</PageTitle>
      <ButtonWrapper>
        <AddStoryButton onClick={onAddStoryClick}>
          <span className="plus-icon">+</span> {t('stories.shareYourStory')}
        </AddStoryButton>
      </ButtonWrapper>
    </Container>
  );
};

StoriesHeader.propTypes = {
  onAddStoryClick: PropTypes.func.isRequired
};

export default StoriesHeader;
