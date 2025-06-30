/**
 * Script específico para autenticação
 */

document.addEventListener('DOMContentLoaded', function() {
  // Validação do formulário de login
  const forms = document.querySelectorAll('.needs-validation');
  const loginButton = document.querySelector('button[type="submit"]');
  const originalButtonText = loginButton ? loginButton.innerHTML : 'Entrar';
  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // Verificar validade do formulário
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        // Restaurar texto original do botão se a validação falhar
        if (loginButton) {
          loginButton.innerHTML = originalButtonText;
          loginButton.disabled = false;
        }
      } else {
        // Se o formulário for válido, mostrar animação de carregamento
        if (loginButton) {
          loginButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Entrando...';
          loginButton.disabled = true;
          
          // Garantir que o formulário seja enviado mesmo que haja um atraso
          setTimeout(() => {
            if (form.classList.contains('was-validated') && !form.submitted) {
              form.submitted = true;
              form.submit();
            }
          }, 500);
        }
      }
      
      form.classList.add('was-validated');
    }, false);
  });
  
  // Restaurar botão se houver erro na página (mensagens flash)
  if (document.querySelector('.alert-danger') && loginButton) {
    loginButton.innerHTML = originalButtonText;
    loginButton.disabled = false;
  }
  
  // Adicionar efeito de clique ao botão de login
  if (loginButton) {
    loginButton.addEventListener('click', function() {
      if (document.querySelector('form').checkValidity()) {
        this.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Entrando...';
        this.disabled = true;
      }
    });
  }
});
