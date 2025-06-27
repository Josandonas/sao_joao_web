# Projeto São João Web

Este documento mapeia a estrutura de arquivos do projeto São João Web, incluindo tanto o backend quanto o frontend.

## Estrutura do Projeto

```
sao_joao_web/
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   ├── diagnose.js
│   ├── logs/
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── server.js
│       ├── services/
│       ├── utils/
│       └── views/
│
└── frontend/
    ├── .gitignore
    ├── LICENSE
    ├── README.md
    ├── index.html
    ├── node_modules/
    ├── package-lock.json
    ├── package.json
    ├── public/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   ├── contexts/
    │   ├── hooks/
    │   ├── locales/
    │   ├── main.jsx
    │   ├── pages/
    │   ├── routes.jsx
    │   ├── services/
    │   ├── styles/
    │   └── utils/
    └── vite.config.js
```

## Backend

### Estrutura de Diretórios

- **config/**: Configurações do aplicativo
- **controllers/**: Controladores que gerenciam as requisições HTTP
- **middlewares/**: Middlewares para processamento de requisições
- **models/**: Modelos de dados
- **routes/**: Definições de rotas da API
- **services/**: Serviços de negócios
- **utils/**: Funções utilitárias
- **views/**: Templates de visualização

### Arquivos Principais

- **server.js**: Ponto de entrada do servidor
- **.env**: Variáveis de ambiente (não deve ser versionado)
- **.env.example**: Exemplo de variáveis de ambiente
- **package.json**: Dependências e scripts do projeto

## Frontend

### Estrutura de Diretórios

- **components/**: Componentes React reutilizáveis
- **contexts/**: Contextos React para gerenciamento de estado
- **hooks/**: Hooks personalizados
- **locales/**: Arquivos de internacionalização
- **pages/**: Componentes de página
- **services/**: Serviços para comunicação com API e outras funcionalidades
- **styles/**: Arquivos de estilo
- **utils/**: Funções utilitárias

### Arquivos Principais

- **App.jsx**: Componente principal do aplicativo
- **main.jsx**: Ponto de entrada do React
- **routes.jsx**: Configuração de rotas do frontend
- **index.html**: Template HTML principal
- **vite.config.js**: Configuração do Vite (bundler)
- **package.json**: Dependências e scripts do projeto

## Como Executar o Projeto

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Dependências

### Backend

As dependências do backend podem ser encontradas no arquivo `backend/package.json`.

### Frontend

As dependências do frontend podem ser encontradas no arquivo `frontend/package.json`.
