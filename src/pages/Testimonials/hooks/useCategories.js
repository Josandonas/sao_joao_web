import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { testimonialsService, isApiAvailable } from '../../../services';

// Não precisamos mais da flag USE_MOCK_API, pois o serviço padronizado já lida com fallback

/**
 * Hook para gerenciar a filtragem de depoimentos por categoria
 * @deprecated Use useTestimonials instead
 */
export const useCategories = () => {
  const { lang: urlLang } = useParams();
  const { i18n } = useTranslation();
  
  // Usar o idioma do i18n se disponível, caso contrário usar o parâmetro da URL
  const lang = i18n.language || urlLang || 'pt';
  
  // Log para debug do idioma atual
  console.log(`[DEBUG] useCategories: Idioma atual - URL: ${urlLang}, i18n: ${i18n.language}, usado: ${lang}`);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Buscar categorias da API com fallback para localStorage
  const fetchCategories = useCallback(async () => {
    try {
      console.log(`[DEBUG] useCategories: Buscando categorias para idioma ${lang}`);
      const data = await testimonialsService.fetchTestimonialCategories(lang);
      console.log(`[DEBUG] useCategories: Recebidas ${data.length} categorias`);
      setCategories(data);
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
      setCategories([]);
    }
  }, [lang]);
  
  // Efeito para buscar categorias quando o componente é montado
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  
  // Efeito específico para monitorar mudanças no idioma
  useEffect(() => {
    console.log(`[DEBUG] useCategories: Idioma alterado para ${lang}, recarregando categorias`);
    fetchCategories();
    // Quando o idioma muda, resetamos para a categoria 'all'
    setActiveCategory('all');
  }, [lang, fetchCategories]);
  
  // Função para alterar a categoria ativa e buscar depoimentos filtrados
  const changeCategory = useCallback(async (category) => {
    setActiveCategory(category);
    setLoading(true);
    
    try {
      const data = await testimonialsService.fetchTestimonialsByCategory(category, lang);
      setTestimonials(data);
    } catch (err) {
      console.error(`Erro ao filtrar depoimentos por categoria ${category}:`, err);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }, [lang]);
  
  // Buscar todos os depoimentos quando o componente é montado
  useEffect(() => {
    changeCategory('all');
  }, [changeCategory]);

  return {
    activeCategory,
    categories,
    filteredTestimonials: testimonials,
    loading,
    changeCategory
  };
};
