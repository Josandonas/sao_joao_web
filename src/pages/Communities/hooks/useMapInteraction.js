import { useState } from 'react';

/**
 * Hook para gerenciar interações com o mapa e a comunidade selecionada
 * @returns {Object} - Estado e funções para gerenciar a comunidade selecionada no mapa
 */
export const useMapInteraction = () => {
  const [mapSelectedCommunity, setMapSelectedCommunity] = useState(null);
  
  // Seleciona uma comunidade no mapa e exibe seu card
  const selectCommunityOnMap = (community) => {
    setMapSelectedCommunity(community);
    
    // Rolar suavemente até o card após um pequeno delay para garantir que o componente foi renderizado
    setTimeout(() => {
      document.getElementById('selected-community-card')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  return {
    mapSelectedCommunity,
    selectCommunityOnMap
  };
};
