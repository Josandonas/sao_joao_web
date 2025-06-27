import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para registro de erros no console (apenas para desenvolvedores)
 * @param {Object} props - Propriedades do componente
 */
const ErrorDisplay = ({ error }) => {
  // Se não houver erro, não renderiza nada
  if (!error) return null;
  
  // Registra o erro no console para desenvolvedores
  useEffect(() => {
    if (error) {
      console.error('Galeria Error:', error);
    }
  }, [error]);
  
  // Não renderiza nada visível para o usuário
  return null;
};

ErrorDisplay.propTypes = {
  error: PropTypes.string
};

export default ErrorDisplay;
