/**
 * Controlador para o módulo de auditoria
 */

const { query } = require('../config/database'); // Se você usa 'query' diretamente
const pool = require('../config/database'); // Se você usa pool.query, como parece na função renderAuditModal
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
    const logs = await query(sql, params); // Usando 'query' da sua config/database
    
    // Contar total de registros para metadados de paginação
    let countSql = 'SELECT COUNT(*) as total FROM user_action_logs l LEFT JOIN users u ON l.user_id = u.id';
    if (conditions.length > 0) {
        countSql += ' WHERE ' + conditions.join(' AND ');
    }
    
    const [{ total }] = await query(countSql, params.slice(0, -2)); // Usando 'query'
    
    // Buscar todos os usuários para o filtro
    const users = await query('SELECT id, username, full_name FROM users ORDER BY username'); // Usando 'query'
    
    // Buscar todos os módulos para o filtro
    const modules = await query('SELECT DISTINCT entity FROM user_action_logs ORDER BY entity'); // Usando 'query'
    
    // Buscar todos os tipos de ações para o filtro
    const actions = await query('SELECT DISTINCT action FROM user_action_logs ORDER BY action'); // Usando 'query'
    
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
    //console.log(`Buscando detalhes do log ID: ${logId}`);
    // Buscar log
    const logs = await query( // Usando 'query'
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
 * Renderiza o conteúdo do modal de detalhes do log de auditoria
 * Esta rota é chamada via Fetch API pelo frontend.
 * @route GET /admin/audit/modal/:id
 */
const renderAuditModal = asyncHandler(async (req, res) => {
    const { id: logId } = req.params;
    
    //console.log('--- REQUISIÇÃO PARA MODAL DE DETALHES ---');
    //console.log(`Recebida requisição GET para /admin/audit/modal/${logId}`);
    
    try {
        // Validar o ID do log
        if (!logId) {
            console.error('Erro: ID do log não fornecido para o modal.');
            // Renderiza o template do modal com uma mensagem de erro
            return res.status(400).render('audit/components/auditDetailModal', {
                error: 'ID de log não fornecido.'
            });
        }
        
        // Converter para número e validar
        const logIdNum = parseInt(logId, 10);
        if (isNaN(logIdNum)) {
            console.error(`Erro: ID de log inválido (não é um número): ${logId}`);
            return res.status(400).render('audit/components/auditDetailModal', {
                error: `ID de log inválido: ${logId} (não é um número).`
            });
        }

        // Preparar a consulta SQL com parâmetros seguros
        // ATENÇÃO: Havia uma inconsistência aqui. As outras funções usam 'user_action_logs'.
        // Se a tabela correta for 'audit_logs' para esta função, mantenha-a.
        // Se todas as funções devem usar 'user_action_logs', altere aqui.
        // Estou mantendo 'audit_logs' como você me forneceu.
        const sql = `
            SELECT 
                l.id, 
                l.user_id, 
                l.action, 
                l.entity, 
                l.entity_id, 
                l.details, 
                l.ip_address, 
                l.user_agent,
                l.timestamp, -- Usando 'timestamp' para consistência com outras queries
                u.username,
                u.full_name
            FROM 
                audit_logs l
            LEFT JOIN 
                users u ON l.user_id = u.id
            WHERE 
                l.id = ?
        `;
        
        //console.log(`Executando consulta para log ID ${logIdNum}`);
        
        // Use 'query' da sua configuração, que assume ser do pool se configurado
        const logs = await query(sql, [logIdNum]); 
        
        // Verificar se o log foi encontrado
        if (!logs || logs.length === 0) {
            console.warn(`Log ID ${logIdNum} não encontrado no banco de dados.`);
            return res.status(404).render('audit/components/auditDetailModal', {
                error: `Log ID ${logIdNum} não encontrado.`
            });
        }
        
        // Obter o log encontrado
        const log = logs[0];
        // //console.log('Dados brutos do log do DB:', log); // Remover em produção
        
        // Formatar os detalhes do log (se existirem)
        let formattedDetails = null;
        if (log.details) {
            try {
                // Tentar parsear JSON, lidar com strings e objetos
                formattedDetails = typeof log.details === 'string' ? JSON.parse(log.details) : log.details;
                // //console.log('Detalhes parseados:', formattedDetails); // Remover em produção
            } catch (parseError) {
                console.warn(`Falha ao parsear detalhes JSON para o log ID ${logIdNum}. Tentando limpeza ou usando como string.`, parseError);
                try {
                    // Tentar remover caracteres de escape adicionais
                    const cleanedDetails = String(log.details)
                        .replace(/\\\\n/g, '\\n')
                        .replace(/\\\\r/g, '\\r')
                        .replace(/\\\\t/g, '\\t')
                        .replace(/\\\\"/g, '\\"');
                    formattedDetails = JSON.parse(cleanedDetails);
                    // //console.log('Detalhes parseados após limpeza:', formattedDetails); // Remover em produção
                } catch (secondError) {
                    console.error(`Falha final ao processar detalhes para log ID ${logIdNum}.`, secondError);
                    formattedDetails = { raw_data: String(log.details), error: 'Formato de detalhes inválido' };
                }
            }
        } else {
            formattedDetails = { info: 'Sem detalhes disponíveis' };
        }
        
        // Criar um objeto de log formatado para o template
        const formattedLog = {
            id: log.id,
            user_id: log.user_id,
            username: log.username || 'N/A',
            full_name: log.full_name || 'N/A',
            action: log.action,
            entity: log.entity,
            entity_id: log.entity_id,
            ip_address: log.ip_address,
            user_agent: log.user_agent,
            timestamp: log.timestamp, // Mantém o timestamp original se necessário
            formattedTimestamp: new Date(log.timestamp).toLocaleString('pt-BR'), // Formato legível
            formattedDetails: formattedDetails // Já é um objeto (ou string raw)
        };
        
        // Renderizar o template do modal com os dados formatados
        res.render('audit/components/auditDetailModal', {
            log: formattedLog,
            error: null // Garante que a variável 'error' não cause problemas no template
        });
        
        //console.log(`Modal renderizado com sucesso para o log ID: ${logId}`);
    } catch (error) {
        console.error(`Erro inesperado ao renderizar modal para log ID ${logId}:`, error);
        res.status(500).render('audit/components/auditDetailModal', {
            error: 'Ocorreu um erro interno ao buscar detalhes do log. ' + error.message
        });
    }
});

module.exports = {
    renderAuditList,
    renderAuditDetail,
    renderAuditModal
};