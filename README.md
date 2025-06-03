# Banho de São João - Web Application

## Sobre o Projeto

Esta é uma aplicação web moderna que migra e moderniza o antigo aplicativo "Banho de São João", originalmente desenvolvido como uma aplicação portátil baseada no Firefox Portable. O projeto preserva todo o conteúdo e funcionalidades originais, mas utilizando tecnologias web modernas, architecture limpa e princípios de clean code.

## Tecnologias Utilizadas

- **React 18**: Framework JavaScript para construção de interfaces de usuário
- **React Router 6**: Gerenciamento de rotas na aplicação
- **Styled Components**: CSS-in-JS para estilização de componentes
- **React i18next**: Internacionalização para suporte a múltiplos idiomas
- **Video React**: Reprodução de vídeo responsiva
- **Vite**: Bundler e ferramenta de desenvolvimento

## Estrutura do Projeto

```
sao_joao_web/
├── public/               # Arquivos públicos
│   ├── assets/           # Recursos estáticos
│   │   ├── fonts/        # Fontes personalizadas
│   │   ├── images/       # Imagens 
│   │   └── videos/       # Vídeos introdutórios
│   └── index.html        # HTML principal
├── src/                  # Código-fonte
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── Footer/       # Rodapé
│   │   ├── Header/       # Cabeçalho com navegação
│   │   └── Layout/       # Layout principal
│   ├── locales/          # Traduções para i18n
│   │   ├── en.json       # Traduções em inglês
│   │   ├── es.json       # Traduções em espanhol
│   │   └── pt.json       # Traduções em português
│   ├── pages/            # Páginas da aplicação
│   │   ├── Home/         # Página inicial
│   │   ├── Intro/        # Vídeo introdutório
│   │   ├── LanguageSelector/ # Seleção de idioma
│   │   └── Stories/      # Estórias e tradições
│   ├── styles/           # Estilos globais
│   │   ├── global.css    # CSS global
│   │   └── theme.js      # Tema para styled-components
│   ├── utils/            # Utilitários
│   │   └── i18n.js       # Configuração de internacionalização
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Ponto de entrada React
│   └── routes.jsx        # Configuração de rotas
├── .gitignore           
├── package.json          # Dependências e scripts
├── README.md             # Documentação
└── vite.config.js        # Configuração do Vite
```

## Funcionalidades

- **Múltiplos idiomas**: Suporte completo a Português, Inglês e Espanhol
- **Design responsivo**: Adaptação a diferentes tamanhos de tela
- **Vídeos introdutórios**: Reprodução de vídeos de alta qualidade
- **Navegação intuitiva**: Interface limpa e moderna
- **Histórias e tradições**: Conteúdo cultural sobre o Banho de São João
- **Progressive Web App**: Futura implementação de PWA para uso offline

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

## Próximos Passos

- Implementação de todas as seções do projeto original (Comunidades, Livro, Depoimentos e Postais)
- Migração e otimização de todos os recursos multimídia
- Implementação de PWA para uso offline
- Testes automatizados para garantir a qualidade
