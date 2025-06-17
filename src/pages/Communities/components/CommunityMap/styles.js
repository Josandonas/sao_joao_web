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
    background: linear-gradient(135deg, #5f1530, #b5003e);
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
    color: #5f1530 !important;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #5f1530 !important;
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
      color: #5f1530;
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
    margin-bottom: 2rem;
  position: relative;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, rgba(235, 234, 234), rgba(219, 219, 219));
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #ff6b01, #800000);
  }
`;

export const MapTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  background: linear-gradient(135deg, #ff6b01, #ff6b01);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  display: inline-block;
  padding-bottom: ${props => props.theme.spacing.sm};
  letter-spacing: 1px;
  max-width: 90%;
  line-height: 1.1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, #ff6b01, #800000);
    border-radius: 2px;
    margin-top: ${props => props.theme.spacing.sm};
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.xlarge};
  }
`;

export const RegisterButton = styled.button`
  background: linear-gradient(135deg, #5f1530, #b5003e);
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 8px rgba(140, 0, 51, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 1;
  margin-top: ${props => props.theme.spacing.md};
  
  &:before {
    content: '📍';
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(140, 0, 51, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(140, 0, 51, 0.3);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    z-index: -1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.small};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
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
