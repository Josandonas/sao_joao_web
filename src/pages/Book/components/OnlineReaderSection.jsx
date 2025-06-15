import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { colors, media } from '../styles/BookReaderCommon.styles';
import OnlineReader from './OnlineReader';

// Estilos para a seção de leitura online
const OnlineReaderSectionContainer = styled.section`
  padding: 40px 20px;
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${media.md} {
    padding: 60px 40px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.text};
  margin-bottom: 20px;
  text-align: center;
  
  ${media.md} {
    font-size: 36px;
  }
`;

const SectionDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${colors.text};
  max-width: 800px;
  text-align: center;
  margin-bottom: 30px;
  
  ${media.md} {
    font-size: 18px;
    margin-bottom: 40px;
  }
`;

const ReadButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 30px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(63, 81, 181, 0.3);
  
  &:hover {
    background-color: #303f9f;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(63, 81, 181, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(63, 81, 181, 0.3);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  ${media.md} {
    padding: 16px 36px;
    font-size: 18px;
  }
`;

/**
 * Componente para a seção de leitura online do livro
 * @param {Object} props - Propriedades do componente
 * @returns {JSX.Element} - Componente renderizado
 */
const OnlineReaderSection = ({ pdfUrl, bookTitle }) => {
  const { t } = useTranslation();
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  
  // URL padrão do PDF se não for fornecida
  const defaultPdfUrl = '/assets/book/banho-de-sao-joao.pdf';
  const pdfUrlToUse = pdfUrl || defaultPdfUrl;
  
  // Função para lidar com o download do PDF
  const handleDownload = () => {
    window.open(pdfUrlToUse, '_blank');
  };
  
  // Função para compartilhar o livro
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: bookTitle || t('book.shareTitle', 'Banho de São João'),
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
    <OnlineReaderSectionContainer id="online-reader">
      <SectionTitle>{t('book.onlineReaderTitle', 'Leitura Online')}</SectionTitle>
      <SectionDescription>
        {t('book.onlineReaderDescription', 'Leia o livro completo "Banho de São João: Uma Tradição do Pantanal" diretamente no seu navegador, sem necessidade de download. Clique no botão abaixo para começar a leitura.')}
      </SectionDescription>
      
      <ReadButton onClick={() => setIsReaderOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
        {t('book.startReading', 'Começar a Leitura')}
      </ReadButton>
      
      {isReaderOpen && (
        <OnlineReader
          pdfUrl={pdfUrlToUse}
          title={bookTitle || t('book.title', 'Banho de São João: Uma Tradição do Pantanal')}
          onClose={() => setIsReaderOpen(false)}
          onDownload={handleDownload}
          onShare={handleShare}
          t={t}
        />
      )}
    </OnlineReaderSectionContainer>
  );
};

export default OnlineReaderSection;
