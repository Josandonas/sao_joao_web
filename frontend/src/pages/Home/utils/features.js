/**
 * Gera a configuração de recursos/features da página Home com base no idioma atual
 * @param {string} lang - Código do idioma atual
 * @param {function} t - Função de tradução do i18n
 * @returns {Array} Array de objetos de recursos/features
 */
export const generateFeatures = (lang, t) => {
  return [
    {
      id: 'stories',
      iconType: 'BsBookHalf',
      title: t('navigation.stories'),
      description: t('home.features.stories') || 'Conheça histórias e lendas sobre as tradições de São João.',
      link: `/${lang}/stories`
    },
    {
      id: 'communities',
      iconType: 'FaPeopleGroup',
      title: t('navigation.communities'),
      description: t('home.features.communities') || 'Descubra as comunidades que preservam as tradições do Banho de São João.',
      link: `/${lang}/communities`
    },
    {
      id: 'book',
      iconType: 'IoBook',
      title: t('navigation.book'),
      description: t('home.features.book') || 'Acesse o livro digital com conteúdo sobre o Banho de São João.',
      link: `/${lang}/book`
    },
    {
      id: 'testimonials',
      iconType: 'BsChatQuote',
      title: t('navigation.testimonials'),
      description: t('home.features.testimonials') || 'Leia depoimentos de pessoas que vivenciam o Banho de São João.',
      link: `/${lang}/testimonials`
    },
    {
      id: 'postcards',
      iconType: 'IoMail',
      title: t('navigation.postcards'),
      description: t('home.features.postcards') || 'Envie um cartão postal virtual para seus amigos.',
      link: `/${lang}/postcards`
    }
  ];
};
