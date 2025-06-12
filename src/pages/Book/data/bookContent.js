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
  // Capítulos do livro ajustados para corresponder às páginas reais do PDF
  // Usando chaves de tradução para suportar múltiplos idiomas
  chapters: [
  {
    id: 1,
    chapter: 'book.cover',
    title: 'book.title',
    pageNumber: 1  // Capa
  },
  {
    id: 2,
    chapter: 'book.introductionChapter',
    title: 'book.introductionChapter',
    pageNumber: 5  // Introdução
  },
  {
    id: 3,
    chapter: 'book.chapter1',
    title: 'book.chapter1Title',
    pageNumber: 15  // História e Origens
  },
  {
    id: 4,
    chapter: 'book.chapter2',
    title: 'book.chapter2Title',
    pageNumber: 25  // Rituais e Celebrações - ajustado
  },
  {
    id: 5,
    chapter: 'book.chapter3',
    title: 'book.chapter3Title',
    pageNumber: 45  // Música e Dança - ajustado
  },
  {
    id: 6,
    chapter: 'book.chapter4',
    title: 'book.chapter4Title',
    pageNumber: 65  // Gastronomia - ajustado
  },
  {
    id: 7,
    chapter: 'book.chapter5',
    title: 'book.chapter5Title',
    pageNumber: 75  // Comunidades - ajustado
  },
  {
    id: 8,
    chapter: 'book.chapter6',
    title: 'book.chapter6Title',
    pageNumber: 85  // Patrimônio Cultural - ajustado
  },
  {
    id: 9,
    chapter: 'book.conclusion',
    title: 'book.conclusionTitle',
    pageNumber: 90  // Conclusão e Agradecimentos - ajustado
  }
  ]
};
