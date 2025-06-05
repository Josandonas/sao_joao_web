import styled from 'styled-components';

export const Card = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all ${props => props.theme.transitions.default};
  cursor: pointer;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, 
      ${props => props.theme.colors.primary}, 
      ${props => props.theme.colors.accent});
    opacity: 0.8;
    transition: height 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: ${props => props.theme.shadows.large};
    
    &::before {
      height: 6px;
    }
  }
`;

export const Title = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} 
           ${props => props.theme.spacing.sm};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  position: relative;
  margin: 0;
  line-height: 1.4;
  
  &::after {
    content: '→';
    position: absolute;
    right: ${props => props.theme.spacing.md};
    bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.accent};
    font-size: 1.2em;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }
  
  ${Card}:hover &::after {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Excerpt = styled.p`
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.md};
  line-height: 1.6;
  font-size: ${props => props.theme.fontSizes.medium};
  margin: 0;
  flex-grow: 1;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: linear-gradient(to bottom, transparent, white);
  }
`;
