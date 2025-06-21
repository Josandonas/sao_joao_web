import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiShare2, FiCopy, FiCheck, FiX } from 'react-icons/fi';
import {
  BookCover,
  CoverImage,
  BookInfo
} from '../styles/BookCoverStyles';
import {
  ActionButtons,
  ActionButton,
  ShareStatus
} from '../styles/BookCoverSectionStyles';

// Já recebemos bookContent como prop, não precisamos importá-lo aqui

/**
 * Componente para exibir a capa do livro com informações e botões de ação
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.onShare - Função para compartilhar o livro
 * @param {Function} props.onReadOnline - Função para abrir o PDF em uma nova aba
 * @param {Object} props.shareStatus - Status do compartilhamento
 * @returns {JSX.Element} - Componente renderizado
 */
const BookCoverSection = ({
  bookContent,
  onShare,
  onReadOnline,
  shareStatus = {}
}) => {
  const bookMetadata = bookContent.metadata;

  // Tradução
  const { t } = useTranslation();

  // Status de compartilhamento
  const { isSharing = false, shareSuccess = false, shareError = false, shareMessage = '' } = shareStatus || {};

  return (
    <BookCover>
      <div className="book-cover-content">
        <CoverImage
          src={PUBLIC_URL + bookContent.metadata.coverImage}
          alt={bookContent.metadata.title}
        />

        <BookInfo>
          <div className="book-title-section">
            <h2>{t('book.title', 'Banho de São João')}</h2>
            <h3>{t('book.subtitle', 'Uma Tradição do Pantanal')}</h3>
          </div>

          <div className="book-description">
            <p>{bookContent.metadata.description}</p>
          </div>

          <div className="book-details">
            <div className="detail-item">
              <span>{t('book.publication', 'Publicação')}:</span>
              <span>{bookContent.metadata.published}</span>
            </div>
            <div className="detail-item">
              <span>{t('book.pages', 'Páginas')}:</span>
              <span>{bookContent.metadata.totalPages}</span>
            </div>
            <div className="detail-item">
              <span>{t('book.languages', 'Idiomas')}:</span>
              <span>{bookContent.metadata.languages}</span>
            </div>
            <div className="detail-item">
              <span>{t('book.authors', 'Autora')}:</span>
              <span>{bookContent.metadata.authors}</span>
            </div>
          </div>



          {/* Mensagem de status do compartilhamento */}
          {shareMessage && (
            <ShareStatus success={shareSuccess ? "true" : undefined} error={shareError ? "true" : undefined}>
              {shareSuccess && <FiCheck />}
              {shareError && <FiX />}
              {shareMessage}
            </ShareStatus>
          )}
        </BookInfo>
      </div>
    </BookCover>
  );
};

export default BookCoverSection;
