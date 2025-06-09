import styled from 'styled-components';

export const Container = styled.div`
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.03);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.medium};
  }
`;



export const TitleSection = styled.div`
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
