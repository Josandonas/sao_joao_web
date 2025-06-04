import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './styles';
import { useModalControl } from './hooks/useModalControl';
import { useMapInteraction } from './hooks/useMapInteraction';
import CommunityMap from './components/CommunityMap';
import SelectedCommunity from './components/SelectedCommunity';
import CommunityModal from './components/CommunityModal';

const Communities = () => {
  const { t } = useTranslation();
  const { selectedCommunity, showModal, openModal, closeModal } = useModalControl();
  const { mapSelectedCommunity, selectCommunityOnMap } = useMapInteraction();
  
  // Efeito para remover texto solto de tradições que esteja fora dos elementos adequados
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      // Lista de textos de tradições em diferentes idiomas para detectar e remover
      const traditionTexts = ["Fé - tradição familiar", "Faith - family tradition", "Fe - tradición familiar"];
      
      // Procura por nós de texto que contenham exatamente os textos de tradições
      document.querySelectorAll('body, body > div').forEach(container => {
        // Verifica os nós filhos diretos
        for (let i = 0; i < container.childNodes.length; i++) {
          const node = container.childNodes[i];
          // Verifica se é um nó de texto
          if (node.nodeType === Node.TEXT_NODE) {
            // Verifica se o texto é exatamente um dos textos de tradições
            if (traditionTexts.includes(node.textContent.trim())) {
              // Remove o nó de texto duplicado
              container.removeChild(node);
              i--; // Ajusta o índice após remover o nó
            }
          }
        }
      });
    });
    
    // Inicia a observação
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect(); // Limpa o observer quando o componente é desmontado
  }, [mapSelectedCommunity]); // Re-executa quando a comunidade selecionada mudar

  return (
    <Container>
      <CommunityMap 
        onSelectCommunity={selectCommunityOnMap} 
        selectedCommunity={mapSelectedCommunity} 
      />
      
      {mapSelectedCommunity && (
        <SelectedCommunity 
          community={mapSelectedCommunity} 
          onViewDetails={openModal}
        />
      )}
      
      {showModal && selectedCommunity && (
        <CommunityModal 
          community={selectedCommunity} 
          onClose={closeModal}
        />
      )}
    </Container>
  );
};

export default Communities;