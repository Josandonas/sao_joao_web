/**
 * Controlador para o painel administrativo
 */

const { query } = require('../config/database');
const { logger } = require('../utils/logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


/**
 * Renderiza o dashboard do painel administrativo
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const renderDashboard = async (req, res) => {
  try {
    // Buscar estatísticas para o dashboard
    const testimonialCountResult = await query('SELECT COUNT(*) as count FROM testimonials');
    const testimonialCount = testimonialCountResult[0].count;
    
    const postcardsCountResult = await query('SELECT COUNT(*) as count FROM postcards');
    const postcardsCount = postcardsCountResult[0].count;
    
    const bibliotecaCountResult = await query('SELECT COUNT(*) as count FROM biblioteca');
    const bibliotecaCount = bibliotecaCountResult[0].count;
    
    const usersCountResult = await query('SELECT COUNT(*) as count FROM users');
    const usersCount = usersCountResult[0].count;
    
    // Buscar depoimentos pendentes (não publicados)
    const pendingTestimonials = await query(
      'SELECT * FROM testimonials WHERE is_available_for_frontend = 0 ORDER BY created_at DESC LIMIT 5'
    );
    
    // Buscar atividades recentes
    let activities = [];
    try {
      activities = await query(
        `SELECT a.*, u.full_name FROM user_action_logs a 
         LEFT JOIN users u ON a.user_id = u.id 
         ORDER BY a.timestamp DESC LIMIT 10`
      );
    } catch (err) {
      logger.warn('Tabela user_action_logs não encontrada ou erro ao consultar:', err);
      // Continuar com array vazio se a tabela não existir
    }
    
    res.render('dashboard/index', {
      pageTitle: 'Dashboard',
      stats: {
        testimonials: testimonialCount,
        postcards: postcardsCount,
        biblioteca: bibliotecaCount,
        users: usersCount
      },
      pendingTestimonials,
      activities,
      user: req.user
    });
  } catch (error) {
    logger.error('Erro ao renderizar dashboard:', error);
    req.flash('error', 'Ocorreu um erro ao carregar o dashboard');
    res.status(500).render('error', { 
      pageTitle: 'Erro', 
      error: 'Erro interno do servidor' 
    });
  }
};

/**
 * Renderiza a página de gerenciamento de usuários
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const renderUsersPage = async (req, res) => {
  try {
    // Parâmetros de paginação e filtros
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const sort = req.query.sort || 'created_at_desc';
    
    // Construir a consulta SQL com filtros
    let countSql = 'SELECT COUNT(*) as total FROM users';
    let sql = 'SELECT * FROM users';
    const params = [];
    
    // Adicionar filtros à consulta
    const whereConditions = [];
    
    if (search) {
      whereConditions.push('(username LIKE ? OR full_name LIKE ? OR email LIKE ?)');
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }
    
    if (role) {
      if (role === 'admin') {
        whereConditions.push('is_admin = 1');
      } else if (role === 'user') {
        whereConditions.push('is_admin = 0');
      }
    }
    
    if (whereConditions.length > 0) {
      countSql += ' WHERE ' + whereConditions.join(' AND ');
      sql += ' WHERE ' + whereConditions.join(' AND ');
    }
    
    // Adicionar ordenação
    if (sort === 'created_at_desc') {
      sql += ' ORDER BY created_at DESC';
    } else if (sort === 'created_at_asc') {
      sql += ' ORDER BY created_at ASC';
    } else if (sort === 'username_asc') {
      sql += ' ORDER BY username ASC';
    } else if (sort === 'username_desc') {
      sql += ' ORDER BY username DESC';
    }
    
    // Adicionar paginação
    sql += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    // Executar consultas
    const [countResult] = await query(countSql, params.slice(0, params.length - 2));
    const users = await query(sql, params);
    const total = countResult.total;
    
    // Construir query string para links de paginação
    const queryParams = new URLSearchParams();
    if (search) queryParams.append('search', search);
    if (role) queryParams.append('role', role);
    if (sort) queryParams.append('sort', sort);
    const queryString = queryParams.toString();
    
    // Renderizar página de usuários
    res.render('users/index', {
      pageTitle: 'Gerenciamento de Usuários',
      activeRoute: 'users',
      currentUser: req.user,
      messages: req.flash(),
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      filters: {
        search,
        role,
        sort
      },
      queryString
    });
  } catch (error) {
    logger.error(`Erro ao renderizar página de usuários: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao carregar a página de usuários');
    res.redirect('/admin');
  }
};

/**
 * Renderiza a página de logs do sistema
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const renderLogsPage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    
    // Obter logs de ações
    const logs = await query(`
      SELECT l.*, u.username 
      FROM user_action_logs l 
      LEFT JOIN users u ON l.user_id = u.id 
      ORDER BY l.timestamp DESC 
      LIMIT ? OFFSET ?
    `, [limit, offset]);
    
    // Contar total de logs para paginação
    const countResult = await query('SELECT COUNT(*) as total FROM user_action_logs');
    const totalLogs = countResult[0].total;
    const totalPages = Math.ceil(totalLogs / limit);
    
    // Renderizar página de logs
    res.render('logs', {
      pageTitle: 'Logs do Sistema',
      activeRoute: 'logs',
      user: req.user,
      messages: req.flash(),
      logs,
      pagination: {
        page,
        limit,
        totalLogs,
        totalPages
      }
    });
  } catch (error) {
    logger.error(`Erro ao renderizar página de logs: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao carregar a página de logs');
    res.redirect('/admin');
  }
};

/**
 * Renderiza a página de perfil do usuário
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const renderProfilePage = async (req, res) => {
  try {
    // Obter dados completos do usuário
    const users = await query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    
    if (users.length === 0) {
      req.flash('error', 'Usuário não encontrado');
      return res.redirect('/admin');
    }
    
    const userProfile = users[0];
    
    // Renderizar página de perfil
    res.render('profile', {
      pageTitle: 'Meu Perfil',
      activeRoute: 'profile',
      user: req.user,
      messages: req.flash(),
      userProfile
    });
  } catch (error) {
    logger.error(`Erro ao renderizar página de perfil: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao carregar a página de perfil');
    res.redirect('/admin');
  }
};

/**
 * Atualiza o perfil do usuário
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const updateProfile = async (req, res) => {
  try {
    const { full_name, email, phone, current_password, new_password } = req.body;
    
    // Verificar se o usuário existe
    const users = await query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    
    if (users.length === 0) {
      req.flash('error', 'Usuário não encontrado');
      return res.redirect('/admin/profile');
    }
    
    const user = users[0];
    
    // Se estiver alterando a senha, verificar a senha atual
    if (new_password) {
      const isPasswordValid = await bcrypt.compare(current_password, user.password);
      
      if (!isPasswordValid) {
        req.flash('error', 'Senha atual incorreta');
        return res.redirect('/admin/profile');
      }
      
      // Criar hash da nova senha
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(new_password, salt);
      
      // Atualizar dados do usuário com nova senha
      await query(
        'UPDATE users SET full_name = ?, email = ?, phone = ?, password = ? WHERE id = ?',
        [full_name, email, phone, hashedPassword, req.user.id]
      );
    } else {
      // Atualizar dados do usuário sem alterar a senha
      await query(
        'UPDATE users SET full_name = ?, email = ?, phone = ? WHERE id = ?',
        [full_name, email, phone, req.user.id]
      );
    }
    
    // Registrar atualização no log de ações
    await query(
      'INSERT INTO user_action_logs (user_id, action, entity, entity_id, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, 'UPDATE_PROFILE', 'users', req.user.id, req.ip, req.get('User-Agent')]
    );
    
    req.flash('success', 'Perfil atualizado com sucesso');
    res.redirect('/admin/profile');
  } catch (error) {
    logger.error(`Erro ao atualizar perfil: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao atualizar o perfil');
    res.redirect('/admin/profile');
  }
};

module.exports = {
  renderDashboard,
  // renderUsersPage removido pois a rota foi movida para userRoutes.js
  renderLogsPage,
  renderProfilePage,
  updateProfile
};
