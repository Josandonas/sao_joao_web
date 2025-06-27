import React from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import PropTypes from 'prop-types';
import 'react-image-gallery/styles/css/image-gallery.css';

// Estilos
import { GalleryContainer } from '../GaleriaSection.styles';

// Constantes
const GALLERY_CONFIG = {
  slideInterval: 5000,
  thumbnailPosition: 'bottom',
  additionalClass: 'galeria-custom',
  lazyLoad: true
};

/**
 * Componente para exibição da galeria de imagens
 * @param {Object} props - Propriedades do componente
 */
const GalleryViewer = ({ images, loading, error }) => {
  const { t } = useTranslation();
  
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">{t('common.loading', 'Carregando...')}</span>
        </Spinner>
      </div>
    );
  }
  
  return (
    <GalleryContainer>
      {images.length > 0 ? (
        <ImageGallery
          items={images}
          showPlayButton={true}
          showFullscreenButton={true}
          showThumbnails={true}
          showBullets={images.length > 1}
          showNav={images.length > 1}
          {...GALLERY_CONFIG}
        />
      ) : (
        !loading && !error && (
          // Mensagem de log apenas para desenvolvedores
          <>
            {console.log('Galeria: Nenhuma imagem disponível para o ano selecionado')}
            {/* Div vazia para manter o layout sem exibir mensagem para o usuário */}
            <div className="py-5"></div>
          </>
        )
      )}
    </GalleryContainer>
  );
};

GalleryViewer.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      original: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      description: PropTypes.string,
      originalAlt: PropTypes.string,
      thumbnailAlt: PropTypes.string,
      originalTitle: PropTypes.string
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default GalleryViewer;
