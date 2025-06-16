import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @deprecated Este componente está obsoleto. Use o componente DownloadLink do pacote react-download-link.
 * Componente para download direto de PDF - mantido para compatibilidade com código existente.
 */
const DirectPdfDownloader = ({ pdfUrl, buttonText, className, onComplete = () => {} }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  /**
   * Inicia o processo de download quando o botão é clicado
   * @param {Event} e - Evento do clique
   */
  const handleClick = async (e) => {
    e.preventDefault();
    
    if (isDownloading) return;
    
    try {
      setIsDownloading(true);
      
      // Simular download bem-sucedido
      console.warn('DirectPdfDownloader está obsoleto. Use o componente DownloadLink.');
      
      // Abrir o PDF em uma nova aba como fallback
      window.open(pdfUrl, '_blank');
      
      setIsDownloading(false);
      onComplete();
    } catch (error) {
      console.error('Erro ao processar download:', error);
      setIsDownloading(false);
      onComplete();
    }
  };
  
  return (
    <button
      className={className || 'pdf-download-button'}
      onClick={handleClick}
      disabled={isDownloading}
    >
      {isDownloading ? 'Baixando...' : buttonText || 'Download PDF'}
    </button>
  );
};

DirectPdfDownloader.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  onComplete: PropTypes.func
};

export default DirectPdfDownloader;
