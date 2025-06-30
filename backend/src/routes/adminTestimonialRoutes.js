/**
 * Rotas para o painel administrativo de depoimentos
 */

const express = require('express');
const router = express.Router();
const adminTestimonialController = require('../controllers/adminTestimonialController');
const { uploadVideo, handleMulterError } = require('../middlewares/upload');
const { asyncHandler } = require('../middlewares/errorHandler');

// Listagem de depoimentos
router.get('/', asyncHandler(adminTestimonialController.renderTestimonialsPage));

// Formulário para novo depoimento
router.get('/new', asyncHandler(adminTestimonialController.renderNewTestimonialForm));

// Criar novo depoimento
router.post(
  '/create',
  uploadVideo.single('video'),
  handleMulterError,
  asyncHandler(adminTestimonialController.createTestimonial)
);

// Visualizar depoimento
router.get('/:id', asyncHandler(adminTestimonialController.renderViewTestimonialPage));

// Formulário para editar depoimento
router.get('/:id/edit', asyncHandler(adminTestimonialController.renderEditTestimonialForm));

// Atualizar depoimento
router.post(
  '/:id/update',
  uploadVideo.single('video'),
  handleMulterError,
  asyncHandler(adminTestimonialController.updateTestimonial)
);

// Publicar depoimento
router.get('/:id/publish', asyncHandler(adminTestimonialController.publishTestimonial));

// Despublicar depoimento
router.get('/:id/unpublish', asyncHandler(adminTestimonialController.unpublishTestimonial));

// Excluir depoimento
router.get('/:id/delete', asyncHandler(adminTestimonialController.deleteTestimonial));

// Obter dados do depoimento em formato JSON para o modal
router.get('/:id/data', asyncHandler(adminTestimonialController.getTestimonialData));

module.exports = router;
