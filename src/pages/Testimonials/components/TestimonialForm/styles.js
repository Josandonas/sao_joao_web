import styled, { keyframes } from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  @keyframes slideIn {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @media (max-width: 768px) {
    width: 95%;
    max-height: 95vh;
    border-radius: 10px;
    margin: 0 10px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    margin: 0 5px;
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

export const RecordButton = styled.button`
  display: block;
  margin: 2.5rem auto;
  padding: 0.9rem 2.2rem;
  background-color: #5f1530;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  z-index: 1;
  letter-spacing: 0.5px;
  
  &:before {
    content: '📍';
    font-size: 1.4rem;
    line-height: 0;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: -10%;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, rgba(160, 0, 60, 0.8), rgba(120, 0, 42, 1));
    z-index: -1;
    transform: skew(-10deg);
    transition: width 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(140, 0, 51, 0.4);
    
    &:after {
      width: 110%;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
    padding: 0.8rem 1.8rem;
  }
`;

export const RecordingForm = styled.form`
  padding: 2.5rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #5f1530, #b5003e);
  }
  
  @media (max-width: 480px) {
    padding: 2rem 1rem 1.5rem;
  }
`;

export const FormTitle = styled.h3`
  font-size: 1.6rem;
  color: #5f1530;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
  padding: 0 50px;
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
    padding-right: 40px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  small {
    display: block;
    margin-top: 0.5rem;
    color: #777;
    font-size: 0.8rem;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #444;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #5f1530;
    box-shadow: 0 0 0 2px rgba(140, 0, 51, 0.2);
  }
  
  ${props => props.as === "select" && `
    height: 45px;
    background-color: white;
  `}
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #5f1530;
    box-shadow: 0 0 0 2px rgba(140, 0, 51, 0.2);
  }
`;

export const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
  gap: 10px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const FileUploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #5f1530, #b5003e);
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 3px 6px rgba(140, 0, 51, 0.2);
  white-space: nowrap;
  width: 100%;
  
  @media (min-width: 768px) {
    width: auto;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(140, 0, 51, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const FileUploadIcon = styled.span`
  font-size: 1.2rem;
`;

export const FileNameDisplay = styled.div`
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
  color: #555;
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  border: 1px solid #ddd;
  word-break: break-all;
  
  @media (min-width: 768px) {
    white-space: nowrap;
    word-break: normal;
  }
`;

// Animação para o spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Componente para exibir feedback do formulário
export const FormFeedback = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin: 1.5rem 0;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  animation: fadeIn 0.3s ease;
  
  ${({ status }) => {
    if (status === 'success') {
      return `
        background-color: #e8f5e9;
        color: #2e7d32;
        border: 1px solid #a5d6a7;
      `;
    } else if (status === 'error') {
      return `
        background-color: #ffebee;
        color: #c62828;
        border: 1px solid #ef9a9a;
      `;
    } else if (status === 'warning') {
      return `
        background-color: #fff8e1;
        color: #f57f17;
        border: 1px solid #ffe082;
      `;
    }
    return '';
  }}
`;

// Ícone de status
export const StatusIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 1.2rem;
`;

export const SubmitButton = styled.button`
  background-color: #5f1530;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto 0;
  width: 100%;
  
  @media (min-width: 768px) {
    width: auto;
    min-width: 200px;
    padding: 0.8rem 2rem;
  }
  
  &:hover:not(:disabled) {
    background-color: #6c0026;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(140, 0, 51, 0.3);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  .spinner {
    animation: ${spin} 1s linear infinite;
    margin-right: 8px;
  }
`;
