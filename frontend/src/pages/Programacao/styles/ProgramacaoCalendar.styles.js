import styled, { css } from 'styled-components';

export const CalendarContainer = styled.div`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 1.5rem;
  height: 100%;
  
  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: ${({ theme }) => theme.colors.primary || '#FF6B00'};
    margin-bottom: 1.5rem;
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    text-align: center;
    
    @media (max-width: 768px) {
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }
  }
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const MonthTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary || '#FF6B00'};
  text-transform: uppercase;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.large};
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const NavigationButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.secondary || '#FF9A3C'};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-family: ${({ theme }) => theme.fonts.body};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(255, 154, 60, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 154, 60, 0.3);
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    gap: 0.15rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.1rem;
  }
  
  @media (min-width: 1025px) and (max-width: 1200px) {
    gap: 0.3rem;
  }
`;

export const DayCell = styled.div`
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  position: relative;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme, ...props }) => props.$isHeader ? theme.fontWeights.bold : theme.fontWeights.normal};
  color: ${props => props.$isHeader ? '#666' : '#333'};
  background-color: ${props => {
    if (props.$isEmpty) return 'transparent';
    if (props.$isSelected) return 'rgba(255, 107, 0, 0.3)';
    if (props.$isLegacy) return 'rgba(139, 69, 19, 0.1)';
    if (props.$isActive) return 'rgba(255, 107, 0, 0.15)';
    if (props.$isToday) return 'rgba(0, 123, 255, 0.1)';
    return '#f9f9f9';
  }};
  border: ${props => {
    if (props.$isSelected) return '2px solid #FF6B00';
    if (props.$isLegacy && props.$hasEvents) return '1px dashed #8B4513';
    if (props.$isToday) return '2px solid #007bff';
    return '1px solid #eee';
  }};
  cursor: ${props => (props.$hasEvents && !props.$isEmpty) ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  
  ${props => props.$hasEvents && !props.$isEmpty && css`
    &:hover {
      background-color: rgba(255, 107, 0, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `}
  
  ${props => props.$isActive && css`
    border: 1px solid rgba(255, 107, 0, 0.5);
    font-weight: bold;
  `}
  
  ${props => props.$isSelected && css`
    font-weight: bold;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 0, 0.2);
  `}
  
  @media (max-width: 768px) {
    padding: 0.2rem;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    padding: 0.1rem;
    border-radius: 4px;
    border-width: ${props => props.$isSelected || props.$isToday ? '2px' : '1px'};
  }
`;

export const DayNumber = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const EventIndicator = styled.div`
  width: 6px;
  height: 6px;
  background-color: ${props => props.$isLegacy ? '#8B4513' : props.theme.colors.primary || '#FF6B00'};
  border-radius: 50%;
  
  @media (max-width: 768px) {
    width: 4px;
    height: 4px;
  }
`;

export const CalendarMessage = styled.div`
  background-color: rgba(255, 107, 0, 0.1);
  border-left: 4px solid ${({ theme }) => theme.colors.primary || '#FF6B00'};
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: #333;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.85rem;
  }
`;
