import styled from 'styled-components';

export const Container = styled.div`
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  width: 100%;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.7);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.lg} 0;
  }
`;
