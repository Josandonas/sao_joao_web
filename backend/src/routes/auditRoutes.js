/**
 * Rotas para o módulo de auditoria
 */

const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');

// Rotas de visualização
router.get('/', auditController.renderAuditList);
router.get('/:id', auditController.renderAuditDetail);

module.exports = router;
