import styled from 'styled-components';
import { colors, media } from './BookReaderCommon.styles';

// Container principal para o leitor online
export const OnlineReaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${colors.background};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

// Cabeçalho do leitor online
export const ReaderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: ${colors.primary};
  color: ${colors.textLight};
  box-shadow: 0 2px 8px ${colors.shadow};
  z-index: 10;
  
  ${media.sm} {
    padding: 20px 32px;
  }
`;

// Título do leitor
export const ReaderTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  
  ${media.sm} {
    font-size: 22px;
  }
`;

// Container para os controles do leitor
export const ReaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  ${media.sm} {
    gap: 16px;
  }
`;

// Botão de ação para o leitor
export const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  color: ${colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  ${media.sm} {
    width: 48px;
    height: 48px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

// Container para o visualizador de PDF
export const ViewerContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  
  /* Customizações para o visualizador de PDF */
  .rpv-core__viewer {
    height: 100%;
  }
  
  /* Melhorias para o modo mobile */
  ${media.xs} {
    .rpv-core__inner-pages {
      padding: 8px;
    }
  }
`;

// Mensagem de carregamento
export const LoadingMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 24px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 12px ${colors.shadow};
  font-size: 16px;
  font-weight: 500;
  color: ${colors.text};
  z-index: 5;
`;

// Mensagem de erro
export const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 24px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 12px ${colors.shadow};
  font-size: 16px;
  font-weight: 500;
  color: ${colors.error};
  z-index: 5;
  text-align: center;
  max-width: 80%;
`;
