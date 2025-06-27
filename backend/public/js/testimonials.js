/**
 * São João Web - Gerenciamento de Depoimentos
 * Script para confirmações de ações com SweetAlert2
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Botão de publicar
  const publishButtons = document.querySelectorAll('.btn-publish');
  publishButtons.forEach(button => {
    button.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      
      Swal.fire({
        title: 'Publicar depoimento?',
        text: 'Este depoimento ficará visível no site público.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sim, publicar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `/admin/testimonials/${id}/publish`;
        }
      });
    });
  });
  
  // Botão de despublicar
  const unpublishButtons = document.querySelectorAll('.btn-unpublish');
  unpublishButtons.forEach(button => {
    button.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      
      Swal.fire({
        title: 'Despublicar depoimento?',
        text: 'Este depoimento não ficará mais visível no site público.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#6c757d',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sim, despublicar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `/admin/testimonials/${id}/unpublish`;
        }
      });
    });
  });
  
  // Botão de excluir
  const deleteButtons = document.querySelectorAll('.btn-delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      
      Swal.fire({
        title: 'Excluir depoimento?',
        text: 'Esta ação não pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `/admin/testimonials/${id}/delete`;
        }
      });
    });
  });
});
