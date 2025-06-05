import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #8c0033;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${props => props.theme.shadows.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const Logo = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xlarge};
  flex: 0 0 auto;
  margin-right: ${props => props.theme.spacing.md};
  
  a {
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    display: block;
    
    &:hover {
      color: ${props => props.theme.colors.white};
      opacity: 0.9;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: ${props => props.theme.spacing.md};
    text-align: center;
    width: 100%;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    margin-bottom: ${props => props.theme.spacing.md};
    justify-content: space-around;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const NavItem = styled.div`
  margin: 0 ${props => props.theme.spacing.sm};
  
  a {
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    padding: ${props => props.theme.spacing.sm};
    font-family: ${props => props.theme.fonts.heading};
    font-weight: ${props => props.theme.fontWeights.normal};
    transition: color ${props => props.theme.transitions.default};
    
    &:hover {
      color: ${props => props.theme.colors.white};
      opacity: 0.8;
    }
    
    &.active {
      color: ${props => props.theme.colors.primary};
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: ${props => props.theme.borderRadius.small};
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin: ${props => props.theme.spacing.xs} 0;
  }
`;

export const LanguageSelector = styled.div`
  display: flex;
  flex: 0 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    justify-content: center;
  }
`;

export const LanguageButton = styled.button`
  background: transparent;
  border: 2px solid ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.white};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin: 0 ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  border-radius: ${props => props.theme.borderRadius.small};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  &.active {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
  }
`;
