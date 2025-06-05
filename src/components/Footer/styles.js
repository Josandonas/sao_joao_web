import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #8c0033;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  margin-top: auto;
  color: white;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Copyright = styled.div`
  color: white;
  font-size: ${props => props.theme.fontSizes.small};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const Partners = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: ${props => props.theme.spacing.md};
    justify-content: center;
  }
`;

export const PrefeituraLogo = styled.img`
  height: 50px;
  width: auto;
  filter: brightness(0) invert(1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;
