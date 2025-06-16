const bibliotecaData = [
  {
    id: 'biblioteca-municipal',
    category: 'cultural',
    iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.6982775332166!2d-57.6536400000000!3d-18.9957390000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9387a1e89c8c8c8d%3A0xb8a5e5e5e5e5e5e5!2sBiblioteca%20Municipal%20Lobivar%20Matos!5e0!3m2!1spt-BR!2sbr!4v1623456789012!5m2!1spt-BR!2sbr',
    address: 'Rua Antônio Maria Coelho, 1000 - Centro, Corumbá - MS, 79301-002',
    phone: '(67) 3234-3400',
    hours: 'Segunda a Sexta: 8h às 17h',
    location: 'Corumbá, MS',
    translations: {
      pt: {
        title: 'Biblioteca Municipal Lobivar Matos',
        description: 'A Biblioteca Municipal Lobivar Matos é um importante centro de pesquisa e conhecimento em Corumbá, que mantém um acervo especial sobre o Banho de São João e outras manifestações culturais da região pantaneira.',
        additionalInfo: 'A biblioteca leva o nome do poeta corumbaense Lobivar Matos e oferece acesso a livros, documentos históricos e materiais audiovisuais relacionados às tradições locais.'
      },
      en: {
        title: 'Lobivar Matos Municipal Library',
        description: 'The Lobivar Matos Municipal Library is an important research and knowledge center in Corumbá, which maintains a special collection about St. John\'s Bath and other cultural manifestations of the Pantanal region.',
        additionalInfo: 'The library is named after the poet Lobivar Matos from Corumbá and offers access to books, historical documents, and audiovisual materials related to local traditions.'
      },
      es: {
        title: 'Biblioteca Municipal Lobivar Matos',
        description: 'La Biblioteca Municipal Lobivar Matos es un importante centro de investigación y conocimiento en Corumbá, que mantiene una colección especial sobre el Baño de San Juan y otras manifestaciones culturales de la región del Pantanal.',
        additionalInfo: 'La biblioteca lleva el nombre del poeta corumbaense Lobivar Matos y ofrece acceso a libros, documentos históricos y materiales audiovisuales relacionados con las tradiciones locales.'
      }
    }
  },
  {
    id: 'biblioteca-campus-pantanal',
    category: 'cultural',
    iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.7123456789012!2d-57.654321!3d-18.987654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9387a0a8c8c9b0d7%3A0xa1b2c3d4e5f6a7b8!2sBiblioteca%20Campus%20do%20Pantanal%20UFMS!5e0!3m2!1spt-BR!2sbr!4v1623456789012!5m2!1spt-BR!2sbr',
    address: 'Av. Rio Branco, 1270 - Universitário, Corumbá - MS, 79304-902',
    phone: '(67) 3234-6813',
    hours: 'Segunda a Sexta: 7h às 21h',
    location: 'Corumbá, MS',
    translations: {
      pt: {
        title: 'Biblioteca Câmpus do Pantanal',
        description: 'A Biblioteca do Câmpus do Pantanal da Universidade Federal de Mato Grosso do Sul (UFMS) possui um acervo especializado com teses, dissertações e publicações acadêmicas sobre o Banho de São João e o patrimônio cultural imaterial da região.',
        additionalInfo: 'Além do acervo físico, a biblioteca oferece acesso a bases de dados digitais e periódicos científicos que abordam as manifestações culturais pantaneiras.'
      },
      en: {
        title: 'Pantanal Campus Library',
        description: 'The Library of the Pantanal Campus of the Federal University of Mato Grosso do Sul (UFMS) has a specialized collection with theses, dissertations, and academic publications about St. John\'s Bath and the intangible cultural heritage of the region.',
        additionalInfo: 'In addition to the physical collection, the library offers access to digital databases and scientific journals that address the cultural manifestations of the Pantanal.'
      },
      es: {
        title: 'Biblioteca Campus del Pantanal',
        description: 'La Biblioteca del Campus del Pantanal de la Universidad Federal de Mato Grosso do Sul (UFMS) cuenta con una colección especializada de tesis, disertaciones y publicaciones académicas sobre el Baño de San Juan y el patrimonio cultural inmaterial de la región.',
        additionalInfo: 'Además de la colección física, la biblioteca ofrece acceso a bases de datos digitales y revistas científicas que abordan las manifestaciones culturales del Pantanal.'
      }
    }
  },
  {
    id: 'iphan-dossie',
    category: 'historical',
    iframeUrl: 'https://docs.google.com/viewer?url=https://bcr.iphan.gov.br/wp-content/uploads/tainacan-items/65968/66541/Banho-de-Sao-Joao_de_Dossie_de_Registro_Banho_de_SJ_Corumba_e_Ladario_.pdf&embedded=true',
    website: 'https://bcr.iphan.gov.br/wp-content/uploads/tainacan-items/65968/66541/Banho-de-Sao-Joao_de_Dossie_de_Registro_Banho_de_SJ_Corumba_e_Ladario_.pdf',
    location: 'Corumbá, MS',
    translations: {
      pt: {
        title: 'Dossiê de Registro: Banho de São João de Corumbá e Ladário',
        description: 'Documento oficial do IPHAN que apresenta o processo de registro do Banho de São João como Patrimônio Cultural Imaterial Brasileiro. Contém pesquisa histórica, etnográfica e cultural sobre a celebração.',
        additionalInfo: 'Elaborado pelo Instituto do Patrimônio Histórico e Artístico Nacional (IPHAN) como parte do processo de patrimonialização da festa.'
      },
      en: {
        title: 'Registration Dossier: St. John\'s Bath of Corumbá and Ladário',
        description: 'Official IPHAN document presenting the registration process of St. John\'s Bath as Brazilian Intangible Cultural Heritage. Contains historical, ethnographic and cultural research about the celebration.',
        additionalInfo: 'Prepared by the National Historical and Artistic Heritage Institute (IPHAN) as part of the heritage recognition process of the festival.'
      },
      es: {
        title: 'Expediente de Registro: Baño de San Juan de Corumbá y Ladário',
        description: 'Documento oficial del IPHAN que presenta el proceso de registro del Baño de San Juan como Patrimonio Cultural Inmaterial Brasileño. Contiene investigación histórica, etnográfica y cultural sobre la celebración.',
        additionalInfo: 'Elaborado por el Instituto del Patrimonio Histórico y Artístico Nacional (IPHAN) como parte del proceso de patrimonialización de la fiesta.'
      }
    }
  },
  {
    id: 'ufms-banho-sao-joao',
    category: 'historical',
    iframeUrl: 'https://docs.google.com/viewer?url=https://cpan.ufms.br/files/2024/06/UFMS-banho-de-sao-joao-1_compressed-1.pdf&embedded=true',
    website: 'https://cpan.ufms.br/files/2024/06/UFMS-banho-de-sao-joao-1_compressed-1.pdf',
    location: 'Corumbá, MS',
    translations: {
      pt: {
        title: 'Pesquisa UFMS: Banho de São João',
        description: 'Estudo acadêmico realizado pela Universidade Federal de Mato Grosso do Sul sobre as tradições e práticas culturais associadas ao Banho de São João em Corumbá.',
        additionalInfo: 'Documento produzido pelo Campus do Pantanal (CPAN) da UFMS, contendo análises antropológicas e históricas sobre a celebração.'
      },
      en: {
        title: 'UFMS Research: St. John\'s Bath',
        description: 'Academic study conducted by the Federal University of Mato Grosso do Sul on the traditions and cultural practices associated with St. John\'s Bath in Corumbá.',
        additionalInfo: 'Document produced by the Pantanal Campus (CPAN) of UFMS, containing anthropological and historical analyses of the celebration.'
      },
      es: {
        title: 'Investigación UFMS: Baño de San Juan',
        description: 'Estudio académico realizado por la Universidad Federal de Mato Grosso do Sul sobre las tradiciones y prácticas culturales asociadas al Baño de San Juan en Corumbá.',
        additionalInfo: 'Documento producido por el Campus del Pantanal (CPAN) de la UFMS, que contiene análisis antropológicos e históricos sobre la celebración.'
      }
    }
  },
  {
    id: 'scielo-artigo',
    category: 'historical',
    iframeUrl: 'https://www.scielo.br/j/rbh/a/DdrtM9F8FNZKRPchwVMc3Yj/?lang=pt',
    website: 'https://www.scielo.br/j/rbh/a/DdrtM9F8FNZKRPchwVMc3Yj/?lang=pt',
    location: 'Corumbá, MS',
    translations: {
      pt: {
        title: 'Artigo Científico: Banho de São João na Revista Brasileira de História',
        description: 'Artigo acadêmico publicado na Revista Brasileira de História que analisa os aspectos históricos, sociais e culturais da celebração do Banho de São João em Corumbá.',
        additionalInfo: 'Publicação científica revisada por pares, disponível na plataforma SciELO (Scientific Electronic Library Online).'
      },
      en: {
        title: 'Scientific Article: St. John\'s Bath in the Brazilian Journal of History',
        description: 'Academic article published in the Brazilian Journal of History that analyzes the historical, social, and cultural aspects of the St. John\'s Bath celebration in Corumbá.',
        additionalInfo: 'Peer-reviewed scientific publication, available on the SciELO platform (Scientific Electronic Library Online).'
      },
      es: {
        title: 'Artículo Científico: Baño de San Juan en la Revista Brasileña de Historia',
        description: 'Artículo académico publicado en la Revista Brasileña de Historia que analiza los aspectos históricos, sociales y culturales de la celebración del Baño de San Juan en Corumbá.',
        additionalInfo: 'Publicación científica revisada por pares, disponible en la plataforma SciELO (Scientific Electronic Library Online).'
      }
    }
  },
  {
    id: 'museu-muphan',
    category: 'cultural',
    iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.6982775332166!2d-57.65364!3d-18.995739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9387a0a8c8c9b0d7%3A0xb8a5e5e5e5e5e5e5!2sMuseu%20do%20Pantanal!5e0!3m2!1spt-BR!2sbr!4v1623456789012!5m2!1spt-BR!2sbr',
    address: 'Rua Delamare, 1284 - Centro, Corumbá - MS, 79301-020',
    phone: '(67) 3234-1000',
    hours: 'Terça a Domingo: 9h às 17h',
    location: 'Corumbá, MS',
    translations: {
      pt: {
        title: 'Museu Muphan',
        description: 'O Museu do Pantanal (Muphan) é um importante centro cultural que preserva e divulga a história e a cultura pantaneira, incluindo exposições sobre o Banho de São João e outras tradições locais.',
        additionalInfo: 'O museu está instalado no antigo Porto Geral de Corumbá, um prédio histórico restaurado que data do século XIX.'
      },
      en: {
        title: 'Muphan Museum',
        description: 'The Pantanal Museum (Muphan) is an important cultural center that preserves and promotes the history and culture of the Pantanal region, including exhibitions about St. John\'s Bath and other local traditions.',
        additionalInfo: 'The museum is housed in the former General Port of Corumbá, a restored historic building dating from the 19th century.'
      },
      es: {
        title: 'Museo Muphan',
        description: 'El Museo del Pantanal (Muphan) es un importante centro cultural que preserva y difunde la historia y la cultura pantanera, incluyendo exposiciones sobre el Baño de San Juan y otras tradiciones locales.',
        additionalInfo: 'El museo está instalado en el antiguo Puerto General de Corumbá, un edificio histórico restaurado que data del siglo XIX.'
      }
    }
  },
  {
    id: 'casa-dr-gabi',
    category: 'cultural',
    iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.7123456789012!2d-57.654321!3d-18.987654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9387a0a8c8c9b0d7%3A0xa1b2c3d4e5f6a7b8!2sMuseu%20Casa%20do%20Dr.%20Gabi!5e0!3m2!1spt-BR!2sbr!4v1623456789012!5m2!1spt-BR!2sbr',
    address: 'Rua Antônio Maria Coelho, 355 - Centro, Corumbá - MS, 79301-002',
    phone: '(67) 3232-5892',
    hours: 'Segunda a Sexta: 8h às 17h',
    location: 'Corumbá, MS',
    translations: {
      pt: {
        title: 'Museu Casa do Dr. Gabi',
        description: 'A Casa do Dr. Gabi é um museu histórico instalado na antiga residência do médico Gabriel Vandoni de Barros, figura importante na história de Corumbá. O espaço preserva documentos e objetos relacionados à cultura local, incluindo registros sobre o Banho de São João.',
        additionalInfo: 'O casarão foi construído em 1920 e mantém características arquitetônicas originais, sendo um importante exemplo do patrimônio histórico da cidade.'
      },
      en: {
        title: 'Dr. Gabi House Museum',
        description: 'Dr. Gabi\'s House is a historical museum installed in the former residence of physician Gabriel Vandoni de Barros, an important figure in Corumbá\'s history. The space preserves documents and objects related to local culture, including records about St. John\'s Bath.',
        additionalInfo: 'The mansion was built in 1920 and maintains original architectural features, being an important example of the city\'s historical heritage.'
      },
      es: {
        title: 'Museo Casa del Dr. Gabi',
        description: 'La Casa del Dr. Gabi es un museo histórico instalado en la antigua residencia del médico Gabriel Vandoni de Barros, figura importante en la historia de Corumbá. El espacio preserva documentos y objetos relacionados con la cultura local, incluidos registros sobre el Baño de San Juan.',
        additionalInfo: 'La mansión fue construida en 1920 y mantiene características arquitectónicas originales, siendo un importante ejemplo del patrimonio histórico de la ciudad.'
      }
    }
  },
  {
    id: 'instituto-luis-de-albuquerque',
    category: 'historical',
    iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.7234567890123!2d-57.651234!3d-18.976543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9387a0a8c8c9b0d7%3A0x1a2b3c4d5e6f7a8b!2sInstituto%20Lu%C3%ADs%20de%20Albuquerque!5e0!3m2!1spt-BR!2sbr!4v1623456789012!5m2!1spt-BR!2sbr',
    address: 'Rua Manoel Cavassa, 275 - Porto Geral, Corumbá - MS, 79301-130',
    phone: '(67) 3231-9426',
    hours: 'Segunda a Sexta: 8h às 17h',
    location: 'Corumbá, MS',
    translations: {
      pt: {
        title: 'Instituto Luís de Albuquerque',
        description: 'O Instituto Luís de Albuquerque é um centro de pesquisa e documentação histórica que mantém um importante acervo sobre a história e cultura de Corumbá, incluindo documentos, fotografias e registros sobre o Banho de São João ao longo dos anos.',
        additionalInfo: 'O instituto leva o nome do fundador da cidade de Corumbá, Luís de Albuquerque de Melo Pereira e Cáceres, e promove atividades de preservação da memória cultural da região.'
      },
      en: {
        title: 'Luís de Albuquerque Institute',
        description: 'The Luís de Albuquerque Institute is a research and historical documentation center that maintains an important collection on the history and culture of Corumbá, including documents, photographs, and records about St. John\'s Bath throughout the years.',
        additionalInfo: 'The institute is named after the founder of the city of Corumbá, Luís de Albuquerque de Melo Pereira e Cáceres, and promotes activities to preserve the cultural memory of the region.'
      },
      es: {
        title: 'Instituto Luís de Albuquerque',
        description: 'El Instituto Luís de Albuquerque es un centro de investigación y documentación histórica que mantiene una importante colección sobre la historia y cultura de Corumbá, incluyendo documentos, fotografías y registros sobre el Baño de San Juan a lo largo de los años.',
        additionalInfo: 'El instituto lleva el nombre del fundador de la ciudad de Corumbá, Luís de Albuquerque de Melo Pereira e Cáceres, y promueve actividades de preservación de la memoria cultural de la región.'
      }
    }
  }
];

export default bibliotecaData;
