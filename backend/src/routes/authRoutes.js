/**
 * Rotas de autenticação e gerenciamento de usuários
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, isAdmin } = require('../middlewares/auth');

// Rota de login (pública)
router.post('/login', authController.login);

// Rotas protegidas (requerem autenticação)
router.use(authenticate);

// Rotas de gerenciamento de usuários (apenas para administradores)
router.use(isAdmin);

// Registro de novos usuários (apenas admin pode criar)
router.post('/register', authController.register);

// Gerenciamento de usuários
router.get('/users', authController.getAllUsers);
router.get('/users/:id', authController.getUserById);
router.put('/users/:id', authController.updateUser);
router.delete('/users/:id', authController.deleteUser);
router.put('/users/:id/permissions', authController.updateUserPermissions);

// Listar todos os módulos
router.get('/modules', authController.getAllModules);

module.exports = router;
