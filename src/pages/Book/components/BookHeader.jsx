import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  ReadButton,
  DownloadButton,
  ShareButton 
} from '../styles/ActionButtonStyles';

// Estilos do cabeçalho do livro
const Container = styled.div`
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

const PageTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  color: #ff6b01;
  background: linear-gradient(135deg, #ff6b01, #ff6b01);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0 0 1.5rem 0;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

/**
 * Componente de cabeçalho para a página do livro
 * @param {Object} props - Props do componente
 * @param {Function} props.onStartReading - Função para iniciar a leitura do livro
 * @param {Function} props.onDownload - Função para download do PDF
 * @param {Function} props.onShare - Função para compartilhar o livro
 * @returns {JSX.Element} - Componente renderizado
 */
const BookHeader = ({ onStartReading, onDownload, onShare, showBook }) => {
  const { t } = useTranslation();
  
  // Se estiver no modo de leitura (showBook === true), não renderiza os botões
  if (showBook) {
    return null;
  }
  
  return (
    <Container>
      <ButtonsContainer>
        <ReadButton onClick={onStartReading}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m10 8 6 4-6 4V8z" />
          </svg>
          Ler Online
        </ReadButton>
        
        <DownloadButton onClick={onDownload}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF
        </DownloadButton>
        
        <ShareButton onClick={onShare}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Compartilhar
        </ShareButton>
      </ButtonsContainer>
    </Container>
  );
};

export default BookHeader;
