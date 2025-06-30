/**
 * Script específico para o módulo de depoimentos
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Script de depoimentos carregado');
  
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
  const newTestimonialBtn = document.getElementById('newTestimonialBtn');
  
  // Verificar se os elementos necessários existem
  if (!testimonialFormModal) {
    console.error('Elemento do modal não encontrado');
    return;
  }
  
  console.log('Modal encontrado:', testimonialFormModal.id);
  
  // Configurar o botão de novo depoimento para abrir o modal
  if (newTestimonialBtn) {
    console.log('Botão de novo depoimento encontrado');
    newTestimonialBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Botão de novo depoimento clicado');
      
      if (testimonialForm) {
        resetForm();
        modalTitle.textContent = 'Novo Depoimento';
        testimonialForm.action = '/admin/testimonials/create';
      }
      
      try {
        // Tentar usar a API do Bootstrap 5
        if (typeof bootstrap !== 'undefined') {
          const bsModal = new bootstrap.Modal(testimonialFormModal);
          bsModal.show();
          console.log('Modal aberto via Bootstrap API');
        } else {
          // Fallback para atributo data-bs-toggle
          testimonialFormModal.classList.add('show');
          testimonialFormModal.style.display = 'block';
          document.body.classList.add('modal-open');
          console.log('Modal aberto via classList');
        }
      } catch (error) {
        console.error('Erro ao abrir modal:', error);
      }
    });
  }
  
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
  
  // Configurar o botão "Criar Novo Depoimento" que aparece quando não há depoimentos
  const createNewTestimonialBtn = document.getElementById('createNewTestimonialBtn');
  if (createNewTestimonialBtn) {
    console.log('Botão de criar novo depoimento encontrado');
    createNewTestimonialBtn.addEventListener('click', function(e) {
      console.log('Botão de criar novo depoimento clicado');
      
      if (testimonialForm) {
        resetForm();
        modalTitle.textContent = 'Novo Depoimento';
        testimonialForm.action = '/admin/testimonials/create';
      }
    });
  }
  
  // Configurar o botão de salvar para submeter o formulário
  if (saveTestimonialBtn && testimonialForm) {
    saveTestimonialBtn.addEventListener('click', function() {
      console.log('Botão de salvar clicado, submetendo formulário');
      testimonialForm.submit();
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
        
        // Abrir o modal usando a API do Bootstrap 5
        try {
          if (typeof bootstrap !== 'undefined') {
            const bsModal = new bootstrap.Modal(testimonialFormModal);
            bsModal.show();
            console.log('Modal de edição aberto via Bootstrap API');
          } else {
            // Fallback para manipulação direta
            testimonialFormModal.classList.add('show');
            testimonialFormModal.style.display = 'block';
            document.body.classList.add('modal-open');
            console.log('Modal de edição aberto via classList');
          }
        } catch (error) {
          console.error('Erro ao abrir modal de edição:', error);
        }
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
