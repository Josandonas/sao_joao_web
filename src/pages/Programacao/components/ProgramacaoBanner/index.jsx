import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ImageGallery from 'react-image-gallery';
import { 
  BannerSection,
  CarouselContainer
} from './styles';

/**
 * Componente Banner para a seção inicial da página de Programação Oficial
 * @param {Object} props - Propriedades do componente
 * @param {string} props.lang - Código do idioma atual
 */
const ProgramacaoBanner = ({ lang }) => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Criar array de imagens para o carrossel
    const carouselImages = [];
    // Assumindo que teremos até 10 imagens no carrossel da programação
    // O número pode ser ajustado conforme necessário quando as imagens estiverem disponíveis
    for (let i = 1; i <= 3;i++) {
      carouselImages.push({
        original: `/assets/images/backgrounds/carrosel_programacao/img (${i}).png`,
        thumbnail: `/assets/images/backgrounds/carrosel_programacao/img (${i}).png`,
        loading: 'lazy',
      });
    }
    setImages(carouselImages);
  }, []);

  return (
    <BannerSection>
      <CarouselContainer>
        <ImageGallery 
          items={images} 
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets={true}
          showNav={true}
          autoPlay={true}
          slideInterval={5000}
          slideDuration={450}
          lazyLoad={true}
        />
      </CarouselContainer>
    </BannerSection>
  );
};

export default ProgramacaoBanner;
