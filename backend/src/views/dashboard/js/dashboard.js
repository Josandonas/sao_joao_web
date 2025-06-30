/**
 * Script específico para o dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Botões de publicar depoimentos
  document.querySelectorAll('.btn-publish').forEach(btn => {
    btn.addEventListener('click', function() {
      const testimonialId = this.getAttribute('data-id');
      confirmAction(
        'Publicar Depoimento',
        'Tem certeza que deseja publicar este depoimento?',
        'O depoimento será exibido no frontend.',
        `/admin/testimonials/${testimonialId}/publish`
      );
    });
  });

  // Função para confirmar ações
  function confirmAction(title, text, description, url, confirmButtonText = 'Confirmar', confirmButtonColor = 'primary') {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      footer: description,
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor === 'danger' ? '#dc3545' : '#0d6efd',
      cancelButtonColor: '#6c757d',
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = url;
      }
    });
  }
});
