/**
 * Configuração central de todas as rotas da API
 */

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const { notFoundHandler } = require('../middlewares/errorHandler');

/**
 * Configura todas as rotas da API no aplicativo Express
 * @param {Object} app - Instância do aplicativo Express
 */
const setupRoutes = (app) => {
  // Rotas de autenticação
  app.use('/api/auth', authRoutes);
  
  // Rotas de depoimentos
  app.use('/api/testimonials', testimonialRoutes);
  
  // Rotas do painel administrativo
  app.use('/admin', adminRoutes);
  
  // Rota padrão da API
  app.get('/api', (req, res) => {
    res.json({ message: 'API do São João Web' });
  });
  
  // Rota raiz - redirecionar para o painel administrativo
  app.get('/', (req, res) => {
    res.redirect('/admin');
  });
  
  // Adicionar outras rotas aqui conforme forem criadas
  // app.use('/api/postcards', postcardRoutes);
  // app.use('/api/biblioteca', bibliotecaRoutes);
  // app.use('/api/galeria', galeriaRoutes);
  // app.use('/api/book', bookRoutes);
  // app.use('/api/communities', communitiesRoutes);
  // app.use('/api/stories', storiesRoutes);
  // app.use('/api/programacao', programacaoRoutes);
  // app.use('/api/video', videoRoutes);
  // app.use('/api/hero', heroRoutes);
  
  // Middleware para rotas não encontradas (404)
  app.use(notFoundHandler);
};

module.exports = {
  setupRoutes
};
