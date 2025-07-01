/**
 * Rotas para o módulo de auditoria
 */

const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');

// Rotas de visualização
router.get('/', auditController.renderAuditList);

// Rota para o modal de detalhes (deve vir antes das rotas com parâmetros dinâmicos)
router.get('/modal/:id', auditController.renderAuditModal);

// Rota de detalhes (deve vir por último para não capturar outras rotas)
router.get('/:id', auditController.renderAuditDetail);

module.exports = router;
