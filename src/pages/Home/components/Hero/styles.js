import styled from 'styled-components';

export const HeroSection = styled.section`
  height: 70vh; /* Altura responsiva baseada na viewport */
  min-height: 400px; /* Altura mínima para telas pequenas */
  max-height: 800px; /* Altura máxima para telas grandes */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: white;
  text-align: center;
  overflow: hidden;
  
  /* Responsividade para diferentes tamanhos de tela */
  @media (max-width: 768px) {
    height: 50vh;
    min-height: 300px;
  }
  
  @media (max-width: 576px) {
    height: 40vh;
    min-height: 250px;
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  .custom-carousel {
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
  
  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  /* Estilização dos indicadores (bullets) do Bootstrap */
  .carousel-indicators {
    bottom: 20px;
    z-index: 4;
    margin-bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    padding: 8px 15px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    
    @media (max-width: 576px) {
      padding: 5px 10px;
      bottom: 10px;
    }
  }
  
  /* Remover os bullets padrão do Bootstrap */
  .carousel-indicators [data-bs-target],
  .carousel-indicators button {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    margin: 0 8px;
    width: 32px;
    height: 32px;
    position: relative;
    opacity: 1;
    
    @media (max-width: 576px) {
      width: 24px;
      height: 24px;
      margin: 0 5px;
    }
  }
  
  /* Criar um container circular com fundo branco para o ícone */
  .carousel-indicators [data-bs-target]::before,
  .carousel-indicators button::before {
    content: "";
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1;
    transition: all 0.3s ease;
    
    @media (max-width: 576px) {
      width: 24px;
      height: 24px;
    }
  }
  
  /* Adiciona o ícone de fogueira usando ::after */
  .carousel-indicators [data-bs-target]::after,
  .carousel-indicators button::after {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 6px;
    left: 6px;
    z-index: 2;
    background-image: url("/assets/svg/fire_bom.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.3s ease;
    
    @media (max-width: 576px) {
      width: 16px;
      height: 16px;
      top: 4px;
      left: 4px;
    }
  }
  
  /* Estilo para o bullet ativo */
  .carousel-indicators .active::before {
    background-color: rgba(255, 255, 255, 0.95);
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  }
  
  .carousel-indicators .active::after {
    background-image: url("/assets/svg/fire-wood_color.svg");
    transform: scale(1.1);
  }
  
  /* Estilo para hover no bullet */
  .carousel-indicators [data-bs-target]:hover::before,
  .carousel-indicators button:hover::before {
    background-color: rgba(255, 255, 255, 0.95);
    transform: scale(1.05);
  }
  
  /* Estilização dos controles de navegação */
  .carousel-control-prev, .carousel-control-next {
    color: white;
    font-size: 3.5em;
    z-index: 4;
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.7));
    opacity: 0.7;
    width: 10%;
    
    @media (max-width: 768px) {
      font-size: 2.5em;
    }
    
    @media (max-width: 576px) {
      font-size: 1.8em;
    }
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
