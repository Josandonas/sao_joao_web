import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.xs};
    align-items: flex-start;
    overflow-y: auto;
    padding-top: 20px;
  }
`;

export const FormContainer = styled.form`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  width: 100%;
  max-width: 800px;
  max-height: 85vh;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.xl};
  position: relative;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 0.4s ease-out;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.md};
    max-height: 90vh;
    border-radius: ${props => props.theme.borderRadius.medium};
  }
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.lightGray};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #5f1530, #b5003e);
    border-radius: 10px;
  }
`;

export const FormTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  color: #5f1530;
  background: linear-gradient(135deg, #5f1530, #b5003e);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: ${props => props.theme.spacing.xl};
  position: relative;
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.xlarge};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.large};
    margin-bottom: ${props => props.theme.spacing.md};
    padding-right: 30px; /* Espaço para o botão de fechar */
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #5f1530, #b5003e);
    border-radius: 2px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const Label = styled.label`
  display: block;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.text};
`;

export const RequiredField = styled.span`
  color: #5f1530;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: ${props => props.theme.fontSizes.medium};
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #5f1530;
    box-shadow: 0 0 0 2px rgba(140, 0, 51, 0.2);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: ${props => props.theme.fontSizes.medium};
  transition: border-color 0.3s ease;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #5f1530;
    box-shadow: 0 0 0 2px rgba(140, 0, 51, 0.2);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column-reverse;
    gap: ${props => props.theme.spacing.sm};
    margin-top: ${props => props.theme.spacing.md};
  }
`;

export const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.medium};
  cursor: pointer;
  transition: all 0.3s ease;
`;

export const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #5f1530, #b5003e);
  color: white;
  border: none;
  box-shadow: 0 4px 8px rgba(140, 0, 51, 0.3);
  
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

export const CancelButton = styled(Button)`
  background-color: transparent;
  color: #5f1530;
  border: 1px solid rgba(140, 0, 51, 0.3);
  
  &:hover {
    background-color: rgba(140, 0, 51, 0.05);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
    background-color: rgba(140, 0, 51, 0.1);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 24px;
  font-weight: 700;
  background-color: white;
  border: 2px solid #5f1530;
  color: #5f1530;
  cursor: pointer;
  z-index: 10;
  line-height: 1;
  padding: 0;
  height: 42px;
  width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(140, 0, 51, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    background-color: #f9f9f9;
    box-shadow: 0 4px 12px rgba(140, 0, 51, 0.3);
  }
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  margin-bottom: ${props => props.theme.spacing.lg};
  gap: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: ${props => props.theme.spacing.md};
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const TabButton = styled.button`
  background: ${props => props['data-active'] === 'true' ? 'linear-gradient(135deg, #5f1530, #b5003e)' : 'transparent'};
  color: ${props => props['data-active'] === 'true' ? 'white' : props.theme.colors.text};
  border: ${props => props['data-active'] === 'true' ? 'none' : `1px solid ${props.theme.colors.lightGray}`};
  box-shadow: ${props => props['data-active'] === 'true' ? '0 4px 8px rgba(140, 0, 51, 0.2)' : 'none'};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => `${props.theme.borderRadius.medium} ${props.theme.borderRadius.medium} 0 0`};
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;
  margin-bottom: -1px;
  transition: all 0.2s ease;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    font-size: ${props => props.theme.fontSizes.small};
    margin: 0 2px -1px;
    flex-grow: 1;
  }
  
  &:hover {
    background: ${props => props['data-active'] === 'true' ? 'linear-gradient(135deg, #a00039, #cc0049)' : 'rgba(140, 0, 51, 0.05)'};
  }
`;
