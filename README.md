# Banho de São João - Web Application

## Sobre o Projeto

Esta é uma aplicação web moderna que migra e moderniza o antigo aplicativo "Banho de São João", originalmente desenvolvido como uma aplicação portátil baseada no Firefox Portable. O projeto preserva todo o conteúdo e funcionalidades originais, mas utilizando tecnologias web modernas, arquitetura limpa e princípios de clean code.

## Tecnologias Utilizadas

- **React 18**: Framework JavaScript para construção de interfaces de usuário
- **React Router 6**: Gerenciamento de rotas na aplicação
- **Styled Components**: CSS-in-JS para estilização de componentes
- **React i18next**: Internacionalização para suporte a múltiplos idiomas
- **Video React**: Reprodução de vídeo responsiva para depoimentos em formato FLV
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
│   │   ├── Home/             # Página inicial
│   │   ├── Intro/            # Vídeo introdutório
│   │   ├── LanguageSelector/ # Seleção de idioma
│   │   ├── Postcards/        # Cartões postais digitais
│   │   ├── Stories/          # Estórias e tradições
│   │   └── Testimonials/     # Depoimentos em vídeo
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
- **Depoimentos em vídeo**: Reprodução de vídeos de moradores locais migrados do formato original
- **Cartões postais digitais**: Galeria de imagens representativas com metadados culturais
- **Histórias e tradições**: Conteúdo cultural sobre o Banho de São João

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
- 🔄 **Depoimentos (Testimonials)**: Em desenvolvimento
- 🔄 **Cartões Postais (Postcards)**: Em desenvolvimento
- 🔄 **Histórias (Stories)**: Em desenvolvimento

## Próximos Passos

- Finalizar implementação dos módulos restantes
- Otimizar a conversão de vídeos FLV para formatos web modernos (MP4/WebM)
- Implementação de PWA para uso offline
- Testes automatizados para garantir a qualidade
- Melhorias de performance e acessibilidade
