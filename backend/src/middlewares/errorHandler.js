/**
 * Middleware para tratamento centralizado de erros
 */

const { logger } = require('../utils/logger');

/**
 * Middleware para capturar e tratar erros de forma centralizada
 * @param {Error} err - Objeto de erro
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const errorHandler = (err, req, res, next) => {
  // Determinar o código de status HTTP
  const statusCode = err.statusCode || 500;
  
  // Determinar a mensagem de erro
  const message = err.message || 'Erro interno do servidor';
  
  // Registrar o erro no sistema de logs
  logger.error(`${statusCode} - ${message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    user: req.user ? req.user.id : 'anônimo'
  });
  
  // Verificar se é uma requisição de API ou uma página HTML
  const isApiRequest = req.path.startsWith('/api/') || 
                      req.xhr || 
                      req.headers.accept?.indexOf('json') !== -1;
  
  if (isApiRequest) {
    // Responder com JSON para requisições de API
    return res.status(statusCode).json({
      status: 'error',
      message: process.env.NODE_ENV === 'production' && statusCode === 500
        ? 'Erro interno do servidor'
        : message,
      // Incluir detalhes do erro apenas em ambiente de desenvolvimento
      ...(process.env.NODE_ENV !== 'production' && {
        stack: err.stack,
        details: err.details || {}
      })
    });
  } else {
    // Para erros de autenticação, redirecionar para a página de login
    if (statusCode === 401) {
      if (req.session) {
        req.flash('error', message);
      }
      return res.redirect('/admin/login');
    }
    
    // Para outros erros, renderizar a página de erro
    return res.status(statusCode).render('error', {
      pageTitle: 'Erro',
      error: message,
      layout: 'layouts/auth'
    });
  }
};

/**
 * Classe para criar erros personalizados com código de status HTTP
 */
class AppError extends Error {
  /**
   * @param {string} message - Mensagem de erro
   * @param {number} statusCode - Código de status HTTP
   * @param {Object} details - Detalhes adicionais do erro
   */
  constructor(message, statusCode = 500, details = {}) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Middleware para capturar rotas não encontradas
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const notFoundHandler = (req, res, next) => {
  const error = new AppError(`Rota não encontrada - ${req.originalUrl}`, 404);
  next(error);
};

/**
 * Middleware para capturar erros assíncronos
 * @param {Function} fn - Função assíncrona
 * @returns {Function} Middleware Express
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = {
  errorHandler,
  AppError,
  notFoundHandler,
  asyncHandler
};
