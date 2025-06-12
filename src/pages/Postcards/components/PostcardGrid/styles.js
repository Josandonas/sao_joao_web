import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 2.5rem auto 0;
  padding: 0.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, rgba(140, 0, 51, 0.05), rgba(140, 0, 51, 0.1));
  border-radius: 12px;
  margin: 2.5rem auto;
  max-width: 600px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(140, 0, 51, 0.1);

  p {
    font-size: 1.3rem;
    margin-bottom: 25px;
    color: #555;
    font-weight: 500;
  }

  button {
    background: linear-gradient(135deg, #5f1530, #b5003e);
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(140, 0, 51, 0.3);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(140, 0, 51, 0.4);
    }
    
    &:active {
      transform: translateY(-1px);
    }
  }
`;
