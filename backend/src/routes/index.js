/**
 * Configuração central de todas as rotas da API
 */

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const landingController = require('../controllers/landingController');
const { notFoundHandler } = require('../middlewares/errorHandler');
const { redirectToHome, protectPublicRoutes } = require('../middlewares/routeHandler');

/**
 * Configura todas as rotas da API no aplicativo Express
 * @param {Object} app - Instância do aplicativo Express
 */
const setupRoutes = (app) => {
  // Rotas do painel administrativo - devem ser montadas primeiro para garantir acesso ao dashboard
  app.use('/admin', adminRoutes);
  
  // Middleware para proteger rotas públicas de usuários já autenticados
  // Este middleware deve ser aplicado antes das rotas públicas
  app.use(protectPublicRoutes);
  
  // Rotas de autenticação - tanto API quanto web
  app.use('/', authRoutes);
  
  // Rota padrão da API
  app.get('/api', (req, res) => {
    res.json({ message: 'API do São João Web' });
  });
  
  // Rotas de depoimentos
  app.use('/api/testimonials', testimonialRoutes);
  
  // Rota raiz - exibir a landing page (deve ser montada por último para não interferir com outras rotas)
  app.get('/', landingController.renderLandingPage);
  
  // Middleware para redirecionar rotas não autenticadas para a página inicial
  // Deve ser aplicado depois de todas as rotas definidas
  app.use(redirectToHome);
  
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
