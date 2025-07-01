/**
 * JavaScript para o módulo de Auditoria
 */
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes
  initFilterCollapse();
  initDateRangePicker();
  
  // Verificar se há filtros aplicados e mostrar o painel de filtros
  checkAndShowFilters();
});

/**
 * Inicializa o comportamento do colapso de filtros
 */
function initFilterCollapse() {
  // Se houver filtros aplicados, mostrar o painel de filtros por padrão
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.toString() && urlParams.get('page') !== '1' && !urlParams.has('page')) {
    const filterCollapse = document.getElementById('filterCollapse');
    if (filterCollapse) {
      const bsCollapse = new bootstrap.Collapse(filterCollapse, {
        toggle: true
      });
    }
  }
}

/**
 * Verifica se há filtros aplicados e mostra visualmente essa informação
 */
function checkAndShowFilters() {
  const urlParams = new URLSearchParams(window.location.search);
  let hasFilters = false;
  
  // Verificar se há parâmetros de filtro (exceto page)
  urlParams.forEach((value, key) => {
    if (key !== 'page' && value) {
      hasFilters = true;
    }
  });
  
  // Se houver filtros, adicionar indicador visual
  if (hasFilters) {
    const filterButton = document.querySelector('[data-bs-toggle="collapse"][data-bs-target="#filterCollapse"]');
    if (filterButton) {
      filterButton.classList.add('btn-warning');
      filterButton.classList.remove('btn-outline-secondary');
      
      // Adicionar badge indicando que há filtros ativos
      const badge = document.createElement('span');
      badge.className = 'badge bg-danger ms-2';
      badge.textContent = 'Filtros ativos';
      filterButton.appendChild(badge);
    }
  }
}

/**
 * Inicializa os seletores de data com validação
 */
function initDateRangePicker() {
  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');
  
  if (startDateInput && endDateInput) {
    // Validar que a data final não seja anterior à data inicial
    endDateInput.addEventListener('change', function() {
      if (startDateInput.value && this.value) {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(this.value);
        
        if (endDate < startDate) {
          alert('A data final não pode ser anterior à data inicial.');
          this.value = '';
        }
      }
    });
    
    // Validar que a data inicial não seja posterior à data final
    startDateInput.addEventListener('change', function() {
      if (endDateInput.value && this.value) {
        const startDate = new Date(this.value);
        const endDate = new Date(endDateInput.value);
        
        if (startDate > endDate) {
          alert('A data inicial não pode ser posterior à data final.');
          this.value = '';
        }
      }
    });
  }
}
