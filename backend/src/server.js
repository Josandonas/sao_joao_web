/**
 * Servidor principal da aplicação São João Web Backend
 */

require('dotenv').config();
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
const { setupRoutes } = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { logger } = require('./utils/logger');

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

// Servir arquivos estáticos da pasta public
app.use('/public', express.static(path.join(__dirname, '../public')));

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
      throw dbInitError;
    }
    
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
