# Banho de São João - Web Application

## Sobre o Projeto

Esta é uma aplicação web moderna que migra e moderniza o antigo aplicativo "Banho de São João", originalmente desenvolvido como uma aplicação portátil baseada no Firefox Portable. O projeto preserva todo o conteúdo e funcionalidades originais, mas utilizando tecnologias web modernas, arquitetura limpa e princípios de clean code. A aplicação é multilíngue, oferecendo suporte completo a Português, Inglês e Espanhol, e documenta as tradições culturais do Banho de São João na região do Pantanal Sul-Matogrossense.

## Tecnologias Utilizadas

- **React 18**: Framework JavaScript para construção de interfaces de usuário
- **React Router 6**: Gerenciamento de rotas na aplicação
- **Styled Components**: CSS-in-JS para estilização de componentes
- **React i18next**: Internacionalização para suporte a múltiplos idiomas (Português, Inglês e Espanhol)
- **React Icons**: Biblioteca de ícones para UI consistente
- **Video React**: Reprodução de vídeo responsiva para depoimentos em formato FLV
- **Leaflet/React Leaflet**: Mapas interativos para geolocalização de comunidades
- **React Image Gallery**: Galerias de imagens responsivas para os cartões postais
- **Polished**: Utilitário para manipulação de cores nos componentes estilizados
- **React Calendar**: Componente de calendário para o módulo de Programação Oficial
- **Date-fns**: Biblioteca para manipulação de datas no calendário de eventos
- **React Transition Group**: Animações e transições entre componentes
- **Axios**: Cliente HTTP para requisições a APIs externas
- **Vite**: Bundler e ferramenta de desenvolvimento

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
│   │   ├── Biblioteca/      # Biblioteca de referências (EM DESENVOLVIMENTO)
│   │   │   ├── components/  # Componentes da biblioteca
│   │   │   └── data/        # Dados das referências bibliográficas
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

## Funcionalidades

- **Múltiplos idiomas**: Suporte completo a Português, Inglês e Espanhol
- **Design responsivo**: Adaptação a diferentes tamanhos de tela
- **Navegação intuitiva**: Interface limpa e moderna
- **Módulo Book (Concluído)**: Livro digital completo com navegação por capítulos e modo tela cheia
- **Módulo Communities (Concluído)**: 
  - Mapa interativo com comunidades tradicionais georreferenciadas
  - Modal detalhado com informações multilíngues sobre cada comunidade
  - Sistema de cadastro de novas comunidades com suporte a múltiplos idiomas
  - Upload de imagens para capa e galeria das comunidades
  - Armazenamento local das comunidades cadastradas
- **Depoimentos em vídeo (Concluído)**: 
  - Reprodução de vídeos de moradores locais com player customizado
  - Filtro de depoimentos por categoria
  - Modal para assistir aos vídeos com botão de fechar
  - Formulário modal para envio de novos depoimentos com upload de vídeo customizado
  - Mensagem de compatibilidade para navegadores sem suporte a vídeo
- **Histórias e tradições (Concluído)**:
  - Conteúdo cultural sobre o Banho de São João com suporte a múltiplos idiomas
  - Modal com controle de zoom de texto para melhor acessibilidade
  - Navegação via teclado (Esc para fechar, Ctrl+/- para ajustar zoom)
  - Persistência das preferências de tamanho de fonte via localStorage
  - Animações e transições suaves para melhor experiência de usuário
- **Cartões postais digitais (Concluído)**:
  - Galeria de imagens representativas com metadados culturais
  - Categorização e filtragem de cartões por tema
  - Visualização em modo galeria com imagens otimizadas
  - Modal detalhado para cada cartão postal com informações completas
  - Navegação intuitiva entre cartões postais via modal
- **Programação Oficial (Concluído)**:
  - Calendário interativo para visualização de eventos do festival
  - Lista de eventos filtrada por data selecionada
  - Destaque para eventos do dia atual e do dia seguinte
  - Suporte completo a internacionalização (Português, Inglês e Espanhol)
  - Interface responsíva com estilos consistentes com o tema global

## Instalação e Execução

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute a aplicação em modo de desenvolvimento:
   ```
   npm run dev
   ```
4. Para construir a versão de produção:
   ```
   npm run build
   ```

## Migração do Projeto Original

Este projeto é uma migração do aplicativo original "Banho de São João", que era baseado em Firefox Portable, HTML, CSS e JavaScript. A migração mantém todo o conteúdo e a essência do trabalho original, adaptando-o para uma plataforma web moderna, acessível e responsiva.

## Status dos Módulos

- ✅ **Livro Digital (Book)**: Concluído com navegação por capítulos, visualização em tela cheia e controles
- ✅ **Comunidades (Communities)**: Concluído com mapa interativo, visualização detalhada e cadastro de novas comunidades
- ✅ **Página Inicial (Home)**: Concluído com seções hero, sobre, features com layout responsivo e distribuição harmoniosa de cards
- ✅ **Depoimentos (Testimonials)**: Concluído com categorias filtráveis, reprodução de vídeos, formulário modal e internacionalização completa
- ✅ **Histórias (Stories)**: Concluído com exibição de histórias e tradições culturais, modal acessível e controles de tamanho de texto
- ✅ **Cartões Postais (Postcards)**: Concluído com galeria interativa, modal detalhado e navegação intuitiva
- ✅ **Programação Oficial (Programacao)**: Concluído com calendário interativo, lista de eventos por data e suporte completo a internacionalização
- ⏳ **Biblioteca (Biblioteca)**: Em desenvolvimento - futuramente conterá links e referências bibliográficas sobre o Banho de São João

## Próximos Passos

- Finalizar o desenvolvimento do módulo Biblioteca com referências bibliográficas e links sobre o Banho de São João
- Otimizar a conversão de vídeos FLV para formatos web modernos (MP4/WebM)
- Implementação de PWA para uso offline
- Testes automatizados para garantir a qualidade
- Melhorias de performance e acessibilidade
- Refinamento da experiência do usuário em todos os módulos
- Otimizações para dispositivos móveis e tablets
