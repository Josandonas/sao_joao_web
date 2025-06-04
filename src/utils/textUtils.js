/**
 * Utilitário para tratamento de textos e caracteres especiais
 */

/**
 * Função que decodifica caracteres especiais em texto
 * Converte strings que contém códigos Unicode para seus caracteres reais
 * Ex: converte "Catu\\u00f3lica" para "Católica"
 * 
 * @param {string} text - Texto a ser decodificado
 * @returns {string} - Texto decodificado
 */
export const decodeSpecialChars = (text) => {
  if (!text) return '';
  
  // Se o texto já for um objeto, retorne sua representação como string
  if (typeof text !== 'string') {
    return String(text);
  }
  
  try {
    // Primeiro tenta decodificar diretamente se for um texto JSON com escapes
    if (text.includes('\\u')) {
      // Substitui \\u por \u para garantir que o JSON.parse funcione
      const jsonString = `"${text.replace(/\\/g, '\\\\').replace(/\\\\u/g, '\\u').replace(/"/g, '\\"')}"`;
      return JSON.parse(jsonString);
    }
    
    // Método adicional para decodificar entidades HTML, se necessário
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  } catch (error) {
    console.warn('Erro ao decodificar texto:', error);
    return text; // Retorna o texto original em caso de erro
  }
};

/**
 * Função que sanitiza valores de objeto, decodificando caracteres especiais em textos
 * @param {Object} obj - Objeto a ser sanitizado
 * @returns {Object} - Objeto sanitizado
 */
export const sanitizeObject = (obj) => {
  if (!obj) return obj;
  
  // Clone o objeto para não modificar o original
  const sanitized = { ...obj };
  
  // Para cada propriedade, sanitize o valor
  Object.keys(sanitized).forEach(key => {
    const value = sanitized[key];
    
    // Se for um objeto aninhado, sanitize-o recursivamente
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value);
    } 
    // Se for um array, sanitize cada item
    else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'object' ? sanitizeObject(item) : 
        typeof item === 'string' ? decodeSpecialChars(item) : item
      );
    }
    // Se for uma string, decodifique os caracteres especiais
    else if (typeof value === 'string') {
      sanitized[key] = decodeSpecialChars(value);
    }
  });
  
  return sanitized;
};
