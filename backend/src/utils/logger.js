/**
 * Configuração do sistema de logs
 * Gerencia logs de diferentes níveis e os armazena em arquivos e banco de dados
 */

const winston = require('winston');
const fs = require('fs');
const path = require('path');
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
    // Logs de erro e warning vão para o console e arquivo
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`
        )
      ),
    }),
    // Todos os logs vão para o arquivo diário
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
    new winston.transports.File({ filename: path.join(logDir, 'exceptions.log') })
  ],
  rejectionHandlers: [
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
    const metadataJson = JSON.stringify(metadata);
    
    // Importação tardia para evitar dependência circular
    const database = require('../config/database');
    
    // Inserir no banco de dados
    await database.query(
      'INSERT INTO error_logs (level, message, stack, metadata) VALUES (?, ?, ?, ?)',
      [level, message, stack, metadataJson]
    );
  } catch (error) {
    // Não podemos usar o logger aqui para evitar recursão infinita
    console.error('Erro ao salvar log no banco de dados:', error);
  }
};

/**
 * Limpa e recria o arquivo de log diário no final de semana
 * Deve ser chamado por um job agendado
 */
const resetWeeklyLog = () => {
  const date = new Date();
  const day = date.getDay();
  
  // Se for domingo (0), limpar todos os logs da semana
  if (day === 0) {
    const dayNames = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    
    dayNames.forEach(dayName => {
      const logFile = path.join(logDir, `${dayName}.log`);
      
      // Verificar se o arquivo existe antes de tentar limpar
      if (fs.existsSync(logFile)) {
        // Limpar o conteúdo do arquivo
        fs.writeFileSync(logFile, '', 'utf8');
        logger.info(`Arquivo de log ${dayName}.log limpo com sucesso`);
      }
    });
  }
};

module.exports = {
  logger,
  resetWeeklyLog
};
