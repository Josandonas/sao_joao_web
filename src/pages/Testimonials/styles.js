import styled from 'styled-components';

/**
 * Container principal da página de depoimentos
 * Usado apenas pelo componente principal (index.jsx)
 */
export const Container = styled.div`
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  width: 100%;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.7);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.lg} 0;
  }
`;

/**
 * Container do header da página de depoimentos
 * Estilizado de forma semelhante ao header da página de histórias
 */
export const HeaderContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, rgba(140, 0, 51, 0.05), rgba(120, 0, 42, 0.1));
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #5f1530, #b5003e);
  }
  
  /* Efeito de gradiente sutil */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(140, 0, 51, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    z-index: 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  }
`;

/**
 * Título principal da página de depoimentos
 * Usa a paleta de cores vinho/burgundy com efeito de gradiente
 */
export const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  color: #5f1530;
  background: linear-gradient(135deg, #5f1530, #b5003e);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  display: inline-block;
  padding-bottom: ${props => props.theme.spacing.sm};
  letter-spacing: 1px;
  max-width: 90%;
  line-height: 1.1;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, #5f1530, #b5003e);
    border-radius: 2px;
    margin-top: ${props => props.theme.spacing.sm};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.xlarge};
  }
`;

export const RecordButton = styled.button`
  background: linear-gradient(135deg, #5f1530, #b5003e);
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 8px rgba(140, 0, 51, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: '🎤';
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(140, 0, 51, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(140, 0, 51, 0.3);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    z-index: -1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.small};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  }
`;

/**
 * Container para o botão de compartilhar depoimento
 */
export const ButtonWrapper = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  z-index: 1;
`;
