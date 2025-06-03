import React from 'react';
import { 
  BookCover, 
  CoverImage, 
  BookInfo, 
  CoverActions
} from '../styles/BookCoverStyles';
import {
  ReadButton,
  DownloadButton,
  ShareButton 
} from '../styles/ActionButtonStyles';
// Já recebemos bookContent como prop, não precisamos importá-lo aqui

/**
 * Componente para exibir a capa do livro com informações e botões de ação
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.onStartReading - Função para iniciar a leitura do livro
 * @param {Function} props.onDownload - Função para download do PDF
 * @param {Function} props.onShare - Função para compartilhar o livro
 * @returns {JSX.Element} - Componente renderizado
 */
const BookCoverSection = ({ bookContent, onStartReading, onDownload, onShare }) => {
  const bookMetadata = bookContent.metadata;
  
  return (
    <BookCover>
      <CoverActions>
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
      </CoverActions>
      <div className="book-cover-content">
        <CoverImage 
          src={bookContent.metadata.coverImage} 
          alt={bookContent.metadata.title} 
        />
        
        <BookInfo>
          <div className="book-title-section">
            <h2>{bookContent.metadata.title}</h2>
            <h3>{bookContent.metadata.subtitle}</h3>
          </div>
          
          <div className="book-description">
            <p>{bookContent.metadata.description}</p>
          </div>
          
          <div className="book-details">
            <div className="detail-item">
              <span className="detail-label">Publicação:</span>
              <span className="detail-value">{bookContent.metadata.published}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Páginas:</span>
              <span className="detail-value">{bookContent.metadata.totalPages}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Idiomas:</span>
              <span className="detail-value">{bookContent.metadata.languages}</span>
            </div>
          </div>
        </BookInfo>
      </div>
    </BookCover>
  );
};

export default BookCoverSection;
