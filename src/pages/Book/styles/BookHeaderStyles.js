import styled from 'styled-components';
import { ShareButton } from './ActionButtonStyles';

// Container principal do cabeçalho do livro
export const Container = styled.div`
  margin-bottom: 2rem;
  position: relative;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, rgba(235, 234, 234), rgba(219, 219, 219));
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #ff6b01, #800000);
  }
`;

// Título da página
export const PageTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  background: linear-gradient(135deg, #ff6b01, #ff6b01);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0 0 1.5rem 0;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

// Container para os botões de ação
export const ButtonsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
  }
`;

// Componente para exibir mensagens de status
export const StatusMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  z-index: 1000;
  animation: fadeInOut 3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  ${props => props.success ? `
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  ` : `
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `}
  
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); }
  }
`;

// Botão de ler online
export const ReadOnlineButton = styled(ShareButton)`
  background-color: #28a745;
  
  &:hover {
    background-color: #218838;
  }
`;
