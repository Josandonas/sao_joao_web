import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ImageGallery from 'react-image-gallery';
import { decodeSpecialChars, sanitizeObject } from '../../../../utils/textUtils';
import {
  CommunityModal as ModalContainer,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalImage,
  GalleryContainer,
  ModalDetailsContainer,
  ModalDetail,
  ModalDetailTitle,
  ModalText,
  TraditionsHighlight
} from './styles';

/**
 * Componente que exibe os detalhes completos de uma comunidade em um modal
 * @param {Object} community - A comunidade selecionada
 * @param {Function} onClose - Função para fechar o modal
 */
const CommunityModal = ({ community, onClose }) => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language.split('-')[0] || 'pt';
  
  if (!community) return null;

  // Sanitize community data to handle special characters
  const sanitizedCommunity = useMemo(() => sanitizeObject(community), [community]);
  
  // Os bullets serão estilizados via CSS personalizado (customGallery.css)
  
  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{sanitizedCommunity.name[currentLang] || sanitizedCommunity.name['pt']}</ModalTitle>
          <CloseButton onClick={onClose} aria-label={t('communities.closeModal')}>&times;</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          {/* Tratamento para exibição da galeria de imagens */}
          <GalleryContainer>
            {(!sanitizedCommunity.gallery || sanitizedCommunity.gallery.length === 0) ? (
              <div className="gallery-message">
                <ModalImage src={sanitizedCommunity.image} alt={sanitizedCommunity.name[currentLang] || sanitizedCommunity.name['pt']} />
                <p className="no-gallery-message">
                  {t('communities.noGallery')}
                </p>
              </div>
            ) : (
              <ImageGallery
                items={[
                  // Adiciona a imagem de capa como a primeira da galeria
                  {
                    original: sanitizedCommunity.image,
                    thumbnail: sanitizedCommunity.image
                  },
                  // Adiciona as outras imagens da galeria
                  ...sanitizedCommunity.gallery.map(image => ({
                    original: image,
                    thumbnail: image
                  }))
                ]}
                showPlayButton={false}
                showFullscreenButton={true}
                slideInterval={3000}
                slideOnThumbnailOver={true}
                showIndex={true}
                showBullets={true}
              />
            )}
          </GalleryContainer>
          
          
          
          {/* Destaque especial para tradições quando disponível */}
          {sanitizedCommunity.traditions && (sanitizedCommunity.traditions[currentLang] || sanitizedCommunity.traditions['pt']) && (
            <TraditionsHighlight>
              <h3>{t('communities.traditions')}</h3>
              <div dangerouslySetInnerHTML={{ __html: sanitizedCommunity.fullDescription?.[currentLang] || sanitizedCommunity.fullDescription?.['pt'] || '' }} />
            </TraditionsHighlight>
          )}
          
          <ModalDetailsContainer>
            <ModalDetail>
              <ModalDetailTitle>{t('communities.ubicacion')}</ModalDetailTitle>
              <ModalText>
                {(sanitizedCommunity.location && (sanitizedCommunity.location[currentLang] || sanitizedCommunity.location['pt'])) || 
                 t('communities.noInfo')}
              </ModalText>
            </ModalDetail>
            
            <ModalDetail>
              <ModalDetailTitle>{t('communities.festivalPeriod')}</ModalDetailTitle>
              <ModalText>
                {(sanitizedCommunity.festival_date && (sanitizedCommunity.festival_date[currentLang] || sanitizedCommunity.festival_date['pt'])) || 
                 t('communities.noInfo')}
              </ModalText>
            </ModalDetail>
            
            <ModalDetail>
              <ModalDetailTitle>{t('communities.religionLabel')}</ModalDetailTitle>
              <ModalText>
                {(sanitizedCommunity.religion && (sanitizedCommunity.religion[currentLang] || sanitizedCommunity.religion['pt'])) || 
                 t('communities.noInfo')}
              </ModalText>
            </ModalDetail>

            <ModalDetail>
              <ModalDetailTitle>{t('communities.startYearLabel')}</ModalDetailTitle>
              <ModalText>
                {sanitizedCommunity.startYear || t('communities.noInfo')}
              </ModalText>
            </ModalDetail>

            <ModalDetail>
              <ModalDetailTitle>{t('communities.graceLabel')}</ModalDetailTitle>
              <ModalText>
                {(sanitizedCommunity.grace && (sanitizedCommunity.grace[currentLang] || sanitizedCommunity.grace['pt'])) || 
                 t('communities.noInfo')}
              </ModalText>
            </ModalDetail>
          </ModalDetailsContainer>
        </ModalBody>
      </ModalContent>
    </ModalContainer>
  );
};

export default CommunityModal;
