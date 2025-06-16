/**
 * Módulo central de estilos para o módulo Book
 * 
 * Este arquivo centraliza todos os estilos do módulo Book, reexportando os componentes
 * estilizados de outros arquivos e definindo componentes estilizados comuns.
 * 
 * A estrutura de estilos foi organizada da seguinte forma:
 * - BookCoverStyles.js: Estilos relacionados à capa do livro
 * - ActionButtonStyles.js: Estilos para os botões de ação (baixar, compartilhar)
 * - index.js (este arquivo): Componentes estilizados comuns e reexportações
 */

// Reexportação de todos os estilos para facilitar importações
export * from './BookCoverStyles';
export * from './ActionButtonStyles';
export * from './BookHeaderStyles';

import styled from 'styled-components';

/**
 * Container principal da página do livro
 * 
 * Componente estilizado que envolve todo o conteúdo da página do livro,
 * fornecendo espaçamento interno e cor de fundo adequados.
 */
export const Container = styled.div`
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  width: 100%;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.7);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  }
`;

/**
 * Título principal da página do livro
 * 
 * Componente estilizado para o título principal, com efeito decorativo
 * de linha gradiente abaixo do texto.
 */
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

/**
 * Texto de introdução da página do livro
 * 
 * Componente estilizado para o texto introdutório, com tamanho de fonte
 * e espaçamento adequados para leitura confortável.
 */
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
