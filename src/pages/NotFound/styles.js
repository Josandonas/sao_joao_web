import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.backgroundLight};
`;

export const Content = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  max-width: 600px;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.large};
  
  p {
    font-size: ${props => props.theme.fontSizes.large};
    color: ${props => props.theme.colors.textLight};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

export const Title = styled.h1`
  font-size: 8rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin: 0;
  line-height: 1;
`;

export const Message = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  color: ${props => props.theme.colors.accent};
  margin: ${props => props.theme.spacing.md} 0;
`;

export const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: ${props => props.theme.fontWeights.bold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;
