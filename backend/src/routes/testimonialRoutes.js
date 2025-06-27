/**
 * Rotas para o módulo de depoimentos (testimonials)
 */

const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { authenticate, hasModuleAccess } = require('../middlewares/auth');
const { uploadVideo, handleMulterError } = require('../middlewares/upload');
const { validate, testimonialSchemas } = require('../utils/validator');

// Rota pública para envio de depoimentos
router.post(
  '/submit',
  uploadVideo.single('video'),
  handleMulterError,
  testimonialController.submitPublicTestimonial
);

// Rotas protegidas (requerem autenticação)
router.use(authenticate);

// Verificar permissão para o módulo de depoimentos
router.use(hasModuleAccess('testimonials'));

// Rotas de gerenciamento de depoimentos
router.get('/categories', testimonialController.getTestimonialCategories);
router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonialById);

router.post(
  '/',
  validate(testimonialSchemas.create),
  uploadVideo.single('video'),
  handleMulterError,
  testimonialController.createTestimonial
);

router.put(
  '/:id',
  validate(testimonialSchemas.update),
  uploadVideo.single('video'),
  handleMulterError,
  testimonialController.updateTestimonial
);

router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
