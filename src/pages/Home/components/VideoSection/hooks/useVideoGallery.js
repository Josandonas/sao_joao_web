import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchAvailableVideoYears, fetchVideoByYear, LEGACY_VIDEO_YEAR } from '../../../../../services/api/video';

/**
 * Hook personalizado para gerenciar a galeria de vídeos
 * @returns {Object} Estado e funções relacionadas aos vídeos
 */
const useVideoGallery = () => {
  const { i18n } = useTranslation();
  const [availableYears, setAvailableYears] = useState([LEGACY_VIDEO_YEAR]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [videoPath, setVideoPath] = useState('');
  const [loading, setLoading] = useState(true);
  const [yearsLoading, setYearsLoading] = useState(true);

  // Busca os anos disponíveis quando o idioma muda
  useEffect(() => {
    const loadAvailableYears = async () => {
      setYearsLoading(true);
      try {
        const years = await fetchAvailableVideoYears(i18n.language);
        setAvailableYears(years);
        
        // Se não houver um ano selecionado ou o ano selecionado não estiver na lista,
        // seleciona o ano mais recente (primeiro da lista, já que está ordenada)
        if (!selectedYear || !years.includes(selectedYear)) {
          setSelectedYear(years[0]);
        }
      } catch (error) {
        console.error('Erro ao carregar anos disponíveis:', error);
        // Em caso de erro, garante que pelo menos o ano legado esteja disponível
        setAvailableYears([LEGACY_VIDEO_YEAR]);
        setSelectedYear(LEGACY_VIDEO_YEAR);
      } finally {
        setYearsLoading(false);
      }
    };

    loadAvailableYears();
  }, [i18n.language]);

  // Busca o vídeo quando o ano selecionado ou o idioma muda
  useEffect(() => {
    const loadVideo = async () => {
      if (!selectedYear) return;
      
      setLoading(true);
      try {
        const path = await fetchVideoByYear(selectedYear, i18n.language);
        
        // Se não houver caminho para o vídeo e não for o ano legado,
        // tenta buscar o vídeo do ano legado como fallback
        if (!path && selectedYear !== LEGACY_VIDEO_YEAR) {
          const legacyPath = await fetchVideoByYear(LEGACY_VIDEO_YEAR, i18n.language);
          setVideoPath(legacyPath || '');
        } else {
          setVideoPath(path || '');
        }
      } catch (error) {
        console.error(`Erro ao carregar vídeo do ano ${selectedYear}:`, error);
        
        // Em caso de erro, tenta usar o vídeo legado como fallback
        if (selectedYear !== LEGACY_VIDEO_YEAR) {
          try {
            const legacyPath = await fetchVideoByYear(LEGACY_VIDEO_YEAR, i18n.language);
            setVideoPath(legacyPath || '');
          } catch (fallbackError) {
            console.error('Erro ao carregar vídeo legado como fallback:', fallbackError);
            setVideoPath('');
          }
        } else {
          setVideoPath('');
        }
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [selectedYear, i18n.language]);

  // Determina se o seletor de ano deve ser exibido
  const showYearSelector = useMemo(() => {
    // Exibe o seletor apenas se houver mais de um ano disponível
    return availableYears.length > 1;
  }, [availableYears]);

  // Função para selecionar um ano
  const selectYear = (year) => {
    setSelectedYear(Number(year));
  };

  return {
    availableYears,
    selectedYear,
    videoPath,
    loading,
    yearsLoading,
    showYearSelector,
    selectYear
  };
};

export default useVideoGallery;
