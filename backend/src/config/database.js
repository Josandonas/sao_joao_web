/**
 * Configuração e conexão com o banco de dados MySQL
 */

const mysql = require('mysql2/promise');

// Pool de conexões com o banco de dados
let pool;

// Função simples de log para evitar dependência circular com logger.js
const logMessage = (level, message) => {
  const timestamp = new Date().toISOString();
  console[level](`${timestamp} - ${message}`);
};

/**
 * Configura e inicializa a conexão com o banco de dados
 * @returns {Promise<void>}
 */
const setupDatabase = async () => {
  try {
    // Criar pool de conexões
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Testar a conexão
    const connection = await pool.getConnection();
    logMessage('info', 'Conexão com o banco de dados estabelecida com sucesso');
    connection.release();
    
    // Criar usuário administrador inicial se não existir
    await createAdminUser();
    
    return pool;
  } catch (error) {
    logMessage('error', `Erro ao conectar ao banco de dados: ${error.message}`);
    throw new Error(`Erro ao conectar ao banco de dados: ${error.message}`);
  }
};

/**
 * Cria o usuário administrador inicial se não existir
 * @returns {Promise<void>}
 */
const createAdminUser = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        is_admin BOOLEAN DEFAULT TRUE,
        is_active BOOLEAN DEFAULT TRUE,
        deleted_at DATETIME DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`, true);
    const bcrypt = require('bcryptjs');
    
    // Verificar se o usuário administrador já existe
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', ['Jose_Sandonas']);
    
    if (rows.length === 0) {
      // Criar hash da senha
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Sky2!--haha', salt);
      
      // Inserir usuário administrador
      await pool.query(
        'INSERT INTO users (username, full_name, email, password, is_admin) VALUES (?, ?, ?, ?, ?)',
        ['Jose_Sandonas', 'Jose Sandonas', 'admin@saojoaoweb.com', hashedPassword, true]
      );
      
      logMessage('info', 'Usuário administrador criado com sucesso');
    }
  } catch (error) {
    logMessage('error', `Erro ao criar usuário administrador: ${error.message}`);
    throw new Error(`Erro ao criar usuário administrador: ${error.message}`);
  }
};

/**
 * Executa uma consulta SQL no banco de dados
 * @param {string} sql - Consulta SQL
 * @param {Array} params - Parâmetros da consulta
 * @returns {Promise<Array>} Resultado da consulta
 */
const query = async (sql, params = []) => {
  try {
    const [results] = await pool.query(sql, params);
    return results;
  } catch (error) {
    logMessage('error', `Erro na consulta SQL: ${error.message}`);
    // Não podemos passar objetos complexos para logMessage, mas registramos o erro básico
    console.error('Detalhes do erro SQL:', { sql, params });
    throw error;
  }
};

module.exports = {
  setupDatabase,
  query,
  pool
};
