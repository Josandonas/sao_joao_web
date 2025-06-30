/**
 * Script específico para o módulo de depoimentos
 */

document.addEventListener('DOMContentLoaded', function() {
  // Referências aos elementos do modal
  const testimonialFormModal = document.getElementById('testimonialFormModal');
  const testimonialForm = document.getElementById('testimonialForm');
  const modalTitle = document.getElementById('modalTitle');
  const testimonialIdInput = document.getElementById('testimonialId');
  const categorySelect = document.getElementById('category');
  const otherCategoryContainer = document.getElementById('otherCategoryContainer');
  const otherCategoryInput = document.getElementById('otherCategory');
  const currentVideoContainer = document.getElementById('currentVideoContainer');
  const currentVideo = document.getElementById('currentVideo');
  const saveTestimonialBtn = document.getElementById('saveTestimonialBtn');
  
  // Inicializar o modal
  const modal = new bootstrap.Modal(testimonialFormModal);
  
  // Mostrar/ocultar campo de nova categoria
  if (categorySelect) {
    categorySelect.addEventListener('change', function() {
      if (this.value === 'other') {
        otherCategoryContainer.style.display = 'block';
        otherCategoryInput.setAttribute('required', 'required');
      } else {
        otherCategoryContainer.style.display = 'none';
        otherCategoryInput.removeAttribute('required');
      }
    });
    
    // Verificar estado inicial
    if (categorySelect.value === 'other') {
      otherCategoryContainer.style.display = 'block';
      otherCategoryInput.setAttribute('required', 'required');
    }
  }
  
  // Abrir modal para novo depoimento
  const newTestimonialBtn = document.getElementById('newTestimonialBtn');
  if (newTestimonialBtn) {
    newTestimonialBtn.addEventListener('click', function() {
      resetForm();
      modalTitle.textContent = 'Novo Depoimento';
      testimonialForm.action = '/admin/testimonials/create';
      modal.show();
    });
  }
  
  // Abrir modal para editar depoimento
  document.querySelectorAll('.edit-testimonial-btn').forEach(btn => {
    btn.addEventListener('click', async function() {
      const testimonialId = this.getAttribute('data-id');
      resetForm();
      modalTitle.textContent = 'Editar Depoimento';
      testimonialForm.action = `/admin/testimonials/${testimonialId}/update`;
      testimonialIdInput.value = testimonialId;
      
      try {
        const response = await fetch(`/admin/testimonials/${testimonialId}/data`);
        if (!response.ok) throw new Error('Erro ao carregar dados do depoimento');
        
        const testimonial = await response.json();
        
        // Preencher o formulário com os dados do depoimento
        document.getElementById('name').value = testimonial.name;
        document.getElementById('location').value = testimonial.location;
        document.getElementById('testimonial').value = testimonial.testimonial;
        
        // Selecionar a categoria
        if (testimonial.category) {
          const option = Array.from(categorySelect.options).find(opt => opt.value === testimonial.category);
          if (option) {
            categorySelect.value = testimonial.category;
          } else {
            categorySelect.value = 'other';
            otherCategoryContainer.style.display = 'block';
            otherCategoryInput.value = testimonial.category;
            otherCategoryInput.setAttribute('required', 'required');
          }
        }
        
        // Definir disponibilidade para o frontend
        document.getElementById('is_available_for_frontend').checked = testimonial.is_available_for_frontend;
        
        // Mostrar vídeo atual se existir
        if (testimonial.video_path) {
          currentVideoContainer.style.display = 'block';
          currentVideo.querySelector('source').src = testimonial.video_path;
          currentVideo.load();
        }
        
        modal.show();
      } catch (error) {
        console.error('Erro:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar os dados do depoimento.'
        });
      }
    });
  });
  
  // Submeter o formulário quando clicar no botão salvar
  if (saveTestimonialBtn) {
    saveTestimonialBtn.addEventListener('click', function() {
      if (testimonialForm.checkValidity()) {
        testimonialForm.submit();
      } else {
        testimonialForm.classList.add('was-validated');
      }
    });
  }
  
  // Botões de publicar/despublicar
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
  
  document.querySelectorAll('.btn-unpublish').forEach(btn => {
    btn.addEventListener('click', function() {
      const testimonialId = this.getAttribute('data-id');
      confirmAction(
        'Despublicar Depoimento',
        'Tem certeza que deseja despublicar este depoimento?',
        'O depoimento não será mais exibido no frontend.',
        `/admin/testimonials/${testimonialId}/unpublish`
      );
    });
  });
  
  // Botão de excluir
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function() {
      const testimonialId = this.getAttribute('data-id');
      confirmAction(
        'Excluir Depoimento',
        'Tem certeza que deseja excluir este depoimento?',
        'Esta ação não pode ser desfeita.',
        `/admin/testimonials/${testimonialId}/delete`,
        'Excluir',
        'danger'
      );
    });
  });
  
  // Validação do formulário
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
  
  // Função para resetar o formulário
  function resetForm() {
    if (!testimonialForm) return;
    
    testimonialForm.reset();
    testimonialForm.classList.remove('was-validated');
    testimonialIdInput.value = '';
    otherCategoryContainer.style.display = 'none';
    otherCategoryInput.removeAttribute('required');
    currentVideoContainer.style.display = 'none';
    currentVideo.querySelector('source').src = '';
  }
  
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
