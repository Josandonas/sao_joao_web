/**
 * Script para inicializar o banco de dados e criar todas as tabelas necessárias
 */

const database = require('./database');
const { logger } = require('../utils/logger');
/**
 * Inicializa todas as tabelas do banco de dados
 * @returns {Promise<void>}
 */
const initializeDatabase = async () => {
  try {
    logger.info('Inicializando banco de dados...');
    
    // Criar tabelas principais
    await createCoreTables();
    
    // Criar tabelas para módulos específicos
    await createTestimonialsTable();
    await createPostcardsTable();
    await createBibliotecaTable();
    await createGaleriaTable();
    
    logger.info('Banco de dados inicializado com sucesso!');
  } catch (error) {
    logger.error(`Erro ao inicializar banco de dados: ${error.message}`, { error });
    throw error;
  }
};

/**
 * Cria as tabelas principais do sistema
 * @returns {Promise<void>}
 */
const createCoreTables = async () => {
  try {
    // Tabela de usuários
    await database.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Tabela de módulos
    await database.query(`
      CREATE TABLE IF NOT EXISTS modules (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Tabela de permissões de usuários para módulos
    await database.query(`
      CREATE TABLE IF NOT EXISTS user_module_permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        module_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE,
        UNIQUE KEY user_module_unique (user_id, module_id)
      )
    `);
    
    // Tabela de logs de erro (legado)
    await database.query(`
      CREATE TABLE IF NOT EXISTS error_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        level VARCHAR(10) NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        stack TEXT,
        metadata JSON
      )
    `);
    
    // Tabela de logs do sistema (nova implementação)
    await database.query(`
      CREATE TABLE IF NOT EXISTS logs_sistema (
        id INT AUTO_INCREMENT PRIMARY KEY,
        level VARCHAR(10) NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        stack TEXT,
        metadata JSON,
        source VARCHAR(100),
        module VARCHAR(50),
        INDEX idx_level (level),
        INDEX idx_timestamp (timestamp),
        INDEX idx_module (module)
      )
    `);
    
    // Tabela de logs de ações de usuários (auditoria)
    await database.query(`
      CREATE TABLE IF NOT EXISTS user_action_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        action VARCHAR(100) NOT NULL,
        entity VARCHAR(50),
        entity_id VARCHAR(50),
        details JSON,
        ip_address VARCHAR(45),
        user_agent TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    
    // Tabela de logs de emails enviados
    await database.query(`
      CREATE TABLE IF NOT EXISTS email_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        recipient VARCHAR(100) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        content TEXT,
        status VARCHAR(20) NOT NULL,
        error_message TEXT,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Inserir módulos padrão se não existirem
    const defaultModules = [
      { name: 'postcards', description: 'Gerenciamento de postais' },
      { name: 'biblioteca', description: 'Gerenciamento da biblioteca digital' },
      { name: 'galeria', description: 'Gerenciamento da galeria de imagens' },
      { name: 'book', description: 'Gerenciamento de livros' },
      { name: 'testimonials', description: 'Gerenciamento de depoimentos' },
      { name: 'communities', description: 'Gerenciamento de comunidades' },
      { name: 'stories', description: 'Gerenciamento de histórias' },
      { name: 'programacao', description: 'Gerenciamento da programação' },
      { name: 'video', description: 'Gerenciamento de vídeos' },
      { name: 'hero', description: 'Gerenciamento do banner principal' }
    ];
    
    for (const module of defaultModules) {
      await database.query(
        'INSERT IGNORE INTO modules (name, description) VALUES (?, ?)',
        [module.name, module.description]
      );
    }
    
    logger.info('Tabelas principais criadas com sucesso');
  } catch (error) {
    logger.error(`Erro ao criar tabelas principais: ${error.message}`, { error });
    throw error;
  }
};

/**
 * Cria a tabela para o módulo de depoimentos
 * @returns {Promise<void>}
 */
const createTestimonialsTable = async () => {
  try {
    await database.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        location VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        testimonial TEXT NOT NULL,
        video_path VARCHAR(255),
        is_available_for_frontend BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    logger.info('Tabela de depoimentos criada com sucesso');
  } catch (error) {
    logger.error(`Erro ao criar tabela de depoimentos: ${error.message}`, { error });
    throw error;
  }
};

/**
 * Cria a tabela para o módulo de postais
 * @returns {Promise<void>}
 */
const createPostcardsTable = async () => {
  try {
    await database.query(`
      CREATE TABLE IF NOT EXISTS postcards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title JSON NOT NULL,
        description JSON NOT NULL,
        category VARCHAR(50) NOT NULL,
        image_path VARCHAR(255) NOT NULL,
        is_available_for_frontend BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Tabela para categorias de postais
    await database.query(`
      CREATE TABLE IF NOT EXISTS postcard_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    logger.info('Tabelas de postais criadas com sucesso');
  } catch (error) {
    logger.error(`Erro ao criar tabelas de postais: ${error.message}`, { error });
    throw error;
  }
};

/**
 * Cria a tabela para o módulo de biblioteca
 * @returns {Promise<void>}
 */
const createBibliotecaTable = async () => {
  try {
    await database.query(`
      CREATE TABLE IF NOT EXISTS biblioteca (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title JSON NOT NULL,
        description JSON NOT NULL,
        category VARCHAR(50) NOT NULL,
        year INT NOT NULL,
        image_path VARCHAR(255) NOT NULL,
        file_path VARCHAR(255),
        is_available_for_frontend BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Tabela para categorias da biblioteca
    await database.query(`
      CREATE TABLE IF NOT EXISTS biblioteca_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    logger.info('Tabelas de biblioteca criadas com sucesso');
  } catch (error) {
    logger.error(`Erro ao criar tabelas de biblioteca: ${error.message}`, { error });
    throw error;
  }
};

/**
 * Cria a tabela para o módulo de galeria
 * @returns {Promise<void>}
 */
const createGaleriaTable = async () => {
  try {
    await database.query(`
      CREATE TABLE IF NOT EXISTS galeria (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title JSON NOT NULL,
        description JSON,
        year INT NOT NULL,
        image_path VARCHAR(255) NOT NULL,
        is_available_for_frontend BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    logger.info('Tabela de galeria criada com sucesso');
  } catch (error) {
    logger.error(`Erro ao criar tabela de galeria: ${error.message}`, { error });
    throw error;
  }
};

module.exports = {
  initializeDatabase
};
