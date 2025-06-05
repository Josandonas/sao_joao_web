import styled from 'styled-components';

export const HeroSection = styled.section`
  position: relative;
  height: 70vh;
  min-height: 500px;
  max-height: 800px;
  background-image: url('/assets/images/header-bg.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  color: white;
  text-align: center;
  filter: contrast(1.05) saturate(1.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 107, 1, 0.7) 0%, rgba(0, 0, 0, 0.8) 100%);
    backdrop-filter: blur(2px);
    z-index: 1;
    mix-blend-mode: multiply;
  }
  
  /* Efeito de textura sutil para disfarçar baixa qualidade */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/assets/images/texture.png');
    opacity: 0.1;
    z-index: 2;
    pointer-events: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 70vh;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 60vh;
    min-height: 400px;
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 3;
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
