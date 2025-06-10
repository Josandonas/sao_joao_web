import styled from 'styled-components';

export const AboutSection = styled.section`
  margin-top: ${props => props.theme.spacing.xl}; 
  position: relative;
  overflow: hidden; /* Para garantir que os elementos não ultrapassem os limites */
  --font-size: 16px; /* Valor padrão, será sobrescrito via JavaScript */
  background-color: transparent; /* Garantir que o fundo seja transparente */
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

export const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  position: relative;
  align-items: center;
  padding: 0;
  max-width: calc(90% + 24px); /* Mesma largura que os cards do Features ocupam juntos + o gap */
  
  @media (max-width: 1200px) {
    max-width: calc(90% + 20px); /* Ajustado para o gap de 20px em telas menores */
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: calc(100% - 24px);
  }
`;
export const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin: 0 auto;
  gap: 16px; /* Espaçamento entre os controles e o conteúdo */
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: ${props => props.theme.spacing.lg};
  box-shadow: 0 10px 30px rgba(140, 0, 51, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  
  /* Estilo para o wrapper que contém imagem e texto */
  .content-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 24px; /* Mesmo gap usado no FeaturesSection */
    width: 100%;
  }
  
  /* Container da imagem */
  .image-container {
    overflow: hidden;
    border-radius: 50px;
    background: linear-gradient(135deg, #ffcb99 0%, #ffe4d3 100%); /* Gradiente suave */
    height: 100%; /* Altura ligeiramente maior */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    width: 100%;
    max-width: 600px;
    position: sticky;
    top: 40px;
    align-self: center; /* Alinha verticalmente com o texto */
    margin-right: 24px;
    box-shadow: 0 12px 28px rgba(140, 0, 51, 0.15), 0 8px 10px rgba(140, 0, 51, 0.08);
    padding: 0;
    border: 4px solid white;
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
  height: 420px; /* Altura fixa igual à imagem */
  overflow-y: auto;
  padding: ${props => props.theme.spacing.md};
  scrollbar-width: thin;
  scrollbar-color: rgba(140, 0, 51, 0.6) rgba(255, 255, 255, 0.3);
  position: relative;
  align-self: center; /* Alinha verticalmente com a imagem */
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
  
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
  margin-bottom: ${props => props.theme.spacing.md}; /* Reduzido de lg para md */
  line-height: 1.8;
  color: #2a2a2a;
  text-align: justify;
  font-size: var(--font-size); /* Usar a variável CSS */
  padding-right: ${props => props.theme.spacing.md};
  transition: font-size 0.3s ease;
  position: relative;
  
  &:not(:last-of-type)::after {
    content: '•';
    display: block;
    text-align: center;
    color: #5f1530;
    opacity: 1.5;
    margin-top: -8px; /* Espaço negativo para aproximar o ponto do parágrafo */
    margin-bottom: -8px; /* Espaço negativo para aproximar o ponto do próximo parágrafo */
  }
  
  &:first-of-type::first-letter {
    float: left;
    font-size: calc(var(--font-size) * 2.5); /* Escala relativa ao tamanho da fonte */
    line-height: 0.8;
    margin-right: 8px;
    margin-top: 4px;
    color: #5f1530;
    font-family: ${props => props.theme.fonts.heading};
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  strong, b {
    color: #541c1c;
  }
  
  em, i {
    color: #5f1530;
    font-style: italic;
  }
`;

export const TextControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  align-self: flex-end;
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 6px 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 4px 8px;
  }
`;

export const TextControlButton = styled.button`
  background: linear-gradient(135deg, #5f1530, #b5003e);
  color: white;
  border: 2px solid white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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
