import styled from 'styled-components';

export const CommunityModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.md};
`;

export const ModalContent = styled.div`
  background-color: white;
  width: 90%;
  max-width: 950px;
  max-height: 90vh;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: modalFadeIn 0.4s ease-out;
  
  @keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #4e7ee3, #6acddc);
  position: relative;
`;

export const ModalTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: 700;
  font-size: 1.8rem;
  color: white;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  
  &:before {
    content: '🏠';
    margin-right: 10px;
    font-size: 1.6rem;
  }
`;

export const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 1.5rem;
  font-weight: 300;
  color: white;
  cursor: pointer;
  padding: 0.3rem 0.7rem;
  line-height: 1;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: rotate(90deg);
  }
`;

export const ModalBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
  background: linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%);
`;
export const ModalImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-bottom: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.small};
`;

export const GalleryContainer = styled.div`
  margin-bottom: 2.5rem;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  
  .image-gallery {
    width: 100%;
    border-radius: 0;
    overflow: hidden;
  }
  
  .image-gallery-image {
    max-height: 500px;
    object-fit: cover;
    background-color: #000;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.03);
    }
  }
  
  .image-gallery-thumbnail {
    width: 90px;
    border: 3px solid transparent;
    opacity: 0.7;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 1;
    }
    
    &.active {
      border: 3px solid #4e7ee3;
      opacity: 1;
    }
  }
  
  .image-gallery-fullscreen-button,
  .image-gallery-play-button,
  .image-gallery-left-nav,
  .image-gallery-right-nav {
    color: white;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
    opacity: 0.7;
    transition: opacity 0.3s ease; /* Transição apenas para opacidade */
    
    &:hover {
      opacity: 1;
      /* Removida a transformação de escala que causava o movimento */
    }
  }
`;

export const ModalDescriptionText = styled.div`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #444;
  margin: 2rem 0;
  position: relative;
  padding: 1rem 1.5rem;
  background-color: rgba(78, 126, 227, 0.05);
  border-radius: 12px;
  border-left: 4px solid #4e7ee3;
  
  p {
    margin-bottom: 1rem;
    position: relative;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ModalDetailsContainer = styled.div`
  margin-top: 2.5rem;
  background: linear-gradient(145deg, #f8f9fa, #ffffff);
  border-radius: 16px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(78, 126, 227, 0.15);
`;

export const ModalDetail = styled.div`
  margin-bottom: 1rem;
  padding: 0.8rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background-color: rgba(78, 126, 227, 0.05);
  }
`;
export const ModalDetailTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  font-family: ${props => props.theme.fonts.heading};
  font-weight: 600;
  font-size: 1.1rem;
  color: #4e7ee3;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    background: linear-gradient(135deg, #4e7ee3, #6acddc);
    border-radius: 50%;
    margin-right: 8px;
  }
`;

export const ModalText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  position: relative;
  transition: color 0.2s ease;
  padding-left: 0.2rem;
  
  ${ModalDetail}:hover & {
    color: #333;
  }
`;

export const TraditionsHighlight = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: linear-gradient(to bottom right, rgba(78, 126, 227, 0.1), rgba(106, 205, 220, 0.1));
  border-radius: 12px;
  position: relative;
  border: 1px solid rgba(78, 126, 227, 0.3);
  box-shadow: 0 4px 15px rgba(78, 126, 227, 0.08);
  
  h3 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 600;
    font-size: 1.4rem;
    color: #4e7ee3;
    margin: 0 0 1rem 0;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid rgba(78, 126, 227, 0.2);
    display: flex;
    align-items: center;
    
    &:before {
      content: '✨';
      margin-right: 10px;
      font-size: 1.4rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #444;
    margin: 0;
  }
`;
