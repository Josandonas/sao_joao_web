/**
 * Serviço de envio de emails
 */

const nodemailer = require('nodemailer');
const { query } = require('../config/database');
const { logger } = require('../utils/logger');

// Configuração do transportador de email
let transporter;

/**
 * Inicializa o transportador de email
 * @returns {Object} Transportador de email
 */
const initializeTransporter = () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  return transporter;
};

/**
 * Envia um email
 * @param {Object} options - Opções do email
 * @param {string} options.to - Destinatário
 * @param {string} options.subject - Assunto
 * @param {string} options.html - Conteúdo HTML
 * @returns {Promise<boolean>} Sucesso do envio
 */
const sendEmail = async (options) => {
  try {
    const emailTransporter = initializeTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    // Enviar email
    const info = await emailTransporter.sendMail(mailOptions);

    // Registrar no banco de dados
    await logEmailSent(options.to, options.subject, options.html, 'success');

    logger.info(`Email enviado: ${info.messageId}`);
    return true;
  } catch (error) {
    // Registrar erro no banco de dados
    await logEmailSent(options.to, options.subject, options.html, 'error', error.message);

    logger.error(`Erro ao enviar email: ${error.message}`, { error });
    return false;
  }
};

/**
 * Registra o envio de email no banco de dados
 * @param {string} recipient - Destinatário
 * @param {string} subject - Assunto
 * @param {string} content - Conteúdo
 * @param {string} status - Status do envio (success, error)
 * @param {string} errorMessage - Mensagem de erro (se houver)
 * @returns {Promise<void>}
 */
const logEmailSent = async (recipient, subject, content, status, errorMessage = null) => {
  try {
    await query(
      'INSERT INTO email_logs (recipient, subject, content, status, error_message) VALUES (?, ?, ?, ?, ?)',
      [recipient, subject, content, status, errorMessage]
    );
  } catch (error) {
    logger.error(`Erro ao registrar envio de email: ${error.message}`, { error });
  }
};

/**
 * Envia notificação diária para usuários não-administradores sobre novos dados
 * @param {Object} data - Dados para a notificação
 * @param {Array} data.modules - Módulos com novos dados
 * @param {Object} data.counts - Contagem de novos dados por módulo
 * @returns {Promise<boolean>} Sucesso do envio
 */
const sendDailyNotification = async (data) => {
  try {
    // Verificar se há novos dados
    const totalNewItems = Object.values(data.counts).reduce((sum, count) => sum + count, 0);
    if (totalNewItems === 0) {
      logger.info('Nenhum novo dado para notificar hoje.');
      return true;
    }

    // Buscar todos os usuários não-administradores
    const users = await query('SELECT id, email, full_name FROM users WHERE is_admin = 0');
    if (!users || users.length === 0) {
      logger.info('Nenhum usuário não-administrador para notificar.');
      return true;
    }

    // Construir o conteúdo do email
    const subject = `São João Web - Resumo de novos dados (${new Date().toLocaleDateString()})`;
    
    // Enviar email para cada usuário
    for (const user of users) {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Olá, ${user.full_name}!</h2>
          
          <p style="font-size: 16px; line-height: 1.5;">Temos novos dados no sistema São João Web hoje:</p>
          
          <ul style="font-size: 16px; line-height: 1.5;">
            ${data.modules.map(module => `
              <li><strong>${module.name}</strong>: ${data.counts[module.name]} ${data.counts[module.name] === 1 ? 'novo item' : 'novos itens'}</li>
            `).join('')}
          </ul>
          
          <p style="font-size: 16px; line-height: 1.5;">Total: <strong>${totalNewItems}</strong> ${totalNewItems === 1 ? 'novo item' : 'novos itens'}</p>
          
          <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">Acesse o painel administrativo para mais detalhes.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777;">
            <p>Este é um email automático. Por favor, não responda.</p>
          </div>
        </div>
      `;

      await sendEmail({
        to: user.email,
        subject,
        html
      });
    }

    logger.info(`Notificação diária enviada para ${users.length} usuários.`);
    return true;
  } catch (error) {
    logger.error(`Erro ao enviar notificação diária: ${error.message}`, { error });
    return false;
  }
};

/**
 * Busca os logs de emails enviados com paginação
 * @param {Object} options - Opções de busca
 * @param {number} options.page - Número da página
 * @param {number} options.limit - Limite de itens por página
 * @returns {Promise<Object>} Logs de emails e metadados de paginação
 */
const getEmailLogs = async ({ page = 1, limit = 10 } = {}) => {
  try {
    // Calcular offset
    const offset = (page - 1) * limit;

    // Buscar logs de emails
    const logs = await query(
      'SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    // Contar total de logs
    const [{ total }] = await query('SELECT COUNT(*) as total FROM email_logs');

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    logger.error(`Erro ao buscar logs de emails: ${error.message}`, { error });
    throw error;
  }
};

module.exports = {
  sendEmail,
  sendDailyNotification,
  getEmailLogs
};
