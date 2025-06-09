import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 15px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(140, 0, 51, 0.3);
  position: relative;
  border: 1px solid rgba(140, 0, 51, 0.1);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 2.2rem;
  background-color: white;
  border: none;
  cursor: pointer;
  color: #5f1530;
  z-index: 10;
  transition: all 0.3s ease;
  height: 42px;
  width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  & > svg {
    width: 22px;
    height: 22px;
  }
  
  &:hover {
    background-color: #f9f9f9;
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  }
`;

export const ModalHeader = styled.div`
  padding: 25px 30px;
  padding-right: 70px; /* Espaço adicional para o botão de fechar */
  border-bottom: 1px solid rgba(140, 0, 51, 0.1);
  background: linear-gradient(135deg, #5f1530, #b5003e);
  position: relative;
  
  h2 {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    color: white;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const FullPostcardImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 450px;
  object-fit: contain;
  background-color: #f8f8f8;
  padding: 20px;
  border-bottom: 1px solid rgba(140, 0, 51, 0.1);
  
  @media (min-width: 768px) {
    width: 55%;
    max-height: 600px;
    border-bottom: none;
    border-right: 1px solid rgba(140, 0, 51, 0.1);
  }
`;

export const PostcardInfo = styled.div`
  padding: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    width: 45%;
    padding: 30px;
  }
`;

export const PostcardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
  margin-bottom: 30px;
  flex-grow: 1;
`;

export const PostcardMetadata = styled.div`
  margin-bottom: 30px;
  padding: 15px 20px;
  background-color: #f9f1f4;
  border-radius: 10px;
  border-left: 4px solid #5f1530;
`;

export const MetadataItem = styled.p`
  margin: 12px 0;
  font-size: 1rem;
  color: #444;
  display: flex;
  align-items: center;
  
  strong {
    color: #5f1530;
    margin-right: 8px;
    font-weight: 600;
    min-width: 60px;
  }
`;

export const ShareContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  justify-content: flex-start;
`;

export const ShareButton = styled.button`
  background: linear-gradient(135deg, #5f1530, #b5003e);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  font-weight: 600;
  min-width: 150px;
  box-shadow: 0 4px 10px rgba(140, 0, 51, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(140, 0, 51, 0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

export const DownloadButton = styled.button`
  background-color: white;
  color: #5f1530;
  border: 2px solid #5f1530;
  padding: 12px 25px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  font-weight: 600;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background-color: rgba(140, 0, 51, 0.05);
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;
