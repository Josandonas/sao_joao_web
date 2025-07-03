
/**
 * JavaScript para o módulo de auditoria
 * Contém lógica para filtros, datepickers, formatação de JSON e
 * carregamento dinâmico de detalhes de log via modal.
 */
//console.log('--- audit.js: Script carregado. ---'); // MUITO IMPORTANTE: Esta linha deve aparecer no //console.

// Verificar se o localStorage está disponível
function isLocalStorageAvailable() {
    try {
        const test = 'test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        //console.error('localStorage não está disponível:', e);
        return false;
    }
}

// Namespace para gerenciamento de tokens de auditoria
// Definido no escopo global para ser acessível em todo o arquivo
const AuditTokenManager = {
    // Prefixo para as chaves no localStorage
    keyPrefix: 'audit_token_',
    
    // Salvar um token para um ID específico
    saveToken: function(id, token) {
        try {
            if (!isLocalStorageAvailable()) {
                //console.warn('localStorage não disponível, usando variável em memória temporária');
                if (!window.tempAuditTokens) window.tempAuditTokens = {};
                window.tempAuditTokens[id] = token;
                return true;
            }
            
            const key = this.keyPrefix + id;
            localStorage.setItem(key, token);
            //console.log(`Token salvo para ID ${id} com chave ${key}`);
            //console.log('Conteúdo após salvar:', localStorage.getItem(key));
            return true;
        } catch (error) {
            //console.error('Erro ao salvar token:', error);
            return false;
        }
    },
        
        // Obter um token para um ID específico
        getToken: function(id) {
            try {
                // Se localStorage não está disponível, usar variável temporária
                if (!isLocalStorageAvailable()) {
                    //console.warn('localStorage não disponível, usando variável em memória temporária para obter token');
                    if (!window.tempAuditTokens) return null;
                    return window.tempAuditTokens[id] || null;
                }
                
                const key = this.keyPrefix + id;
                const token = localStorage.getItem(key);
                //console.log(`Token recuperado para ID ${id} com chave ${key}:`, token);
                return token;
            } catch (error) {
                //console.error('Erro ao recuperar token:', error);
                return null;
            }
        },
        
        // Remover um token
        removeToken: function(id) {
            try {
                const key = this.keyPrefix + id;
                localStorage.removeItem(key);
                //console.log(`Token removido para ID ${id}`);
                return true;
            } catch (error) {
                //console.error('Erro ao remover token:', error);
                return false;
            }
        },
        
        // Limpar todos os tokens de auditoria
        clearAllTokens: function() {
            try {
                // Encontrar todas as chaves que começam com o prefixo
                const keysToRemove = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith(this.keyPrefix)) {
                        keysToRemove.push(key);
                    }
                }
                
                // Remover cada chave
                keysToRemove.forEach(key => localStorage.removeItem(key));
                //console.log(`${keysToRemove.length} tokens removidos`);
                return true;
            } catch (error) {
                //console.error('Erro ao limpar tokens:', error);
                return false;
            }
        }
    };

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    //console.log('--- audit.js: DOMContentLoaded disparado. ---'); // MUITO IMPORTANTE: Esta linha deve aparecer no //console.
    //console.log('Inicializando script de auditoria...');
    //console.log('localStorage disponível:', isLocalStorageAvailable());
    
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
            //console.log('Tooltips Bootstrap inicializados.');
        } else {
            //console.warn('Bootstrap Tooltip não encontrado. Verifique o carregamento do Bootstrap JS.');
        }
    } catch (e) {
        //console.error('Erro ao inicializar tooltips:', e);
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
            //console.log('Datepicker(s) inicializado(s).');
        } else {
            //console.warn('jQuery ou jQuery Datepicker plugin não encontrados ou nenhum elemento .datepicker.');
        }
    } catch (e) {
        //console.error('Erro ao inicializar datepickers:', e);
    }

    // Formatar JSON para exibição (usado em detalhes já carregados na página, não no modal dinâmico)
    const formatJsonElements = document.querySelectorAll('.format-json');
    if (formatJsonElements.length > 0) {
        //console.log(`Encontrados ${formatJsonElements.length} elementos para formatação inicial de JSON.`);
        formatJsonElements.forEach(element => {
            try {
                const jsonData = JSON.parse(element.textContent);
                element.textContent = JSON.stringify(jsonData, null, 2);
                element.classList.add('formatted-json');
            } catch (e) {
                //console.warn('Erro ao formatar JSON em um elemento inicial (pode não ser JSON válido):', e);
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
            //console.log('Formulário de filtro submetido.');
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
        //console.log('Listener de submit para filtro de formulário configurado.');
    } else {
        //console.warn('Formulário #filter-form não encontrado.');
    }

    // Botão de limpar filtros
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            //console.log('Botão "Limpar Filtros" clicado. Redirecionando...');
            window.location.href = '/admin/audit'; // Redireciona para a página base de auditoria
        });
        //console.log('Listener de clique para "Limpar Filtros" configurado.');
    } else {
        //console.warn('Botão #clear-filters não encontrado.');
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
    
    const jsonContainers = containerElement.querySelectorAll('.json-details, .audit-details, .format-json-on-page');
    //console.log(`formatJsonDetails: Containers JSON encontrados para formatação: ${jsonContainers.length}`);

    jsonContainers.forEach((container, index) => {
        try {
            const jsonContent = container.textContent;

            if (!jsonContent || !jsonContent.trim() || jsonContent.trim() === 'Sem detalhes') {
                //console.log(`formatJsonDetails: Container ${index+1} vazio ou sem detalhes, ignorando.`);
                return;
            }

            // Verificar se o conteúdo é "[object Object]"
            if (jsonContent.trim() === '[object Object]') {
                //console.log(`formatJsonDetails: Container ${index+1} contém '[object Object]', substituindo por objeto vazio.`);
                container.textContent = "{ }";
                container.classList.add('formatted-json');
                return;
            }

            let jsonData;
            try {
                jsonData = JSON.parse(jsonContent);
            } catch (parseError) {
                //console.warn(`formatJsonDetails: Container ${index+1}: Falha ao parsear JSON, tentando remover caracteres de escape.`, parseError);
                try {
                    const cleanedContent = jsonContent
                        .replace(/\\\\n/g, '\\n')
                        .replace(/\\\\r/g, '\\r')
                        .replace(/\\\\t/g, '\\t')
                        .replace(/\\\\"/g, '\\"');
                    jsonData = JSON.parse(cleanedContent);
                    //console.log(`formatJsonDetails: Container ${index+1}: JSON parseado com sucesso após limpeza.`);
                } catch (secondError) {
                    //console.error(`formatJsonDetails: Container ${index+1}: Falha na segunda tentativa de parse, mantendo conteúdo original.`, secondError);
                    // Verificar se o conteúdo contém "[object Object]"
                    if (jsonContent.includes('[object Object]')) {
                        //console.log(`formatJsonDetails: Container ${index+1} contém '[object Object]', substituindo por objeto vazio.`);
                        container.textContent = "{ }";
                        container.classList.add('formatted-json');
                    }
                    return;
                }
            }

            const formattedJson = JSON.stringify(jsonData, null, 2);
            container.textContent = formattedJson;
            container.classList.add('formatted-json');
            //console.log(`formatJsonDetails: Container ${index+1}: JSON formatado com sucesso.`);
        } catch (e) {
            //console.error(`formatJsonDetails: Erro geral ao formatar JSON no container ${index+1}:`, e);
        }
    });
}

/**
 * Configurar o modal de detalhes de auditoria
 * Esta função escuta o evento 'show.bs.modal' do Bootstrap para carregar o conteúdo.
 */
function setupAuditDetailModal() {
    //console.log('setupAuditDetailModal: Iniciando configuração...');

    const auditDetailModal = document.getElementById('auditDetailModal');

    if (!auditDetailModal) {
        //console.error('setupAuditDetailModal: ERRO! Modal #auditDetailModal NÃO encontrado no DOM. Verifique o ID no HTML.');
        return; // Interrompe se o modal não for encontrado
    } else {
        //console.log('setupAuditDetailModal: Modal #auditDetailModal ENCONTRADO.');
    }

    const modalBody = auditDetailModal.querySelector('.modal-body');
    // Adicione esses seletores se seus spinners/mensagens de erro estiverem no auditDetailModalModal.ejs
    const modalSpinner = auditDetailModal.querySelector('.modal-spinner'); // Se você tiver um spinner separado
    const modalErrorMessage = auditDetailModal.querySelector('.modal-error-message'); // Se você tiver uma área para mensagens de erro

    if (!modalBody) {
        //console.error('setupAuditDetailModal: ERRO! Elemento .modal-body dentro do #auditDetailModal não encontrado.');
        return;
    }

    // Listener para quando o modal está prestes a ser mostrado (antes da transição)
    auditDetailModal.addEventListener('show.bs.modal', function(event) {
        //console.log('audit.js: Evento show.bs.modal disparado. (Isso deve aparecer ao clicar no botão)'); // CRÍTICO!

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
        //console.log('Botão que acionou o modal:', button); // Verifique qual elemento é este no //console

        // Extrai o token criptografado do log de auditoria do atributo data-id do botão
        // NOTA: No novo sistema, o data-id já contém o token criptografado, não o ID real
        const encryptedToken = button ? button.getAttribute('data-id') : null;
        //console.log('Token criptografado extraído (data-id):', encryptedToken);

        if (!encryptedToken) {
            //console.error('setupAuditDetailModal: Token não encontrado no botão que acionou o modal.');
            modalBody.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i> Erro: Token não fornecido para carregar detalhes.
                </div>
            `;
            return;
        }
        
        // Para depuração, vamos verificar o localStorage diretamente
        //console.log('Estado atual do localStorage:');
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(AuditTokenManager.keyPrefix)) {
                //console.log(`- ${key}: ${localStorage.getItem(key)}`);
            }
        }
        
        // Usamos o token criptografado diretamente
        const token = encryptedToken;
        
        // Tentamos armazenar o token para uso futuro (usando o próprio token como chave)
        // Isso é seguro porque o token já é criptografado
        AuditTokenManager.saveToken(encryptedToken, encryptedToken);

        //console.log(`Preparando para carregar log com token: ${token}`);
        // Codificar o token para garantir que caracteres especiais sejam preservados na URL
        const encodedToken = encodeURIComponent(token);
        
        // Vamos testar com uma URL absoluta para garantir que o caminho está correto
        // const url = `/admin/audit/modal/${encodedToken}`;
        const url = `/admin/audit/modal/${encodedToken}`;
        
        //console.log('URL base construída:', url);
        //console.log('URL base é absoluta?', url.startsWith('/'));
        //console.log('URL base tem o caminho correto?', url.includes('/admin/audit/modal/'));
        //console.log('Fazendo requisição FETCH para:', url); // CRÍTICO: Confirma que o fetch está sendo disparado

        // Adicionar timestamp para evitar cache (opcional, pode ser removido se o servidor lidar com cache)
        const timestamp = new Date().getTime();
        const urlWithTimestamp = `${url}?_=${timestamp}`;
        
        //console.log('Token original:', token);
        //console.log('Token original (comprimento):', token.length);
        //console.log('Token original (tipo):', typeof token);
        //console.log('Token original contém ":"?', token.includes(':'));
        
        if (token.includes(':')) {
            const parts = token.split(':');
            //console.log('Partes do token original:', parts.length);
            //console.log('Parte 1 (IV):', parts[0]);
            //console.log('Parte 2 (encrypted):', parts[1]);
        }
        
        //console.log('Token codificado para URL:', encodedToken);
        //console.log('Token codificado (comprimento):', encodedToken.length);
        //console.log('Token codificado contém "%3A"?', encodedToken.includes('%3A')); // %3A é o código para :
        //console.log('URL completa com timestamp:', urlWithTimestamp);

        // Fazer a requisição FETCH para carregar o conteúdo do modal
        fetch(urlWithTimestamp, {
            method: 'GET', // Método GET, pois você está buscando dados
            headers: {
                'Cache-Control': 'no-cache', // Solicita ao navegador para não usar cache
                'X-Requested-With': 'XMLHttpRequest' // Indica que é uma requisição AJAX
            }
        })
        .then(response => {
            //console.log('Resposta recebida do servidor:', response.status, response.statusText);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                // Se a resposta não for OK (ex: 404, 500), lança um erro
                if (response.status === 404) {
                    throw new Error('Log de auditoria não encontrado (404).');
                }
                throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.text(); // Retorna a resposta como texto (HTML)
        })
        .then(html => {
            //console.log('Fetch: HTML recebido com sucesso. Tamanho:', html.length); // Confirma recebimento do HTML

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
                //console.log('JSON formatado após carregamento do modal.');
            }, 50); // Um pequeno atraso, geralmente suficiente
        })
        .catch(error => {
            //console.error('Erro ao carregar detalhes do log (FETCH):', error); // Captura e logue erros de rede/parsing
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
        //console.log('audit.js: Modal totalmente fechado (hidden.bs.modal).'); // CRÍTICO!
        // Limpa o conteúdo do modal para o próximo carregamento
        modalBody.innerHTML = '';
        if (modalErrorMessage) modalErrorMessage.innerHTML = ''; // Limpa mensagens de erro também
    });
    //console.log('setupAuditDetailModal: Event listeners para modal configurados.');
}
