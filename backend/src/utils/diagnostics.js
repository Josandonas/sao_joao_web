/**
 * Sistema de diagnóstico robusto para garantir a estabilidade e resiliência do backend
 */

const fs = require('fs').promises;
const path = require('path');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const { logger } = require('./logger');

/**
 * Verifica a presença de variáveis de ambiente críticas
 * @returns {Object} Resultado da verificação
 */
const checkEnvironmentVariables = () => {
  const criticalVars = [
    'PORT',
    'NODE_ENV',
    'DB_HOST',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
    'JWT_SECRET',
    'SESSION_SECRET',
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_USER',
    'EMAIL_PASS'
  ];

  const missingVars = [];
  const presentVars = [];

  criticalVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    } else {
      presentVars.push(varName);
    }
  });

  return {
    success: missingVars.length === 0,
    missingVars,
    presentVars
  };
};

/**
 * Verifica a conectividade com o banco de dados
 * @returns {Promise<Object>} Resultado da verificação
 */
const checkDatabaseConnectivity = async () => {
  try {
    // Criar conexão temporária para teste
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    });

    // Testar a conexão com uma consulta simples
    await connection.query('SELECT 1');
    
    // Fechar a conexão
    await connection.end();
    
    return {
      success: true,
      message: 'Conexão com o banco de dados estabelecida com sucesso'
    };
  } catch (error) {
    return {
      success: false,
      message: `Falha na conexão com o banco de dados: ${error.message}`,
      error
    };
  }
};

/**
 * Verifica a conectividade com o serviço de email
 * @returns {Promise<Object>} Resultado da verificação
 */
const checkEmailService = async () => {
  // Pular verificação se as variáveis de ambiente de email não estiverem configuradas
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return {
      success: false,
      message: 'Configuração de email incompleta, verificação ignorada'
    };
  }

  try {
    // Criar transportador de email para teste
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false // Aceitar certificados auto-assinados em ambiente de desenvolvimento
      }
    });

    // Verificar conexão (sem enviar email)
    await transporter.verify();
    
    return {
      success: true,
      message: 'Conexão com o serviço de email estabelecida com sucesso'
    };
  } catch (error) {
    return {
      success: false,
      message: `Falha na conexão com o serviço de email: ${error.message}`,
      error
    };
  }
};

/**
 * Verifica a integridade do sistema de arquivos para uploads
 * @returns {Promise<Object>} Resultado da verificação
 */
const checkFileSystem = async () => {
  const uploadDirs = [
    path.join(process.cwd(), 'public'),
    path.join(process.cwd(), 'public/videos'),
    path.join(process.cwd(), 'public/images'),
    path.join(process.cwd(), 'public/documents'),
    path.join(process.cwd(), 'logs')
  ];
  
  const results = [];
  
  for (const dir of uploadDirs) {
    try {
      // Verificar se o diretório existe
      try {
        await fs.access(dir);
        results.push({ dir, exists: true, created: false });
      } catch (error) {
        // Diretório não existe, tentar criar
        await fs.mkdir(dir, { recursive: true });
        results.push({ dir, exists: false, created: true });
      }
      
      // Verificar se o diretório é gravável
      const testFile = path.join(dir, '.test-write-permission');
      await fs.writeFile(testFile, 'test');
      await fs.unlink(testFile);
      
    } catch (error) {
      results.push({ 
        dir, 
        exists: false, 
        created: false, 
        error: error.message 
      });
    }
  }
  
  const allSuccessful = results.every(r => r.exists || r.created);
  
  return {
    success: allSuccessful,
    results
  };
};

/**
 * Verifica se os schemas de validação Joi podem ser carregados
 * @returns {Promise<Object>} Resultado da verificação
 */
const checkValidationSchemas = async () => {
  try {
    // Tentar importar o módulo de validação
    const validator = require('../utils/validator');
    
    return {
      success: true,
      message: 'Schemas de validação carregados com sucesso'
    };
  } catch (error) {
    return {
      success: false,
      message: `Falha ao carregar schemas de validação: ${error.message}`,
      error
    };
  }
};

/**
 * Executa todas as verificações de diagnóstico
 * @param {boolean} exitOnFailure - Se deve encerrar o processo em caso de falha crítica
 * @returns {Promise<Object>} Resultado de todas as verificações
 */
const runAllDiagnostics = async (exitOnFailure = false) => {
  console.log('=== INICIANDO DIAGNÓSTICO DO SISTEMA ===');
  
  const results = {
    environment: null,
    database: null,
    email: null,
    fileSystem: null,
    validationSchemas: null,
    overallSuccess: false
  };
  
  try {
    // 1. Verificar variáveis de ambiente
    console.log('\n1. Verificando variáveis de ambiente críticas...');
    results.environment = checkEnvironmentVariables();
    if (results.environment.success) {
      console.log('✓ Todas as variáveis de ambiente críticas estão presentes');
    } else {
      console.error(`✗ Variáveis de ambiente ausentes: ${results.environment.missingVars.join(', ')}`);
      if (exitOnFailure) {
        logger.error(`Inicialização abortada: Variáveis de ambiente críticas ausentes: ${results.environment.missingVars.join(', ')}`);
        process.exit(1);
      }
    }
    
    // 2. Verificar conectividade com banco de dados
    console.log('\n2. Verificando conectividade com banco de dados...');
    results.database = await checkDatabaseConnectivity();
    if (results.database.success) {
      console.log('✓ ' + results.database.message);
    } else {
      console.error('✗ ' + results.database.message);
      if (exitOnFailure) {
        logger.error(`Inicialização abortada: ${results.database.message}`);
        process.exit(1);
      }
    }
    
    // 3. Verificar serviço de email
    console.log('\n3. Verificando serviço de email...');
    results.email = await checkEmailService();
    if (results.email.success) {
      console.log('✓ ' + results.email.message);
    } else {
      console.warn('⚠ ' + results.email.message);
      // Não abortar por falha no email, apenas avisar
    }
    
    // 4. Verificar sistema de arquivos
    console.log('\n4. Verificando sistema de arquivos para uploads...');
    results.fileSystem = await checkFileSystem();
    if (results.fileSystem.success) {
      console.log('✓ Diretórios de upload verificados/criados com sucesso');
    } else {
      console.error('✗ Falha ao verificar/criar diretórios de upload');
      if (exitOnFailure) {
        logger.error('Inicialização abortada: Falha ao verificar/criar diretórios de upload');
        process.exit(1);
      }
    }
    
    // 5. Verificar schemas de validação
    console.log('\n5. Verificando schemas de validação...');
    results.validationSchemas = await checkValidationSchemas();
    if (results.validationSchemas.success) {
      console.log('✓ ' + results.validationSchemas.message);
    } else {
      console.error('✗ ' + results.validationSchemas.message);
      if (exitOnFailure) {
        logger.error(`Inicialização abortada: ${results.validationSchemas.message}`);
        process.exit(1);
      }
    }
    
    // Determinar sucesso geral
    results.overallSuccess = 
      results.environment.success && 
      results.database.success && 
      results.fileSystem.success && 
      results.validationSchemas.success;
    
    console.log('\n=== DIAGNÓSTICO CONCLUÍDO ===');
    if (results.overallSuccess) {
      console.log('✓ Todos os componentes críticos estão funcionando corretamente');
    } else {
      console.error('✗ Alguns componentes críticos apresentaram falhas');
      if (exitOnFailure) {
        logger.error('Inicialização abortada: Falhas em componentes críticos');
        process.exit(1);
      }
    }
    
    return results;
    
  } catch (error) {
    console.error('\n=== DIAGNÓSTICO FALHOU ===');
    console.error('Erro:', error.message);
    console.error('Stack trace completo:');
    console.error(error.stack);
    
    logger.error(`Diagnóstico falhou: ${error.message}`, { stack: error.stack });
    
    if (exitOnFailure) {
      process.exit(1);
    }
    
    return {
      ...results,
      overallSuccess: false,
      fatalError: error
    };
  }
};

module.exports = {
  runAllDiagnostics,
  checkEnvironmentVariables,
  checkDatabaseConnectivity,
  checkEmailService,
  checkFileSystem,
  checkValidationSchemas
};
