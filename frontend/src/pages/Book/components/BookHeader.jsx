import React from 'react';
import { useTranslation } from 'react-i18next';
import DownloadLink from 'react-download-link';
import { useBookContext } from '../context/BookContext';

import {
  DownloadButton,
  ShareButton
} from '../styles/ActionButtonStyles';
import {
  Container,
  ButtonsContainer,
  StatusMessage,
  ReadOnlineButton
} from '../styles/BookHeaderStyles';

/**
 * Componente de cabeçalho para a página do livro
 * @param {Object} props - Props do componente
 * @param {Function} props.onShare - Função para compartilhar o livro
 * @param {Function} props.onReadOnline - Função para abrir o PDF em uma nova aba
 * @param {Object} props.shareStatus - Status do compartilhamento
 * @returns {JSX.Element} - Componente renderizado
 */
const BookHeader = ({
  onShare,
  onReadOnline,
  shareStatus = {}
}) => {
  const { t, i18n } = useTranslation();
  const { books } = useBookContext();

  // Função auxiliar para determinar o caminho do PDF
  const getPdfPath = () => {
    const currentLang = i18n.language || 'pt';
    let pdfLang = 'pt';

    if (currentLang.startsWith('en')) {
      pdfLang = 'en';
    } else if (currentLang.startsWith('es')) {
      pdfLang = 'es';
    }
    
    // Usar o PDF do livro selecionado via contexto
    return books.getSelectedBookPdfUrl(pdfLang);
  };

  // Função que será passada para exportFile
  const handleDownloadPdf = async () => {
    const pdfUrl = getPdfPath();
    console.log('Tentando baixar PDF de:', pdfUrl); // Para depuração
    
    if (!pdfUrl) {
      console.error('URL do PDF não disponível');
      return null;
    }

    try {
      const response = await fetch(pdfUrl);

      if (!response.ok) {
        // Lidar com erros de status HTTP (404, 500, 401, etc.)
        console.error('Erro ao baixar o PDF. Status:', response.status, response.statusText);
        const errorText = await response.text(); // Tentar ler a resposta de erro
        console.error('Resposta de erro do servidor:', errorText);
        // Você pode mostrar uma mensagem de erro para o usuário aqui
        throw new Error(`Falha no download do PDF: ${response.status} ${response.statusText}`);
      }

      // IMPORTANTE: Retornar o conteúdo do arquivo como Blob
      const blob = await response.blob();
      console.log('PDF Blob criado com sucesso. Tamanho:', blob.size, 'bytes'); // Para depuração
      return blob; // É isso que react-download-link precisa!

    } catch (error) {
      console.error('Erro durante o fetch do PDF:', error);
      // Retornar null ou re-lançar para que o DownloadLink saiba que falhou
      return null;
    }
  };

  return (
    <Container>
      <ButtonsContainer>
        <DownloadLink
          label={
            <DownloadButton as="span">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t('book.downloadPdf')}
            </DownloadButton>
          }
          filename={`${t('book.pdfFileName')}_${i18n.language}.pdf`}
          exportFile={handleDownloadPdf} // Agora passa a função assíncrona que retorna o Blob
          style={{ textDecoration: 'none' }}
        />

        <ShareButton onClick={onShare} disabled={shareStatus.isSharing}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          {shareStatus.isSharing ? t('book.sharing', 'Compartilhando...') : t('book.share', 'Compartilhar')}
        </ShareButton>

        {/* Botão para ler o PDF online */}
        <ReadOnlineButton onClick={onReadOnline}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          {t('book.readOnline', 'Ler Online')}
        </ReadOnlineButton>
      </ButtonsContainer>

      {/* Mensagens de status */}
      {shareStatus.success && (
        <StatusMessage success>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          {shareStatus.success}
        </StatusMessage>
      )}

      {shareStatus.error && (
        <StatusMessage>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {shareStatus.error}
        </StatusMessage>
      )}
    </Container>
  );
};

export default BookHeader;