import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Content,
  Header,
  Title,
  CloseButton,
  Body,
  Author,
  Paragraph
} from './styles';

/**
 * Componente de modal para exibir os detalhes completos de uma história
 * Renderiza texto puro em formato de parágrafos sem usar HTML
 * 
 * @param {Object} props - Props do componente
 * @param {Object} props.story - Dados da história selecionada
 * @param {Function} props.onClose - Função chamada ao fechar o modal
 */
const StoryModal = ({ story, onClose }) => {
  if (!story) return null;
  
  // Dividir o conteúdo em parágrafos
  const paragraphs = story.content.split('\n\n').filter(p => p.trim() !== '');

  return (
    <Modal>
      <Content>
        <Header>
          <Title>{story.title}</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        
        <Body>
          {story.autor && <Author>{story.autor}</Author>}
          
          {paragraphs.map((paragraph, index) => (
            <Paragraph key={index}>{paragraph.trim()}</Paragraph>
          ))}
        </Body>
      </Content>
    </Modal>
  );
};

StoryModal.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default StoryModal;
