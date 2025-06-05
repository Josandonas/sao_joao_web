import styled from 'styled-components';

export const Container = styled.div`
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
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #8c0033, #b5003e);
  }
  
  /* Removemos o ícone de fogo e adicionamos um efeito de gradiente sutil */
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
`;

export const PageTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  color: #8c0033;
  background: linear-gradient(135deg, #8c0033, #b5003e);
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
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, #8c0033, #b5003e);
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
  background: linear-gradient(135deg, #8c0033, #b5003e);
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
    background: linear-gradient(135deg, #a00039, #cc0049);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(140, 0, 51, 0.35);
  }
  
  &:active {
    transform: translateY(0);
    background: linear-gradient(135deg, #800030, #b5003e);
    box-shadow: 0 2px 4px rgba(140, 0, 51, 0.2);
  }
`;
