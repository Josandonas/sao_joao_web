/**
 * Utilitário para verificar a disponibilidade de recursos
 * Usado principalmente para verificar se um PDF existe antes de tentar carregá-lo
 */
export const checkResourceAvailability = async (url, options = {}) => {
  const { timeout = 5000, validateContentType = true } = options;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(url, { 
      method: 'HEAD',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return {
        available: false,
        error: new Error(`Recurso não encontrado (status: ${response.status})`)
      };
    }
    
    if (validateContentType) {
      const contentType = response.headers.get('content-type');
      const isValidType = url.endsWith('.pdf') 
        ? contentType && contentType.includes('application/pdf')
        : true;
        
      if (!isValidType) {
        return {
          available: false,
          error: new Error(`Tipo de conteúdo inválido: ${contentType}`)
        };
      }
    }
    
    return { available: true };
  } catch (error) {
    return {
      available: false,
      error: error.name === 'AbortError' 
        ? new Error('Tempo limite excedido ao verificar o recurso')
        : error
    };
  }
};
