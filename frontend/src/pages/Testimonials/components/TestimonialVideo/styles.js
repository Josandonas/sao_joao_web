import styled from 'styled-components';

export const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  padding: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 10px;
  }
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 95%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 100%;
    border-radius: 8px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 22px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #5f1530;
    transform: scale(1.1);
  }
  
  &.btn-close-custom {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 32px;
    height: 32px;
    font-size: 18px;
    top: 8px;
    right: 8px;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  overflow: hidden;
  
  video {
    display: block;
    width: 100%;
    border-bottom: 3px solid #5f1530;
  }
  
  .video-player {
    max-height: 70vh;
    object-fit: contain;
    background-color: #000;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    .video-player {
      max-height: 50vh;
    }
  }
`;

export const TestimonialName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }
`;

export const TestimonialLocation = styled.div`
  font-size: 0.9rem;
  color: #777;
  font-style: italic;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.85rem;
  }
`;
