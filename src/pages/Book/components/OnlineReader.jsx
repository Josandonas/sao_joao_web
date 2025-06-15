import React, { useState, useEffect } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

// Importando estilos necessários
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

// Importando a biblioteca pdfjs-dist para configurar o worker
import { GlobalWorkerOptions } from 'pdfjs-dist';

// Importando componentes de estilo
import {
  OnlineReaderContainer,
  ReaderHeader,
  ReaderTitle,
  ReaderControls,
  ActionButton,
  ViewerContainer,
  LoadingMessage,
  ErrorMessage
} from '../styles/OnlineReaderStyles';

/**
 * Componente para leitura online de PDF usando @react-pdf-viewer/core
 * @param {Object} props - Propriedades do componente
 * @returns {JSX.Element} - Componente renderizado
 */
const OnlineReader = ({
  pdfUrl,
  title,
  onClose,
  onDownload,
  onShare,
  t
}) => {
  // Estados para controlar o carregamento e erros
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Configurando o worker do PDF.js
  useEffect(() => {
    // Definindo o caminho para o worker usando uma URL absoluta
    const workerUrl = new URL('/pdf-worker/pdf.worker.min.js', window.location.origin).toString();
    GlobalWorkerOptions.workerSrc = workerUrl;
    
    console.log('Worker configurado:', workerUrl);
  }, []);
  
  // Plugins para o visualizador de PDF
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [
      defaultTabs[0], // Miniaturas
      defaultTabs[2], // Marcadores
    ],
  });
  
  // Plugin de navegação de página
  const pageNavigationPluginInstance = pageNavigationPlugin();
  
  // Combinando todos os plugins
  const plugins = [
    defaultLayoutPluginInstance,
    pageNavigationPluginInstance,
  ];
  
  // Manipuladores de eventos
  const handleDocumentLoad = () => {
    setLoading(false);
    setError(null);
    console.log('PDF carregado com sucesso');
  };
  
  const handleLoadError = (err) => {
    console.error('Erro ao carregar o PDF:', err);
    setError(err);
    setLoading(false);
  };
  
  return (
    <OnlineReaderContainer>
      <ReaderHeader>
        <ReaderTitle>{title || t('book.onlineReading', 'Leitura Online')}</ReaderTitle>
        <ReaderControls>
          {onDownload && (
            <ActionButton onClick={onDownload} title={t('book.download', 'Baixar')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </ActionButton>
          )}
          
          {onShare && (
            <ActionButton onClick={onShare} title={t('book.share', 'Compartilhar')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </ActionButton>
          )}
          
          <ActionButton onClick={onClose} title={t('book.close', 'Fechar')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </ActionButton>
        </ReaderControls>
      </ReaderHeader>
      
      <ViewerContainer>
        {loading && (
          <LoadingMessage>{t('book.loading', 'Carregando PDF...')}</LoadingMessage>
        )}
        
        {error && (
          <ErrorMessage>{t('book.errorLoading', 'Erro ao carregar o PDF. Por favor, tente novamente.')}</ErrorMessage>
        )}
        
        <Worker>
          <Viewer
            fileUrl={pdfUrl}
            plugins={plugins}
            onDocumentLoad={handleDocumentLoad}
            onError={handleLoadError}
          />
        </Worker>
      </ViewerContainer>
    </OnlineReaderContainer>
  );
};

export default OnlineReader;
