import styled from 'styled-components';
import { transparentize } from 'polished';

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

export const ContentLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

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

export const FilterSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;
