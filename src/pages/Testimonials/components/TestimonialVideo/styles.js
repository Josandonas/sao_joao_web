import styled from 'styled-components';

export const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  position: relative;
  padding-bottom: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
    background-color: #8c0033;
    transform: scale(1.1);
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  overflow: hidden;
  
  video {
    display: block;
    width: 100%;
    border-bottom: 3px solid #8c0033;
  }
`;

export const TestimonialName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0.5rem 1.5rem 0.2rem;
  color: #333;
`;

export const TestimonialLocation = styled.div`
  font-size: 0.9rem;
  color: #777;
  margin: 0 1.5rem;
  font-style: italic;
`;
