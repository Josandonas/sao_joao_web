/**
 * public/assets/js/users/users.js
 * Ponto de entrada principal para o módulo de gerenciamento de usuários.
 * Este script deve ser carregado APÓS 'userFormValidation.js' e 'userModals.js'.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa a validação e o medidor de força da senha, se presentes na página
    // (Função definida em userFormValidation.js)
    initializePasswordStrengthMeter();

    // Inicializa o modal de detalhes do usuário
    initializeUserDetailsModal();

    // Adiciona listener para o formulário de criação/edição de usuário (se houver um no DOM)
    const userForm = document.getElementById('userForm'); // ID do seu formulário principal de criação/edição
    if (userForm) {
        userForm.addEventListener('submit', async function(e) {
            // Valida o formulário antes de enviar
            // (Função definida em userFormValidation.js)
            if (!validateUserForm(this)) {
                e.preventDefault(); // Impede o envio se a validação falhar
                // (Função definida em userModals.js)
                showToast('Por favor, corrija os erros no formulário.', 'danger');
                return;
            }

            // Apenas intercepta se o formulário tiver o atributo data-ajax-submit
            const isAjax = this.getAttribute('data-ajax-submit') === 'true';
            if (isAjax) {
                e.preventDefault(); // Impede o envio padrão do formulário

                const form = this;
                const formAction = form.action; // URL de destino do formulário
                let formMethod = form.getAttribute('method') || 'POST'; // Método padrão do formulário

                // Verifica se há um campo hidden '_method' para sobrescrever o método HTTP real
                const methodOverrideInput = form.querySelector('input[name="_method"]');
                if (methodOverrideInput) {
                    formMethod = methodOverrideInput.value.toUpperCase(); // Usa o valor do _method (e.g., 'PUT')
                }

                try {
                    const response = await fetch(formAction, {
                        method: formMethod, // Usa o método (POST para criação, POST com _method=PUT para atualização)
                        body: new FormData(form), // Envia os dados do formulário
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest' // Indica que é uma requisição AJAX
                        }
                    });

                    const data = await response.json(); // Tenta sempre ler o JSON de resposta

                    if (response.ok) { // Status 2xx (Sucesso)
                        // (Função definida em userModals.js)
                        showToast(data.message || 'Operação realizada com sucesso!', 'success');
                        // Redireciona após sucesso para a lista de usuários
                        window.location.href = '/admin/users';
                    } else { // Status de erro (4xx, 5xx)
                        // (Função definida em userModals.js)
                        showToast(data.message || 'Ocorreu um erro.', 'danger');
                        console.error('Erro na operação do usuário:', data.message || response.statusText);
                        // Se o backend retornar erros de campo específicos, pode exibi-los no formulário
                        if (data.errors) {
                            for (const fieldName in data.errors) {
                                // (Função definida em userFormValidation.js)
                                displayFieldError(form, fieldName, data.errors[fieldName]);
                            }
                        }
                    }
                } catch (error) {
                    // (Função definida em userModals.js)
                    showToast('Erro de rede ou servidor.', 'danger');
                    console.error('Erro na requisição:', error);
                }
            }
        });
    }
});