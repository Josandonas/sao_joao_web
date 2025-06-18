import styled from 'styled-components';

export const Container = styled.div`
    margin: 0;
    padding: 0;
    padding-bottom: 6rem;
    background-color: #fff;
    width: 100%;
    @media (max-width: 768px) {
        padding: 0;
        padding-bottom: 3rem;
    }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

export const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
`;

export const Section = styled.section`
  margin-bottom: 3rem;
`;

export const ContentLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 5rem;
  padding: 0 1rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    margin-top: 2rem;
  }
  
  @media (max-width: 768px) {
    margin-top: 1rem;
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

export const CalendarSection = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  
  @media (max-width: 1024px) {
    max-width: 100%;
    order: 1; /* Reordena para aparecer primeiro em dispositivos móveis */
  }
  
  @media (max-width: 768px) {
    min-width: unset;
  }
`;

export const EventsSection = styled.div`
  flex: 2;
  
  @media (max-width: 1024px) {
    order: 2; /* Reordena para aparecer depois do calendário em dispositivos móveis */
  }
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;
