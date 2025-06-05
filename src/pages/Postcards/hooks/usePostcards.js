import { useState, useMemo } from 'react';
import postcardsData from '../data/postcardsData';

const usePostcards = () => {
  const [selectedPostcard, setSelectedPostcard] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Abrir modal com o postal selecionado
  const openPostcardModal = (postcard) => {
    setSelectedPostcard(postcard);
  };
  
  // Fechar o modal
  const closePostcardModal = () => {
    setSelectedPostcard(null);
  };
  
  // Função de compartilhamento usando Web Share API
  const sharePostcard = () => {
    if (selectedPostcard && navigator.share) {
      navigator.share({
        title: selectedPostcard.title,
        text: `Confira este postal do Banho de São João: ${selectedPostcard.title}`,
        url: window.location.href
      })
        .then(() => console.log('Postal compartilhado com sucesso'))
        .catch((error) => console.error('Erro ao compartilhar:', error));
    } else {
      // Fallback para navegadores que não suportam a Web Share API
      // Criamos um input temporário para copiar o link para a área de transferência
      const tempInput = document.createElement('input');
      const text = `${selectedPostcard.title} - Postais do Banho de São João`;
      tempInput.value = window.location.href;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      
      alert('Link copiado para a área de transferência! Você pode compartilhar manualmente.');
    }
  };
  
  // Função de download real da imagem
  const downloadPostcard = () => {
    if (selectedPostcard) {
      // Cria um link temporário para download
      const link = document.createElement('a');
      const imageSrc = selectedPostcard.image;
      const filename = `postal-${selectedPostcard.id}-${selectedPostcard.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      
      // Configura o link para download
      link.href = imageSrc;
      link.download = filename;
      link.target = '_blank';
      
      // Adiciona o link ao documento, clica nele e depois remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Limpar todos os filtros
  const clearFilters = () => {
    setActiveFilter('all');
  };
  
  // Filtrar postais por categoria usando useMemo para memoização
  const filteredPostcards = useMemo(() => {
    return postcardsData.filter(postcard => {
      // Filtro por categoria
      if (activeFilter !== 'all' && postcard.category !== activeFilter) {
        return false;
      }
      
      return true;
    });
  }, [activeFilter]);

  return {
    postcards: filteredPostcards,
    selectedPostcard,
    activeFilter,
    setActiveFilter,
    openPostcardModal,
    closePostcardModal,
    sharePostcard,
    downloadPostcard,
    clearFilters
  };
};

export default usePostcards;
