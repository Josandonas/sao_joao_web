import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const PaginationButton = styled.button`
  background-color: ${props => props.active ? '#0d6efd' : 'white'};
  color: ${props => props.active ? 'white' : '#0d6efd'};
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.65 : 1};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.disabled ? 'white' : (props.active ? '#0b5ed7' : '#e9ecef')};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
`;

export const PageInfo = styled.div`
  margin: 0 1rem;
  color: #6c757d;
  font-size: 0.875rem;
`;

export const PageNumber = styled.button`
  background-color: ${props => props.active ? '#0d6efd' : 'white'};
  color: ${props => props.active ? 'white' : '#0d6efd'};
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#0b5ed7' : '#e9ecef'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
`;

export const PageEllipsis = styled.span`
  padding: 0.5rem 0.75rem;
  color: #6c757d;
`;

export const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  color: #6c757d;
  
  svg {
    margin-right: 0.5rem;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin: 2rem 0;
  text-align: center;
`;
