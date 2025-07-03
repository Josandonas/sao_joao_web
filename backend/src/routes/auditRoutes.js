/**
 * Rotas para o módulo de auditoria
 */

const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');

// Rotas de visualização
router.get('/', auditController.renderAuditList);

// Rota para o modal de detalhes usando token seguro em vez de ID
router.get('/modal/:token', auditController.renderAuditModal);

// Rota de detalhes (deve vir por último para não capturar outras rotas)
router.get('/:id', auditController.renderAuditDetail);

module.exports = router;
