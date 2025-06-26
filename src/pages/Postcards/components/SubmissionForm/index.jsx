import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaExclamationTriangle, FaSpinner, FaTimes, FaPaperPlane } from 'react-icons/fa';
import {
  ModalOverlay,
  FormContainer,
  CloseButton,
  FormTitle,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  Select,
  ErrorMessage,
  SubmitButton,
  FileInputWrapper,
  FileInputLabel,
  HiddenFileInput,
  SelectedFileName,
  SuccessMessage,
  ErrorAlert,
  LoadingSpinner
} from './styles';

const SubmissionForm = ({
  formData,
  formErrors,
  handleFormChange,
  handleSubmit,
  isSubmitting,
  submitSuccess,
  submitError,
  yearsList,
  onClose,
  isModal = false
}) => {
  const { t } = useTranslation();
  const fileInputRef = React.useRef(null);
  const modalRef = React.useRef(null);

  // Verificar se todos os campos obrigatórios estão preenchidos
  const isFormValid = formData.image && formData.location.trim() && formData.author.trim() && formData.year;
  
  // Fechar o modal quando clicar fora dele
  useEffect(() => {
    if (!isModal) return;
    
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Desabilitar scroll do body quando o modal estiver aberto
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isModal, onClose]);
  
  // Fechar o modal quando pressionar ESC
  useEffect(() => {
    if (!isModal) return;
    
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModal, onClose]);
  
  // Fechar o modal após envio bem-sucedido
  useEffect(() => {
    if (submitSuccess && isModal && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, isModal, onClose]);

  const formContent = (
    <FormContainer ref={modalRef}>
      {isModal && <CloseButton onClick={onClose}><FaTimes /></CloseButton>}
      <FormTitle>{t('postcards.submissionForm.title')}</FormTitle>
      
      {submitSuccess && (
        <SuccessMessage>
          <FaCheck /> {t('postcards.submissionForm.successMessage')}
        </SuccessMessage>
      )}
      
      {/* Erros técnicos não são mais exibidos na interface, apenas no console */}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="image">{t('postcards.submissionForm.imageLabel')} *</Label>
          <FileInputWrapper>
            <FileInputLabel htmlFor="image">
              {t('postcards.submissionForm.selectImage')}
            </FileInputLabel>
            <HiddenFileInput
              id="image"
              name="image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFormChange}
            />
            {formData.image && (
              <SelectedFileName>
                {formData.image.name}
              </SelectedFileName>
            )}
          </FileInputWrapper>
          {formErrors.image && <ErrorMessage>{formErrors.image}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">{t('postcards.submissionForm.descriptionLabel')}</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder={t('postcards.submissionForm.descriptionPlaceholder')}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="location">{t('postcards.submissionForm.locationLabel')} *</Label>
          <Input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleFormChange}
            placeholder={t('postcards.submissionForm.locationPlaceholder')}
            hasError={!!formErrors.location}
          />
          {formErrors.location && <ErrorMessage>{formErrors.location}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="author">{t('postcards.submissionForm.authorLabel')} *</Label>
          <Input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleFormChange}
            placeholder={t('postcards.submissionForm.authorPlaceholder')}
            hasError={!!formErrors.author}
          />
          {formErrors.author && <ErrorMessage>{formErrors.author}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="year">{t('postcards.submissionForm.yearLabel')} *</Label>
          <Select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleFormChange}
            hasError={!!formErrors.year}
          >
            {yearsList.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          {formErrors.year && <ErrorMessage>{formErrors.year}</ErrorMessage>}
        </FormGroup>
        
        <div className="form-actions">
          <SubmitButton type="submit" disabled={isSubmitting || !isFormValid}>
            {isSubmitting ? (
              <>
                <LoadingSpinner />
                {t('postcards.submissionForm.submitting')}
              </>
            ) : (
              <>
                <FaPaperPlane style={{ marginRight: '8px' }} />
                {t('postcards.submissionForm.submitButton')}
              </>
            )}
          </SubmitButton>
        </div>
      </Form>
    </FormContainer>
  );
  
  return isModal ? (
    <ModalOverlay>
      {formContent}
    </ModalOverlay>
  ) : formContent;
};

SubmissionForm.propTypes = {
  formData: PropTypes.shape({
    image: PropTypes.object,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }).isRequired,
  formErrors: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
  submitError: PropTypes.string,
  yearsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func,
  isModal: PropTypes.bool
};

export default SubmissionForm;
