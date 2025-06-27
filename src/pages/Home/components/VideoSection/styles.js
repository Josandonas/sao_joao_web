import styled from 'styled-components';
import { lighten, rgba, darken } from 'polished';

export const VideoSectionContainer = styled.section`
  margin-top: ${props => props.theme.spacing.xl}; 
  position: relative;
  overflow: hidden;
  background-color: transparent;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: ${props => props.theme.spacing.lg};
    margin-top: ${props => props.theme.spacing.lg};
  }
`;

export const VideoCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: calc(90% + 24px);
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: ${props => props.theme.spacing.lg};
  box-shadow: 0 10px 30px rgba(140, 0, 51, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  align-items: center;
  text-align: center;
  justify-content: center;
  
  .video-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    
    &.centered {
      justify-content: center;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      flex-direction: column;
      gap: 1rem;
    }
  }
  
  @media (max-width: 1200px) {
    max-width: calc(90% + 20px);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: calc(100% - 24px);
    padding: ${props => props.theme.spacing.md};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.sm};
  }
`;

export const VideoTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
  position: relative;
  z-index: 1;
  font-family: ${props => props.theme.fonts.heading};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const VideoDescription = styled.p`
  font-size: 1.1rem;
  color: #2a2a2a;
  margin-bottom: 1.5rem;
  text-align: center;
  max-width: 700px;
  position: relative;
  z-index: 1;
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
`;

export const YearSelector = styled.div`
  z-index: 10;
  
  .dropdown-toggle {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    border-radius: 8px;
    font-weight: 500;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover, &:focus {
      background-color: ${props => rgba(props.theme.colors.primary, 0.1)};
      border-color: ${props => darken(0.1, props.theme.colors.primary)};
      color: ${props => darken(0.1, props.theme.colors.primary)};
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  
  .dropdown-menu {
    border-radius: 8px;
    border: 1px solid ${props => rgba(props.theme.colors.primary, 0.2)};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    min-width: 120px;
  }
  
  .dropdown-item {
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-weight: 500;
    color: ${props => props.theme.colors.text};
    
    &:hover {
      background-color: ${props => rgba(props.theme.colors.primary, 0.1)};
      color: ${props => props.theme.colors.primary};
    }
    
    &.active {
      background-color: ${props => props.theme.colors.primary};
      color: white;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    
    .dropdown-toggle {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const VideoWrapper = styled.div`
  position: relative;
  width: 85%;
  max-width: 900px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(140, 0, 51, 0.15), 0 8px 10px rgba(140, 0, 51, 0.08);
  margin: 1.5rem auto;
  z-index: 1;
  border: 4px solid white;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .video-loading, .carousel-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 300px;
    background-color: ${props => rgba(props.theme.colors.background, 0.8)};
    
    .spinner-border {
      width: 3rem;
      height: 3rem;
      color: ${props => props.theme.colors.primary};
    }
  }
  transition: all 0.3s ease;
  
  &::before {
    content: "";
    display: block;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
  
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    cursor: pointer;
  }
  
  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    margin: 0;
    border: none;
    border-radius: 0;
    
    &::before {
      padding-top: 0;
    }
    
    video {
      border-radius: 0;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 90%;
    max-width: 700px;
    margin: 1.25rem auto;
    border-width: 3px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 95%;
    margin: 1rem auto;
    border-width: 2px;
    border-radius: 12px;
    
    video {
      border-radius: 10px;
    }
  }
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5f1530, #b5003e);
  backdrop-filter: blur(4px);
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 255, 255, 0.2);
  opacity: 1;
  
  svg {
    width: 35px;
    height: 35px;
    color: white;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }
  
  &:hover {
    background: linear-gradient(135deg, #b5003e, #5f1530);
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  &:focus {
    outline: 2px solid rgba(140, 0, 51, 0.5);
    outline-offset: 2px;
  }
  
  &:active {
    transform: translate(-50%, -50%) scale(0.95);
  }
  
  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 70px;
    height: 70px;
    
    svg {
      width: 25px;
      height: 25px;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 60px;
    height: 60px;
    border-width: 2px;
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 1;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &.hidden {
    display: none;
  }
`;

export const VideoControls = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  display: flex;
  gap: 10px;
  z-index: 3;
  transition: opacity 0.3s ease;
  
  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
  
  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => rgba(props.theme.colors.primary, 0.8)};
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    
    svg {
      width: 18px;
      height: 18px;
      color: white;
    }
    
    &:hover {
      background: ${props => darken(0.05, props.theme.colors.primary)};
      transform: scale(1.05);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    bottom: 12px;
    right: 12px;
    gap: 8px;
    
    button {
      width: 36px;
      height: 36px;
      
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    bottom: 10px;
    right: 10px;
    gap: 6px;
    
    button {
      width: 32px;
      height: 32px;
      border-width: 1.5px;
      
      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
`;
