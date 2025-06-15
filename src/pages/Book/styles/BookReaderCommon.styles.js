import styled from 'styled-components';

// Cores e variáveis compartilhadas
export const colors = {
  primary: '#3f51b5',
  secondary: '#f50057',
  background: '#f5f5f5',
  text: '#333333',
  textLight: '#ffffff',
  border: '#e0e0e0',
  shadow: 'rgba(0, 0, 0, 0.2)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336'
};

// Breakpoints para design responsivo
export const breakpoints = {
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

// Mixins para media queries
export const media = {
  xs: `@media (max-width: ${breakpoints.sm})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  touch: `@media (hover: none) and (pointer: coarse)`,
  mouse: `@media (hover: hover) and (pointer: fine)`,
};

// Animações compartilhadas
export const animations = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  slideUp: `
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  pulse: `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `,
};

// Container principal para o leitor de livros
export const ReaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${colors.background};
  position: relative;
  overflow: hidden;

  ${media.xs} {
    padding: 0;
  }

  ${media.sm} {
    padding: 0 10px;
  }

  ${media.md} {
    padding: 0 20px;
  }
`;

// Componente para feedback visual de carregamento
export const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;

  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid ${colors.border};
    border-top-color: ${colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Botão base para todos os botões do leitor
export const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  background-color: ${props => props.$primary ? colors.primary : 'transparent'};
  color: ${props => {
    if (props.$darkMode) {
      return props.$primary ? colors.textLight : colors.darkMode.text;
    }
    return props.$primary ? colors.textLight : colors.text;
  }};
  
  &:hover {
    background-color: ${props => {
      if (props.$darkMode) {
        return props.$primary ? '#303f9f' : 'rgba(255, 255, 255, 0.1)';
      }
      return props.$primary ? '#303f9f' : 'rgba(0, 0, 0, 0.05)';
    }};
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${media.xs} {
    padding: 8px;
    
    span {
      display: none;
    }
  }

  ${media.md} {
    padding: 8px 16px;
    
    span {
      display: inline;
      margin-left: 8px;
    }
  }
`;

// Ícone para os botões
export const ButtonIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

// Container para mensagens de feedback
export const FeedbackMessage = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: ${props => 
    props.$type === 'success' ? colors.success : 
    props.$type === 'warning' ? colors.warning : 
    props.$type === 'error' ? colors.error : 
    colors.primary};
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px ${colors.shadow};
  z-index: 1000;
  animation: slideUp 0.3s ease-out forwards;
`;

// Barra de progresso
export const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${colors.border};
  position: relative;
  margin: 10px 0;
  border-radius: 2px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.$progress || '0%'};
    background-color: ${colors.primary};
    transition: width 0.3s ease;
  }
`;
