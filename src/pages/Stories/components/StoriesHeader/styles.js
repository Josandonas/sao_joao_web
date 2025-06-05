import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 2rem;
  position: relative;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.secondary}22 0%, 
    ${props => props.theme.colors.primary}44 100%);
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
    height: 4px;
    background: ${props => props.theme.colors.primary};
  }
  
  &::after {
    content: '\ud83d\udd25';
    position: absolute;
    bottom: -10px;
    right: 20px;
    font-size: 40px;
    opacity: 0.2;
    transform: rotate(15deg);
  }
`;

export const PageTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  color: ${props => props.theme.colors.primary};
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
    background-color: ${props => props.theme.colors.accent};
    border-radius: 2px;
    margin-top: ${props => props.theme.spacing.sm};
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  display: flex;
  justify-content: center;
  width: 100%;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: ${props => props.theme.spacing.sm};
  }
`;

export const AddStoryButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: 2px solid ${props => props.theme.colors.primary}80;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  
  .plus-icon {
    font-size: 1.4em;
    font-weight: bold;
    margin-right: 2px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
  }
  
  &:hover {
    background-color: ${props => props.theme.colors.accentDark || props.theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
    border-color: ${props => props.theme.colors.primary};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;
