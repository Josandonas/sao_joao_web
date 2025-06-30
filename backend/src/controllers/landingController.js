/**
 * Controlador para a landing page
 */

/**
 * Renderiza a página inicial (landing page)
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 */
const renderLandingPage = (req, res) => {
  res.render('landing/index', {
    layout: 'layouts/landing',
    pageTitle: 'Bem-vindo'
  });
};

module.exports = {
  renderLandingPage
};
