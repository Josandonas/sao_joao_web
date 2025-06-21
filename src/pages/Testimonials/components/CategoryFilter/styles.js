import styled from 'styled-components';

export const FilterContainer = styled.div`
  margin: 0 auto 2rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, rgba(140, 0, 51, 0.9), rgba(120, 0, 42, 0.85));
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(140, 0, 51, 0.25);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(135deg, rgba(160, 0, 60, 0.5), rgba(120, 0, 42, 0.4));
    border-radius: 31px;
    z-index: -1;
    filter: blur(3px);
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0.7rem 0.9rem;
    max-width: 95%;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none; /* Oculta completamente em dispositivos móveis */
  }
`;

// Criando um componente de botão que filtra props para evitar erro "active" no DOM
const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop)
})`
  font-family: inherit;
`;

export const FilterButton = styled(Button)`
  padding: 0.5rem 1.2rem;
  background-color: ${props => props.active ? '#5f1530' : 'rgba(255, 255, 255, 0.95)'};
  color: ${props => props.active ? 'white' : '#444'};
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${props => props.active ? '0 3px 8px rgba(95, 21, 48, 0.4)' : '0 2px 5px rgba(0, 0, 0, 0.1)'};
  transform: ${props => props.active ? 'translateY(-2px)' : 'none'};
  position: relative;
  overflow: hidden;
  margin: 0.2rem 0.25rem;
  z-index: 1;
  letter-spacing: 0.3px;

  @media (min-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.95rem;
    margin: 0.25rem 0.35rem;
  }

  &:focus {
    outline: none;
    box-shadow: ${props => props.active
      ? '0 0 0 3px rgba(95, 21, 48, 0.3), 0 3px 8px rgba(95, 21, 48, 0.4)'
      : '0 0 0 3px rgba(95, 21, 48, 0.2), 0 2px 5px rgba(0, 0, 0, 0.1)'};
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0%'};
    height: 100%;
    background-color: #6c0026;
    z-index: -1;
    transition: width 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.active ? '#5f1530' : '#ffffff'};
    color: ${props => props.active ? 'white' : '#5f1530'};
    text-decoration: none;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &.active {
    background-color: #5f1530;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(95, 21, 48, 0.4);
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.9rem;
    padding: 0.55rem 1.2rem;
    margin: 0.2rem 0.3rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    margin: 0.15rem 0.25rem;
    border-radius: 18px;
  }
`;
