import styled, { keyframes } from 'styled-components';

export const ModalOverlay = styled.div`
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
  padding: 1rem;
  
  @media (max-width: 480px) {
    padding: 0;
    align-items: flex-start;
    overflow-y: auto;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const FormContainer = styled.div`
  background-color: white;
  width: 90%;
  max-width: 600px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-out;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 1.25rem;
    max-height: 85vh;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    border-radius: 0;
    margin-top: 0;
    padding: 1rem 0.75rem;
    max-height: 100vh;
    height: auto;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 28px;
  font-weight: 700;
  background-color: white;
  border: 2px solid #5f1530;
  color: #5f1530;
  cursor: pointer;
  z-index: 10;
  line-height: 1;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 3px 10px rgba(140, 0, 51, 0.25);
  transition: all 0.3s ease;
  padding: 0;
  
  & > svg {
    width: 28px;
    height: 28px;
  }
  
  &:hover {
    transform: scale(1.1);
    background-color: #f9f9f9;
    box-shadow: 0 5px 15px rgba(140, 0, 51, 0.35);
  }
  
  @media (max-width: 768px) {
    height: 40px;
    width: 40px;
    
    & > svg {
      width: 24px;
      height: 24px;
    }
  }
  
  @media (max-width: 480px) {
    height: 36px;
    width: 36px;
    top: 8px;
    right: 8px;
    
    & > svg {
      width: 20px;
      height: 20px;
    }
  }
`;



export const FormTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: 700;
  color: transparent;
  background: linear-gradient(135deg, #5f1530, #b5003e);
  -webkit-background-clip: text;
  background-clip: text;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: center;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
    padding-bottom: 0.4rem;
    margin-top: 0.5rem;
  }
`;



export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  .form-actions {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
    
    .form-actions {
      margin-top: 0.75rem;
      margin-bottom: 0.5rem;
    }
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  
  @media (max-width: 480px) {
    gap: 0.3rem;
    margin-bottom: 0.15rem;
  }
`;

export const Label = styled.label`
  font-weight: 600;
  color: #495057;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const Input = styled.input.attrs(props => ({
  // Convertendo hasError para data-has-error para evitar warning do React
  'data-has-error': props.hasError ? 'true' : 'false',
  // Removendo hasError para não ser passado ao elemento DOM
  hasError: undefined
}))`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props['data-has-error'] === 'true' ? '#dc3545' : '#ced4da'};
  border-radius: 4px;
  font-size: 0.9rem;
  width: 100%;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: #5f1530;
    box-shadow: 0 0 0 0.2rem rgba(158, 33, 70, 0.25);
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
    border-radius: 3px;
    
    &:focus {
      box-shadow: 0 0 0 0.15rem rgba(158, 33, 70, 0.25);
    }
  }
`;

export const TextArea = styled.textarea.attrs(props => ({
  // Convertendo hasError para data-has-error para evitar warning do React
  'data-has-error': props.hasError ? 'true' : 'false',
  // Removendo hasError para não ser passado ao elemento DOM
  hasError: undefined
}))`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props['data-has-error'] === 'true' ? '#dc3545' : '#ced4da'};
  border-radius: 4px;
  font-size: 0.9rem;
  width: 100%;
  min-height: 80px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #5f1530;
    box-shadow: 0 0 0 0.2rem rgba(158, 33, 70, 0.25);
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
    min-height: 60px;
    border-radius: 3px;
    
    &:focus {
      box-shadow: 0 0 0 0.15rem rgba(158, 33, 70, 0.25);
    }
  }
`;

export const Select = styled.select.attrs(props => ({
  // Convertendo hasError para data-has-error para evitar warning do React
  'data-has-error': props.hasError ? 'true' : 'false',
  // Removendo hasError para não ser passado ao elemento DOM
  hasError: undefined
}))`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props['data-has-error'] === 'true' ? '#dc3545' : '#ced4da'};
  border-radius: 4px;
  font-size: 0.9rem;
  width: 100%;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #5f1530;
    box-shadow: 0 0 0 0.2rem rgba(158, 33, 70, 0.25);
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
    border-radius: 3px;
    
    &:focus {
      box-shadow: 0 0 0 0.15rem rgba(158, 33, 70, 0.25);
    }
  }
`;

export const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-top: 0.15rem;
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, #5f1530, #b5003e);
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  box-shadow: 0 2px 6px rgba(140, 0, 51, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #a00039, #cc0049);
    box-shadow: 0 3px 8px rgba(140, 0, 51, 0.35);
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
    border-radius: 5px;
    box-shadow: 0 1px 4px rgba(140, 0, 51, 0.3);
    
    &:hover {
      box-shadow: 0 2px 6px rgba(140, 0, 51, 0.35);
    }
  }
`;

export const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  background: linear-gradient(135deg, #5f1530, #b5003e);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin-top: 0.25rem;
  box-shadow: 0 2px 6px rgba(140, 0, 51, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #a00039, #cc0049);
    box-shadow: 0 3px 8px rgba(140, 0, 51, 0.35);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }
  
  @media (max-width: 480px) {
    padding: 0.35rem 0.7rem;
    font-size: 0.85rem;
    border-radius: 5px;
    box-shadow: 0 1px 4px rgba(140, 0, 51, 0.3);
    margin-top: 0.15rem;
    
    &:hover {
      box-shadow: 0 2px 6px rgba(140, 0, 51, 0.35);
      transform: translateY(-1px);
    }
  }
`;

export const HiddenFileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const SelectedFileName = styled.span`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #495057;
`;

export const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ErrorAlert = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
