import styled, { keyframes } from 'styled-components';

export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const TestimonialCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const TestimonialImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 3px solid #5f1530;
`;

export const TestimonialContent = styled.div`
  padding: 1.2rem;
`;

export const TestimonialName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  color: #333;
`;

export const TestimonialLocation = styled.div`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 1rem;
  font-style: italic;
`;

export const TestimonialQuote = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.2rem;
  min-height: 100px;
`;

export const TestimonialVideo = styled.button`
  background-color: #5f1530;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  width: 100%;
  
  &:before {
    content: '▶';
    margin-right: 0.5rem;
    font-size: 0.8rem;
  }
  
  &:hover {
    background-color: #6c0026;
    box-shadow: 0 4px 8px rgba(140, 0, 51, 0.3);
  }
`;

// Animação para o spinner de carregamento
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Container para estado de carregamento
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  min-height: 300px;
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(95, 21, 48, 0.2);
    border-top: 5px solid #5f1530;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  p {
    color: #555;
    font-size: 1.1rem;
  }
`;

// Container para estado de erro
export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  min-height: 300px;
  text-align: center;
  
  p {
    color: #d32f2f;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  
  button {
    background-color: #5f1530;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #6c0026;
      box-shadow: 0 4px 8px rgba(140, 0, 51, 0.3);
    }
  }
`;

// Container para estado vazio
export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  min-height: 300px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 12px;
  
  p {
    color: #777;
    font-size: 1.1rem;
  }
`;
