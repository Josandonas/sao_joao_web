import styled from 'styled-components';

export const BannerSection = styled.section`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: white;
  text-align: center;
  overflow: hidden;
  width: 100%;
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  
  .image-gallery {
    width: 100%;
    height: 100%;
  }
  
  .image-gallery-slide {
    width: 100%;
    height: 100%;
  }
  
  .image-gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .image-gallery-bullets {
    bottom: 20px;
    z-index: 4;
  }
  
  .image-gallery-bullets .image-gallery-bullet {
    background-color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    margin: 0 5px;

    transition: all 0.2s ease;
  }
  
  .image-gallery-bullets .image-gallery-bullet.active {
    background-color: #FF5F00;
    transform: scale(1.3);
  }
  
  .image-gallery-left-nav, .image-gallery-right-nav {
    color: white;
    font-size: 3.5em;
    z-index: 4;
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.7));
    opacity: 0.7;
  }
  
  /* Adicionar um overlay sutil para melhorar o contraste com os controles */
  &::after {
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
  }
`;

// Estilos de overlay removidos conforme solicitado
