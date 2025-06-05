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
  padding: 2rem 3rem;
  background: linear-gradient(135deg, rgba(140, 0, 51, 0.9), rgba(120, 0, 42, 0.85));
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(140, 0, 51, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
    top: -200px;
    right: -100px;
    border-radius: 50%;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
    bottom: -100px;
    left: 10%;
    border-radius: 50%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 2rem;
    padding: 1.8rem 1.5rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1.5rem 1.2rem;
    border-radius: 15px;
  }
`;

export const MapTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.6rem;
  font-weight: 800;
  text-align: left;
  color: white;
  position: relative;
  display: inline-block;
  padding: 0;
  margin: 0;
  letter-spacing: 0.8px;
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  z-index: 1;
  
  span {
    background: linear-gradient(90deg, #ffffff, #e9f0ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 120px;
    height: 5px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7));
    border-radius: 3px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  &:hover:after {
    width: 140px;
    box-shadow: 0 3px 10px rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    text-align: center;
    font-size: 2.3rem;
    
    &:after {
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
    }
    
    &:hover:after {
      width: 120px;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

export const RegisterButton = styled.button`
  background-color: #ff7e50;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  padding: 0.9rem 2.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2), 0 0 0 4px rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  z-index: 1;
  letter-spacing: 0.5px;
  
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
