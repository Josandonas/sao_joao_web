import styled from 'styled-components';

export const Container = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const TitleSection = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  margin-top: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: 800;
  font-size: 2.4rem;
  margin: 1.5rem auto 2.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.08);
  position: relative;
  display: block;
  width: 100%;
  max-width: 800px;
  background: linear-gradient(135deg, #8c0033, #b5003e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #8c0033, #b5003e);
    border-radius: 2px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;
