import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';
import { 
  HeroSection,
  CarouselContainer
} from './styles';

/**
 * Componente Hero para a seção inicial/banner da página Home
 * @param {Object} props - Propriedades do componente
 * @param {string} props.lang - Código do idioma atual
 */
const Hero = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  // Detectar se é dispositivo móvel para controlar a exibição dos indicadores
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    // Criar array de imagens para o carrossel
    const carouselImages = [];
    for (let i = 1; i <= 14; i++) {
      carouselImages.push({
        src: `${PUBLIC_URL}/assets/images/backgrounds/carrosel_home/img (${i}).jpeg`,
        alt: `Slide ${i}`,
      });
    }
    setImages(carouselImages);
  }, []);

  // Os bullets serão estilizados via CSS personalizado adaptado para o Bootstrap carousel

  return (
    <HeroSection>
      <CarouselContainer className="custom-carousel-container">
        <Carousel 
          activeIndex={index}
          onSelect={handleSelect}
          interval={5000}
          indicators={!isMobile} // Oculta os indicadores em dispositivos móveis
          controls={true}
          fade={false}
          pause="hover"
          className="custom-carousel"
          touch={true}
          wrap={true}
        >
          {images.map((image, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100 carousel-image"
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </CarouselContainer>
    </HeroSection>
  );
};

export default Hero;
