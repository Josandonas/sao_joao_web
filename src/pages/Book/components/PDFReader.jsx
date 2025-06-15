import React from 'react';
import PDFViewer from './PDFViewer';

/**
 * Componente para visualização de PDF usando @react-pdf-viewer/core
 * Este componente é um wrapper para o PDFViewer para manter compatibilidade com o código existente
 */
const PDFReader = (props) => {
  return <PDFViewer {...props} />;
};

export default PDFReader;
