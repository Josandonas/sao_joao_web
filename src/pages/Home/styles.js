import styled from 'styled-components';

export const ContentContainer = styled.div`
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.7);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  }
`;
