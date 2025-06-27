/**
 * Rotas para o painel administrativo
 */

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminTestimonialRoutes = require('./adminTestimonialRoutes');
const { authenticateJWT, isAdmin } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Middleware para verificar se o usuário está autenticado via cookie
const checkAdminAuth = (req, res, next) => {
  // Se o usuário já está autenticado, redirecionar para o dashboard
  if (req.path === '/login' && req.cookies.auth_token) {
    return res.redirect('/admin');
  }
  
  // Se o usuário não está autenticado e tenta acessar uma rota protegida
  if (req.path !== '/login' && !req.cookies.auth_token) {
    return res.redirect('/admin/login');
  }
  
  next();
};

// Aplicar middleware de verificação de autenticação em todas as rotas
router.use(checkAdminAuth);

// Rotas públicas (sem autenticação)
router.get('/login', adminController.renderLoginPage);
router.post('/login', asyncHandler(adminController.processLogin));
router.get('/logout', asyncHandler(adminController.processLogout));

// Middleware para proteger rotas administrativas
router.use(authenticateJWT);
router.use(isAdmin);

// Rotas protegidas (requerem autenticação e permissão de administrador)
router.get('/', asyncHandler(adminController.renderDashboard));
router.get('/users', asyncHandler(adminController.renderUsersPage));
router.get('/logs', asyncHandler(adminController.renderLogsPage));
router.get('/profile', asyncHandler(adminController.renderProfilePage));
router.post('/profile', asyncHandler(adminController.updateProfile));

// Rotas de módulos administrativos
router.use('/testimonials', adminTestimonialRoutes);

module.exports = router;
