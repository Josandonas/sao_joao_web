/**
 * Rotas para o painel administrativo
 */

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminTestimonialRoutes = require('./adminTestimonialRoutes');
const { authenticate, isAdmin } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Todas as rotas do painel administrativo requerem autenticação
router.use(authenticate);
router.use(isAdmin);

// Rota de logout específica para o painel administrativo
router.get('/logout', asyncHandler(require('../controllers/authController').processLogout));

// Rotas protegidas (requerem autenticação e permissão de administrador)
router.get('/', asyncHandler(adminController.renderDashboard));
router.get('/users', asyncHandler(adminController.renderUsersPage));
router.get('/logs', asyncHandler(adminController.renderLogsPage));
router.get('/profile', asyncHandler(adminController.renderProfilePage));
router.post('/profile', asyncHandler(adminController.updateProfile));

// Rotas de módulos administrativos
router.use('/testimonials', adminTestimonialRoutes);

module.exports = router;
