/**
 * public/assets/js/users/userFormValidation.js
 * Funções relacionadas à validação de formulários de usuário e funcionalidades específicas do formulário.
 */

/**
 * Valida o formulário de usuário antes do envio.
 * @param {HTMLFormElement} form - O elemento do formulário.
 * @returns {boolean} - True se o formulário for válido, false caso contrário.
 */
function validateUserForm(form) {
    let isValid = true;
    const username = form.querySelector('#username')?.value;
    const fullName = form.querySelector('#fullName')?.value;
    const email = form.querySelector('#email')?.value;
    const password = form.querySelector('#password')?.value;
    const passwordConfirm = form.querySelector('#passwordConfirm')?.value;
    const isEditing = form.getAttribute('data-is-editing') === 'true';

    // Limpar mensagens de erro anteriores
    form.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
    form.querySelectorAll('.form-control.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    if (!username && !isEditing) { // Username é obrigatório apenas na criação
        displayFieldError(form, 'username', 'O nome de usuário é obrigatório.');
        isValid = false;
    }

    if (!fullName) {
        displayFieldError(form, 'fullName', 'O nome completo é obrigatório.');
        isValid = false;
    }

    if (!email) {
        displayFieldError(form, 'email', 'O email é obrigatório.');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        displayFieldError(form, 'email', 'Por favor, insira um email válido.');
        isValid = false;
    }

    if (!isEditing || (isEditing && password)) { // Senha é obrigatória na criação ou se alterada na edição
        if (password.length < 6) {
            displayFieldError(form, 'password', 'A senha deve ter pelo menos 6 caracteres.');
            isValid = false;
        }
        if (password !== passwordConfirm) {
            displayFieldError(form, 'passwordConfirm', 'As senhas não coincidem.');
            isValid = false;
        }
    }

    // Validação de permissões: garantir que pelo menos uma permissão esteja marcada se houver módulos.
    const permissionCheckboxes = form.querySelectorAll('input[name^="module_permission_"][type="checkbox"]');
    let atLeastOnePermissionSelected = false;
    if (permissionCheckboxes.length > 0) {
        for (const checkbox of permissionCheckboxes) {
            if (checkbox.checked) {
                atLeastOnePermissionSelected = true;
                break;
            }
        }
        if (!atLeastOnePermissionSelected) {
            // Isso pode ser uma validação mais branda, ou um aviso
            // console.warn('Nenhuma permissão de módulo selecionada. O usuário pode não ter acesso a nenhuma funcionalidade.');
        }
    }

    return isValid;
}

/**
 * Exibe uma mensagem de erro para um campo específico.
 * @param {HTMLFormElement} form - O elemento do formulário.
 * @param {string} fieldName - O nome do campo com erro.
 * @param {string} message - A mensagem de erro a ser exibida.
 */
function displayFieldError(form, fieldName, message) {
    const field = form.querySelector(`#${fieldName}`);
    if (field) {
        field.classList.add('is-invalid');
        const feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = message;
        } else {
            let newFeedback = document.createElement('div');
            newFeedback.classList.add('invalid-feedback');
            newFeedback.textContent = message;
            if (feedback && !feedback.classList.contains('invalid-feedback')) {
                feedback.remove();
            }
            field.parentNode.insertBefore(newFeedback, field.nextSibling);
        }
    }
}

/**
 * Calcula a força da senha.
 * @param {string} password - A senha a ser avaliada.
 * @returns {number} - Um valor de 0 a 100 representando a força.
 */
function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length > 5) strength += 10;
    if (password.length > 8) strength += 20;
    if (password.length > 12) strength += 20;
    if (/[A-Z]/.test(password)) strength += 10;
    if (/[a-z]/.test(password)) strength += 10;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return Math.min(strength, 100);
}

/**
 * Inicializa o medidor de força da senha.
 */
function initializePasswordStrengthMeter() {
    const passwordInput = document.getElementById('password');
    const passwordStrengthMeter = document.getElementById('passwordStrength');
    const passwordStrengthText = document.getElementById('passwordStrengthText');

    if (passwordInput && passwordStrengthMeter && passwordStrengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);

            passwordStrengthMeter.style.width = `${strength}%`;
            passwordStrengthMeter.setAttribute('aria-valuenow', strength);

            passwordStrengthMeter.classList.remove('bg-danger', 'bg-warning', 'bg-success');
            if (password.length === 0) {
                passwordStrengthMeter.style.width = '0%';
                passwordStrengthText.textContent = '';
            } else if (strength < 40) {
                passwordStrengthMeter.classList.add('bg-danger');
                passwordStrengthText.textContent = 'Fraca';
                passwordStrengthText.style.color = 'red';
            } else if (strength < 70) {
                passwordStrengthMeter.classList.add('bg-warning');
                passwordStrengthText.textContent = 'Média';
                passwordStrengthText.style.color = 'orange';
            } else {
                passwordStrengthMeter.classList.add('bg-success');
                passwordStrengthText.textContent = 'Forte';
                passwordStrengthText.style.color = 'green';
            }
        });
    }
}