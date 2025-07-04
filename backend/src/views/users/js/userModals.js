/**
 * public/assets/js/users/userModals.js
 * Funções que lidam com a inicialização e lógica dos modais de detalhes, ativação, desativação e exclusão de usuário.
 */

/**
 * Helper para exibir mensagens Toast.
 * Garante que a mensagem seja exibida consistentemente.
 */
function showToast(message, type = 'success', duration = 3000) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        console.warn('toastContainer element not found. Toast messages will not be displayed visually.');
        console.log(`Toast (${type}): ${message}`);
        // Fallback para alert se não houver container de toast
        // alert(message); 
        return;
    }

    const toastEl = document.createElement('div');
    toastEl.classList.add('toast', `bg-${type}`, 'text-white', 'border-0', 'fade');
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.setAttribute('data-bs-delay', duration.toString()); // Define a duração do toast

    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    toastContainer.appendChild(toastEl);
    const bsToast = new bootstrap.Toast(toastEl);
    bsToast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

/**
 * Inicializa o modal de detalhes do usuário.
 * Escuta o evento 'show.bs.modal' para carregar os dados via AJAX.
 */
function initializeUserDetailsModal() {
    const userDetailsModal = document.getElementById('userDetailModal'); // Certifique-se que o ID do seu modal é este
    if (userDetailsModal) {
        console.log('DEBUG: Modal de detalhes do usuário (#userDetailModal) encontrado no DOM.');

        userDetailsModal.addEventListener('show.bs.modal', async function(event) {
            const button = event.relatedTarget; // Botão que acionou o modal
            const userId = button.getAttribute('data-user-id');
            const userName = button.getAttribute('data-user-name');

            // Limpa o conteúdo anterior do modal enquanto carrega
            const modalBody = userDetailsModal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Carregando...</span></div><p class="mt-2">Carregando dados do usuário...</p></div>';
            }
            userDetailsModal.querySelector('.modal-title').textContent = `Detalhes de ${userName}`;

            try {
                // Rota para buscar dados do usuário em JSON
                const response = await fetch(`/admin/users/${userId}/data`, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest' // Indica que é uma requisição AJAX
                    }
                });
                const result = await response.json();

                if (response.ok && result.status === 'success') {
                    populateUserDetailsModal(result.user, result.permissions);
                } else {
                    showToast(result.message || 'Erro ao carregar detalhes do usuário.', 'danger');
                    modalBody.innerHTML = `<div class="alert alert-danger" role="alert">Não foi possível carregar os detalhes do usuário: ${result.message || 'Erro desconhecido'}.</div>`;
                    console.error('Erro ao buscar dados do usuário:', result.message || response.statusText);
                }
            } catch (error) {
                showToast('Erro de rede ao carregar detalhes do usuário.', 'danger');
                modalBody.innerHTML = `<div class="alert alert-danger" role="alert">Erro de conexão ao carregar detalhes. Por favor, tente novamente.</div>`;
                console.error('Erro na requisição AJAX para detalhes do usuário:', error);
            }
        });

        // Adiciona um listener para quando o modal for ocultado, para limpar o conteúdo
        userDetailsModal.addEventListener('hidden.bs.modal', function() {
            const modalBody = userDetailsModal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.innerHTML = ''; // Limpa o conteúdo
            }
            userDetailsModal.querySelector('.modal-title').textContent = 'Detalhes do Usuário';
        });
    }
}

/**
 * Popula o modal de detalhes do usuário com os dados recebidos.
 * @param {object} user - Objeto com os dados do usuário.
 * @param {object} permissionsMap - Objeto com as permissões do usuário por módulo.
 */
function populateUserDetailsModal(user, permissionsMap) {
    const modalBody = document.getElementById('userDetailsModal').querySelector('.modal-body');
    if (!modalBody) return;

    // Formatar data
    const createdAt = user.created_at ? new Date(user.created_at).toLocaleString() : 'N/A';
    const updatedAt = user.updated_at ? new Date(user.updated_at).toLocaleString() : 'N/A';
    const deletedAt = user.deleted_at ? new Date(user.deleted_at).toLocaleString() : 'N/A';

    let userStatusBadge = '';
    if (user.deleted_at) {
        userStatusBadge = '<span class="badge bg-secondary">Excluído (Logicamente)</span>';
    } else if (user.is_active) {
        userStatusBadge = '<span class="badge bg-success">Ativo</span>';
    } else {
        userStatusBadge = '<span class="badge bg-warning text-dark">Inativo</span>';
    }

    let isAdminBadge = user.is_admin ? '<span class="badge bg-primary">Administrador</span>' : '<span class="badge bg-info text-dark">Usuário Comum</span>';

    let permissionsHtml = '<h5 class="mt-4">Permissões de Módulo:</h5>';
    if (Object.keys(permissionsMap).length > 0) {
        permissionsHtml += '<ul class="list-group list-group-flush">';
        for (const moduleId in permissionsMap) {
            const perms = permissionsMap[moduleId];
            const moduleName = perms.module_name || `Módulo ${moduleId}`; // Fallback se o nome não vier
            permissionsHtml += `
                <li class="list-group-item">
                    <strong>${moduleName}</strong>:
                    ${perms.can_view ? '<span class="badge bg-success me-1">Ver</span>' : ''}
                    ${perms.can_create ? '<span class="badge bg-primary me-1">Criar</span>' : ''}
                    ${perms.can_edit ? '<span class="badge bg-info me-1">Editar</span>' : ''}
                    ${perms.can_delete ? '<span class="badge bg-danger me-1">Excluir</span>' : ''}
                    ${!perms.can_view && !perms.can_create && !perms.can_edit && !perms.can_delete ? '<span class="badge bg-secondary">Nenhuma</span>' : ''}
                </li>
            `;
        }
        permissionsHtml += '</ul>';
    } else {
        permissionsHtml += '<p class="text-muted">Nenhuma permissão de módulo definida.</p>';
    }

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <p><strong>Nome de Usuário:</strong> ${user.username}</p>
                <p><strong>Nome Completo:</strong> ${user.full_name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Telefone:</strong> ${user.phone || 'N/A'}</p>
            </div>
            <div class="col-md-6">
                <p><strong>Tipo:</strong> ${isAdminBadge}</p>
                <p><strong>Status:</strong> ${userStatusBadge}</p>
                <p><strong>Criado em:</strong> ${createdAt}</p>
                <p><strong>Última Atualização:</strong> ${updatedAt}</p>
                ${user.deleted_at ? `<p><strong>Excluído em:</strong> ${deletedAt}</p>` : ''}
            </div>
        </div>
        ${permissionsHtml}
    `;
}


/**
 * Configura o modal de ativação de usuário.
 * Popula o nome do usuário e atualiza a action do formulário.
 */
function initializeActivateUserModal() {
    const activateUserModal = document.getElementById('activateUserModal');
    if (activateUserModal) {
        activateUserModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const userId = button.getAttribute('data-user-id');
            const userName = button.getAttribute('data-user-name');

            const userNameSpan = activateUserModal.querySelector('#activateUserName');
            if (userNameSpan) userNameSpan.textContent = userName;

            const form = activateUserModal.querySelector('form');
            if (form) {
                form.action = `/admin/users/${userId}/activate`;
                const userIdInput = form.querySelector('#activateUserId');
                if (userIdInput) userIdInput.value = userId;

                form.onsubmit = async function(e) {
                    e.preventDefault();

                    try {
                        const response = await fetch(form.action, {
                            method: 'POST',
                            body: new FormData(form),
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest'
                            }
                        });

                        const data = await response.json();

                        if (response.ok) {
                            showToast(data.message || 'Usuário ativado com sucesso!', 'success');
                            const modal = bootstrap.Modal.getInstance(activateUserModal);
                            modal.hide();
                            window.location.reload();
                        } else {
                            showToast(data.message || 'Erro ao ativar usuário.', 'danger');
                            console.error('Erro ao ativar usuário:', data.message || response.statusText);
                        }
                    } catch (error) {
                        showToast('Erro de rede ou servidor.', 'danger');
                        console.error('Erro na requisição:', error);
                    }
                };
            }
        });
    }
}


/**
 * Configura o modal de desativação de usuário.
 * Popula o nome do usuário e atualiza a action do formulário.
 */
function initializeDeactivateUserModal() {
    const deactivateUserModal = document.getElementById('deactivateUserModal');
    if (deactivateUserModal) {
        deactivateUserModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const userId = button.getAttribute('data-user-id');
            const userName = button.getAttribute('data-user-name');

            const userNameSpan = deactivateUserModal.querySelector('#deactivateUserName');
            if (userNameSpan) userNameSpan.textContent = userName;

            const form = deactivateUserModal.querySelector('form');
            if (form) {
                form.action = `/admin/users/${userId}/deactivate`;
                const userIdInput = form.querySelector('#deactivateUserId');
                if (userIdInput) userIdInput.value = userId;

                form.onsubmit = async function(e) {
                    e.preventDefault();

                    try {
                        const response = await fetch(form.action, {
                            method: 'POST',
                            body: new FormData(form),
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest'
                            }
                        });

                        const data = await response.json();

                        if (response.ok) {
                            showToast(data.message || 'Usuário desativado com sucesso!', 'success');
                            const modal = bootstrap.Modal.getInstance(deactivateUserModal);
                            modal.hide();
                            window.location.reload();
                        } else {
                            showToast(data.message || 'Erro ao desativar usuário.', 'danger');
                            console.error('Erro ao desativar usuário:', data.message || response.statusText);
                        }
                    } catch (error) {
                        showToast('Erro de rede ou servidor.', 'danger');
                        console.error('Erro na requisição:', error);
                    }
                };
            }
        });
    }
}

/**
 * Configura o modal de exclusão de usuário.
 * Popula o nome do usuário e atualiza a action do formulário.
 */
function initializeDeleteUserModal() {
    const deleteUserModal = document.getElementById('deleteUserModal');
    if (deleteUserModal) {
        deleteUserModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const userId = button.getAttribute('data-user-id');
            const userName = button.getAttribute('data-user-name');

            const userNameSpan = deleteUserModal.querySelector('#deleteUserName');
            if (userNameSpan) userNameSpan.textContent = userName;

            const form = deleteUserModal.querySelector('form');
            if (form) {
                form.action = `/admin/users/${userId}/delete`; // Corrigido para a rota POST /:id/delete
                const userIdInput = form.querySelector('#deleteUserId');
                if (userIdInput) userIdInput.value = userId;

                form.onsubmit = async function(e) {
                    e.preventDefault();

                    try {
                        const response = await fetch(form.action, {
                            method: 'POST', // Corrigido para POST
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest'
                            },
                            body: new FormData(form) // Envia o formulário
                        });

                        const data = await response.json();

                        if (response.ok) {
                            showToast(data.message || 'Usuário excluído com sucesso.', 'success');
                            const modal = bootstrap.Modal.getInstance(deleteUserModal);
                            modal.hide();
                            window.location.reload();
                        } else {
                            showToast(data.message || 'Erro ao excluir usuário.', 'danger');
                            console.error('Erro ao excluir usuário:', data.message || response.statusText);
                        }
                    } catch (error) {
                        showToast('Erro de rede ou servidor.', 'danger');
                        console.error('Erro na requisição:', error);
                    }
                };
            }
        });
    }
}