import { useState, useEffect } from 'react';

/**
 * Hook para controlar o comportamento do modal
 * @returns {Object} - Estado e funções para controlar o modal
 */
export const useModalControl = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Efeito para gerenciar o overflow do body quando o modal é aberto/fechado
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup para garantir que o overflow seja restaurado quando o componente é desmontado
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  // Abre o modal com a comunidade selecionada
  const openModal = (community) => {
    setSelectedCommunity(community);
    setShowModal(true);
  };
  
  // Fecha o modal
  const closeModal = () => {
    setSelectedCommunity(null);
    setShowModal(false);
  };

  return {
    selectedCommunity,
    showModal,
    openModal,
    closeModal
  };
};
