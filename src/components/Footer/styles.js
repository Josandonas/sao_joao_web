import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #5f1530;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  margin-top: auto;
  color: white;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export const Boss = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: ${props => props.theme.spacing.md};
    justify-content: space-around;
  }
`;

export const PrefeituraLogo = styled.img`
  height: 50px;
  width: auto;
  filter: brightness(0) invert(1);
  transition: all 0.3s ease;
  padding-left: 4px;
  &:hover {
    transform: scale(1.05);
  }
`;

export const Parteners = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: ${props => props.theme.spacing.md};
    justify-content: space-around;
  }
`;
export const FundaCulturaLogo = styled.img`
  height: 70px;
  width: auto;
  filter: brightness(0) invert(1);
  transition: all 0.3s ease;
  padding-left: 15px;
  &:hover {
    transform: scale(1.05);
  }
`;
