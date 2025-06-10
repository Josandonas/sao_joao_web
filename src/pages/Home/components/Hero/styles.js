import styled from 'styled-components';

export const HeroSection = styled.section`
  height: 70vh;
  min-height: 500px;
  max-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: white;
  text-align: center;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 70vh;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 60vh;
    min-height: 400px;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 5;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: ${props => props.theme.spacing.xl};
  background: linear-gradient(135deg, rgba(140, 0, 51, 0.85) 0%, rgba(82, 0, 30, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
`;

export const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxxlarge};
  font-family: ${props => props.theme.fonts.heading};
  margin-bottom: ${props => props.theme.spacing.md};
  color: #FFC56E;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  letter-spacing: 1px;
  font-weight: ${props => props.theme.fontWeights.bold};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.xxlarge};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xlarge};
  }
`;

export const Subtitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.large};
  font-weight: ${props => props.theme.fontWeights.normal};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  line-height: 1.4;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.medium};
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const ExploreButton = styled.button`
  background: #FF5F00;
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: ${props => props.theme.fontWeights.bold};
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: ${props => props.theme.spacing.md};
  
  &:hover {
    background: #F25200;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.fontSizes.small};
  }
`;

export const CarouselContainer = styled.div`
  top: 0;
  left: 0;
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
    padding: 6px;
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
