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
  position: relative;
  z-index: 100;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const Logo = styled.div`
  flex: 0 0 auto;
  margin-right: ${props => props.theme.spacing.md};
  
  a {
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-family: var(--font-family-heading);
    font-weight: 700;
    letter-spacing: 0.5px;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin: 0 auto ${props => props.theme.spacing.md};
  }
`;

export const NavContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    width: 100%;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
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
  margin: 0 ${props => props.theme.spacing.xs};
  
  a {
    color: #FFC56E;
    text-decoration: none;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    font-family: var(--font-family-heading);
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    border-radius: ${props => props.theme.borderRadius.small};
    display: block;
    
    &:hover {
      color: #FFC56E;
      background-color: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }
    
    &.active {
      color: #8c0033;
      background-color: #FFC56E;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
      font-weight: 700;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin: ${props => props.theme.spacing.xs} 0;
  }
`;

export const LanguageSelector = styled.div`
  display: flex;
  flex: 0 0 auto;
  padding-left: ${props => props.theme.spacing.md};
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  margin-left: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    justify-content: center;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    margin-left: 0;
    padding-left: 0;
    padding-top: ${props => props.theme.spacing.sm};
    margin-top: ${props => props.theme.spacing.sm};
  }
`;

export const LanguageButton = styled.button`
  background: transparent;
  border: 2px solid #FFC56E;
  color: #FFC56E;
  font-family: var(--font-family-heading);
  font-weight: 900;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin: 0 ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  border-radius: ${props => props.theme.borderRadius.small};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }
  
  &.active {
    background-color: #FFC56E;
    color: #8c0033;
    border-color: #FFC56E;
  }
`;
