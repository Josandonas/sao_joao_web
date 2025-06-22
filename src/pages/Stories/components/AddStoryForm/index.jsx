import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  FormContainer,
  FormTitle,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  CloseButton,
  TabContainer,
  TabButton,
  RequiredField
} from './styles';

/**
 * Componente de formulário para adicionar novas histórias
 * @param {Object} props - Props do componente
 * @param {Function} props.onClose - Função chamada ao fechar o formulário
 * @param {Function} props.onSave - Função chamada ao salvar a história
 * @param {string} props.currentLanguage - Idioma atual (pt, en, es)
 */
const AddStoryForm = ({ onClose, onSave, currentLanguage = 'pt' }) => {
  const { t } = useTranslation();
  // Estado para os campos do formulário
  const [formData, setFormData] = useState({
    title: '',
    autor: '',
    excerpt: '',
    content: '',
    addTranslations: false,
    translations: {
      en: { title: '', autor: '', excerpt: '', content: '' },
      es: { title: '', autor: '', excerpt: '', content: '' }
    }
  });

  // Estado para controlar o envio do formulário
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Estado para controlar a guia ativa (pt, en, es)
  const [activeTab, setActiveTab] = useState(currentLanguage);

  // Manipulador de mudanças em campos
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (activeTab === 'pt') {
      setFormData({
        ...formData,
        [name]: value
      });
    } else {
      setFormData({
        ...formData,
        translations: {
          ...formData.translations,
          [activeTab]: {
            ...formData.translations[activeTab],
            [name]: value
          }
        }
      });
    }
  };

  // Manipulador de mudança de guia
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Manipulador de checkbox de traduções
  const handleToggleTranslations = (e) => {
    setFormData({
      ...formData,
      addTranslations: e.target.checked
    });
  };

  // Validação do formulário
  const validateForm = () => {
    // Verificar se os campos obrigatórios estão preenchidos
    if (!formData.title || !formData.content) {
      return false;
    }

    // Se estiver adicionando traduções, verificar se os campos obrigatórios estão preenchidos
    if (formData.addTranslations) {
      if (
        !formData.translations.en.title ||
        !formData.translations.en.content ||
        !formData.translations.es.title ||
        !formData.translations.es.content
      ) {
        return false;
      }
    }

    return true;
  };

  // Manipulador de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError(t('stories.form.validationError'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Criar objeto da nova história no formato esperado pela API
      const newStory = {
        // Dados em português
        pt: {
          title: formData.title,
          author: formData.autor,
          excerpt: formData.excerpt || formData.content.substring(0, 100) + '...',
          content: formData.content
        }
      };

      // Adicionar traduções se necessário
      if (formData.addTranslations) {
        // Dados em inglês
        newStory.en = {
          title: formData.translations.en.title,
          author: formData.translations.en.autor || formData.autor,
          excerpt: formData.translations.en.excerpt || formData.translations.en.content.substring(0, 100) + '...',
          content: formData.translations.en.content
        };

        // Dados em espanhol
        newStory.es = {
          title: formData.translations.es.title,
          author: formData.translations.es.autor || formData.autor,
          excerpt: formData.translations.es.excerpt || formData.translations.es.content.substring(0, 100) + '...',
          content: formData.translations.es.content
        };
      } else {
        // Se não houver traduções, usar os dados em português como fallback
        newStory.en = { ...newStory.pt };
        newStory.es = { ...newStory.pt };
      }

      // Adicionar tags e imagens (opcional)
      newStory.tags = [];
      newStory.images = [];

      // Chamar função de salvamento e aguardar resposta
      const savedStory = await onSave(newStory);

      // Fechar o formulário após salvar com sucesso
      if (savedStory) {
        onClose();
      }
    } catch (err) {
      console.error('Erro ao salvar história:', err);
      setError(err.message || 'Erro ao salvar história. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal>
      <FormContainer onSubmit={handleSubmit}>
        <CloseButton type="button" onClick={onClose}><FaTimes /></CloseButton>
        <FormTitle>{t('stories.form.title')}</FormTitle>

        {/* Seleção de idiomas */}
        <TabContainer>
        
          {formData.addTranslations && (
            <>
              <TabButton
                type="button"
                data-active={(activeTab === 'en').toString()}
                onClick={() => handleTabChange('en')}
              >
                English
              </TabButton>
              <TabButton
                type="button"
                data-active={(activeTab === 'es').toString()}
                onClick={() => handleTabChange('es')}
              >
                Español
              </TabButton>
            </>
          )}
        </TabContainer>

        {/* Campos do formulário com suporte a internacionalização */}
        <FormGroup>
          <Label>
            {t('stories.form.titleLabel')} <RequiredField>{t('stories.form.requiredField')}</RequiredField>
          </Label>
          <Input
            type="text"
            name="title"
            value={activeTab === 'pt' ? formData.title : formData.translations[activeTab].title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>{t('stories.form.authorLabel')}</Label>
          <Input
            type="text"
            name="autor"
            value={activeTab === 'pt' ? formData.autor : formData.translations[activeTab].autor}
            onChange={handleChange}
            placeholder={t('stories.form.authorPlaceholder')}
          />
        </FormGroup>

        <FormGroup>
          <Label>{t('stories.form.excerptLabel')}</Label>
          <TextArea
            name="excerpt"
            value={activeTab === 'pt' ? formData.excerpt : formData.translations[activeTab].excerpt}
            onChange={handleChange}
            placeholder={t('stories.form.excerptPlaceholder')}
            rows={2}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            {t('stories.form.contentLabel')} <RequiredField>{t('stories.form.requiredField')}</RequiredField>
          </Label>
          <TextArea
            name="content"
            value={activeTab === 'pt' ? formData.content : formData.translations[activeTab].content}
            onChange={handleChange}
            placeholder={t('stories.form.contentPlaceholder')}
            rows={10}
            required
          />
        </FormGroup>

        {activeTab === 'pt' && (
          <FormGroup>
            <input
              type="checkbox"
              id="addTranslations"
              checked={formData.addTranslations}
              onChange={handleToggleTranslations}
            />
            <Label htmlFor="addTranslations" style={{ marginLeft: '8px' }}>
              {t('stories.form.addTranslations')}
            </Label>
          </FormGroup>
        )}

        {error && (
          <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <ButtonGroup>
          <CancelButton type="button" onClick={onClose} disabled={isSubmitting}>
            {t('stories.form.cancel')}
          </CancelButton>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} />
                {t('stories.form.saving')}
              </>
            ) : t('stories.form.save')}
          </SubmitButton>
        </ButtonGroup>
      </FormContainer>
    </Modal>
  );
};

AddStoryForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string
};

export default AddStoryForm;
