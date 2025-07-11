/**
 * Controlador de autenticação
 * Gerencia login, registro e gerenciamento de usuários
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');
const { AppError, asyncHandler } = require('../middlewares/errorHandler');
const { logUserAction } = require('../middlewares/auth');
const { logger } = require('../utils/logger');

/**
 * Renderiza a página de login do painel administrativo
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const renderLoginPage = (req, res) => {
  // Usar o layout auth.ejs com a página login.ejs
  res.render('auth/login', {
    layout: 'layouts/auth',
    pageTitle: 'Login',
    messages: req.flash()
  });
};

// O processLogin foi removido e consolidado no authController.login
// para seguir o princípio de responsabilidade única

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
    
    // Limpar cookie de autenticação com as mesmas opções usadas ao criar
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    logger.info('Cookie auth_token removido com sucesso');
    
    // Redirecionar para a página inicial
    req.flash('success', 'Você saiu com sucesso.');
    res.redirect('/');
  } catch (error) {
    logger.error(`Erro ao processar logout: ${error.message}`, { error });
    res.redirect('/');
  }
};


/**
 * Gera um token JWT para o usuário
 * @param {Object} user - Dados do usuário
 * @returns {string} Token JWT
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, isAdmin: user.is_admin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
};

/**
 * Login de usuário - Suporta tanto API quanto interface web
 * @route POST /api/auth/login e POST /admin/login
 */
const login = asyncHandler(async (req, res, next) => {
  try {
    // Determinar se é uma requisição web ou API baseado na URL e no content-type
    const isWebRequest = !req.originalUrl.includes('/api/') && 
      (!req.headers['content-type'] || req.headers['content-type'].includes('application/x-www-form-urlencoded'));
    
    // Log completo para depuração
    logger.info('=== TENTATIVA DE LOGIN ===');
    logger.info(`URL: ${req.originalUrl}, Método: ${req.method}`);
    logger.info(`Tipo de requisição: ${isWebRequest ? 'WEB' : 'API'}`);
    logger.info(`Dados: ${JSON.stringify(req.body)}`);
    
    const { username, password } = req.body;

    // Validar dados de entrada
    if (!username || !password) {
      logger.warn('Tentativa de login sem username ou password');
      if (isWebRequest) {
        req.flash('error', 'Por favor, preencha todos os campos');
        return res.redirect('/login');
      }
      return next(new AppError('Por favor, forneça nome de usuário e senha.', 400));
    }

    // Buscar usuário no banco de dados
    const users = await query('SELECT * FROM users WHERE username = ?', [username]);
    
    // Verificar se o usuário existe
    if (users.length === 0) {
      logger.warn(`Tentativa de login com usuário inexistente: ${username}`);
      if (isWebRequest) {
        req.flash('error', 'Usuário ou senha inválidos');
        return res.redirect('/login');
      }
      return next(new AppError('Credenciais inválidas.', 401));
    }
    
    const user = users[0];

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      logger.warn(`Senha incorreta para o usuário: ${username}`);
      if (isWebRequest) {
        req.flash('error', 'Usuário ou senha inválidos');
        return res.redirect('/login');
      }
      return next(new AppError('Credenciais inválidas.', 401));
    }
    
    logger.info(`Login bem-sucedido para o usuário: ${username}`);
    
    // Verificar se JWT_SECRET está definido
    if (!process.env.JWT_SECRET) {
      process.env.JWT_SECRET = 'sao_joao_web_secret_key_2025'; // Fallback para desenvolvimento
      logger.info('Usando JWT_SECRET padrão para desenvolvimento');
    }

    // Gerar token JWT
    const token = generateToken(user);

    // Registrar login (auditoria simplificada)
    try {
      await query(
        'INSERT INTO user_action_logs (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)',
        [user.id, 'LOGIN_ADMIN_PANEL', req.ip, req.get('User-Agent')]
      );
    } catch (logError) {
      logger.error(`Erro ao registrar log de login: ${logError.message}`);
    }
    
    // Definir cookie com opções adequadas para desenvolvimento
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: false, // Desabilitar secure para desenvolvimento local
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
      sameSite: 'lax' // Permitir envio do cookie em navegação normal
    });
    
    // Log para debug
    logger.info(`Cookie auth_token definido para o usuário: ${username} (ID: ${user.id})`);
    logger.info(`Token JWT: ${token.substring(0, 20)}...`);
    
    logger.info('Cookie auth_token definido');

    // Resposta diferente dependendo do tipo de requisição
    if (isWebRequest) {
      // Para requisições web, redirecionar para o dashboard
      req.flash('success', `Bem-vindo, ${user.full_name || username}!`);
      logger.info('Redirecionando para o dashboard');
      return res.redirect('/admin');
    } else {
      // Para requisições API, responder com JSON
      res.status(200).json({
        status: 'success',
        token,
        user: {
          id: user.id,
          username: user.username,
          fullName: user.full_name,
          email: user.email,
          isAdmin: user.is_admin
        }
      });
    }
  } catch (error) {
    logger.error(`Erro ao processar login: ${error.message}`, { error });
    if (req.path.startsWith('/login') || 
        (req.headers['content-type'] && req.headers['content-type'].includes('application/x-www-form-urlencoded'))) {
      req.flash('error', 'Ocorreu um erro ao processar o login. Por favor, tente novamente.');
      return res.redirect('/login');
    }
    return next(new AppError('Erro ao processar login', 500));
  }
});

/**
 * Registro de novo usuário (apenas para administradores)
 * @route POST /api/auth/register
 */
const register = asyncHandler(async (req, res, next) => {
  const { username, fullName, email, password, phone, isAdmin } = req.body;

  // Validar dados de entrada
  if (!username || !fullName || !email || !password) {
    return next(new AppError('Por favor, forneça todos os campos obrigatórios.', 400));
  }

  // Verificar se o usuário já existe
  const existingUsers = await query(
    'SELECT * FROM users WHERE username = ? OR email = ?',
    [username, email]
  );

  if (existingUsers.length > 0) {
    return next(new AppError('Nome de usuário ou email já está em uso.', 400));
  }

  // Criar hash da senha
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Inserir novo usuário
  const result = await query(
    'INSERT INTO users (username, full_name, email, password, phone, is_admin) VALUES (?, ?, ?, ?, ?, ?)',
    [username, fullName, email, hashedPassword, phone || null, isAdmin || false]
  );

  // Registrar ação (auditoria)
  await logUserAction(req.user.id, 'create', 'user', result.insertId, {
    username,
    email,
    isAdmin: isAdmin || false
  }, req);

  res.status(201).json({
    status: 'success',
    message: 'Usuário registrado com sucesso.',
    userId: result.insertId
  });
});

/**
 * Busca todos os usuários (apenas para administradores)
 * @route GET /api/auth/users
 */
const getAllUsers = asyncHandler(async (req, res, next) => {
  // Buscar todos os usuários
  const users = await query(
    'SELECT id, username, full_name, email, phone, is_admin, created_at, updated_at FROM users'
  );

  res.status(200).json({
    status: 'success',
    users
  });
});

/**
 * Busca um usuário específico por ID (apenas para administradores)
 * @route GET /api/auth/users/:id
 */
const getUserById = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  // Buscar usuário
  const users = await query(
    'SELECT id, username, full_name, email, phone, is_admin, created_at, updated_at FROM users WHERE id = ?',
    [userId]
  );

  if (!users || users.length === 0) {
    return next(new AppError('Usuário não encontrado.', 404));
  }

  // Buscar permissões do usuário
  const permissions = await query(
    `SELECT m.id, m.name, m.description 
     FROM user_module_permissions ump 
     JOIN modules m ON ump.module_id = m.id 
     WHERE ump.user_id = ?`,
    [userId]
  );

  res.status(200).json({
    status: 'success',
    user: users[0],
    permissions
  });
});

/**
 * Atualiza um usuário (apenas para administradores)
 * @route PUT /api/auth/users/:id
 */
const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const { fullName, email, phone, isAdmin, password } = req.body;

  // Verificar se o usuário existe
  const users = await query('SELECT * FROM users WHERE id = ?', [userId]);
  if (!users || users.length === 0) {
    return next(new AppError('Usuário não encontrado.', 404));
  }

  // Preparar dados para atualização
  const updateData = {};
  const updateParams = [];

  if (fullName) {
    updateData.full_name = fullName;
    updateParams.push(fullName);
  }

  if (email) {
    // Verificar se o email já está em uso por outro usuário
    const emailUsers = await query('SELECT * FROM users WHERE email = ? AND id != ?', [email, userId]);
    if (emailUsers.length > 0) {
      return next(new AppError('Email já está em uso por outro usuário.', 400));
    }
    updateData.email = email;
    updateParams.push(email);
  }

  if (phone !== undefined) {
    updateData.phone = phone;
    updateParams.push(phone);
  }

  if (isAdmin !== undefined) {
    updateData.is_admin = isAdmin;
    updateParams.push(isAdmin);
  }

  if (password) {
    // Criar hash da nova senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updateData.password = hashedPassword;
    updateParams.push(hashedPassword);
  }

  // Se não há dados para atualizar
  if (Object.keys(updateData).length === 0) {
    return next(new AppError('Nenhum dado fornecido para atualização.', 400));
  }

  // Construir query de atualização
  const updateFields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
  updateParams.push(userId);

  // Atualizar usuário
  await query(`UPDATE users SET ${updateFields} WHERE id = ?`, updateParams);

  // Registrar ação (auditoria)
  await logUserAction(req.user.id, 'update', 'user', userId, {
    updatedFields: Object.keys(updateData)
  }, req);

  res.status(200).json({
    status: 'success',
    message: 'Usuário atualizado com sucesso.'
  });
});

/**
 * Exclui um usuário (apenas para administradores)
 * @route DELETE /api/auth/users/:id
 */
const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  // Verificar se o usuário existe
  const users = await query('SELECT * FROM users WHERE id = ?', [userId]);
  if (!users || users.length === 0) {
    return next(new AppError('Usuário não encontrado.', 404));
  }

  // Impedir exclusão do próprio usuário
  if (parseInt(userId) === req.user.id) {
    return next(new AppError('Você não pode excluir sua própria conta.', 400));
  }

  // Excluir usuário
  await query('DELETE FROM users WHERE id = ?', [userId]);

  // Registrar ação (auditoria)
  await logUserAction(req.user.id, 'delete', 'user', userId, {
    deletedUser: users[0].username
  }, req);

  res.status(200).json({
    status: 'success',
    message: 'Usuário excluído com sucesso.'
  });
});

/**
 * Atualiza as permissões de módulo de um usuário (apenas para administradores)
 * @route PUT /api/auth/users/:id/permissions
 */
const updateUserPermissions = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const { moduleIds } = req.body;

  // Verificar se o usuário existe
  const users = await query('SELECT * FROM users WHERE id = ?', [userId]);
  if (!users || users.length === 0) {
    return next(new AppError('Usuário não encontrado.', 404));
  }

  // Verificar se os módulos existem
  if (!moduleIds || !Array.isArray(moduleIds)) {
    return next(new AppError('Lista de IDs de módulos inválida.', 400));
  }

  // Iniciar transação
  const connection = await require('../config/database').pool.getConnection();
  await connection.beginTransaction();

  try {
    // Remover todas as permissões existentes
    await connection.query('DELETE FROM user_module_permissions WHERE user_id = ?', [userId]);

    // Adicionar novas permissões
    for (const moduleId of moduleIds) {
      await connection.query(
        'INSERT INTO user_module_permissions (user_id, module_id) VALUES (?, ?)',
        [userId, moduleId]
      );
    }

    // Commit da transação
    await connection.commit();
    connection.release();

    // Registrar ação (auditoria)
    await logUserAction(req.user.id, 'update_permissions', 'user', userId, {
      moduleIds
    }, req);

    res.status(200).json({
      status: 'success',
      message: 'Permissões de usuário atualizadas com sucesso.'
    });
  } catch (error) {
    // Rollback em caso de erro
    await connection.rollback();
    connection.release();
    logger.error(`Erro ao atualizar permissões: ${error.message}`, { error });
    return next(new AppError('Erro ao atualizar permissões de usuário.', 500));
  }
});

/**
 * Busca todos os módulos disponíveis
 * @route GET /api/auth/modules
 */
const getAllModules = asyncHandler(async (req, res, next) => {
  // Buscar todos os módulos
  const modules = await query('SELECT * FROM modules');

  res.status(200).json({
    status: 'success',
    modules
  });
});

module.exports = {
  login,
  register,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserPermissions,
  getAllModules,
  renderLoginPage,
  processLogout
};
