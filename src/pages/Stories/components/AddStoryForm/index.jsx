import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
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
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Criar objeto da nova história
    const newStory = {
      id: Date.now(), // ID temporário baseado no timestamp
      title: formData.title,
      autor: formData.autor,
      excerpt: formData.excerpt || formData.content.substring(0, 100) + '...',
      content: formData.content
    };
    
    // Adicionar traduções se necessário
    if (formData.addTranslations) {
      newStory.translations = {
        en: {
          title: formData.translations.en.title,
          autor: formData.translations.en.autor || formData.autor,
          excerpt: formData.translations.en.excerpt || formData.translations.en.content.substring(0, 100) + '...',
          content: formData.translations.en.content
        },
        es: {
          title: formData.translations.es.title,
          autor: formData.translations.es.autor || formData.autor,
          excerpt: formData.translations.es.excerpt || formData.translations.es.content.substring(0, 100) + '...',
          content: formData.translations.es.content
        }
      };
    }
    
    // Chamar função de salvamento
    onSave(newStory);
  };
  
  return (
    <Modal>
      <FormContainer onSubmit={handleSubmit}>
        <CloseButton type="button" onClick={onClose}><FaTimes /></CloseButton>
        <FormTitle>Adicionar Nova História</FormTitle>
        
        {/* Seleção de idiomas */}
        <TabContainer>
          <TabButton 
            type="button" 
            active={activeTab === 'pt'} 
            onClick={() => handleTabChange('pt')}
          >
            Português
          </TabButton>
          {formData.addTranslations && (
            <>
              <TabButton 
                type="button" 
                active={activeTab === 'en'} 
                onClick={() => handleTabChange('en')}
              >
                English
              </TabButton>
              <TabButton 
                type="button" 
                active={activeTab === 'es'} 
                onClick={() => handleTabChange('es')}
              >
                Español
              </TabButton>
            </>
          )}
        </TabContainer>
        
        {/* Campos para o idioma ativo */}
        {activeTab === 'pt' ? (
          <>
            <FormGroup>
              <Label>
                Título <RequiredField>*</RequiredField>
              </Label>
              <Input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Autor</Label>
              <Input 
                type="text" 
                name="autor" 
                value={formData.autor} 
                onChange={handleChange} 
                placeholder="Nome do autor (opcional)"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Resumo</Label>
              <TextArea 
                name="excerpt" 
                value={formData.excerpt} 
                onChange={handleChange} 
                placeholder="Resumo da história (opcional, será gerado automaticamente se vazio)"
                rows={2}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                Conteúdo <RequiredField>*</RequiredField>
              </Label>
              <TextArea 
                name="content" 
                value={formData.content} 
                onChange={handleChange} 
                placeholder="História completa"
                rows={10}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <input 
                type="checkbox" 
                id="addTranslations" 
                checked={formData.addTranslations} 
                onChange={handleToggleTranslations} 
              />
              <Label htmlFor="addTranslations" style={{ marginLeft: '8px' }}>
                Adicionar traduções em outros idiomas
              </Label>
            </FormGroup>
          </>
        ) : activeTab === 'en' ? (
          <>
            <FormGroup>
              <Label>
                Title <RequiredField>*</RequiredField>
              </Label>
              <Input 
                type="text" 
                name="title" 
                value={formData.translations.en.title} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Author</Label>
              <Input 
                type="text" 
                name="autor" 
                value={formData.translations.en.autor} 
                onChange={handleChange} 
                placeholder="Author name (optional)"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Summary</Label>
              <TextArea 
                name="excerpt" 
                value={formData.translations.en.excerpt} 
                onChange={handleChange} 
                placeholder="Story summary (optional, will be generated automatically if empty)"
                rows={2}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                Content <RequiredField>*</RequiredField>
              </Label>
              <TextArea 
                name="content" 
                value={formData.translations.en.content} 
                onChange={handleChange} 
                placeholder="Full story content"
                rows={10}
                required 
              />
            </FormGroup>
          </>
        ) : (
          <>
            <FormGroup>
              <Label>
                Título <RequiredField>*</RequiredField>
              </Label>
              <Input 
                type="text" 
                name="title" 
                value={formData.translations.es.title} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Autor</Label>
              <Input 
                type="text" 
                name="autor" 
                value={formData.translations.es.autor} 
                onChange={handleChange} 
                placeholder="Nombre del autor (opcional)"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Resumen</Label>
              <TextArea 
                name="excerpt" 
                value={formData.translations.es.excerpt} 
                onChange={handleChange} 
                placeholder="Resumen de la historia (opcional, se generará automáticamente si está vacío)"
                rows={2}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>
                Contenido <RequiredField>*</RequiredField>
              </Label>
              <TextArea 
                name="content" 
                value={formData.translations.es.content} 
                onChange={handleChange} 
                placeholder="Contenido completo de la historia"
                rows={10}
                required 
              />
            </FormGroup>
          </>
        )}
        
        <ButtonGroup>
          <CancelButton type="button" onClick={onClose}>
            Cancelar
          </CancelButton>
          <SubmitButton type="submit">
            Salvar
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
