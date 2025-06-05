import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.md};
`;

export const Content = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalFadeIn 0.3s ease;
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Header = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

export const Title = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.large};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  transition: transform ${props => props.theme.transitions.fast};
  
  &:hover {
    transform: scale(1.2);
  }
`;

export const Body = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

export const Author = styled.p`
  font-style: italic;
  font-size: ${props => props.theme.fontSizes.small};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textSecondary};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  padding-bottom: ${props => props.theme.spacing.sm};
`;

export const Paragraph = styled.p`
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.6;
  text-align: justify;
  font-size: ${props => props.theme.fontSizes.regular};
  
  &:last-child {
    margin-bottom: 0;
  }
`;


