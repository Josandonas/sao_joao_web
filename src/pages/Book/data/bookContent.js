import i18next from 'i18next';

/**
 * Conteúdo do livro digital "Banho de São João" baseado nas traduções
 * 
 * Este arquivo contém os metadados do livro que são utilizados na interface
 * do módulo Book da aplicação, obtidos a partir das chaves de tradução.
 */

// Função auxiliar para obter tradução
const getTranslation = (key, defaultValue = '') => {
  return i18next.t(key, defaultValue);
};

export const bookContent = {
  // Metadados do livro - utilizados na exibição da capa e informações
  metadata: {
    title: getTranslation('book.title'),
    subtitle: getTranslation('book.subtitle'),
    coverImage: '/assets/images/book/1.jpg',
    description: getTranslation('book.introduction'),
    published: '2012',
    totalPages: 184,
    languages: getTranslation('book.languages', 'Português, English, Español'),
    authors: getTranslation('book.authors','Hélène Maria Dias Fernandes'),
    isbn: '978-85-7631-123-4'
  },
  
  // Informações de download do PDF para cada idioma
  pdfInfo: {
    pt: {
      filename: getTranslation('book.pdfFileName', 'Livro_Banho_de_Sao_Joao') + '.pdf',
      path: '/assets/pdf/livro_pt.pdf'
    },
    en: {
      filename: getTranslation('book.pdfFileName', 'Saint_John_Bath_Book') + '.pdf',
      path: '/assets/pdf/livro_en.pdf'
    },
    es: {
      filename: getTranslation('book.pdfFileName', 'Libro_Bano_de_San_Juan') + '.pdf',
      path: '/assets/pdf/livro_es.pdf'
    }
  },
  
  // Informações para compartilhamento
  shareInfo: {
    title: `${getTranslation('book.title', 'Banho de São João')} - ${getTranslation('book.subtitle', 'Uma Tradição do Pantanal')}`,
    text: getTranslation('book.introduction', 'Conheça a rica tradição do Banho de São João no Pantanal brasileiro.')
  }
};
