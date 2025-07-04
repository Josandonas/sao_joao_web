/**
 * Controlador para o módulo de gerenciamento de usuários
 */

const bcrypt = require('bcryptjs');
const { query } = require('../config/database');
const { AppError, asyncHandler } = require('../middlewares/errorHandler');
const { logUserAction } = require('../middlewares/auth');
const { logger } = require('../utils/logger');

/**
 * Renderiza a página de listagem de usuários
 * @route GET /admin/users
 */
const renderUserList = asyncHandler(async (req, res, next) => {
    // Parâmetros de paginação e filtros
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const sort = req.query.sort || 'created_at_desc';

    // Calcular offset para paginação
    const offset = (page - 1) * limit;

    // Construir query base
    let sql = `SELECT id, username, full_name, email, phone, is_admin, is_active, created_at, updated_at 
               FROM users`;
    const params = [];

    // Adicionar filtros
    const conditions = [];

    // Filtrar por status (ativo/inativo/excluído logicamente) - Lógica já consistente
    const status = req.query.status;
    if (status === 'active') {
        conditions.push('is_active = TRUE AND deleted_at IS NULL');
    } else if (status === 'inactive') {
        conditions.push('is_active = FALSE AND deleted_at IS NULL');
    } else if (status === 'deleted') {
        conditions.push('deleted_at IS NOT NULL');
    }

    if (search) {
        conditions.push('(username LIKE ? OR full_name LIKE ? OR email LIKE ?)');
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
    }

    if (role === 'admin') {
        conditions.push('is_admin = TRUE');
    } else if (role === 'user') {
        conditions.push('is_admin = FALSE');
    }

    // Adicionar condições à query
    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    // Adicionar ordenação
    switch (sort) {
        case 'username_asc':
            sql += ' ORDER BY username ASC';
            break;
        case 'username_desc':
            sql += ' ORDER BY username DESC';
            break;
        case 'created_at_asc':
            sql += ' ORDER BY created_at ASC';
            break;
        case 'created_at_desc':
        default:
            sql += ' ORDER BY created_at DESC';
            break;
    }

    // Adicionar paginação
    sql += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    // Executar query
    const users = await query(sql, params);

    const processedUsers = users.map(user => {
        return {
            ...user, // Copia todas as outras propriedades do usuário
            is_active: user.is_active === 1 ? true : false, // Converte 1 para true, 0 para false
            // Você pode adicionar outras conversões aqui se necessário,
            // por exemplo, para deleted_at se for string e quiser Date
            // deleted_at: user.deleted_at ? new Date(user.deleted_at) : null
        };
    });

    // Contar total de registros para metadados de paginação
    let countSql = 'SELECT COUNT(*) as total FROM users';
    // É importante usar um novo array para os parâmetros do countSql
    // pois os parâmetros de LIMIT/OFFSET não devem ser aplicados aqui.
    const countParams = params.slice(0, -2); // Remove limit e offset
    if (conditions.length > 0) {
        countSql += ' WHERE ' + conditions.join(' AND ');
    }

    const [{ total }] = await query(countSql, countParams); // Usar countParams aqui

    // Construir string de query para links de paginação
    let queryString = '';
    if (search) queryString += `&search=${encodeURIComponent(search)}`;
    if (role) queryString += `&role=${encodeURIComponent(role)}`;
    if (sort) queryString += `&sort=${encodeURIComponent(sort)}`;
    if (status) queryString += `&status=${encodeURIComponent(status)}`;

    // Renderizar a página
    res.render('users/index', {
        pageTitle: 'Gerenciamento de Usuários',
        activeRoute: 'users',
        users: processedUsers,
        currentUser: req.user,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        },
        filters: {
            search,
            role,
            sort,
            status
        },
        queryString,
        messages: req.flash()
    });
});

/**
 * Renderiza a página de visualização de detalhes de um usuário
 * @route GET /admin/users/:id/view
 */
const renderUserDetails = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;

    // Buscar usuário
    const users = await query(
        'SELECT id, username, full_name, email, phone, is_admin, is_active, created_at, updated_at, deleted_at FROM users WHERE id = ?', // Adicionado deleted_at
        [userId]
    );

    if (!users || users.length === 0) {
        req.flash('error', 'Usuário não encontrado.');
        return res.redirect('/admin/users');
    }

    // Buscar permissões do usuário com detalhes de permissões
    const permissions = await query(
        `SELECT m.id, m.name, m.description, ump.can_view, ump.can_create, ump.can_edit, ump.can_delete 
         FROM user_module_permissions ump 
         JOIN modules m ON ump.module_id = m.id 
         WHERE ump.user_id = ?`,
        [userId]
    );

    // Buscar todos os módulos disponíveis
    const allModules = await query('SELECT id, name, description FROM modules');

    // Criar um mapa de permissões para fácil acesso no template
    const permissionsMap = {};
    permissions.forEach(perm => {
        permissionsMap[perm.id] = {
            can_view: perm.can_view,
            can_create: perm.can_create,
            can_edit: perm.can_edit,
            can_delete: perm.can_delete
        };
    });

    // Renderizar a página
    res.render('users/view', {
        pageTitle: `Usuário: ${users[0].full_name}`,
        user: users[0],
        permissions, // Pode manter para iteração direta
        allModules,
        permissionsMap, // Útil para verificar permissões individuais por módulo
        currentUser: req.user,
        messages: req.flash()
    });
});

/**
 * Renderiza a página de criação de usuário
 * @route GET /admin/users/create
 */
const renderCreateUser = asyncHandler(async (req, res, next) => {
    // Buscar todos os módulos disponíveis
    const allModules = await query('SELECT id, name, description FROM modules');

    // Renderizar a página com formulário vazio e um mapa de permissões vazio
    res.render('users/form', {
        pageTitle: 'Novo Usuário',
        formAction: '/admin/users', // POST para /admin/users para criar
        isEditing: false,
        user: { is_active: true, is_admin: false }, // Valores padrão para novo usuário
        currentUser: req.user,
        allModules,
        permissionsMap: {}, // Um objeto vazio para um novo usuário
        messages: req.flash()
    });
});

/**
 * Renderiza a página de edição de usuário
 * @route GET /admin/users/:id/edit
 */
const renderEditUser = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;

    // Buscar usuário
    const users = await query(
        'SELECT id, username, full_name, email, phone, is_admin, is_active FROM users WHERE id = ?',
        [userId]
    );

    if (!users || users.length === 0) {
        req.flash('error', 'Usuário não encontrado.');
        return res.redirect('/admin/users');
    }

    // Buscar permissões do usuário com detalhes de permissões
    const permissions = await query(
        `SELECT m.id, m.name, m.description, ump.can_view, ump.can_create, ump.can_edit, ump.can_delete 
         FROM user_module_permissions ump 
         JOIN modules m ON ump.module_id = m.id 
         WHERE ump.user_id = ?`,
        [userId]
    );

    // Buscar todos os módulos disponíveis
    const allModules = await query('SELECT id, name, description FROM modules');

    // Criar um mapa de permissões para fácil acesso no template
    const permissionsMap = {};
    permissions.forEach(perm => {
        permissionsMap[perm.id] = {
            can_view: perm.can_view,
            can_create: perm.can_create,
            can_edit: perm.can_edit,
            can_delete: perm.can_delete
        };
    });

    // Renderizar a página
    res.render('users/form', {
        pageTitle: `Editar Usuário: ${users[0].full_name}`,
        user: users[0],
        formAction: `/admin/users/${userId}`, // POST para /admin/users/:id para atualizar
        isEditing: true,
        currentUser: req.user,
        allModules,
        permissionsMap,
        messages: req.flash()
    });
});

/**
 * Retorna os dados de um usuário em formato JSON (para uso em AJAX)
 * @route GET /admin/users/:id/data
 */
const getUserData = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;

    // Buscar usuário
    const users = await query(
        'SELECT id, username, full_name, email, phone, is_admin, is_active, created_at, updated_at FROM users WHERE id = ?', // Adicionado is_active
        [userId]
    );

    if (!users || users.length === 0) {
        return res.status(404).json({
            status: 'error',
            message: 'Usuário não encontrado.'
        });
    }

    // Buscar permissões do usuário
    const permissions = await query(
        `SELECT m.id, m.name, m.description, ump.can_view, ump.can_create, ump.can_edit, ump.can_delete 
         FROM user_module_permissions ump 
         JOIN modules m ON ump.module_id = m.id 
         WHERE ump.user_id = ?`,
        [userId]
    );

    // Criar um mapa de permissões para o JSON
    const permissionsMap = {};
    permissions.forEach(perm => {
        permissionsMap[perm.id] = {
            can_view: !!perm.can_view, // Converter para boolean
            can_create: !!perm.can_create,
            can_edit: !!perm.can_edit,
            can_delete: !!perm.can_delete
        };
    });

    // Retornar dados
    res.status(200).json({
        status: 'success',
        user: users[0],
        permissions: permissionsMap // Incluir as permissões no JSON
    });
});

/**
 * Cria um novo usuário
 * @route POST /admin/users
 */
const createUser = asyncHandler(async (req, res, next) => {
    const { username, fullName, email, password, passwordConfirm, phone } = req.body;
    const isAdmin = req.body.isAdmin === 'on';
    const isActive = req.body.isActive === 'on';

    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';

    // Extrair permissões de módulos do formulário
    const modulePermissions = {};
    const allModules = await query('SELECT id FROM modules'); // Para garantir que só módulos válidos sejam processados
    const validModuleIds = allModules.map(m => m.id.toString());

    Object.keys(req.body).forEach(key => {
        const match = key.match(/^module_permission_(\d+)_(view|create|edit|delete)$/);
        if (match && req.body[key] === 'on') {
            const moduleId = match[1];
            const permissionType = match[2];

            if (validModuleIds.includes(moduleId)) { // Validar se o moduleId é válido
                if (!modulePermissions[moduleId]) {
                    modulePermissions[moduleId] = {
                        can_view: false,
                        can_create: false,
                        can_edit: false,
                        can_delete: false
                    };
                }
                modulePermissions[moduleId][`can_${permissionType}`] = true;
            } else {
                logger.warn(`Permissão para módulo inválido recebida: ${moduleId}`);
            }
        }
    });

    // Validar dados de entrada
    if (!username || !fullName || !email || !password) {
        if (isAjax) {
            return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos obrigatórios.' });
        }
        req.flash('error', 'Por favor, preencha todos os campos obrigatórios.');
        return res.redirect('/admin/users/create');
    }

    // Verificar se as senhas coincidem
    if (password !== passwordConfirm) {
        if (isAjax) {
            return res.status(400).json({ success: false, message: 'As senhas não coincidem.' });
        }
        req.flash('error', 'As senhas não coincidem.');
        return res.redirect('/admin/users/create');
    }

    // Verificar se o usuário já existe
    const existingUsers = await query(
        'SELECT id FROM users WHERE username = ? OR email = ? AND deleted_at IS NULL', // Verificar apenas usuários ativos/inativos
        [username, email]
    );

    if (existingUsers.length > 0) {
        if (isAjax) {
            return res.status(409).json({ success: false, message: 'Nome de usuário ou email já está em uso.' }); // 409 Conflict
        }
        req.flash('error', 'Nome de usuário ou email já está em uso.');
        return res.redirect('/admin/users/create');
    }

    // Criar hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Inserir novo usuário
    const result = await query(
        'INSERT INTO users (username, full_name, email, password, phone, is_admin, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
            username,
            fullName,
            email,
            hashedPassword,
            phone || null,
            isAdmin,
            isActive
        ]
    );

    const userId = result.insertId;

    // Inserir permissões de módulo para o novo usuário
    if (Object.keys(modulePermissions).length > 0) {
        const permissionValues = [];

        Object.entries(modulePermissions).forEach(([moduleId, permissions]) => {
            permissionValues.push([
                userId,
                parseInt(moduleId), // Garantir que moduleId é um número
                permissions.can_view ? 1 : 0,
                permissions.can_create ? 1 : 0,
                permissions.can_edit ? 1 : 0,
                permissions.can_delete ? 1 : 0
            ]);
        });

        if (permissionValues.length > 0) {
            await query(
                'INSERT INTO user_module_permissions (user_id, module_id, can_view, can_create, can_edit, can_delete) VALUES ?',
                [permissionValues]
            );
        }
    }

    // Registrar ação (auditoria)
    await logUserAction(req.user.id, 'create', 'user', userId, {
        username,
        email,
        isAdmin,
        isActive,
        modulePermissions
    }, req);

    if (isAjax) {
        return res.status(201).json({ 
            success: true, 
            message: 'Usuário criado com sucesso.',
            userId: userId
        });
    }
    
    req.flash('success', 'Usuário criado com sucesso.');
    res.redirect('/admin/users');
});

/**
 * Atualiza um usuário existente
 * @route PUT /admin/users/:id
 */
const updateUser = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const { fullName, email, password, passwordConfirm, phone } = req.body;
    const isAdmin = req.body.isAdmin === 'on';
    const isActive = req.body.isActive === 'on';

    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';

    // Extrair permissões de módulos do formulário
    const modulePermissions = {};
    const allModules = await query('SELECT id FROM modules'); // Para garantir que só módulos válidos sejam processados
    const validModuleIds = allModules.map(m => m.id.toString());

    Object.keys(req.body).forEach(key => {
        const match = key.match(/^module_permission_(\d+)_(view|create|edit|delete)$/);
        if (match && req.body[key] === 'on') {
            const moduleId = match[1];
            const permissionType = match[2];

            if (validModuleIds.includes(moduleId)) { // Validar se o moduleId é válido
                if (!modulePermissions[moduleId]) {
                    modulePermissions[moduleId] = {
                        can_view: false,
                        can_create: false,
                        can_edit: false,
                        can_delete: false
                    };
                }
                modulePermissions[moduleId][`can_${permissionType}`] = true;
            } else {
                logger.warn(`Permissão para módulo inválido recebida: ${moduleId}`);
            }
        }
    });

    // Validar dados de entrada
    if (!fullName || !email) {
        if (isAjax) {
            return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos obrigatórios.' });
        }
        req.flash('error', 'Por favor, preencha todos os campos obrigatórios.');
        return res.redirect(`/admin/users/${userId}/edit`);
    }

    // Verificar se o usuário existe e não está logicamente excluído
    const users = await query('SELECT * FROM users WHERE id = ? AND deleted_at IS NULL', [userId]);
    if (!users || users.length === 0) {
        if (isAjax) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado ou já foi excluído.' });
        }
        req.flash('error', 'Usuário não encontrado ou já foi excluído.');
        return res.redirect('/admin/users');
    }

    // Verificar se o email já está em uso por outro usuário ATIVO/INATIVO
    if (email !== users[0].email) {
        const emailUsers = await query('SELECT id FROM users WHERE email = ? AND id != ? AND deleted_at IS NULL', [email, userId]);
        if (emailUsers.length > 0) {
            if (isAjax) {
                return res.status(409).json({ success: false, message: 'Email já está em uso por outro usuário.' }); // 409 Conflict
            }
            req.flash('error', 'Email já está em uso por outro usuário.');
            return res.redirect(`/admin/users/${userId}/edit`);
        }
    }

    // Preparar dados para atualização
    let updateFields = ['full_name = ?', 'email = ?', 'phone = ?', 'is_admin = ?', 'is_active = ?'];
    let updateParams = [fullName, email, phone || null, isAdmin, isActive];

    // Atualizar senha se fornecida
    if (password) {
        // Verificar se as senhas coincidem
        if (password !== passwordConfirm) {
            if (isAjax) {
                return res.status(400).json({ success: false, message: 'As senhas não coincidem.' });
            }
            req.flash('error', 'As senhas não coincidem.');
            return res.redirect(`/admin/users/${userId}/edit`);
        }

        // Criar hash da nova senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateFields.push('password = ?');
        updateParams.push(hashedPassword);
    }
    
    updateParams.push(userId); // Adicionar userId no final para a cláusula WHERE

    await query(`UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`, updateParams);

    // Atualizar permissões de módulo
    // Primeiro, remover todas as permissões existentes para este usuário
    await query('DELETE FROM user_module_permissions WHERE user_id = ?', [userId]);

    // Depois, inserir as novas permissões do formulário
    if (Object.keys(modulePermissions).length > 0) {
        const permissionValues = [];

        Object.entries(modulePermissions).forEach(([moduleId, permissions]) => {
            permissionValues.push([
                userId,
                parseInt(moduleId), // Garantir que moduleId é um número
                permissions.can_view ? 1 : 0,
                permissions.can_create ? 1 : 0,
                permissions.can_edit ? 1 : 0,
                permissions.can_delete ? 1 : 0
            ]);
        });

        if (permissionValues.length > 0) {
            await query(
                'INSERT INTO user_module_permissions (user_id, module_id, can_view, can_create, can_edit, can_delete) VALUES ?',
                [permissionValues]
            );
        }
    }

    // Registrar ação (auditoria)
    await logUserAction(req.user.id, 'update', 'user', userId, {
        updatedFields: Object.keys(req.body).filter(key => key !== 'password' && key !== 'passwordConfirm'), // Logar campos atualizados, exceto senhas
        modulePermissions
    }, req);

    if (isAjax) {
        return res.status(200).json({ 
            success: true, 
            message: 'Usuário atualizado com sucesso.',
            userId: userId
        });
    }
    
    req.flash('success', 'Usuário atualizado com sucesso.');
    res.redirect('/admin/users');
});

/**
 * Exclui logicamente um usuário
 * @route DELETE /admin/users/:id
 */
const deleteUser = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';

    // Verificar se o usuário existe e não está *já* logicamente excluído
    const users = await query('SELECT * FROM users WHERE id = ? AND deleted_at IS NULL', [userId]);
    if (!users || users.length === 0) {
        if (isAjax) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado ou já foi excluído.' });
        }
        req.flash('error', 'Usuário não encontrado ou já foi excluído.');
        return res.redirect('/admin/users');
    }

    // Impedir exclusão do próprio usuário
    if (parseInt(userId) === req.user.id) {
        if (isAjax) {
            return res.status(403).json({ success: false, message: 'Você não pode excluir sua própria conta.' }); // 403 Forbidden
        }
        req.flash('error', 'Você não pode excluir sua própria conta.');
        return res.redirect('/admin/users');
    }

    // Exclusão lógica do usuário
    const now = new Date();
    await query(
        'UPDATE users SET is_active = FALSE, deleted_at = ? WHERE id = ?',
        [now, userId]
    );

    // Registrar ação (auditoria)
    await logUserAction(req.user.id, 'delete', 'user', userId, {
        deletedUser: users[0].username,
        deletionType: 'logical',
        deletedAt: now
    }, req);

    if (isAjax) {
        return res.status(200).json({ success: true, message: 'Usuário excluído com sucesso.' });
    }
    
    req.flash('success', 'Usuário excluído com sucesso.');
    res.redirect('/admin/users');
});

/**
 * Desativa um usuário (sem excluí-lo logicamente)
 * @route POST /admin/users/:id/deactivate
 */
const deactivateUser = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';

    // Verificar se o usuário existe e não está logicamente excluído
    const users = await query('SELECT * FROM users WHERE id = ? AND deleted_at IS NULL', [userId]);
    if (!users || users.length === 0) {
        if (isAjax) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado ou já foi excluído.' });
        }
        req.flash('error', 'Usuário não encontrado ou já foi excluído.');
        return res.redirect('/admin/users');
    }

    // Impedir desativação do próprio usuário
    if (parseInt(userId) === req.user.id) {
        if (isAjax) {
            return res.status(403).json({ success: false, message: 'Você não pode desativar sua própria conta.' }); // 403 Forbidden
        }
        req.flash('error', 'Você não pode desativar sua própria conta.');
        return res.redirect('/admin/users');
    }

    // Desativar o usuário
    await query('UPDATE users SET is_active = FALSE WHERE id = ?', [userId]);

    // Remover todas as permissões de módulo associadas ao usuário
    await query('DELETE FROM user_module_permissions WHERE user_id = ?', [userId]);

    // Registrar ação (auditoria)
    await logUserAction(req.user.id, 'deactivate', 'user', userId, {
        deactivatedUser: users[0].username
    }, req);

    if (isAjax) {
        return res.status(200).json({ success: true, message: 'Usuário desativado com sucesso.' });
    }
    
    req.flash('success', 'Usuário desativado com sucesso.');
    res.redirect('/admin/users');
});

/**
 * Ativa um usuário desativado (e restaura permissões padrão ou permite edição posterior)
 * @route POST /admin/users/:id/activate
 */
const activateUser = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';

    // Verificar se o usuário existe e não está logicamente excluído
    const users = await query('SELECT * FROM users WHERE id = ? AND deleted_at IS NULL', [userId]);
    if (!users || users.length === 0) {
        if (isAjax) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado ou já foi excluído.' });
        }
        req.flash('error', 'Usuário não encontrado ou já foi excluído.');
        return res.redirect('/admin/users');
    }

    // Ativar o usuário
    await query('UPDATE users SET is_active = TRUE WHERE id = ?', [userId]);

    // Registrar ação (auditoria)
    await logUserAction(req.user.id, 'activate', 'user', userId, {
        activatedUser: users[0].username
    }, req);

    if (isAjax) {
        return res.status(200).json({ success: true, message: 'Usuário ativado com sucesso.' });
    }
    
    req.flash('success', 'Usuário ativado com sucesso.');
    res.redirect('/admin/users');
});

module.exports = {
    renderUserList,
    renderUserDetails,
    renderCreateUser,
    renderEditUser,
    getUserData,
    createUser,
    updateUser,
    deleteUser,
    activateUser,
    deactivateUser
};