import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { forceDownloadPdf } from '../services/pdfDownloadService';

/**
 * Componente para download invisível de PDF usando a estratégia de abrir e fechar a aba
 */
const PdfDownloader = ({ pdfUrl, triggerDownload = false, onComplete = () => {} }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Efeito para iniciar o download quando triggerDownload muda para true
  React.useEffect(() => {
    if (triggerDownload && !isDownloading && pdfUrl) {
      setIsDownloading(true);
      
      const downloadFile = async () => {
        try {
          console.log('PdfDownloader: Iniciando download do PDF usando método de abrir e fechar aba');
          
          // Extrair nome do arquivo da URL
          const fileName = pdfUrl.split('/').pop() || 'documento.pdf';
          
          // Usar o método simplificado de abrir e fechar a aba
          await forceDownloadPdf(pdfUrl, fileName);
          
          console.log('PdfDownloader: Download iniciado com sucesso');
          setIsDownloading(false);
          onComplete();
        } catch (error) {
          console.error('PdfDownloader: Erro ao baixar PDF:', error);
          setIsDownloading(false);
          onComplete();
        }
      };
      
      downloadFile();
    }
  }, [triggerDownload, pdfUrl, isDownloading, onComplete]);
  
  // Componente invisível, não renderiza nada visível
  return null;
};

PdfDownloader.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
  triggerDownload: PropTypes.bool,
  onComplete: PropTypes.func
};

export default PdfDownloader;
