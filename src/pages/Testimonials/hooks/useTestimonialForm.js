import { useState, useCallback } from 'react';

/**
 * Hook para gerenciar o estado e comportamento do formulário de depoimentos
 */
export const useTestimonialForm = () => {
  const [showForm, setShowForm] = useState(false);
  
  // Alternar exibição do formulário de gravação
  const toggleForm = useCallback(() => {
    setShowForm(prev => !prev);
  }, []);
  
  // Submeter formulário de novo depoimento
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // Em uma implementação real, aqui enviaria os dados para o backend
    alert('Obrigado! Seu depoimento será revisado e adicionado em breve.');
    setShowForm(false);
  }, []);

  return {
    showForm,
    toggleForm,
    handleSubmit
  };
};
