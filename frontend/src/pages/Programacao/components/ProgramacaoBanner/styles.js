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
  
  @media (max-width: 1024px) {
    height: 300px;
  }
  
  @media (max-width: 768px) {
    height: 200px;
  }
  
  @media (max-width: 480px) {
    height: 180px;
  }
`;

export const CarouselContainer = styled.div`
  width: 100%;
  height: 500px;
  z-index: 1;
  position: relative;
  touch-action: pan-y; /* Melhora o comportamento de toque em dispositivos móveis */
  
  .carousel {
    width: 100%;
    height: 100%;
  }
  
  .carousel-inner {
    width: 100%;
    height: 100%;
  }
  
  .carousel-item {
    width: 100%;
    height: 100%;
  }
  
  .carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  /* Estilizando os controles de navegação */
  .carousel-control-prev, .carousel-control-next {
    width: 10%;
    opacity: 0.7;
    z-index: 4;
  }
  
  .carousel-control-prev-icon, .carousel-control-next-icon {
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.7));
  }
  
  /* Ajustes responsivos */
  @media (max-width: 768px) {
    .carousel-control-prev, .carousel-control-next {
      width: 15%;
    }
  }
  
  /* Fallback para quando as imagens estão carregando */
  .fallback-banner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    color: #666;
    font-size: 1.2rem;
  }
`;

// Componente para os indicadores personalizados com ícones SVG
export const CustomCarouselIndicators = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  z-index: 20; /* Aumentado para garantir que fique acima de outros elementos */
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  margin-bottom: 0.5rem;
  list-style: none;
  pointer-events: auto;
  touch-action: manipulation; /* Melhora a resposta ao toque */
  
  .custom-indicator {
    width: 26px;
    height: 26px;
    margin: 0 5px;
    border: none;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      background-image: url('/assets/svg/fire_bom.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      transition: all 0.3s ease;
    }
    
    &::before {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      background-image: url('/assets/svg/fire-wood_color.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &.active {
      transform: scale(1.2);
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
      
      &::before {
        opacity: 1;
      }
      
      &::after {
        opacity: 0;
      }
    }
    
    &:hover {
      transform: scale(1.1);
      background-color: rgba(255, 255, 255, 0.9);
    }
    
    &:focus {
      outline: none;
    }
  }
  
  /* Ajustes responsivos para os indicadores personalizados */
  @media (max-width: 768px) {
    bottom: 10px;
    
    .custom-indicator {
      width: 24px;
      height: 24px;
      margin: 0 4px;
      
      &::after,
      &::before {
        width: 14px;
        height: 14px;
      }
    }
  }
  
  /* Ocultar os indicadores em dispositivos móveis (smartphones) */
  @media (max-width: 480px) {
    display: none;
  }
`;

