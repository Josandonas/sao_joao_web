import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #5f1530;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  margin-top: auto;
  color: white;
  
  /* Adiciona mais espaço no modo mobile para separar os elementos */
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  }
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
  
  /* Centraliza o copyright em todos os tamanhos de tela */
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    margin: ${props => props.theme.spacing.md} 0;
    padding: ${props => props.theme.spacing.md} 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const Boss = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: center;
    margin-bottom: ${props => props.theme.spacing.md};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: flex-start;
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
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: center;
    margin-top: ${props => props.theme.spacing.md};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: flex-end;
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
