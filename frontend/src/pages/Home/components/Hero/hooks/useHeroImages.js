import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchHeroImages } from '../../../../../services/api/hero';

/**
 * Hook personalizado para gerenciar imagens do Hero
 * Combina imagens da API com imagens legadas
 * @returns {Object} Estado e funções relacionadas às imagens do Hero
 */
const useHeroImages = () => {
  const { i18n } = useTranslation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para carregar imagens legadas
    const loadLegacyImages = () => {
      const legacyImages = [];
      for (let i = 1; i <= 14; i++) {
        legacyImages.push({
          src: `${PUBLIC_URL}/assets/images/backgrounds/carrosel_home/img (${i}).jpeg`,
          alt: `Slide ${i}`,
        });
      }
      return legacyImages;
    };

    // Função para buscar imagens da API e combinar com legadas
    const loadImages = async () => {
      setLoading(true);
      
      try {
        // Carrega as imagens legadas primeiro
        const legacyImages = loadLegacyImages();
        
        // Busca imagens da API com o limite igual ao número de imagens legadas
        const apiImages = await fetchHeroImages(legacyImages.length, i18n.language);
        
        // Se não houver imagens da API, usa apenas as legadas
        if (!apiImages || apiImages.length === 0) {
          setImages(legacyImages);
          return;
        }
        
        // Combina as imagens da API com as legadas
        // Cada imagem da API substitui uma imagem legada na mesma posição
        const combinedImages = [...legacyImages];
        
        apiImages.forEach((apiImage, index) => {
          if (index < combinedImages.length) {
            combinedImages[index] = {
              src: apiImage,
              alt: `Slide ${index + 1}`,
            };
          }
        });
        
        setImages(combinedImages);
      } catch (error) {
        // Em caso de erro, usa apenas as imagens legadas
        console.error('Erro ao carregar imagens do Hero:', error);
        setImages(loadLegacyImages());
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [i18n.language]);

  return {
    images,
    loading
  };
};

export default useHeroImages;
