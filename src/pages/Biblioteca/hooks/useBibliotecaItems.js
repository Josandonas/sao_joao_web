import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import bibliotecaData from '../data/bibliotecaData';

/**
 * Hook personalizado para gerenciar os itens da biblioteca
 * @returns {Object} - Objeto com os itens e funções para manipulá-los
 */
export const useBibliotecaItems = () => {
  const { i18n } = useTranslation();
  const [items, setItems] = useState([]);
  
  // Carregar os itens quando o idioma mudar
  useEffect(() => {
    const currentLang = i18n.language;
    
    // Obter os itens para o idioma atual
    const translatedItems = bibliotecaData.map(item => {
      // Obter a tradução correta para o título e descrição
      const title = item.translations[currentLang]?.title || item.translations.pt.title;
      const description = item.translations[currentLang]?.description || item.translations.pt.description;
      const additionalInfo = item.translations[currentLang]?.additionalInfo || item.translations.pt.additionalInfo;
      
      return {
        ...item,
        title,
        description,
        additionalInfo
      };
    });
    
    setItems(translatedItems);
  }, [i18n.language]);
  
  // Filtrar itens por categoria
  const filterItems = (category) => {
    if (category === 'all') {
      return items;
    }
    
    return items.filter(item => item.category === category);
  };
  
  return {
    items,
    filterItems
  };
};
