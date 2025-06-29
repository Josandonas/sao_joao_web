/**
 * Controlador para o painel administrativo
 */

const { query } = require('../config/database');
const { logger } = require('../utils/logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Renderiza a página de login do painel administrativo
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const renderLoginPage = (req, res) => {
  res.render('login', {
    layout: 'layouts/auth',
    pageTitle: 'Login',
    messages: req.flash()
  });
};

/**
 * Processa o login do usuário para o painel administrativo
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const processLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Buscar usuário no banco de dados
    const users = await query('SELECT * FROM users WHERE username = ?', [username]);
    
    if (users.length === 0) {
      req.flash('error', 'Usuário ou senha inválidos');
      return res.redirect('/admin/login');
    }
    
    const user = users[0];
    
    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      req.flash('error', 'Usuário ou senha inválidos');
      return res.redirect('/admin/login');
    }
    
    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    // Salvar token em cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 dia
    });
    
    // Registrar login no log de ações
    await query(
      'INSERT INTO user_action_logs (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)',
      [user.id, 'LOGIN_ADMIN_PANEL', req.ip, req.get('User-Agent')]
    );
    
    // Redirecionar para o dashboard
    res.redirect('/admin');
  } catch (error) {
    logger.error(`Erro ao processar login: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao processar o login');
    res.redirect('/admin/login');
  }
};

/**
 * Processa o logout do usuário
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const processLogout = async (req, res) => {
  try {
    // Registrar logout no log de ações se o usuário estiver autenticado
    if (req.user) {
      await query(
        'INSERT INTO user_action_logs (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)',
        [req.user.id, 'LOGOUT_ADMIN_PANEL', req.ip, req.get('User-Agent')]
      );
    }
    
    // Limpar cookie de autenticação
    res.clearCookie('auth_token');
    
    // Redirecionar para a página de login
    res.redirect('/admin/login');
  } catch (error) {
    logger.error(`Erro ao processar logout: ${error.message}`, { error });
    res.redirect('/admin/login');
  }
};

/**
 * Renderiza o dashboard do painel administrativo
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const renderDashboard = async (req, res) => {
  try {
    // Obter estatísticas gerais
    const testimonialCount = await query('SELECT COUNT(*) as count FROM testimonials');
    const postcardCount = await query('SELECT COUNT(*) as count FROM postcards');
    const bibliotecaCount = await query('SELECT COUNT(*) as count FROM biblioteca');
    const galeriaCount = await query('SELECT COUNT(*) as count FROM galeria');
    
    // Obter depoimentos pendentes (não disponíveis para o frontend)
    const pendingTestimonials = await query(
      'SELECT * FROM testimonials WHERE is_available_for_frontend = 0 ORDER BY created_at DESC LIMIT 5'
    );
    
    // Obter logs de ações recentes
    const recentLogs = await query(`
      SELECT l.*, u.username 
      FROM user_action_logs l 
      LEFT JOIN users u ON l.user_id = u.id 
      ORDER BY l.timestamp DESC 
      LIMIT 10
    `);
    
    // Renderizar dashboard com dados
    res.render('dashboard', {
      pageTitle: 'Dashboard',
      activeRoute: 'dashboard',
      user: req.user,
      messages: req.flash(),
      stats: {
        testimonials: testimonialCount[0].count,
        postcards: postcardCount[0].count,
        biblioteca: bibliotecaCount[0].count,
        galeria: galeriaCount[0].count
      },
      pendingTestimonials,
      recentLogs
    });
  } catch (error) {
    logger.error(`Erro ao renderizar dashboard: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao carregar o dashboard');
    res.redirect('/admin/login');
  }
};

/**
 * Renderiza a página de gerenciamento de usuários
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const renderUsersPage = async (req, res) => {
  try {
    // Obter todos os usuários
    const users = await query('SELECT * FROM users ORDER BY created_at DESC');
    
    // Renderizar página de usuários
    res.render('users', {
      pageTitle: 'Gerenciamento de Usuários',
      activeRoute: 'users',
      user: req.user,
      messages: req.flash(),
      users
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
  renderLoginPage,
  processLogin,
  processLogout,
  renderDashboard,
  renderUsersPage,
  renderLogsPage,
  renderProfilePage,
  updateProfile
};
