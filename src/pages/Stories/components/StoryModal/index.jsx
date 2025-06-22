import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
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
 * Componente de modal para exibir uma história completa
 * @param {Object} props - Props do componente
 * @param {Object} props.story - Dados da história a ser exibida
 * @param {Function} props.onClose - Função chamada ao fechar o modal
 * @param {string} props.currentLanguage - Idioma atual (pt, en, es)
 */
const StoryModal = ({ story, onClose, currentLanguage = 'pt' }) => {
  const { t, i18n } = useTranslation();
  if (!story) return null;
  
  // Determinar o idioma atual
  const lang = currentLanguage || i18n.language || 'pt';
  
  // Obter os dados da história no idioma correto
  const title = story[lang]?.title || story.title;
  const content = story[lang]?.content || story.content;
  const author = story[lang]?.author || story.author || story.autor;
  
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
  const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');

  return (
    <Modal>
      <ModalContent>
        <Header>
          <div className="header-content">
            <Title>{title}</Title>
            <CloseButton onClick={onClose} title={t('stories.modal.close')}>
              <FaTimes />
            </CloseButton>
          </div>
          
          {/* Informação do autor e data */}
          {(author || storyDate) && (
            <MetaInfo>
              <span className="author">
                {author && `${t('stories.modal.sentBy')} ${author}`}
              </span>
              
              <span className="date">
                {storyDate && `${t('stories.modal.on')} ${storyDate}`}
              </span>
            </MetaInfo>
          )}
          
          {/* Controles de fonte separados abaixo do título e autor */}
          <ControlsContainer data-fontscale={fontScale.toString()}>
            <FontSizeControl>
              <FontSizeButton 
                onClick={decreaseFontSize} 
                className={activeButton === 'decrease' ? 'active' : ''}
                title={t('stories.modal.decreaseFontSize')}>
                <FaSearchMinus />
              </FontSizeButton>
              
              <FontSizeButton 
                onClick={resetFontSize} 
                className={activeButton === 'reset' ? 'active' : ''}
                title={t('stories.modal.resetFontSize')}>
                <FaUndoAlt />
              </FontSizeButton>
              
              <FontSizeButton 
                onClick={increaseFontSize} 
                className={activeButton === 'increase' ? 'active' : ''}
                title={t('stories.modal.increaseFontSize')}>
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
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
    autor: PropTypes.string,
    date: PropTypes.string,
    pt: PropTypes.object,
    en: PropTypes.object,
    es: PropTypes.object
  }),
  onClose: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string
};

export default StoryModal;
