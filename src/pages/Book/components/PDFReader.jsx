import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useTranslation } from 'react-i18next';
import usePdfZoom from '../hooks/usePdfZoom';
import { PDFContainer, PDFContent, LoadingIndicator, ErrorMessage, ZoomIndicator } from '../styles/PDFReaderStyles';
// Configuração necessária para o react-pdf
// Usando o arquivo local em vez do CDN
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf-worker/pdf.worker.min.js`;

/**
 * Componente para visualização de PDF usando react-pdf
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.pdfUrl - URL do arquivo PDF a ser exibido
 * @param {number} props.currentPage - Número da página atual
 * @param {Function} props.onPageChange - Função chamada quando a página é alterada
 * @param {Function} props.onDocumentLoadSuccess - Função chamada quando o documento é carregado com sucesso
 * @param {boolean} props.darkMode - Indica se o modo escuro está ativado
 * @param {boolean} props.zoomEnabled - Indica se o zoom está habilitado
 * @param {number} props.zoomLevel - Nível de zoom atual
 * @returns {JSX.Element} - Componente renderizado
 */
const PDFReader = ({
  pdfUrl,
  currentPage = 1,
  onPageChange,
  onDocumentLoadSuccess,
  darkMode = false,
  zoomEnabled = false,
  zoomLevel = 1,
  onZoomChange,
}) => {
  const { t } = useTranslation();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(currentPage);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showZoomIndicator, setShowZoomIndicator] = useState(false);
  const zoomIndicatorTimeoutRef = useRef(null);
  
  // Atualiza o número da página quando o currentPage muda
  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage]);
  
  // Função para lidar com o carregamento bem-sucedido do documento
  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
    if (onDocumentLoadSuccess) {
      onDocumentLoadSuccess({ numPages });
    }
  };
  
  // Função para lidar com erros de carregamento
  const handleError = (error) => {
    console.error('Erro ao carregar o PDF:', error);
    setError(error);
    setIsLoading(false);
  };
  
  // Função para lidar com a mudança de página
  const handlePageChange = (newPageNumber) => {
    if (newPageNumber >= 1 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
      if (onPageChange) {
        onPageChange(newPageNumber);
      }
    }
  };
  
  // Usar o hook personalizado para gerenciar o zoom
  // Usamos o valor inicial de zoomLevel das props
  const initialZoomFromProps = zoomLevel;
  const {
    zoomLevel: currentZoomLevel,
    handleZoomIn,
    handleZoomOut,
    handleWheel,
    applyScrollAfterZoom,
    trackMousePosition,
    fitToWidth: hookFitToWidth
  } = usePdfZoom(initialZoomFromProps, onZoomChange, zoomEnabled);
  
  // Calcula a escala com base no nível de zoom do hook
  // Quando o zoom está ativado, aplicamos o nível de zoom do hook, caso contrário, escala 1
  const scale = zoomEnabled ? currentZoomLevel : 1;
  
  // Referências para os elementos do DOM
  const pdfContainerRef = useRef(null);
  const pdfContentRef = useRef(null);
  
  // Adiciona event listeners para o scroll do mouse e rastreamento do mouse
  useEffect(() => {
    const contentElement = pdfContentRef.current;
    if (contentElement && zoomEnabled) {
      // Event listener para o scroll do mouse
      const wheelHandler = (e) => handleWheel(e, pdfContentRef);
      contentElement.addEventListener('wheel', wheelHandler, { passive: false });
      
      // Rastreamento contínuo da posição do mouse para zoom mais preciso
      const cleanupMouseTracking = trackMousePosition(pdfContentRef);
      
      return () => {
        contentElement.removeEventListener('wheel', wheelHandler);
        if (cleanupMouseTracking) cleanupMouseTracking();
      };
    }
  }, [zoomEnabled, handleWheel, trackMousePosition]);
  
  // Função para mostrar o indicador de zoom temporariamente
  const showZoomIndicatorTemporarily = useCallback(() => {
    // Limpa o timeout anterior, se houver
    if (zoomIndicatorTimeoutRef.current) {
      clearTimeout(zoomIndicatorTimeoutRef.current);
    }
    
    // Mostra o indicador
    setShowZoomIndicator(true);
    
    // Configura um novo timeout para esconder o indicador após 2 segundos
    zoomIndicatorTimeoutRef.current = setTimeout(() => {
      setShowZoomIndicator(false);
    }, 2000);
  }, []);
  
  // Efeito para mostrar o indicador quando o zoom mudar
  useEffect(() => {
    if (zoomEnabled) {
      showZoomIndicatorTemporarily();
    }
  }, [currentZoomLevel, showZoomIndicatorTemporarily, zoomEnabled]);
  
  // Efeito para aplicar scroll após zoom
  useEffect(() => {
    applyScrollAfterZoom(pdfContentRef, scale);
  }, [applyScrollAfterZoom, scale]);
  
  // Função para ajustar o PDF à largura da tela
  const fitToWidth = useCallback(() => {
    if (numPages && pdfContainerRef.current) {
      setIsLoading(true);
      // Usar a função do hook
      setTimeout(() => {
        hookFitToWidth(pdfContentRef, 800); // 800px é a largura estimada do PDF
        setIsLoading(false);
        // Mostrar o indicador de zoom
        if (zoomEnabled) {
          showZoomIndicatorTemporarily();
        }
      }, 100);
    }
  }, [numPages, pdfContainerRef, hookFitToWidth, pdfContentRef, zoomEnabled, showZoomIndicatorTemporarily]);
  
  // Adicionar atalhos de teclado para zoom
  useEffect(() => {
    if (!zoomEnabled) return;
    
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + '+' para aumentar o zoom
      if ((e.ctrlKey || e.metaKey) && e.key === '+') {
        e.preventDefault();
        handleZoomIn(pdfContentRef);
        showZoomIndicatorTemporarily();
      }
      // Ctrl/Cmd + '-' para diminuir o zoom
      else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        handleZoomOut(pdfContentRef);
        showZoomIndicatorTemporarily();
      }
      // Ctrl/Cmd + '0' para ajustar à largura
      else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        fitToWidth();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomEnabled, handleZoomIn, handleZoomOut, pdfContentRef, showZoomIndicatorTemporarily, fitToWidth]);
  
  // Efeito para ajustar o zoom quando a janela é redimensionada
  useEffect(() => {
    if (zoomEnabled && numPages && currentZoomLevel === 1) {
      fitToWidth();
    }
  }, [numPages, zoomEnabled, currentZoomLevel, fitToWidth]); // Incluindo fitToWidth como dependência
  
  return (
    <PDFContainer $darkMode={darkMode} ref={pdfContainerRef}>
      {zoomEnabled && showZoomIndicator && (
        <ZoomIndicator $darkMode={darkMode}>
          {Math.round(currentZoomLevel * 100)}%
        </ZoomIndicator>
      )}
      <PDFContent 
        $darkMode={darkMode} 
        $zoomEnabled={zoomEnabled} 
        $zoomLevel={currentZoomLevel}
        ref={pdfContentRef}>
        {isLoading && (
          <LoadingIndicator $darkMode={darkMode}>
            <div className="loading-text">
              {t('book.loadingPdf', 'Carregando PDF...')}
            </div>
          </LoadingIndicator>
        )}
        
        <Document
          file={pdfUrl}
          onLoadSuccess={handleDocumentLoadSuccess}
          onLoadError={handleError}
          loading={
            <LoadingIndicator $darkMode={darkMode}>
              <div className="loading-text">
                {t('book.loadingPdf', 'Carregando PDF...')}
              </div>
            </LoadingIndicator>
          }
          error={
            <ErrorMessage $darkMode={darkMode}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p>{t('book.pdfError', 'Erro ao carregar o PDF. Por favor, tente novamente.')}</p>
            </ErrorMessage>
          }
        >
          {numPages && (
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={zoomEnabled ? undefined : window.innerWidth - 120} /* Largura total menos espaço para as setas */
              customTextRenderer={null}
              loading={
                <LoadingIndicator $darkMode={darkMode}>
                  <div className="loading-text">
                    {t('book.loadingPage', 'Carregando página...')}
                  </div>
                </LoadingIndicator>
              }
              className={darkMode ? 'dark-mode-page' : ''}
            />
          )}
        </Document>
        
        {error && (
          <ErrorMessage darkMode={darkMode}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>{t('book.pdfError', 'Erro ao carregar o PDF. Por favor, tente novamente.')}</p>
          </ErrorMessage>
        )}
      </PDFContent>
    </PDFContainer>
  );
};

export default PDFReader;
