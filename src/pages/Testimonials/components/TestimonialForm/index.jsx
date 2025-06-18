import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTimes, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
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
  FileNameDisplay,
  FormFeedback,
  StatusIcon
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
  const { t } = useTranslation();
  
  // Estados para controlar o feedback do formulário
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error' ou null
  const [errorMessage, setErrorMessage] = useState('');
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
    setSubmitStatus(null);
    setErrorMessage('');
    
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
        throw new Error('API indisponível. Tente novamente mais tarde.');
      }
      
      // Enviar formulário
      const success = await handleSubmit(formDataToSubmit);
      
      if (success) {
        setSubmitStatus('success');
        // Resetar formulário após sucesso
        setFormData({
          name: '',
          location: '',
          category: '',
          testimonial: '',
          video: null
        });
        document.getElementById('fileNameDisplay').textContent = 'Nenhum arquivo selecionado';
        
        // Fechar formulário após 2 segundos
        setTimeout(() => {
          toggleForm();
          setSubmitStatus(null);
        }, 2000);
      } else {
        throw new Error('Erro ao enviar depoimento. Tente novamente.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* O botão de gravação foi movido para o header */}
      <ModalOverlay onClick={toggleForm} className="d-flex align-items-center justify-content-center">
        <ModalContainer onClick={(e) => e.stopPropagation()} className="position-relative">
          <CloseButton onClick={toggleForm} className="btn-close-custom"><FaTimes /></CloseButton>
          <RecordingForm onSubmit={onSubmit} className="px-3 px-md-4 py-4">
          <FormTitle className="mb-4">{'Registre seu Depoimento'}</FormTitle>
          
          <FormGroup className="mb-3">
            <Label htmlFor="name" className="form-label">{'Nome Completo'}</Label>
            <Input 
              type="text" 
              id="name" 
              required 
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup className="mb-3">
            <Label htmlFor="location" className="form-label">{'Localidade'}</Label>
            <Input 
              type="text" 
              id="location" 
              required 
              placeholder="Cidade, Estado"
              value={formData.location}
              onChange={handleChange}
              disabled={isSubmitting}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup className="mb-3">
            <Label htmlFor="category" className="form-label">{'Categoria'}</Label>
            <Input 
              as="select" 
              id="category" 
              required
              value={formData.category}
              onChange={handleChange}
              disabled={isSubmitting}
              className="form-select"
            >
              <option value="">{'Selecione uma categoria'}</option>
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
            <Label htmlFor="testimonial" className="form-label">{'Seu Depoimento'}</Label>
            <TextArea 
              id="testimonial" 
              rows="6" 
              required 
              placeholder="Compartilhe sua história ou experiência relacionada ao Banho de São João"
              value={formData.testimonial}
              onChange={handleChange}
              disabled={isSubmitting}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup className="mb-4">
            <Label htmlFor="video" className="form-label">{'Upload de Vídeo (opcional)'}</Label>
            <FileUploadContainer className="d-flex flex-column flex-md-row align-items-md-center gap-2">
              <FileUploadButton htmlFor="video" className="btn-upload">
                <FileUploadIcon>📹</FileUploadIcon>
                {"Selecionar vídeo"}
              </FileUploadButton>
              <FileNameDisplay id="fileNameDisplay" className="flex-grow-1">{"Nenhum arquivo selecionado"}</FileNameDisplay>
              <Input 
                type="file" 
                id="video" 
                accept="video/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                disabled={isSubmitting}
              />
            </FileUploadContainer>
            <small className="text-muted mt-2 d-block">{'Tamanho máximo: 50MB. Formatos aceitos: MP4, MOV, AVI'}</small>
          </FormGroup>
          
          {/* Feedback de status do envio */}
          {submitStatus && (
            <FormFeedback status={submitStatus}>
              <StatusIcon>
                {submitStatus === 'success' && <FaCheckCircle />}
                {submitStatus === 'error' && <FaExclamationTriangle />}
              </StatusIcon>
              {submitStatus === 'success' && 'Depoimento enviado com sucesso!'}
              {submitStatus === 'error' && (errorMessage || 'Erro ao enviar depoimento.')}
            </FormFeedback>
          )}
          
          {/* Aviso de API indisponível */}
          {!apiAvailable && (
            <FormFeedback status="warning">
              <StatusIcon>
                <FaExclamationTriangle />
              </StatusIcon>
              {'API indisponível. O formulário está em modo offline.'}
            </FormFeedback>
          )}
          
          <div className="d-grid gap-2 col-12 col-md-6 mx-auto mt-4">
            <SubmitButton type="submit" disabled={isSubmitting} className="btn btn-lg">
              {isSubmitting ? (
                <>
                  <FaSpinner className="spinner me-2" /> 
                  {'Enviando...'}
                </>
              ) : (
                'Enviar Depoimento'
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
