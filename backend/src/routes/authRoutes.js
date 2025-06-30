/**
 * Rotas de autenticação e gerenciamento de usuários
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, isAdmin } = require('../middlewares/auth');
const { asyncHandler } = require('../middlewares/errorHandler');

// Rotas públicas de autenticação
router.get('/login', authController.renderLoginPage);
router.post('/login', asyncHandler(authController.login));
router.get('/logout', asyncHandler(authController.processLogout));

// Rotas de API públicas
router.post('/api/login', authController.login); // API login

// Rotas protegidas (requerem autenticação)
router.use('/api', authenticate);

// Rotas de gerenciamento de usuários (apenas para administradores)
router.use('/api', isAdmin);

// Registro de novos usuários (apenas admin pode criar)
router.post('/api/register', authController.register);

// Gerenciamento de usuários
router.get('/api/users', authController.getAllUsers);
router.get('/api/users/:id', authController.getUserById);
router.put('/api/users/:id', authController.updateUser);
router.delete('/api/users/:id', authController.deleteUser);
router.put('/api/users/:id/permissions', authController.updateUserPermissions);

// Listar todos os módulos
router.get('/api/modules', authController.getAllModules);

module.exports = router;
