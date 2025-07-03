/**
 * Rotas para o módulo de gerenciamento de usuários
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rotas de visualização
router.get('/', userController.renderUserList);
router.get('/create', userController.renderCreateUser);
router.get('/:id/view', userController.renderUserDetails);
router.get('/:id/edit', userController.renderEditUser);
router.get('/:id/data', userController.getUserData);

// Rotas de operações CRUD
router.post('/create', userController.createUser);
router.post('/:id/update', userController.updateUser);
router.post('/:id/delete', userController.deleteUser);
router.post('/:id/permissions', userController.updateUserPermissions);

// Rotas para ativação e desativação de usuários
router.post('/:id/deactivate', userController.deactivateUser);
router.post('/:id/activate', userController.activateUser);

module.exports = router;
