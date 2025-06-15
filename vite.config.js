import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
// Função para copiar o worker do PDF.js para o diretório público
function copyPdfWorker() {
  return {
    name: 'copy-pdf-worker',
    buildStart() {
      // Verificar se o diretório existe, se não, criar
      if (!fs.existsSync('public/pdf-worker')) {
        fs.mkdirSync('public/pdf-worker', { recursive: true });
      }
      
      // Caminho para o worker do PDF.js no node_modules
      const workerPath = path.resolve(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.min.js');
      
      // Destino no diretório público
      const destPath = path.resolve(__dirname, 'public/pdf-worker/pdf.worker.min.js');
      
      // Copiar o arquivo se existir
      if (fs.existsSync(workerPath)) {
        fs.copyFileSync(workerPath, destPath);
        console.log('PDF.js worker copiado com sucesso para o diretório público');
      } else {
        console.warn('Arquivo worker do PDF.js não encontrado em node_modules');
      }
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    copyPdfWorker()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './assets'),
    }
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      // Configuração para o worker do PDF.js
      output: {
        manualChunks: {
          'pdf.worker': ['pdfjs-dist/build/pdf.worker.min.js'],
        },
      },
    },
  }
})
