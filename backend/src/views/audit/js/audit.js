/**
 * JavaScript para o módulo de auditoria
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Inicializando script de auditoria...');

  // Inicializar tooltips (seguindo o exemplo do testimonials.js)
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Inicializar datepickers
  if (typeof $ !== 'undefined' && $.fn.datepicker && document.querySelector('.datepicker')) {
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

  // Formatar detalhes JSON quando existirem
  formatJsonDetails();
  
  // Configurar o modal de detalhes de auditoria
  setupAuditDetailModal();
});

/**
 * Formatar detalhes JSON quando existirem
 */
function formatJsonDetails() {
  const jsonContainers = document.querySelectorAll('.json-details, .audit-details');
  
  jsonContainers.forEach(container => {
    try {
      const jsonContent = container.textContent;
      if (jsonContent && jsonContent.trim() && jsonContent !== 'Sem detalhes') {
        const formattedJson = JSON.stringify(JSON.parse(jsonContent), null, 2);
        container.textContent = formattedJson;
      }
    } catch (e) {
      console.error('Erro ao formatar JSON:', e);
      // Manter o conteúdo original se não for um JSON válido
    }
  });
}

/**
 * Configurar o modal de detalhes de auditoria
 */
function setupAuditDetailModal() {
  console.log('Configurando modal de detalhes de auditoria');
  
  // Obter referência ao modal
  const auditDetailModal = document.getElementById('auditDetailModal');
  if (!auditDetailModal) {
    console.error('Modal não encontrado');
    return;
  }
  
  // Inicializar o modal do Bootstrap
  const modal = new bootstrap.Modal(auditDetailModal);
  
  // Adicionar event listeners aos botões de detalhes
  const detailButtons = document.querySelectorAll('.view-audit-details');
  console.log('Botões de detalhes encontrados:', detailButtons.length);
  
  detailButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Obter ID do log
      const logId = this.getAttribute('data-id');
      if (!logId) {
        console.error('ID do log não encontrado');
        return;
      }
      
      console.log('Carregando detalhes do log ID:', logId);
      
      // Mostrar o modal com estado de carregamento
      const modalBody = auditDetailModal.querySelector('.modal-body');
      if (modalBody) {
        modalBody.innerHTML = `
          <div class="text-center p-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Carregando...</span>
            </div>
            <p class="mt-3">Carregando detalhes do log...</p>
          </div>
        `;
      }
      
      // Mostrar o modal
      modal.show();
      
      // Buscar dados do log via AJAX
      fetch(`/admin/audit/modal/${logId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.status} ${response.statusText}`);
          }
          return response.text();
        })
        .then(html => {
          // Atualizar o conteúdo do modal
          modalBody.innerHTML = html;
          
          // Formatar detalhes JSON no modal
          formatJsonDetails();
        })
        .catch(error => {
          console.error('Erro ao carregar detalhes do log:', error);
          modalBody.innerHTML = `
            <div class="alert alert-danger">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              Erro ao carregar detalhes: ${error.message}
            </div>
          `;
        });
    });
  });
  
  // Limpar conteúdo do modal quando for fechado
  auditDetailModal.addEventListener('hidden.bs.modal', function() {
    const modalBody = auditDetailModal.querySelector('.modal-body');
    if (modalBody) {
      modalBody.innerHTML = '';
    }
  });
}
