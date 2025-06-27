/**
 * Script de diagnóstico para identificar problemas de inicialização
 */

require('dotenv').config();
const path = require('path');

// Função para testar cada componente separadamente
async function runDiagnostics() {
  console.log('=== INICIANDO DIAGNÓSTICO ===');
  
  try {
    // 1. Testar importação do database
    console.log('\n1. Testando importação do módulo database...');
    const database = require('./src/config/database');
    console.log('✓ Módulo database importado com sucesso');
    
    // 2. Testar configuração do banco de dados
    console.log('\n2. Testando configuração do banco de dados...');
    await database.setupDatabase();
    console.log('✓ Banco de dados configurado com sucesso');
    
    // 3. Testar importação do initDb
    console.log('\n3. Testando importação do módulo initDb...');
    const { initializeDatabase } = require('./src/config/initDb');
    console.log('✓ Módulo initDb importado com sucesso');
    
    // 4. Testar inicialização do banco de dados
    console.log('\n4. Testando inicialização do banco de dados...');
    try {
      await initializeDatabase();
      console.log('✓ Banco de dados inicializado com sucesso');
    } catch (error) {
      console.error('✗ ERRO AO INICIALIZAR O BANCO DE DADOS:');
      console.error(error);
      console.error('Stack trace completo:');
      console.error(error.stack);
    }
    
    console.log('\n=== DIAGNÓSTICO CONCLUÍDO ===');
    console.log('Se todos os passos foram bem-sucedidos, o problema pode estar em outro componente.');
    
  } catch (error) {
    console.error('\n=== DIAGNÓSTICO FALHOU ===');
    console.error('Erro:', error.message);
    console.error('Stack trace completo:');
    console.error(error.stack);
  }
}

// Executar diagnóstico
runDiagnostics().catch(console.error);
