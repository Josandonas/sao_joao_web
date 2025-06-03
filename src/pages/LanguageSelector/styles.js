import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url('/assets/images/bg-main.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.medium};
  text-align: center;
  max-width: 800px;
  width: 90%;
  box-shadow: ${props => props.theme.shadows.large};
`;

export const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.light};
`;

export const LanguageOptions = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const LanguageButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-image: url(${props => props.bgImage});
  background-size: contain;
  background-position: top center;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  width: 180px;
  height: 180px;
  padding-top: 140px;
  cursor: pointer;
  transition: transform ${props => props.theme.transitions.default};
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.text};
  
  &:hover {
    transform: scale(1.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: ${props => props.theme.spacing.md};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
