/**
 * Dados dos depoimentos
 * 
 * Os textos estão mantidos aqui para compatibilidade, mas na implementação final,
 * recomenda-se que todos os textos sejam movidos para os arquivos de tradução i18n
 * usando as chaves definidas nos componentes.
 * 
 * A estrutura de vídeos agora suporta diferentes idiomas (pt, en, es) para permitir
 * que o usuário assista aos depoimentos no idioma selecionado na aplicação.
 */
export const testimonialData = [
  {
    id: 1,
    name: 'Alfredo Tadeu Ortiz Ferraz',
    location: 'Corumbá, MS',
    image: '/assets/images/testimonials/persons/alfredo_tadeu.jpg',
    quoteKey: '1',
    quote: 'Minha família celebra o Banho de São João há cinco gerações. É uma tradição que nos conecta com nossos ancestrais e mantém viva nossa cultura pantaneira.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/alfredo-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/alfredo-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/alfredo-es.mp4'
    },
    category: 'traditions'
  },
  {
    id: 2,
    name: 'Bianca Machado',
    location: 'Ladário, MS',
    image: '/assets/images/testimonials/persons/bianca_machado.jpg',
    quoteKey: '2',
    quote: 'Como moradora ribeirinha, sempre tive uma relação especial com o rio. O Banho de São João é um momento de agradecer pela abundância que as águas nos proporcionam.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/bianca-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/bianca-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/bianca-es.mp4'
    },
    category: 'personal'
  },
  {
    id: 3,
    name: 'Eliane - Elinete Escobar',
    location: 'Porto Murtinho, MS',
    image: '/assets/images/testimonials/persons/eliane_escobar.jpg',
    quoteKey: '3',
    quote: 'Preservar as tradições do Banho de São João é preservar nossa identidade cultural. Nas celebrações, nossa música acompanha a procissão e as danças tradicionais.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/eliane-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/eliane-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/eliane-es.mp4'
    },
    category: 'cultural'
  },
  {
    id: 4,
    name: 'Epifania da Silva Bastos',
    location: 'Campo Grande, MS',
    image: '/assets/images/testimonials/persons/epifania.jpg',
    quoteKey: '4',
    quote: 'Como moradora antiga, encontro no Banho de São João um exemplo perfeito do sincretismo religioso e cultural que forma a identidade pantaneira brasileira.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/epifania-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/epifania-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/epifania-es.mp4'
    },
    category: 'traditions'
  },
  {
    id: 5,
    name: 'Fernando Vanucci',
    location: 'Aquidauana, MS',
    image: '/assets/images/testimonials/persons/fernando_vanucci.jpg',
    quoteKey: '5',
    quote: 'Fiz uma promessa a São João quando meu filho estava doente. Após sua recuperação, participamos todos os anos do ritual do banho, mantendo nosso compromisso com o santo.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/fernando-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/fernando-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/fernando-es.mp4'
    },
    category: 'faith'
  },
  {
    id: 6,
    name: 'Filhos de Bere',
    location: 'Corumbá, MS',
    image: '/assets/images/testimonials/persons/filhos_dona_bere.jpg',
    quoteKey: '6',
    quote: 'Nossa família preserva as canções e danças que celebram São João há gerações. A música é fundamental para transmitir essa herança cultural.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/filhasbere-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/filhasbere-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/filhasbere-es.mp4'
    },
    category: 'cultural'
  },
  {
    id: 7,
    name: 'Idalina Idalina Gonçalves da Silva',
    location: 'Coxim, MS',
    image: '/assets/images/testimonials/persons/idalina_goncalves.jpg',
    quoteKey: '7',
    quote: 'Minha avó era curandeira e utilizava as ervas e a água benta de São João em seus tratamentos. Aprendi com ela o valor medicinal e espiritual dessa tradição.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/idalina-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/idalina-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/idalina-es.mp4'
    },
    category: 'traditions'
  },
  {
    id: 8,
    name: 'Izabel Meira de Castro',
    location: 'Miranda, MS',
    image: '/assets/images/testimonials/persons/izabel_meira.jpg',
    quoteKey: '8',
    quote: 'Como benzedeira, utilizo as ervas abenaçoadas durante a festa de São João. A água coletada nessa noite é considerada mítica e curativa.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/izabel-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/izabel-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/izabel-es.mp4'
    },
    category: 'faith'
  },
  {
    id: 9,
    name: 'Janete Tinoco',
    location: 'Corumbá, MS',
    image: '/assets/images/testimonials/persons/janete_tinoco.jpg',
    quoteKey: '9',
    quote: 'Organizo a festa há mais de 20 anos e vejo como ela se transformou mantendo sua essência. É gratificante ver os jovens se interessando por nossas tradições.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/janete-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/janete-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/janete-es.mp4'
    },
    category: 'traditions'
  },
  {
    id: 10,
    name: 'Joaquina Pereira',
    location: 'Poconé, MT',
    image: '/assets/images/testimonials/persons/joaquina_pereira.jpg',
    quoteKey: '10',
    quote: 'Na minha comunidade, as celebrações do Banho de São João conectam as pessoas e fortalecem nossos laços. É uma manifestação cultural que nos une como povo.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/joaquina-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/joaquina-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/joaquina-es.mp4'
    },
    category: 'cultural'
  },
  {
    id: 11,
    name: 'Luís Martins',
    location: 'Corumbá, MS',
    image: '/assets/images/testimonials/persons/luis_martins.jpg',
    quoteKey: '11',
    quote: 'Como pescador, tenho uma relação especial com São João e com as águas do Pantanal. O banho é um momento de renovação e agradecimento pela fartura.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/luisao-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/luisao-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/luisao-es.mp4'
    },
    category: 'faith'
  },
  {
    id: 12,
    name: 'Lucila Lucila Alvarez de Souza',
    location: 'Aquidauana, MS',
    image: '/assets/images/testimonials/persons/lucila_alvarez.jpg',
    quoteKey: '12',
    quote: 'Na minha família, a festa é um momento de reunião e agradecimento. Preparamos comidas típicas e recebemos vizinhos para celebrar juntos essa tradição.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/lucila-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/lucila-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/lucila-es.mp4'
    },
    category: 'personal'
  },
  {
    id: 13,
    name: 'Manoel Fernandes',
    location: 'Porto Murtinho, MS',
    image: '/assets/images/testimonials/persons/manoel.jpg',
    quoteKey: '13',
    quote: 'Como músico, vejo na celebração do Banho de São João uma riqueza cultural única, onde ritmos tradicionais preservam nossa memória coletiva.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/manoel-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/manoel-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/manoel-es.mp4'
    },
    category: 'cultural'
  },
  {
    id: 14,
    name: 'Maria Paula da Silva',
    location: 'Campo Grande, MS',
    image: '/assets/images/testimonials/persons/maria_paula.jpg',
    quoteKey: '14',
    quote: 'Estudo as tradições do Banho de São João como parte da minha pesquisa. É impressionante como essa prática conecta elementos indígenas, europeus e africanos.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/mariapaula-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/mariapaula-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/mariapaula-es.mp4'
    },
    category: 'academic'
  },
  {
    id: 15,
    name: 'Marinete Luiz Cavalcanti',
    location: 'Miranda, MS',
    image: '/assets/images/testimonials/persons/marinete_luiz.jpg',
    quoteKey: '15',
    quote: 'Aprendi a preparar as ervas e os elementos do altar com minha avó. Cada planta tem um significado e um propósito na celebração.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/marinete-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/marinete-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/marinete-es.mp4'
    },
    category: 'traditions'
  },
  {
    id: 16,
    name: 'Oraide Teodora',
    location: 'Nioaque, MS',
    image: '/assets/images/testimonials/persons/horaide.jpg',
    quoteKey: '16',
    quote: 'Preparo o altar de São João todos os anos seguindo exatamente os ensinamentos que recebi da minha mãe. Cada elemento tem um significado especial na tradição.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/horaide-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/horaide-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/horaide-es.mp4'
    },
    category: 'traditions'
  },
  {
    id: 17,
    name: 'Pedro Paulo Miranda',
    location: 'Ladário, MS',
    image: '/assets/images/testimonials/persons/pedro_paulo.jpg',
    quoteKey: '17',
    quote: 'Minha experiência com o Banho de São João começou quando fiz uma promessa pela saúde do meu pai. Desde então, é uma prática anual de gratidão.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/pepe-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/pepe-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/pepe-es.mp4'
    },
    category: 'faith'
  },
  {
    id: 18,
    name: 'Reginalda Mendes',
    location: 'Miranda, MS',
    image: '/assets/images/testimonials/persons/reginalda_mendes.jpg',
    quoteKey: '18',
    quote: 'Participo ativamente das festividades de São João desde criança. As tradições do Arraiá Nhá Concha são parte fundamental da nossa identidade cultural.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/reginalda-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/reginalda-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/reginalda-es.mp4'
    },
    category: 'traditions'
  },
  {
    id: 19,
    name: 'Roberto Carlos da Silva',
    location: 'Aquidauana, MS',
    image: '/assets/images/testimonials/persons/roberto_carlos.jpg',
    quoteKey: '19',
    quote: 'Como artesão, crio peças inspiradas nas simbologias do Banho de São João. É uma forma de manter viva essa expressão cultural tão rica e diversa.',
    videos: {
      pt: '/assets/videos/testimonials/depoimentos_pt/roberto-pt.mp4',
      en: '/assets/videos/testimonials/depoimentos_en/roberto-en.mp4',
      es: '/assets/videos/testimonials/depoimentos_es/roberto-es.mp4'
    },
    category: 'cultural'
  }
];

/**
 * Categorias disponíveis para filtro
 * 
 * As labels são mantidas aqui para fallback, mas na implementação completa devem ser
 * carregadas do sistema de tradução usando as respectivas chaves i18n.
 * 
 * Chaves de tradução:
 * testimonials.categories.all
 * testimonials.categories.personal
 * testimonials.categories.traditions
 * testimonials.categories.cultural
 * testimonials.categories.faith
 * testimonials.categories.academic
 */
export const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'personal', label: 'Histórias Pessoais' },
  { id: 'traditions', label: 'Tradições' },
  { id: 'cultural', label: 'Manifestações Culturais' },
  { id: 'faith', label: 'Fé e Devoção' },
  { id: 'academic', label: 'Pesquisadores' }
];
