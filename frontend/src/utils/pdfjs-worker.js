// Este arquivo configura o worker do PDF.js globalmente para @react-pdf-viewer/core
import { GlobalWorkerOptions } from 'pdfjs-dist';

// Definindo o caminho do worker usando URL relativa ao site
// Esta abordagem funciona bem com Vite
const workerSrc = new URL('/pdf-worker/pdf.worker.min.js', window.location.origin).toString();

// Configurando o worker globalmente
GlobalWorkerOptions.workerSrc = workerSrc;

export default workerSrc;
