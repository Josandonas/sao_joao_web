import styled from 'styled-components';
import { colors, media, animations } from './BookReaderCommon.styles';

// Container principal para o leitor em dispositivos móveis
export const MobileReaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: ${colors.background};
  
  ${media.md} {
    display: none; // Esconde em telas maiores
  }
`;

// Área de conteúdo principal (onde as páginas são exibidas)
export const MobileContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  overflow: hidden;
  touch-action: pan-y;
`;

// Container para a página atual
export const MobilePageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: relative;
  
  &.page-transition-enter {
    transform: ${props => props.$direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)'};
  }
  
  &.page-transition-enter-active {
    transform: translateX(0);
    transition: transform 300ms ease-in-out;
  }
  
  &.page-transition-exit {
    transform: translateX(0);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  &.page-transition-exit-active {
    transform: ${props => props.$direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)'};
    transition: transform 300ms ease-in-out;
  }
`;

// Imagem da página para dispositivos móveis
export const MobilePageImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  box-shadow: 0 2px 8px ${colors.shadow};
  border-radius: 4px;
  user-select: none;
  touch-action: none;
`;

// Barra de ferramentas fixa na parte inferior
export const MobileToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background-color: ${colors.background};
  border-top: 1px solid ${colors.border};
  padding: 0 10px;
  position: relative;
  z-index: 10;
  box-shadow: 0 -2px 10px ${colors.shadow};
`;

// Grupo de botões na barra de ferramentas
export const MobileToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Botão de navegação para dispositivos móveis
export const MobileNavigationButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${colors.primary};
  color: ${colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:active {
    transform: scale(0.95);
    background-color: #303f9f;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

// Botão de ação para dispositivos móveis
export const MobileActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  color: ${colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:active {
    transform: scale(0.95);
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

// Menu de opções para dispositivos móveis
export const MobileOptionsMenu = styled.div.attrs(props => {
  // Removendo a prop isOpen para não ser passada para o DOM
  const newProps = {...props};
  delete newProps.isOpen;
  return newProps;
})`
  position: absolute;
  bottom: 70px;
  right: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px ${colors.shadow};
  padding: 10px 0;
  min-width: 180px;
  z-index: 100;
  transform-origin: bottom right;
  animation: scaleIn 0.2s ease-out forwards;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  @keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

// Item do menu de opções
export const MobileMenuItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align: left;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  svg {
    margin-right: 12px;
    width: 18px;
    height: 18px;
  }
`;

// Indicador de página para dispositivos móveis
export const MobilePageIndicator = styled.div`
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  z-index: 10;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.3s ease;
`;

// Overlay para gestos de navegação
export const GestureOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
  
  // Área para voltar página
  &::before {
    content: '';
    width: 30%;
    height: 100%;
  }
  
  // Área central
  &::after {
    content: '';
    width: 40%;
    height: 100%;
  }
  
  // Área para avançar página
  & > div {
    width: 30%;
    height: 100%;
  }
`;

// Menu de capítulos para dispositivos móveis
export const MobileChaptersMenu = styled.div.attrs(props => {
  // Removendo a prop isOpen para não ser passada para o DOM
  const newProps = {...props};
  delete newProps.isOpen;
  return newProps;
})`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -2px 20px ${colors.shadow};
  z-index: 200;
  max-height: 70vh;
  overflow-y: auto;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.3s ease;
`;

// Cabeçalho do menu de capítulos
export const MobileChaptersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid ${colors.border};
  
  h3 {
    margin: 0;
    font-size: 18px;
  }
  
  button {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
  }
`;

// Lista de capítulos
export const MobileChaptersList = styled.div`
  padding: 10px 0;
`;

// Item de capítulo
export const MobileChapterItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 14px 16px;
  border: none;
  background-color: ${props => props.$active ? 'rgba(63, 81, 181, 0.1)' : 'transparent'};
  color: ${props => props.$active ? colors.primary : colors.text};
  cursor: pointer;
  text-align: left;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  border-left: 4px solid ${props => props.$active ? colors.primary : 'transparent'};
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

// Overlay de fundo para menus
export const MobileOverlay = styled.div.attrs(props => {
  // Removendo a prop isOpen para não ser passada para o DOM
  const newProps = {...props};
  delete newProps.isOpen;
  return newProps;
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
  opacity: ${props => props.isOpen ? 1 : 0};
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  transition: opacity 0.3s ease;
`;
