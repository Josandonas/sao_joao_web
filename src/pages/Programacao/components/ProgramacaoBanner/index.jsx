import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';
import { 
  BannerSection,
  CarouselContainer,
  CustomCarouselIndicators
} from './styles';

/**
 * Componente Banner para a seção inicial da página de Programação Oficial
 * @param {Object} props - Propriedades do componente
 * @param {string} props.lang - Código do idioma atual
 */
const ProgramacaoBanner = ({ lang }) => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Criar array de imagens para o carrossel
    const carouselImages = [];
    
    // Adicionar as imagens locais que sabemos que existem
    // Caminho correto para as imagens locais
    const imagePaths = [
      '/assets/images/backgrounds/carrosel_programacao/img (1).png',
      '/assets/images/backgrounds/carrosel_programacao/img (2).png',
      '/assets/images/backgrounds/carrosel_programacao/img (3).png'
    ];
    
    // Adicionar cada imagem ao carrossel
    imagePaths.forEach((path, index) => {
      carouselImages.push({
        original: path,
        thumbnail: path,
        loading: 'lazy',
        alt: `Banner Programação Oficial ${index + 1}`
      });
    });
    
    // No futuro, aqui poderia ser integrado com imagens da API
    // Se houver imagens da API, elas poderiam ser adicionadas ou substituir as locais
    
    setImages(carouselImages);
  }, []);

  // Função para lidar com a mudança de slide
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };
  
  // Função para selecionar um slide específico
  const selectSlide = (index) => {
    // Desativa temporariamente os eventos do mouse para evitar cliques múltiplos
    if (carouselRef.current) {
      carouselRef.current.style.pointerEvents = 'none';
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.pointerEvents = 'auto';
        }
      }, 700); // Tempo suficiente para a transição terminar
    }
    setActiveIndex(index);
  };

  return (
    <BannerSection>
      <CarouselContainer ref={carouselRef}>
        {images.length > 0 ? (
          <>
            <Carousel 
              indicators={false} // Desativamos os indicadores padrão
              controls={images.length > 1}
              interval={5000}
              pause="hover"
              touch={true}
              fade={true}
              activeIndex={activeIndex}
              onSelect={handleSelect}
            >
              {/* Itens do carrossel */}
              {images.map((image, index) => (
                <Carousel.Item key={`banner-${index}`}>
                  <img
                    className="d-block w-100"
                    src={image.original}
                    alt={image.alt || `Banner Programação ${index + 1}`}
                    loading="lazy"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            
            {/* Indicadores personalizados */}
            {images.length > 1 && (
              <CustomCarouselIndicators>
                {images.map((_, index) => (
                  <button
                    key={`indicator-${index}`}
                    type="button"
                    className={`custom-indicator ${index === activeIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Impede propagação do evento
                      selectSlide(index);
                    }}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </CustomCarouselIndicators>
            )}
          </>
        ) : (
          <div className="fallback-banner">Carregando banners...</div>
        )}
      </CarouselContainer>
    </BannerSection>
  );
};

export default ProgramacaoBanner;
