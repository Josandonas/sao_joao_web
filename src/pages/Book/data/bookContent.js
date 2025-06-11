// Conteúdo estático do livro
export const bookContent = {
  // Metadados do livro
  metadata: {
    title: 'Banho de São João',
    subtitle: 'Uma Tradição do Pantanal',
    coverImage: '/assets/images/book/1.jpg',
    description: 'Este livro documenta a rica tradição do Banho de São João no Pantanal brasileiro, explorando suas origens históricas, rituais, música, dança e importância cultural para as comunidades locais.',
    published: '2011',
    totalPages: 184, // Número total de páginas baseado nas imagens disponíveis
    languages: 'Português, English, Español',
    authors: 'Secretaria de Cultura de Corumbá',
    isbn: '978-85-7631-123-4'
  },
  // Função para gerar páginas baseadas no idioma
  getBookPages: (lang) => {
    // Define o prefixo do caminho das imagens baseado no idioma
    let pathPrefix = '/assets/images/book/livro_pt/';
    
    switch(lang) {
      case 'en':
        pathPrefix = '/assets/images/book/livro_en/';
        break;
      case 'es':
        pathPrefix = '/assets/images/book/livro_es/';
        break;
      case 'pt':
      default:
        pathPrefix = '/assets/images/book/livro_pt/';
        break;
    }
    
    // Gera um array com todas as páginas do livro
    const pages = [];
    for (let i = 1; i <= 184; i++) {
      pages.push({
        id: i,
        pageNumber: i,
        image: `${pathPrefix}${i}.jpg`
      });
    }
    
    return pages;
  },
  // Capítulos do livro (mantidos para compatibilidade com a navegação por capítulos)
  chapters: [
  {
    id: 1,
    chapter: 'Capa',
    title: 'Banho de São João',
    pageNumber: 1
  },
  {
    id: 2,
    chapter: 'Introdução',
    title: 'Introdução',
    pageNumber: 5
  },
  {
    id: 3,
    chapter: 'Capítulo 1',
    title: 'História e Origens',
    pageNumber: 15
  },
  {
    id: 4,
    chapter: 'Capítulo 2',
    title: 'Rituais e Celebrações',
    pageNumber: 40
  },
  {
    id: 5,
    chapter: 'Capítulo 3',
    title: 'Música e Dança',
    pageNumber: 70
  },
  {
    id: 6,
    chapter: 'Capítulo 4',
    title: 'Gastronomia',
    pageNumber: 100
  },
  {
    id: 7,
    chapter: 'Capítulo 5',
    title: 'Comunidades',
    pageNumber: 130
  },
  {
    id: 8,
    chapter: 'Capítulo 6',
    title: 'Patrimônio Cultural',
    pageNumber: 160
  },
  {
    id: 9,
    chapter: 'Conclusão',
    title: 'Conclusão e Agradecimentos',
    pageNumber: 180
  }
  ]
};
