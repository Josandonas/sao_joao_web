import styled from 'styled-components';

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
  align-items: center; /* Centraliza verticalmente os elementos */
  justify-content: space-between;
  gap: ${props => props.theme.spacing.lg};
  
  /* Container da imagem */
  .image-container {
    overflow: hidden;
    border-radius: 16px;
    background-color: #ffcb99; /* Cor de fundo mais clara que combina melhor com a arte */
    height: 400px; /* Altura fixa para garantir proporcionalidade */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    width: 30%;
    max-width: 300px;
    position: sticky;
    top: 40px;
    align-self: center; /* Alinha verticalmente com o texto */
    margin-right: 32px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    padding: 0;
  }
  
  .blend-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    transition: transform 0.3s ease, filter 0.3s ease;
    mix-blend-mode: multiply; /* Remove o fundo branco da imagem */
    background-blend-mode: multiply;
    border-radius: 16px;
    filter: contrast(1.15) brightness(1.05) saturate(1.05);
    isolation: isolate;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  /* Ajusta a altura mínima do container da imagem baseado no tamanho da fonte */
  .about-section[style*="--font-size:18px"] & .image-container {
    min-height: 380px;
  }
  
  .about-section[style*="--font-size:20px"] & .image-container {
    min-height: 420px;
  }
  
  .about-section[style*="--font-size:22px"] & .image-container {
    min-height: 460px;
  }
  
  .about-section[style*="--font-size:24px"] & .image-container {
    min-height: 500px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    
    .image-container {
      width: 100% !important;
      max-width: 320px !important;
      height: 320px;
      margin: 0 auto ${props => props.theme.spacing.md};
      position: relative;
      top: auto;
      border-radius: 50%;
      overflow: hidden;
    }
    
    .blend-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

export const AboutText = styled.div`
  flex: 1;
  max-width: 65%;
  height: 400px; /* Altura fixa igual à imagem */
  overflow-y: auto;
  padding-right: ${props => props.theme.spacing.md};
  padding-left: ${props => props.theme.spacing.sm};
  scrollbar-width: thin;
  scrollbar-color: rgba(140, 0, 51, 0.6) rgba(255, 255, 255, 0.3);
  position: relative;
  align-self: center; /* Alinha verticalmente com a imagem */
  
  /* Estilização da barra de rolagem para navegadores webkit (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(140, 0, 51, 0.6);
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  
  /* Indicador visual de rolagem */
  &::after {
    content: '⌄';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    color: rgba(140, 0, 51, 0.8);
    animation: bounce 2s infinite;
    pointer-events: none;
    opacity: 0.8;
    display: none;
  }
  
  &.has-overflow::after {
    display: block;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
    height: 350px;
    margin: 0 auto;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 300px;
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
