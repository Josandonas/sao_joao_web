import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, PageTitle, AddStoryButton, ButtonWrapper } from './styles';

/**
 * Componente de cabeçalho para a página de histórias
 * @param {Object} props - Props do componente
 * @param {Function} props.onAddStoryClick - Função chamada ao clicar no botão de adicionar história
 */
const StoriesHeader = ({ onAddStoryClick }) => {
  return (
    <Container>
      <PageTitle>Histórias do Banho de São João</PageTitle>
      <ButtonWrapper>
        <AddStoryButton onClick={onAddStoryClick}>
          <span className="plus-icon">+</span> Compartilhe Sua História
        </AddStoryButton>
      </ButtonWrapper>
    </Container>
  );
};

StoriesHeader.propTypes = {
  onAddStoryClick: PropTypes.func.isRequired
};

export default StoriesHeader;
