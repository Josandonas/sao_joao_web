// Reexportação de todos os estilos para facilitar importações
export * from './BookCoverStyles';
export * from './BookReaderStyles';
export * from './ActionButtonStyles';

// Estilos gerais do livro
import styled from 'styled-components';

// Container principal
export const Container = styled.div`
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  width: 100%;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.7);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  }
`;

// Título principal
export const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: calc(${props => props.theme.fontSizes.xlarge} * 0.9);
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.75rem 0;
  padding: 0;
  text-align: center;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    margin: 0.5rem auto 0;
    border-radius: 2px;
  }
`;

// Texto de introdução
export const Introduction = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.text};
  line-height: 1.8;
  margin-bottom: ${props => props.theme.spacing.xxl};
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.medium};
  }
`;
