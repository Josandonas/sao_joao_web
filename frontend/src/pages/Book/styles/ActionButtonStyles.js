import styled from 'styled-components';

/**
 * Botão base para todos os botões de ação do módulo Book
 * 
 * Este componente é usado apenas internamente neste arquivo e não é exportado.
 * Ele serve como base para todos os outros botões de ação, fornecendo estilos
 * e comportamentos comuns que são herdados pelos botões específicos.
 * 
 * Todos os botões exportados deste arquivo estendem este componente base.
 */
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
  background: linear-gradient(1deg, #5f1530, #a00036);
  color: white;
  
  &:hover {
    background: linear-gradient(1deg, #4f1128, #900030);
    transform: translateY(-2px);
  }
`;

// Botão para compartilhar
export const ShareButton = styled(BaseButton)`
  background: linear-gradient(1deg, #5f1530, #a00036);
  color: white;
  
  &:hover {
    background: linear-gradient(1deg, #4f1128, #900030);
    transform: translateY(-2px);
  }
`;

// Botão para voltar à capa
export const BackToCoverButton = styled(BaseButton)`
  background-color: #8B4513; /* Marrom que remete à terra e tradição */
  color: white;
  
  &:hover {
    background-color: #6B3100; /* Marrom mais escuro para hover */
  }
`;

// Botão para ler online
export const ReadOnlineButton = styled(BaseButton)`
  background: linear-gradient(1deg, #5f1530, #a00036);
  color: white;
  
  &:hover {
    background: linear-gradient(1deg, #4f1128, #900030);
    transform: translateY(-2px);
  }
`;

// Botão para alternar modo de tela cheia
export const FullscreenButton = styled(BaseButton)`
  background-color: #A0522D; /* Marrom avermelhado */
  color: white;
  
  &:hover {
    background-color: #803D21; /* Marrom avermelhado mais escuro para hover */
  }
`;

// Botão de navegação entre páginas
export const NavButton = styled.button`
  background-color: #FFC080; /* Laranja claro que combina com o tema do Banho de São João */
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
