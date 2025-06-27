/**
 * Middleware de autenticação e autorização
 */

const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');
const { query } = require('../config/database');
const { logger } = require('../utils/logger');

/**
 * Middleware para verificar se o usuário está autenticado
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const authenticate = async (req, res, next) => {
  try {
    // Verificar se o token está presente no header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Acesso não autorizado. Token não fornecido.', 401);
    }

    // Extrair o token
    const token = authHeader.split(' ')[1];

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar o usuário no banco de dados
    const user = await query('SELECT id, username, full_name, email, is_admin FROM users WHERE id = ?', [decoded.id]);

    // Verificar se o usuário existe
    if (!user || user.length === 0) {
      throw new AppError('Usuário não encontrado.', 401);
    }

    // Adicionar o usuário ao objeto de requisição
    req.user = user[0];

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Token inválido.', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expirado.', 401));
    }
    next(error);
  }
};

/**
 * Middleware para verificar se o usuário é administrador
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    return next(new AppError('Acesso negado. Permissão de administrador necessária.', 403));
  }
  next();
};

/**
 * Middleware para verificar se o usuário tem permissão para acessar um módulo específico
 * @param {string} moduleName - Nome do módulo
 * @returns {Function} Middleware Express
 */
const hasModuleAccess = (moduleName) => async (req, res, next) => {
  try {
    // Administradores têm acesso a todos os módulos
    if (req.user.is_admin) {
      return next();
    }

    // Buscar o ID do módulo
    const modules = await query('SELECT id FROM modules WHERE name = ?', [moduleName]);
    if (!modules || modules.length === 0) {
      return next(new AppError(`Módulo ${moduleName} não encontrado.`, 404));
    }
    const moduleId = modules[0].id;

    // Verificar se o usuário tem permissão para acessar o módulo
    const permissions = await query(
      'SELECT * FROM user_module_permissions WHERE user_id = ? AND module_id = ?',
      [req.user.id, moduleId]
    );

    if (!permissions || permissions.length === 0) {
      return next(new AppError(`Acesso negado ao módulo ${moduleName}.`, 403));
    }

    // Registrar acesso ao módulo (auditoria)
    await logUserAction(req.user.id, 'module_access', 'module', moduleId, {
      moduleName,
      method: req.method,
      path: req.path
    }, req);

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Registra uma ação do usuário no sistema de auditoria
 * @param {number} userId - ID do usuário
 * @param {string} action - Ação realizada
 * @param {string} entity - Entidade afetada
 * @param {string|number} entityId - ID da entidade
 * @param {Object} details - Detalhes da ação
 * @param {Object} req - Objeto de requisição Express
 * @returns {Promise<void>}
 */
const logUserAction = async (userId, action, entity, entityId, details, req) => {
  try {
    await query(
      'INSERT INTO user_action_logs (user_id, action, entity, entity_id, details, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        userId,
        action,
        entity,
        entityId,
        JSON.stringify(details),
        req.ip,
        req.headers['user-agent']
      ]
    );
  } catch (error) {
    logger.error(`Erro ao registrar ação do usuário: ${error.message}`, { error });
  }
};

module.exports = {
  authenticate,
  isAdmin,
  hasModuleAccess,
  logUserAction
};
