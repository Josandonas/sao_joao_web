import styled from 'styled-components';
import { colors, media, animations } from './BookReaderCommon.styles';

// Container principal para o leitor em desktop
export const DesktopReaderContainer = styled.div`
  display: none; // Escondido em dispositivos móveis
  
  ${media.md} {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 80vh;
    position: relative;
    background-color: ${colors.background};
  }
`;

// Barra de ferramentas superior para desktop
export const DesktopToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: 0 20px;
  background-color: ${colors.background};
  border-bottom: 1px solid ${colors.border};
  position: sticky;
  top: 0;
  z-index: 10;
  
  ${media.lg} {
    padding: 0 40px;
  }
`;

// Grupo de botões na barra de ferramentas
export const DesktopToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// Área de conteúdo principal (onde as páginas são exibidas)
export const DesktopContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  position: relative;
  
  ${media.lg} {
    padding: 30px;
  }
`;

// Container para as páginas do livro
export const DesktopPagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  
  &.page-transition-enter {
    opacity: 0;
  }
  
  &.page-transition-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in-out;
  }
  
  &.page-transition-exit {
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  
  &.page-transition-exit-active {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
  }
`;

// Layout para exibição de páginas duplas ou simples
export const DesktopPagesLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: ${props => props.$singlePage ? '0' : '20px'};
  
  ${media.lg} {
    gap: ${props => props.$singlePage ? '0' : '30px'};
  }
`;

// Wrapper para cada página individual
export const DesktopPageWrapper = styled.div`
  flex: ${props => props.$singlePage ? '0 0 auto' : '1'};
  max-width: ${props => props.$singlePage ? '70%' : '50%'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  ${media.lg} {
    max-width: ${props => props.$singlePage ? '60%' : '50%'};
  }
`;

// Imagem da página para desktop
export const DesktopPageImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  box-shadow: 0 4px 12px ${colors.shadow};
  border-radius: 4px;
  transition: transform 0.3s ease;
  
  ${media.mouse} {
    &:hover {
      transform: ${props => props.$zoomEnabled ? 'scale(1.02)' : 'none'};
    }
  }
`;

// Controles de navegação para desktop
export const DesktopNavigationControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  margin: 20px auto 0;
  padding: 0 20px;
`;

// Botão de navegação para desktop
export const DesktopNavigationButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: ${colors.primary};
  color: ${colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px ${colors.shadow};
  
  &:hover {
    background-color: #303f9f;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${colors.shadow};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px ${colors.shadow};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

// Indicador de página para desktop
export const DesktopPageIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: white;
  border-radius: 24px;
  box-shadow: 0 2px 8px ${colors.shadow};
  font-size: 16px;
  font-weight: 500;
`;

// Navegação por capítulos para desktop
export const DesktopChaptersNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px auto;
  max-width: 1200px;
  padding: 0 20px;
`;

// Botão de capítulo para desktop
export const DesktopChapterButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: ${props => props.$active ? colors.primary : 'white'};
  color: ${props => props.$active ? 'white' : colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px ${colors.shadow};
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  
  &:hover {
    background-color: ${props => props.$active ? '#303f9f' : '#f0f0f0'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${colors.shadow};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px ${colors.shadow};
  }
`;

// Controles de zoom para desktop
export const DesktopZoomControls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: white;
  border-radius: 24px;
  padding: 6px;
  box-shadow: 0 2px 8px ${colors.shadow};
  z-index: 10;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: ${props => props.$visible ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  ${media.lg} {
    bottom: 30px;
    right: 30px;
  }
`;

// Botão de zoom para desktop
export const DesktopZoomButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.$active ? colors.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$active ? '#303f9f' : '#f0f0f0'};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

// Indicador de nível de zoom
export const ZoomLevelIndicator = styled.div`
  padding: 0 10px;
  font-size: 14px;
  font-weight: 500;
`;

// Menu dropdown para desktop
export const DesktopDropdownMenu = styled.div.attrs(props => {
  // Removendo a prop isOpen para não ser passada para o DOM
  const newProps = {...props};
  delete newProps.isOpen;
  return newProps;
})`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px ${colors.shadow};
  min-width: 200px;
  z-index: 100;
  transform-origin: top right;
  animation: scaleIn 0.2s ease-out forwards;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  @keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

// Item do menu dropdown
export const DesktopDropdownItem = styled.button`
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

// Separador para o menu dropdown
export const DropdownDivider = styled.div`
  height: 1px;
  background-color: ${colors.border};
  margin: 8px 0;
`;
