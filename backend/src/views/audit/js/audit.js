/**
 * JavaScript para o módulo de auditoria
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Inicializar datepickers
  if (document.querySelector('.datepicker')) {
    $('.datepicker').datepicker({
      format: 'dd/mm/yyyy',
      language: 'pt-BR',
      autoclose: true
    });
  }

  // Formatar JSON para exibição
  const formatJsonElements = document.querySelectorAll('.format-json');
  if (formatJsonElements.length > 0) {
    formatJsonElements.forEach(element => {
      try {
        const jsonData = JSON.parse(element.textContent);
        element.textContent = JSON.stringify(jsonData, null, 2);
      } catch (e) {
        console.error('Erro ao formatar JSON:', e);
      }
    });
  }

  // Filtros de auditoria
  const filterForm = document.getElementById('filter-form');
  if (filterForm) {
    filterForm.addEventListener('submit', function(e) {
      // Remover campos vazios para não poluir a URL
      const formElements = Array.from(this.elements);
      formElements.forEach(element => {
        if (element.value === '' && element.name) {
          element.name = '';
        }
      });
    });
  }

  // Botão de limpar filtros
  const clearFiltersBtn = document.getElementById('clear-filters');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', function() {
      window.location.href = '/admin/audit';
    });
  }
});
