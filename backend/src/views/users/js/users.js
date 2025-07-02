/**
 * Script consolidado para funcionalidades administrativas e gerenciamento de usuários.
 * Inclui inicialização de componentes, modais de usuário, validação de formulário
 * e medidor de força de senha.
 */

document.addEventListener('DOMContentLoaded', function() {
  // 1. Inicializar tooltips do Bootstrap
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // 2. Inicializar datepickers (Se houver, manter a compatibilidade com jQuery Datepicker)
  // Supondo que você ainda usa jQuery Datepicker, mantemos a sintaxe
  if (typeof jQuery !== 'undefined' && jQuery.fn.datepicker) {
      if (document.querySelector('.datepicker')) {
          jQuery('.datepicker').datepicker({
              format: 'dd/mm/yyyy',
              language: 'pt-BR',
              autoclose: true
          });
      }
  }

  // 3. Formatar JSON para exibição (se houver elementos com .format-json)
  const formatJsonElements = document.querySelectorAll('.format-json');
  if (formatJsonElements.length > 0) {
      formatJsonElements.forEach(element => {
          try {
              const jsonData = JSON.parse(element.textContent);
              element.textContent = JSON.stringify(jsonData, null, 2);
          } catch (e) {
              console.warn('Erro ao formatar JSON em elemento:', element, e);
              // Opcional: exibe o texto original ou uma mensagem de erro no elemento
          }
      });
  }

  // 4. Configurar filtros de auditoria (se houver formulário com id 'filter-form')
  const filterForm = document.getElementById('filter-form');
  if (filterForm) {
      filterForm.addEventListener('submit', function(e) {
          // Remover campos vazios para não poluir a URL na submissão do formulário de filtro
          Array.from(this.elements).forEach(element => {
              if (element.value === '' && element.name) {
                  element.name = '';
              }
          });
      });
  }

  // 5. Botão de limpar filtros (se houver botão com id 'clear-filters')
  const clearFiltersBtn = document.getElementById('clear-filters');
  if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function() {
          window.location.href = '/admin/audit'; // Altere para a rota de listagem de auditoria, se for diferente
      });
  }

  // 6. Inicializar modais específicos de usuário
  initializeDeleteUserModal();
  initializeUserFormModal();
  initializePermissionsModal(); // Novo do segundo arquivo

  // 7. Inicializar medidor de força de senha
  initializePasswordStrengthMeter();

  // 8. Exibir e ocultar mensagens flash automaticamente
  const flashMessagesContainer = document.querySelector('.flash-messages');
  if (flashMessagesContainer) {
      setTimeout(() => { // Pequeno atraso para garantir que o DOM esteja totalmente renderizado
          const alerts = flashMessagesContainer.querySelectorAll('.alert');
          alerts.forEach(alertEl => {
              const bsAlert = new bootstrap.Alert(alertEl);
              setTimeout(() => {
                  bsAlert.close();
              }, 5000); // Alerta desaparece após 5 segundos
          });
      }, 500); // Espera 0.5 segundos antes de começar a fechar
  }
});


/**
* Funções de suporte para modais e validações de usuário
*/

/**
* Configura o modal de confirmação de exclusão de usuário.
* Popula o nome do usuário e atualiza a action do formulário.
*/
function initializeDeleteUserModal() {
  const deleteUserModal = document.getElementById('deleteUserModal');
  if (deleteUserModal) {
      deleteUserModal.addEventListener('show.bs.modal', function(event) {
          const button = event.relatedTarget; // Botão que acionou o modal
          const userId = button.getAttribute('data-user-id');
          const userName = button.getAttribute('data-user-name');

          const userNameSpan = deleteUserModal.querySelector('.user-to-delete');
          if (userNameSpan) userNameSpan.textContent = userName;

          const deleteForm = document.getElementById('deleteUserForm');
          if (deleteForm) deleteForm.action = `/admin/users/${userId}/delete`;
      });
  }
}

/**
* Configura o modal de formulário de usuário para criação e edição.
* Lida com o carregamento de dados para edição e submissão.
*/
function initializeUserFormModal() {
  const userFormModal = document.getElementById('userFormModal');
  if (userFormModal) {
      const userForm = document.getElementById('userModalForm');
      const saveButton = document.getElementById('saveUserBtn');

      if (saveButton && userForm) {
          saveButton.addEventListener('click', function() {
              if (validateUserForm(userForm)) {
                  userForm.submit();
              }
          });
      }

      userFormModal.addEventListener('show.bs.modal', function(event) {
          const button = event.relatedTarget;
          const modalTitle = userFormModal.querySelector('.modal-title');
          
          // Campos específicos do modal para fácil acesso
          const usernameInput = document.getElementById('username_modal');
          const fullNameInput = document.getElementById('fullName_modal');
          const emailInput = document.getElementById('email_modal');
          const phoneInput = document.getElementById('phone_modal');
          const isAdminCheckbox = document.getElementById('isAdmin_modal');
          const passwordInput = document.getElementById('password_modal');
          const passwordConfirmInput = document.getElementById('passwordConfirm_modal');
          const userIdInput = document.getElementById('userId_modal'); // Assumindo que existe um campo oculto para o ID

          // Resetar estados e validações ao abrir
          if (userForm) {
              userForm.reset();
              userForm.classList.remove('was-validated'); // Limpar classes de validação Bootstrap
          }
          if (passwordInput) passwordInput.required = true;
          if (passwordConfirmInput) passwordConfirmInput.required = true;
          if (usernameInput) usernameInput.readOnly = false;
          if (userIdInput) userIdInput.value = '';

          // Limpar o medidor de força de senha
          const strengthBar = document.getElementById('passwordStrengthBar_modal');
          const strengthText = document.getElementById('passwordStrengthText_modal');
          if (strengthBar) {
              strengthBar.style.width = '0%';
              strengthBar.style.backgroundColor = '#e9ecef'; // Cor padrão
          }
          if (strengthText) strengthText.textContent = '';
          if (strengthText) strengthText.style.color = '#6c757d';


          if (button && button.hasAttribute('data-user-id')) { // Modo edição
              const userId = button.getAttribute('data-user-id');
              if (modalTitle) modalTitle.textContent = 'Editar Usuário';
              if (userForm) userForm.action = `/admin/users/${userId}/update`;
              if (userIdInput) userIdInput.value = userId;

              // Senhas não são obrigatórias na edição, apenas se forem preenchidas
              if (passwordInput) passwordInput.required = false;
              if (passwordConfirmInput) passwordConfirmInput.required = false;

              // Carregar dados do usuário via AJAX
              fetch(`/admin/users/${userId}/data`)
                  .then(response => {
                      if (!response.ok) {
                          throw new Error(`HTTP error! status: ${response.status}`);
                      }
                      return response.json();
                  })
                  .then(data => {
                      if (data.user) {
                          if (usernameInput) {
                              usernameInput.value = data.user.username;
                              usernameInput.readOnly = true; // Usuário não pode mudar o username na edição
                          }
                          if (fullNameInput) fullNameInput.value = data.user.full_name || '';
                          if (emailInput) emailInput.value = data.user.email || '';
                          if (phoneInput) phoneInput.value = data.user.phone || '';
                          if (isAdminCheckbox) isAdminCheckbox.checked = data.user.is_admin;
                      }
                  })
                  .catch(error => {
                      console.error('Erro ao carregar dados do usuário para edição:', error);
                      alert('Erro ao carregar dados do usuário. Por favor, tente novamente.');
                      const bsModal = bootstrap.Modal.getInstance(userFormModal);
                      if (bsModal) bsModal.hide(); // Fecha o modal em caso de erro
                  });
          } else { // Modo criação
              if (modalTitle) modalTitle.textContent = 'Novo Usuário';
              if (userForm) userForm.action = '/admin/users/create';
          }
      });

      // Limpar o formulário e resetar validações quando o modal for completamente fechado
      userFormModal.addEventListener('hidden.bs.modal', function() {
          if (userForm) {
              userForm.reset();
              userForm.classList.remove('was-validated');
          }
          // Resetar o medidor de força de senha ao fechar
          const strengthBar = document.getElementById('passwordStrengthBar_modal');
          const strengthText = document.getElementById('passwordStrengthText_modal');
          if (strengthBar) {
              strengthBar.style.width = '0%';
              strengthBar.style.backgroundColor = '#e9ecef';
          }
          if (strengthText) strengthText.textContent = '';
          if (strengthText) strengthText.style.color = '#6c757d';
      });
  }
}

/**
* Valida o formulário de usuário antes da submissão.
* Inclui validação HTML5 e verificação de senhas.
* @param {HTMLFormElement} form - O elemento do formulário a ser validado.
* @returns {boolean} - True se o formulário é válido, false caso contrário.
*/
function validateUserForm(form) {
  // Adiciona a classe 'was-validated' para ativar os estilos de validação do Bootstrap
  form.classList.add('was-validated');

  // Validação nativa do navegador (HTML5)
  if (!form.checkValidity()) {
      // alert('Por favor, preencha todos os campos obrigatórios corretamente.'); // Opcional, Bootstrap já exibe feedback
      return false;
  }

  // Validação de confirmação de senha
  const passwordInput = form.querySelector('[name="password"]');
  const passwordConfirmInput = form.querySelector('[name="passwordConfirm"]');

  if (passwordInput && passwordConfirmInput) {
      const password = passwordInput.value;
      const passwordConfirm = passwordConfirmInput.value;

      // Se uma senha foi fornecida (é obrigatória na criação, opcional na edição)
      if (password || passwordConfirm) {
          if (password !== passwordConfirm) {
              alert('As senhas não coincidem. Por favor, verifique.');
              passwordConfirmInput.setCustomValidity('As senhas não coincidem.'); // Força feedback visual do Bootstrap
              passwordConfirmInput.reportValidity(); // Mostra o popover de erro
              return false;
          } else {
              passwordConfirmInput.setCustomValidity(''); // Limpa a validação customizada se as senhas coincidem
          }

          // Verificação de força mínima da senha (pode ser ajustado para usar a função calculatePasswordStrength)
          if (password.length > 0 && password.length < 6) {
              alert('A senha deve ter pelo menos 6 caracteres.');
              passwordInput.setCustomValidity('A senha deve ter pelo menos 6 caracteres.');
              passwordInput.reportValidity();
              return false;
          } else if (password.length > 0) {
              passwordInput.setCustomValidity('');
          }
      } else {
          // Se as senhas não são obrigatórias (ex: edição e não foram preenchidas), não as valide
          passwordInput.setCustomValidity('');
          passwordConfirmInput.setCustomValidity('');
      }
  }
  return true;
}


/**
* Inicializa e configura o medidor de força de senha para campos específicos.
*/
function initializePasswordStrengthMeter() {
  // Seleciona todos os campos de senha que precisam de medidor
  // Isso inclui 'password' (para formulários fora do modal) e 'password_modal' (para dentro do modal)
  const passwordInputs = document.querySelectorAll('[id^="password"]:not([id="passwordConfirm"]):not([id="passwordConfirm_modal"])');

  passwordInputs.forEach(input => {
      if (input) {
          // Determina os IDs da barra e do texto de força associados ao input atual
          const isModal = input.id.includes('_modal');
          const barId = isModal ? 'passwordStrengthBar_modal' : 'passwordStrengthBar';
          const textId = isModal ? 'passwordStrengthText_modal' : 'passwordStrengthText';

          const strengthBar = document.getElementById(barId);
          const strengthText = document.getElementById(textId);

          if (strengthBar && strengthText) {
              input.addEventListener('input', function() {
                  const password = this.value;
                  const strength = calculatePasswordStrength(password); // Usa a função mais robusta

                  // Atualizar a barra de força
                  strengthBar.style.width = strength.percent + '%';
                  strengthBar.style.backgroundColor = strength.color;

                  // Atualizar o texto
                  strengthText.textContent = strength.text;
                  strengthText.style.color = strength.color; // Define a cor do texto também
              });

              // Chamar no carregamento inicial para senhas já preenchidas (se houver, ex: teste)
              const initialPassword = input.value;
              if (initialPassword) {
                  const strength = calculatePasswordStrength(initialPassword);
                  strengthBar.style.width = strength.percent + '%';
                  strengthBar.style.backgroundColor = strength.color;
                  strengthText.textContent = strength.text;
                  strengthText.style.color = strength.color;
              } else {
                   // Resetar UI se o campo estiver vazio inicialmente
                  strengthBar.style.width = '0%';
                  strengthBar.style.backgroundColor = '#e9ecef';
                  strengthText.textContent = '';
                  strengthText.style.color = '#6c757d';
              }
          }
      }
  });
}

/**
* Calcula a força da senha com base em vários critérios.
* Retorna um objeto com score, percentagem, texto e cor para a UI.
* @param {string} password - A senha a ser avaliada.
* @returns {Object} - { score: number, percent: number, text: string, color: string }
*/
function calculatePasswordStrength(password) {
  if (!password) {
      return {
          score: 0,
          percent: 0,
          text: '',
          color: '#e9ecef' // Cor de fundo padrão/neutra
      };
  }

  let score = 0;

  // Critérios de comprimento
  if (password.length >= 6) score += 1;
  if (password.length >= 8) score += 1;
  if (password.length >= 10) score += 1;

  // Critérios de complexidade
  if (/[a-z]/.test(password)) score += 1; // Contém letras minúsculas
  if (/[A-Z]/.test(password)) score += 1; // Contém letras maiúsculas
  if (/[0-9]/.test(password)) score += 1; // Contém números
  if (/[^a-zA-Z0-9]/.test(password)) score += 1; // Contém caracteres especiais

  // Mapeia o score para porcentagem e texto/cor
  // Score máximo é 7 (3 comprimento + 4 complexidade)
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
      text = 'Muito Forte';
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
* Configura o modal de gerenciamento de permissões.
* Atualmente, apenas submete o formulário.
*/
function initializePermissionsModal() {
  const permissionsModal = document.getElementById('editPermissionsModal');
  if (permissionsModal) {
      const saveButton = document.getElementById('savePermissionsBtn');
      const permissionsForm = document.getElementById('permissionsForm');

      if (saveButton && permissionsForm) {
          saveButton.addEventListener('click', function() {
              // Aqui pode-se adicionar validações específicas para permissões antes de submeter
              permissionsForm.submit();
          });
      }
  }
}

// Opcional: Exportar funções específicas para uso global se necessário.
// Isso evita poluir o escopo global, mas permite acesso se outras partes do código precisarem.
window.appUtils = {
  validateUserForm,
  calculatePasswordStrength
};