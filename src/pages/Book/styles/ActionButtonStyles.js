import styled from 'styled-components';

// Estilo base para todos os botões de ação
const BaseButton = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: ${props => props.theme.fontWeights.bold};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  min-width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    min-width: unset;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  }
`;

// Botão primário para iniciar a leitura
export const ReadButton = styled(BaseButton)`
  background: ${props => props.theme.colors.primary};
  color: white;
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

// Botão para download
export const DownloadButton = styled(BaseButton)`
  background: ${props => props.theme.colors.secondary};
  color: white;
  
  &:hover {
    background: ${props => props.theme.colors.secondaryDark};
  }
`;

// Botão para compartilhar
export const ShareButton = styled(BaseButton)`
  background: ${props => props.theme.colors.accent};
  color: white;
  
  &:hover {
    background: ${props => props.theme.colors.accentDark};
  }
`;

// Botão para voltar à capa
export const BackToCoverButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondaryDark};
  }
`;

// Botão para alternar modo de tela cheia
export const FullscreenButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.tertiary};
  color: white;
  
  &:hover {
    background-color: ${props => props.theme.colors.tertiaryDark};
  }
`;

// Botão de navegação entre páginas
export const NavButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.large};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: scale(1.1);
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// Botão para fechar o modo de tela cheia
export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
`;
