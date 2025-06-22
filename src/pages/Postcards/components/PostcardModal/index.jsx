import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DownloadLink from 'react-download-link';
import { FaShare, FaDownload, FaTimes, FaMapMarkerAlt, FaUser, FaCalendarAlt } from 'react-icons/fa';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalHeader,
  ModalBody,
  FullPostcardImage,
  PostcardInfo,
  PostcardDescription,
  PostcardMetadata,
  MetadataItem,
  ShareContainer,
  ShareButton,
  DownloadButton
} from './styles';

const PostcardModal = ({ postcard, onClose, onShare, onDownload }) => {
  const { t } = useTranslation();

  // Impedir a rolagem do corpo quando o modal estiver aberto
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}><FaTimes size={24} /></CloseButton>

        <ModalHeader>
          <h2>{t(postcard.titleKey)}</h2>
        </ModalHeader>

        <ModalBody>
          <FullPostcardImage
            src={PUBLIC_URL + postcard.image}
            alt={t(postcard.titleKey)}
          />

          <PostcardInfo>
            <PostcardDescription>
              {postcard.descriptionKey ? t(postcard.descriptionKey) : postcard.description}
            </PostcardDescription>
            <PostcardMetadata>
              <MetadataItem>
                <strong><FaMapMarkerAlt /> {t('postcards.locationLabel')}</strong> {postcard.locationKey ? t(postcard.locationKey) : postcard.location}
              </MetadataItem>
              <MetadataItem>
                <strong><FaUser /> {t('postcards.authorLabel')}</strong> {postcard.authorKey ? t(postcard.authorKey) : postcard.author}
              </MetadataItem>
              <MetadataItem>
                <strong><FaCalendarAlt /> {t('postcards.yearLabel')}</strong> {postcard.year}
              </MetadataItem>
            </PostcardMetadata>
            <ShareContainer>
              <ShareButton onClick={onShare}>
                <FaShare /> {t('postcards.shareButton')}
              </ShareButton>
              <DownloadLink
                label={
                  <DownloadButton as="span">
                    <FaDownload /> {t('postcards.downloadButton')}
                  </DownloadButton>
                }
                filename={`postal-${postcard.id}-${t(postcard.titleKey).toLowerCase().replace(/\s+/g, '-')}.jpg`}
                exportFile={() => fetch(postcard.image)
                  .then(response => response.blob())
                  .then(blob => blob)}
                style={{ textDecoration: 'none' }}
              />
            </ShareContainer>
          </PostcardInfo>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

PostcardModal.propTypes = {
  postcard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titleKey: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    descriptionKey: PropTypes.string.isRequired,
    locationKey: PropTypes.string.isRequired,
    authorKey: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired
};

export default PostcardModal;
