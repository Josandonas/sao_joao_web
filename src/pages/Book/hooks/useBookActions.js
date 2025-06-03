/**
 * Hook para gerenciar ações relacionadas ao livro
 * @param {Object} options - Opções para configurar as ações
 * @returns {Object} - Funções para realizar ações no livro
 */
export const useBookActions = (options = {}) => {
  // Título padrão para compartilhamento
  const defaultShareTitle = options.shareTitle || 'Banho de São João - Uma Tradição do Pantanal';
  
  // Texto padrão para compartilhamento
  const defaultShareText = options.shareText || 
    'Conheça a rica tradição do Banho de São João no Pantanal brasileiro.';
  
  // Função para fazer download do PDF
  const handleDownload = () => {
    // Verificar se há um PDF personalizado nas opções
    const pdfUrl = options.pdfUrl || '/assets/book/banho-de-sao-joao.pdf';
    
    // Se estamos em modo de desenvolvimento ou se o PDF ainda não está disponível
    if (options.pdfNotReady) {
      alert('O PDF do livro estará disponível em breve para download!');
      return;
    }
    
    // Quando o PDF estiver disponível, implementar:
    window.open(pdfUrl, '_blank');
  };
  
  // Função para compartilhar o livro
  const handleShare = () => {
    // Verificar se a API Web Share está disponível
    if (navigator.share) {
      navigator.share({
        title: defaultShareTitle,
        text: defaultShareText,
        url: window.location.href
      })
      .catch(error => console.log('Erro ao compartilhar:', error));
    } else {
      // Fallback para navegadores que não suportam a API Web Share
      alert('Compartilhamento não suportado pelo seu navegador. Copie o link e compartilhe manualmente.');
    }
  };
  
  return {
    handleDownload,
    handleShare
  };
};
