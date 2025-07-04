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
router.post('/', userController.createUser); // Criação de usuário
router.post('/:id', userController.updateUser); // Atualização de usuário (usando POST em vez de PUT para compatibilidade com forms)
router.post('/:id/delete', userController.deleteUser); // Exclusão lógica de usuário

// Rotas para ativação e desativação de usuários
router.post('/:id/deactivate', userController.deactivateUser);
router.post('/:id/activate', userController.activateUser);

module.exports = router;
