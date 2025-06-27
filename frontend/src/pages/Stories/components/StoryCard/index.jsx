import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Card, Title, Excerpt } from './styles';

/**
 * Componente para exibir um cartão de história individual
 * @param {Object} props - Props do componente
 * @param {Object} props.story - Dados da história já traduzidos pelo hook useStories
 * @param {Function} props.onClick - Função chamada ao clicar no cartão
 * @param {string} props.currentLanguage - Idioma atual (pt, en, es)
 */
const StoryCard = ({ story, onClick, currentLanguage = 'pt' }) => {
  // O hook useStories já processa as histórias com o idioma correto
  // e disponibiliza os campos title e excerpt traduzidos
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
    title: PropTypes.string,
    excerpt: PropTypes.string,
    content: PropTypes.string,
    pt: PropTypes.object,
    en: PropTypes.object,
    es: PropTypes.object
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string
};

export default StoryCard;
