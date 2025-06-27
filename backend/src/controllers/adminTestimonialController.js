/**
 * Controlador para o painel administrativo de depoimentos
 */

const path = require('path');
const fs = require('fs');
const database = require('../config/database');
const { logger } = require('../utils/logger');
const { logUserAction } = require('../middlewares/auth');

// Função auxiliar para executar queries
const executeQuery = async (sql, params = []) => {
  return await database.query(sql, params);
};

/**
 * Renderiza a página de listagem de depoimentos
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const renderTestimonialsPage = async (req, res) => {
  try {
    // Parâmetros de paginação e filtros
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const selectedCategory = req.query.category || '';
    const status = req.query.status || 'all';
    
    // Construir query base
    let sql = 'SELECT * FROM testimonials';
    const params = [];
    
    // Adicionar filtros
    const conditions = [];
    
    if (selectedCategory) {
      conditions.push('category = ?');
      params.push(selectedCategory);
    }
    
    if (status === 'published') {
      conditions.push('is_available_for_frontend = true');
    } else if (status === 'draft') {
      conditions.push('is_available_for_frontend = false');
    }
    
    // Adicionar condições à query
    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    
    // Adicionar ordenação e paginação
    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    // Executar query
    const testimonials = await executeQuery(sql, params);
    
    // Contar total de registros para metadados de paginação
    let countSql = 'SELECT COUNT(*) as total FROM testimonials';
    if (conditions.length > 0) {
      countSql += ' WHERE ' + conditions.join(' AND ');
    }
    
    const [{ total }] = await executeQuery(countSql, params.slice(0, -2));
    
    // Obter categorias para o filtro
    const categories = await executeQuery('SELECT DISTINCT category FROM testimonials ORDER BY category');
    
    // Renderizar página
    res.render('testimonials/index', {
      pageTitle: 'Depoimentos',
      activeRoute: 'testimonials',
      user: req.user,
      messages: req.flash(),
      testimonials,
      categories: categories.map(item => item.category),
      selectedCategory,
      status,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error(`Erro ao renderizar página de depoimentos: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao carregar a página de depoimentos');
    res.redirect('/admin');
  }
};

/**
 * Renderiza o formulário para criar um novo depoimento
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const renderNewTestimonialForm = async (req, res) => {
  try {
    // Obter categorias existentes
    const categories = await executeQuery('SELECT DISTINCT category FROM testimonials ORDER BY category');
    
    res.render('testimonials/form', {
      pageTitle: 'Novo Depoimento',
      activeRoute: 'testimonials',
      user: req.user,
      messages: req.flash(),
      testimonial: null,
      categories: categories.map(item => item.category)
    });
  } catch (error) {
    logger.error(`Erro ao renderizar formulário de novo depoimento: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao carregar o formulário');
    res.redirect('/admin/testimonials');
  }
};

/**
 * Renderiza o formulário para editar um depoimento existente
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const renderEditTestimonialForm = async (req, res) => {
  try {
    const testimonialId = req.params.id;
    
    // Buscar depoimento
    const testimonials = await executeQuery('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);    
    if (!testimonials || testimonials.length === 0) {
      req.flash('error', 'Depoimento não encontrado');
      return res.redirect('/admin/testimonials');
    }
    
    // Obter categorias existentes
    const categories = await executeQuery('SELECT DISTINCT category FROM testimonials ORDER BY category');
    
    res.render('testimonials/form', {
      pageTitle: 'Editar Depoimento',
      activeRoute: 'testimonials',
      user: req.user,
      messages: req.flash(),
      testimonial: testimonials[0],
      categories: categories.map(item => item.category)
    });
  } catch (error) {
    logger.error(`Erro ao renderizar formulário de edição: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao carregar o formulário de edição');
    res.redirect('/admin/testimonials');
  }
};

/**
 * Renderiza a página de visualização de um depoimento
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const renderViewTestimonialPage = async (req, res) => {
  try {
    const testimonialId = req.params.id;
    
    // Buscar depoimento
    const testimonials = await executeQuery('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);
    
    if (!testimonials || testimonials.length === 0) {
      req.flash('error', 'Depoimento não encontrado');
      return res.redirect('/admin/testimonials');
    }
    
    res.render('testimonials/view', {
      pageTitle: 'Visualizar Depoimento',
      activeRoute: 'testimonials',
      user: req.user,
      messages: req.flash(),
      testimonial: testimonials[0]
    });
  } catch (error) {
    logger.error(`Erro ao renderizar página de visualização: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao carregar os dados do depoimento');
    res.redirect('/admin/testimonials');
  }
};

/**
 * Cria um novo depoimento
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const createTestimonial = async (req, res) => {
  try {
    let { name, location, category, testimonial, is_available_for_frontend, otherCategory } = req.body;
    
    // Se for uma nova categoria
    if (category === 'other' && otherCategory) {
      category = otherCategory;
    }
    
    // Verificar se há arquivo de vídeo
    let videoPath = null;
    if (req.file) {
      videoPath = `/public/videos/${req.file.filename}`;
    }
    
    // Inserir depoimento no banco de dados
    const result = await executeQuery(
      'INSERT INTO testimonials (name, location, category, testimonial, video_path, is_available_for_frontend) VALUES (?, ?, ?, ?, ?, ?)',
      [name, location, category, testimonial, videoPath, is_available_for_frontend ? true : false]
    );
    
    // Registrar ação (auditoria)
    await logUserAction(req.user.id, 'create', 'testimonial', result.insertId, {
      name,
      category
    }, req);
    
    req.flash('success', 'Depoimento criado com sucesso');
    res.redirect('/admin/testimonials');
  } catch (error) {
    logger.error(`Erro ao criar depoimento: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao criar o depoimento');
    res.redirect('/admin/testimonials/new');
  }
};

/**
 * Atualiza um depoimento existente
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const updateTestimonial = async (req, res) => {
  try {
    const testimonialId = req.params.id;
    let { name, location, category, testimonial, is_available_for_frontend, otherCategory, removeVideo } = req.body;
    
    // Verificar se o depoimento existe
    const existingTestimonials = await executeQuery('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);
    
    if (!existingTestimonials || existingTestimonials.length === 0) {
      req.flash('error', 'Depoimento não encontrado');
      return res.redirect('/admin/testimonials');
    }
    
    const existingTestimonial = existingTestimonials[0];
    
    // Se for uma nova categoria
    if (category === 'other' && otherCategory) {
      category = otherCategory;
    }
    
    // Preparar dados para atualização
    const updateData = {
      name,
      location,
      category,
      testimonial,
      is_available_for_frontend: is_available_for_frontend ? true : false
    };
    
    // Verificar se há arquivo de vídeo
    if (req.file) {
      updateData.video_path = `/public/videos/${req.file.filename}`;
      
      // Excluir vídeo antigo se existir
      if (existingTestimonial.video_path) {
        const oldVideoPath = path.join(__dirname, '../../', existingTestimonial.video_path.replace('/public', 'public'));
        if (fs.existsSync(oldVideoPath)) {
          fs.unlinkSync(oldVideoPath);
        }
      }
    } else if (removeVideo === 'on') {
      // Remover vídeo se solicitado
      updateData.video_path = null;
      
      // Excluir vídeo antigo se existir
      if (existingTestimonial.video_path) {
        const oldVideoPath = path.join(__dirname, '../../', existingTestimonial.video_path.replace('/public', 'public'));
        if (fs.existsSync(oldVideoPath)) {
          fs.unlinkSync(oldVideoPath);
        }
      }
    }
    
    // Construir query de atualização
    const updateFields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
    const updateParams = [...Object.values(updateData), testimonialId];
    
    // Atualizar depoimento
    await executeQuery(`UPDATE testimonials SET ${updateFields} WHERE id = ?`, updateParams);
    
    // Registrar ação (auditoria)
    await logUserAction(req.user.id, 'update', 'testimonial', testimonialId, {
      updatedFields: Object.keys(updateData)
    }, req);
    
    req.flash('success', 'Depoimento atualizado com sucesso');
    res.redirect(`/admin/testimonials/${testimonialId}`);
  } catch (error) {
    logger.error(`Erro ao atualizar depoimento: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao atualizar o depoimento');
    res.redirect(`/admin/testimonials/${req.params.id}/edit`);
  }
};

/**
 * Publica um depoimento (torna disponível para o frontend)
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const publishTestimonial = async (req, res) => {
  try {
    const testimonialId = req.params.id;
    
    // Verificar se o depoimento existe
    const testimonials = await executeQuery('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);
    
    if (!testimonials || testimonials.length === 0) {
      req.flash('error', 'Depoimento não encontrado');
      return res.redirect('/admin/testimonials');
    }
    
    // Atualizar status
    await executeQuery('UPDATE testimonials SET is_available_for_frontend = true WHERE id = ?', [testimonialId]);
    
    // Registrar ação (auditoria)
    await logUserAction(req.user.id, 'publish', 'testimonial', testimonialId, {}, req);
    
    req.flash('success', 'Depoimento publicado com sucesso');
    res.redirect(`/admin/testimonials/${testimonialId}`);
  } catch (error) {
    logger.error(`Erro ao publicar depoimento: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao publicar o depoimento');
    res.redirect('/admin/testimonials');
  }
};

/**
 * Despublica um depoimento (torna indisponível para o frontend)
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const unpublishTestimonial = async (req, res) => {
  try {
    const testimonialId = req.params.id;
    
    // Verificar se o depoimento existe
    const testimonials = await executeQuery('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);
    
    if (!testimonials || testimonials.length === 0) {
      req.flash('error', 'Depoimento não encontrado');
      return res.redirect('/admin/testimonials');
    }
    
    // Atualizar status
    await executeQuery('UPDATE testimonials SET is_available_for_frontend = false WHERE id = ?', [testimonialId]);
    
    // Registrar ação (auditoria)
    await logUserAction(req.user.id, 'unpublish', 'testimonial', testimonialId, {}, req);
    
    req.flash('success', 'Depoimento despublicado com sucesso');
    res.redirect(`/admin/testimonials/${testimonialId}`);
  } catch (error) {
    logger.error(`Erro ao despublicar depoimento: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao despublicar o depoimento');
    res.redirect('/admin/testimonials');
  }
};

/**
 * Exclui um depoimento
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const deleteTestimonial = async (req, res) => {
  try {
    const testimonialId = req.params.id;
    
    // Verificar se o depoimento existe
    const testimonials = await executeQuery('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);
    
    if (!testimonials || testimonials.length === 0) {
      req.flash('error', 'Depoimento não encontrado');
      return res.redirect('/admin/testimonials');
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
    await executeQuery('DELETE FROM testimonials WHERE id = ?', [testimonialId]);
    
    // Registrar ação (auditoria)
    await logUserAction(req.user.id, 'delete', 'testimonial', testimonialId, {
      name: testimonial.name,
      category: testimonial.category
    }, req);
    
    req.flash('success', 'Depoimento excluído com sucesso');
    res.redirect('/admin/testimonials');
  } catch (error) {
    logger.error(`Erro ao excluir depoimento: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao excluir o depoimento');
    res.redirect('/admin/testimonials');
  }
};

module.exports = {
  renderTestimonialsPage,
  renderNewTestimonialForm,
  renderEditTestimonialForm,
  renderViewTestimonialPage,
  createTestimonial,
  updateTestimonial,
  publishTestimonial,
  unpublishTestimonial,
  deleteTestimonial
};
