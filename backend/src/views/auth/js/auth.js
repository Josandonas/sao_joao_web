/**
 * Script consolidado para a página de autenticação.
 * Inclui animações de fundo e funcionalidades de validação de formulário de login.
 */

document.addEventListener('DOMContentLoaded', function() {

  // --- Seção de Animações de Fundo (estrelas, nuvens, meteoros) ---

  // Criar estrelas na área de ilustração
  const starsContainer = document.querySelector('.stars');
  if (starsContainer) {
      for (let i = 0; i < 50; i++) {
          const star = document.createElement('div');
          star.classList.add('star');
          star.style.width = Math.random() * 3 + 'px';
          star.style.height = star.style.width;
          star.style.left = Math.random() * 100 + '%';
          star.style.top = Math.random() * 100 + '%';
          star.style.animationDelay = Math.random() * 10 + 's';
          star.style.animationDuration = Math.random() * 20 + 10 + 's';
          starsContainer.appendChild(star);
      }
  }

  // Criar nuvens na área de ilustração
  const cloudsContainer = document.querySelector('.clouds');
  if (cloudsContainer) {
      for (let i = 0; i < 3; i++) {
          const cloud = document.createElement('div');
          cloud.classList.add('cloud');
          cloud.style.left = (i * 30) + '%';
          cloud.style.animationDelay = i * 2 + 's';
          cloudsContainer.appendChild(cloud);
      }
  }

  // Criar meteoros ocasionais
  const illustration = document.querySelector('.auth-illustration');
  if (illustration) {
      // Gera um meteoro a cada 3 segundos, mas apenas se a ilustração existir
      setInterval(() => {
          const meteor = document.createElement('div');
          meteor.classList.add('meteor');
          meteor.style.top = Math.random() * 40 + '%';
          meteor.style.left = Math.random() * 100 + '%';
          illustration.appendChild(meteor);

          // Remove o meteoro após 1 segundo para evitar acúmulo no DOM
          setTimeout(() => {
              meteor.remove();
          }, 1000);
      }, 3000);
  }

  // --- Seção de Validação de Formulário de Login e Feedback do Botão ---

  const forms = document.querySelectorAll('.needs-validation');
  const loginButton = document.querySelector('button[type="submit"]');
  // Captura o texto original do botão uma única vez
  const originalButtonText = loginButton ? loginButton.innerHTML : 'Entrar';

  Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
          // Se o formulário não for válido, previne o envio e restaura o botão
          if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
              if (loginButton) {
                  loginButton.innerHTML = originalButtonText; // Restaura o texto
                  loginButton.disabled = false; // Habilita o botão
              }
          } else {
              // Se o formulário é válido, mostra o spinner e desabilita o botão
              if (loginButton) {
                  loginButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Entrando...';
                  loginButton.disabled = true;

                  // Pequeno atraso para permitir que a UI seja atualizada antes da submissão
                  // e previne múltiplas submissões acidentais
                  setTimeout(() => {
                      // Verifica se o formulário ainda não foi submetido (evita duplo envio)
                      if (!form.submitted) {
                          form.submitted = true; // Marca o formulário como submetido
                          form.submit();
                      }
                  }, 100); // Reduzido para 100ms, 500ms pode ser muito longo
              }
          }
          // Adiciona a classe 'was-validated' para exibir feedback de validação do Bootstrap
          form.classList.add('was-validated');
      }, false); // O 'false' aqui é para useCapture, que não é necessário mudar
  });

  // Restaura o botão de login para o estado original se houver uma mensagem de erro na página
  // Isso é útil após um redirecionamento com flash message de erro
  if (document.querySelector('.alert-danger') && loginButton) {
      loginButton.innerHTML = originalButtonText;
      loginButton.disabled = false;
  }

  // Adiciona efeito de clique/carregamento ao botão de login APENAS se o formulário for válido no clique
  // O event listener de 'submit' já lida com a validação e o spinner,
  // então este listener de 'click' pode ser um pouco redundante ou causar conflito.
  // É mais robusto confiar no listener de 'submit' para a lógica de carregamento.
  // Manterei a lógica aqui, mas com uma nota sobre a possível redundância.
  if (loginButton) {
      loginButton.addEventListener('click', function() {
          // Verifica a validade do formulário no momento do clique.
          // Se o formulário for inválido, o submit listener já cuidará disso.
          // Se for válido, este listener de clique também pode ativar o spinner.
          // A prioridade deve ser sempre o evento 'submit' para a lógica de envio.
          const form = document.querySelector('form.needs-validation'); // Pega o formulário principal
          if (form && form.checkValidity()) {
               // Este bloco será executado se o clique levar a um submit válido
               // O bloco de submit já tem essa lógica, então este pode ser opcional.
               // Mas se o usuário clicar sem 'submit' direto (e.g., via JS trigger), pode ser útil.
              this.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Entrando...';
              this.disabled = true;
          }
      });
  }
});