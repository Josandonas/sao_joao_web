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
    background: linear-gradient(135deg, #8c0033, #b5003e);
    z-index: -1;
    box-shadow: 0 6px 20px rgba(140, 0, 51, 0.3);
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
    color: #8c0033 !important;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #8c0033 !important;
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
      color: #8c0033;
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
      filter: drop-shadow(0 0 0 rgba(140, 0, 51, 0));
    }
    50% {
      filter: drop-shadow(0 0 8px rgba(140, 0, 51, 0.6));
    }
    100% {
      filter: drop-shadow(0 0 0 rgba(140, 0, 51, 0));
    }
  }
`;

export const MapTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 2.5rem;
  position: relative;
  padding: 1rem 0;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
`;

export const MapTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  position: relative;
  display: inline-block;
  padding: 0;
  margin: 0;
  letter-spacing: 1px;
  background: linear-gradient(135deg, #8c0033, #b5003e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  flex: 1;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #8c0033, #b5003e);
    border-radius: 2px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.6rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2.2rem;
  }
`;

export const RegisterButton = styled.button`
  background: linear-gradient(135deg, #8c0033, #b5003e);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 50px;
  padding: 0.6rem 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  z-index: 1;
  letter-spacing: 0.5px;
  margin-left: 20px;
  margin-top: 0;
  
  &:before {
    content: '📍';
    font-size: 1.4rem;
    line-height: 0;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: -10%;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, rgba(255, 126, 80, 0.8), rgba(255, 99, 71, 1));
    z-index: -1;
    transform: skew(-10deg);
    transition: width 0.4s ease;
  }
  
  &:hover {
    background-color: #ff6c34;
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 10px 25px rgba(255, 126, 80, 0.3), 0 0 0 5px rgba(255, 255, 255, 0.15);
    border-color: white;
    
    &:after {
      width: 120%;
    }
  }
  
  &:active {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    justify-content: center;
    font-size: 1.05rem;
    padding: 0.85rem 1.8rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
    padding: 0.8rem 1.6rem;
  }
`;

export const MapDescription = styled.div`
  max-width: 800px;
  margin: 1.5rem auto 2.5rem;
  padding: 1.2rem 2.5rem;
  text-align: center;
  color: #2d3748;
  font-size: 1.15rem;
  line-height: 1.7;
  background-color: rgba(255, 248, 240, 0.6);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  position: relative;
  
  p {
    margin: 0;
    font-weight: 500;
  }
  
  &:before {
    content: '💡';
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.4rem;
    opacity: 0.7;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.05rem;
    padding: 1rem 2rem 1rem 2.5rem;
    margin: 1.2rem auto 2rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
    padding: 1rem 1.5rem 1rem 2rem;
    &:before {
      font-size: 1.2rem;
      left: 10px;
    }
  }
`;
