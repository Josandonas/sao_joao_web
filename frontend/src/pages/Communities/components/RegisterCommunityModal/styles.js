import styled from 'styled-components';

export const RegisterModal = styled.div`
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
  padding: 1rem;
  
  @media (max-width: 480px) {
    padding: 0;
    align-items: flex-start;
  }
`;

export const ModalContent = styled.div`
  background-color: white;
  width: 90%;
  max-width: 900px;
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
  
  @media (max-width: 768px) {
    width: 95%;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    border-radius: 0;
    margin-top: 0;
    display: flex;
    flex-direction: column;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 1.2rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const ModalTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: 700;
  color: #5f1530;
  background: linear-gradient(135deg, #5f1530, #b5003e);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
  font-size: 1.8rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 28px;
  font-weight: 700;
  background-color: white;
  border: 2px solid #5f1530;
  color: #5f1530;
  cursor: pointer;
  z-index: 10;
  line-height: 1;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 3px 10px rgba(140, 0, 51, 0.25);
  transition: all 0.3s ease;
  padding: 0;
  
  & > svg {
    width: 28px;
    height: 28px;
  }
  
  &:hover {
    transform: scale(1.1);
    background-color: #f9f9f9;
    box-shadow: 0 5px 15px rgba(140, 0, 51, 0.35);
  }
  
  @media (max-width: 768px) {
    height: 40px;
    width: 40px;
    
    & > svg {
      width: 24px;
      height: 24px;
    }
  }
  
  @media (max-width: 480px) {
    height: 36px;
    width: 36px;
    top: 8px;
    right: 8px;
    
    & > svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const ModalBody = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    padding-bottom: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  height: 100%;
  flex: 1;
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    
    button {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .back-button {
      background-color: #f1f1f1;
      color: #555;
      border: none;
      
      &:hover {
        background-color: #e5e5e5;
      }
    }
    
    .next-button {
      background: linear-gradient(135deg, #5f1530, #b5003e);
      color: white;
      border: none;
      box-shadow: 0 4px 8px rgba(140, 0, 51, 0.3);
      
      &:hover {
        background: linear-gradient(135deg, #a00039, #cc0049);
        box-shadow: 0 6px 12px rgba(140, 0, 51, 0.35);
      }
    }
    
    @media (max-width: 480px) {
      flex-direction: column;
      gap: 1rem;
      
      button {
        width: 100%;
        padding: 0.8rem 1rem;
      }
    }
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

export const FieldGroup = styled.div`
  padding-top: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #444;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #5f1530;
    box-shadow: 0 0 0 3px rgba(140, 0, 51, 0.2);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #5f1530;
    box-shadow: 0 0 0 3px rgba(140, 0, 51, 0.2);
  }
`;

export const ImageUploadArea = styled.div`
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
  
  &:hover {
    border-color: #5f1530;
    background-color: rgba(140, 0, 51, 0.05);
  }
  
  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    span {
      font-size: 1.1rem;
      font-weight: 500;
      color: #666;
      margin-bottom: 0.5rem;
    }
    
    small {
      color: #999;
    }
  }
  
  .gallery-preview {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    
    .upload-placeholder {
      span {
        font-size: 1rem;
      }
      
      small {
        font-size: 0.8rem;
      }
    }
    
    .gallery-preview {
      gap: 0.3rem;
    }
  }
`;

export const ImagePreview = styled.div`
  position: relative;
  display: inline-block;
  margin: 0.5rem;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  
  img {
    display: block;
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
  }
  
  button {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  &:hover button {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    margin: 0.4rem;
    
    img {
      max-width: 180px;
      max-height: 180px;
    }
  }
  
  @media (max-width: 480px) {
    margin: 0.3rem;
    
    img {
      max-width: 140px;
      max-height: 140px;
    }
    
    button {
      opacity: 1;
      padding: 0.3rem;
      font-size: 0.8rem;
    }
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, #5f1530, #b5003e);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
  box-shadow: 0 4px 8px rgba(140, 0, 51, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #a00039, #cc0049);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(140, 0, 51, 0.35);
  }
  
  &:active {
    transform: translateY(0);
    background: linear-gradient(135deg, #800030, #b5003e);
    box-shadow: 0 2px 4px rgba(140, 0, 51, 0.2);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.7rem 1.8rem;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 45%;
    padding: 1rem;
    font-size: 0.95rem;
  }
`;

export const MapSelectorContainer = styled.div`
  h3 {
    color: #444;
    margin-top: 0;
  }
  
  p {
    color: #777;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    
    p {
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  background-color: #f9f9f9;
  position: sticky;
  top: 77px;
  z-index: 5;
  
  @media (max-width: 768px) {
    top: 65px;
  }
  
  @media (max-width: 480px) {
    top: 58px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    justify-content: space-between;
    width: 100%;
  }
`;

export const Tab = styled.button.attrs(props => ({
  'data-active': props.active ? 'true' : 'false',
}))`
  padding: 1rem 1.5rem;
  background: ${props => props.active ? 'white' : 'transparent'};
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#5f1530' : 'transparent'};
  color: ${props => props.active ? '#5f1530' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  max-width: 200px;
  font-family: inherit;
  font-size: 0.95rem;
  
  &:hover {
    background-color: ${props => props.active ? 'white' : 'rgba(140, 0, 51, 0.05)'};
    color: #5f1530;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 0.6rem;
    font-size: 0.75rem;
    flex: 1 1 25%;
    min-width: auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const LanguageTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 1.5rem;
  
  @media (max-width: 480px) {
    margin-bottom: 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
  }
`;

export const LanguageTab = styled.button.attrs(props => ({
  'data-active': props.active ? 'true' : 'false',
}))`
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#5f1530' : 'transparent'};
  color: ${props => props.active ? '#5f1530' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  
  &:hover {
    color: #5f1530;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.9rem;
    white-space: nowrap;
  }
`;

export const CoordinatesDisplay = styled.div`
  background-color: #f8f9fa;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border-left: 3px solid #5f1530;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  
  strong {
    color: #444;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
    margin-bottom: 0.8rem;
    
    p {
      margin: 0;
      word-break: break-word;
    }
  }
`;

export const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  
  .gallery-item {
    position: relative;
    max-width: 150px;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
  
  .back-button {
    background-color: #f5f5f5;
    color: #444;
    border: 1px solid #ddd;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    flex: 1;
    max-width: 150px;
    
    &:hover {
      background-color: #eee;
    }
    
    &:active {
      background-color: #e0e0e0;
    }
  }
  
  .next-button {
    background: linear-gradient(135deg, #5f1530, #b5003e);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    flex: 1;
    max-width: 150px;
    box-shadow: 0 4px 8px rgba(140, 0, 51, 0.2);
    
    &:hover {
      background: linear-gradient(135deg, #a00039, #cc0049);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(140, 0, 51, 0.25);
    }
    
    &:active {
      transform: translateY(0);
      background: linear-gradient(135deg, #800030, #b5003e);
      box-shadow: 0 2px 4px rgba(140, 0, 51, 0.2);
    }
  }
  
  @media (max-width: 768px) {
    .back-button, .next-button {
      padding: 0.7rem 1.2rem;
      font-size: 0.95rem;
    }
  }
  
  @media (max-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0;
    padding: 0.8rem;
    
    .back-button, .next-button {
      flex: 1;
      max-width: 45%;
      padding: 0.8rem;
      font-size: 0.9rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;

export default {
  RegisterModal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  ImageUploadArea,
  ImagePreview,
  SubmitButton,
  MapSelectorContainer,
  TabsContainer,
  Tab,
  FieldGroup,
  LanguageTabs,
  LanguageTab,
  CoordinatesDisplay,
  Gallery,
  FormActions
};
