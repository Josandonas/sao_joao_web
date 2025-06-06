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
        {t('testimonials.shareButton') || 'Compartilhe seu Depoimento'}
      </RecordButton>
      
      {showForm && (
        <ModalOverlay onClick={toggleForm}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={toggleForm}><FaTimes /></CloseButton>
            <RecordingForm onSubmit={handleSubmit}>
          <FormTitle>{t('testimonials.formTitle') || 'Registre seu Depoimento'}</FormTitle>
          
          <FormGroup>
            <Label htmlFor="name">{t('testimonials.nameLabel') || 'Nome Completo'}</Label>
            <Input 
              type="text" 
              id="name" 
              required 
              placeholder={t('testimonials.nameLabel') || "Seu nome completo"}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="location">{t('testimonials.locationLabel') || 'Localidade'}</Label>
            <Input 
              type="text" 
              id="location" 
              required 
              placeholder={t('testimonials.locationLabel') || "Cidade, Estado"}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="category">{t('testimonials.categoryLabel') || 'Categoria'}</Label>
            <Input 
              as="select" 
              id="category" 
              required
            >
              <option value="">{t('testimonials.categoryLabel') || 'Selecione uma categoria'}</option>
              <option value="personal">{t('testimonials.categoryPersonal') || 'História Pessoal'}</option>
              <option value="traditions">{t('testimonials.categoryTraditions') || 'Tradições'}</option>
              <option value="cultural">{t('testimonials.categoryCultural') || 'Manifestações Culturais'}</option>
              <option value="faith">{t('testimonials.categoryFaith') || 'Fé e Devoção'}</option>
              <option value="academic">{t('testimonials.categoryAcademic') || 'Pesquisa Acadêmica'}</option>
            </Input>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="testimonial">{t('testimonials.testimonialLabel') || 'Seu Depoimento'}</Label>
            <TextArea 
              id="testimonial" 
              rows="6" 
              required 
              placeholder={t('testimonials.testimonialLabel') || "Compartilhe sua história ou experiência relacionada ao Banho de São João"}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="video">{t('testimonials.videoLabel') || 'Upload de Vídeo (opcional)'}</Label>
            <FileUploadContainer>
              <FileUploadButton htmlFor="video">
                <FileUploadIcon>📹</FileUploadIcon>
                {t('testimonials.videoLabel') || "Selecionar vídeo"}
              </FileUploadButton>
              <FileNameDisplay id="fileNameDisplay">{t('testimonials.noFileSelected') || "Nenhum arquivo selecionado"}</FileNameDisplay>
              <Input 
                type="file" 
                id="video" 
                accept="video/*"
                onChange={(e) => {
                  const fileName = e.target.files[0]?.name || t('testimonials.noFileSelected') || 'Nenhum arquivo selecionado';
                  document.getElementById('fileNameDisplay').textContent = fileName;
                }}
                style={{ display: 'none' }}
              />
            </FileUploadContainer>
            <small>{t('testimonials.videoHelp') || 'Tamanho máximo: 50MB. Formatos aceitos: MP4, MOV, AVI'}</small>
          </FormGroup>
          
          <SubmitButton type="submit">
            {t('testimonials.submitButton') || 'Enviar Depoimento'}
          </SubmitButton>
            </RecordingForm>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default TestimonialForm;
