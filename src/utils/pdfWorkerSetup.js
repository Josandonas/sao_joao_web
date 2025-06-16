// Configuração do worker do PDF.js
import * as pdfjsLib from 'pdfjs-dist';

// Definindo o caminho para o worker
const workerSrc = `${window.location.origin}/pdf-worker/pdf.worker.min.js`;

// Configurando o worker global
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export default workerSrc;
