import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const EventListContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  padding-right: 10px;
  
  @media (max-width: 1024px) {
    margin-top: 0;
    padding-right: 0;
  }
  
  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

export const EventListHeader = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    color: ${({ theme }) => theme.colors.primary || '#FF6B00'};
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: ${({ theme }) => theme.fontSizes.large};
    }
  }
`;

export const EventItem = styled.div`
  &:hover {
    background-color: ${props => props.$active 
      ? darken(0.05, props.theme.colors.primary || '#FF6B00')
      : darken(0.05, '#f0f0f0')};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.3);
  }
`;

export const DayHeader = styled.h3`
  color: ${({ theme }) => theme.colors.secondary || '#FF9A3C'};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 2rem 0 1rem;
  text-transform: capitalize;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary || '#FF9A3C'};
  padding-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    margin: 1.5rem 0 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin: 1rem 0 0.75rem;
    padding-bottom: 0.3rem;
  }
`;

export const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

export const EventCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: ${props => {
      switch(props.$category) {
        case 'show': return '#FF6B00';
        case 'cultural': return '#3498db';
        case 'religious': return '#9b59b6';
        case 'gastronomy': return '#e67e22';
        default: return '#FF9A3C';
      }
    }};
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 8px;
  }
`;

// Componente com animação para os cards de eventos
export const AnimatedEventCard = styled(EventCard)`
  transition: all 0.5s ease;
  opacity: ${props => props.$isAnimating ? 0 : 1};
  transform: translateY(${props => props.$isAnimating ? '20px' : '0'});
`;

export const EventDate = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: ${({ theme }) => theme.fonts.body};
  color: #888;
  margin-bottom: 0.5rem;
`;

export const EventTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text || '#333'};
  margin-bottom: 0.75rem;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

export const EventTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: ${({ theme }) => theme.fonts.body};
  color: #555;
  margin-bottom: 0.5rem;
  
  svg {
    color: ${({ theme }) => theme.colors.secondary || '#FF9A3C'};
  }
`;

export const EventLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: ${({ theme }) => theme.fonts.body};
  color: #555;
  margin-bottom: 1rem;
  
  svg {
    color: ${({ theme }) => theme.colors.secondary || '#FF9A3C'};
  }
`;

export const EventDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: ${({ theme }) => theme.fonts.body};
  color: #666;
  line-height: 1.5;
  margin-top: 0.75rem;
`;

export const NoEventsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    font-size: 0.9rem;
    border-radius: 6px;
  }
`;
