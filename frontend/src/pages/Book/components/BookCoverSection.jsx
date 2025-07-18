import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiShare2, FiCopy, FiCheck, FiX } from 'react-icons/fi';
import { useBookContext } from '../context/BookContext';
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
  // Usar o contexto para obter informações adicionais do livro selecionado
  const { books } = useBookContext();
  const { selectedBook } = books;
  
  // Usar os metadados do livro passados como prop
  const bookMetadata = bookContent.metadata;

  // Tradução
  const { t } = useTranslation();

  // Status de compartilhamento
  const { isSharing = false, shareSuccess = false, shareError = false, shareMessage = '' } = shareStatus || {};

  return (
    <BookCover>
      <div className="book-cover-content">
        <CoverImage
          src={bookMetadata.coverImage.startsWith('http') ? bookMetadata.coverImage : (PUBLIC_URL + bookMetadata.coverImage)}
          alt={bookMetadata.title}
        />

        <BookInfo>
          <div className="book-title-section">
            <h2>{t('book.title')}</h2>
            <h3>{t('book.subtitle')}</h3>
          </div>

          <div className="book-description">
            <p>{t('book.introduction')}</p>
          </div>

          <div className="book-details">
            <div className="detail-item">
              <span>{t('book.publication')}:</span>
              <span>{bookMetadata.published || selectedBook?.year}</span>
            </div>
            <div className="detail-item">
              <span>{t('book.pages')}:</span>
              <span>{bookMetadata.totalPages}</span>
            </div>
            <div className="detail-item">
              <span>{t('book.language')}:</span>
              <span>{t('book.languages')}</span>
            </div>
            <div className="detail-item">
              <span>{t('book.authors')}:</span>
              <span>{t('book.author')}</span>
            </div>
            {selectedBook?.isLegacy === false && (
              <div className="detail-item">
                <span>{t('book.year')}:</span>
                <span>{selectedBook.year}</span>
              </div>
            )}
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
