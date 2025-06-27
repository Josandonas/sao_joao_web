/**
 * Controlador para o módulo de depoimentos (testimonials)
 */

const path = require('path');
const fs = require('fs');
const { query } = require('../config/database');
const { AppError, asyncHandler } = require('../middlewares/errorHandler');
const { logUserAction } = require('../middlewares/auth');
const { logger } = require('../utils/logger');

/**
 * Busca todos os depoimentos com paginação e filtros
 * @route GET /api/testimonials
 */
const getAllTestimonials = asyncHandler(async (req, res, next) => {
  // Parâmetros de paginação e filtros
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const category = req.query.category;
  const showAll = req.query.showAll === 'true' || req.user.is_admin;
  
  // Calcular offset para paginação
  const offset = (page - 1) * limit;
  
  // Construir query base
  let sql = 'SELECT * FROM testimonials';
  const params = [];
  
  // Adicionar filtros
  const conditions = [];
  
  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }
  
  // Se não for admin ou não solicitou todos, mostrar apenas disponíveis para frontend
  if (!showAll) {
    conditions.push('is_available_for_frontend = true');
  }
  
  // Adicionar condições à query
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
  
  // Adicionar ordenação e paginação
  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);
  
  // Executar query
  const testimonials = await query(sql, params);
  
  // Contar total de registros para metadados de paginação
  let countSql = 'SELECT COUNT(*) as total FROM testimonials';
  if (conditions.length > 0) {
    countSql += ' WHERE ' + conditions.join(' AND ');
  }
  
  const [{ total }] = await query(countSql, params.slice(0, -2));
  
  res.status(200).json({
    status: 'success',
    results: testimonials.length,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    },
    testimonials
  });
});

/**
 * Busca um depoimento específico por ID
 * @route GET /api/testimonials/:id
 */
const getTestimonialById = asyncHandler(async (req, res, next) => {
  const testimonialId = req.params.id;
  
  // Buscar depoimento
  const testimonials = await query('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);
  
  if (!testimonials || testimonials.length === 0) {
    return next(new AppError('Depoimento não encontrado.', 404));
  }
  
  const testimonial = testimonials[0];
  
  // Se não for admin e o depoimento não estiver disponível para o frontend
  if (!req.user.is_admin && !testimonial.is_available_for_frontend) {
    return next(new AppError('Depoimento não encontrado.', 404));
  }
  
  res.status(200).json({
    status: 'success',
    testimonial
  });
});

/**
 * Cria um novo depoimento
 * @route POST /api/testimonials
 */
const createTestimonial = asyncHandler(async (req, res, next) => {
  const { name, location, category, testimonial, is_available_for_frontend } = req.body;
  
  // Verificar se há arquivo de vídeo
  let videoPath = null;
  if (req.file) {
    videoPath = `/public/videos/${req.file.filename}`;
  }
  
  // Inserir depoimento no banco de dados
  const result = await query(
    'INSERT INTO testimonials (name, location, category, testimonial, video_path, is_available_for_frontend) VALUES (?, ?, ?, ?, ?, ?)',
    [name, location, category, testimonial, videoPath, is_available_for_frontend || false]
  );
  
  // Registrar ação (auditoria)
  await logUserAction(req.user.id, 'create', 'testimonial', result.insertId, {
    name,
    category
  }, req);
  
  res.status(201).json({
    status: 'success',
    message: 'Depoimento criado com sucesso.',
    testimonialId: result.insertId
  });
});

/**
 * Atualiza um depoimento existente
 * @route PUT /api/testimonials/:id
 */
const updateTestimonial = asyncHandler(async (req, res, next) => {
  const testimonialId = req.params.id;
  const { name, location, category, testimonial, is_available_for_frontend } = req.body;
  
  // Verificar se o depoimento existe
  const existingTestimonials = await query('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);
  
  if (!existingTestimonials || existingTestimonials.length === 0) {
    return next(new AppError('Depoimento não encontrado.', 404));
  }
  
  const existingTestimonial = existingTestimonials[0];
  
  // Preparar dados para atualização
  const updateData = {};
  const updateParams = [];
  
  if (name !== undefined) {
    updateData.name = name;
    updateParams.push(name);
  }
  
  if (location !== undefined) {
    updateData.location = location;
    updateParams.push(location);
  }
  
  if (category !== undefined) {
    updateData.category = category;
    updateParams.push(category);
  }
  
  if (testimonial !== undefined) {
    updateData.testimonial = testimonial;
    updateParams.push(testimonial);
  }
  
  if (is_available_for_frontend !== undefined) {
    updateData.is_available_for_frontend = is_available_for_frontend;
    updateParams.push(is_available_for_frontend);
  }
  
  // Verificar se há arquivo de vídeo
  if (req.file) {
    const videoPath = `/public/videos/${req.file.filename}`;
    updateData.video_path = videoPath;
    updateParams.push(videoPath);
    
    // Excluir vídeo antigo se existir
    if (existingTestimonial.video_path) {
      const oldVideoPath = path.join(__dirname, '../../', existingTestimonial.video_path.replace('/public', 'public'));
      if (fs.existsSync(oldVideoPath)) {
        fs.unlinkSync(oldVideoPath);
      }
    }
  }
  
  // Se não há dados para atualizar
  if (Object.keys(updateData).length === 0) {
    return next(new AppError('Nenhum dado fornecido para atualização.', 400));
  }
  
  // Construir query de atualização
  const updateFields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
  updateParams.push(testimonialId);
  
  // Atualizar depoimento
  await query(`UPDATE testimonials SET ${updateFields} WHERE id = ?`, updateParams);
  
  // Registrar ação (auditoria)
  await logUserAction(req.user.id, 'update', 'testimonial', testimonialId, {
    updatedFields: Object.keys(updateData)
  }, req);
  
  res.status(200).json({
    status: 'success',
    message: 'Depoimento atualizado com sucesso.'
  });
});

/**
 * Exclui um depoimento
 * @route DELETE /api/testimonials/:id
 */
const deleteTestimonial = asyncHandler(async (req, res, next) => {
  const testimonialId = req.params.id;
  
  // Verificar se o depoimento existe
  const testimonials = await query('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);
  
  if (!testimonials || testimonials.length === 0) {
    return next(new AppError('Depoimento não encontrado.', 404));
  }
  
  const testimonial = testimonials[0];
  
  // Excluir vídeo se existir
  if (testimonial.video_path) {
    const videoPath = path.join(__dirname, '../../', testimonial.video_path.replace('/public', 'public'));
    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }
  }
  
  // Excluir depoimento
  await query('DELETE FROM testimonials WHERE id = ?', [testimonialId]);
  
  // Registrar ação (auditoria)
  await logUserAction(req.user.id, 'delete', 'testimonial', testimonialId, {
    name: testimonial.name,
    category: testimonial.category
  }, req);
  
  res.status(200).json({
    status: 'success',
    message: 'Depoimento excluído com sucesso.'
  });
});

/**
 * Busca todas as categorias de depoimentos
 * @route GET /api/testimonials/categories
 */
const getTestimonialCategories = asyncHandler(async (req, res, next) => {
  // Buscar categorias distintas
  const categories = await query('SELECT DISTINCT category FROM testimonials ORDER BY category');
  
  res.status(200).json({
    status: 'success',
    categories: categories.map(item => item.category)
  });
});

/**
 * Recebe um depoimento público (sem autenticação)
 * @route POST /api/testimonials/submit
 */
const submitPublicTestimonial = asyncHandler(async (req, res, next) => {
  const { name, location, category, testimonial } = req.body;
  
  // Validar dados obrigatórios
  if (!name || !location || !category || !testimonial) {
    return next(new AppError('Todos os campos são obrigatórios.', 400));
  }
  
  // Verificar se há arquivo de vídeo
  let videoPath = null;
  if (req.file) {
    videoPath = `/public/videos/${req.file.filename}`;
  }
  
  // Inserir depoimento no banco de dados (não disponível para frontend por padrão)
  const result = await query(
    'INSERT INTO testimonials (name, location, category, testimonial, video_path, is_available_for_frontend) VALUES (?, ?, ?, ?, ?, false)',
    [name, location, category, testimonial, videoPath]
  );
  
  // Registrar ação (auditoria) - sem usuário autenticado
  await logUserAction(null, 'submit', 'testimonial', result.insertId, {
    name,
    category,
    ip: req.ip
  }, req);
  
  res.status(201).json({
    status: 'success',
    message: 'Depoimento enviado com sucesso. Aguardando aprovação.'
  });
});

module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonialCategories,
  submitPublicTestimonial
};
