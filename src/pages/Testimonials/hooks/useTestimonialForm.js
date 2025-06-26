import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { testimonialsService, isApiAvailable } from '../../../services';

// Não precisamos mais da flag USE_MOCK_API, pois o serviço padronizado já lida com fallback

/**
 * Hook para gerenciar o formulário de envio de depoimentos
 */
export const useTestimonialForm = () => {
  const { lang: urlLang } = useParams();
  const { t, i18n } = useTranslation();
  
  // Usar o idioma do i18n se disponível, caso contrário usar o parâmetro da URL
  const lang = i18n.language || urlLang || 'pt';
  
  // Log para debug do idioma atual
  console.log(`[DEBUG] useTestimonialForm: Idioma atual - URL: ${urlLang}, i18n: ${i18n.language}, usado: ${lang}`);
  
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
      
      // Enviar para o serviço padronizado que já lida com fallback
      await testimonialsService.submitTestimonial(formDataToSend);
      
      setSuccess(true);
      resetForm();
    } catch (err) {
      console.error('Erro ao enviar depoimento:', err);
      setError('Erro ao enviar depoimento. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, [formData, lang, resetForm, validateForm]);

  // Efeito para monitorar mudanças no idioma e atualizar mensagens de erro
  useEffect(() => {
    // Se houver um erro, limpa para evitar exibir mensagens no idioma antigo
    if (error) {
      setError(null);
    }
    
    console.log(`[DEBUG] useTestimonialForm: Idioma alterado para ${lang}`);
    
    // Aqui poderia resetar o formulário ou fazer outras ações necessárias quando o idioma mudar
    // Por exemplo, buscar categorias traduzidas para o formulário
  }, [lang]);

  return {
    formData,
    loading,
    success,
    error,
    updateFormField,
    resetForm,
    submitForm,
    lang // Exporta o idioma atual para uso no componente
  };
};
