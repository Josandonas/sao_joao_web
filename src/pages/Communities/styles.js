import styled, { createGlobalStyle } from 'styled-components';

// Estilo global para ocultar o texto de tradições quando estiver fora de um componente
export const TraditionFixStyle = createGlobalStyle`
  /* Oculta o texto de tradições quando estiver diretamente no body ou no container principal */
  body > *:not(.tradition-highlight):not(#root):not(#__next) > *:not(.tradition-highlight) {
    /* Procura por textos que são exatamente "Fé - tradição familiar" em diferentes idiomas e os oculta */
    &:contains("Fé - tradição familiar"), 
    &:contains("Faith - family tradition"), 
    &:contains("Fe - tradición familiar") {
      display: none !important;
    }
  }
`;

// Estilos principais do módulo de Comunidades
export const Container = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.light};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

export const Introduction = styled.div`
  max-width: 800px;
  margin: 0 auto ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.fontSizes.large};
  line-height: 1.6;
  color: ${props => props.theme.colors.textLight};
  text-align: center;
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;