import styled from 'styled-components';
import { lighten, rgba } from 'polished';

export const VideoSectionContainer = styled.section`
  margin-top: ${props => props.theme.spacing.xl}; 
  position: relative;
  overflow: hidden;
  background-color: transparent;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: ${props => props.theme.spacing.lg};
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
  
  @media (max-width: 1200px) {
    max-width: calc(90% + 20px);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: calc(100% - 24px);
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
`;

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(140, 0, 51, 0.15), 0 8px 10px rgba(140, 0, 51, 0.08);
  margin: 1.5rem 0;
  z-index: 1;
  border: 4px solid white;
  
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
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  
  svg {
    width: 30px;
    height: 30px;
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
`;
