import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.background};
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  margin-top: auto;
  
  &::before {
    content: '';
    display: block;
    background-image: url('/assets/images/ui/titulo_deco2.png');
    background-size: contain;
    height: 12px;
    margin-bottom: ${props => props.theme.spacing.md};
  }
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
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.small};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const Partners = styled.div`
  display: flex;
  align-items: center;
  
  span {
    margin-right: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.textLight};
    font-size: ${props => props.theme.fontSizes.small};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-wrap: wrap;
    justify-content: center;
    
    span {
      width: 100%;
      margin-bottom: ${props => props.theme.spacing.sm};
      margin-right: 0;
    }
  }
`;

export const PartnerLink = styled.a`
  margin: 0 ${props => props.theme.spacing.sm};
  text-indent: -9999px;
  display: block;
  opacity: 0.7;
  transition: opacity ${props => props.theme.transitions.default};
  width: 40px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
  /* Todas as logomarcas estão em uma única imagem, usando posições diferentes para cada logo */
  &#lnkVale, &#lnkFIC, &#lnkFCMS, &#lnkGOV {
    background-image: url('/assets/images/ui/logomarcas_c.png');
  }
  
  &#lnkVale {
    background-position: 0 0;
  }
  
  &#lnkFIC {
    background-position: -40px 0;
  }
  
  &#lnkFCMS {
    background-position: -80px 0;
  }
  
  &#lnkGOV {
    background-position: -120px 0;
  }
  
  &:hover {
    opacity: 1;
  }
`;
