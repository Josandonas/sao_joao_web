/**
 * JavaScript para o módulo de auditoria do sistema
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar os tooltips do Bootstrap
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltips.forEach(tooltip => {
    new bootstrap.Tooltip(tooltip);
  });

  // Configurar os seletores de data
  setupDatePickers();
  
  // Configurar o formulário de filtro
  setupFilterForm();
  
  // Formatar detalhes JSON quando existirem
  formatJsonDetails();
});

/**
 * Configurar os seletores de data
 */
function setupDatePickers() {
  const dateInputs = document.querySelectorAll('.date-input');
  dateInputs.forEach(input => {
    if (input) {
      // Se estiver usando input type="date" nativo, não precisa de inicialização
    }
  });
}

/**
 * Configurar o formulário de filtro
 */
function setupFilterForm() {
  const filterForm = document.getElementById('auditFilterForm');
  if (filterForm) {
    // Limpar filtros
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Limpar todos os campos do formulário
        const inputs = filterForm.querySelectorAll('input, select');
        inputs.forEach(input => {
          input.value = '';
        });
        
        // Enviar o formulário para recarregar sem filtros
        filterForm.submit();
      });
    }
  }
}

/**
 * Formatar detalhes JSON quando existirem
 */
function formatJsonDetails() {
  const jsonContainers = document.querySelectorAll('.json-details');
  
  jsonContainers.forEach(container => {
    try {
      const jsonContent = container.textContent;
      if (jsonContent && jsonContent.trim()) {
        const formattedJson = JSON.stringify(JSON.parse(jsonContent), null, 2);
        container.textContent = formattedJson;
      }
    } catch (e) {
      console.error('Erro ao formatar JSON:', e);
      // Manter o conteúdo original se não for um JSON válido
    }
  });
}
