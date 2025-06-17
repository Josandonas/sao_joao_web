import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { submitTestimonial } from '../../../services/testimonialsApi';
import { mockSubmitTestimonial } from '../../../services/testimonialsMockApi';

// Flag para controlar se deve usar a API real ou o mock
const USE_MOCK_API = true; // Altere para false quando a API real estiver disponível

/**
 * Hook para gerenciar o formulário de envio de depoimentos
 */
export const useTestimonialForm = () => {
  const { lang } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    quote: '',
    category: 'personal',
    consent: false,
    videoFile: null,
    imageFile: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  // Função para atualizar os dados do formulário
  const updateFormField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);
  
  // Função para resetar o formulário
  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      location: '',
      quote: '',
      category: 'personal',
      consent: false,
      videoFile: null,
      imageFile: null
    });
    setSuccess(false);
    setError(null);
  }, []);
  
  // Função para validar o formulário
  const validateForm = useCallback(() => {
    if (!formData.name.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Email inválido');
      return false;
    }
    
    if (!formData.location.trim()) {
      setError('Localização é obrigatória');
      return false;
    }
    
    if (!formData.quote.trim()) {
      setError('Depoimento é obrigatório');
      return false;
    }
    
    if (!formData.consent) {
      setError('Você precisa concordar com os termos');
      return false;
    }
    
    return true;
  }, [formData]);
  
  // Função para enviar o formulário
  const submitForm = useCallback(async (e) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Preparar dados para envio (incluindo arquivos)
      const formDataToSend = new FormData();
      
      // Adicionar campos de texto
      Object.keys(formData).forEach(key => {
        if (key !== 'videoFile' && key !== 'imageFile') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Adicionar arquivos se existirem
      if (formData.videoFile) {
        formDataToSend.append('video', formData.videoFile);
      }
      
      if (formData.imageFile) {
        formDataToSend.append('image', formData.imageFile);
      }
      
      // Enviar para API ou mock
      if (USE_MOCK_API) {
        await mockSubmitTestimonial(formData);
      } else {
        await submitTestimonial(formDataToSend, lang);
      }
      
      setSuccess(true);
      resetForm();
    } catch (err) {
      console.error('Erro ao enviar depoimento:', err);
      setError('Erro ao enviar depoimento. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, [formData, lang, resetForm, validateForm]);

  return {
    formData,
    loading,
    success,
    error,
    updateFormField,
    resetForm,
    submitForm
  };
};
