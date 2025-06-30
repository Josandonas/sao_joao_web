/**
 * Configuração de variáveis de ambiente
 * Este arquivo garante que as variáveis de ambiente necessárias estejam definidas
 */

// Verificar e definir variáveis de ambiente essenciais
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'sao_joao_web_secret_key_2025';
  console.log('JWT_SECRET não encontrado no ambiente, usando valor padrão (apenas para desenvolvimento)');
}

// Definir tempo de expiração do JWT
if (!process.env.JWT_EXPIRATION) {
  process.env.JWT_EXPIRATION = '1d'; // 1 dia
  console.log('JWT_EXPIRATION não encontrado no ambiente, usando valor padrão de 1 dia');
}

// Outras variáveis de ambiente essenciais
if (!process.env.SESSION_SECRET) {
  process.env.SESSION_SECRET = 'sao_joao_web_session_secret_2025';
  console.log('SESSION_SECRET não encontrado no ambiente, usando valor padrão (apenas para desenvolvimento)');
}

// Configurações de cookie
if (!process.env.COOKIE_SECRET) {
  process.env.COOKIE_SECRET = 'sao_joao_web_cookie_secret_2025';
  console.log('COOKIE_SECRET não encontrado no ambiente, usando valor padrão (apenas para desenvolvimento)');
}

module.exports = {
  checkEnvVariables: () => {
    const requiredVars = ['JWT_SECRET', 'SESSION_SECRET', 'COOKIE_SECRET'];
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      console.warn(`Atenção: As seguintes variáveis de ambiente não estão definidas: ${missing.join(', ')}`);
      return false;
    }
    
    return true;
  }
};
