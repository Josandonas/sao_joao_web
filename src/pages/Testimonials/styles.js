import styled from 'styled-components';

/**
 * Container principal da página de depoimentos
 * Usado apenas pelo componente principal (index.jsx)
 */
export const Container = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

/**
 * Título principal da página de depoimentos
 * Usa a paleta de cores vinho/burgundy com efeito de gradiente
 */
export const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: 800;
  font-size: 3rem;
  margin: 1.5rem 0 2.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.08);
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #8c0033, #b5003e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #8c0033, #b5003e);
    border-radius: 2px;
  }
`;
