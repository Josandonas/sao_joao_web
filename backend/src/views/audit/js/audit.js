
/**
 * JavaScript para o módulo de auditoria
 * Contém lógica para filtros, datepickers, formatação de JSON e
 * carregamento dinâmico de detalhes de log via modal.
 */
console.log('--- audit.js: Script carregado. ---'); // MUITO IMPORTANTE: Esta linha deve aparecer no Console.

document.addEventListener('DOMContentLoaded', function() {
    console.log('--- audit.js: DOMContentLoaded disparado. ---'); // MUITO IMPORTANTE: Esta linha deve aparecer no Console.
    console.log('Inicializando script de auditoria...');

    // -----------------------------------------------------------
    // Seção de inicialização de componentes comuns (Tooltips, Datepickers)
    // -----------------------------------------------------------

    // Inicializar tooltips (seguindo o exemplo do testimonials.js)
    try {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
             tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
            console.log('Tooltips Bootstrap inicializados.');
        } else {
            console.warn('Bootstrap Tooltip não encontrado. Verifique o carregamento do Bootstrap JS.');
        }
    } catch (e) {
        console.error('Erro ao inicializar tooltips:', e);
    }

    // Inicializar datepickers
    // Verifica se jQuery está disponível e o plugin datepicker
    try {
        if (typeof $ !== 'undefined' && $.fn.datepicker && document.querySelector('.datepicker')) {
            $('.datepicker').datepicker({
                format: 'dd/mm/yyyy',
                language: 'pt-BR',
                autoclose: true
            });
            console.log('Datepicker(s) inicializado(s).');
        } else {
            console.warn('jQuery ou jQuery Datepicker plugin não encontrados ou nenhum elemento .datepicker.');
        }
    } catch (e) {
        console.error('Erro ao inicializar datepickers:', e);
    }

    // Formatar JSON para exibição (usado em detalhes já carregados na página, não no modal dinâmico)
    const formatJsonElements = document.querySelectorAll('.format-json');
    if (formatJsonElements.length > 0) {
        console.log(`Encontrados ${formatJsonElements.length} elementos para formatação inicial de JSON.`);
        formatJsonElements.forEach(element => {
            try {
                const jsonData = JSON.parse(element.textContent);
                element.textContent = JSON.stringify(jsonData, null, 2);
                element.classList.add('formatted-json');
            } catch (e) {
                console.warn('Erro ao formatar JSON em um elemento inicial (pode não ser JSON válido):', e);
            }
        });
    }

    // -----------------------------------------------------------
    // Seção de Lógica de Filtros
    // -----------------------------------------------------------

    // Filtros de auditoria - Envio do formulário
    const filterForm = document.getElementById('filter-form');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            console.log('Formulário de filtro submetido.');
            // Remover campos vazios para não poluir a URL com parâmetros desnecessários
            const formElements = Array.from(this.elements);
            formElements.forEach(element => {
                // Para selects e inputs de texto, remover 'name' se o valor for vazio
                if (element.value === '' && element.name) {
                    element.name = '';
                }
                // Para checkboxes, se não estiverem marcados, também remover 'name'
                if (element.type === 'checkbox' && !element.checked && element.name) {
                    element.name = '';
                }
            });
        });
        console.log('Listener de submit para filtro de formulário configurado.');
    } else {
        console.warn('Formulário #filter-form não encontrado.');
    }

    // Botão de limpar filtros
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            console.log('Botão "Limpar Filtros" clicado. Redirecionando...');
            window.location.href = '/admin/audit'; // Redireciona para a página base de auditoria
        });
        console.log('Listener de clique para "Limpar Filtros" configurado.');
    } else {
        console.warn('Botão #clear-filters não encontrado.');
    }

    // -----------------------------------------------------------
    // Chamada principal para configurar o modal
    // -----------------------------------------------------------
    setupAuditDetailModal();
}); // Fim do DOMContentLoaded


/**
 * Formatar detalhes JSON quando existirem
 * Esta função é responsável por formatar JSON dentro de qualquer container
 * que tenha as classes '.json-details' ou '.audit-details'.
 * É chamada após o conteúdo do modal ser carregado via Fetch.
 */
function formatJsonDetails(containerElement = document) {
    console.log('formatJsonDetails: Iniciando formatação de detalhes JSON...');
    // Seleciona elementos dentro do container fornecido (por padrão, todo o documento)
    // para #auditDetailModal, pode-se passar o modalBody como containerElement
    const jsonContainers = containerElement.querySelectorAll('.json-details, .audit-details, .format-json-on-page');
    console.log(`formatJsonDetails: Containers JSON encontrados para formatação: ${jsonContainers.length}`);

    jsonContainers.forEach((container, index) => {
        try {
            const jsonContent = container.textContent;

            if (!jsonContent || !jsonContent.trim() || jsonContent.trim() === 'Sem detalhes') {
                console.log(`formatJsonDetails: Container ${index+1} vazio ou sem detalhes, ignorando.`);
                return;
            }

            let jsonData;
            try {
                jsonData = JSON.parse(jsonContent);
            } catch (parseError) {
                console.warn(`formatJsonDetails: Container ${index+1}: Falha ao parsear JSON, tentando remover caracteres de escape.`, parseError);
                // Tentar remover possíveis caracteres de escape extras
                try {
                    const cleanedContent = jsonContent
                        .replace(/\\\\n/g, '\\n')
                        .replace(/\\\\r/g, '\\r')
                        .replace(/\\\\t/g, '\\t')
                        .replace(/\\\\"/g, '\\"');
                    jsonData = JSON.parse(cleanedContent);
                    console.log(`formatJsonDetails: Container ${index+1}: JSON parseado com sucesso após limpeza.`);
                } catch (secondError) {
                    console.error(`formatJsonDetails: Container ${index+1}: Falha na segunda tentativa de parse, mantendo conteúdo original.`, secondError);
                    return; // Se ainda falhar, manter o conteúdo original e sair
                }
            }

            const formattedJson = JSON.stringify(jsonData, null, 2);
            container.textContent = formattedJson;
            container.classList.add('formatted-json'); // Adiciona classe para estilização CSS
            console.log(`formatJsonDetails: Container ${index+1}: JSON formatado com sucesso.`);
        } catch (e) {
            console.error(`formatJsonDetails: Erro geral ao formatar JSON no container ${index+1}:`, e);
        }
    });
}

/**
 * Configurar o modal de detalhes de auditoria
 * Esta função escuta o evento 'show.bs.modal' do Bootstrap para carregar o conteúdo.
 */
function setupAuditDetailModal() {
    console.log('setupAuditDetailModal: Iniciando configuração...');

    const auditDetailModal = document.getElementById('auditDetailModal');

    if (!auditDetailModal) {
        console.error('setupAuditDetailModal: ERRO! Modal #auditDetailModal NÃO encontrado no DOM. Verifique o ID no HTML.');
        return; // Interrompe se o modal não for encontrado
    } else {
        console.log('setupAuditDetailModal: Modal #auditDetailModal ENCONTRADO.');
    }

    const modalBody = auditDetailModal.querySelector('.modal-body');
    // Adicione esses seletores se seus spinners/mensagens de erro estiverem no auditDetailModalModal.ejs
    const modalSpinner = auditDetailModal.querySelector('.modal-spinner'); // Se você tiver um spinner separado
    const modalErrorMessage = auditDetailModal.querySelector('.modal-error-message'); // Se você tiver uma área para mensagens de erro

    if (!modalBody) {
        console.error('setupAuditDetailModal: ERRO! Elemento .modal-body dentro do #auditDetailModal não encontrado.');
        return;
    }

    // Listener para quando o modal está prestes a ser mostrado (antes da transição)
    auditDetailModal.addEventListener('show.bs.modal', function(event) {
        console.log('audit.js: Evento show.bs.modal disparado. (Isso deve aparecer ao clicar no botão)'); // CRÍTICO!

        // Exibe o spinner de carregamento e limpa o conteúdo anterior
        // Usamos um placeholder genérico aqui, ajuste se você tiver um spinner dedicado no seu HTML do modal
        modalBody.innerHTML = `
            <div class="text-center p-5" id="loading-placeholder">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Carregando...</span>
                </div>
                <p class="mt-3">Carregando detalhes do log...</p>
            </div>
        `;
        if (modalErrorMessage) modalErrorMessage.style.display = 'none'; // Esconde mensagem de erro anterior

        // Determina o botão que acionou o modal
        const button = event.relatedTarget;
        console.log('Botão que acionou o modal:', button); // Verifique qual elemento é este no console

        // Extrai o ID do log de auditoria do atributo data-id do botão
        const logId = button ? button.getAttribute('data-id') : null;
        console.log('ID do log extraído (data-id):', logId); // CRÍTICO: Verifica se o ID foi pego

        if (!logId) {
            console.error('setupAuditDetailModal: ID do log não encontrado no botão que acionou o modal. Verifique se data-id está no botão.');
            modalBody.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i> Erro: ID do log não fornecido para carregar detalhes.
                </div>
            `;
            return;
        }

        console.log(`Preparando para carregar log ID: ${logId}`);
        const url = `/admin/audit/modal/${logId}`;
        console.log('Fazendo requisição FETCH para:', url); // CRÍTICO: Confirma que o fetch está sendo disparado

        // Adicionar timestamp para evitar cache (opcional, pode ser removido se o servidor lidar com cache)
        const urlWithNoCache = `${url}?_=${new Date().getTime()}`;

        // Faz a requisição Fetch para obter os detalhes do log
        fetch(urlWithNoCache, {
            method: 'GET', // Método GET, pois você está buscando dados
            headers: {
                'Cache-Control': 'no-cache', // Solicita ao navegador para não usar cache
                'X-Requested-With': 'XMLHttpRequest' // Indica que é uma requisição AJAX
            }
        })
        .then(response => {
            console.log('Fetch: Resposta recebida. Status:', response.status, response.statusText); // CRÍTICO!
            if (!response.ok) {
                // Se a resposta não for OK (ex: 404, 500), lança um erro
                if (response.status === 404) {
                    throw new Error('Log de auditoria não encontrado (404).');
                }
                throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.text(); // Retorna a resposta como texto (HTML)
        })
        .then(html => {
            console.log('Fetch: HTML recebido com sucesso. Tamanho:', html.length); // Confirma recebimento do HTML

            // Verifica se o HTML está vazio
            if (!html || html.trim() === '') {
                throw new Error('Resposta vazia recebida do servidor.');
            }

            // Atualiza o conteúdo do modal com o HTML recebido
            modalBody.innerHTML = html;

            // Após o conteúdo ser carregado, chama a função para formatar o JSON dentro do modal.
            // Usamos um pequeno setTimeout para garantir que o DOM foi totalmente renderizado
            // pelo navegador antes de tentar manipular seus elementos internos.
            setTimeout(() => {
                formatJsonDetails(modalBody); // Passa modalBody como container para formatar apenas dentro dele
                console.log('JSON formatado após carregamento do modal.');
            }, 50); // Um pequeno atraso, geralmente suficiente
        })
        .catch(error => {
            console.error('Erro ao carregar detalhes do log (FETCH):', error); // Captura e logue erros de rede/parsing
            // Exibe mensagem de erro no modal
            modalBody.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i> Erro ao carregar detalhes: ${error.message}. Por favor, tente novamente.
                </div>
            `;
        });
    });

    // Limpa o conteúdo do modal ao ser totalmente fechado
    auditDetailModal.addEventListener('hidden.bs.modal', function() {
        console.log('audit.js: Modal totalmente fechado (hidden.bs.modal).'); // CRÍTICO!
        // Limpa o conteúdo do modal para o próximo carregamento
        modalBody.innerHTML = '';
        if (modalErrorMessage) modalErrorMessage.innerHTML = ''; // Limpa mensagens de erro também
    });
    console.log('setupAuditDetailModal: Event listeners para modal configurados.');
}
