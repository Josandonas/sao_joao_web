import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ReadButton,
  DownloadButton,
  ShareButton 
} from '../styles/ActionButtonStyles';
import {
  Container,
  PageTitle,
  ButtonsContainer
} from '../styles/BookHeaderStyles';

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
