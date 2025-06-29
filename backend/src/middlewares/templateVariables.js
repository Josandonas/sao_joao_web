/**
 * Middleware para garantir que variáveis comuns estejam disponíveis em todos os templates
 */

/**
 * Adiciona variáveis comuns a todos os templates
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const addTemplateVariables = (req, res, next) => {
  // Adiciona a função res.render original
  const originalRender = res.render;
  
  // Sobrescreve a função render para incluir variáveis comuns
  res.render = function(view, options, callback) {
    // Mescla as opções padrão com as opções fornecidas
    const defaultOptions = {
      user: req.user || null,
      currentPath: req.path,
      isAuthenticated: !!req.user,
      messages: req.flash ? req.flash() : {}
    };
    
    // Combina as opções padrão com as opções fornecidas
    const mergedOptions = { ...defaultOptions, ...options };
    
    // Chama a função render original com as opções mescladas
    originalRender.call(this, view, mergedOptions, callback);
  };
  
  next();
};

module.exports = {
  addTemplateVariables
};
