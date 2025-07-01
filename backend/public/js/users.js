/**
 * JavaScript para o módulo de gerenciamento de usuários
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar os tooltips do Bootstrap
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltips.forEach(tooltip => {
    new bootstrap.Tooltip(tooltip);
  });

  // Modal de exclusão de usuário
  setupDeleteUserModal();
  
  // Modal de formulário de usuário
  setupUserFormModal();
  
  // Validação de formulário
  setupFormValidation();
  
  // Medidor de força de senha
  setupPasswordStrengthMeter();
});

/**
 * Configurar o modal de exclusão de usuário
 */
function setupDeleteUserModal() {
  const deleteUserModal = document.getElementById('deleteUserModal');
  
  if (deleteUserModal) {
    deleteUserModal.addEventListener('show.bs.modal', function(event) {
      const button = event.relatedTarget;
      const userId = button.getAttribute('data-user-id');
      const userName = button.getAttribute('data-user-name');
      
      const userIdInput = document.getElementById('deleteUserId');
      const userNameSpan = document.getElementById('deleteUserName');
      
      if (userIdInput) userIdInput.value = userId;
      if (userNameSpan) userNameSpan.textContent = userName;
    });
  }
}

/**
 * Configurar o modal de formulário de usuário
 */
function setupUserFormModal() {
  const userFormModal = document.getElementById('userFormModal');
  
  if (userFormModal) {
    // Limpar formulário ao fechar o modal
    userFormModal.addEventListener('hidden.bs.modal', function() {
      const form = document.getElementById('userModalForm');
      if (form) form.reset();
      
      // Resetar o medidor de força de senha
      const strengthBar = document.getElementById('passwordStrengthBar_modal');
      const strengthText = document.getElementById('passwordStrengthText_modal');
      
      if (strengthBar) strengthBar.style.width = '0%';
      if (strengthBar) strengthBar.style.backgroundColor = '#f5f5f5';
      if (strengthText) strengthText.textContent = '';
    });
    
    // Configurar botão de salvar
    const saveButton = document.getElementById('saveUserBtn');
    if (saveButton) {
      saveButton.addEventListener('click', function() {
        const form = document.getElementById('userModalForm');
        if (form && validateForm(form)) {
          form.submit();
        }
      });
    }
  }
}

/**
 * Configurar validação de formulário
 */
function setupFormValidation() {
  const forms = document.querySelectorAll('.user-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      if (!validateForm(form)) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  });
}

/**
 * Validar formulário de usuário
 */
function validateForm(form) {
  let isValid = true;
  
  // Verificar se é um formulário de modal
  const isModal = form.id === 'userModalForm';
  const suffix = isModal ? '_modal' : '';
  
  // Validar confirmação de senha
  const passwordField = document.getElementById(`password${suffix}`);
  const confirmField = document.getElementById(`passwordConfirm${suffix}`);
  
  if (passwordField && confirmField && passwordField.value) {
    if (passwordField.value !== confirmField.value) {
      alert('As senhas não coincidem!');
      confirmField.focus();
      isValid = false;
    }
  }
  
  return isValid;
}

/**
 * Configurar medidor de força de senha
 */
function setupPasswordStrengthMeter() {
  const passwordFields = [
    document.getElementById('password'),
    document.getElementById('password_modal')
  ];
  
  passwordFields.forEach(field => {
    if (field) {
      field.addEventListener('input', function() {
        const isModal = field.id === 'password_modal';
        const suffix = isModal ? '_modal' : '';
        
        const strengthBar = document.getElementById(`passwordStrengthBar${suffix}`);
        const strengthText = document.getElementById(`passwordStrengthText${suffix}`);
        
        if (strengthBar && strengthText) {
          const strength = calculatePasswordStrength(field.value);
          updatePasswordStrengthUI(strength, strengthBar, strengthText);
        }
      });
    }
  });
}

/**
 * Calcular força da senha
 */
function calculatePasswordStrength(password) {
  if (!password) return 0;
  
  let strength = 0;
  
  // Comprimento
  if (password.length >= 8) strength += 25;
  
  // Letras minúsculas
  if (password.match(/[a-z]/)) strength += 25;
  
  // Letras maiúsculas
  if (password.match(/[A-Z]/)) strength += 25;
  
  // Números e caracteres especiais
  if (password.match(/[0-9]/) || password.match(/[^a-zA-Z0-9]/)) strength += 25;
  
  return strength;
}

/**
 * Atualizar UI do medidor de força de senha
 */
function updatePasswordStrengthUI(strength, strengthBar, strengthText) {
  // Atualizar barra de progresso
  strengthBar.style.width = `${strength}%`;
  
  // Definir cor e texto com base na força
  if (strength === 0) {
    strengthBar.style.backgroundColor = '#f5f5f5';
    strengthText.textContent = '';
  } else if (strength <= 25) {
    strengthBar.style.backgroundColor = '#dc3545'; // Vermelho
    strengthText.textContent = 'Fraca';
    strengthText.style.color = '#dc3545';
  } else if (strength <= 50) {
    strengthBar.style.backgroundColor = '#ffc107'; // Amarelo
    strengthText.textContent = 'Média';
    strengthText.style.color = '#ffc107';
  } else if (strength <= 75) {
    strengthBar.style.backgroundColor = '#0dcaf0'; // Azul claro
    strengthText.textContent = 'Boa';
    strengthText.style.color = '#0dcaf0';
  } else {
    strengthBar.style.backgroundColor = '#198754'; // Verde
    strengthText.textContent = 'Forte';
    strengthText.style.color = '#198754';
  }
}
