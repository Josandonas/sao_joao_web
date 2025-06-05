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
  background-image: url('/assets/images/header-bg.jpeg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
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
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4AcGEgMz/1+joQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABG0lEQVRo3u3ZUY7CMAwF0BeqLqC9/3UQC7qo+mFSQBhK2jh2yPNvRzp+UpDTNE1TSinl/8tae5K15Om9qc9SyjRXE878HufcUh/vPR5H2xhjXP19a609/X7GUlprT8/nnM/xG9q27XuBew+wA2MMIzJ79BN7Vl9rmOicUzrn/l77hxoRkSPFqYisGpEzF9aK5VdrqYjMVrsjopKtZoJHZM+GqkXkqE0RETOxa7FWRLZ224qYiCOg60ZkVq2IiIx9m54FWiIia4tWFRHZOmuoiKi0dHZnrVoRU5HZoGtHZDYp1Y6JSiXW2r9E5F9nahtFSEVERcSEVERMSEXEhFRETEhFxIRURExIRcSEVERMSC1ExIRURExIRcSEVEQsSOUHcKyLQx1z4WMAAAAASUVORK5CYII=');
    opacity: 0.05;
    z-index: 2;
    pointer-events: none;
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
  z-index: 3; /* Aumentado para ficar acima do efeito de textura */
  max-width: 800px;
  padding: ${props => props.theme.spacing.lg};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 107, 1, 0.3);
  
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
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.4);
  letter-spacing: 0.5px;
  
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
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 255, 255, 0.3);
  opacity: 0.9;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  
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

export const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  max-width: 1300px;
  margin: ${props => props.theme.spacing.xxl} auto;
  position: relative;
  
  /* Elemento decorativo que remete à tradição */
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 8px;
    top: -20px;
    left: 0;
    background: linear-gradient(90deg, 
      transparent, 
      ${props => props.theme.colors.primary}55, 
      ${props => props.theme.colors.primary}, 
      ${props => props.theme.colors.primary}55, 
      transparent
    );
    border-radius: 8px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    padding: ${props => props.theme.spacing.lg};
    grid-gap: ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    padding: ${props => props.theme.spacing.md};
    grid-gap: ${props => props.theme.spacing.md};
  }
`;

export const FeatureCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  background: linear-gradient(to bottom, #ffffff, #fcf8f3);
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  text-align: center;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  transition: all ${props => props.theme.transitions.default};
  position: relative;
  overflow: hidden;
  border: 1px solid #f0e9e0;
  
  /* Elemento decorativo que remete às tradições culturais */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right, #ff6b01, #a70000);
    opacity: 0.7;
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.large}, 0 10px 30px rgba(255, 107, 1, 0.15);
    border-color: rgba(255, 107, 1, 0.3);
    
    &::before {
      transform: scaleX(1);
    }
    
    & > h3 {
      color: ${props => props.theme.colors.primary};
    }
  }
  
  &:focus-visible {
    outline: 3px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const FeatureIcon = styled.img`
  width: 90px;
  height: 90px;
  object-fit: contain;
  margin-bottom: ${props => props.theme.spacing.lg};
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease, filter 0.3s ease;
  
  ${FeatureCard}:hover & {
    transform: scale(1.1);
    filter: drop-shadow(0 6px 12px rgba(255, 107, 1, 0.25));
  }
`;

export const FeatureTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.large};
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: #800000;
  transition: color ${props => props.theme.transitions.default};
  position: relative;
  padding-bottom: 10px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 50px;
    height: 2px;
    background-color: #ff6b01;
    transform: translateX(-50%);
    opacity: 0.7;
  }
  
  ${FeatureCard}:hover & {
    color: ${props => props.theme.colors.primary};
    
    &::after {
      width: 80px;
      opacity: 1;
      transition: width 0.3s ease, opacity 0.3s ease;
    }
  }
`;

export const FeatureDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  max-width: 90%;
  margin: 0 auto;
  transition: color 0.3s ease;
  
  ${FeatureCard}:hover & {
    color: ${props => props.theme.colors.text};
  }
`;

export const AboutSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.xl};
  position: relative;
  overflow: hidden; /* Para garantir que os elementos não ultrapassem os limites */
  --font-size: 16px; /* Valor padrão, será sobrescrito via JavaScript */
  background-color: transparent; /* Garantir que o fundo seja transparente */

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    z-index: -1;
  }
  
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
  font-size: ${props => props.theme.fontSizes.xxlarge};
  font-family: ${props => props.theme.fonts.heading};
  color: #8c0033;
  margin-bottom: ${props => props.theme.spacing.xxl};
  text-align: center;
  position: relative;
  padding-bottom: ${props => props.theme.spacing.md};
  letter-spacing: 1px;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8);
  font-weight: bold;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height: 4px;
    background: linear-gradient(to right, transparent, #ff6b01, #8c0033, #ff6b01, transparent);
    border-radius: 3px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xlarge};
    margin-bottom: ${props => props.theme.spacing.lg};
    letter-spacing: 0.5px;
  }
`;

export const AboutContent = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.lg};
  
  /* Container da imagem */
  .image-container {
    overflow: hidden;
    border-radius: 16px;
    background-color: transparent;
    min-height: 350px; /* Altura mínima para acompanhar o texto */
    display: flex;
    align-items: center;
    transition: min-height 0.3s ease;
  }
  
  /* Ajusta a altura mínima do container da imagem baseado no tamanho da fonte */
  .about-section[style*="--font-size:18px"] .image-container {
    min-height: 380px;
  }
  
  .about-section[style*="--font-size:20px"] .image-container {
    min-height: 420px;
  }
  
  .about-section[style*="--font-size:22px"] .image-container {
    min-height: 460px;
  }
  
  .about-section[style*="--font-size:24px"] .image-container {
    min-height: 500px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    
    .image-container {
      width: 100% !important;
      max-width: 100% !important;
      min-height: auto;
      margin-right: 0 !important;
      margin-bottom: ${props => props.theme.spacing.md};
    }
  }
`;

export const AboutImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease, filter 0.3s ease;
  mix-blend-mode: multiply; /* Remove o fundo branco da imagem */
  background-color: transparent;
  border-radius: 16px;
  filter: contrast(1.05) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.15));
  
  &.blend-image {
    isolation: isolate;
  }
  
  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    max-width: 100%;
    position: relative;
    top: auto;
    max-height: 300px;
    aspect-ratio: 16/9;
  }
`;

export const AboutText = styled.div`
  flex: 1;
  max-width: 65%;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
    padding: 0;
    margin: 0;
  }
`;

export const AboutParagraph = styled.p`
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.8;
  color: #2a2a2a;
  text-align: justify;
  font-size: var(--font-size); /* Usar a variável CSS */
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
  padding-right: ${props => props.theme.spacing.md};
  transition: font-size 0.3s ease;
  
  &:first-of-type::first-letter {
    float: left;
    font-size: calc(var(--font-size) * 2.2); /* Escala relativa ao tamanho da fonte */
    line-height: 0.8;
    margin-right: 8px;
    margin-top: 4px;
    color: #8c0033;
    font-family: ${props => props.theme.fonts.heading};
    font-weight: bold;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  }
`;

export const AboutSignature = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-style: italic;
  margin-top: ${props => props.theme.spacing.lg};
  text-align: right;
  color: #8c0033; /* Usando a mesma cor bordô do cabeçalho e rodapé */
  font-weight: ${props => props.theme.fontWeights.bold};
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  font-size: var(--font-size); /* Usar a variável CSS */
  transition: font-size 0.3s ease;
  
  span {
    font-size: calc(var(--font-size) * 0.9);
    font-weight: ${props => props.theme.fontWeights.normal};
    display: block;
    margin-top: 4px;
    color: #541c1c; /* Cor mais escura para o título da curadora */
  }
`;

export const TextControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin: ${props => props.theme.spacing.md} auto ${props => props.theme.spacing.lg};
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: fit-content;
`;

export const TextControlButton = styled.button`
  background-color: #8c0033;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  font-weight: bold;
  font-size: 15px;
  margin: 0 2px;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: scale(1.1);
  }
  
  &:focus {
    outline: 2px solid rgba(140, 0, 51, 0.5);
    outline-offset: 2px;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const Divider = styled.hr`
  border: 0;
  height: 2px;
  background: linear-gradient(to right, transparent, ${props => props.theme.colors.border}, transparent);
  margin: ${props => props.theme.spacing.xxl} auto;
  width: 85%;
  max-width: 900px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background-image: url('/assets/images/ui/ponto.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
