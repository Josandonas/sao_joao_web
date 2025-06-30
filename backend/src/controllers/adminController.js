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
  res.render('auth/login', {
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
    // Log completo do corpo da requisição para depuração
    logger.info('Dados de login recebidos:', { 
      body: req.body,
      headers: req.headers,
      cookies: req.cookies,
      method: req.method,
      path: req.path
    });
    
    const { username, password, debug } = req.body;
    
    logger.info(`Tentativa de login para o usuário: ${username}`);
    
    // Validar campos obrigatórios
    if (!username || !password) {
      logger.warn('Tentativa de login sem username ou password');
      req.flash('error', 'Por favor, preencha todos os campos');
      return res.redirect('/admin/login');
    }
    
    // Buscar usuário no banco de dados
    const users = await query('SELECT * FROM users WHERE username = ?', [username]);
    logger.info(`Resultado da consulta de usuário: ${JSON.stringify(users.length > 0 ? {id: users[0].id, username: users[0].username} : 'Nenhum usuário encontrado')}`);
    
    if (users.length === 0) {
      logger.warn(`Tentativa de login com usuário inexistente: ${username}`);
      req.flash('error', 'Usuário ou senha inválidos');
      return res.redirect('/admin/login');
    }
    
    const user = users[0];
    
    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    logger.info(`Resultado da verificação de senha: ${isPasswordValid ? 'Válida' : 'Inválida'}`);
    
    if (!isPasswordValid) {
      logger.warn(`Senha incorreta para o usuário: ${username}`);
      req.flash('error', 'Usuário ou senha inválidos');
      return res.redirect('/admin/login');
    }
    
    logger.info(`Login bem-sucedido para o usuário: ${username}`);
    
    // Verificar se JWT_SECRET está definido
    if (!process.env.JWT_SECRET) {
      logger.error('JWT_SECRET não está definido no ambiente!');
      process.env.JWT_SECRET = 'sao_joao_web_secret_key_2025'; // Fallback para desenvolvimento
      logger.info('Usando JWT_SECRET padrão para desenvolvimento');
    }
    
    // Gerar token JWT
    try {
      const token = jwt.sign(
        { id: user.id, username: user.username, isAdmin: user.is_admin },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION || '1d' }
      );
      
      logger.info('Token JWT gerado com sucesso');
      
      // Salvar token em cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 1 dia
      });
      
      logger.info('Cookie auth_token definido com sucesso');
    } catch (jwtError) {
      logger.error(`Erro ao gerar token JWT: ${jwtError.message}`, { error: jwtError });
      req.flash('error', 'Erro ao gerar credenciais de autenticação. Por favor, tente novamente.');
      return res.redirect('/admin/login');
    }
    
    // Registrar login no log de ações
    try {
      await query(
        'INSERT INTO user_action_logs (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)',
        [user.id, 'LOGIN_ADMIN_PANEL', req.ip, req.get('User-Agent')]
      );
      logger.info('Log de ação de login registrado com sucesso');
    } catch (logError) {
      // Não bloquear o login se o log falhar
      logger.error(`Erro ao registrar log de login: ${logError.message}`);
    }
    
    // Adicionar mensagem de sucesso
    req.flash('success', `Bem-vindo, ${user.full_name || username}!`);
    logger.info('Mensagem flash de sucesso adicionada');
    
    // Redirecionar para o dashboard
    logger.info('Redirecionando para o dashboard');
    return res.redirect('/admin');
  } catch (error) {
    logger.error(`Erro ao processar login: ${error.message}`, { error });
    req.flash('error', 'Ocorreu um erro ao processar o login. Por favor, tente novamente.');
    return res.redirect('/admin/login');
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
        `SELECT a.*, u.name FROM audit_logs a 
         LEFT JOIN users u ON a.user_id = u.id 
         ORDER BY a.created_at DESC LIMIT 10`
      );
    } catch (err) {
      logger.warn('Tabela audit_logs não encontrada ou erro ao consultar:', err);
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
