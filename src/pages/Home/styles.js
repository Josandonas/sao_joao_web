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
  background-image: url('/assets/images/header-bg.jpg');
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

export const AboutSection = styled.section`
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.sm};
  }
`;

export const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

export const AboutTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xlarge};
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.large};
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const AboutContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${props => props.theme.spacing.xl};
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const AboutImage = styled.img`
  width: 30%;
  max-width: 350px;
  height: auto;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  object-fit: cover;
  position: sticky;
  top: ${props => props.theme.spacing.xl};
  align-self: flex-start;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    max-width: 100%;
    position: relative;
    top: auto;
    max-height: 300px;
    aspect-ratio: 16/9;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const AboutText = styled.div`
  flex: 1;
  padding-right: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-right: 0;
  }
`;

export const AboutParagraph = styled.p`
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.7;
  color: ${props => props.theme.colors.text};
  text-align: justify;
`;

export const AboutSignature = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-style: italic;
  margin-top: ${props => props.theme.spacing.lg};
  text-align: right;
  color: ${props => props.theme.colors.primary};
  
  span {
    font-size: 0.9em;
    font-weight: ${props => props.theme.fontWeights.light};
    display: block;
    margin-top: 4px;
  }
`;

export const TextControls = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  z-index: 10;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    position: relative;
    justify-content: flex-end;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const TextControlButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  font-weight: bold;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${props => props.theme.colors.border};
  margin: ${props => props.theme.spacing.lg} auto;
  width: 80%;
  max-width: 1000px;
`;
