/**
 * Controlador para o módulo de auditoria
 */

const { query } = require('../config/database');
const { asyncHandler } = require('../middlewares/errorHandler');

/**
 * Renderiza a página principal do módulo de auditoria
 * @route GET /admin/audit
 */
const renderAuditList = asyncHandler(async (req, res) => {
  // Parâmetros de paginação e filtros
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const search = req.query.search || '';
  const module = req.query.module || '';
  const action = req.query.action || '';
  const startDate = req.query.startDate || '';
  const endDate = req.query.endDate || '';
  const userId = req.query.userId || '';
  const sort = req.query.sort || 'timestamp_desc';
  
  // Calcular offset para paginação
  const offset = (page - 1) * limit;
  
  // Construir query base
  let sql = `
    SELECT 
      l.id, 
      l.user_id, 
      l.action, 
      l.entity, 
      l.entity_id, 
      l.details, 
      l.ip_address, 
      l.user_agent, 
      l.timestamp,
      u.username,
      u.full_name
    FROM 
      user_action_logs l
    LEFT JOIN 
      users u ON l.user_id = u.id
  `;
  
  const params = [];
  
  // Adicionar filtros
  const conditions = [];
  
  if (search) {
    conditions.push('(u.username LIKE ? OR u.full_name LIKE ? OR l.entity LIKE ? OR l.action LIKE ? OR l.details LIKE ?)');
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
  }
  
  if (module) {
    conditions.push('l.entity = ?');
    params.push(module);
  }
  
  if (action) {
    conditions.push('l.action = ?');
    params.push(action);
  }
  
  if (userId) {
    conditions.push('l.user_id = ?');
    params.push(userId);
  }
  
  if (startDate) {
    conditions.push('DATE(l.timestamp) >= ?');
    params.push(startDate);
  }
  
  if (endDate) {
    conditions.push('DATE(l.timestamp) <= ?');
    params.push(endDate);
  }
  
  // Adicionar condições à query
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
  
  // Adicionar ordenação
  switch (sort) {
    case 'timestamp_asc':
      sql += ' ORDER BY l.timestamp ASC';
      break;
    case 'timestamp_desc':
    default:
      sql += ' ORDER BY l.timestamp DESC';
      break;
    case 'user_asc':
      sql += ' ORDER BY u.username ASC, l.timestamp DESC';
      break;
    case 'user_desc':
      sql += ' ORDER BY u.username DESC, l.timestamp DESC';
      break;
    case 'action_asc':
      sql += ' ORDER BY l.action ASC, l.timestamp DESC';
      break;
    case 'action_desc':
      sql += ' ORDER BY l.action DESC, l.timestamp DESC';
      break;
    case 'module_asc':
      sql += ' ORDER BY l.entity ASC, l.timestamp DESC';
      break;
    case 'module_desc':
      sql += ' ORDER BY l.entity DESC, l.timestamp DESC';
      break;
  }
  
  // Adicionar paginação
  sql += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);
  
  // Executar query
  const logs = await query(sql, params);
  
  // Contar total de registros para metadados de paginação
  let countSql = 'SELECT COUNT(*) as total FROM user_action_logs l LEFT JOIN users u ON l.user_id = u.id';
  if (conditions.length > 0) {
    countSql += ' WHERE ' + conditions.join(' AND ');
  }
  
  const [{ total }] = await query(countSql, params.slice(0, -2));
  
  // Buscar todos os usuários para o filtro
  const users = await query('SELECT id, username, full_name FROM users ORDER BY username');
  
  // Buscar todos os módulos para o filtro
  const modules = await query('SELECT DISTINCT entity FROM user_action_logs ORDER BY entity');
  
  // Buscar todos os tipos de ações para o filtro
  const actions = await query('SELECT DISTINCT action FROM user_action_logs ORDER BY action');
  
  // Construir string de query para links de paginação
  let queryString = '';
  if (search) queryString += `&search=${encodeURIComponent(search)}`;
  if (module) queryString += `&module=${encodeURIComponent(module)}`;
  if (action) queryString += `&action=${encodeURIComponent(action)}`;
  if (userId) queryString += `&userId=${encodeURIComponent(userId)}`;
  if (startDate) queryString += `&startDate=${encodeURIComponent(startDate)}`;
  if (endDate) queryString += `&endDate=${encodeURIComponent(endDate)}`;
  if (sort) queryString += `&sort=${encodeURIComponent(sort)}`;
  
  // Renderizar a página
  res.render('audit/index', {
    pageTitle: 'Auditoria do Sistema',
    activeRoute: 'audit',
    logs,
    currentUser: req.user,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    },
    filters: {
      search,
      module,
      action,
      userId,
      startDate,
      endDate,
      sort
    },
    filterOptions: {
      users,
      modules,
      actions
    },
    queryString,
    messages: req.flash()
  });
});

/**
 * Renderiza a página de detalhes de um log de auditoria
 * @route GET /admin/audit/:id
 */
const renderAuditDetail = asyncHandler(async (req, res, next) => {
  const logId = req.params.id;
  
  // Buscar log
  const logs = await query(
    `SELECT 
      l.id, 
      l.user_id, 
      l.action, 
      l.entity, 
      l.entity_id, 
      l.details, 
      l.ip_address, 
      l.user_agent, 
      l.timestamp,
      u.username,
      u.full_name
    FROM 
      user_action_logs l
    LEFT JOIN 
      users u ON l.user_id = u.id
    WHERE 
      l.id = ?`,
    [logId]
  );
  
  if (!logs || logs.length === 0) {
    req.flash('error', 'Registro de auditoria não encontrado.');
    return res.redirect('/admin/audit');
  }
  
  // Renderizar a página
  res.render('audit/view', {
    pageTitle: `Detalhes da Auditoria #${logId}`,
    activeRoute: 'audit',
    log: logs[0],
    currentUser: req.user,
    messages: req.flash()
  });
});

module.exports = {
  renderAuditList,
  renderAuditDetail
};
