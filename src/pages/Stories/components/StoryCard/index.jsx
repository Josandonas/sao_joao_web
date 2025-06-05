import React from 'react';
import PropTypes from 'prop-types';
import { Card, Title, Excerpt } from './styles';

/**
 * Componente para exibir um cartão de história individual
 * @param {Object} props - Props do componente
 * @param {Object} props.story - Dados da história
 * @param {Function} props.onClick - Função chamada ao clicar no cartão
 */
const StoryCard = ({ story, onClick }) => {
  return (
    <Card onClick={() => onClick(story)}>
      <Title>{story.title}</Title>
      <Excerpt>{story.excerpt}</Excerpt>
    </Card>
  );
};

StoryCard.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StoryCard;
