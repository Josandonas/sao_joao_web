import { useState, useCallback } from 'react';
import { forceDownloadPdf } from '../services/pdfDownloadService';

/**
 * Hook para gerenciar ações relacionadas ao livro
 * @param {Object} options - Opções do hook
 * @param {string} options.pdfUrl - URL do PDF para download
 * @param {string} options.shareTitle - Título para compartilhamento
 * @param {string} options.shareText - Texto para compartilhamento
 * @returns {Object} - Funções e estado para ações do livro
 */
export const useBookActions = (options = {}) => {
  // Estado para controlar o status do compartilhamento
  const [shareStatus, setShareStatus] = useState({
    isSharing: false,
    shareSuccess: false,
    shareError: false,
    shareMessage: ''
  });
  
  // Estado para controlar o download do PDF
  const [downloadState, setDownloadState] = useState({
    isDownloading: false,
    pdfUrl: '',
    fileName: ''
  });
  
  // Título padrão para compartilhamento
  const defaultShareTitle = options.shareTitle || 'Banho de São João - Uma Tradição do Pantanal';
  
  // Texto padrão para compartilhamento
  const defaultShareText = options.shareText || 
    'Conheça a rica tradição do Banho de São João no Pantanal brasileiro.';
  
  // Função para forçar o download do PDF
  const handleDownload = useCallback(() => {
    try {
      // Usar o PDF correspondente ao idioma atual
      let pdfUrl = options.pdfUrl || '/assets/pdf/livro_pt.pdf';
      
      console.log('Iniciando download do PDF:', pdfUrl);
      
      // Usar o método de download direto
      forceDownloadPdf(pdfUrl)
        .then(() => {
          console.log('Download iniciado com sucesso');
        })
        .catch((error) => {
          console.error('Erro ao baixar PDF:', error);
          
          // Aqui poderia ter um fallback se necessário
        });
    } catch (error) {
      console.error('Erro ao iniciar download:', error);
    }
  }, [options.pdfUrl]);
  
  // Função para compartilhar o livro com tratamento de erros aprimorado
  const handleShare = async () => {
    setShareStatus({ isSharing: true, shareSuccess: false, shareError: false, shareMessage: '' });
    
    try {
      // Verificar se a API Web Share está disponível
      if (navigator.share) {
        await navigator.share({
          title: defaultShareTitle,
          text: defaultShareText,
          url: window.location.href
        });
        
        setShareStatus({ 
          isSharing: false, 
          shareSuccess: true, 
          shareError: false,
          shareMessage: 'Conteúdo compartilhado com sucesso!'
        });
        
        // Limpar mensagem de sucesso após alguns segundos
        setTimeout(() => {
          setShareStatus(prev => ({ ...prev, shareSuccess: false, shareMessage: '' }));
        }, 3000);
      } else {
        // Fallback para navegadores que não suportam a API Web Share
        // Tentar copiar o link para a área de transferência
        try {
          // Criar um elemento temporário para copiar o texto
          const textarea = document.createElement('textarea');
          textarea.value = `${defaultShareTitle}\n${defaultShareText}\n${window.location.href}`;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          
          setShareStatus({ 
            isSharing: false, 
            shareSuccess: true, 
            shareError: false,
            shareMessage: 'Link copiado para a área de transferência!'
          });
          
          // Limpar mensagem de sucesso após alguns segundos
          setTimeout(() => {
            setShareStatus(prev => ({ ...prev, shareSuccess: false, shareMessage: '' }));
          }, 3000);
        } catch (clipboardError) {
          throw new Error('Não foi possível copiar o link para a área de transferência.');
        }
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      
      setShareStatus({ 
        isSharing: false, 
        shareSuccess: false, 
        shareError: true,
        shareMessage: error.message || 'Erro ao compartilhar o conteúdo.'
      });
      
      // Limpar mensagem de erro após alguns segundos
      setTimeout(() => {
        setShareStatus(prev => ({ ...prev, shareError: false, shareMessage: '' }));
      }, 5000);
    }
  };
  
  // Função para abrir o PDF em uma nova aba para leitura online
  const handleReadOnline = () => {
    // Indicar que está processando
    setShareStatus({ isSharing: true, shareSuccess: false, shareError: false, shareMessage: '' });
    
    try {
      // Usar o PDF correspondente ao idioma atual
      const pdfUrl = options.pdfUrl || '/assets/pdf/livro_pt.pdf';
      
      // Abrir o PDF em uma nova aba
      window.open(pdfUrl, '_blank');
      
      // Atualizar o estado com sucesso
      setShareStatus({ 
        isSharing: false, 
        shareSuccess: true, 
        shareError: false,
        shareMessage: 'PDF aberto em nova aba!'
      });
      
      // Callback de sucesso se fornecido
      if (options.onSuccess) {
        options.onSuccess('PDF aberto em nova aba!');
      }
      
      // Limpar mensagem de sucesso após alguns segundos
      setTimeout(() => {
        setShareStatus(prev => ({ ...prev, shareSuccess: false, shareMessage: '' }));
      }, 3000);
    } catch (error) {
      console.error('Erro ao abrir PDF:', error);
      
      // Atualizar o estado com erro
      setShareStatus({ 
        isSharing: false, 
        shareSuccess: false, 
        shareError: true,
        shareMessage: error.message || 'Erro ao abrir o PDF.'
      });
      
      // Callback de erro se fornecido
      if (options.onError) {
        options.onError(`Erro ao abrir PDF: ${error.message}`);
      }
      
      // Limpar mensagem de erro após alguns segundos
      setTimeout(() => {
        setShareStatus(prev => ({ ...prev, shareError: false, shareMessage: '' }));
      }, 5000);
    }
  };
  
  return {
    handleDownload,
    handleShare,
    handleReadOnline,
    shareStatus
  };
};
