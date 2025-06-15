import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaDownload, FaExpand } from 'react-icons/fa';

// Importações da biblioteca de visualização de PDF
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Importando estilos necessários
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Importando estilos do componente
import {
  PDFContainer,
  ViewerContainer,
  ToolbarContainer,
  ToolbarButtonGroup,
  BackButton,
  DownloadButton,
  FullscreenButton,
  ErrorContainer,
  ErrorText,
  LoadingContainer,
  LoadingText
} from '../styles/PDFViewerStyles';

/**
 * Componente para visualização de PDF usando @react-pdf-viewer/core
 * @param {Object} props - Propriedades do componente
 * @param {string} props.pdfUrl - URL do arquivo PDF a ser exibido
 * @param {Function} props.onBackClick - Função chamada ao clicar no botão de voltar
 * @param {Function} props.onDownload - Função chamada ao clicar no botão de download
 * @param {Function} props.onToggleFullscreen - Função chamada ao clicar no botão de tela cheia
 * @param {boolean} props.isFullscreen - Indica se o componente está em modo de tela cheia
 * @returns {JSX.Element} - Componente renderizado
 */
const PDFViewer = ({ 
  pdfUrl, 
  onBackClick, 
  onDownload, 
  onToggleFullscreen, 
  isFullscreen = false
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Definir o worker local diretamente
  const workerUrl = `${window.location.origin}/pdf-worker/pdf.worker.min.js`;
  
  // Plugin de layout padrão com todas as funcionalidades
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [
      // Mostrar apenas a guia de miniaturas e marcadores
      defaultTabs[0], // Miniaturas
      defaultTabs[2], // Marcadores
    ],
  });

  // Garantir que a URL do PDF seja absoluta
  const fullPdfUrl = pdfUrl.startsWith('http') ? pdfUrl : `${window.location.origin}${pdfUrl}`;

  // Verificar se o PDF está acessível
  useEffect(() => {
    const checkPdfAccess = async () => {
      try {
        const response = await fetch(fullPdfUrl, { method: 'HEAD' });
        if (response.ok) {
          console.log('PDF acessível:', response.status);
        } else {
          console.error('PDF não acessível. Código:', response.status);
          setError(new Error(`PDF não encontrado (${response.status})`));
        }
      } catch (error) {
        console.error('Erro ao verificar PDF:', error);
        setError(error);
      }
    };
    
    checkPdfAccess();
  }, [fullPdfUrl]);

  // Manipulador para quando o PDF for carregado
  const handleDocumentLoad = () => {
    setLoading(false);
    setError(null);
    console.log('PDF carregado com sucesso');
  };

  // Manipulador para erros de carregamento
  const handleLoadError = (err) => {
    console.error('Erro ao carregar o PDF:', err);
    setError(err);
    setLoading(false);
  };

  // Renderiza a barra de ferramentas personalizada
  const CustomToolbar = () => (
    <ToolbarContainer>
      <ToolbarButtonGroup>
        <BackButton onClick={onBackClick}>
          <FaArrowLeft /> Voltar
        </BackButton>
      </ToolbarButtonGroup>
      
      <ToolbarButtonGroup>
        {onDownload && (
          <DownloadButton onClick={onDownload}>
            <FaDownload /> Baixar
          </DownloadButton>
        )}
        
        {onToggleFullscreen && (
          <FullscreenButton onClick={onToggleFullscreen}>
            <FaExpand /> {isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia'}
          </FullscreenButton>
        )}
      </ToolbarButtonGroup>
    </ToolbarContainer>
  );

  return (
    <PDFContainer>
      {loading && (
        <LoadingContainer>
          <LoadingText>Carregando PDF...</LoadingText>
        </LoadingContainer>
      )}
      
      {error && (
        <ErrorContainer>
          <ErrorText>Erro ao carregar o PDF. Por favor, tente novamente.</ErrorText>
        </ErrorContainer>
      )}
      
      {onBackClick && <CustomToolbar />}
      
      <ViewerContainer $hasToolbar={Boolean(onBackClick)}>
        {workerUrl && (
          <Worker workerUrl={workerUrl}>
            <Viewer
              fileUrl={fullPdfUrl}
              plugins={[defaultLayoutPluginInstance]}
              onDocumentLoad={handleDocumentLoad}
              onError={handleLoadError}
            />
          </Worker>
        )}
      </ViewerContainer>
    </PDFContainer>
  );
}

export default PDFViewer;
