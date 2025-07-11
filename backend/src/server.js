/**
 * Servidor principal da aplicação São João Web Backend
 */

require('dotenv').config();
// Garantir que as variáveis de ambiente essenciais estejam definidas
const envSetup = require('./config/env-setup');
envSetup.checkEnvVariables();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const { setupDatabase } = require('./config/database');
const { initializeDatabase } = require('./config/initDb');
const { logger, setupLogRotation } = require('./utils/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const { setupRoutes } = require('./routes');
const { runAllDiagnostics } = require('./utils/diagnostics');
const { addTemplateVariables } = require('./middlewares/templateVariables');

// Criar aplicação Express
const app = express();
const PORT = process.env.PORT || 3030;

// Configurar mecanismo de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.set('layout extractMetas', true);

// Middlewares de segurança e utilidades
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
            imgSrc: ["'self'", "data:", "blob:"],
            fontSrc: ["'self'", "https://cdn.jsdelivr.net"],
            connectSrc: ["'self'"],
        },
    },
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'sao-joao-web-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(flash());
app.use(morgan('combined', { stream: { write: message => logger.http(message.trim()) } }));

// Middleware para adicionar variáveis comuns a todos os templates
app.use(addTemplateVariables);

// =================================================================================
// MODIFICAÇÕES CRÍTICAS AQUI: AJUSTE DOS CAMINHOS PARA ARQUIVOS ESTÁTICOS
// =================================================================================


// Servir arquivos estáticos das pastas de views (CSS e JS específicos de cada módulo)
// Esta linha já estava correta, pois 'views' está diretamente em '__dirname'
app.use('/views', express.static(path.join(__dirname, 'views')));


// Servir arquivos estáticos da pasta 'public' (se existir na raiz do projeto)
// __dirname é 'C:\Users\jmsandonas\Desktop\sao_joao_web\backend\src'
// Para alcançar 'C:\Users\jmsandonas\Desktop\sao_joao_web\public', precisamos subir 2 níveis: '../../public'
app.use(express.static(path.join(__dirname, '../public'))); // <-- MODIFICADO

// Servir arquivos estáticos do node_modules
// Para alcançar 'C:\Users\jmsandonas\Desktop\sao_joao_web\node_modules', precisamos subir 2 níveis: '../../node_modules'
app.use('/vendor', express.static(path.join(__dirname, '../node_modules'))); // <-- MODIFICADO

// Atalhos específicos para facilitar o acesso aos arquivos mais comuns do Bootstrap
// Esses também precisam do caminho ajustado para '../../node_modules'
app.use('/css/bootstrap.min.css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.min.css'))); // <-- MODIFICADO
app.use('/js/bootstrap.bundle.min.js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'))); // <-- MODIFICADO

// Servir arquivos de ícones do Bootstrap
app.use('/css/bootstrap-icons.css', express.static(path.join(__dirname, '../node_modules/bootstrap-icons/font/bootstrap-icons.css'))); // <-- MODIFICADO
// Importante: Mapear o diretório de fontes para o caminho relativo que o CSS espera
app.use('/css/fonts', express.static(path.join(__dirname, '../node_modules/bootstrap-icons/font/fonts'))); // <-- MODIFICADO

// =================================================================================
// FIM DAS MODIFICAÇÕES
// =================================================================================

// Rota de verificação de saúde da API
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API São João Web está funcionando!' });
});

// Configurar todas as rotas da API
setupRoutes(app);

// Middleware de tratamento de erros (deve ser o último middleware)
app.use(errorHandler);

// Iniciar o servidor
const startServer = async () => {
    try {
        console.log('Iniciando servidor...');

        // Executar diagnóstico completo do sistema
        console.log('Executando diagnóstico do sistema...');
        const diagnosticResults = await runAllDiagnostics(true); // true = encerrar em caso de falha crítica

        if (!diagnosticResults.overallSuccess) {
            logger.warn('Diagnóstico completado com avisos, mas continuando inicialização');
        } else {
            logger.info('Diagnóstico completado com sucesso');
        }

        // Conectar ao banco de dados
        console.log('Configurando banco de dados...');
        await setupDatabase();
        console.log('Banco de dados configurado com sucesso');

        // Inicializar tabelas e dados do banco de dados
        console.log('Inicializando tabelas do banco de dados...');
        try {
            await initializeDatabase();
            console.log('Tabelas do banco de dados inicializadas com sucesso');
        } catch (dbInitError) {
            console.error('ERRO NA INICIALIZAÇÃO DO BANCO DE DADOS:', dbInitError);
            console.error('Stack trace completo:', dbInitError.stack);
            logger.error(`Erro na inicialização do banco de dados: ${dbInitError.message}`, { stack: dbInitError.stack });
            throw dbInitError;
        }

        // Configurar agendamento de limpeza de logs
        setupLogRotation();
        logger.info('Agendamento de limpeza de logs configurado');

        // Iniciar o servidor HTTP
        app.listen(PORT, () => {
            logger.info(`Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV}`);
            logger.info(`Painel administrativo disponível em http://localhost:${PORT}/admin`);
            console.log(`Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV}`);
        });
    } catch (error) {
        console.error('ERRO FATAL AO INICIAR O SERVIDOR:');
        console.error(error.message);
        console.error('Stack trace completo:');
        console.error(error.stack);

        // Registrar no logger se possível
        try {
            logger.error(`Erro ao iniciar o servidor: ${error.message}`);
        } catch (logError) {
            console.error('Não foi possível registrar o erro no logger:', logError.message);
        }

        process.exit(1);
    }
};

// Iniciar o servidor
startServer();

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
    logger.error(`Exceção não capturada: ${error.message}`, { stack: error.stack });
    console.error('Exceção não capturada:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Rejeição não tratada em: ${promise}, razão: ${reason}`);
    console.error('Rejeição não tratada:', reason);
    process.exit(1);
});

module.exports = app;