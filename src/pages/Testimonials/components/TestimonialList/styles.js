import styled, { keyframes } from 'styled-components';

/**
 * Container para a lista de depoimentos
 * Agora usa o sistema de grid do Bootstrap para responsividade
 */
export const TestimonialsContainer = styled.div`
  margin-top: 2rem;
  
  /* As classes do Bootstrap Row e Col substituem o grid CSS anterior */
`;

export const TestimonialCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%; /* Garante altura consistente */
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: 1rem;
  }
`;

export const TestimonialImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 3px solid #5f1530;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 180px;
  }
`;

export const TestimonialContent = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
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
  flex: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.9rem;
  }
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
    color: white;
    text-decoration: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
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
