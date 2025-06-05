import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import {
  ModalOverlay,
  ModalContainer,
  RecordingForm,
  FormTitle,
  FormGroup,
  Label,
  Input,
  TextArea,
  SubmitButton,
  RecordButton,
  CloseButton,
  FileUploadContainer,
  FileUploadButton,
  FileUploadIcon,
  FileNameDisplay
} from './styles';

/**
 * Componente para exibir o botão de gravação e o formulário de envio de depoimentos
 */
const TestimonialForm = ({ showForm, toggleForm, handleSubmit }) => {
  const { t } = useTranslation();

  return (
    <>
      <RecordButton onClick={toggleForm}>
        Compartilhe seu Depoimento
      </RecordButton>
      
      {showForm && (
        <ModalOverlay onClick={toggleForm}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={toggleForm}><FaTimes /></CloseButton>
            <RecordingForm onSubmit={handleSubmit}>
          <FormTitle>Registre seu Depoimento</FormTitle>
          
          <FormGroup>
            <Label htmlFor="name">Nome Completo</Label>
            <Input 
              type="text" 
              id="name" 
              required 
              placeholder="Seu nome completo"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="location">Localidade</Label>
            <Input 
              type="text" 
              id="location" 
              required 
              placeholder="Cidade, Estado"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="category">Categoria</Label>
            <Input 
              as="select" 
              id="category" 
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="personal">História Pessoal</option>
              <option value="traditions">Tradições</option>
              <option value="cultural">Manifestações Culturais</option>
              <option value="faith">Fé e Devoção</option>
              <option value="academic">Pesquisa Acadêmica</option>
            </Input>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="testimonial">Seu Depoimento</Label>
            <TextArea 
              id="testimonial" 
              rows="6" 
              required 
              placeholder="Compartilhe sua história ou experiência relacionada ao Banho de São João"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="video">Upload de Vídeo (opcional)</Label>
            <FileUploadContainer>
              <FileUploadButton htmlFor="video">
                <FileUploadIcon>📹</FileUploadIcon>
                Selecionar vídeo
              </FileUploadButton>
              <FileNameDisplay id="fileNameDisplay">Nenhum arquivo selecionado</FileNameDisplay>
              <Input 
                type="file" 
                id="video" 
                accept="video/*"
                onChange={(e) => {
                  const fileName = e.target.files[0]?.name || 'Nenhum arquivo selecionado';
                  document.getElementById('fileNameDisplay').textContent = fileName;
                }}
                style={{ display: 'none' }}
              />
            </FileUploadContainer>
            <small>Tamanho máximo: 50MB. Formatos aceitos: MP4, MOV, AVI</small>
          </FormGroup>
          
          <SubmitButton type="submit">
            Enviar Depoimento
          </SubmitButton>
            </RecordingForm>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default TestimonialForm;
