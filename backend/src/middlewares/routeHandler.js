/**
 * Middleware para gerenciar rotas e redirecionamentos
 */

const { logger } = require('../utils/logger');
const jwt = require('jsonwebtoken');

/**
 * Verifica se o usuário está autenticado com base no cookie
 * @param {Object} req - Objeto de requisição Express
 * @returns {boolean} - Verdadeiro se o usuário estiver autenticado
 */
const isAuthenticated = (req) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) return false;
    
    // Verificar se JWT_SECRET está definido
    if (!process.env.JWT_SECRET) {
      process.env.JWT_SECRET = 'sao_joao_web_secret_key_2025'; // Fallback para desenvolvimento
    }
    
    // Verificar token
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Middleware para proteger rotas públicas de usuários já autenticados
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const protectPublicRoutes = (req, res, next) => {
  // Rotas públicas que devem redirecionar para o dashboard se o usuário já estiver autenticado
  const publicAuthRoutes = [
    '/',
    '/login'
  ];
  
  // Se o usuário estiver autenticado e tentar acessar uma rota pública de autenticação
  if (isAuthenticated(req) && publicAuthRoutes.includes(req.path)) {
    logger.info(`Usuário autenticado tentando acessar ${req.path}. Redirecionando para o dashboard.`);
    return res.redirect('/admin');
  }
  
  next();
};

/**
 * Middleware para redirecionar rotas não encontradas para a página inicial
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const redirectToHome = (req, res, next) => {
  // Lista de rotas públicas que não devem ser redirecionadas
  const publicRoutes = [
    '/',
    '/login',
    '/api/login',
    '/logout',
    '/css',
    '/js',
    '/img',
    '/views',
    '/favicon.ico'
  ];

  // Verificar se a rota atual é uma rota pública
  const isPublicRoute = publicRoutes.some(route => 
    req.path === route || req.path.startsWith(`${route}/`)
  );

  // Se for uma rota de API, continuar para o próximo middleware
  if (req.path.startsWith('/api/')) {
    return next();
  }

  // Se for uma rota pública ou uma rota de admin (que já tem seu próprio middleware de autenticação),
  // continuar para o próximo middleware
  if (isPublicRoute || req.path.startsWith('/admin/')) {
    return next();
  }

  // Para qualquer outra rota, redirecionar para a página inicial
  logger.info(`Redirecionando rota não autenticada: ${req.path} para a página inicial`);
  return res.redirect('/');
};

module.exports = {
  redirectToHome,
  protectPublicRoutes,
  isAuthenticated
};
