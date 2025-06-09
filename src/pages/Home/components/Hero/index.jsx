import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ImageGallery from 'react-image-gallery';
import { 
  HeroSection,
  HeroContent,
  Title,
  Subtitle,
  ExploreButton,
  CarouselContainer
} from './styles';

/**
 * Componente Hero para a seção inicial/banner da página Home
 * @param {Object} props - Propriedades do componente
 * @param {string} props.lang - Código do idioma atual
 */
const Hero = ({ lang }) => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Criar array de imagens para o carrossel
    const carouselImages = [];
    for (let i = 1; i <= 17; i++) {
      carouselImages.push({
        original: `/assets/images/backgrounds/carrosel_home/img (${i}).jpeg`,
        thumbnail: `/assets/images/backgrounds/carrosel_home/img (${i}).jpeg`,
        loading: 'lazy',
      });
    }
    setImages(carouselImages);
  }, []);

  return (
    <HeroSection>
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
    </HeroSection>
  );
};

export default Hero;
