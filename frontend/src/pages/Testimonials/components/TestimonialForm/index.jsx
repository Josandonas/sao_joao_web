import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTimes, FaSpinner } from 'react-icons/fa';
import { Form, Row, Col } from 'react-bootstrap';
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
  CloseButton,
  FileUploadContainer,
  FileUploadButton,
  FileUploadIcon,
  FileNameDisplay
} from './styles';

/**
 * Componente para exibir o botão de gravação e o formulário de envio de depoimentos
 * @param {boolean} showForm - Controla a exibição do formulário
 * @param {Function} toggleForm - Função para alternar a exibição do formulário
 * @param {Function} handleSubmit - Função para lidar com o envio do formulário
 * @param {Array} categories - Lista de categorias disponíveis
 * @param {boolean} apiAvailable - Indica se a API está disponível
 */
const TestimonialForm = ({ showForm, toggleForm, handleSubmit, categories = [], apiAvailable = true }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'pt';
  
  // Debug para verificar o idioma atual
  console.log(`[DEBUG] TestimonialForm - Idioma atual: ${currentLang}`);
  
  // Estado para controlar o envio do formulário e os dados
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    category: '',
    testimonial: '',
    video: null
  });
  
  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  // Função para lidar com upload de arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      document.getElementById('fileNameDisplay').textContent = fileName;
      setFormData(prev => ({
        ...prev,
        video: file
      }));
    }
  };
  
  // Função para lidar com o envio do formulário
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Criar FormData para envio
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('location', formData.location);
      formDataToSubmit.append('category', formData.category);
      formDataToSubmit.append('quote', formData.testimonial);
      if (formData.video) {
        formDataToSubmit.append('video', formData.video);
      }
      
      // Verificar se a API está disponível
      if (!apiAvailable) {
        console.warn('API indisponível. Tente novamente mais tarde.');
      }
      
      // Enviar formulário
      const success = await handleSubmit(formDataToSubmit);
      
      if (success) {
        // Resetar formulário após sucesso
        setFormData({
          name: '',
          location: '',
          category: '',
          testimonial: '',
          video: null
        });
        document.getElementById('fileNameDisplay').textContent = t('testimonials.noFileSelected', 'Nenhum arquivo selecionado');
        
        // Fechar formulário após 1 segundo
        setTimeout(() => {
          toggleForm();
        }, 1000);
      } else {
        console.error(t('testimonials.errorSubmitting', 'Erro ao enviar depoimento. Tente novamente.'));
        setError(t('testimonials.errorSubmitting', 'Erro ao enviar depoimento. Tente novamente.'));
      }
    } catch (error) {
      console.error(t('testimonials.formError', 'Erro no formulário:'), error.message);
      setError(t('testimonials.formError', 'Erro no formulário. Tente novamente.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* O botão de gravação foi movido para o header */}
      <ModalOverlay onClick={toggleForm} className="d-flex align-items-center justify-content-center">
        <ModalContainer onClick={(e) => e.stopPropagation()} className="position-relative w-100 mx-3 mx-sm-auto">
          <CloseButton onClick={toggleForm} className="btn-close-custom"><FaTimes /></CloseButton>
          <RecordingForm onSubmit={onSubmit} className="px-3 px-md-4 py-4 w-100">
          <FormTitle className="mb-4">{t('testimonials.formTitle')}</FormTitle>
          
          {/* Mensagem de erro */}
          {error && (
            <div className="alert alert-danger mb-3" role="alert">
              {error}
            </div>
          )}
          
          <FormGroup className="mb-3">
            <Label htmlFor="name" className="form-label">{t('testimonials.nameLabel')}</Label>
            <Input 
              type="text" 
              id="name" 
              required 
              placeholder={t('testimonials.namePlaceholder')}
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup className="mb-3">
            <Label htmlFor="location" className="form-label">{t('testimonials.locationLabel')}</Label>
            <Input 
              type="text" 
              id="location" 
              required 
              placeholder={t('testimonials.locationPlaceholder')}
              value={formData.location}
              onChange={handleChange}
              disabled={isSubmitting}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup className="mb-3">
            <Label htmlFor="category" className="form-label">{t('testimonials.categoryLabel')}</Label>
            <Input 
              as="select" 
              id="category" 
              required
              value={formData.category}
              onChange={handleChange}
              disabled={isSubmitting}
              className="form-select"
            >
              <option value="">{t('testimonials.selectCategory')}</option>
              {categories && categories.length > 0 ? (
                categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {t(`testimonials.category${category.id.charAt(0).toUpperCase() + category.id.slice(1)}`) || category.label}
                  </option>
                ))
              ) : (
                <>
                  <option value="personal">{t('testimonials.categoryPersonal') || 'História Pessoal'}</option>
                  <option value="traditions">{t('testimonials.categoryTraditions') || 'Tradições'}</option>
                  <option value="cultural">{t('testimonials.categoryCultural') || 'Manifestações Culturais'}</option>
                  <option value="faith">{t('testimonials.categoryFaith') || 'Fé e Devoção'}</option>
                  <option value="academic">{t('testimonials.categoryAcademic') || 'Pesquisa Acadêmica'}</option>
                </>
              )}
            </Input>
          </FormGroup>
          
          <FormGroup className="mb-3">
            <Label htmlFor="testimonial" className="form-label">{t('testimonials.quoteLabel')}</Label>
            <TextArea 
              id="testimonial" 
              rows="6" 
              required 
              placeholder={t('testimonials.quotePlaceholder')}
              value={formData.testimonial}
              onChange={handleChange}
              disabled={isSubmitting}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup className="mb-4">
            <Label htmlFor="video" className="form-label">{t('testimonials.videoLabel')}</Label>
            <FileUploadContainer className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2">
              <FileUploadButton htmlFor="video" className="btn-upload w-100 w-md-auto text-center">
                <FileUploadIcon>📹</FileUploadIcon>
                {t('testimonials.videoUploadLabel')}
              </FileUploadButton>
              <FileNameDisplay id="fileNameDisplay" className="flex-grow-1 text-break mt-2 mt-md-0">{t('testimonials.noFileSelected')}</FileNameDisplay>
              <Input 
                type="file" 
                id="video" 
                accept="video/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                disabled={isSubmitting}
              />
            </FileUploadContainer>
            <small className="text-muted mt-2 d-block">{t('testimonials.videoFormatHelp')}</small>
          </FormGroup>
          
          {/* Removidos os elementos de feedback visual */}
          
          <div className="d-grid gap-2 col-12 mx-auto mt-4">
            <SubmitButton type="submit" disabled={isSubmitting} className="btn btn-lg py-2 py-md-3">
              {isSubmitting ? (
                <>
                  <FaSpinner className="spinner me-2" /> 
                  {t('testimonials.processingButton', 'Enviando...')}
                </>
              ) : (
                t('testimonials.submitButton', 'Enviar Depoimento')
              )}
            </SubmitButton>
          </div>
          </RecordingForm>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
};

export default TestimonialForm;
