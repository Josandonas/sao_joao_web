/**
 * Configuração do sistema de logs
 * Gerencia logs de diferentes níveis e os armazena em arquivos e banco de dados
 */

const winston = require('winston');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
// Evitar dependência circular - importar database apenas quando necessário

// Criar diretório de logs se não existir
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Nome do arquivo de log baseado no dia da semana
const getLogFileName = () => {
  const date = new Date();
  const day = date.getDay(); // 0 = Domingo, 1 = Segunda, ...
  const dayNames = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
  return `${dayNames[day]}.log`;
};

// Nome do arquivo de log principal da aplicação
const getApplicationLogFileName = () => {
  return 'application.log';
};

// Configuração do logger Winston
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'sao-joao-web-backend' },
  transports: [
    // Logs de erro e warning vão para o console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`
        )
      ),
    }),
    // Logs de info, http, debug vão para o arquivo application.log
    new winston.transports.File({
      filename: path.join(logDir, getApplicationLogFileName()),
      level: 'info',
      format: winston.format.combine(
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`
        )
      ),
    }),
    // Logs diários para análise por dia da semana
    new winston.transports.File({
      filename: path.join(logDir, getLogFileName()),
      format: winston.format.combine(
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`
        )
      ),
    })
  ],
  exceptionHandlers: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`
        )
      ),
    }),
    new winston.transports.File({ filename: path.join(logDir, 'exceptions.log') })
  ],
  rejectionHandlers: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`
        )
      ),
    }),
    new winston.transports.File({ filename: path.join(logDir, 'rejections.log') })
  ]
});

// Adicionar função para salvar logs de erro e warning no banco de dados
const originalLoggerError = logger.error;
const originalLoggerWarn = logger.warn;

// Sobrescrever método error para salvar no banco de dados
logger.error = function(message, metadata = {}) {
  // Chamar o método original
  originalLoggerError.call(this, message, metadata);
  
  // Salvar no banco de dados
  saveLogToDatabase('error', message, metadata).catch(err => {
    console.error('Erro ao salvar log no banco de dados:', err);
  });
};

// Sobrescrever método warn para salvar no banco de dados
logger.warn = function(message, metadata = {}) {
  // Chamar o método original
  originalLoggerWarn.call(this, message, metadata);
  
  // Salvar no banco de dados
  saveLogToDatabase('warn', message, metadata).catch(err => {
    console.error('Erro ao salvar log no banco de dados:', err);
  });
};

/**
 * Salva um log no banco de dados
 * @param {string} level - Nível do log (error, warn)
 * @param {string} message - Mensagem do log
 * @param {Object} metadata - Metadados adicionais
 * @returns {Promise<void>}
 */
const saveLogToDatabase = async (level, message, metadata = {}) => {
  try {
    // Extrair stack trace se existir
    const stack = metadata.stack || (metadata instanceof Error ? metadata.stack : null);
    
    // Converter metadata para JSON
    let metadataJson;
    try {
      metadataJson = JSON.stringify(metadata);
    } catch (jsonError) {
      metadataJson = JSON.stringify({ error: 'Não foi possível serializar os metadados' });
      console.error('Erro ao serializar metadados:', jsonError);
    }
    
    // Importação tardia para evitar dependência circular
    const database = require('../config/database');
    
    // Inserir no banco de dados
    await database.query(
      'INSERT INTO logs_sistema (level, message, stack, metadata, timestamp) VALUES (?, ?, ?, ?, NOW())',
      [level, message, stack, metadataJson]
    );
  } catch (error) {
    // Não podemos usar o logger aqui para evitar recursão infinita
    console.error('Erro ao salvar log no banco de dados:', error);
  }
};

/**
 * Limpa e recria os arquivos de log semanalmente
 * Deve ser chamado por um job agendado
 */
const resetWeeklyLogs = () => {
  try {
    const date = new Date();
    const dayNames = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    const applicationLogFile = path.join(logDir, getApplicationLogFileName());
    
    // Criar backup do arquivo de log da aplicação antes de limpar
    if (fs.existsSync(applicationLogFile)) {
      const backupDate = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(logDir, `application-${backupDate}.log.bak`);
      fs.copyFileSync(applicationLogFile, backupFile);
      
      // Limpar o arquivo de log da aplicação
      fs.writeFileSync(applicationLogFile, '', 'utf8');
      console.log(`Arquivo de log application.log limpo e backup criado: ${backupFile}`);
    }
    
    // Limpar os logs diários
    dayNames.forEach(dayName => {
      const logFile = path.join(logDir, `${dayName}.log`);
      
      // Verificar se o arquivo existe antes de tentar limpar
      if (fs.existsSync(logFile)) {
        // Limpar o conteúdo do arquivo
        fs.writeFileSync(logFile, '', 'utf8');
        console.log(`Arquivo de log ${dayName}.log limpo com sucesso`);
      }
    });
    
    // Limpar arquivos de exceções e rejeições mais antigos que 30 dias
    const exceptionLogFile = path.join(logDir, 'exceptions.log');
    const rejectionLogFile = path.join(logDir, 'rejections.log');
    
    if (fs.existsSync(exceptionLogFile)) {
      const stats = fs.statSync(exceptionLogFile);
      const fileDate = new Date(stats.mtime);
      const diffDays = Math.floor((date - fileDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays > 30) {
        fs.writeFileSync(exceptionLogFile, '', 'utf8');
        console.log('Arquivo de exceções limpo (mais de 30 dias)');
      }
    }
    
    if (fs.existsSync(rejectionLogFile)) {
      const stats = fs.statSync(rejectionLogFile);
      const fileDate = new Date(stats.mtime);
      const diffDays = Math.floor((date - fileDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays > 30) {
        fs.writeFileSync(rejectionLogFile, '', 'utf8');
        console.log('Arquivo de rejeições limpo (mais de 30 dias)');
      }
    }
    
    // Registrar no banco de dados que a limpeza foi realizada
    saveLogToDatabase('info', 'Limpeza semanal de logs realizada com sucesso', { timestamp: new Date() })
      .catch(err => console.error('Erro ao registrar limpeza de logs:', err));
      
  } catch (error) {
    console.error('Erro ao limpar arquivos de log:', error);
    // Tentar registrar no banco de dados
    saveLogToDatabase('error', 'Erro ao limpar arquivos de log', { error: error.message, stack: error.stack })
      .catch(err => console.error('Erro ao registrar falha na limpeza de logs:', err));
  }
};

/**
 * Configura o agendamento da limpeza semanal de logs
 * Executa todos os domingos à meia-noite
 */
const setupLogRotation = () => {
  // Executar a cada domingo à meia-noite (0 0 * * 0)
  cron.schedule('0 0 * * 0', () => {
    console.log('Executando limpeza semanal de logs...');
    resetWeeklyLogs();
  });
  
  console.log('Agendamento de limpeza semanal de logs configurado');
};

module.exports = {
  logger,
  resetWeeklyLogs,
  setupLogRotation
};
