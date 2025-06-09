import React from 'react';
import { 
  BookCover, 
  CoverImage, 
  BookInfo
} from '../styles/BookCoverStyles';
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
