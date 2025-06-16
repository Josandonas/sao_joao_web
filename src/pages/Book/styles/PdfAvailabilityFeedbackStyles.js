import styled from 'styled-components';

/**
 * Estilos para o componente PdfAvailabilityFeedback
 */

export const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 2rem auto;
`;

export const FeedbackIcon = styled.div`
  color: ${props => props.error ? '#dc3545' : '#ffc107'};
  margin-bottom: 1rem;
`;

export const FeedbackTitle = styled.h3`
  font-size: 1.5rem;
  color: #343a40;
  margin-bottom: 1rem;
`;

export const FeedbackText = styled.p`
  color: #495057;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const FeedbackActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const FeedbackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.primary ? `
    background-color: #007bff;
    border: 1px solid #007bff;
    color: white;
    
    &:hover {
      background-color: #0069d9;
      border-color: #0062cc;
    }
  ` : `
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    color: #495057;
    
    &:hover {
      background-color: #e9ecef;
    }
  `}
  
  svg {
    font-size: 1rem;
  }
`;

// Estilos para o spinner
export const spinnerStyles = `
  .spinner {
    margin: 20px auto;
    width: 70px;
    text-align: center;
  }
  
  .spinner > div {
    width: 18px;
    height: 18px;
    background-color: #007bff;
    
    border-radius: 100%;
    display: inline-block;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }
  
  .spinner .bounce1 {
    animation-delay: -0.32s;
  }
  
  .spinner .bounce2 {
    animation-delay: -0.16s;
  }
  
  @keyframes sk-bouncedelay {
    0%, 80%, 100% { 
      transform: scale(0);
    } 40% { 
      transform: scale(1.0);
    }
  }
`;
