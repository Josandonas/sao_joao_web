/**
 * Este arquivo foi mantido para compatibilidade com código existente,
 * mas a funcionalidade de download foi substituída pelo componente react-download-link.
 * 
 * @deprecated Use o componente DownloadLink diretamente nos componentes de UI.
 */

/**
 * Função mantida para compatibilidade com código existente.
 * @deprecated Use o componente DownloadLink diretamente.
 */
export const forceDownloadPdf = async (pdfUrl, fileName = null) => {
  console.warn('forceDownloadPdf está obsoleto. Use o componente DownloadLink diretamente.');
  return true;
};
