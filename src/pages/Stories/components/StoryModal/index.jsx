import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaSearchMinus, FaSearchPlus, FaUndoAlt } from 'react-icons/fa';
import {
  Modal,
  ModalContent,
  Header,
  Title,
  CloseButton,
  Body,
  Author,
  Paragraph,
  ControlsContainer,
  FontSizeControl,
  FontSizeButton,
  MetaInfo
} from './styles';

/**
 * Componente de modal para exibir os detalhes completos de uma história
 * Renderiza texto puro em formato de parágrafos sem usar HTML
 * Inclui controles de acessibilidade para ajuste de tamanho da fonte
 * 
 * @param {Object} props - Props do componente
 * @param {Object} props.story - Dados da história selecionada
 * @param {Function} props.onClose - Função chamada ao fechar o modal
 */
const StoryModal = ({ story, onClose }) => {
  if (!story) return null;
  
  // Estado para controlar o tamanho da fonte (escala)
  const [fontScale, setFontScale] = useState(() => {
    const savedScale = localStorage.getItem('storyFontScale');
    return savedScale ? parseFloat(savedScale) : 1;
  });
  const [activeButton, setActiveButton] = useState(null);
  
  // Estados para informações de data da história
  const [storyDate, setStoryDate] = useState('');
  
  // Função para aumentar o tamanho da fonte
  const increaseFontSize = () => {
    if (fontScale < 1.5) {
      const newScale = Math.min(fontScale + 0.1, 1.5);
      setFontScale(newScale);
      setActiveButton('increase');
      setTimeout(() => setActiveButton(null), 300);
      localStorage.setItem('storyFontScale', newScale);
    }
  };
  
  // Função para diminuir o tamanho da fonte
  const decreaseFontSize = () => {
    if (fontScale > 0.8) {
      const newScale = Math.max(fontScale - 0.1, 0.8);
      setFontScale(newScale);
      setActiveButton('decrease');
      setTimeout(() => setActiveButton(null), 300);
      localStorage.setItem('storyFontScale', newScale);
    }
  };
  
  // Função para resetar o tamanho da fonte
  const resetFontSize = () => {
    setFontScale(1);
    setActiveButton('reset');
    setTimeout(() => setActiveButton(null), 300);
    localStorage.setItem('storyFontScale', 1);
  };
  
  // Efeito para detectar teclas de atalho (Escape para fechar, Ctrl+/- para zoom)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Fechar com Escape
      if (e.key === 'Escape') {
        onClose();
      }
      // Ctrl + '+' para aumentar fonte
      if (e.ctrlKey && e.key === '+') {
        e.preventDefault();
        increaseFontSize();
      }
      // Ctrl + '-' para diminuir fonte
      if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        decreaseFontSize();
      }
      // Ctrl + '0' para resetar fonte
      if (e.ctrlKey && e.key === '0') {
        e.preventDefault();
        resetFontSize();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Formatação da data se disponível
    if (story.date) {
      try {
        const dateObj = new Date(story.date);
        setStoryDate(dateObj.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }));
      } catch (e) {
        setStoryDate(story.date);
      }
    } else if (story.createdAt) {
      try {
        const dateObj = new Date(story.createdAt);
        setStoryDate(dateObj.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }));
      } catch (e) {
        console.error('Erro ao formatar data:', e);
      }
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  
  // Dividir o conteúdo em parágrafos
  const paragraphs = story.content.split('\n\n').filter(p => p.trim() !== '');

  return (
    <Modal>
      <ModalContent>
        <Header>
          <div className="header-content">
            <Title>{story.title}</Title>
            <CloseButton onClick={onClose} title="Fechar (Esc)">
              <FaTimes />
            </CloseButton>
          </div>
          
          {/* Informação do autor e data */}
          {(story.author || story.autor || storyDate) && (
            <MetaInfo>
              <span className="author">
                {(story.author || story.autor) && `Enviada por ${story.author || story.autor}`}
              </span>
              
              <span className="date">
                {storyDate && `em ${storyDate}`}
              </span>
            </MetaInfo>
          )}
          
          {/* Controles de fonte separados abaixo do título e autor */}
          <ControlsContainer data-fontscale={fontScale.toString()}>
            <FontSizeControl>
              <FontSizeButton 
                onClick={decreaseFontSize} 
                className={activeButton === 'decrease' ? 'active' : ''}
                title="Diminuir tamanho da fonte (Ctrl + -)">
                <FaSearchMinus />
              </FontSizeButton>
              
              <FontSizeButton 
                onClick={resetFontSize} 
                className={activeButton === 'reset' ? 'active' : ''}
                title="Tamanho normal da fonte (Ctrl + 0)">
                <FaUndoAlt />
              </FontSizeButton>
              
              <FontSizeButton 
                onClick={increaseFontSize} 
                className={activeButton === 'increase' ? 'active' : ''}
                title="Aumentar tamanho da fonte (Ctrl + +)">
                <FaSearchPlus />
              </FontSizeButton>
            </FontSizeControl>
          </ControlsContainer>
        </Header>
        
        <Body data-fontscale={fontScale.toString()} style={{ fontSize: `${fontScale}em` }}>
          {paragraphs.map((paragraph, index) => (
            <Paragraph key={index} data-fontscale={fontScale.toString()} style={{ fontSize: `${fontScale}em` }}>
              {paragraph.trim()}
            </Paragraph>
          ))}
        </Body>
      </ModalContent>
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
