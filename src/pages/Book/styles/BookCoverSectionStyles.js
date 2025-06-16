import styled from 'styled-components';

/**
 * Estilos para o componente BookCoverSection
 */

// Componentes estilizados para os botões de ação
export const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* Usar attrs para transformar a prop primary em um atributo de dados válido */
  background-color: ${props => props.primary ? '#007bff' : '#f8f9fa'};
  border: 1px solid ${props => props.primary ? '#007bff' : '#dee2e6'};
  color: ${props => props.primary ? 'white' : '#495057'};
  
  &:hover {
    background-color: ${props => props.primary ? '#0069d9' : '#e9ecef'};
    border-color: ${props => props.primary ? '#0062cc' : '#dee2e6'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  svg {
    font-size: 1rem;
  }
`;

export const ShareStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  
  background-color: ${props => props.success ? '#d4edda' : props.error ? '#f8d7da' : 'transparent'};
  color: ${props => props.success ? '#155724' : props.error ? '#721c24' : 'inherit'};
  border: 1px solid ${props => props.success ? '#c3e6cb' : props.error ? '#f5c6cb' : 'transparent'};
`;
