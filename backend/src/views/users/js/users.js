/**
 * Script para o módulo de gerenciamento de usuários
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes
  initializeDeleteUserModal();
  initializeUserFormModal();
  initializePasswordStrengthMeter();
  initializePermissionsModal();
  
  // Verificar se há mensagens flash e exibi-las
  const flashMessages = document.querySelector('.flash-messages');
  if (flashMessages) {
    setTimeout(() => {
      const alerts = flashMessages.querySelectorAll('.alert');
      alerts.forEach(alert => {
        const bsAlert = new bootstrap.Alert(alert);
        setTimeout(() => {
          bsAlert.close();
        }, 5000);
      });
    }, 2000);
  }
});

/**
 * Configura o modal de confirmação de exclusão de usuário
 */
function initializeDeleteUserModal() {
  const deleteUserModal = document.getElementById('deleteUserModal');
  if (deleteUserModal) {
    deleteUserModal.addEventListener('show.bs.modal', function(event) {
      // Botão que acionou o modal
      const button = event.relatedTarget;
      
      // Extrair informações do usuário
      const userId = button.getAttribute('data-user-id');
      const userName = button.getAttribute('data-user-name');
      
      // Atualizar o modal com as informações do usuário
      const userNameSpan = deleteUserModal.querySelector('.user-to-delete');
      userNameSpan.textContent = userName;
      
      // Atualizar o formulário de exclusão
      const deleteForm = document.getElementById('deleteUserForm');
      deleteForm.action = `/admin/users/${userId}/delete`;
    });
  }
}

/**
 * Configura o modal de formulário de usuário
 */
function initializeUserFormModal() {
  const userFormModal = document.getElementById('userFormModal');
  if (userFormModal) {
    // Configurar o botão de salvar para submeter o formulário
    const saveButton = document.getElementById('saveUserBtn');
    const userForm = document.getElementById('userModalForm');
    
    if (saveButton && userForm) {
      saveButton.addEventListener('click', function() {
        // Validar o formulário antes de submeter
        if (validateUserForm(userForm)) {
          userForm.submit();
        }
      });
    }
    
    // Configurar para carregar dados do usuário quando o modal for aberto para edição
    userFormModal.addEventListener('show.bs.modal', function(event) {
      const button = event.relatedTarget;
      
      // Verificar se é uma edição
      if (button && button.hasAttribute('data-user-id')) {
        const userId = button.getAttribute('data-user-id');
        const isEditing = true;
        
        // Atualizar o título do modal
        const modalTitle = userFormModal.querySelector('.modal-title');
        modalTitle.textContent = 'Editar Usuário';
        
        // Atualizar o formulário para edição
        userForm.action = `/admin/users/${userId}/update`;
        document.getElementById('userId_modal').value = userId;
        
        // Carregar dados do usuário via AJAX
        fetch(`/admin/users/${userId}/data`)
          .then(response => response.json())
          .then(data => {
            if (data.user) {
              // Preencher o formulário com os dados do usuário
              document.getElementById('username_modal').value = data.user.username;
              document.getElementById('username_modal').readOnly = true;
              document.getElementById('fullName_modal').value = data.user.full_name;
              document.getElementById('email_modal').value = data.user.email;
              document.getElementById('phone_modal').value = data.user.phone || '';
              document.getElementById('isAdmin_modal').checked = data.user.is_admin;
              
              // Limpar campos de senha (não exibimos a senha atual)
              document.getElementById('password_modal').value = '';
              document.getElementById('password_modal').required = false;
              document.getElementById('passwordConfirm_modal').value = '';
              document.getElementById('passwordConfirm_modal').required = false;
            }
          })
          .catch(error => {
            console.error('Erro ao carregar dados do usuário:', error);
            alert('Erro ao carregar dados do usuário. Por favor, tente novamente.');
          });
      } else {
        // É uma criação de novo usuário
        const modalTitle = userFormModal.querySelector('.modal-title');
        modalTitle.textContent = 'Novo Usuário';
        
        // Resetar o formulário
        userForm.reset();
        userForm.action = '/admin/users/create';
        document.getElementById('userId_modal').value = '';
        document.getElementById('username_modal').readOnly = false;
        document.getElementById('password_modal').required = true;
        document.getElementById('passwordConfirm_modal').required = true;
      }
    });
    
    // Limpar o formulário quando o modal for fechado
    userFormModal.addEventListener('hidden.bs.modal', function() {
      userForm.reset();
    });
  }
}

/**
 * Valida o formulário de usuário
 * @param {HTMLFormElement} form - Formulário a ser validado
 * @returns {boolean} - True se o formulário é válido, false caso contrário
 */
function validateUserForm(form) {
  // Verificar se o formulário é válido segundo as regras HTML5
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }
  
  // Validar a confirmação de senha
  const password = form.querySelector('[name="password"]').value;
  const passwordConfirm = form.querySelector('[name="passwordConfirm"]').value;
  
  // Se há senha (obrigatória para criação ou opcional para edição)
  if (password) {
    if (password !== passwordConfirm) {
      alert('As senhas não coincidem. Por favor, verifique.');
      return false;
    }
    
    // Verificar força da senha
    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
  }
  
  return true;
}

/**
 * Inicializa o medidor de força de senha
 */
function initializePasswordStrengthMeter() {
  const passwordInputs = document.querySelectorAll('[id^="password"][id$="_modal"], #password');
  
  passwordInputs.forEach(input => {
    if (input) {
      const isModal = input.id.includes('_modal');
      const barId = isModal ? 'passwordStrengthBar_modal' : 'passwordStrengthBar';
      const textId = isModal ? 'passwordStrengthText_modal' : 'passwordStrengthText';
      
      const strengthBar = document.getElementById(barId);
      const strengthText = document.getElementById(textId);
      
      if (strengthBar && strengthText) {
        input.addEventListener('input', function() {
          const password = this.value;
          const strength = calculatePasswordStrength(password);
          
          // Atualizar a barra de força
          strengthBar.style.width = strength.percent + '%';
          strengthBar.style.backgroundColor = strength.color;
          
          // Atualizar o texto
          strengthText.textContent = strength.text;
          strengthText.style.color = strength.color;
        });
      }
    }
  });
}

/**
 * Calcula a força da senha
 * @param {string} password - Senha a ser avaliada
 * @returns {Object} - Objeto com informações sobre a força da senha
 */
function calculatePasswordStrength(password) {
  // Senha vazia
  if (!password) {
    return {
      score: 0,
      percent: 0,
      text: '',
      color: '#e9ecef'
    };
  }
  
  let score = 0;
  
  // Comprimento básico
  if (password.length >= 6) score += 1;
  if (password.length >= 8) score += 1;
  if (password.length >= 10) score += 1;
  
  // Complexidade
  if (/[a-z]/.test(password)) score += 1; // Minúsculas
  if (/[A-Z]/.test(password)) score += 1; // Maiúsculas
  if (/[0-9]/.test(password)) score += 1; // Números
  if (/[^a-zA-Z0-9]/.test(password)) score += 1; // Caracteres especiais
  
  // Calcular porcentagem e texto
  const percent = Math.min(100, Math.round((score / 7) * 100));
  
  let text, color;
  
  if (score <= 2) {
    text = 'Fraca';
    color = '#dc3545'; // Vermelho
  } else if (score <= 4) {
    text = 'Média';
    color = '#ffc107'; // Amarelo
  } else if (score <= 6) {
    text = 'Forte';
    color = '#28a745'; // Verde
  } else {
    text = 'Muito forte';
    color = '#198754'; // Verde escuro
  }
  
  return {
    score,
    percent,
    text,
    color
  };
}

/**
 * Configura o modal de gerenciamento de permissões
 */
function initializePermissionsModal() {
  const permissionsModal = document.getElementById('editPermissionsModal');
  if (permissionsModal) {
    const saveButton = document.getElementById('savePermissionsBtn');
    const permissionsForm = document.getElementById('permissionsForm');
    
    if (saveButton && permissionsForm) {
      saveButton.addEventListener('click', function() {
        permissionsForm.submit();
      });
    }
  }
}

// Exportar funções para uso global
window.userModule = {
  validateUserForm,
  calculatePasswordStrength
};
