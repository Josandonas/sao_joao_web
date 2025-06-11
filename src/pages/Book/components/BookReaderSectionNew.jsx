import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

// Importando o novo componente BookReader
import BookReader from './BookReader';

/**
 * Versão completamente nova do componente BookReaderSection
 * Utiliza a nova estrutura de componentes e estilos responsivos
 * @param {Object} props - Propriedades do componente
 * @returns {JSX.Element} - Componente renderizado
 */
const BookReaderSectionNew = ({
  bookContent,
  bookPages,
  currentPage,
  totalPages,
  onBackToCover,
  onDownload,
  onToggleFullscreen,
  onNextPage,
  onPrevPage,
  onGoToChapter,
  isFullscreen
}) => {
  const { t } = useTranslation();
  
  // Estado para controlar a animação de entrada
  const [fadeIn, setFadeIn] = useState(false);
  
  // Detecta se é dispositivo móvel
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Efeito para ativar a animação após o componente ser montado
  useEffect(() => {
    // Pequeno atraso para que a animação ocorra após a renderização inicial
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Estilos inline para a animação de entrada
  const fadeStyle = {
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.6s ease-in-out, transform 0.5s ease-out',
  };
  
  // Prepara os dados das páginas no formato esperado pelo novo componente
  const formattedPages = bookPages.map(page => page.image);
  
  // Função para compartilhar o livro
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t('book.shareTitle', 'Banho de São João'),
        text: t('book.shareText', 'Confira este livro sobre o Banho de São João!'),
        url: window.location.href,
      })
      .catch((error) => console.log('Erro ao compartilhar:', error));
    } else {
      // Fallback para navegadores que não suportam a API Web Share
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, '_blank');
    }
  };
  
  return (
    <div style={fadeStyle}>
      <BookReader
        pages={formattedPages}
        chapters={bookContent.chapters}
        currentPage={currentPage}
        setCurrentPage={(page) => {
          // Determina se deve chamar onNextPage ou onPrevPage
          if (page > currentPage) {
            onNextPage();
          } else if (page < currentPage) {
            onPrevPage();
          }
        }}
        onBackToCover={onBackToCover}
        onDownload={onDownload}
        onShare={handleShare}
        isFullscreen={isFullscreen}
        toggleFullscreen={onToggleFullscreen}
      />
    </div>
  );
};

export default BookReaderSectionNew;
