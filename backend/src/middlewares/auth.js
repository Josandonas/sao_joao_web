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
    logger.info(`Verificando autenticação para rota: ${req.method} ${req.path}`);
    
    // Verificar se o token está presente no cookie
    const token = req.cookies.auth_token;
    
    if (!token) {
      logger.warn(`Token não encontrado no cookie para rota: ${req.path}`);
      
      // Para rotas de API, retornar erro
      if (req.path.startsWith('/api/')) {
        throw new AppError('Acesso não autorizado. Token não fornecido.', 401);
      }
      
      // Para rotas de páginas, redirecionar para a página inicial
      logger.info('Redirecionando para página inicial devido à ausência de token');
      return res.redirect('/');
    }

    // Verificar se JWT_SECRET está definido
    if (!process.env.JWT_SECRET) {
      logger.warn('JWT_SECRET não está definido no ambiente!');
      process.env.JWT_SECRET = 'sao_joao_web_secret_key_2025'; // Fallback para desenvolvimento
      logger.info('Usando JWT_SECRET padrão para desenvolvimento');
    }
    
    // Log para debug
    logger.info(`Verificando token JWT: ${token.substring(0, 20)}...`);

    // Verificar e decodificar o token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      logger.info(`Token JWT verificado com sucesso para usuário ID: ${decoded.id}`);
    } catch (jwtError) {
      logger.error(`Erro ao verificar token JWT: ${jwtError.message}`);
      
      // Para rotas de API, retornar erro
      if (req.path.startsWith('/api/')) {
        throw new AppError(`Token inválido ou expirado: ${jwtError.message}`, 401);
      }
      
      // Para rotas de páginas, redirecionar para a página inicial
      return res.redirect('/');
    }

    // Buscar o usuário no banco de dados
    try {
      const user = await query('SELECT id, username, full_name, email, is_admin FROM users WHERE id = ?', [decoded.id]);

      // Verificar se o usuário existe
      if (!user || user.length === 0) {
        logger.warn(`Usuário não encontrado para ID: ${decoded.id}`);
        
        if (req.path.startsWith('/api/')) {
          throw new AppError('Usuário não encontrado.', 401);
        }
        
        return res.redirect('/');
      }

      // Adicionar o usuário ao objeto de requisição
      req.user = user[0];
      logger.info(`Usuário autenticado: ${user[0].username} (ID: ${user[0].id})`);

      next();
    } catch (dbError) {
      logger.error(`Erro ao buscar usuário no banco de dados: ${dbError.message}`);
      
      if (req.path.startsWith('/api/')) {
        throw new AppError(`Erro ao verificar usuário: ${dbError.message}`, 500);
      }
      
      return res.redirect('/');
    }
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      // Para rotas de API, retornar erro
      if (req.path.startsWith('/api/')) {
        return next(new AppError(error.name === 'TokenExpiredError' ? 'Token expirado.' : 'Token inválido.', 401));
      }
      
      // Para rotas de páginas, redirecionar para a página inicial
      return res.redirect('/');
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
