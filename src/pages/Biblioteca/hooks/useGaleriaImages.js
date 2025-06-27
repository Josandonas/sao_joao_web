import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchGaleriaImages } from '../../../services/api/biblioteca';

/**
 * Hook personalizado para gerenciar imagens da galeria por ano
 * @param {number|string} initialYear - Ano inicial para carregar imagens (opcional)
 * @returns {Object} - Estado e funções para manipular imagens da galeria
 */
export const useGaleriaImages = (initialYear = null) => {
  const { t, i18n } = useTranslation();
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Formata os dados de imagens para o formato esperado pelo react-image-gallery
   * @param {Array} imagesData - Dados brutos das imagens da API
   * @returns {Array} - Imagens formatadas para o componente
   */
  const formatImagesForGallery = useCallback((imagesData) => {
    return imagesData.map(img => ({
      original: img.imageUrl,
      thumbnail: img.thumbnailUrl || img.imageUrl,
      description: img.caption || '',
      originalAlt: img.caption || t('galeria.imageAlt', 'Imagem do Banho de São João'),
      thumbnailAlt: img.caption || t('galeria.thumbnailAlt', 'Miniatura'),
      originalTitle: img.title || '',
    }));
  }, [t]);

  /**
   * Carrega as imagens do ano selecionado
   */
  const loadImages = useCallback(async (year) => {
    if (!year) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const imagesData = await fetchGaleriaImages(year, i18n.language);
      setImages(formatImagesForGallery(imagesData));
      setError(null); // Limpa qualquer erro anterior
    } catch (err) {
      // Registra detalhes do erro no console para desenvolvedores
      console.error(`Erro ao carregar imagens do ano ${year}:`, err);
      console.error('Detalhes do erro:', {
        mensagem: err.message,
        código: err.code,
        stack: err.stack,
        endpoint: 'fetchGaleriaImages',
        parâmetros: {
          ano: year,
          idioma: i18n.language
        }
      });
      
      // Define o erro interno para controle do estado, mas não será exibido ao usuário
      setError('API_ERROR');
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, [i18n.language, formatImagesForGallery]);
  
  // Carregar imagens quando o ano selecionado mudar
  useEffect(() => {
    if (selectedYear) {
      loadImages(selectedYear);
    }
  }, [selectedYear, loadImages]);

  /**
   * Seleciona um ano para visualizar imagens
   */
  const selectYear = useCallback((year) => {
    setSelectedYear(year);
  }, []);

  /**
   * Recarrega as imagens do ano atual
   */
  const refreshImages = useCallback(() => {
    if (selectedYear) {
      loadImages(selectedYear);
    }
  }, [selectedYear, loadImages]);

  return {
    images,
    loading,
    error,
    selectedYear,
    selectYear,
    refreshImages
  };
};

export default useGaleriaImages;
