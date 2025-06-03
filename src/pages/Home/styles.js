import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeroSection = styled.section`
  position: relative;
  height: 70vh;
  min-height: 500px;
  background-image: url('/assets/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 60vh;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 50vh;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxlarge};
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.light};
  color: white;
  margin-bottom: ${props => props.theme.spacing.md};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xlarge};
  }
`;

export const Subtitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.large};
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.normal};
  color: white;
  margin-bottom: ${props => props.theme.spacing.xl};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.medium};
  }
`;

export const ExploreButton = styled.a`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.default};
  font-size: ${props => props.theme.fontSizes.medium};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

export const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.xl};
  max-width: 1200px;
  margin: ${props => props.theme.spacing.xl} auto;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding: ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    padding: ${props => props.theme.spacing.md};
  }
`;

export const FeatureCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.lg};
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  text-align: center;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.large};
    
    & > h3 {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

export const FeatureIcon = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const FeatureTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.large};
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.sm};
  transition: color ${props => props.theme.transitions.default};
`;

export const FeatureDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.textLight};
`;
