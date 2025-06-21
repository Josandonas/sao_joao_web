import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin: 2.5rem auto 0;
  padding: 0.5rem;
  width: 100%;
  max-width: 1400px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 25px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    padding: 0.25rem;
  }

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, rgba(140, 0, 51, 0.05), rgba(140, 0, 51, 0.1));
  border-radius: 12px;
  margin: 2.5rem auto;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(140, 0, 51, 0.1);

  p {
    font-size: 1.2rem;
    margin-bottom: 25px;
    color: #555;
    font-weight: 500;

    @media (max-width: 480px) {
      font-size: 1rem;
      margin-bottom: 20px;
    }
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

    @media (max-width: 480px) {
      padding: 10px 20px;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    margin: 1.5rem auto;
    padding: 30px 15px;
  }
`;
