import styled from 'styled-components';
import { transparentize } from 'polished';

// Container principal
export const Container = styled.div`
  margin: 0;
  padding: 0;
  padding-bottom: 6rem;
  background-color: #fff;
  width: 100%;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

// Layout de conteúdo
export const ContentLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Container de título
export const TitleContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, rgba(235, 234, 234), rgba(219, 219, 219));
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #ff6b01, #800000);
  }
`;

// Título
export const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  background: linear-gradient(135deg, #ff6b01, #ff6b01);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  display: inline-block;
  padding-bottom: ${props => props.theme.spacing.sm};
  letter-spacing: 1px;
  max-width: 90%;
  line-height: 1.1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, #ff6b01, #800000);
    border-radius: 2px;
    margin-top: ${props => props.theme.spacing.sm};
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

// Seção Sobre
export const AboutSection = styled.div`
  background-color: ${({ theme }) => transparentize(0.92, theme.colors.primary)};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2.5rem;
  text-align: center;
  position: relative;
  
  &::before {
    content: '"';
    font-size: 5rem;
    color: ${({ theme }) => transparentize(0.8, theme.colors.primary)};
    position: absolute;
    top: -1.5rem;
    left: 1rem;
    font-family: Georgia, serif;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
`;

// Texto da seção Sobre
export const AboutText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 900px;
  margin: 0 auto;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

// Grid para exibição dos cards da biblioteca
export const BibliotecaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// Container para a paginação
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  
  .pagination {
    .page-item {
      .page-link {
        color: var(--text-color);
        border-color: var(--border-color);
        
        &:hover {
          background-color: var(--light-bg-hover);
        }
      }
      
      &.active .page-link {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        color: white;
      }
      
      &.disabled .page-link {
        color: var(--text-muted);
        pointer-events: none;
        cursor: not-allowed;
      }
    }
  }
`;
