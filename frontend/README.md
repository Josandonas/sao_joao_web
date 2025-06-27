# Banho de São João - Web Application

## Sobre o Projeto

Esta é uma aplicação web moderna que documenta as tradições culturais do Banho de São João na região do Pantanal Sul-Matogrossense. O projeto migra e moderniza o antigo aplicativo originalmente desenvolvido como aplicação portátil baseada no Firefox Portable, preservando seu conteúdo e funcionalidades, mas utilizando tecnologias web modernas e princípios de clean code. A aplicação é completamente multilíngue, com suporte a Português, Inglês e Espanhol.

## Requisitos e Dependências

### Requisitos de Sistema
- **Node.js**: 16.x até 22.x (testado até 22.14.0 no Windows)
- **npm**: 7.x+ ou yarn 1.22.x+
- **Navegadores**: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **Sistema Operacional**: Windows 10/11, macOS 10.15+, Ubuntu 20.04+

### Principais Dependências
- **Frontend**: React 18.2.0, React Router 6.15.0, Bootstrap 5.3.7, Styled Components 6.0.7
- **Internacionalização**: i18next 23.4.4, React i18next 13.0.3
- **UI/UX**: React Bootstrap 2.10.10, React Icons 5.5.0, React Image Gallery 1.4.0
- **Mapas e Mídia**: Leaflet/React Leaflet 1.9.4/4.2.1, Video React 0.16.0
- **Dados**: Axios 1.10.0
- **Desenvolvimento**: Vite 4.4.9, ESLint 8.47.0

### Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/Prefeitura-de-CorumbaMS/sao_joao_web.git
cd sao_joao_web

# Instale as dependências
npm install
# ou
yarn install

# Execute o projeto em modo de desenvolvimento
npm run dev
# ou
yarn dev

# Acesse a aplicação em seu navegador
# http://localhost:3000
```

### Construção para Produção

```bash
# Gere a build de produção
npm run build
# ou
yarn build

# Visualize a versão de produção localmente
npm run preview
# ou
yarn preview
```

## Arquitetura e Tecnologias

### Stack Principal
- **Frontend**: React 18 com arquitetura de componentes e hooks
- **Roteamento**: React Router 6 com suporte a rotas parametrizadas por idioma
- **Estilização**: Styled Components para CSS-in-JS e Bootstrap para componentes base
- **Internacionalização**: React i18next com traduções completas em Português, Inglês e Espanhol

### Recursos Específicos
- **Mapas**: Leaflet/React Leaflet para geolocalização de comunidades
- **Mídia**: Video React para reprodução de depoimentos em vídeo
- **Imagens**: React Image Gallery para exibição otimizada de galerias
- **Calendário**: React Calendar e Date-fns para o módulo de Programação
- **UI/UX**: React Icons, React Transition Group para animações, Polished para manipulação de cores

### Infraestrutura
- **Desenvolvimento**: Vite como bundler e servidor de desenvolvimento
- **API**: Axios para comunicação com backend

## Estrutura do Projeto

```
sao_joao_web/
├── public/                   # Arquivos públicos
│   ├── assets/               # Recursos estáticos
│   │   ├── fonts/            # Fontes personalizadas
│   │   ├── images/           # Imagens organizadas por módulo
│   │   │   ├── book/         # Imagens do livro digital
│   │   │   ├── communities/  # Imagens das comunidades
│   │   │   ├── postcards/    # Cartões postais digitais
│   │   │   ├── testimonials/ # Imagens de depoimentos
│   │   │   └── ui/           # Elementos de interface
│   │   ├── pdf/              # Documentos PDF para download
│   │   └── videos/           # Vídeos FLV de depoimentos migrados
│   │       └── testimonials/ # Depoimentos em vídeo
│   └── index.html            # HTML principal
├── src/                      # Código-fonte
│   ├── components/           # Componentes React reutilizáveis
│   │   ├── Footer/           # Rodapé
│   │   ├── Header/           # Cabeçalho com navegação
│   │   └── Layout/           # Layout principal
│   ├── hooks/                # Custom hooks reutilizáveis
│   │   └── useFullscreen.js  # Hook para gerenciar modo tela cheia
│   ├── locales/              # Traduções para i18n
│   │   ├── en.json           # Traduções em inglês
│   │   ├── es.json           # Traduções em espanhol
│   │   └── pt.json           # Traduções em português
│   ├── pages/                # Páginas da aplicação
│   │   ├── Book/             # Módulo de livro digital (CONCLUÍDO)
│   │   │   ├── components/   # Componentes específicos do livro
│   │   │   ├── data/         # Conteúdo estruturado do livro
│   │   │   └── hooks/        # Hooks personalizados para navegação
│   │   ├── Communities/      # Módulo de comunidades tradicionais (CONCLUÍDO)
│   │   │   ├── components/   # Componentes das comunidades
│   │   │   │   ├── CommunityMap/       # Mapa interativo das comunidades
│   │   │   │   ├── CommunityModal/     # Modal de detalhes da comunidade
│   │   │   │   └── RegisterCommunityModal/  # Modal de cadastro de comunidades
│   │   │   ├── data/         # Dados estáticos das comunidades
│   │   │   └── services/     # Serviços para gerenciamento de comunidades
│   │   ├── Home/             # Página inicial (CONCLUÍDO)
│   │   ├── Intro/            # Vídeo introdutório
│   │   ├── LanguageSelector/ # Seleção de idioma
│   │   ├── Postcards/        # Cartões postais digitais (CONCLUÍDO)
│   │   │   ├── components/   # Componentes dos cartões postais
│   │   │   │   ├── PostcardGallery/    # Galeria de cartões postais
│   │   │   │   ├── PostcardModal/      # Modal detalhado para cartões
│   │   │   │   └── CategoryFilter/     # Filtro por categoria de cartão
│   │   │   ├── data/        # Dados dos cartões postais
│   │   │   └── styles.js    # Estilos específicos do módulo
│   │   ├── Programacao/      # Programação Oficial (CONCLUÍDO)
│   │   │   ├── components/   # Componentes da programação
│   │   │   │   ├── ProgramacaoCalendar/  # Calendário de eventos
│   │   │   │   └── ProgramacaoEventList/ # Lista de eventos por data
│   │   │   ├── data/        # Dados dos eventos
│   │   │   └── styles/      # Estilos específicos do módulo
│   │   │       ├── ProgramacaoCalendar.styles.js
│   │   │       └── ProgramacaoEventList.styles.js
│   │   ├── Biblioteca/      # Biblioteca de referências (CONCLUÍDO)
│   │   │   ├── components/  # Componentes da biblioteca
│   │   │   │   ├── BibliotecaCard/     # Card para exibição de itens da biblioteca
│   │   │   │   └── BibliotecaFilter/   # Filtro por categoria de itens
│   │   │   ├── data/        # Dados das referências bibliográficas
│   │   │   ├── hooks/       # Hooks personalizados para gerenciamento dos itens
│   │   │   └── styles.js    # Estilos específicos do módulo
│   │   ├── Stories/          # Histórias e tradições (CONCLUÍDO)
│   │   │   ├── components/  # Componentes específicos para histórias
│   │   │   │   └── StoryModal/ # Modal para visualização das histórias
│   │   │   └── data/        # Conteúdo das histórias por idioma
│   │   └── Testimonials/     # Depoimentos em vídeo (CONCLUÍDO)
│   │       ├── components/   # Componentes dos depoimentos
│   │       │   ├── CategoryFilter/    # Filtro de categorias
│   │       │   ├── TestimonialForm/   # Formulário modal para novos depoimentos
│   │       │   ├── TestimonialList/    # Lista de cards de depoimentos
│   │       │   └── TestimonialVideo/   # Modal para reprodução de vídeos
│   │       ├── data/        # Dados estáticos dos depoimentos
│   │       ├── hooks/       # Hooks personalizados para gerenciamento dos depoimentos
│   │       └── styles.js     # Estilos globais do módulo
│   ├── services/             # Serviços e integrações
│   ├── styles/               # Estilos globais
│   │   ├── global.css        # CSS global
│   │   └── theme.js          # Tema para styled-components
│   ├── utils/                # Utilitários
│   │   └── i18n.js           # Configuração de internacionalização
│   ├── App.jsx               # Componente principal
│   ├── main.jsx              # Ponto de entrada React
│   └── routes.jsx            # Configuração de rotas
├── .gitignore                # Configuração de arquivos ignorados pelo Git
├── package.json              # Dependências e scripts
├── README.md                 # Documentação
└── vite.config.js            # Configuração do Vite
```

## Funcionalidades e Módulos

Todos os módulos do projeto estão concluídos e compartilham as seguintes características:
- **Internacionalização completa**: Suporte a Português, Inglês e Espanhol
- **Design responsivo**: Adaptação a diferentes dispositivos
- **Acessibilidade**: Controles intuitivos e navegação via teclado

### Módulos Principais

1. **Livro Digital (Book)**
   - Visualização em tela do navegador
   - Baixar livro em PDF

2. **Comunidades (Communities)**
   - Mapa interativo com comunidades tradicionais georreferenciadas
   - Sistema de cadastro de novas comunidades com upload de imagens
   - Armazenamento local das comunidades cadastradas

3. **Depoimentos (Testimonials)**
   - Reprodução de vídeos com player customizado
   - Filtro por categorias e formulário para novos depoimentos

4. **Histórias (Stories)**
   - Conteúdo cultural com controle de zoom para acessibilidade
   - Persistência de preferências via localStorage

5. **Cartões Postais (Postcards)**
   - Galeria de imagens com metadados culturais
   - Categorização e navegação intuitiva entre cartões

6. **Programação (Programacao)**
   - Calendário interativo de eventos do festival
   - Destaque para eventos atuais e filtragem por data

7. **Biblioteca (Biblioteca)**
   - Cards interativos com documentos e mapas
   - Filtros por categoria e acesso a referências bibliográficas

## Gerenciamento de Traduções e Performance

### Sistema de Internacionalização

O projeto utiliza i18next para gerenciar traduções em três idiomas (Português, Inglês e Espanhol). As traduções estão organizadas em arquivos JSON estruturados por módulo, acessíveis via hook `useTranslation`.

### Otimizações Implementadas

- **Cache de Traduções**: Armazenamento em estado global para evitar recarregamentos
- **Persistência**: Uso de localStorage para acelerar visitas subsequentes
- **Controle de Versão**: Mecanismo para invalidar cache quando traduções são atualizadas
- **Carregamento Dinâmico**: Lazy loading de arquivos de tradução por idioma e módulo

## Migração do Projeto Original

Este projeto é uma migração do aplicativo original "Banho de São João", que era baseado em Firefox Portable, HTML, CSS e JavaScript. A migração mantém todo o conteúdo e a essência do trabalho original, adaptando-o para uma plataforma web moderna, acessível e responsiva.

## Melhorias Concluídas

- ✅ Otimização da conversão de vídeos FLV para formatos web modernos (MP4/WebM)
- ✅ Refinamento da experiência do usuário em todos os módulos
- ✅ Otimizações para dispositivos móveis e tablets
- ✅ Sistema otimizado de gerenciamento de traduções com cache e persistência

## Próximos Passos

- Expandir o acervo do módulo Biblioteca com mais referências bibliográficas e links sobre o Banho de São João por meio de API
- Testes automatizados para garantir a qualidade
- Adicionar Ferramentas de acessibilidade
