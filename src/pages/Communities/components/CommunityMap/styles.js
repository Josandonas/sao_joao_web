import styled from 'styled-components';

export const MapContainerStyled = styled.div`
  width: 100%;
  height: 650px;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 5px solid white;
  margin: 20px 0 30px;
  position: relative;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: ${props => props.theme.borderRadius.large};
    background: linear-gradient(135deg, #4e7ee3, #6acddc);
    z-index: -1;
    box-shadow: 0 6px 20px rgba(106, 205, 220, 0.3);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 500px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 400px;
  }
  
  .leaflet-container {
    height: 100%;
    width: 100%;
    font-family: ${props => props.theme.fonts.body};
  }
  
  .leaflet-control-zoom {
    border: none !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2) !important;
  }
  
  .leaflet-control-zoom-in,
  .leaflet-control-zoom-out {
    border-radius: 4px !important;
    background-color: white !important;
    color: #4e7ee3 !important;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #4e7ee3 !important;
      color: white !important;
    }
  }
  
  .leaflet-tooltip {
    padding: 10px 14px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.2);
    border: none;
    border-radius: 10px;
    font-size: 14px;
    color: #333;
    transition: all 0.3s ease;
    min-width: 120px;
    
    &.active-tooltip {
      transform: translateY(-3px) scale(1.05);
      background: white;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
    
    strong {
      display: block;
      margin-bottom: 4px;
      color: #4e7ee3;
      font-weight: 600;
    }
    
    .tooltip-preview {
      font-size: 12px;
      color: #666;
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px dashed #eee;
    }
  }
  
  /* Efeito de pulsação para o marcador selecionado */
  .pulse {
    animation: pulse-animation 2s infinite;
  }
  
  @keyframes pulse-animation {
    0% {
      filter: drop-shadow(0 0 0 rgba(78, 126, 227, 0));
    }
    50% {
      filter: drop-shadow(0 0 8px rgba(78, 126, 227, 0.6));
    }
    100% {
      filter: drop-shadow(0 0 0 rgba(78, 126, 227, 0));
    }
  }
`;

export const MapTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.2rem;
  position: relative;
  display: inline-block;
  padding: 0 1.5rem;
  margin: 0 auto 2rem;
  letter-spacing: 0.5px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #4e7ee3, #6acddc);
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

export const MapDescription = styled.div`
  max-width: 800px;
  margin: 1.5rem auto 3rem;
  text-align: justify;
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
  background-color: rgba(255, 248, 220, 0.8);
  padding: 1.5rem 2rem 1.5rem 60px;
  border-radius: 8px;
  border-left: 4px solid #e9b100;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  position: relative;
  
  &:before {
    content: '⚠️';
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    color: #e9b100;
  }
  
  p {
    margin: 0;
    font-weight: 500;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin: 1.2rem 1rem 2.5rem;
    padding: 1rem 1.5rem;
  }
`;
