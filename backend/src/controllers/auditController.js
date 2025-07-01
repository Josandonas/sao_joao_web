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
  console.log(`Buscando detalhes do log ID: ${logId}`);
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

/**
 * Buscar detalhes de um log de auditoria
 * @route GET /admin/audit/item/:id
 */
/*
const getAuditDetail = asyncHandler(async (req, res) => {
  const logId = req.params.id;
  console.log(`Buscando detalhes do log ID: ${logId}`);
  try {
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
    console.log(logs);
    
    if (!logs || logs.length === 0) {
      return res.status(404).json({ success: false, message: 'Registro de auditoria não encontrado.' });
    }
    
    // Formatar o log para a resposta
    const log = logs[0];
    
    // Garantir que os campos existam e estejam formatados corretamente
    let formattedDetails = null;
    if (log.details) {
      try {
        formattedDetails = typeof log.details === 'string' ? JSON.parse(log.details) : log.details;
      } catch (e) {
        formattedDetails = { error: 'Formato inválido', raw: log.details };
      }
    }
    
    let formattedLog = {
      id: log.id,
      user_id: log.user_id,
      username: log.username || 'N/A',
      full_name: log.full_name || 'N/A',
      action: log.action,
      entity: log.entity,
      entity_id: log.entity_id,
      ip_address: log.ip_address,
      user_agent: log.user_agent,
      timestamp: log.timestamp,
      formattedTimestamp: new Date(log.timestamp).toLocaleString('pt-BR'),
      formattedDetails: formattedDetails
    };
    
    res.json({ success: true, log: formattedLog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao buscar detalhes do log', error: error.message });
  }
});
*/
/**
 * Renderiza o modal de detalhes de um log de auditoria
 * @route GET /admin/audit/modal/:id
 */
const renderAuditModal = asyncHandler(async (req, res) => {
  const logId = req.params.id;
  console.log(`Renderizando modal para o log ID: ${logId}`);
  
  try {
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
    
    console.log(`Resultado da consulta para o log ID ${logId}:`, logs ? logs.length : 0, 'registros encontrados');
    
    if (!logs || logs.length === 0) {
      console.log(`Log ID ${logId} não encontrado`);
      return res.status(404).render('audit/components/auditDetailModalContent', {
        error: 'Registro de auditoria não encontrado.'
      });
    }
    
    // Formatar o log para a resposta
    const log = logs[0];
    console.log(`Log encontrado:`, { id: log.id, action: log.action, entity: log.entity });
    
    // Garantir que os campos existam e estejam formatados corretamente
    let formattedDetails = null;
    if (log.details) {
      try {
        formattedDetails = typeof log.details === 'string' ? JSON.parse(log.details) : log.details;
        console.log('Detalhes JSON parseados com sucesso');
      } catch (e) {
        console.error(`Erro ao parsear JSON dos detalhes:`, e);
        formattedDetails = { error: 'Formato inválido', raw: log.details };
      }
    }
    
    let formattedLog = {
      id: log.id,
      user_id: log.user_id,
      username: log.username || 'N/A',
      full_name: log.full_name || 'N/A',
      action: log.action,
      entity: log.entity,
      entity_id: log.entity_id,
      ip_address: log.ip_address,
      user_agent: log.user_agent,
      timestamp: log.timestamp,
      formattedTimestamp: new Date(log.timestamp).toLocaleString('pt-BR'),
      formattedDetails: formattedDetails
    };
    
    console.log('Log formatado e pronto para renderizar');
    
    // Renderizar apenas o conteúdo interno do modal
    res.render('audit/components/auditDetailModalContent', {
      log: formattedLog,
      error: null
    });
    
    console.log('Conteúdo do modal renderizado com sucesso para o log ID:', logId);
  } catch (error) {
    console.error(`Erro ao renderizar modal:`, error);
    res.status(500).render('audit/components/auditDetailModalContent', {
      error: 'Erro ao buscar detalhes do log: ' + error.message
    });
  }
});

module.exports = {
  renderAuditList,
  renderAuditDetail,
//  getAuditDetail,
  renderAuditModal
};
