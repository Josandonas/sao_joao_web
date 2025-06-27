import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  gap: 0.5rem;
`;

export const PaginationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: ${props => props.active ? '#8E1538' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? '#8E1538' : '#f0f0f0'};
    border-color: ${props => props.active ? '#8E1538' : '#ccc'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #8E1538;
    color: white;
    border-color: #8E1538;
  }
`;

export const PageInfo = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2.5rem;
  height: 2.5rem;
  font-size: 1rem;
  color: #666;
`;
