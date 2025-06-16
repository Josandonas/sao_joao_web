import styled from 'styled-components';
import { transparentize } from 'polished';

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

export const FilterButton = styled.button`
  background-color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.primary : transparentize(0.9, theme.colors.primary)};
  color: ${({ $isActive, theme }) => 
    $isActive ? '#fff' : theme.colors.primary};
  border: none;
  border-radius: 20px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ $isActive, theme }) => 
      $isActive ? theme.colors.primary : transparentize(0.8, theme.colors.primary)};
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => transparentize(0.5, theme.colors.primary)};
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
`;
