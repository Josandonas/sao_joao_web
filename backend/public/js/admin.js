/**
 * JavaScript para o painel administrativo
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar tooltips do Bootstrap
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Inicializar popovers do Bootstrap
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function(popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Fechar alertas automaticamente após 5 segundos
  setTimeout(function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    });
  }, 5000);

  // Confirmar exclusão
  const deleteButtons = document.querySelectorAll('.btn-delete');
  deleteButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      if (!confirm('Tem certeza que deseja excluir este item?')) {
        e.preventDefault();
      }
    });
  });

  // Confirmar publicação/despublicação
  const publishButtons = document.querySelectorAll('.btn-publish, .btn-unpublish');
  publishButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      const action = button.classList.contains('btn-publish') ? 'publicar' : 'despublicar';
      if (!confirm(`Tem certeza que deseja ${action} este item?`)) {
        e.preventDefault();
      }
    });
  });

  // Mostrar nome do arquivo selecionado em inputs de arquivo
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach(function(input) {
    input.addEventListener('change', function(e) {
      const fileName = e.target.files[0]?.name || 'Nenhum arquivo selecionado';
      const label = input.nextElementSibling;
      if (label && label.classList.contains('form-file-label')) {
        label.textContent = fileName;
      }
    });
  });

  // Adicionar nova categoria
  const newCategoryCheckbox = document.getElementById('newCategoryCheckbox');
  const newCategoryField = document.getElementById('newCategoryField');
  const categorySelect = document.getElementById('category');
  
  if (newCategoryCheckbox && newCategoryField && categorySelect) {
    newCategoryCheckbox.addEventListener('change', function() {
      if (this.checked) {
        newCategoryField.style.display = 'block';
        categorySelect.disabled = true;
      } else {
        newCategoryField.style.display = 'none';
        categorySelect.disabled = false;
      }
    });
  }

  // Inicializar o sidebar toggle para dispositivos móveis
  const sidebarToggle = document.querySelector('[data-bs-toggle="collapse"][data-bs-target="#sidebarMenu"]');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      document.body.classList.toggle('sidebar-open');
    });
  }
});
