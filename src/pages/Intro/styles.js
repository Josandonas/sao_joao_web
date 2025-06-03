import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000;
`;

export const Content = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const VideoWrapper = styled.div`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${props => props.theme.shadows.large};
  
  .video-react .video-react-big-play-button {
    background-color: rgba(255, 107, 1, 0.7);
    border-color: ${props => props.theme.colors.primary};
    border-radius: 50%;
    height: 80px;
    width: 80px;
    line-height: 78px;
    font-size: 3em;
    transition: all ${props => props.theme.transitions.default};
    
    &:hover {
      background-color: ${props => props.theme.colors.primary};
    }
  }
  
  .video-react .video-react-control-bar {
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  .video-react .video-react-play-progress {
    background-color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-height: 60vh;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.md};
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.medium};
  width: 100%;
  max-width: 500px;
  
  ${props => props.videoEnded && css`
    animation: pulse 1.5s infinite;
    
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(255, 107, 1, 0.7);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(255, 107, 1, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(255, 107, 1, 0);
      }
    }
  `}
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Button = styled.button`
  display: inline-block;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background-color: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  min-width: 180px;
  text-align: center;
  
  &:hover {
    background-color: ${props => props.primary ? props.theme.colors.accent : props.theme.colors.primary};
    color: white;
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    margin-bottom: ${props => props.theme.spacing.sm};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
