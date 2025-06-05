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
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.lightGray};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.accent};
    border-radius: 10px;
  }
`;

export const FormTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xl};
  position: relative;
  text-align: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${props => props.theme.colors.accent};
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
  color: ${props => props.theme.colors.accent};
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
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.accent}22;
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
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.accent}22;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
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
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  
  &:hover {
    background-color: ${props => props.theme.colors.accentDark || props.theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const CancelButton = styled(Button)`
  background-color: transparent;
  color: ${props => props.theme.colors.textLight};
  border: 1px solid ${props => props.theme.colors.lightGray};
  
  &:hover {
    background-color: ${props => props.theme.colors.lightGray};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: none;
  border: none;
  font-size: ${props => props.theme.fontSizes.xxlarge};
  color: ${props => props.theme.colors.textLight};
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  margin-bottom: ${props => props.theme.spacing.lg};
  gap: ${props => props.theme.spacing.sm};
`;

export const TabButton = styled.button`
  background: ${props => props.active ? props.theme.colors.accent : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: ${props => props.active ? 'none' : `1px solid ${props.theme.colors.lightGray}`};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => `${props.theme.borderRadius.medium} ${props.theme.borderRadius.medium} 0 0`};
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;
  margin-bottom: -1px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.accent : props.theme.colors.lightGray};
  }
`;
