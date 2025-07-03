/**
 * Controlador para o módulo de auditoria
 */

const { query } = require('../config/database'); // Se você usa 'query' diretamente
const pool = require('../config/database'); // Se você usa pool.query, como parece na função renderAuditModal
const { asyncHandler } = require('../middlewares/errorHandler');
const crypto = require('crypto'); // Para geração de tokens seguros

// Chave secreta para criptografia - em produção, use variáveis de ambiente
// IMPORTANTE: Esta chave deve ser armazenada de forma segura e não no código
// Para AES-256-CBC, a chave deve ter exatamente 32 bytes (256 bits)
const rawKey = process.env.TOKEN_SECRET_KEY || 'sao-joao-web-audit-secret-key-2025';
// Garantir que a chave tenha exatamente 32 bytes usando SHA-256
const SECRET_KEY = crypto.createHash('sha256').update(rawKey).digest();
const IV_LENGTH = 16; // Para AES, o IV deve ter 16 bytes

/**
 * Formata um endereço IP, convertendo formato IPv4-mapped IPv6 para IPv4 simples
 * @param {string} ip - Endereço IP a ser formatado
 * @returns {string} - Endereço IP formatado
 */
function formatIpAddress(ip) {
    if (!ip) return 'N/A';
    
    // Usa regex para substituir o prefixo IPv4-mapped IPv6 (::ffff:)
    // ^ garante que o padrão só corresponde ao início da string
    return ip.replace(/^::ffff:/, '');
}

/**
 * Criptografa um ID para criar um token seguro
 * @param {number|string} id - ID real do log
 * @returns {string} - Token criptografado para uso no frontend
 */
function generateSecureToken(id) {
    try {
        //console.log(`Gerando token para ID: ${id}`);
        
        // Converter o ID para string
        const idStr = String(id);
        
        // Gerar um IV aleatório
        const iv = crypto.randomBytes(IV_LENGTH);
        const ivHex = iv.toString('hex');
        //console.log(`IV gerado (hex): ${ivHex}`);
        
        // Criar um timestamp de expiração (30 minutos)
        const expiresAt = Date.now() + (30 * 60 * 1000);
        
        // Criar payload com ID e timestamp
        const payload = JSON.stringify({
            id: idStr,
            exp: expiresAt
        });
        //console.log(`Payload: ${payload}`);
        
        // Criar cipher com algoritmo AES-256-CBC
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv);
        
        // Criptografar o payload
        let encrypted = cipher.update(payload, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        //console.log(`Texto criptografado (hex): ${encrypted}`);
        
        // Novo formato: usar os primeiros 32 caracteres do IV seguidos pelo texto criptografado
        // Isso evita o uso do caractere ':' que pode causar problemas em URLs
        const token = `${ivHex}${encrypted}`;
        //console.log(`Token completo gerado (novo formato): ${token}`);
        
        return token;
    } catch (error) {
        //console.error('Erro ao gerar token seguro:', error);
        // Em caso de erro, retornar um identificador aleatório que não pode ser descriptografado
        return crypto.randomBytes(32).toString('hex');
    }
}

/**
 * Descriptografa um token para obter o ID original
 * @param {string} token - Token criptografado
 * @returns {string|null} - ID original ou null se inválido/expirado
 */
function getIdFromToken(token) {
    try {
        //console.log(`Processando token: ${token}`);
        
        // Verificar se o token tem pelo menos o tamanho mínimo esperado (IV + algum conteúdo criptografado)
        if (!token || token.length < 32) {
            //console.error('Token inválido: muito curto');
            return null;
        }
        
        // No novo formato, o IV é os primeiros 32 caracteres (16 bytes em hex)
        const ivHex = token.substring(0, 32);
        const encryptedHex = token.substring(32);
        
        //console.log(`IV Hex (primeiros 32 caracteres): ${ivHex}`);
        //console.log(`Encrypted Hex (restante): ${encryptedHex}`);
        
        if (!ivHex || !encryptedHex) {
            //console.error('Token mal formatado, não foi possível extrair IV e conteúdo criptografado');
            return null;
        }
        
        // Converter IV de hex para buffer
        const iv = Buffer.from(ivHex, 'hex');
        
        // Criar decipher
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv);
        
        // Descriptografar
        let decrypted;
        try {
            decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            //console.log(`Conteúdo descriptografado: ${decrypted}`);
        } catch (e) {
            //console.error('Erro ao descriptografar token:', e);
            return null;
        }
        
        // Parsear o payload
        let payload;
        try {
            payload = JSON.parse(decrypted);
            //console.log(`Payload parseado:`, payload);
        } catch (e) {
            //console.error('Erro ao parsear JSON do payload:', e);
            return null;
        }
        
        // Verificar expiração
        if (Date.now() > payload.exp) {
            //console.log('Token expirado');
            return null;
        }
        
        return payload.id;
    } catch (error) {
        //console.error('Erro ao descriptografar token:', error);
        return null;
    }
}

/**
 * Renderiza a página principal do módulo de auditoria
 * @route GET /admin/audit
 */
const renderAuditList = asyncHandler(async (req, res) => {
    // Parâmetros de paginação e filtros
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5; // Reduzido de 20 para 5 itens por página
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

    // Executar query principal para buscar logs
    const logs = await query(sql, params);

    // Formatar endereços IP e adicionar tokens seguros
    logs.forEach(log => {
        log.ip_address = formatIpAddress(log.ip_address);
        // Gerar e adicionar token seguro para cada log
        log.secure_token = generateSecureToken(log.id);
    });

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
    const queryParams = [];
    if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
    if (module) queryParams.push(`module=${encodeURIComponent(module)}`);
    if (action) queryParams.push(`action=${encodeURIComponent(action)}`);
    if (userId) queryParams.push(`userId=${encodeURIComponent(userId)}`);
    if (startDate) queryParams.push(`startDate=${encodeURIComponent(startDate)}`);
    if (endDate) queryParams.push(`endDate=${encodeURIComponent(endDate)}`);
    if (sort) queryParams.push(`sort=${encodeURIComponent(sort)}`);
    
    // Junta os parâmetros com & para formar a queryString
    const queryString = queryParams.length > 0 ? `&${queryParams.join('&')}` : '';

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
    ////console.log(`Buscando detalhes do log ID: ${logId}`);
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
 * @route GET /admin/audit/modal/:token
 */
const renderAuditModal = asyncHandler(async (req, res) => {
    // Decodificar o token recebido da URL
    let token = req.params.token;
    //console.log(`Token recebido bruto: "${token}"`);
    //console.log(`Tipo do token: ${typeof token}`);
    //console.log(`Comprimento do token: ${token.length}`);
    //console.log(`Caracteres do token (códigos ASCII):`);
    for (let i = 0; i < Math.min(token.length, 50); i++) {
        //console.log(`Posição ${i}: "${token[i]}" (${token.charCodeAt(i)})`);
    }
    
    try {
        token = decodeURIComponent(token);
        //console.log(`Token após decodeURIComponent: "${token}"`);
    } catch (e) {
        //console.error('Erro ao decodificar token da URL:', e);
        // Manter o token original se houver erro na decodificação
    }
    //console.log(`Recebida requisição GET para /admin/audit/modal/${token}`);

    try {
        // Validar o token
        if (!token) {
            //console.error('Erro: Token não fornecido para o modal.');
            // Renderiza o template do modal com uma mensagem de erro
            return res.status(400).render('audit/components/auditDetailModalContent', {
                error: 'Token não fornecido.',
                log: null,
                layout: false
            });
        }

        // Recuperar o ID real a partir do token
        const logIdNum = getIdFromToken(token);
        if (!logIdNum) {
            //console.error(`Erro: Token inválido ou expirado: ${token}`);
            return res.status(404).render('audit/components/auditDetailModalContent', {
                error: 'Token inválido ou expirado.',
                log: null,
                layout: false
            });
        }
        
        // Consulta SQL para buscar os detalhes do log
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
                l.timestamp,
                u.username,
                u.full_name
            FROM 
                user_action_logs l
            LEFT JOIN 
                users u ON l.user_id = u.id
            WHERE 
                l.id = ?
        `;

        ////console.log(`Executando consulta para log ID ${logIdNum}`);

        // Use 'query' da sua configuração, que assume ser do pool se configurado
        const logs = await query(sql, [logIdNum]);

        // Verificar se o log foi encontrado
        if (!logs || logs.length === 0) {
            //console.warn(`Log ID ${logIdNum} não encontrado no banco de dados.`);
            return res.status(404).render('audit/components/auditDetailModal', {
                error: `Log ID ${logIdNum} não encontrado.`
            });
        }

        // Obter o log encontrado
        const log = logs[0];
        // ////console.log('Dados brutos do log do DB:', log); // Remover em produção

        // Formatar os detalhes do log (se existirem)
        let formattedDetails = null;
        if (log.details) {
            try {
                // Tentar parsear JSON se for string, ou usar diretamente se já for objeto
                const detailsObj = typeof log.details === 'string' ? JSON.parse(log.details) : log.details;

                // Importante: Converter de volta para string JSON formatada
                formattedDetails = JSON.stringify(detailsObj, null, 2);

            } catch (parseError) {
                //console.warn(`Falha ao parsear detalhes JSON para o log ID ${logIdNum}. Tentando limpeza ou usando como string.`, parseError);
                try {
                    // Tentar remover caracteres de escape adicionais
                    const cleanedDetails = String(log.details)
                        .replace(/\\\\n/g, '\\n')
                        .replace(/\\\\r/g, '\\r')
                        .replace(/\\\\t/g, '\\t')
                        .replace(/\\\\"/g, '\\"');

                    // Tentar parsear novamente após limpeza
                    const cleanedObj = JSON.parse(cleanedDetails);
                    formattedDetails = JSON.stringify(cleanedObj, null, 2);
                } catch (secondError) {
                    //console.error(`Falha final ao processar detalhes para log ID ${logIdNum}.`, secondError);
                    // Se falhar, usar uma string simples
                    formattedDetails = String(log.details);
                }
            }
        } else {
            formattedDetails = "{ \"info\": \"Sem detalhes disponíveis\" }";
        }

        /**
         * Criar um objeto de log formatado para o template
         */
        const formattedLog = {
            id: log.id,
            user_id: log.user_id,
            username: log.username || 'N/A',
            full_name: log.full_name || 'N/A',
            action: log.action,
            entity: log.entity,
            entity_id: log.entity_id,
            ip_address: formatIpAddress(log.ip_address),
            user_agent: log.user_agent,
            timestamp: log.timestamp, // Mantém o timestamp original se necessário
            formattedTimestamp: new Date(log.timestamp).toLocaleString('pt-BR'), // Formato legível
            formattedDetails: formattedDetails // Já é um objeto (ou string raw)
        };

        // Renderizar apenas o conteúdo interno do modal, não a estrutura completa
        res.render('audit/components/auditDetailModalContent', {
            log: formattedLog,
            error: null, // Garante que a variável 'error' não cause problemas no template
            layout: false // Desabilita o layout padrão
        });

        ////console.log(`Modal renderizado com sucesso para o log ID: ${logId}`);
    } catch (error) {
        //console.error(`Erro inesperado ao renderizar modal para log ID ${logId}:`, error);
        res.status(500).render('audit/components/auditDetailModalContent', {
            error: 'Ocorreu um erro interno ao buscar detalhes do log. ' + error.message,
            layout: false // Desabilita o layout padrão também em caso de erro
        });
    }
});

module.exports = {
    renderAuditList,
    renderAuditDetail,
    renderAuditModal
};