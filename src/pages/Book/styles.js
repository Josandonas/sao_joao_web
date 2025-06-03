import styled, { css } from 'styled-components';

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

export const BookViewer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 1fr;
  gap: ${props => props.theme.spacing.lg};
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
  }
`;

export const BookControls = styled.div`
  position: sticky;
  top: ${props => props.theme.spacing.lg};
  align-self: start;
  grid-column: 1 / -1;
  grid-row: 1;
  margin-bottom: ${props => props.theme.spacing.lg};
  z-index: 10;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    position: relative;
    top: 0;
  }
`;

export const PageNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.md};
  background-color: white;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.small};
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  background-color: ${props => props.disabled ? '#f0f0f0' : props.theme.colors.primary};
  color: ${props => props.disabled ? '#999' : 'white'};
  border: none;
  border-radius: 50%;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all ${props => props.theme.transitions.default};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.accent};
    transform: scale(1.1);
  }
`;

export const PageCounter = styled.div`
  margin: 0 ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.text};
`;

export const BookPages = styled.div`
  grid-column: 2;
  grid-row: 2;
  width: 100%;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-column: 1 / -1;
    grid-row: 2;
  }
`;

export const Page = styled.div`
  display: ${props => props.isActive ? 'block' : 'none'};
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  animation: ${props => props.isActive ? 'fadeIn 0.5s ease' : 'none'};
  max-width: 100%;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const PageContent = styled.div`
  padding: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const PageTitle = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
  
  .chapter {
    display: block;
    font-family: ${props => props.theme.fonts.heading};
    font-size: ${props => props.theme.fontSizes.small};
    font-weight: ${props => props.theme.fontWeights.normal};
    color: ${props => props.theme.colors.textLight};
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: ${props => props.theme.spacing.xs};
  }
  
  h2 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: ${props => props.theme.fontSizes.xlarge};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.accent};
  }
`;

export const PageImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.medium};
`;

export const PageText = styled.div`
  font-size: ${props => props.theme.fontSizes.medium};
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  background-color: rgba(255, 255, 255, 0.9);
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const ChapterNavigation = styled.div`
  grid-column: 1;
  grid-row: 2;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.md};
  position: sticky;
  top: calc(${props => props.theme.spacing.lg} * 2);
  height: fit-content;
  align-self: start;
  box-shadow: ${props => props.theme.shadows.medium};
  z-index: 5;
  
  h3 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: ${props => props.theme.fontSizes.large};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.md};
    text-align: center;
  }
  
  div {
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-row: 3;
    grid-column: 1 / -1;
    position: relative;
    top: 0;
    margin-top: ${props => props.theme.spacing.lg};
    width: 100%;
    
    div {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
`;

export const ChapterButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  text-align: left;
  background-color: ${props => props.isActive ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.isActive ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.isActive ? props.theme.colors.primary : '#ddd'};
  border-radius: ${props => props.theme.borderRadius.small};
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.isActive ? props.theme.colors.accent : 'rgba(0, 0, 0, 0.05)'};
    border-color: ${props => props.isActive ? props.theme.colors.accent : props.theme.colors.primary};
    color: ${props => props.isActive ? 'white' : props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    margin: ${props => props.theme.spacing.xs};
  }
`;
