/**
 * Conteúdo estático do livro digital "Banho de São João"
 * 
 * Este arquivo contém os metadados do livro que são utilizados na interface
 * do módulo Book da aplicação.
 */
export const bookContent = {
  // Metadados do livro - utilizados na exibição da capa e informações
  metadata: {
    title: 'Banho de São João',
    subtitle: 'Uma Tradição do Pantanal',
    coverImage: '/assets/images/book/1.jpg',
    description: 'A intenção do livro sempre foi a de contar, visualmente, a história dos elementos da manifestação festiva permeada por princípios religiosos, mostrando os ritos e os rituais, a devoção, a alegria e o ápice da festividade.',
    published: '2012',
    totalPages: 184,
    languages: 'Português, English, Español',
    authors: 'Hélènemarie Dias Fernandes',
    isbn: '978-85-7631-123-4'
  },
  
  // Informações de download do PDF para cada idioma
  pdfInfo: {
    pt: {
      filename: 'banho-de-sao-joao-pt.pdf',
      path: '/assets/pdf/livro_pt.pdf'
    },
    en: {
      filename: 'banho-de-sao-joao-en.pdf',
      path: '/assets/pdf/livro_en.pdf'
    },
    es: {
      filename: 'banho-de-sao-joao-es.pdf',
      path: '/assets/pdf/livro_es.pdf'
    }
  },
  
  // Informações para compartilhamento
  shareInfo: {
    title: 'Banho de São João - Uma Tradição do Pantanal',
    text: 'Conheça a rica tradição do Banho de São João no Pantanal brasileiro.'
  }
};
