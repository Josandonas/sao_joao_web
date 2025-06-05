import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 0 auto 2.5rem;
  padding: 1rem 1.5rem;
  max-width: 900px;
  background: linear-gradient(135deg, rgba(140, 0, 51, 0.8), rgba(120, 0, 42, 0.7));
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(140, 0, 51, 0.2);
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, rgba(160, 0, 60, 0.4), rgba(120, 0, 42, 0.3));
    border-radius: 52px;
    z-index: -1;
    filter: blur(4px);
  }
  
  @media (max-width: 768px) {
    margin: 0 auto 1.5rem;
    padding: 0.8rem 1rem;
    border-radius: 40px;
  }
`;

// Criando um componente de botão que filtra props para evitar erro "isActive" no DOM
const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop)
})``;  

export const FilterButton = styled(Button)`
  padding: 0.6rem 1.2rem;
  background-color: ${props => props.isActive ? '#8c0033' : 'white'};
  color: ${props => props.isActive ? 'white' : '#555'};
  border: none;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isActive ? '0 4px 10px rgba(140, 0, 51, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  transform: ${props => props.isActive ? 'translateY(-3px)' : 'none'};
  position: relative;
  overflow: hidden;
  min-width: 100px;
  z-index: 1;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0%'};
    height: 100%;
    background-color: #6c0026;
    z-index: -1;
    transition: width 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.isActive ? '#8c0033' : '#f8f8f8'};
    color: ${props => props.isActive ? 'white' : '#8c0033'};
    
    &:after {
      width: ${props => props.isActive ? '100%' : '0%'};
    }
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.5rem 0.9rem;
    min-width: auto;
  }
`;


